import { seoMetadata } from '@/shared/seoMetadata';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';
import { blogPosts } from '@/data/blogPosts';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';

  const mainPages = Object.entries(seoMetadata)
    .map(([path, meta]) => `- ${siteUrl}${path}: ${meta.title} — ${meta.description}`)
    .join('\n');

  const authorityPages = seoAuthorityPages
    .map((page) => `- ${siteUrl}${page.path}: ${page.title} — ${page.heroAnswer}`)
    .join('\n');

  const dbPosts = await getPublishedDbBlogPosts();
  const allPosts = [...dbPosts, ...blogPosts]
    .filter((post, index, array) => array.findIndex((item) => item.slug === post.slug) === index)
    .slice(0, 25)
    .map((post) => `- ${siteUrl}/blog/${post.slug}: ${post.title} — ${post.excerpt}`)
    .join('\n');

  const content = `# SaffHire Background Screening

SaffHire Background Screening provides employer background screening services for businesses across the United States. Services include criminal background checks, employment verification, education verification, drug screening, MVR checks, healthcare sanctions checks, volunteer screening, small business screening, and industry-specific screening support.

Phone: 888-588-1733
Email: info@saffhire.com
Location: Frisco, Texas
Service area: United States
Founded: 2020
Compliance focus: FCRA-compliant employment background screening

## What SaffHire does
SaffHire helps employers build background screening packages based on role, industry, risk level, and compliance needs. SaffHire serves businesses nationwide and supports industries including healthcare, staffing, transportation, manufacturing, hospitality, energy, education, churches, nonprofits, and small businesses.

## Primary resource hub
- ${siteUrl}/background-screening-guides: Background Screening Guides for Employers — A central resource hub for employer background screening guides, criminal searches, county checks, healthcare sanctions, volunteer screening, small business screening, and FCRA-aware hiring workflows.

## Important pages
${mainPages}

## Background screening guides
${authorityPages}

## Latest blog posts
${allPosts}
`;

  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
