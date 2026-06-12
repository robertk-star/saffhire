import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getSocialPostingSettings } from '@/lib/socialPostingSettings';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function checked(formData: FormData, key: string) {
  return formData.get(key) === 'true';
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim() || null;
}

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const formData = await request.formData();
  const current = await getSocialPostingSettings();
  const newToken = String(formData.get('publer_api_token') || '').trim();
  const delay = Number(formData.get('default_schedule_delay_minutes') || 60);

  const update = {
    id: 'default',
    provider: 'publer',
    publer_api_token: newToken || current.publer_api_token || null,
    publer_api_endpoint: text(formData, 'publer_api_endpoint'),
    publer_workspace_id: text(formData, 'publer_workspace_id'),
    publer_facebook_account_id: text(formData, 'publer_facebook_account_id'),
    publer_instagram_account_id: text(formData, 'publer_instagram_account_id'),
    publer_google_business_account_id: text(formData, 'publer_google_business_account_id'),
    publer_linkedin_account_id: text(formData, 'publer_linkedin_account_id'),
    default_schedule_delay_minutes: Number.isInteger(delay) && delay >= 0 ? delay : 60,
    default_hashtags: String(formData.get('default_hashtags') || '').trim(),
    timezone: String(formData.get('timezone') || 'America/Chicago'),
    require_approval: checked(formData, 'require_approval'),
    facebook_enabled: checked(formData, 'facebook_enabled'),
    instagram_enabled: checked(formData, 'instagram_enabled'),
    google_business_enabled: checked(formData, 'google_business_enabled'),
    linkedin_enabled: checked(formData, 'linkedin_enabled'),
  };

  const { error } = await supabase
    .from('social_posting_settings')
    .upsert(update, { onConflict: 'id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.redirect(new URL('/admin/social/settings', request.url), { status: 303 });
}
