# SaffHire Phase 2 Option 2 Upload

This is a full Next.js 15 marketing-site rebuild for SaffHire Background Screening.

## Manus upload instruction

Unzip this package. Open the `saffhire-phase2-option2` folder. Copy everything inside that folder directly into the root of the GitHub repository.

The GitHub repo root must contain `package.json` directly at the top level.

## Tech

- Next.js 15 App Router
- React 19
- Supabase form storage
- Vercel hosting
- File-based blog posts
- SEO routes: sitemap, robots, llms.txt

## Vercel environment variables

Required for forms:

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://www.saffhire.com
CONTACT_TO_EMAIL=info@saffhire.com
```

Optional for email notifications:

```text
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
```

## SQL migration

Run this in Supabase SQL Editor:

```text
supabase/migrations/001_phase1_forms.sql
```

## Notes

- Marketing site only.
- Public pricing is intentionally not shown.
- Primary CTA is calling SaffHire at 888-588-1733.
- Secondary CTA is requesting a quote.
- The logo is included in `public/saffhire-logo.png`.
