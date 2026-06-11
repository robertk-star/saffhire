import { blogPosts } from '@/data/blogPosts';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';

export const dynamic = 'force-dynamic';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toRssDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toUTCString();
  return date.toUTCString();
}

function tag(name: string, value: string) {
  return `<${name}>${escapeXml(value)}</${name}>`;
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';
  const dbPosts = await getPublishedDbBlogPosts();
  const allPosts = [...dbPosts, ...blogPosts]
    .filter((post, index, array) => array.findIndex((item) => item.slug === post.slug) === index)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const items = allPosts.map((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    return [
      '<item>',
      tag('title', post.title),
      tag('link', url),
      tag('guid', url),
      tag('description', post.excerpt),
      tag('pubDate', toRssDate(post.date)),
      tag('category', post.category),
      tag('author', post.author),
      '</item>',
    ].join('');
  }).join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    tag('title', 'SaffHire Background Screening Blog'),
    tag('link', siteUrl),
    tag('description', 'Background screening, FCRA compliance, hiring, and industry updates from SaffHire.'),
    tag('language', 'en-us'),
    tag('lastBuildDate', new Date().toUTCString()),
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
