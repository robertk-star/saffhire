import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_FROM = 'SaffHire <beth.t@example.com>';
const CONTACT_TO = 'info@saffhire.com';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function normalizeFrom(value?: string | null) {
  const from = String(value || '').trim();
  if (!from) return DEFAULT_FROM;
  if (/chatarai\.com/i.test(from)) return DEFAULT_FROM;
  if (/resend\.dev/i.test(from)) return from;
  if (/saffhire\.com/i.test(from)) return from;
  return DEFAULT_FROM;
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = normalizeFrom(process.env.CONTACT_FROM_EMAIL);
  const extraTo = String(process.env.CONTACT_TO_EMAIL || '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item && !/chatarai\.com/i.test(item) && item.toLowerCase() !== CONTACT_TO);
  const to = [CONTACT_TO, ...extraTo];
  return { apiKey, from, to, configured: Boolean(apiKey) };
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
        error: `Email did not send to ${CONTACT_TO}. ${emailResult.reason || 'Check Resend domain verification and Vercel env vars.'}`,
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
