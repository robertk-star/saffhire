import { NextResponse } from 'next/server';
import { getDriverPipelineSession } from '@/lib/driverPipelinePortal';
import { listAuthorizations } from '@/lib/driverPipelineAuthorization';
import { logPortalAccess } from '@/lib/driverPipelineUsers';

export async function GET(request: Request) {
  const session = await getDriverPipelineSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const query = new URL(request.url).searchParams.get('q') || '';
  try {
    const rows = await listAuthorizations(query);
    await logPortalAccess(session, {
      action: query ? 'searched_authorizations' : 'viewed_authorizations',
      ipAddress: (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || null,
      userAgent: request.headers.get('user-agent'),
    });
    return NextResponse.json({ rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load authorizations.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
