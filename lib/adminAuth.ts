import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const cookieName = 'saffhire_admin_session';
const maxAgeSeconds = 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function createAdminToken() {
  const payload = JSON.stringify({ role: 'admin', iat: Date.now() });
  const encoded = Buffer.from(payload).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAdminToken(token?: string | null) {
  if (!token || !getSecret()) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;
  const expected = sign(encoded);
  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as { iat?: number };
    if (!payload.iat) return false;
    return Date.now() - payload.iat < maxAgeSeconds * 1000;
  } catch {
    return false;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(cookieName)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export function isCorrectAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected || !password) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}
