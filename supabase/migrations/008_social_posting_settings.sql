-- Phase 16B-1: Social Posting Settings
-- Stores settings needed before approved social drafts can be sent to Publer.

create table if not exists public.social_posting_settings (
  id text primary key default 'default',
  provider text not null default 'publer',
  publer_api_token text,
  publer_workspace_id text,
  default_schedule_delay_minutes integer not null default 60 check (default_schedule_delay_minutes >= 0),
  default_hashtags text not null default '',
  timezone text not null default 'America/Chicago',
  require_approval boolean not null default true,
  facebook_enabled boolean not null default true,
  instagram_enabled boolean not null default true,
  google_business_enabled boolean not null default true,
  linkedin_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.social_posting_settings (
  id,
  provider,
  default_schedule_delay_minutes,
  default_hashtags,
  timezone,
  require_approval,
  facebook_enabled,
  instagram_enabled,
  google_business_enabled,
  linkedin_enabled
)
values (
  'default',
  'publer',
  60,
  '',
  'America/Chicago',
  true,
  true,
  true,
  true,
  true
)
on conflict (id) do nothing;

create or replace function public.set_social_posting_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists social_posting_settings_set_updated_at on public.social_posting_settings;
create trigger social_posting_settings_set_updated_at
before update on public.social_posting_settings
for each row execute function public.set_social_posting_settings_updated_at();

alter table public.social_posting_settings enable row level security;

drop policy if exists "No public access to social posting settings" on public.social_posting_settings;
create policy "No public access to social posting settings"
on public.social_posting_settings
for all
to anon, authenticated
using (false)
with check (false);

notify pgrst, 'reload schema';
