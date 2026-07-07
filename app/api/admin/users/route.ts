import { NextResponse } from 'next/server';
import { hasAdminPermission } from '@/lib/adminAuth';
import { createAdminUser } from '@/lib/adminUsers';

export async function POST(request: Request) {
  if (!(await hasAdminPermission('users'))) {
    return NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 });
  }

  const formData = await request.formData();
  const permissions = formData.getAll('permissions').map(String);

  try {
    await createAdminUser({
      username: String(formData.get('username') || ''),
      displayName: String(formData.get('display_name') || ''),
      password: String(formData.get('password') || ''),
      permissions,
    });
    return NextResponse.redirect(new URL('/admin/users?created=1', request.url), { status: 303 });
  } catch (error) {
    const message = encodeURIComponent(error instanceof Error ? error.message : 'Unable to create user.');
    return NextResponse.redirect(new URL(`/admin/users?error=${message}`, request.url), { status: 303 });
  }
}
