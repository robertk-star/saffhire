import { NextResponse } from 'next/server';
import { hasDriverPipelineSession } from '@/lib/driverPipelinePortal';
import { listAuthorizations } from '@/lib/driverPipelineAuthorization';

export async function GET(request: Request) {
  if (!(await hasDriverPipelineSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const query = new URL(request.url).searchParams.get('q') || '';
  try {
    const rows = await listAuthorizations(query);
    return NextResponse.json({ rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load authorizations.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
