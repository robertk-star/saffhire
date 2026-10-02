import { NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { findPortalUser } from '@/lib/driverPipelineUsers';

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

async function sendReset(email: string, displayName: string, token: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return false;
  const link = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com'}/driver-pipeline/reset?token=${token}`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Reset your Driver Pipeline portal password',
      text: [
        `Hello ${displayName},`,
        'Use this link to set a new password for the Driver Pipeline authorization portal. It expires in 1 hour.',
        link,
        'If you did not ask for this, you can ignore this email.',
      ].join('\n'),
    }),
  });
  return response.ok;
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const username = String(formData?.get('username') || '').trim().toLowerCase();
  const user = username ? await findPortalUser(username) : null;
  if (user && user.is_active && user.email) {
    const token = randomBytes(24).toString('hex');
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from('driver_pipeline_users').update({
        reset_token_hash: hashToken(token),
        reset_token_expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      }).eq('id', user.id);
      await sendReset(user.email, user.display_name || user.username, token);
    }
  }
  return NextResponse.redirect(new URL('/driver-pipeline/login?reset=1', request.url), { status: 303 });
}
