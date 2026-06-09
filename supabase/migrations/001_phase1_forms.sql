create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  phone text,
  industry text,
  monthly_volume text,
  message text,
  source_path text,
  status text not null default 'new'
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  phone text,
  industry text,
  monthly_volume text,
  message text,
  source_path text,
  status text not null default 'new'
);

alter table public.quote_requests enable row level security;
alter table public.contact_submissions enable row level security;

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
