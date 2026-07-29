# Technical Stack

This is based on the uploaded current GitHub files.

## Framework

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS

## Hosting

- Vercel

## Database / backend

- Supabase is used for several admin and site features.
- Supabase service role access is handled through server-side code.

## Important environment variables from project documentation

Required public/form storage variables:

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://www.saffhire.com
CONTACT_TO_EMAIL=info@saffhire.com
```

Optional email variables:

```text
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
```

Admin-related variables used by code:

```text
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

Other optional/admin integrations present in the codebase may include:

```text
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=
OPENAI_IMAGE_SIZE=
PUBLER_API_KEY=
```

## Important directories

- `app/` — Next.js App Router pages and API routes
- `components/` — shared UI and page components
- `legacy/` — converted legacy page components
- `lib/` — server-side utility logic
- `data/` — blog, SEO, and content data
- `shared/` — shared types and content helpers
- `supabase/migrations/` — database migration SQL files
- `public/` — static assets

## Build commands

```text
npm install
npm run build
```

## Caution

The repo has public pages, admin pages, API routes, and internal app links. Small changes to shared files like `Navbar.tsx`, `Footer.tsx`, `next.config.js`, `tsconfig.json`, or `package.json` can affect the whole site.
