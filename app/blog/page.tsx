import type { Metadata } from 'next';
import BlogIndexClient from '@/components/BlogIndexClient';
import { blogPosts } from '@/data/blogPosts';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/blog');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export const dynamic = 'force-dynamic';

export default async function Page() {
  const dbPosts = await getPublishedDbBlogPosts();
  const allPosts = [...dbPosts, ...blogPosts]
    .filter((post, index, array) => array.findIndex((item) => item.slug === post.slug) === index)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogIndexClient posts={allPosts} />;
}
