import { NextResponse } from 'next/server';
import { getDriverPipelineSession, isPortalAdmin } from '@/lib/driverPipelinePortal';
import { listPortalAccessLog } from '@/lib/driverPipelineUsers';

export async function GET() {
  const session = await getDriverPipelineSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const accessLog = await listPortalAccessLog(isPortalAdmin(session) ? undefined : session.username);
  return NextResponse.json({ accessLog, scope: isPortalAdmin(session) ? 'all' : 'self' });
}
