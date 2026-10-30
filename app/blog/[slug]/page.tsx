import { notFound } from 'next/navigation';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import DatabaseBlogPostClient from '@/components/DatabaseBlogPostClient';
import { blogPosts, type BlogPost } from '@/data/blogPosts';
import { blogPostRegistry } from '@/legacy/blogRegistry';
import { getPublishedDbBlogPostBySlug, type PublicBlogPost } from '@/lib/blogDrafts';
import { blogPostingSchema } from '@/lib/structuredData';

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
  if (dbPost) return { title: dbPost.title, description: dbPost.excerpt };

  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title || 'Background Screening Blog', description: post?.excerpt || 'SaffHire background screening article.' };
}

function schemaScript(schema: ReturnType<typeof blogPostingSchema>) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function schemaForDatabasePost(post: PublicBlogPost) {
  return blogPostingSchema({
    slug: post.slug,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || post.updatedAt || post.date,
    dateModified: post.updatedAt || post.publishedAt || post.date,
    authorName: post.author,
    image: post.image,
  });
}

function schemaForFilePost(post: BlogPost) {
  return blogPostingSchema({
    slug: post.slug,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    authorName: post.author,
    image: post.image,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getPublishedDbBlogPostBySlug(slug);
  if (dbPost) {
    return (
      <>
        {schemaScript(schemaForDatabasePost(dbPost))}
        <DatabaseBlogPostClient post={dbPost} />
      </>
    );
  }

  // Unknown slugs or slugs without an article body return a real 404 (not a soft 404).
  if (!hasFileArticle(slug)) notFound();

  const post = blogPosts.find((item) => item.slug === slug);
  return (
    <>
      {post ? schemaScript(schemaForFilePost(post)) : null}
      <LegacyClientPage page="blogPost" path={`/blog/${slug}`} />
    </>
  );
}
