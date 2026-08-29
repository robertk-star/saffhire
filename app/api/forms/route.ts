import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const FROM = 'SaffHire <beth.t@example.com>';
const CONTACT_TO = 'info@saffhire.com';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  return {
    apiKey,
    from: FROM,
    to: [CONTACT_TO],
    configured: Boolean(apiKey),
  };
}

function buildEmailText(payload: Record<string, string>) {
  const labels: Record<string, string> = {
    formType: 'Form Type',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    phone: 'Phone',
    industry: 'Industry',
    monthlyVolume: 'Monthly Volume',
    message: 'Message',
    page: 'Submitted From',
  };

  return Object.entries(payload)
    .filter(([key]) => key !== 'formType')
    .map(([key, value]) => `${labels[key] || key}: ${value || ''}`)
    .join('\n');
}

async function sendEmail(payload: Record<string, string>) {
  const { apiKey, to, from, configured } = getEmailConfig();
  if (!configured || !apiKey) {
    return { sent: false, reason: 'Email delivery is not configured. Add RESEND_API_KEY in Vercel.' };
  }

  const subject = payload.formType === 'quote'
    ? 'New SaffHire quote request'
    : 'New SaffHire contact submission';

  const text = buildEmailText(payload);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject,
      text,
    }),
  });

  const details = await response.text().catch(() => 'Unknown email error');
  if (!response.ok) {
    return { sent: false, reason: details };
  }

  return { sent: true, reason: details };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, string> | null;
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const formType = body.formType === 'quote' ? 'quote' : 'contact';
  if (!name || !email) return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const emailConfig = getEmailConfig();

  if (!emailConfig.configured) {
    return NextResponse.json(
      { error: 'Email delivery is not configured yet. Add RESEND_API_KEY in Vercel, then redeploy.' },
      { status: 503 }
    );
  }

  const row = {
    name,
    company: String(body.company || '').trim() || null,
    email,
    phone: String(body.phone || '').trim() || null,
    industry: String(body.industry || '').trim() || null,
    monthly_volume: String(body.monthlyVolume || '').trim() || null,
    message: String(body.message || '').trim() || null,
    source_path: request.headers.get('referer'),
  };

  let saved = false;
  let saveError: string | null = null;
  if (supabase) {
    const table = formType === 'quote' ? 'quote_requests' : 'contact_submissions';
    const { error } = await supabase.from(table).insert(row);
    saved = !error;
    saveError = error?.message || null;
  }

  const emailResult = await sendEmail({
    ...body,
    formType,
    page: request.headers.get('referer') || '',
  }).catch((error) => ({
    sent: false,
    reason: error instanceof Error ? error.message : 'Email send failed.',
  }));

  if (!emailResult.sent) {
    return NextResponse.json(
      {
        error: `Email did not send to ${CONTACT_TO}. ${emailResult.reason || 'Check Resend logs.'}`,
        saved,
        saveError,
        emailSent: false,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    saved,
    saveError,
    emailSent: true,
    deliveredTo: CONTACT_TO,
  });
}
