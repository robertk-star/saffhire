-- Phase 11: Blog Draft Approval Admin
-- Safe to run once. Creates the blog_drafts table used by /admin/blogs.

create extension if not exists pgcrypto;

create table if not exists public.blog_drafts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Background Screening',
  author text not null default 'SaffHire Compliance Team',
  image_url text,
  read_time text not null default '8 min read',
  status text not null default 'pending_review' check (
    status in ('draft', 'pending_review', 'changes_requested', 'approved', 'published', 'rejected')
  ),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  approved_at timestamptz,
  published_at timestamptz
);

create index if not exists blog_drafts_status_idx on public.blog_drafts(status);
create index if not exists blog_drafts_slug_idx on public.blog_drafts(slug);
create index if not exists blog_drafts_published_at_idx on public.blog_drafts(published_at desc);

create or replace function public.set_blog_drafts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_drafts_set_updated_at on public.blog_drafts;
create trigger blog_drafts_set_updated_at
before update on public.blog_drafts
for each row execute function public.set_blog_drafts_updated_at();

alter table public.blog_drafts enable row level security;

-- No public browser access. Server-side API uses the Supabase service role key.
drop policy if exists "No public access to blog drafts" on public.blog_drafts;
create policy "No public access to blog drafts"
on public.blog_drafts
for all
to anon, authenticated
using (false)
with check (false);
