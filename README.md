# SaffHire Phase 1

Next.js 15 marketing website rebuild for SaffHire Background Screening.

## Tech

- Next.js 15 App Router
- React 19
- Supabase for contact and quote form storage
- Vercel hosting
- File-based blog posts

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

Run this in Supabase SQL Editor:

```text
supabase/migrations/001_phase1_forms.sql
```

## Notes

- Marketing site only.
- Login link points to the existing InstaScreen login.
- Public pricing is intentionally not shown.
- Primary CTA is calling SaffHire at 888-588-1733.
- Secondary CTA is requesting a quote.
