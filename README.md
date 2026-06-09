# SaffHire Phase 5 — Original Site Converted to Next.js

This package converts the original Manus SaffHire site into a Next.js 15 App Router project while preserving the original look, content, page routes, blog content, industry pages, local pages, and service pages.

## Upload instructions for Manus

Unzip this package. Open the folder named `saffhire-phase5-original-nextjs`. Copy everything inside that folder directly into the root of the GitHub repository.

The GitHub repo root must contain `package.json` directly at the top level.

Do not upload the ZIP file itself. Do not put the `saffhire-phase5-original-nextjs` folder inside the repository.

## Vercel settings

Framework Preset: Next.js
Build Command: `npm run build`
Install Command: `npm install`
Output Directory: leave blank

## Required Vercel environment variables for form storage

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://www.saffhire.com
CONTACT_TO_EMAIL=info@saffhire.com
```

Optional email notification variables:

```text
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
```

## SQL migration

Run this in Supabase SQL Editor if it has not already been run:

```text
supabase/migrations/001_phase1_forms.sql
```
