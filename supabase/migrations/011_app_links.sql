create table if not exists public.app_links (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('SaffHire', 'Ardykay')),
  name text not null,
  description text,
  url text not null,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists app_links_category_sort_idx
on public.app_links (category, sort_order, name);

insert into public.app_links (category, name, description, url, sort_order)
select
  'SaffHire',
  'Monitoring App',
  'SaffHire monitoring dashboard and safety performance tools.',
  'https://monitoring-beta-one.vercel.app/',
  10
where not exists (
  select 1 from public.app_links where url = 'https://monitoring-beta-one.vercel.app/'
);
