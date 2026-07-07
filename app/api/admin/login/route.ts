import { NextResponse } from 'next/server';
import { isAdminConfigured, isCorrectAdminPassword, setAdminSession } from '@/lib/adminAuth';
import { findAdminUserByUsername, verifyAdminPassword } from '@/lib/adminUsers';

async function getSubmittedCredentials(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => null) as { username?: string; password?: string } | null;
    return { username: String(body?.username || ''), password: String(body?.password || '') };
  }

  const formData = await request.formData().catch(() => null);
  return {
    username: String(formData?.get('username') || ''),
    password: String(formData?.get('password') || ''),
  };
}

function isFormRequest(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  return contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  }

  const { username, password } = await getSubmittedCredentials(request);

  if (!username.trim() && isCorrectAdminPassword(password)) {
    await setAdminSession({ role: 'admin', username: 'owner', displayName: 'Owner', permissions: ['blogs', 'social', 'scheduler', 'pricing', 'users'] });
    if (isFormRequest(request)) return NextResponse.redirect(new URL('/admin', request.url), { status: 303 });
    return NextResponse.json({ ok: true });
  }

  const user = await findAdminUserByUsername(username.trim().toLowerCase());
  if (user && user.is_active && verifyAdminPassword(password, user.password_hash)) {
    await setAdminSession({ role: 'user', username: user.username, displayName: user.display_name, permissions: user.permissions || [] });
    if (isFormRequest(request)) return NextResponse.redirect(new URL('/admin', request.url), { status: 303 });
    return NextResponse.json({ ok: true });
  }

  if (isFormRequest(request)) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url), { status: 303 });
  }
  return NextResponse.json({ error: 'Invalid login.' }, { status: 401 });
}
