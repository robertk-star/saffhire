import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `topic-${Date.now()}`;
}

function parseKeywords(value: FormDataEntryValue | null) {
  return String(value || '')
    .split(/[\n,]+/g)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function parseSortOrder(value: FormDataEntryValue | null) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function redirectToTopics(request: Request, error?: string) {
  const url = new URL('/admin/blogs/topics', request.url);
  if (error) url.searchParams.set('error', error);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return redirectToTopics(request, 'Database is not configured.');

  const formData = await request.formData();
  const action = String(formData.get('action') || '');
  const id = String(formData.get('id') || '');

  if (action === 'delete') {
    if (!id) return redirectToTopics(request, 'Missing topic ID.');
    const { error } = await supabase.from('blog_generation_topics').delete().eq('id', id);
    return redirectToTopics(request, error?.message);
  }

  const topic = String(formData.get('topic') || '').trim();
  const angle = String(formData.get('angle') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const keywords = parseKeywords(formData.get('keywords'));
  const sort_order = parseSortOrder(formData.get('sort_order'));
  const active = formData.get('active') === 'true';

  if (!topic || !angle || !category) {
    return redirectToTopics(request, 'Topic, angle, and category are required.');
  }

  if (action === 'create') {
    const baseSlug = cleanSlug(topic);
    let slug = baseSlug;

    const { error } = await supabase.from('blog_generation_topics').insert({
      slug,
      topic,
      angle,
      category,
      keywords,
      sort_order,
      active,
    });

    if (error && error.code === '23505') {
      slug = `${baseSlug}-${Date.now().toString(36)}`;
      const retry = await supabase.from('blog_generation_topics').insert({
        slug,
        topic,
        angle,
        category,
        keywords,
        sort_order,
        active,
      });
      return redirectToTopics(request, retry.error?.message);
    }

    return redirectToTopics(request, error?.message);
  }

  if (action === 'update') {
    if (!id) return redirectToTopics(request, 'Missing topic ID.');
    const { error } = await supabase.from('blog_generation_topics').update({
      topic,
      angle,
      category,
      keywords,
      sort_order,
      active,
    }).eq('id', id);

    return redirectToTopics(request, error?.message);
  }

  return redirectToTopics(request, 'Unknown topic action.');
}
