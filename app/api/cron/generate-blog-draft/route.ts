import { NextResponse } from 'next/server';
import { getBlogImageForCategory } from '@/data/blogCategoryImages';
import { blogGenerationTopics } from '@/data/blogGenerationTopics';
import { getAdminSession } from '@/lib/adminAuth';
import { getBlogGenerationSettings, shouldRunForSettings } from '@/lib/blogGenerationSettings';
import { generateAndStoreBlogImage } from '@/lib/blogImageGenerator';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getSecret(request: Request) {
  const authorization = request.headers.get('authorization') || '';
  const bearer = authorization.toLowerCase().startsWith('bearer ') ? authorization.slice(7).trim() : '';
  return request.headers.get('x-cron-secret') || bearer || '';
}

function stripCodeFence(value: string) {
  return value.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(6, Math.ceil(words / 225));
  return `${minutes} min read`;
}

async function chooseTopic() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return blogGenerationTopics[0];

  const { count } = await supabase.from('blog_generation_runs').select('id', { count: 'exact', head: true });
  const index = (count || 0) % blogGenerationTopics.length;
  return blogGenerationTopics[index];
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
          content: 'You write clear, practical blog posts for SaffHire Background Screening. Write in plain English. Do not provide legal advice. Do not make unsupported legal claims. Avoid fake statistics. Return only valid JSON.',
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

  return JSON.parse(stripCodeFence(content)) as {
    title: string;
    slug?: string;
    excerpt: string;
    category?: string;
    content: string;
  };
}

function buildPrompt(topic: { topic: string; angle: string; category: string; keywords: string[] }) {
  return `Create a blog draft for SaffHire Background Screening.

Topic: ${topic.topic}
Angle: ${topic.angle}
Category: ${topic.category}
Target keywords: ${topic.keywords.join(', ')}

Requirements:
- Return valid JSON only.
- JSON fields: title, slug, excerpt, category, content.
- Content should be 1,100 to 1,500 words.
- Use plain language, short paragraphs, and helpful section headings.
- Use Markdown headings with ##.
- Keep the tone helpful, professional, and employer-focused.
- Mention SaffHire naturally near the end.
- Do not say SaffHire gives legal advice.
- Do not invent pricing.
- Do not use unsupported statistics.
- Include a short disclaimer paragraph at the end that the article is informational and not legal advice.`;
}

async function getAuthMode(request: Request) {
  const adminLoggedIn = await getAdminSession();
  if (adminLoggedIn) return 'admin';

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && getSecret(request) === cronSecret) return 'cron';
  return null;
}

export async function GET(request: Request) {
  const authMode = await getAuthMode(request);
  if (!authMode) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  if (authMode === 'cron') {
    const settings = await getBlogGenerationSettings();
    const schedule = shouldRunForSettings(settings);
    if (!schedule.shouldRun) {
      return NextResponse.json({ ok: true, skipped: true, reason: schedule.reason });
    }
  }

  const topic = await chooseTopic();
  let runId: string | null = null;

  const { data: run } = await supabase
    .from('blog_generation_runs')
    .insert({ topic: topic.topic, status: 'started' })
    .select('id')
    .single();

  runId = run?.id || null;

  try {
    const draft = await callOpenAI(buildPrompt(topic));
    const title = String(draft.title || topic.topic).trim();
    const slug = cleanSlug(String(draft.slug || title));
    const excerpt = String(draft.excerpt || '').trim();
    const content = String(draft.content || '').trim();
    const category = String(draft.category || topic.category).trim();

    if (!title || !slug || !excerpt || !content) {
      throw new Error('Generated draft is missing title, slug, excerpt, or content.');
    }

    let imageUrl = getBlogImageForCategory(category);
    let imageNote = 'Default category image applied.';

    try {
      const generatedImage = await generateAndStoreBlogImage({ title, slug, excerpt, category });
      imageUrl = generatedImage.imageUrl;
      imageNote = `AI image generated and attached. Storage path: ${generatedImage.storagePath}`;
    } catch (imageError) {
      const imageMessage = imageError instanceof Error ? imageError.message : 'AI image generation failed.';
      imageNote = `AI image generation failed, so default category image was applied. Error: ${imageMessage}`;
    }

    const { data: savedDraft, error: draftError } = await supabase
      .from('blog_drafts')
      .upsert({
        title,
        slug,
        excerpt,
        content,
        category,
        author: 'SaffHire Compliance Team',
        read_time: estimateReadTime(content),
        image_url: imageUrl,
        notes: `Generated by ${authMode === 'admin' ? 'manual admin request' : 'scheduled AI blog cron'}. Topic: ${topic.topic}. ${imageNote}`,
        status: 'pending_review',
        approved_at: null,
        published_at: null,
      }, { onConflict: 'slug' })
      .select('id, slug, title, status')
      .single();

    if (draftError || !savedDraft) throw new Error(draftError?.message || 'Could not save generated blog draft.');

    if (runId) {
      await supabase.from('blog_generation_runs').update({
        slug,
        status: 'success',
        draft_id: savedDraft.id,
        completed_at: new Date().toISOString(),
      }).eq('id', runId);
    }

    if (authMode === 'cron') {
      const settings = await getBlogGenerationSettings();
      const schedule = shouldRunForSettings(settings);
      if (schedule.runKey) {
        await supabase.from('blog_generation_settings').update({ last_run_key: schedule.runKey }).eq('id', 'default');
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    return NextResponse.json({ ok: true, topic: topic.topic, draft: savedDraft, reviewUrl: `${siteUrl}/admin/blogs/${savedDraft.id}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Blog generation failed.';
    if (runId) {
      await supabase.from('blog_generation_runs').update({ status: 'failed', error_message: message, completed_at: new Date().toISOString() }).eq('id', runId);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
