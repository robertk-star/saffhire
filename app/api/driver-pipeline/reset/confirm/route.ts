import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { hashPortalPassword } from '@/lib/driverPipelineUsers';

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const token = String(formData?.get('token') || '');
  const password = String(formData?.get('password') || '');
  if (!token || password.length < 8) {
    return NextResponse.redirect(new URL('/driver-pipeline/reset?error=1', request.url), { status: 303 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.redirect(new URL('/driver-pipeline/reset?error=1', request.url), { status: 303 });
  const { data } = await supabase
    .from('driver_pipeline_users')
    .select('id, reset_token_expires_at')
    .eq('reset_token_hash', hashToken(token))
    .maybeSingle();
  if (!data || !data.reset_token_expires_at || new Date(data.reset_token_expires_at).getTime() < Date.now()) {
    return NextResponse.redirect(new URL('/driver-pipeline/reset?error=1', request.url), { status: 303 });
  }
  await supabase.from('driver_pipeline_users').update({
    password_hash: hashPortalPassword(password),
    reset_token_hash: null,
    reset_token_expires_at: null,
  }).eq('id', data.id);
  return NextResponse.redirect(new URL('/driver-pipeline/login?reset=done', request.url), { status: 303 });
}
