# Admin and Internal Tools

## Admin routes

- `/admin` — admin home
- `/admin/login` — admin login
- `/admin/users` — admin user management
- `/admin/pricing` — pricing quote builder
- `/admin/pricing/quote-preview` — quote preview
- `/admin/proposals` — proposal builder
- `/admin/proposals/preview` — proposal preview
- `/admin/blogs` — blog drafts admin
- `/admin/blogs/new` — new blog draft
- `/admin/blogs/[id]` — review/edit blog draft
- `/admin/blogs/schedule` — blog generation schedule
- `/admin/blogs/topics` — blog generation topics
- `/admin/social` — social post drafts
- `/admin/social/[id]` — social post detail
- `/admin/social/settings` — social posting settings

## App links page

- `/apps` — internal noindex/nofollow app links hub
- `/apps/add` — add/edit/delete app links, intended for admin use

## App link categories

- SaffHire
- Ardykay

## Known app link already seeded

- Monitoring App — `https://monitoring-beta-one.vercel.app/`

## Pricing tool

The pricing tool uses imported pricing data and has categories such as:

- Church Price
- Staffing Price
- Trucking Price
- High Volume Price
- General Price

The client-facing quote should show price only, not cost/profit. Internal builder screens may show cost/profit for evaluation.

## Admin security posture

Admin tools should not be linked from public navigation unless intentionally exposed. Internal tools should use `noindex` and should be protected where edits are allowed.
