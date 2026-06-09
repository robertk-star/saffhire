import { describe, it, expect } from "vitest";
import { generateRSSFeed } from "./rss";
import { blogPosts } from "../shared/blog";

describe("RSS Feed Generator", () => {
  it("should generate valid RSS XML", () => {
    const rss = generateRSSFeed();
    expect(rss).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(rss).toContain("<rss version=\"2.0\"");
    expect(rss).toContain("</rss>");
  });

  it("should include all blog posts", () => {
    const rss = generateRSSFeed();
    blogPosts.forEach((post) => {
      // Check that title is present (may be escaped)
      const escapedTitle = post.title.replace(/'/g, "&apos;");
      expect(rss).toContain(escapedTitle);
      expect(rss).toContain(post.slug);
    });
  });

  it("should sort blog posts by date (newest first)", () => {
    const rss = generateRSSFeed();
    
    // Extract the order of blog post titles from the RSS
    const titleMatches = rss.match(/<title>([^<]+)<\/title>/g);
    const titles = titleMatches
      ? titleMatches.map((match) => match.replace(/<\/?title>/g, ""))
      : [];

    // Find the May 7 post (newest) and March 10 post (oldest)
    const may7Index = titles.findIndex((title) =>
      title.includes("FCRA Adverse Action Two-Step")
    );
    const march10Index = titles.findIndex((title) =>
      title.includes("FCRA Compliance Checklist for Employers in 2026")
    );

    // May 7 post should appear before March 10 post
    expect(may7Index).toBeLessThan(march10Index);
    expect(may7Index).toBeGreaterThanOrEqual(0);
  });

  it("should include required RSS channel elements", () => {
    const rss = generateRSSFeed();
    expect(rss).toContain("<title>SaffHire Background Screening</title>");
    expect(rss).toContain("<link>https://saffhire.manus.space/</link>");
    expect(rss).toContain("<language>en-us</language>");
    expect(rss).toContain("<lastBuildDate>");
  });

  it("should properly escape XML special characters", () => {
    const rss = generateRSSFeed();
    // Check that apostrophes are escaped in titles/descriptions
    expect(rss).toContain("&apos;");
    // Verify no unescaped < or > in content (except XML tags)
    const contentMatches = rss.match(/<description>([^<]+)<\/description>/g);
    if (contentMatches) {
      contentMatches.forEach((match) => {
        // Extract content between tags
        const content = match.replace(/<\/?description>/g, "");
        // Should not contain raw < or > characters
        expect(content).not.toMatch(/[<>]/);
      });
    }
  });

  it("should include blog post metadata in items", () => {
    const rss = generateRSSFeed();
    const firstPost = blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    // Check that title is present (may be escaped)
    const escapedTitle = firstPost.title.replace(/'/g, "&apos;");
    expect(rss).toContain(escapedTitle);
    expect(rss).toContain(`<category>${firstPost.category}</category>`);
    // Check that excerpt is present (may be escaped)
    const escapedExcerpt = firstPost.excerpt.replace(/'/g, "&apos;");
    expect(rss).toContain(escapedExcerpt);
    expect(rss).toContain(
      `<link>https://saffhire.manus.space/blog/${firstPost.slug}</link>`
    );
  });

  it("should have correct number of items", () => {
    const rss = generateRSSFeed();
    const itemMatches = rss.match(/<item>/g);
    expect(itemMatches).toBeTruthy();
    expect(itemMatches!.length).toBe(blogPosts.length);
  });
});
