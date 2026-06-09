import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog/posts';
import { industries, services, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/services', '/industries', '/about', '/request-a-quote', '/contact', '/faq', '/blog', '/privacy', '/terms'];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const industryRoutes = industries.map((industry) => `/industries/${industry.slug}`);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes].map((route) => ({ url: `${site.url}${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : 0.7 }));
}
