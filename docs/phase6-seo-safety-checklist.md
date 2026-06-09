# Phase 6 SEO Safety Checklist

This project is a Next.js migration of the original SaffHire Manus website. The goal of Phase 6 is to protect existing SEO value while preparing the site for production on Vercel.

## Do not connect the live domain until these pass

1. The Vercel preview deploys successfully.
2. The homepage visually matches the original SaffHire site closely enough for approval.
3. The main navigation works on desktop and mobile.
4. These public pages load:
   - /
   - /services
   - /industries
   - /contact
   - /why-saffhire
   - /criminal-background-checks
   - /employment-verification
   - /education-verification
   - /drug-screening
   - /mvr-checks
   - /fcra-news
   - /blog
   - /referral-partners
   - /privacy-policy
   - /terms-of-service
5. These industry pages load:
   - /industries/healthcare
   - /industries/staffing
   - /industries/transportation
   - /industries/manufacturing
   - /industries/hospitality
   - /industries/energy
   - /industries/education
   - /industries/church-nonprofit
6. Local SEO pages load:
   - /background-screening-frisco
   - /background-screening-dallas
   - /background-screening-plano
   - /background-screening-mckinney
   - /background-screening-allen
7. Sitemap loads at /sitemap.xml.
8. Robots loads at /robots.txt.
9. AI search file loads at /llms.txt.
10. Contact or quote form submission is tested after Supabase environment variables are added.
11. Search Console and Bing Webmaster Tools are ready for sitemap submission.

## Redirects included

The Next.js config includes redirects for alternate routes created during rebuild attempts, including:

- /privacy -> /privacy-policy
- /terms -> /terms-of-service
- /about -> /why-saffhire
- /request-a-quote -> /contact
- /services/* routes -> original service routes
- /industries/trucking -> /industries/transportation
- /industries/churches -> /industries/church-nonprofit

## Known temporary migration setting

The Next.js config currently ignores TypeScript and ESLint build blocking because this migration still contains legacy Manus components. This should be cleaned in a later phase after the public pages are verified.

## Recommended next cleanup phase

Phase 7 should remove unused Manus demo/admin components and reduce dependencies. Do not remove public SaffHire pages or SEO content during that cleanup.
