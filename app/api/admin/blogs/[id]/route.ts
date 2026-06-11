import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function statusForAction(action: string) {
  if (action === 'approve') return 'approved';
  if (action === 'publish') return 'published';
  if (action === 'changes_requested') return 'changes_requested';
  if (action === 'reject') return 'rejected';
  if (action === 'pending_review') return 'pending_review';
  return 'draft';
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

  const { id } = await params;
  const formData = await request.formData();
  const action = String(formData.get('action') || 'save');
  const status = statusForAction(action);
  const now = new Date().toISOString();

  const title = String(formData.get('title') || '').trim();
  const update: Record<string, unknown> = {
    title,
    slug: cleanSlug(String(formData.get('slug') || title)),
    excerpt: String(formData.get('excerpt') || '').trim(),
    content: String(formData.get('content') || '').trim(),
    category: String(formData.get('category') || 'Background Screening').trim(),
    author: String(formData.get('author') || 'SaffHire Compliance Team').trim(),
    image_url: String(formData.get('image_url') || '').trim() || null,
    read_time: String(formData.get('read_time') || '8 min read').trim(),
    notes: String(formData.get('notes') || '').trim() || null,
    status,
  };

  if (action === 'approve') update.approved_at = now;
  if (action === 'publish') {
    update.approved_at = now;
    update.published_at = now;
  }

  const { error } = await supabase.from('blog_drafts').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.redirect(new URL(`/admin/blogs/${id}`, request.url), { status: 303 });
}
