# SaffHire Phase 3 - Original Style Rebuild

This is a full project upload package for the SaffHire rebuild.

## Purpose

Phase 3 restores the more professional, established feel of the original SaffHire site while keeping the new technical foundation:

- Next.js 15 App Router
- Vercel deployment
- GitHub source control
- Supabase-ready quote/contact forms
- File-based blog posts
- SEO routes
- Sitemap
- Robots route
- `/llms.txt` AI-search summary route

## Manus upload instructions

Unzip this package.

Open the folder named `saffhire-phase3-original-style`.

Copy everything inside that folder directly into the root of the GitHub repository.

The GitHub repo root must contain `package.json` directly at the top level.

Do not upload the ZIP file itself.
Do not put the `saffhire-phase3-original-style` folder inside the repository.
Copy the contents of that folder into the repo root.

Commit and push to `main`.

## Required Vercel environment variables

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

If this migration was already run during Phase 1 or Phase 2, do not run it again.

## Notes

- Marketing site only.
- Login link points to the existing InstaScreen login.
- Public pricing is intentionally not shown.
- Primary CTA is calling SaffHire at 888-588-1733.
- Secondary CTA is requesting a quote.
- Phase 3 uses a more professional, service-heavy style closer to the original SaffHire website.
