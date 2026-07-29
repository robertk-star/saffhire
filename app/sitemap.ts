import type { MetadataRoute } from 'next';
import { seoMetadata } from '@/shared/seoMetadata';
import { blogPosts } from '@/data/blogPosts';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';
const guideHubRoute = '/background-screening-guides';
const companyInformationRoute = '/company-information';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await getPublishedDbBlogPosts();
  const staticRoutes = Object.keys(seoMetadata);
  const fileBlogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const dbBlogRoutes = dbPosts.map((post) => `/blog/${post.slug}`);
  const blogRoutes = Array.from(new Set([...dbBlogRoutes, ...fileBlogRoutes]));
  const authorityRoutes = seoAuthorityPages.map((page) => page.path);
  const routes = Array.from(new Set([...staticRoutes, guideHubRoute, companyInformationRoute, ...authorityRoutes, ...blogRoutes]));

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === guideHubRoute || route === companyInformationRoute || authorityRoutes.includes(route) ? 'weekly' as const : 'monthly' as const,
    priority: route === '/' ? 1 : route === guideHubRoute ? 0.86 : route === companyInformationRoute ? 0.84 : authorityRoutes.includes(route) ? 0.82 : route.startsWith('/blog') ? 0.65 : 0.75,
  }));
}
