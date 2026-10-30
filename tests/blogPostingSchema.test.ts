import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { blogPosts } from "../data/blogPosts";
import { blogPostingSchema, toSchemaDate } from "../lib/structuredData";

const required = ["headline", "datePublished", "dateModified", "author", "publisher", "image", "mainEntityOfPage"] as const;

describe("BlogPosting JSON-LD", () => {
  it("converts listing dates to ISO", () => {
    assert.equal(toSchemaDate("May 21, 2026"), "2026-05-21");
    assert.equal(toSchemaDate("2026-10-02T15:04:00.000Z"), "2026-10-02T15:04:00.000Z");
  });

  it("builds a complete BlogPosting from post metadata", () => {
    const schema = blogPostingSchema({
      slug: "example-post",
      headline: "Example headline",
      description: "Example description",
      datePublished: "May 21, 2026",
      dateModified: "2026-05-01",
      authorName: "SaffHire Compliance Team",
      image: "/images/blog-warehousing.webp",
    });

    assert.equal(schema["@type"], "BlogPosting");
    for (const key of required) assert.ok(schema[key], key);
    assert.equal(schema.datePublished, "2026-05-21");
    assert.equal(schema.dateModified, "2026-05-21");
    assert.equal(schema.author["@type"], "Organization");
    assert.equal(schema.author.name, "SaffHire Compliance Team");
    assert.equal(schema.publisher["@type"], "Organization");
    assert.equal(schema.publisher.name, "SaffHire Background Screening");
    assert.equal(schema.publisher.logo["@type"], "ImageObject");
    assert.match(schema.publisher.logo.url, /\/images\/saffhire-logo\.png$/);
    assert.match(String(schema.image), /^https:\/\/saffhire.com\/images\//);
    assert.equal(schema.mainEntityOfPage["@type"], "WebPage");
    assert.equal(schema.mainEntityOfPage["@id"], "https://saffhire.com/blog/example-post");
  });

  it("can generate schema for every file-based post", () => {
    assert.ok(blogPosts.length > 0);
    for (const post of blogPosts) {
      const schema = blogPostingSchema({
        slug: post.slug,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        authorName: post.author,
        image: post.image,
      });
      for (const key of required) assert.ok(schema[key], `${post.slug} ${key}`);
      assert.match(schema.datePublished, /^\d{4}-\d{2}-\d{2}/);
    }
  });
});
