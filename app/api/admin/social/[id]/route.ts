import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function statusForAction(action: string) {
  if (action === 'approve') return 'approved';
  if (action === 'reject') return 'rejected';
  return 'draft';
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const { id } = await params;
  const formData = await request.formData();
  const action = String(formData.get('action') || 'save');
  const status = statusForAction(action);

  const update: Record<string, unknown> = {
    image_url: String(formData.get('image_url') || '').trim() || null,
    post_text: String(formData.get('post_text') || '').trim(),
    hashtags: String(formData.get('hashtags') || '').trim(),
    notes: String(formData.get('notes') || '').trim() || null,
    status,
  };

  if (action === 'approve') update.approved_at = new Date().toISOString();
  if (action === 'reject') update.approved_at = null;

  const { error } = await supabase.from('social_post_drafts').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.redirect(new URL(`/admin/social/${id}`, request.url), { status: 303 });
}
