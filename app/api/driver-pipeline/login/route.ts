import { NextResponse } from 'next/server';
import { isCorrectDriverPipelineLogin, isDriverPipelinePortalConfigured, setDriverPipelineSession } from '@/lib/driverPipelinePortal';
import { findPortalUser, logPortalAccess, markPortalLogin, verifyPortalPassword } from '@/lib/driverPipelineUsers';

function clientIp(request: Request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || request.headers.get('x-real-ip') || null;
}

export async function POST(request: Request) {
  if (!isDriverPipelinePortalConfigured()) {
    return NextResponse.redirect(new URL('/driver-pipeline/login?error=config', request.url), { status: 303 });
  }
  const formData = await request.formData().catch(() => null);
  const username = String(formData?.get('username') || '');
  const password = String(formData?.get('password') || '');
  const ipAddress = clientIp(request);
  const userAgent = request.headers.get('user-agent');

  if (isCorrectDriverPipelineLogin(username, password)) {
    const session = { userId: 'owner', username: username.trim().toLowerCase(), displayName: 'Owner', role: 'owner' as const };
    await setDriverPipelineSession(session);
    await logPortalAccess(session, { action: 'login', ipAddress, userAgent });
    return NextResponse.redirect(new URL('/driver-pipeline/authorizations', request.url), { status: 303 });
  }

  const user = await findPortalUser(username);
  if (user && user.is_active && verifyPortalPassword(password, user.password_hash)) {
    const session = {
      userId: user.id,
      username: user.username,
      displayName: user.display_name || user.username,
      role: user.role === 'admin' ? 'admin' as const : 'user' as const,
    };
    await setDriverPipelineSession(session);
    await markPortalLogin(user.id);
    await logPortalAccess(session, { action: 'login', ipAddress, userAgent });
    return NextResponse.redirect(new URL('/driver-pipeline/authorizations', request.url), { status: 303 });
  }

  return NextResponse.redirect(new URL('/driver-pipeline/login?error=1', request.url), { status: 303 });
}
