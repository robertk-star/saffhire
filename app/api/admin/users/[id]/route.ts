import { NextResponse } from 'next/server';
import { hasAdminPermission } from '@/lib/adminAuth';
import { updateAdminUser } from '@/lib/adminUsers';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  if (!(await hasAdminPermission('users'))) {
    return NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const permissions = formData.getAll('permissions').map(String);
  const password = String(formData.get('password') || '');
  const isActive = formData.get('is_active') === 'true' || formData.get('is_active') === 'on';

  try {
    await updateAdminUser(id, {
      username: String(formData.get('username') || ''),
      displayName: String(formData.get('display_name') || ''),
      password: password || undefined,
      permissions,
      isActive,
    });
    return NextResponse.redirect(new URL('/admin/users?updated=1', request.url), { status: 303 });
  } catch (error) {
    const message = encodeURIComponent(error instanceof Error ? error.message : 'Unable to update user.');
    return NextResponse.redirect(new URL(`/admin/users?error=${message}`, request.url), { status: 303 });
  }
}
