-- Phase 12B: Scheduled AI Blog Draft Generator run log
-- Safe to run once. Creates a simple log table for cron blog generation runs.

create extension if not exists pgcrypto;

create table if not exists public.blog_generation_runs (
  id uuid primary key default gen_random_uuid(),
  topic text,
  slug text,
  status text not null default 'started' check (status in ('started', 'success', 'failed')),
  error_message text,
  draft_id uuid references public.blog_drafts(id) on delete set null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists blog_generation_runs_status_idx on public.blog_generation_runs(status);
create index if not exists blog_generation_runs_created_at_idx on public.blog_generation_runs(created_at desc);

alter table public.blog_generation_runs enable row level security;

drop policy if exists "No public access to blog generation runs" on public.blog_generation_runs;
create policy "No public access to blog generation runs"
on public.blog_generation_runs
for all
to anon, authenticated
using (false)
with check (false);

notify pgrst, 'reload schema';
