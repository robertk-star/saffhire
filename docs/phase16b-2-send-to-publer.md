# Phase 16B-2 Send Approved Social Drafts to Publer

This phase adds the admin workflow for sending approved social post drafts to Publer.

Because Publer endpoint details can vary by account/API access, the Publer API endpoint is configurable in the admin settings page.

## Admin pages

- /admin/social
- /admin/social/settings
- /admin/social/[id]

## Workflow

1. Go to /admin/social/settings.
2. Save the Publer API token.
3. Save the Publer API endpoint.
4. Save the Publer workspace ID if Publer requires it.
5. Save the Publer account ID for each platform.
6. Generate social drafts from a blog.
7. Review and approve a draft.
8. Click Send to Publer.

## What is sent

The request payload includes:

- workspace_id
- account_id
- platform
- platform_label
- text
- media image URL
- blog link
- schedule information
- metadata showing the SaffHire source and draft ID

## Stored results

The social draft stores:

- publer_account_id
- publer_post_id when returned
- publer_response
- publer_error
- send_attempts
- sent_at

## SQL migration

Run this in the correct SaffHire Supabase project:

- supabase/migrations/009_publer_send_fields.sql

## Vercel environment variables

No new Vercel environment variables are required.

## Important note

This phase sends to the endpoint saved in /admin/social/settings. If Publer gives a different payload shape, update lib/publerClient.ts in the next patch.
