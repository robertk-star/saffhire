import { NextResponse } from 'next/server';
import { insertAuthorization, validateAuthorization, type AuthorizationInput } from '@/lib/driverPipelineAuthorization';

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null;
}

async function notify(referenceCode: string, input: AuthorizationInput) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.DRIVER_PIPELINE_NOTIFY_EMAIL || process.env.CONTACT_TO_EMAIL;
  if (!key || !from || !to) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Driver Pipeline authorization received: ${input.lastName}, ${input.firstName}`,
      text: [
        'A Driver Pipeline applicant submitted a background and MVR authorization.',
        `Reference: ${referenceCode}`,
        `Name: ${input.firstName} ${input.middleName} ${input.lastName}`.replace(/\s+/g, ' '),
        `Email: ${input.email}`,
        `Phone: ${input.phone || 'not provided'}`,
        `License state: ${input.issuingState}`,
        'Social Security number is not included in this email. Download the signed PDF from SaffHire admin.',
      ].join('\n'),
    }),
  }).catch(() => null);
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
    await notify(saved.reference_code, body);
    return NextResponse.json({ ok: true, referenceCode: saved.reference_code, signedAt: saved.signed_at });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save authorization.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
