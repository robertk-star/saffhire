import { NextResponse } from 'next/server';
import { getBlogImageForCategory } from '@/data/blogCategoryImages';
import { getAdminSession } from '@/lib/adminAuth';
import { getBlogGenerationSettings, shouldRunForSettings } from '@/lib/blogGenerationSettings';
import { getActiveBlogGenerationTopics } from '@/lib/blogGenerationTopicAdmin';
import { generateAndStoreBlogImage } from '@/lib/blogImageGenerator';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { BLOG_META_DESCRIPTION_MAX, BLOG_TITLE_MAX, fitGeneratedBlogSeo } from '@/lib/blogSeo';

export const dynamic = 'force-dynamic';

const FROM = 'SaffHire <info@saffhire.com>';
const ALERT_TO = 'robertk@saffhire.com';

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
  const topics = await getActiveBlogGenerationTopics();
  if (!topics.length) throw new Error('No active blog generation topics are available.');
  if (!supabase) return topics[0];

  const { count } = await supabase.from('blog_generation_runs').select('id', { count: 'exact', head: true });
  const index = (count || 0) % topics.length;
  return topics[index];
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
  return `Create a blog draft for SaffHire Background Screening.\n\nTopic: ${topic.topic}\nAngle: ${topic.angle}\nCategory: ${topic.category}\nTarget keywords: ${topic.keywords.join(', ')}\n\nRequirements:\n- Return valid JSON only.\n- JSON fields: title, slug, excerpt, category, content.\n- Content should be 1,100 to 1,500 words.\n- Use plain language, short paragraphs, and helpful section headings.\n- Use Markdown headings with ##.\n- Keep the tone helpful, professional, and employer-focused.\n- Mention SaffHire naturally near the end.\n- Do not say SaffHire gives legal advice.\n- Do not invent pricing.\n- Do not use unsupported statistics.\n- Include a short disclaimer paragraph at the end that the article is informational and not legal advice.
- The title must be ${BLOG_TITLE_MAX} characters or fewer. The site appends " | SaffHire", and the browser title must stay at 65 characters or fewer.
- The excerpt is the meta description and must be ${BLOG_META_DESCRIPTION_MAX} characters or fewer.
- Do not mention prices, dollar amounts, setup fees, or minimums.
- Do not mention I-9, E-Verify, or adverse action.
- Do not name accreditation bodies or the background-screening software vendor.
- Describe the headquarters only as Frisco, TX. The service area is nationwide.
- Do not mention remote work, testimonials, reviews, or star ratings.`;
}

async function getAuthMode(request: Request) {
  const adminLoggedIn = await getAdminSession();
  if (adminLoggedIn) return 'admin';

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && getSecret(request) === cronSecret) return 'cron';
  return null;
}

async function sendReviewEmail(post: { title: string; excerpt: string; slug: string; id: string; category: string; revisionOf: string | null }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: 'RESEND_API_KEY missing' };

  const editUrl = `https://saffhire.com/admin/blogs/${post.id}`;
  const text = [
    post.revisionOf
      ? `The auto blog job wrote a proposed revision of the live post "${post.revisionOf}". The live post was not changed.`
      : 'A new SaffHire blog draft is ready for your review. It is not published.',
    '',
    `Title: ${post.title}`,
    `Category: ${post.category}`,
    `Review in admin: ${editUrl}`,
    '',
    post.excerpt,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [ALERT_TO],
      subject: `${post.revisionOf ? 'Blog revision' : 'New blog draft'} to review: ${post.title}`,
      text,
    }),
  });

  const details = await response.text().catch(() => 'Unknown email error');
  return { sent: response.ok, reason: details };
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
    const fitted = fitGeneratedBlogSeo({
      title: String(draft.title || topic.topic).trim(),
      excerpt: String(draft.excerpt || '').trim(),
    });
    const title = fitted.title;
    const slug = cleanSlug(String(draft.slug || title));
    const excerpt = fitted.excerpt;
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

    // Never touch an existing row. If a post with this slug already exists
    // (any status, including published/approved), save the new text as a
    // separate pending_review row under a suffixed slug so Robert can review it.
    const { data: existing } = await supabase
      .from('blog_drafts')
      .select('id, status')
      .eq('slug', slug)
      .maybeSingle();

    let saveSlug = slug;
    let revisionNote = '';
    if (existing) {
      saveSlug = `${slug}-revision-${Date.now()}`;
      revisionNote = ` Proposed revision of existing ${existing.status} post "${slug}" (id ${existing.id}); the live post was NOT changed. If approved, copy this content into the original post and reject this row.`;
    }

    const { data: savedDraft, error: draftError } = await supabase
      .from('blog_drafts')
      .insert({
        title,
        slug: saveSlug,
        excerpt,
        content,
        category,
        author: 'SaffHire Compliance Team',
        read_time: estimateReadTime(content),
        image_url: imageUrl,
        notes: `Generated by ${authMode === 'admin' ? 'manual admin request' : 'scheduled AI blog cron'} for review. Topic: ${topic.topic}. ${imageNote}${revisionNote}`,
        status: 'pending_review',
      })
      .select('id, slug, title, status, excerpt, category')
      .single();

    if (draftError || !savedDraft) throw new Error(draftError?.message || 'Could not save generated blog draft.');

    const emailResult = await sendReviewEmail({
      title: savedDraft.title,
      excerpt: savedDraft.excerpt,
      slug: savedDraft.slug,
      id: savedDraft.id,
      category: savedDraft.category,
      revisionOf: existing ? slug : null,
    }).catch((error) => ({ sent: false, reason: error instanceof Error ? error.message : 'Email failed' }));

    // Social posts are only created when Robert publishes a post, not here.
    const socialResults: Array<{ platform: string; status: string }> = [];

    if (runId) {
      await supabase.from('blog_generation_runs').update({
        slug: savedDraft.slug,
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

    return NextResponse.json({
      ok: true,
      topic: topic.topic,
      post: savedDraft,
      editUrl: `https://saffhire.com/admin/blogs/${savedDraft.id}`,
      emailSent: emailResult.sent,
      emailError: emailResult.sent ? null : emailResult.reason,
      socialResults,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Blog generation failed.';
    if (runId) {
      await supabase.from('blog_generation_runs').update({ status: 'failed', error_message: message, completed_at: new Date().toISOString() }).eq('id', runId);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
