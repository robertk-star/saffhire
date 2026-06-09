import Link from 'next/link';
import { blogPosts } from '@/content/blog/posts';

export const metadata = { title: 'Background Screening Blog', description: 'SaffHire articles about background checks, hiring, and screening best practices.' };

export default function BlogPage() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="kicker">Blog</p><h1>Background screening resources for employers.</h1><p>Plain-English articles to help employers understand screening options and hiring workflows.</p></div></section>
      <section className="section"><div className="wrap"><div className="blog-list">{blogPosts.map((post) => <Link className="blog-card" key={post.slug} href={`/blog/${post.slug}`}><time>{post.date}</time><h2>{post.title}</h2><p>{post.excerpt}</p></Link>)}</div></div></section>
    </>
  );
}
