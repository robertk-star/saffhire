-- Additive only: stores named drafts for /admin/proposals/builder.
-- Does not touch pricing_items or proposal_pricing_pages.
create extension if not exists pgcrypto;

create table if not exists public.proposal_drafts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_name text not null default '',
  data jsonb not null default '{}'::jsonb,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists proposal_drafts_updated_at_idx
  on public.proposal_drafts (updated_at desc);

create or replace function public.set_proposal_drafts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

drop trigger if exists proposal_drafts_set_updated_at on public.proposal_drafts;
create trigger proposal_drafts_set_updated_at
before update on public.proposal_drafts
for each row execute function public.set_proposal_drafts_updated_at();

alter table public.proposal_drafts enable row level security;

drop policy if exists "No public access to proposal drafts" on public.proposal_drafts;
create policy "No public access to proposal drafts"
on public.proposal_drafts
for all
to anon, authenticated
using (false)
with check (false);

revoke all on public.proposal_drafts from anon, authenticated;

notify pgrst, 'reload schema';
