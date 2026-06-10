import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
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
  };

  return Object.entries(payload)
    .filter(([key]) => key !== 'formType')
    .map(([key, value]) => `${labels[key] || key}: ${value || ''}`)
    .join('\n');
}

async function sendEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'info@saffhire.com';
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return { sent: false, reason: 'Email is not configured.' };

  const subject = payload.formType === 'quote'
    ? 'New SaffHire quote request'
    : 'New SaffHire contact submission';

  const text = buildEmailText(payload);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => 'Unknown email error');
    return { sent: false, reason: details };
  }

  return { sent: true, reason: null };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, string> | null;
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const formType = body.formType === 'quote' ? 'quote' : 'contact';
  if (!name || !email) return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const emailConfigured = isEmailConfigured();

  if (!supabase && !emailConfigured) {
    return NextResponse.json(
      { error: 'Forms are not configured yet. Please call SaffHire at 888-588-1733.' },
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
  if (supabase) {
    const table = formType === 'quote' ? 'quote_requests' : 'contact_submissions';
    const { error } = await supabase.from(table).insert(row);
    if (error && !emailConfigured) {
      return NextResponse.json({ error: 'Could not save the request.' }, { status: 500 });
    }
    saved = !error;
  }

  const emailResult = await sendEmail({ ...body, formType }).catch((error) => ({
    sent: false,
    reason: error instanceof Error ? error.message : 'Email send failed.',
  }));

  if (!saved && !emailResult.sent) {
    return NextResponse.json(
      { error: 'Could not send or save the request. Please call SaffHire at 888-588-1733.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, saved, emailSent: emailResult.sent });
}
