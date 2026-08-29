import type { MetadataRoute } from 'next';
import { seoMetadata } from '@/shared/seoMetadata';
import { blogPosts } from '@/data/blogPosts';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';
import { openKnowledgePages } from '@/data/openKnowledgePages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';
const guideHubRoute = '/background-screening-guides';
const companyInformationRoute = '/company-information';
const openKnowledgeRoute = '/open-knowledge';
const comparisonRoutes = ['/saffhire-vs-checkr-for-staffing-agencies'];

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await getPublishedDbBlogPosts();
  const staticRoutes = Object.keys(seoMetadata);
  const fileBlogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const dbBlogRoutes = dbPosts.map((post) => `/blog/${post.slug}`);
  const blogRoutes = Array.from(new Set([...dbBlogRoutes, ...fileBlogRoutes]));
  const authorityRoutes = seoAuthorityPages.map((page) => page.path);
  const openKnowledgeRoutes = [openKnowledgeRoute, ...openKnowledgePages.map((page) => `/open-knowledge/${page.slug}`)];
  const routes = Array.from(new Set([...staticRoutes, guideHubRoute, companyInformationRoute, ...authorityRoutes, ...openKnowledgeRoutes, ...comparisonRoutes, ...blogRoutes]));

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === guideHubRoute || route === companyInformationRoute || route.startsWith('/open-knowledge') || authorityRoutes.includes(route) || comparisonRoutes.includes(route) ? 'weekly' as const : 'monthly' as const,
    priority: route === '/' ? 1 : comparisonRoutes.includes(route) ? 0.8 : route === guideHubRoute ? 0.86 : route === companyInformationRoute || route === openKnowledgeRoute ? 0.84 : route.startsWith('/open-knowledge') ? 0.8 : authorityRoutes.includes(route) ? 0.82 : route.startsWith('/blog') ? 0.65 : 0.75,
  }));
}
