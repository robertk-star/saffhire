import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function sendEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'info@saffhire.com';
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return { skipped: true };
  const subject = payload.formType === 'quote' ? 'New SaffHire quote request' : 'New SaffHire contact submission';
  const body = Object.entries(payload).map(([key, value]) => `${key}: ${value || ''}`).join('\n');
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text: body }),
  });
  return { skipped: false };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, string> | null;
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const formType = body.formType === 'quote' ? 'quote' : 'contact';
  if (!name || !email) return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });

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

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Forms are not configured yet. Please call SaffHire at 888-588-1733.' }, { status: 503 });

  const table = formType === 'quote' ? 'quote_requests' : 'contact_submissions';
  const { error } = await supabase.from(table).insert(row);
  if (error) return NextResponse.json({ error: 'Could not save the request.' }, { status: 500 });

  await sendEmail({ ...body, formType }).catch(() => null);
  return NextResponse.json({ ok: true });
}
