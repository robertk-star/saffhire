import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getPublerPostId, sendDraftToPubler } from '@/lib/publerClient';
import { getSocialPostingSettings } from '@/lib/socialPostingSettings';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const { id } = await params;
  const { data: draft, error: draftError } = await supabase
    .from('social_post_drafts')
    .select('*')
    .eq('id', id)
    .single();

  if (draftError || !draft) {
    return NextResponse.json({ error: draftError?.message || 'Social draft not found.' }, { status: 404 });
  }

  try {
    const settings = await getSocialPostingSettings();
    if (settings.require_approval && draft.status !== 'approved') {
      throw new Error('Approve this social draft before sending it.');
    }

    const result = await sendDraftToPubler({ draft, settings });
    const publerPostId = getPublerPostId(result.response);
    const notes = [draft.notes || '', `Sent to Publer. Status: ${result.status}`].filter(Boolean).join('\n\n');

    await supabase
      .from('social_post_drafts')
      .update({
        status: 'sent_to_publer',
        publer_account_id: result.payload.account_id || null,
        publer_post_id: publerPostId,
        publer_response: result.response,
        publer_error: null,
        send_attempts: (draft.send_attempts || 0) + 1,
        sent_at: new Date().toISOString(),
        notes,
      })
      .eq('id', id);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not send to Publer.';
    const notes = [draft.notes || '', `Publer send failed. Error: ${message}`].filter(Boolean).join('\n\n');

    await supabase
      .from('social_post_drafts')
      .update({
        status: 'failed',
        publer_error: message,
        send_attempts: (draft.send_attempts || 0) + 1,
        notes,
      })
      .eq('id', id);
  }

  return NextResponse.redirect(new URL(`/admin/social/${id}`, request.url), { status: 303 });
}
