/**
 * Dynamic RSS Feed Generator for SaffHire Blog
 * Generates RSS 2.0 feed from blog posts in shared/blog.ts
 */

import { blogPosts, formatRssDate, parseBlogDate } from "../shared/blog";

export function generateRSSFeed(): string {
  // Sort blog posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Newest first
  });

  // Get the most recent post date for lastBuildDate
  const lastBuildDate =
    sortedPosts.length > 0
      ? formatRssDate(parseBlogDate(sortedPosts[0].date))
      : formatRssDate(new Date());

  // Build RSS items
  const items = sortedPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://saffhire.com/blog/${post.slug}</link>
      <guid isPermaLink="true">https://saffhire.com/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${formatRssDate(parseBlogDate(post.date))}</pubDate>
      <author>SaffHire Compliance Team</author>
      <category>${escapeXml(post.category)}</category>
      <image>
        <url>${escapeXml(post.image)}</url>
        <title>${escapeXml(post.title)}</title>
        <link>https://saffhire.com/blog/${post.slug}</link>
      </image>
    </item>`
    )
    .join("\n");

  // Build complete RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SaffHire Blog</title>
    <link>https://saffhire.com</link>
    <description>Background screening, compliance, and hiring insights from SaffHire</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="https://saffhire.com/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return rss;
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
