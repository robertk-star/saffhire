create extension if not exists pgcrypto;

create table if not exists public.pricing_items (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  state text not null,
  cost numeric,
  taz_fee numeric,
  cc_fee numeric,
  total_cost numeric,
  county_access_fee_low numeric,
  county_access_fee_high numeric,
  mvr_access_fee numeric,
  church_price numeric,
  staffing_price numeric,
  trucking_price numeric,
  high_volume_price numeric,
  general_price numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pricing_items_state_idx on public.pricing_items (state);
create index if not exists pricing_items_service_idx on public.pricing_items (service);
create unique index if not exists pricing_items_service_state_unique_idx on public.pricing_items (lower(service), lower(state));

alter table public.pricing_items enable row level security;

drop trigger if exists pricing_items_set_updated_at on public.pricing_items;
drop function if exists public.set_pricing_items_updated_at();

create function public.set_pricing_items_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger pricing_items_set_updated_at
before update on public.pricing_items
for each row
execute function public.set_pricing_items_updated_at();
