import { NextResponse } from 'next/server';
import { getDriverPipelineSession, isPortalAdmin } from '@/lib/driverPipelinePortal';
import { createPortalUser, listPortalAccessLog, listPortalUsers, logPortalAccess, sendPortalInvite, setPortalUserActive } from '@/lib/driverPipelineUsers';

function clientIp(request: Request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || null;
}

async function requireAdmin() {
  const session = await getDriverPipelineSession();
  if (!isPortalAdmin(session) || !session) return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const [users, accessLog] = await Promise.all([listPortalUsers(), listPortalAccessLog()]);
  return NextResponse.json({ users, accessLog });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null) as { username?: string; displayName?: string; email?: string; role?: 'admin' | 'user'; userId?: string; isActive?: boolean; action?: string } | null;
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  if (body.action === 'status' && body.userId) {
    await setPortalUserActive(body.userId, Boolean(body.isActive));
    await logPortalAccess(session, { action: body.isActive ? 'reactivated_user' : 'deactivated_user', ipAddress: clientIp(request), userAgent: request.headers.get('user-agent') });
    return NextResponse.json({ ok: true });
  }

  const created = await createPortalUser({
    username: body.username || '',
    displayName: body.displayName || '',
    email: body.email || '',
    role: body.role === 'admin' ? 'admin' : 'user',
    createdBy: session.username,
  });
  const invited = await sendPortalInvite({
    email: created.user.email,
    username: created.user.username,
    displayName: created.user.display_name,
    temporaryPassword: created.temporaryPassword,
  });
  await logPortalAccess(session, { action: created.user.role === 'admin' ? 'created_admin' : 'invited_user', ipAddress: clientIp(request), userAgent: request.headers.get('user-agent') });
  return NextResponse.json({ ok: true, invited, user: created.user, temporaryPassword: created.temporaryPassword });
}
