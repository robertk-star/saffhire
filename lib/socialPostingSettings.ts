import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type SocialPostingSettings = {
  id: string;
  provider: string;
  publer_api_token: string | null;
  publer_workspace_id: string | null;
  default_schedule_delay_minutes: number;
  default_hashtags: string;
  timezone: string;
  require_approval: boolean;
  facebook_enabled: boolean;
  instagram_enabled: boolean;
  google_business_enabled: boolean;
  linkedin_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type SafeSocialPostingSettings = Omit<SocialPostingSettings, 'publer_api_token'> & {
  has_publer_api_token: boolean;
};

export const defaultSocialPostingSettings: SocialPostingSettings = {
  id: 'default',
  provider: 'publer',
  publer_api_token: null,
  publer_workspace_id: null,
  default_schedule_delay_minutes: 60,
  default_hashtags: '',
  timezone: 'America/Chicago',
  require_approval: true,
  facebook_enabled: true,
  instagram_enabled: true,
  google_business_enabled: true,
  linkedin_enabled: true,
  created_at: new Date(0).toISOString(),
  updated_at: new Date(0).toISOString(),
};

export async function getSocialPostingSettings() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultSocialPostingSettings;

  const { data, error } = await supabase
    .from('social_posting_settings')
    .select('*')
    .eq('id', 'default')
    .single();

  if (error || !data) return defaultSocialPostingSettings;
  return data as SocialPostingSettings;
}

export async function getSafeSocialPostingSettings() {
  const settings = await getSocialPostingSettings();
  const safe: SafeSocialPostingSettings = {
    id: settings.id,
    provider: settings.provider,
    publer_workspace_id: settings.publer_workspace_id,
    default_schedule_delay_minutes: settings.default_schedule_delay_minutes,
    default_hashtags: settings.default_hashtags,
    timezone: settings.timezone,
    require_approval: settings.require_approval,
    facebook_enabled: settings.facebook_enabled,
    instagram_enabled: settings.instagram_enabled,
    google_business_enabled: settings.google_business_enabled,
    linkedin_enabled: settings.linkedin_enabled,
    created_at: settings.created_at,
    updated_at: settings.updated_at,
    has_publer_api_token: Boolean(settings.publer_api_token),
  };

  return safe;
}
