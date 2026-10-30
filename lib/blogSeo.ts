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

export function renderedBlogTitle(title: string) {
  return `${title}${BLOG_TITLE_SUFFIX}`;
}

export function blogDocumentMeta(slug: string, title: string, description: string) {
  const override = blogSeoOverrides[slug];
  const nextTitle = override?.title ?? title;
  const nextDescription = override?.description ?? description;
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
