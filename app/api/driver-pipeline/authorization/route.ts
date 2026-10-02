import { NextResponse } from 'next/server';
import { insertAuthorization, validateAuthorization, type AuthorizationInput } from '@/lib/driverPipelineAuthorization';

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as AuthorizationInput | null;
  if (!body) return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  const errors = validateAuthorization(body);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  try {
    const saved = await insertAuthorization(body, {
      ipAddress: clientIp(request),
      userAgent: request.headers.get('user-agent'),
    });
    return NextResponse.json({ ok: true, referenceCode: saved.reference_code, signedAt: saved.signed_at });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save authorization.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
