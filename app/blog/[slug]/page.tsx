import { notFound } from 'next/navigation';
import { blogPosts } from '@/content/blog/posts';

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title || 'Blog', description: post?.excerpt || '' };
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="kicker">SaffHire Blog</p><h1>{post.title}</h1><p>{post.excerpt}</p></div></section>
      <article className="content"><time>{post.date}</time>{post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>
    </>
  );
}
