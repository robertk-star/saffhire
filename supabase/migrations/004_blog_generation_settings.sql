-- Phase 15: Blog Generation Schedule Settings
-- Allows admin-controlled schedule settings while Vercel cron checks hourly.

create table if not exists public.blog_generation_settings (
  id text primary key default 'default',
  enabled boolean not null default true,
  timezone text not null default 'America/Chicago',
  days_of_week integer[] not null default array[1,4],
  hour_local integer not null default 9 check (hour_local >= 0 and hour_local <= 23),
  last_run_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.blog_generation_settings (id, enabled, timezone, days_of_week, hour_local)
values ('default', true, 'America/Chicago', array[1,4], 9)
on conflict (id) do nothing;

create or replace function public.set_blog_generation_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_generation_settings_set_updated_at on public.blog_generation_settings;
create trigger blog_generation_settings_set_updated_at
before update on public.blog_generation_settings
for each row execute function public.set_blog_generation_settings_updated_at();

alter table public.blog_generation_settings enable row level security;

drop policy if exists "No public access to blog generation settings" on public.blog_generation_settings;
create policy "No public access to blog generation settings"
on public.blog_generation_settings
for all
to anon, authenticated
using (false)
with check (false);

notify pgrst, 'reload schema';
