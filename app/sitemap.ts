import type { MetadataRoute } from 'next';
import { seoMetadata } from '@/shared/seoMetadata';
import { blogPosts } from '@/data/blogPosts';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';
import { openKnowledgePages } from '@/data/openKnowledgePages';
import { SITE_URL } from '@/lib/siteUrl';
import { routeLastModified } from '@/data/routeLastModified';
import { blogPostRegistry } from '@/legacy/blogRegistry';

// File-based posts render only when they have an article body (registry or a custom component).
const customBodySlugs = new Set([
  'gig-economy-background-screening-contingent-workforce-liability',
  'ai-powered-resume-fraud-hiring-challenge',
]);
const registrySlugs = new Set(blogPostRegistry.map((post) => post.slug));

const excludedRoutes = new Set([
  '/404',
  '/admin',
  '/apps',
  '/test-signup',
  '/saffhire-vs-checkr-for-staffing-agencies',
  // noindex: internal-facing open-knowledge page
  '/open-knowledge/conversion-goals',
]);

const extraPublicRoutes = [
  '/faq',
  '/packages',
  '/company-information',
  '/background-screening-guides',
  '/background-screening-frisco-tx',
  '/background-screening-dallas-tx',
  '/background-screening-plano-tx',
  '/background-screening-mckinney-tx',
  '/background-screening-allen-tx',
  '/volunteer-background-checks',
  '/small-business-background-checks',
  '/county-criminal-background-checks',
  '/national-criminal-database-search',
  '/healthcare-sanctions-oig-checks',
  '/dot-drug-testing',
  '/random-drug-testing',
  '/instant-drug-testing',
  '/state-criminal-background-checks',
  '/federal-criminal-background-checks',
  '/global-watch-list-search',
  '/ssn-trace',
  '/open-knowledge',
  '/referral-partners/benefitsme',
  '/referral-partners/corporate-talent-finder',
  '/referral-partners/defense-by-design',
  '/referral-partners/fynn',
  '/referral-partners/gmg-savings',
  '/referral-partners/hooray-health',
  '/referral-partners/level-c-solutions',
  '/referral-partners/novatech',
  '/referral-partners/sandene-strategies',
  '/referral-partners/staffing-for-healthcare',
  '/referral-partners/workshield',
];

function parseDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await getPublishedDbBlogPosts();
  const staticRoutes = Object.keys(seoMetadata);
  const fileBlogRoutes = blogPosts
    .filter((post) => customBodySlugs.has(post.slug) || registrySlugs.has(post.slug))
    .map((post) => `/blog/${post.slug}`);
  const dbBlogRoutes = dbPosts.map((post) => `/blog/${post.slug}`);
  const blogRoutes = Array.from(new Set([...fileBlogRoutes, ...dbBlogRoutes]));
  const authorityRoutes = seoAuthorityPages.map((page) => page.path);
  const openKnowledgeRoutes = openKnowledgePages.map((page) => `/open-knowledge/${page.slug}`);

  const blogDates = new Map<string, Date | undefined>();
  for (const post of blogPosts) blogDates.set(`/blog/${post.slug}`, parseDate(post.date));
  for (const post of dbPosts as unknown as Array<Record<string, unknown> & { slug: string }>) {
    const d = parseDate(post.updated_at ?? post.published_at ?? post.publishedAt ?? post.date);
    if (d) blogDates.set(`/blog/${post.slug}`, d);
  }
  const lastModifiedFor = (route: string): Date =>
    blogDates.get(route) ?? parseDate(routeLastModified[route]) ?? new Date(routeLastModified.__default);

  const routes = Array.from(new Set([
    ...staticRoutes,
    ...extraPublicRoutes,
    ...authorityRoutes,
    ...openKnowledgeRoutes,
    ...blogRoutes,
  ])).filter((route) => !excludedRoutes.has(route) && !route.startsWith('/admin') && !route.startsWith('/apps') && !route.startsWith('/api'));

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: lastModifiedFor(route),
    changeFrequency: route === '/' || route === '/blog' || route.startsWith('/open-knowledge') || route === '/background-screening-guides' ? 'weekly' as const : 'monthly' as const,
    priority: route === '/' ? 1 : route === '/blog' || route === '/contact' || route === '/services' ? 0.9 : route.startsWith('/blog/') ? 0.65 : 0.75,
  }));
}
