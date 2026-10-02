import { NextResponse } from 'next/server';
import { clearDriverPipelineSession } from '@/lib/driverPipelinePortal';

export async function POST(request: Request) {
  await clearDriverPipelineSession();
  return NextResponse.redirect(new URL('/driver-pipeline/login', request.url), { status: 303 });
}
