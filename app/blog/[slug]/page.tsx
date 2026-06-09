import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { blogPosts } from '@/data/blogPosts';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title || 'Background Screening Blog', description: post?.excerpt || 'SaffHire background screening article.' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LegacyClientPage page="blogPost" path={`/blog/${slug}`} />;
}
