import type { MetadataRoute } from 'next';
import { seoMetadata } from '@/shared/seoMetadata';
import { blogPosts } from '@/data/blogPosts';
import { seoAuthorityPages } from '@/data/seoAuthorityPages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.keys(seoMetadata);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const authorityRoutes = seoAuthorityPages.map((page) => page.path);
  const routes = Array.from(new Set([...staticRoutes, ...authorityRoutes, ...blogRoutes]));

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || authorityRoutes.includes(route) ? 'weekly' as const : 'monthly' as const,
    priority: route === '/' ? 1 : authorityRoutes.includes(route) ? 0.82 : route.startsWith('/blog') ? 0.65 : 0.75,
  }));
}
