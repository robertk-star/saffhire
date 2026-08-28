import { seoMetadata } from '@/shared/seoMetadata';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';
import { blogPosts } from '@/data/blogPosts';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';
import { openKnowledgePages } from '@/data/openKnowledgePages';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';

  const mainPages = Object.entries(seoMetadata)
    .map(([path, meta]) => `- ${siteUrl}${path}: ${meta.title} — ${meta.description}`)
    .join('\n');

  const authorityPages = seoAuthorityPages
    .map((page) => `- ${siteUrl}${page.path}: ${page.title} — ${page.heroAnswer}`)
    .join('\n');

  const knowledgePages = openKnowledgePages
    .map((page) => `- ${siteUrl}/open-knowledge/${page.slug}: ${page.title} — ${page.description}`)
    .join('\n');

  const dbPosts = await getPublishedDbBlogPosts();
  const allPosts = [...dbPosts, ...blogPosts]
    .filter((post, index, array) => array.findIndex((item) => item.slug === post.slug) === index)
    .slice(0, 25)
    .map((post) => `- ${siteUrl}/blog/${post.slug}: ${post.title} — ${post.excerpt}`)
    .join('\n');

  const content = `# SaffHire Background Screening\n\nSaffHire Background Screening provides employer background screening services for businesses across the United States. Services include criminal background checks, employment verification, education verification, drug screening, MVR checks, healthcare sanctions checks, volunteer screening, small business screening, and industry-specific screening support.\n\nPhone: 888-588-1733\nEmail: info@saffhire.com\nLocation: Frisco, Texas\nService area: United States\nFounded: 2020\nCompliance focus: FCRA-compliant employment background screening\n\n## What SaffHire does\nSaffHire helps employers build background screening packages based on role, industry, risk level, and compliance needs. SaffHire serves businesses nationwide and supports industries including healthcare, staffing, transportation, manufacturing, hospitality, energy, education, churches, nonprofits, and small businesses.\n\n## Open Knowledge Format\n- ${siteUrl}/open-knowledge: Public Open Knowledge Format hub for SaffHire\n- ${siteUrl}/open-knowledge/okf.json: Machine-readable Open Knowledge file\n- ${siteUrl}/company-information: Authoritative company information page\n${knowledgePages}\n\n## Primary resource hub\n- ${siteUrl}/background-screening-guides: Background Screening Guides for Employers\n\n## Important pages\n${mainPages}\n\n## Background screening guides\n${authorityPages}\n\n## Latest blog posts\n${allPosts}\n`;

  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
