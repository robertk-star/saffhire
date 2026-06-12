# Phase 13 Blog Image Handling

This phase improves images for admin-created and AI-generated blog posts.

## Changes

- Added default images by blog category.
- Published admin blog posts now always have an image.
- Blank image URLs use the category default image.
- The admin draft form now shows an image preview.
- Scheduled AI blog drafts now receive a default category image.
- The AI draft intake API now applies a category image if no custom image is provided.

## Files

- data/blogCategoryImages.ts
- lib/blogDrafts.ts
- components/BlogDraftForm.tsx
- app/api/cron/generate-blog-draft/route.ts
- app/api/admin/blogs/ai-draft/route.ts

## How to use

In the blog admin detail page, use the Image URL field.

Leave it blank to use the category default image.

Paste a full image URL to override the default image.

The preview shows the image that will be used.

## SQL

No SQL migration is needed.

## Vercel ENV

No new Vercel environment variables are needed.
