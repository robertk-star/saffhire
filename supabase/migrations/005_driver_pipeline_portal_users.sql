create table if not exists public.driver_pipeline_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  display_name text,
  email text not null,
  password_hash text not null,
  role text not null default 'user',
  is_active boolean not null default true,
  created_by text,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.driver_pipeline_access_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  username text not null,
  display_name text,
  role text,
  action text not null,
  authorization_id uuid,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists driver_pipeline_access_log_created_idx
  on public.driver_pipeline_access_log (created_at desc);

alter table public.driver_pipeline_users enable row level security;
alter table public.driver_pipeline_access_log enable row level security;
