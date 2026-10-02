import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const cookieName = 'driver_pipeline_session';
const maxAgeSeconds = 60 * 60 * 12;

export type DriverPipelineRole = 'owner' | 'admin' | 'user';

export type DriverPipelineSession = {
  userId: string;
  username: string;
  displayName: string;
  role: DriverPipelineRole;
  iat?: number;
};

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(`driver-pipeline:${value}`).digest('hex');
}

export function isDriverPipelinePortalConfigured() {
  return Boolean(process.env.ADMIN_SESSION_SECRET && (process.env.DRIVER_PIPELINE_PASSWORD || process.env.SUPABASE_SERVICE_ROLE_KEY));
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

export async function setDriverPipelineSession(session: Omit<DriverPipelineSession, 'iat'>) {
  const cookieStore = await cookies();
  const encoded = Buffer.from(JSON.stringify({ ...session, iat: Date.now() })).toString('base64url');
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

export async function getDriverPipelineSession(): Promise<DriverPipelineSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token || !getSecret()) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as DriverPipelineSession;
    if (!payload.iat || !payload.username || !payload.role) return null;
    if (Date.now() - payload.iat >= maxAgeSeconds * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function hasDriverPipelineSession() {
  return Boolean(await getDriverPipelineSession());
}

export function isPortalAdmin(session: DriverPipelineSession | null) {
  return session?.role === 'owner' || session?.role === 'admin';
}
