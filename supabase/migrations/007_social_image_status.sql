-- Phase 16A image reliability patch
-- Track whether each social post image is the blog fallback or an AI-generated image.

alter table public.social_post_drafts
  add column if not exists image_source text not null default 'blog_fallback' check (image_source in ('blog_fallback', 'ai_generated', 'custom')),
  add column if not exists image_generation_error text,
  add column if not exists image_generated_at timestamptz;

create index if not exists social_post_drafts_image_source_idx on public.social_post_drafts(image_source);

notify pgrst, 'reload schema';
