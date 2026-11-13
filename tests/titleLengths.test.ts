import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { seoAuthorityPages } from "../data/seoAuthorityPages";
import { BLOG_TITLE_MAX, blogDocumentMeta, blogDocumentTitle, blogTitleTags, renderedBlogTitle } from "../lib/blogSeo";
import { getPageMetadata } from "../shared/seoMetadata";

const suffix = " | SaffHire";
const shortenedPaths = [
  "/blog",
  "/services",
  "/faq",
  "/employment-verification",
  "/mvr-checks",
  "/industries/healthcare",
  "/industries/manufacturing",
  "/industries/hospitality",
  "/industries/education",
  "/industries/church-nonprofit",
  "/fcra-news",
];

function assertTitle(title: string, label: string) {
  assert.ok(`${title}${suffix}`.length <= 65, `${label}: ${title.length + suffix.length}: ${title}`);
  assert.doesNotMatch(title, /SaffHire\s*$|\| SaffHire|[—–]/, label);
}

describe("Nov 13 audit title tags", () => {
  it("keeps shortened page titles at 65 characters or fewer with the site suffix", () => {
    for (const path of shortenedPaths) assertTitle(getPageMetadata(path).title, path);
    const volunteer = seoAuthorityPages.find((page) => page.path === "/volunteer-background-checks");
    assert.ok(volunteer);
    assertTitle(volunteer.metaTitle, "/volunteer-background-checks");
    const openKnowledge = readFileSync(new URL("../app/open-knowledge/page.tsx", import.meta.url), "utf8").match(/title: '([^']+)'/)?.[1] ?? "";
    assertTitle(openKnowledge, "/open-knowledge");
  });

  it("gives 25 older blog posts a short document title", () => {
    assert.equal(Object.keys(blogTitleTags).length, 25);
    for (const [slug, title] of Object.entries(blogTitleTags)) {
      assert.ok(title.length <= BLOG_TITLE_MAX, `${slug}: ${title.length}`);
      assertTitle(title, slug);
      assert.equal(blogDocumentTitle(slug, "A much longer original listing title"), title);
      assert.equal(blogDocumentMeta(slug, "A much longer original listing title", "Excerpt").titleTag, renderedBlogTitle(title));
    }
    assert.equal(blogDocumentTitle("some-new-post", "Some New Post"), "Some New Post");
  });
});
