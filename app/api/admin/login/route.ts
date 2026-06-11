import { NextResponse } from 'next/server';
import { isAdminConfigured, isCorrectAdminPassword, setAdminSession } from '@/lib/adminAuth';

async function getSubmittedPassword(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => null) as { password?: string } | null;
    return String(body?.password || '');
  }

  const formData = await request.formData().catch(() => null);
  return String(formData?.get('password') || '');
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  }

  const password = await getSubmittedPassword(request);

  if (!isCorrectAdminPassword(password)) {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      return NextResponse.redirect(new URL('/admin/login?error=1', request.url), { status: 303 });
    }
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  await setAdminSession();

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    return NextResponse.redirect(new URL('/admin/blogs', request.url), { status: 303 });
  }

  return NextResponse.json({ ok: true });
}
