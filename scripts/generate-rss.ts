/**
 * RSS Feed Generator
 * Generates client/public/rss.xml from blog posts in client/src/data/blogPosts.ts
 * Run with: pnpm generate:rss
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog posts
const blogPostsModule = await import("../client/src/data/blogPosts.ts");
const { blogPosts, formatRssDate, parseBlogDate } = blogPostsModule;

// Configuration
const SITE_URL = "https://saffhire.com";
const FEED_URL = `${SITE_URL}/rss.xml`;

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

/**
 * Generate RSS 2.0 feed
 */
function generateRSSFeed(): string {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Get the most recent post date for lastBuildDate
  const lastBuildDate =
    sortedPosts.length > 0
      ? formatRssDate(parseBlogDate(sortedPosts[0].date))
      : formatRssDate(new Date());

  // Build RSS items
  const items = sortedPosts
    .map((post) => {
      const pubDate = formatRssDate(parseBlogDate(post.date));
      const link = `${SITE_URL}/blog/${post.slug}`;
      const guid = link;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
      <author>${escapeXml(post.author)}</author>
      <image>
        <url>${escapeXml(post.image)}</url>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
      </image>
    </item>`;
    })
    .join("\n");

  // Build complete RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SaffHire Background Screening</title>
    <link>${SITE_URL}/</link>
    <description>SaffHire provides fast, secure, and FCRA-compliant background screening services. We specialize in serving staffing companies, trucking companies, nonprofits, and high-turnover employers with faster turnaround times and reliable results.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return rss;
}

/**
 * Main function
 */
async function main() {
  try {
    // Generate RSS feed
    const rssFeed = generateRSSFeed();

    // Ensure output directory exists
    const outputDir = path.join(__dirname, "../client/public");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write RSS file
    const outputPath = path.join(outputDir, "rss.xml");
    fs.writeFileSync(outputPath, rssFeed, "utf-8");

    console.log(`✓ RSS feed generated successfully: ${outputPath}`);
    console.log(`✓ Feed includes ${blogPosts.length} blog posts`);
    console.log(`✓ Newest post: "${blogPosts[blogPosts.length - 1].title}" (${blogPosts[blogPosts.length - 1].date})`);
  } catch (error) {
    console.error("✗ Error generating RSS feed:", error);
    process.exit(1);
  }
}

main();
