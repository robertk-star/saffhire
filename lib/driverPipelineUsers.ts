import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import type { DriverPipelineSession } from '@/lib/driverPipelinePortal';

const iterations = 120000;
const keyLength = 64;
const digest = 'sha512';

export function hashPortalPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
  return `pbkdf2:${iterations}:${salt}:${hash}`;
}

export function verifyPortalPassword(password: string, storedHash: string) {
  const [scheme, iter, salt, hash] = storedHash.split(':');
  if (scheme !== 'pbkdf2' || !iter || !salt || !hash) return false;
  const testHash = pbkdf2Sync(password, salt, Number(iter), keyLength, digest).toString('hex');
  try {
    return timingSafeEqual(Buffer.from(testHash), Buffer.from(hash));
  } catch {
    return false;
  }
}

export function makeTemporaryPassword() {
  return `DP-${randomBytes(4).toString('hex')}-${randomBytes(2).toString('hex')}`;
}

export async function findPortalUser(username: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !username) return null;
  const { data, error } = await supabase
    .from('driver_pipeline_users')
    .select('id, username, display_name, email, password_hash, role, is_active')
    .ilike('username', username.trim().toLowerCase())
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function listPortalUsers() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('driver_pipeline_users')
    .select('id, username, display_name, email, role, is_active, created_at, last_login_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createPortalUser(input: { username: string; displayName: string; email: string; role: 'admin' | 'user'; createdBy: string }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');
  const username = input.username.trim().toLowerCase();
  if (!username) throw new Error('Username is required.');
  if (!input.email.includes('@')) throw new Error('A valid email is required.');
  const temporaryPassword = makeTemporaryPassword();
  const { data, error } = await supabase
    .from('driver_pipeline_users')
    .insert({
      username,
      display_name: input.displayName.trim() || username,
      email: input.email.trim().toLowerCase(),
      password_hash: hashPortalPassword(temporaryPassword),
      role: input.role === 'admin' ? 'admin' : 'user',
      is_active: true,
      created_by: input.createdBy,
    })
    .select('id, username, display_name, email, role')
    .single();
  if (error) throw new Error(error.message);
  return { user: data, temporaryPassword };
}

export async function setPortalUserActive(id: string, isActive: boolean) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');
  const { error } = await supabase.from('driver_pipeline_users').update({ is_active: isActive }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function markPortalLogin(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !id || id === 'owner') return;
  await supabase.from('driver_pipeline_users').update({ last_login_at: new Date().toISOString() }).eq('id', id);
}

export async function logPortalAccess(session: DriverPipelineSession, input: { action: string; authorizationId?: string | null; ipAddress?: string | null; userAgent?: string | null }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from('driver_pipeline_access_log').insert({
    user_id: session.userId === 'owner' ? null : session.userId,
    username: session.username,
    display_name: session.displayName,
    role: session.role,
    action: input.action,
    authorization_id: input.authorizationId || null,
    ip_address: input.ipAddress || null,
    user_agent: input.userAgent || null,
  });
}

export async function listPortalAccessLog(username?: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  let request = supabase
    .from('driver_pipeline_access_log')
    .select('id, username, display_name, role, action, authorization_id, ip_address, created_at')
    .order('created_at', { ascending: false })
    .limit(300);
  if (username) request = request.eq('username', username);
  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function sendPortalInvite(input: { email: string; username: string; displayName: string; temporaryPassword: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return false;
  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com'}/driver-pipeline/login`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [input.email],
      subject: 'Driver Pipeline authorization portal access',
      text: [
        `Hello ${input.displayName},`,
        'You have access to the Driver Pipeline authorization portal.',
        `Login: ${loginUrl}`,
        `Username: ${input.username}`,
        `Temporary password: ${input.temporaryPassword}`,
        'This portal contains personal information. Do not share your login.',
      ].join('\n'),
    }),
  });
  return response.ok;
}

export async function emailAccessEvent(input: { username: string; displayName: string; role: string; action: string; ipAddress?: string | null }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.DRIVER_PIPELINE_ACCESS_EMAIL || process.env.CONTACT_TO_EMAIL;
  if (!key || !from || !to) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Driver Pipeline access: ${input.displayName} ${input.action.replaceAll('_', ' ')}`,
      text: [
        'Driver Pipeline portal access notice.',
        `Who: ${input.displayName} (${input.username})`,
        `Role: ${input.role}`,
        `Action: ${input.action.replaceAll('_', ' ')}`,
        `When: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} Central`,
        `IP: ${input.ipAddress || 'not available'}`,
        'This email does not include applicant information or a downloaded form.',
      ].join('\n'),
    }),
  });
  return response.ok;
}
