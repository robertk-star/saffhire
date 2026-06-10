# Phase 10 Go-Live Tracking Checklist

Use this checklist before pointing the SaffHire domain to Vercel and again after the domain is live.

## Optional Vercel environment variables

Add these only when you are ready to activate tracking:

```text
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.saffhire.com
```

Notes:

- `NEXT_PUBLIC_GA_ID` enables Google Analytics 4.
- `NEXT_PUBLIC_GTM_ID` enables Google Tag Manager.
- If both are blank, the site still works normally.
- `NEXT_PUBLIC_SITE_URL` should be set to the final production domain before going live.

## Conversion events available

The site now sends these event names to GTM/GA when tracking is enabled:

```text
contact_form_submit
quote_cta_click
phone_click
email_click
login_click
create_account_click
contact_click
guide_hub_click
service_link_click
footer_link_click
social_click
```

## Pages to test before launch

```text
/
/contact
/background-screening-guides
/national-criminal-database-search
/county-criminal-background-checks
/healthcare-sanctions-oig-checks
/volunteer-background-checks
/small-business-background-checks
/sitemap.xml
/robots.txt
/llms.txt
/rss.xml
```

## Form test

1. Open `/contact`.
2. Submit a test contact form.
3. Confirm the thank-you message appears.
4. If Supabase/email is enabled, confirm the lead is stored/sent.
5. If GTM/GA is enabled, confirm `contact_form_submit` fires once.

## Click tracking test

Use GTM Preview or GA DebugView to test these clicks:

```text
Footer phone number -> phone_click
Contact page phone number -> phone_click
Contact page email -> email_click
Get Quote button -> quote_cta_click
Footer Login -> login_click
Footer Create Account -> create_account_click
Footer Background Screening Guides -> guide_hub_click
Footer service links -> service_link_click
```

## Indexing files

Confirm these load without errors:

```text
/sitemap.xml
/robots.txt
/llms.txt
/rss.xml
```

## 404 safety test

Open a fake page such as:

```text
/this-page-should-not-exist
```

Confirm it shows the SaffHire not-found page instead of a rough error.

## After launch

1. Submit `https://www.saffhire.com/sitemap.xml` in Google Search Console.
2. Submit the same sitemap in Bing Webmaster Tools.
3. Check Google Search Console Coverage/Pages after 24-72 hours.
4. Check Bing indexing after 24-72 hours.
5. Keep the old Manus site available for a few days as backup.
