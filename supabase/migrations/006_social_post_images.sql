-- Phase 16A patch: add images to social post drafts
-- Social posts need the related blog image for Facebook, Instagram, LinkedIn, and Google Business.

alter table public.social_post_drafts
  add column if not exists image_url text;

create index if not exists social_post_drafts_image_url_idx on public.social_post_drafts(image_url);

notify pgrst, 'reload schema';
