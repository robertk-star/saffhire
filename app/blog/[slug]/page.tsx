import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import DatabaseBlogPostClient from '@/components/DatabaseBlogPostClient';
import { blogPosts } from '@/data/blogPosts';
import { getPublishedDbBlogPostBySlug } from '@/lib/blogDrafts';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getPublishedDbBlogPostBySlug(slug);
  if (dbPost) return { title: dbPost.title, description: dbPost.excerpt };

  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title || 'Background Screening Blog', description: post?.excerpt || 'SaffHire background screening article.' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getPublishedDbBlogPostBySlug(slug);
  if (dbPost) return <DatabaseBlogPostClient post={dbPost} />;

  return <LegacyClientPage page="blogPost" path={`/blog/${slug}`} />;
}
