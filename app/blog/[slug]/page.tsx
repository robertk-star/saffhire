import { notFound } from 'next/navigation';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import DatabaseBlogPostClient from '@/components/DatabaseBlogPostClient';
import { blogPosts } from '@/data/blogPosts';
import { blogPostRegistry } from '@/legacy/blogRegistry';
import { getPublishedDbBlogPostBySlug } from '@/lib/blogDrafts';
import { blogDocumentMeta } from '@/lib/blogSeo';

export const dynamic = 'force-dynamic';

// Posts rendered by dedicated components in legacy/BlogPost.tsx (no registry entry).
const customBodySlugs = new Set([
  'gig-economy-background-screening-contingent-workforce-liability',
  'ai-powered-resume-fraud-hiring-challenge',
]);

/** True when a file-based post has both listing metadata and an article body. */
function hasFileArticle(slug: string) {
  if (!blogPosts.some((post) => post.slug === slug)) return false;
  return customBodySlugs.has(slug) || blogPostRegistry.some((post) => post.slug === slug);
}

export function generateStaticParams() {
  return blogPosts.filter((post) => hasFileArticle(post.slug)).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getPublishedDbBlogPostBySlug(slug);
  if (dbPost) {
    const meta = blogDocumentMeta(dbPost.slug, dbPost.title, dbPost.excerpt);
    // Overrides set an absolute title so the layout template cannot push the tag past 65 characters.
    if (meta.overridden) return { title: { absolute: meta.titleTag }, description: meta.description };
    return { title: meta.title, description: meta.description };
  }

  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title || 'Background Screening Blog', description: post?.excerpt || 'SaffHire background screening article.' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getPublishedDbBlogPostBySlug(slug);
  if (dbPost) return <DatabaseBlogPostClient post={dbPost} />;

  // Unknown slugs or slugs without an article body return a real 404 (not a soft 404).
  if (!hasFileArticle(slug)) notFound();

  return <LegacyClientPage page="blogPost" path={`/blog/${slug}`} />;
}
