# Phase 16A Blog-to-Social Draft Generator

This phase creates AI-generated social media drafts from published SaffHire blog posts.

It does not send anything to Publer yet.

## Admin pages

- /admin/social
- /admin/social/[id]

## Workflow

1. Publish a blog.
2. Go to /admin/social.
3. Select a published blog.
4. Click Generate Social Posts.
5. Review the generated posts.
6. Edit each post if needed.
7. Approve or reject each post.

## Platforms generated

- Facebook
- Instagram
- Google Business Profile
- LinkedIn

## SQL migration

Run this in the correct Supabase project:

- supabase/migrations/005_social_post_drafts.sql

## Vercel environment variables

Required:

- OPENAI_API_KEY
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Already required for admin:

- ADMIN_PASSWORD
- ADMIN_SESSION_SECRET

## What this prepares for

Phase 16B can connect approved drafts to Publer.

Phase 16C can auto-generate social drafts immediately after a blog is published.
