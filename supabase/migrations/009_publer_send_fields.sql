-- Phase 16B-2: Publer Send Fields
-- Adds fields needed to send approved social drafts to Publer and store send results.

alter table public.social_posting_settings
  add column if not exists publer_api_endpoint text,
  add column if not exists publer_facebook_account_id text,
  add column if not exists publer_instagram_account_id text,
  add column if not exists publer_google_business_account_id text,
  add column if not exists publer_linkedin_account_id text;

alter table public.social_post_drafts
  add column if not exists publer_account_id text,
  add column if not exists publer_post_id text,
  add column if not exists publer_response jsonb,
  add column if not exists publer_error text,
  add column if not exists send_attempts integer not null default 0;

create index if not exists social_post_drafts_publer_post_id_idx on public.social_post_drafts(publer_post_id);
create index if not exists social_post_drafts_send_attempts_idx on public.social_post_drafts(send_attempts);

notify pgrst, 'reload schema';
