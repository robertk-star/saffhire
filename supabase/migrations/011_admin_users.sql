create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  display_name text,
  password_hash text not null,
  permissions text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_users_username_idx on public.admin_users (lower(username));

alter table public.admin_users enable row level security;

drop trigger if exists admin_users_set_updated_at on public.admin_users;
drop function if exists public.set_admin_users_updated_at();

create function public.set_admin_users_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger admin_users_set_updated_at
before update on public.admin_users
for each row
execute function public.set_admin_users_updated_at();
