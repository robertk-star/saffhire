/**
 * Browser <title> tags use the root layout template (`%s | SaffHire`).
 * Keep the page title short enough that the rendered tag stays within 65 characters.
 * Meta descriptions stay within 160 characters.
 */
export const BLOG_TITLE_SUFFIX = " | SaffHire";
export const BLOG_TITLE_TAG_MAX = 65;
export const BLOG_TITLE_MAX = BLOG_TITLE_TAG_MAX - BLOG_TITLE_SUFFIX.length;
export const BLOG_META_DESCRIPTION_MAX = 160;

export type BlogSeoOverride = {
  title: string;
  description: string;
};

/**
 * The two newest database posts shipped with title tags around 95–98 characters
 * and descriptions around 216–253. The live rows stay as written; the public
 * title tag and meta description use these shorter strings.
 */
export const blogSeoOverrides: Record<string, BlogSeoOverride> = {
  "employment-verification-confirm-work-history": {
    title: "Employment Verification: Confirm Work History",
    description:
      "Learn what employment verification confirms, how it differs from education checks, and how employers keep work-history screening fair.",
  },
  "post-accident-drug-testing-employer-readiness-guide": {
    title: "Post-Accident Drug Testing: Employer Readiness",
    description:
      "What to have ready before a post-accident drug test: timing, who orders it, where samples are collected, and how DOT rules differ from company policy.",
  },
};


/**
 * Shorter document titles for older posts (Nov 13 2026 audit: title tags over 65 characters).
 * The H1, listing title, social title and schema headline keep the full post title.
 * Each entry stays within BLOG_TITLE_MAX so the rendered tag (with " | SaffHire") is 65 or fewer.
 */
export const blogTitleTags: Record<string, string> = {
  "fcra-basics-for-employers": "FCRA Basics for Employers: Disclosure & Authorization",
  "types-of-criminal-background-checks": "Types of Criminal Background Checks: County to Federal",
  "ai-powered-resume-fraud-hiring-challenge": "AI-Powered Resume Fraud: A New Hiring Challenge",
  "gig-economy-background-screening-contingent-workforce-liability": "Gig Economy Background Screening and Liability",
  "trucking-companies-bad-hiring-decisions": "Trucking Companies Can't Afford Bad Hiring Decisions",
  "texas-background-check-laws-employers": "Texas Background Check Laws for Employers",
  "dot-drug-testing-fmcsa-clearinghouse-guide": "DOT Drug Testing and the FMCSA Clearinghouse",
  "eeoc-guidance-criminal-records-employers": "EEOC Guidance on Criminal Records for Employers",
  "types-of-employment-drug-tests": "Types of Employment Drug Tests Employers Use",
  "staffing-agency-client-screening-requirements-checklist": "Staffing Agency Client Screening Checklist",
  "ban-the-box-laws-by-state-employer-guide": "Ban-the-Box Laws by State: An Employer's Guide",
  "roi-of-speed-5-minute-background-checks-time-to-hire": "The ROI of Speed: Background Checks and Time-to-Hire",
  "ongoing-employee-screening-long-term-risk-management": "Ongoing Employee Screening and Long-Term Risk",
  "birthdate-redaction-background-check-delays": "Birthdate Redaction and Background Check Delays",
  "fcra-compliance-2026-background-screening-employers": "The FCRA Is Getting Stricter in 2026",
  "fcra-enforcement-2026-employer-background-screening-compliance": "The True Cost of a Bad Hire for Client Relationships",
  "drug-testing-policy-basics-for-employers": "Drug Testing Policy Basics for Employers",
  "staffing-background-checks-speed-consistency-compliance": "Staffing Background Checks: Speed and Compliance",
  "background-check-delays-how-employers-can-reduce-them": "Background Check Delays and How to Reduce Them",
  "role-based-screening-packages-employment-background-checks": "Role-Based Screening Packages for Background Checks",
  "mvr-checks-driving-records-employee-drivers": "MVR Checks for Employees Who Drive, Even Part-Time",
  "healthcare-oig-exclusion-screening-sanctions-license-risks": "Healthcare OIG Exclusion Screening and Sanctions Risk",
  "volunteer-background-checks-churches-nonprofits": "Volunteer Background Checks: Protecting Trust & Safety",
  "background-screening-small-businesses-no-setup-fees-minimums": "Background Screening for Small Businesses",
  "identity-verification-before-background-check": "Identity Verification Before a Background Check",
};

/** Document title (without the site suffix) for a blog post: the short title when one is set. */
export function blogDocumentTitle(slug: string, title: string) {
  return blogTitleTags[slug] ?? title;
}

export function renderedBlogTitle(title: string) {
  return `${title}${BLOG_TITLE_SUFFIX}`;
}

/** Meta descriptions stay within 160 characters, including database posts that ship with a long excerpt. */
export function publicMetaDescription(description: string) {
  return description.length <= BLOG_META_DESCRIPTION_MAX
    ? description
    : trimAtWord(description, BLOG_META_DESCRIPTION_MAX);
}

export function blogDocumentMeta(slug: string, title: string, description: string) {
  const override = blogSeoOverrides[slug];
  const nextTitle = override?.title ?? blogDocumentTitle(slug, title);
  const nextDescription = publicMetaDescription(override?.description ?? description);
  return {
    title: nextTitle,
    description: nextDescription,
    titleTag: renderedBlogTitle(nextTitle),
    overridden: Boolean(override),
  };
}

/** Trim at a word boundary so generated drafts stay inside the title and description limits. */
export function trimAtWord(value: string, max: number) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace >= Math.min(24, max) ? slice.slice(0, lastSpace) : slice;
  return cut.replace(/[\s,;:.!?\-–—]+$/g, "");
}

export function fitGeneratedBlogSeo(input: { title: string; excerpt: string }) {
  return {
    title: trimAtWord(input.title, BLOG_TITLE_MAX),
    excerpt: trimAtWord(input.excerpt, BLOG_META_DESCRIPTION_MAX),
  };
}
