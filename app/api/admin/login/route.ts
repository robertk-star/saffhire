import { NextResponse } from 'next/server';
import { isAdminConfigured, isCorrectAdminPassword, setAdminSession } from '@/lib/adminAuth';

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { password?: string } | null;
  const password = String(body?.password || '');

  if (!isCorrectAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
