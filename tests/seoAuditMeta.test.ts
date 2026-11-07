import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { blogPosts } from "../data/blogPosts";
import { checkPages } from "../data/checkPages";
import { blogDocumentMeta, publicMetaDescription } from "../lib/blogSeo";
import { getPageMetadata } from "../shared/seoMetadata";

const partnerPaths = [
  "/referral-partners/benefitsme",
  "/referral-partners/corporate-talent-finder",
  "/referral-partners/defense-by-design",
  "/referral-partners/fynn",
  "/referral-partners/gmg-savings",
  "/referral-partners/hooray-health",
  "/referral-partners/level-c-solutions",
  "/referral-partners/novatech",
  "/referral-partners/sandene-strategies",
  "/referral-partners/staffing-for-healthcare",
  "/referral-partners/workshield",
];

const pageDescriptions = [
  ...checkPages.map((page) => page.description),
  getPageMetadata("/").description,
  readFileSync(new URL("../app/company-information/page.tsx", import.meta.url), "utf8").match(/description:\s*\n\s*'([^']+)'/)?.[1] ?? "",
  readFileSync(new URL("../app/background-screening-guides/page.tsx", import.meta.url), "utf8").match(/description:\s*\n\s*"([^"]+)"/)?.[1] ?? "",
  readFileSync(new URL("../app/open-knowledge/page.tsx", import.meta.url), "utf8").match(/description:\s*\n\s*'([^']+)'/)?.[1] ?? "",
];

describe("Nov 7 audit metadata", () => {
  it("keeps public page descriptions at 160 characters or fewer", () => {
    for (const description of pageDescriptions) {
      assert.ok(description.length > 0 && description.length <= 160, `${description.length}: ${description}`);
      assert.doesNotMatch(description, /[—–]/);
    }
  });

  it("gives each referral partner a unique title tag", () => {
    const titles = partnerPaths.map((path) => {
      const meta = getPageMetadata(path);
      const titleTag = `${meta.title} | SaffHire`;
      assert.ok(meta.description.length <= 160, meta.description);
      assert.ok(titleTag.length <= 65, `${titleTag.length}: ${titleTag}`);
      assert.doesNotMatch(meta.title, /\| SaffHire/);
      return titleTag;
    });
    assert.equal(new Set(titles).size, titles.length);
    assert.notEqual(titles[0], `${getPageMetadata("/").title} | SaffHire`);
  });

  it("links /ai-info from the footer and the guides page", () => {
    const footer = readFileSync(new URL("../components/Footer.tsx", import.meta.url), "utf8");
    const guides = readFileSync(new URL("../components/BackgroundScreeningGuidesClient.tsx", import.meta.url), "utf8");
    assert.match(footer, /href: "\/ai-info"/);
    assert.match(guides, /href="\/ai-info"/);
  });

  it("keeps file blog excerpts and capped database descriptions within 160 characters", () => {
    for (const post of blogPosts) {
      assert.ok(post.excerpt.length <= 160, `${post.slug} ${post.excerpt.length}`);
      assert.doesNotMatch(post.excerpt, /[—–]/);
    }
    const long = "A".repeat(40) + " " + "B".repeat(200);
    const fitted = publicMetaDescription(long);
    assert.ok(fitted.length <= 160, String(fitted.length));
    const meta = blogDocumentMeta("example-db-post", "Example", long);
    assert.ok(meta.description.length <= 160);
  });
});
