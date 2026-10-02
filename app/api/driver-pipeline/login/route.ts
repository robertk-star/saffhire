import { NextResponse } from 'next/server';
import { isCorrectDriverPipelineLogin, isDriverPipelinePortalConfigured, setDriverPipelineSession } from '@/lib/driverPipelinePortal';

export async function POST(request: Request) {
  if (!isDriverPipelinePortalConfigured()) {
    return NextResponse.redirect(new URL('/driver-pipeline/login?error=config', request.url), { status: 303 });
  }
  const formData = await request.formData().catch(() => null);
  const username = String(formData?.get('username') || '');
  const password = String(formData?.get('password') || '');
  if (!isCorrectDriverPipelineLogin(username, password)) {
    return NextResponse.redirect(new URL('/driver-pipeline/login?error=1', request.url), { status: 303 });
  }
  await setDriverPipelineSession();
  return NextResponse.redirect(new URL('/driver-pipeline/authorizations', request.url), { status: 303 });
}
