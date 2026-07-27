create extension if not exists pgcrypto;

create table if not exists public.proposal_pricing_pages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  minimum_package jsonb not null default '[]'::jsonb,
  individual_pricing jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists proposal_pricing_pages_sort_order_idx
  on public.proposal_pricing_pages (sort_order, name);

create or replace function public.set_proposal_pricing_pages_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists proposal_pricing_pages_set_updated_at on public.proposal_pricing_pages;
create trigger proposal_pricing_pages_set_updated_at
before update on public.proposal_pricing_pages
for each row execute function public.set_proposal_pricing_pages_updated_at();

alter table public.proposal_pricing_pages enable row level security;

drop policy if exists "No public access to proposal pricing pages" on public.proposal_pricing_pages;
create policy "No public access to proposal pricing pages"
on public.proposal_pricing_pages
for all
to anon, authenticated
using (false)
with check (false);

-- Seed the three default price sheets if the table is empty
insert into public.proposal_pricing_pages (name, description, minimum_package, individual_pricing, sort_order)
select * from (
  values
  (
    'SaffHire Direct Pricing',
    'Standard direct client pricing from the sample proposal.',
    '[{"label":"Social Security Trace","price":"$5.00"},{"label":"Sex Offender Registry","price":"Included"},{"label":"Global Security Watch List","price":"Included"},{"label":"National Database Search","price":"Included"}]'::jsonb,
    '[{"label":"Federal Search","price":"$5.00"},{"label":"MVR","price":"$4.50"},{"label":"Safety Performance","price":"$10.00"},{"label":"DOT Verification","price":"$5.00"},{"label":"1 County Criminal Search","price":"$6.00"},{"label":"3 County Criminal Searches","price":"$16.50"},{"label":"Civil Search Upper Only","price":"$6.50"},{"label":"Civil Search Lower Only","price":"$6.50"},{"label":"Civil Search Upper & Lower","price":"$11.00"},{"label":"Education Verification","price":"$9.00"},{"label":"Employment Verification","price":"$9.00"},{"label":"WOTC","price":"$5.00"},{"label":"Drug Screening","price":"$28.50"},{"label":"State Database Search","price":"$3.00"},{"label":"Healthcare/MedEx/OIG","price":"$8.00"},{"label":"Medical License Verification","price":"$9.00"},{"label":"Continuous Monitoring","price":"$2.00"}]'::jsonb,
    1
  ),
  (
    'Staffing Company Pricing',
    'Pricing oriented for staffing company clients.',
    '[{"label":"Social Security Trace","price":"$5.00"},{"label":"Sex Offender Registry","price":"Included"},{"label":"Global Security Watch List","price":"Included"},{"label":"National Database Search","price":"Included"}]'::jsonb,
    '[{"label":"Federal Search","price":"$5.00"},{"label":"MVR","price":"$4.50"},{"label":"Safety Performance","price":"$10.00"},{"label":"DOT Verification","price":"$5.00"},{"label":"1 County Criminal Search","price":"$6.00"},{"label":"3 County Criminal Searches","price":"$16.50"},{"label":"Civil Search Upper Only","price":"$6.50"},{"label":"Civil Search Lower Only","price":"$6.50"},{"label":"Civil Search Upper & Lower","price":"$11.00"},{"label":"Education Verification","price":"$9.00"},{"label":"Employment Verification","price":"$9.00"},{"label":"WOTC","price":"$5.00"},{"label":"Drug Screening","price":"$28.50"},{"label":"State Database Search","price":"$3.00"},{"label":"Healthcare/MedEx/OIG","price":"$8.00"},{"label":"Medical License Verification","price":"$9.00"},{"label":"Continuous Monitoring","price":"$2.00"}]'::jsonb,
    2
  ),
  (
    'Staffing + 10% Sales Coverage',
    'Staffing pricing with a 10% uplift to cover salesperson cost.',
    '[{"label":"Social Security Trace","price":"$5.50"},{"label":"Sex Offender Registry","price":"Included"},{"label":"Global Security Watch List","price":"Included"},{"label":"National Database Search","price":"Included"}]'::jsonb,
    '[{"label":"Federal Search","price":"$5.50"},{"label":"MVR","price":"$4.95"},{"label":"Safety Performance","price":"$11.00"},{"label":"DOT Verification","price":"$5.50"},{"label":"1 County Criminal Search","price":"$6.60"},{"label":"3 County Criminal Searches","price":"$18.15"},{"label":"Civil Search Upper Only","price":"$7.15"},{"label":"Civil Search Lower Only","price":"$7.15"},{"label":"Civil Search Upper & Lower","price":"$12.10"},{"label":"Education Verification","price":"$9.90"},{"label":"Employment Verification","price":"$9.90"},{"label":"WOTC","price":"$5.50"},{"label":"Drug Screening","price":"$31.35"},{"label":"State Database Search","price":"$3.30"},{"label":"Healthcare/MedEx/OIG","price":"$8.80"},{"label":"Medical License Verification","price":"$9.90"},{"label":"Continuous Monitoring","price":"$2.20"}]'::jsonb,
    3
  )
) as seed(name, description, minimum_package, individual_pricing, sort_order)
where not exists (select 1 from public.proposal_pricing_pages limit 1);

notify pgrst, 'reload schema';
