import { getPublerPostId, sendDraftToPubler } from '@/lib/publerClient';
import { getSocialPostingSettings } from '@/lib/socialPostingSettings';
import type { SocialPlatform, SocialPostDraft } from '@/lib/socialPostDrafts';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const AUTO_PLATFORMS: SocialPlatform[] = ['facebook', 'google_business', 'linkedin'];

function stripCodeFence(value: string) {
  return value.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
}

async function callOpenAI(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is missing.');

  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: 'You create professional social media drafts for SaffHire Background Screening. Keep the tone helpful, careful, and employer-focused. Do not give legal advice. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => 'Unknown OpenAI error');
    throw new Error(details);
  }

  const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const content = result.choices?.[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned an empty response.');
  return JSON.parse(stripCodeFence(content)) as Record<string, { post_text: string; hashtags: string }>;
}

function buildPrompt(blog: { title: string; excerpt: string; category: string; url: string }) {
  return `Create social media posts for this SaffHire blog.\n\nBlog title: ${blog.title}\nCategory: ${blog.category}\nExcerpt: ${blog.excerpt}\nURL: ${blog.url}\n\nCreate posts for these platforms only:\n- facebook\n- google_business\n- linkedin\n\nReturn valid JSON only in this exact shape:\n{\n  "facebook": { "post_text": "...", "hashtags": "..." },\n  "google_business": { "post_text": "...", "hashtags": "..." },\n  "linkedin": { "post_text": "...", "hashtags": "..." }\n}\n\nRules:\n- Include the blog URL in every post.\n- Keep Facebook 1 to 2 short paragraphs.\n- Keep Google Business short and direct.\n- Keep LinkedIn professional and a little more informative.\n- Do not make legal promises.\n- Do not invent statistics.\n- Use hashtags as a space-separated string.\n- Mention SaffHire naturally.`;
}

export async function autoPublishSocialFromBlog(blog: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  image?: string | null;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');

  const settings = await getSocialPostingSettings();
  const generated = await callOpenAI(buildPrompt(blog));
  const results: Array<{ platform: SocialPlatform; status: string; error?: string }> = [];

  for (const platform of AUTO_PLATFORMS) {
    const enabled =
      (platform === 'facebook' && settings.facebook_enabled) ||
      (platform === 'google_business' && settings.google_business_enabled) ||
      (platform === 'linkedin' && settings.linkedin_enabled);

    const draftText = generated[platform] || { post_text: '', hashtags: '' };
    const row = {
      blog_slug: blog.slug,
      blog_title: blog.title,
      blog_url: blog.url,
      image_url: blog.image || null,
      image_source: 'blog_fallback',
      image_generation_error: null,
      image_generated_at: null,
      platform,
      post_text: String(draftText.post_text || '').trim(),
      hashtags: String(draftText.hashtags || '').trim(),
      status: enabled ? 'approved' : 'draft',
      notes: enabled
        ? 'Auto-generated from published blog. Instagram skipped. Sent without manual approval.'
        : 'Auto-generated, but this platform is disabled in Social Posting Settings.',
      approved_at: enabled ? new Date().toISOString() : null,
      sent_at: null,
    };

    const { data: saved, error } = await supabase
      .from('social_post_drafts')
      .upsert(row, { onConflict: 'blog_slug,platform' })
      .select('*')
      .single();

    if (error || !saved) {
      results.push({ platform, status: 'failed', error: error?.message || 'Could not save social draft.' });
      continue;
    }

    if (!enabled) {
      results.push({ platform, status: 'skipped' });
      continue;
    }

    try {
      const sendSettings = { ...settings, require_approval: false };
      const result = await sendDraftToPubler({ draft: saved as SocialPostDraft, settings: sendSettings });
      const publerPostId = getPublerPostId(result.response);
      await supabase
        .from('social_post_drafts')
        .update({
          status: 'sent_to_publer',
          publer_account_id: result.payload.bulk.posts[0].accounts[0].id || null,
          publer_post_id: publerPostId,
          publer_response: result.response,
          publer_error: null,
          send_attempts: (saved.send_attempts || 0) + 1,
          sent_at: new Date().toISOString(),
          notes: `${row.notes}\n\nSent to Publer. Status: ${result.status}`,
        })
        .eq('id', saved.id);
      results.push({ platform, status: 'sent_to_publer' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not send to Publer.';
      await supabase
        .from('social_post_drafts')
        .update({
          status: 'failed',
          publer_error: message,
          send_attempts: (saved.send_attempts || 0) + 1,
          notes: `${row.notes}\n\nPubler send failed. Error: ${message}`,
        })
        .eq('id', saved.id);
      results.push({ platform, status: 'failed', error: message });
    }
  }

  return results;
}
