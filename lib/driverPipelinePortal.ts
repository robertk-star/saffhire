import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const cookieName = 'driver_pipeline_session';
const maxAgeSeconds = 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(`driver-pipeline:${value}`).digest('hex');
}

export function isDriverPipelinePortalConfigured() {
  return Boolean(process.env.DRIVER_PIPELINE_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function isCorrectDriverPipelineLogin(username: string, password: string) {
  const expectedPassword = process.env.DRIVER_PIPELINE_PASSWORD || '';
  const expectedUsername = (process.env.DRIVER_PIPELINE_USERNAME || 'driverpipeline').trim().toLowerCase();
  if (!expectedPassword || !password) return false;
  if (username.trim().toLowerCase() !== expectedUsername) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expectedPassword));
  } catch {
    return false;
  }
}

export async function setDriverPipelineSession() {
  const cookieStore = await cookies();
  const encoded = Buffer.from(JSON.stringify({ role: 'driver-pipeline', iat: Date.now() })).toString('base64url');
  cookieStore.set(cookieName, `${encoded}.${sign(encoded)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  });
}

export async function clearDriverPipelineSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function hasDriverPipelineSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
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
