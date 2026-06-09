import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function sendEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || 'info@saffhire.com';
  if (!apiKey || !from) return;

  const text = Object.entries(payload)
    .map(([key, value]) => `${key}: ${value || ''}`)
    .join('\n');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'New SaffHire website quote request',
      text,
    }),
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required.' });
    return;
  }

  const supabase = getSupabaseAdmin();

  const row = {
    name,
    company: String(body.company || '').trim() || null,
    email,
    phone: String(body.phone || '').trim() || null,
    industry: String(body.industry || '').trim() || null,
    monthly_volume: String(body.monthlyVolume || body.volume || '').trim() || null,
    message: String(body.message || '').trim() || null,
    source_path: req.headers.referer || null,
    status: 'new',
  };

  if (supabase) {
    const { error } = await supabase.from('quote_requests').insert(row);
    if (error) {
      res.status(500).json({ error: 'Could not save the request.' });
      return;
    }
  }

  await sendEmail({
    name: row.name,
    company: row.company || '',
    email: row.email,
    phone: row.phone || '',
    industry: row.industry || '',
    monthlyVolume: row.monthly_volume || '',
    message: row.message || '',
  }).catch(() => null);

  res.status(200).json({ ok: true });
}
