# Phase 16B-1 Social Posting Settings

This phase prepares the SaffHire admin for sending approved social posts to Publer in a later phase.

It does not send anything to Publer yet.

## Admin page

- /admin/social/settings

## What can be saved

- Publer API token
- Publer workspace ID
- Default schedule delay in minutes
- Default hashtags
- Time zone
- Require approval before sending
- Active platforms
  - Facebook
  - Instagram
  - Google Business Profile
  - LinkedIn

## Security note

The Publer API token is not displayed back on the settings page after saving.

The settings table has row level security enabled and no anon/authenticated public access. Server-side admin code uses the Supabase service role.

## SQL migration

Run this in the correct SaffHire Supabase project:

- supabase/migrations/008_social_posting_settings.sql

## Vercel environment variables

No new Vercel environment variables are required for Phase 16B-1.

## Next phase

Phase 16B-2 can add a Send to Publer button for approved social post drafts.
