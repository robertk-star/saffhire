# Phase 12B - Scheduled AI Blog Draft Generator

This phase creates AI-generated blog drafts twice per week and saves them into the SaffHire admin review queue.

Drafts are saved as:

```text
pending_review
```

They do not publish until approved and published in:

```text
/admin/blogs
```

## Files added

```text
data/blogGenerationTopics.ts
app/api/cron/generate-blog-draft/route.ts
vercel.json
supabase/migrations/003_blog_generation_runs.sql
```

## Cron schedule

The Vercel cron schedule is in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-blog-draft",
      "schedule": "0 14 * * 1"
    },
    {
      "path": "/api/cron/generate-blog-draft",
      "schedule": "0 14 * * 4"
    }
  ]
}
```

This runs Monday and Thursday at 14:00 UTC.

## Required SQL

Run this migration in the same Supabase project used by Vercel:

```text
supabase/migrations/003_blog_generation_runs.sql
```

The Phase 11 blog draft migration must already be run:

```text
supabase/migrations/002_blog_drafts_admin.sql
```

## Required Vercel environment variables

```text
OPENAI_API_KEY=your-openai-api-key
CRON_SECRET=your-long-random-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Optional:

```text
OPENAI_MODEL=gpt-4.1-mini
NEXT_PUBLIC_SITE_URL=https://www.saffhire.com
```

## Manual test

After deployment, call the endpoint manually with the secret:

```bash
curl -X GET "https://www.saffhire.com/api/cron/generate-blog-draft" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

If successful, the response includes a review URL:

```json
{
  "ok": true,
  "reviewUrl": "https://www.saffhire.com/admin/blogs/..."
}
```

Then check:

```text
/admin/blogs
```

A new draft should appear with status `pending_review`.

## Publish behavior

After the draft is published in the admin dashboard, it appears in:

```text
/blog
/blog/[slug]
/sitemap.xml
/rss.xml
/llms.txt
```

## Safety notes

- The cron endpoint does not publish blogs automatically.
- Drafts must be reviewed in the admin dashboard.
- The endpoint requires `CRON_SECRET`.
- The OpenAI prompt tells the model not to invent pricing, statistics, or legal claims.
