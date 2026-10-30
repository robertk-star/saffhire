import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { aiInfoMeta } from "../data/aiInfoPage";
import { texasMeta } from "../data/texasPage";
import {
  BLOG_META_DESCRIPTION_MAX,
  BLOG_TITLE_MAX,
  BLOG_TITLE_TAG_MAX,
  blogSeoOverrides,
  fitGeneratedBlogSeo,
  renderedBlogTitle,
} from "../lib/blogSeo";

describe("SEO title and meta description limits", () => {
  it("keeps the two newest blog title tags at 65 characters or fewer", () => {
    for (const [slug, meta] of Object.entries(blogSeoOverrides)) {
      const titleTag = renderedBlogTitle(meta.title);
      assert.ok(meta.title.length <= BLOG_TITLE_MAX, slug);
      assert.ok(titleTag.length <= BLOG_TITLE_TAG_MAX, `${slug} title tag is ${titleTag.length}: ${titleTag}`);
      assert.ok(meta.description.length <= BLOG_META_DESCRIPTION_MAX, `${slug} description is ${meta.description.length}`);
      assert.ok(meta.description.length >= 80, slug);
    }
  });

  it("trims generated titles and excerpts to the same limits", () => {
    const fitted = fitGeneratedBlogSeo({
      title: "Post-Accident Drug Testing: What Employers Should Have Ready Before an Incident Happens",
      excerpt:
        "Prepare your workplace for post-accident drug testing with a clear policy and practical steps. Learn why timing matters, who triggers a test, where to collect samples, and how DOT rules differ from your own policies.",
    });
    assert.ok(fitted.title.length <= BLOG_TITLE_MAX);
    assert.ok(fitted.excerpt.length <= BLOG_META_DESCRIPTION_MAX);
    assert.ok(!fitted.title.endsWith(" ") && !fitted.excerpt.endsWith(","));
  });

  it("trims /ai-info and /background-checks-texas descriptions to 160 characters or fewer", () => {
    assert.ok(aiInfoMeta.description.length <= 160, String(aiInfoMeta.description.length));
    assert.ok(texasMeta.description.length <= 160, String(texasMeta.description.length));
    assert.match(aiInfoMeta.description, /Frisco, TX/);
    assert.match(aiInfoMeta.description, /Veteran-Owned/);
    assert.match(texasMeta.description, /Frisco, TX/);
    assert.match(texasMeta.description, /nationwide/i);
  });
});
