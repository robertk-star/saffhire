/**
 * Permanent redirects for URLs Google Search Console reported as soft 404s
 * (almost all /blog/) or as hard 404s (leftover template pages).
 * Live posts are not redirected. /blog/fcra-adverse-action-two-step-notice-requirements-2026
 * is intentionally absent from this list.
 *
 * gsc: "soft" = Search Console soft 404 (these URLs now return HTTP 404)
 *      "hard" = Search Console Not found (404)
 */
const gscRedirects = [
  // Former blog posts that rendered as soft 404s and now return HTTP 404.
  { source: "/blog/screening-healthcare-workers-what-employers-must-verify", destination: "/blog/healthcare-oig-exclusion-screening-sanctions-license-risks", gsc: "soft" },
  { source: "/blog/how-long-background-checks-go-back-7-year-rule", destination: "/blog/texas-background-check-laws-employers", gsc: "soft" },
  { source: "/blog/true-cost-of-bad-hire", destination: "/blog/fcra-enforcement-2026-employer-background-screening-compliance", gsc: "soft" },
  { source: "/blog/top-industries-that-require-most-screening", destination: "/industries", gsc: "soft" },
  { source: "/blog/ai-in-background-screening-faster-smarter-more-reliable", destination: "/blog/ai-powered-resume-fraud-hiring-challenge", gsc: "soft" },
  { source: "/blog/nyc-aedt-law-background-screening-compliance", destination: "/blog/fcra-compliance-2026-background-screening-employers", gsc: "soft" },
  { source: "/blog/instant-drug-screening-now-available", destination: "/instant-drug-testing", gsc: "soft" },
  { source: "/blog/new-background-screening-rules-healthcare-staffing-2026", destination: "/industries/healthcare", gsc: "soft" },
  { source: "/blog/national-criminal-database-vs-county-search", destination: "/blog/types-of-criminal-background-checks", gsc: "soft" },
  { source: "/blog/background-checks-for-staffing-agencies", destination: "/blog/staffing-background-checks-speed-consistency-compliance", gsc: "soft" },
  { source: "/blog/church-volunteer-background-checks", destination: "/blog/volunteer-background-checks-churches-nonprofits", gsc: "soft" },
  { source: "/blog/1", destination: "/blog", gsc: "soft" },

  // Topic slugs that 404 after the published post used a different slug.
  { source: "/blog/county-criminal-checks-vs-national-database-searches", destination: "/blog/types-of-criminal-background-checks", gsc: "soft" },
  { source: "/blog/background-screening-for-small-businesses", destination: "/blog/background-screening-small-businesses-no-setup-fees-minimums", gsc: "soft" },
  { source: "/blog/volunteer-background-checks-for-churches-and-nonprofits", destination: "/blog/volunteer-background-checks-churches-nonprofits", gsc: "soft" },
  { source: "/blog/healthcare-oig-exclusion-screening", destination: "/blog/healthcare-oig-exclusion-screening-sanctions-license-risks", gsc: "soft" },
  { source: "/blog/mvr-checks-for-employees-who-drive", destination: "/blog/mvr-checks-driving-records-employee-drivers", gsc: "soft" },
  { source: "/blog/ai-powered-resume-fraud-and-employment-verification", destination: "/blog/ai-powered-resume-fraud-hiring-challenge", gsc: "soft" },
  { source: "/blog/background-check-delays-and-how-employers-can-reduce-them", destination: "/blog/background-check-delays-how-employers-can-reduce-them", gsc: "soft" },
  { source: "/blog/role-based-background-screening-packages", destination: "/blog/role-based-screening-packages-employment-background-checks", gsc: "soft" },
  { source: "/blog/background-screening-for-staffing-companies", destination: "/blog/staffing-background-checks-speed-consistency-compliance", gsc: "soft" },
  { source: "/blog/education-verification-in-modern-hiring", destination: "/blog/education-verification-modern-hiring", gsc: "soft" },

  // Full title slugs that 404. The site already 301s this pattern for older posts.
  { source: "/blog/post-accident-drug-testing-what-employers-should-have-ready-before-an-incident-happens", destination: "/blog/post-accident-drug-testing-employer-readiness-guide", gsc: "soft" },
  { source: "/blog/employment-verification-how-to-confirm-work-history-before-you-make-the-offer-final", destination: "/blog/employment-verification-confirm-work-history", gsc: "soft" },
  { source: "/blog/drug-testing-policy-basics-for-employers-what-you-need-to-know", destination: "/blog/drug-testing-policy-basics-for-employers", gsc: "soft" },
  { source: "/blog/fcra-basics-for-employers-disclosure-authorization-and-what-a-cra-does", destination: "/blog/fcra-basics-for-employers", gsc: "soft" },
  { source: "/blog/types-of-criminal-background-checks-county-state-federal-and-national-database-searches", destination: "/blog/types-of-criminal-background-checks", gsc: "soft" },
  { source: "/blog/texas-background-check-laws-for-employers-the-7-year-rule-fair-chance-hiring-and-dps-records", destination: "/blog/texas-background-check-laws-employers", gsc: "soft" },
  { source: "/blog/texas-background-check-laws-for-employers", destination: "/blog/texas-background-check-laws-employers", gsc: "soft" },
  { source: "/blog/dot-drug-testing-and-the-fmcsa-clearinghouse-an-employer-s-guide", destination: "/blog/dot-drug-testing-fmcsa-clearinghouse-guide", gsc: "soft" },
  { source: "/blog/types-of-employment-drug-tests-random-instant-lab-based-dot-and-panel-basics", destination: "/blog/types-of-employment-drug-tests", gsc: "soft" },
  { source: "/blog/staffing-agency-screening-a-client-requirements-checklist-for-every-job-order", destination: "/blog/staffing-agency-client-screening-requirements-checklist", gsc: "soft" },
  { source: "/blog/why-staffing-companies-need-speed-consistency-and-compliance-in-background-screening", destination: "/blog/staffing-background-checks-speed-consistency-compliance", gsc: "soft" },
  { source: "/blog/why-education-verification-matters-in-modern-hiring", destination: "/blog/education-verification-modern-hiring", gsc: "soft" },
  { source: "/blog/why-role-based-screening-packages-make-sense-for-employment-background-checks", destination: "/blog/role-based-screening-packages-employment-background-checks", gsc: "soft" },
  { source: "/blog/why-mvr-checks-matter-for-employees-who-drive-even-part-time", destination: "/blog/mvr-checks-driving-records-employee-drivers", gsc: "soft" },
  { source: "/blog/why-healthcare-employers-must-conduct-oig-exclusion-screening-to-manage-sanctions-and-license-risks", destination: "/blog/healthcare-oig-exclusion-screening-sanctions-license-risks", gsc: "soft" },
  { source: "/blog/volunteer-background-checks-for-churches-and-nonprofits-protecting-trust-safety-and-vulnerable-populations", destination: "/blog/volunteer-background-checks-churches-nonprofits", gsc: "soft" },
  { source: "/blog/background-screening-for-small-businesses-avoid-setup-fees-minimums-and-overbuilt-packages", destination: "/blog/background-screening-small-businesses-no-setup-fees-minimums", gsc: "soft" },
  { source: "/blog/why-identity-verification-is-essential-before-running-a-background-check", destination: "/blog/identity-verification-before-background-check", gsc: "soft" },
  { source: "/blog/ai-powered-resume-fraud-the-new-hiring-challenge-employers-can-t-ignore", destination: "/blog/ai-powered-resume-fraud-hiring-challenge", gsc: "soft" },
  { source: "/blog/gig-economy-background-screening-contingent-workforce-liability-employers-can-t-ignore", destination: "/blog/gig-economy-background-screening-contingent-workforce-liability", gsc: "soft" },
  { source: "/blog/why-warehousing-companies-can-t-afford-hiring-mistakes", destination: "/blog/why-warehousing-companies-cant-afford-hiring-mistakes", gsc: "soft" },
  { source: "/blog/why-trucking-companies-can-t-afford-bad-hiring-decisions", destination: "/blog/trucking-companies-bad-hiring-decisions", gsc: "soft" },
  { source: "/blog/the-true-cost-of-a-bad-hire-how-background-screening-protects-client-relationships", destination: "/blog/fcra-enforcement-2026-employer-background-screening-compliance", gsc: "soft" },
  { source: "/blog/the-fcra-is-getting-stricter-in-2026-and-most-employers-are-not-ready", destination: "/blog/fcra-compliance-2026-background-screening-employers", gsc: "soft" },
  { source: "/blog/birthdate-redaction-why-some-states-are-slowing-down-your-background-checks-and-how-to-handle-it", destination: "/blog/birthdate-redaction-background-check-delays", gsc: "soft" },
  { source: "/blog/the-employer-s-state-by-state-guide-to-ban-the-box-laws-what-you-must-do-before-you-ask", destination: "/blog/ban-the-box-laws-by-state-employer-guide", gsc: "soft" },
  { source: "/blog/eeoc-guidance-and-criminal-records-what-every-employer-must-know-before-their-next-hire", destination: "/blog/eeoc-guidance-criminal-records-employers", gsc: "soft" },

  // Indexed template leftovers. Nothing on the site corresponds to these placeholders.
  { source: "/projects/project-title-5", destination: "/", gsc: "hard" },
  { source: "/projects/project-title-6", destination: "/", gsc: "hard" },
];

module.exports = { gscRedirects };
