import { NextResponse } from 'next/server';
import { getBlogImageForCategory } from '@/data/blogCategoryImages';
import { generateAndStoreBlogImage } from '@/lib/blogImageGenerator';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getBearerToken(request: Request) {
  const header = request.headers.get('authorization') || '';
  if (!header.toLowerCase().startsWith('bearer ')) return '';
  return header.slice(7).trim();
}

function getApiKey(request: Request, body: Record<string, unknown>) {
  return (
    request.headers.get('x-blog-draft-api-key') ||
    request.headers.get('x-api-key') ||
    getBearerToken(request) ||
    String(body.apiKey || body.secret_key || body.secretKey || '')
  ).trim();
}

function stringField(body: Record<string, unknown>, key: string, fallback = '') {
  const value = body[key];
  return typeof value === 'string' ? value.trim() : fallback;
}

export async function POST(request: Request) {
  const configuredKey = process.env.BLOG_DRAFT_API_KEY;
  if (!configuredKey) return NextResponse.json({ error: 'Blog draft intake is not configured.' }, { status: 503 });

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });

  if (getApiKey(request, body) !== configuredKey) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const title = stringField(body, 'title');
  const content = stringField(body, 'content');
  const excerpt = stringField(body, 'excerpt');
  const slug = cleanSlug(stringField(body, 'slug') || title);
  const category = stringField(body, 'category', 'Background Screening');

  if (!title || !slug || !excerpt || !content) {
    return NextResponse.json({ error: 'Missing required fields: title, slug or title, excerpt, and content are required.' }, { status: 400 });
  }

  let imageUrl = stringField(body, 'image_url') || stringField(body, 'imageUrl') || '';
  let imageNote = imageUrl ? 'Custom image URL provided.' : '';

  if (!imageUrl) {
    try {
      const generatedImage = await generateAndStoreBlogImage({ title, slug, excerpt, category });
      imageUrl = generatedImage.imageUrl;
      imageNote = `AI image generated and attached. Storage path: ${generatedImage.storagePath}`;
    } catch (imageError) {
      const imageMessage = imageError instanceof Error ? imageError.message : 'AI image generation failed.';
      imageUrl = getBlogImageForCategory(category);
      imageNote = `AI image generation failed, so default category image was applied. Error: ${imageMessage}`;
    }
  }

  const baseNotes = stringField(body, 'notes') || 'AI-generated draft submitted for review.';

  const { data, error } = await supabase
    .from('blog_drafts')
    .upsert({
      title,
      slug,
      excerpt,
      content,
      category,
      author: stringField(body, 'author', 'SaffHire Compliance Team'),
      image_url: imageUrl,
      read_time: stringField(body, 'read_time') || stringField(body, 'readTime') || '8 min read',
      notes: `${baseNotes}\n\n${imageNote}`.trim(),
      status: 'pending_review',
      approved_at: null,
      published_at: null,
    }, { onConflict: 'slug' })
    .select('id, slug, title, status')
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message || 'Could not save blog draft.' }, { status: 500 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  return NextResponse.json({
    ok: true,
    draft: data,
    reviewUrl: `${siteUrl}/admin/blogs/${data.id}`,
    message: 'Draft saved for review. It will not publish until approved and published in the admin dashboard.',
  });
}
