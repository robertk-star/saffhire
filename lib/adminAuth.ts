import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const cookieName = 'saffhire_admin_session';
const maxAgeSeconds = 60 * 60 * 12;

type AdminSession = {
  role: 'admin' | 'user';
  username?: string;
  displayName?: string | null;
  permissions?: string[];
  iat?: number;
};

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function createAdminToken(session?: Omit<AdminSession, 'iat'>) {
  const payload = JSON.stringify({ role: 'admin', ...(session || {}), iat: Date.now() });
  const encoded = Buffer.from(payload).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAdminToken(token?: string | null): AdminSession | null {
  if (!token || !getSecret()) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AdminSession;
    if (!payload.iat) return null;
    if (Date.now() - payload.iat >= maxAgeSeconds * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSessionDetails() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(cookieName)?.value);
}

export async function getAdminSession() {
  return Boolean(await getAdminSessionDetails());
}

export async function hasAdminPermission(permission: string) {
  const session = await getAdminSessionDetails();
  if (!session) return false;
  if (session.role === 'admin') return true;
  return Boolean(session.permissions?.includes(permission));
}

export async function setAdminSession(session?: Omit<AdminSession, 'iat'>) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminToken(session), {
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
