import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

  const formData = await request.formData();
  const title = String(formData.get('title') || '').trim();
  const slug = cleanSlug(String(formData.get('slug') || title));
  const action = String(formData.get('action') || 'save');

  const { data, error } = await supabase
    .from('blog_drafts')
    .insert({
      title,
      slug,
      excerpt: String(formData.get('excerpt') || '').trim(),
      content: String(formData.get('content') || '').trim(),
      category: String(formData.get('category') || 'Background Screening').trim(),
      author: String(formData.get('author') || 'SaffHire Compliance Team').trim(),
      image_url: String(formData.get('image_url') || '').trim() || null,
      read_time: String(formData.get('read_time') || '8 min read').trim(),
      notes: String(formData.get('notes') || '').trim() || null,
      status: action === 'pending_review' ? 'pending_review' : 'draft',
    })
    .select('id')
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message || 'Create failed' }, { status: 500 });

  return NextResponse.redirect(new URL(`/admin/blogs/${data.id}`, request.url), { status: 303 });
}
