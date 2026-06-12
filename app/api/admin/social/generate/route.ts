import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getPublishedBlogOptionBySlug, socialPlatforms } from '@/lib/socialPostDrafts';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

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
  return `Create social media post drafts for this SaffHire blog.

Blog title: ${blog.title}
Category: ${blog.category}
Excerpt: ${blog.excerpt}
URL: ${blog.url}

Create posts for these platforms:
- facebook
- instagram
- google_business
- linkedin

Return valid JSON only in this exact shape:
{
  "facebook": { "post_text": "...", "hashtags": "..." },
  "instagram": { "post_text": "...", "hashtags": "..." },
  "google_business": { "post_text": "...", "hashtags": "..." },
  "linkedin": { "post_text": "...", "hashtags": "..." }
}

Rules:
- Include the blog URL in Facebook, Google Business, and LinkedIn posts.
- Instagram can say link in bio or read more from SaffHire.
- Keep Facebook 1 to 2 short paragraphs.
- Keep Instagram friendly and concise.
- Keep Google Business short and direct.
- Keep LinkedIn professional and a little more informative.
- Do not make legal promises.
- Do not invent statistics.
- Use hashtags as a space-separated string.
- Mention SaffHire naturally.`;
}

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const formData = await request.formData();
  const blogSlug = String(formData.get('blog_slug') || '').trim();
  if (!blogSlug) return NextResponse.json({ error: 'Blog slug is required.' }, { status: 400 });

  const blog = await getPublishedBlogOptionBySlug(blogSlug);
  if (!blog) return NextResponse.json({ error: 'Published blog not found.' }, { status: 404 });

  const generated = await callOpenAI(buildPrompt(blog));

  const rows = socialPlatforms.map((platform) => {
    const draft = generated[platform.value] || { post_text: '', hashtags: '' };
    return {
      blog_slug: blog.slug,
      blog_title: blog.title,
      blog_url: blog.url,
      image_url: blog.image,
      image_source: 'blog_fallback',
      image_generation_error: null,
      image_generated_at: null,
      platform: platform.value,
      post_text: String(draft.post_text || '').trim(),
      hashtags: String(draft.hashtags || '').trim(),
      status: 'draft',
      notes: 'AI-generated social draft for admin review. Blog image attached as fallback. Use Generate AI Image to create a custom social image.',
      approved_at: null,
      sent_at: null,
    };
  });

  const { error } = await supabase
    .from('social_post_drafts')
    .upsert(rows, { onConflict: 'blog_slug,platform' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.redirect(new URL('/admin/social', request.url), { status: 303 });
}
