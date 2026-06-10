import type { MetadataRoute } from 'next';
import { seoMetadata } from '@/shared/seoMetadata';
import { blogPosts } from '@/data/blogPosts';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';
const guideHubRoute = '/background-screening-guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.keys(seoMetadata);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const authorityRoutes = seoAuthorityPages.map((page) => page.path);
  const routes = Array.from(new Set([...staticRoutes, guideHubRoute, ...authorityRoutes, ...blogRoutes]));

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === guideHubRoute || authorityRoutes.includes(route) ? 'weekly' as const : 'monthly' as const,
    priority: route === '/' ? 1 : route === guideHubRoute ? 0.86 : authorityRoutes.includes(route) ? 0.82 : route.startsWith('/blog') ? 0.65 : 0.75,
  }));
}
