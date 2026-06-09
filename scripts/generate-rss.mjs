#!/usr/bin/env node

/**
 * RSS Feed Generator for SaffHire Blog
 * Generates client/public/rss.xml from client/src/data/blogPosts.ts
 * Run with: node scripts/generate-rss.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Import blog posts
const blogPostsModule = await import(path.join(projectRoot, 'client/src/data/blogPosts.ts'));
const { blogPosts, parseBlogDate, formatRssDate } = blogPostsModule;

const SITE_URL = 'https://saffhire.com';
const FEED_URL = `${SITE_URL}/rss.xml`;
const BLOG_BASE_URL = `${SITE_URL}/blog`;

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate RSS 2.0 feed
 */
function generateRssFeed() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = parseBlogDate(a.date);
    const dateB = parseBlogDate(b.date);
    return dateB - dateA;
  });

  // Generate RSS items
  const items = sortedPosts
    .map((post) => {
      const postUrl = `${BLOG_BASE_URL}/${post.slug}`;
      const pubDate = formatRssDate(parseBlogDate(post.date));

      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(postUrl)}</link>
    <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${pubDate}</pubDate>
    <author>${escapeXml(post.author)}</author>
    <category>${escapeXml(post.category)}</category>
    ${post.image ? `<image>
      <url>${escapeXml(post.image)}</url>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
    </image>` : ''}
  </item>`;
    })
    .join('\n');

  // Build complete RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SaffHire Blog</title>
    <link>${SITE_URL}</link>
    <description>Background screening, compliance, and hiring insights from SaffHire</description>
    <language>en-us</language>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return rss;
}

/**
 * Write RSS feed to file
 */
function writeRssFeed() {
  const outputPath = path.join(projectRoot, 'client/public/rss.xml');
  const rssFeed = generateRssFeed();

  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, rssFeed, 'utf-8');
  console.log(`✓ RSS feed generated: ${outputPath}`);
  console.log(`✓ Feed URL: https://saffhire.com/rss.xml`);
  console.log(`✓ Total posts: ${blogPosts.length}`);
}

// Run generator
try {
  writeRssFeed();
  process.exit(0);
} catch (error) {
  console.error('Error generating RSS feed:', error);
  process.exit(1);
}
