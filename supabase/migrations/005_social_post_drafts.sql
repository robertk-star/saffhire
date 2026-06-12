-- Phase 16A: Blog-to-Social Draft Generator
-- Creates social post drafts for published SaffHire blog posts.

create extension if not exists pgcrypto;

create table if not exists public.social_post_drafts (
  id uuid primary key default gen_random_uuid(),
  blog_slug text not null,
  blog_title text not null,
  blog_url text not null,
  platform text not null check (platform in ('facebook', 'instagram', 'google_business', 'linkedin')),
  post_text text not null default '',
  hashtags text not null default '',
  status text not null default 'draft' check (status in ('draft', 'approved', 'sent_to_publer', 'scheduled', 'failed', 'rejected')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  approved_at timestamptz,
  sent_at timestamptz
);

create unique index if not exists social_post_drafts_blog_platform_uidx on public.social_post_drafts(blog_slug, platform);
create index if not exists social_post_drafts_status_idx on public.social_post_drafts(status);
create index if not exists social_post_drafts_blog_slug_idx on public.social_post_drafts(blog_slug);
create index if not exists social_post_drafts_updated_at_idx on public.social_post_drafts(updated_at desc);

create or replace function public.set_social_post_drafts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists social_post_drafts_set_updated_at on public.social_post_drafts;
create trigger social_post_drafts_set_updated_at
before update on public.social_post_drafts
for each row execute function public.set_social_post_drafts_updated_at();

alter table public.social_post_drafts enable row level security;

drop policy if exists "No public access to social post drafts" on public.social_post_drafts;
create policy "No public access to social post drafts"
on public.social_post_drafts
for all
to anon, authenticated
using (false)
with check (false);

notify pgrst, 'reload schema';
