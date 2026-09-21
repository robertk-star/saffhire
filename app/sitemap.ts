import type { MetadataRoute } from 'next';
import { seoMetadata } from '@/shared/seoMetadata';
import { blogPosts } from '@/data/blogPosts';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';
import { openKnowledgePages } from '@/data/openKnowledgePages';
import { SITE_URL } from '@/lib/siteUrl';

const excludedRoutes = new Set([
  '/404',
  '/admin',
  '/apps',
  '/test-signup',
  '/saffhire-vs-checkr-for-staffing-agencies',
]);

const extraPublicRoutes = [
  '/faq',
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
  '/open-knowledge',
  '/llms.txt',
  '/open-knowledge.md',
  '/open-knowledge/okf.json',
  '/referral-partners/benefitsme',
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

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await getPublishedDbBlogPosts();
  const staticRoutes = Object.keys(seoMetadata);
  const fileBlogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const dbBlogRoutes = dbPosts.map((post) => `/blog/${post.slug}`);
  const blogRoutes = Array.from(new Set([...fileBlogRoutes, ...dbBlogRoutes]));
  const authorityRoutes = seoAuthorityPages.map((page) => page.path);
  const openKnowledgeRoutes = openKnowledgePages.map((page) => `/open-knowledge/${page.slug}`);

  const routes = Array.from(new Set([
    ...staticRoutes,
    ...extraPublicRoutes,
    ...authorityRoutes,
    ...openKnowledgeRoutes,
    ...blogRoutes,
  ])).filter((route) => !excludedRoutes.has(route) && !route.startsWith('/admin') && !route.startsWith('/apps') && !route.startsWith('/api'));

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/blog' || route.startsWith('/open-knowledge') || route === '/background-screening-guides' ? 'weekly' as const : 'monthly' as const,
    priority: route === '/' ? 1 : route === '/blog' || route === '/contact' || route === '/services' ? 0.9 : route.startsWith('/blog/') ? 0.65 : 0.75,
  }));
}
