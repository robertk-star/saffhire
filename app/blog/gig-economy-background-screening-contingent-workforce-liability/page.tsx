import type { Metadata } from "next";
import GigEconomyBlogClient from "@/components/GigEconomyBlogClient";
import { blogPosts } from "@/data/blogPosts";
import { blogPostingSchema } from "@/lib/structuredData";

const post = blogPosts.find((item) => item.slug === "gig-economy-background-screening-contingent-workforce-liability");

export const metadata: Metadata = {
  title: post?.title,
  description: post?.excerpt,
};

export default function Page() {
  const schema = post
    ? blogPostingSchema({
        slug: post.slug,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        authorName: post.author,
        image: post.image,
      })
    : null;

  return (
    <>
      {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> : null}
      <GigEconomyBlogClient />
    </>
  );
}
