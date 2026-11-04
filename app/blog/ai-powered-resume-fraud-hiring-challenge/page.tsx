import type { Metadata } from "next";
import AIResumeFraudBlogClient from "@/components/AIResumeFraudBlogClient";
import { blogPosts } from "@/data/blogPosts";
import { blogPostingSchema } from "@/lib/structuredData";
import { blogSocialMetadata } from "@/lib/blogSocialMeta";

const post = blogPosts.find((item) => item.slug === "ai-powered-resume-fraud-hiring-challenge");

export const metadata: Metadata = {
  title: post?.title,
  description: post?.excerpt,
  ...(post ? blogSocialMetadata({ slug: post.slug, title: post.title, description: post.excerpt, image: post.image }) : {}),
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
      <AIResumeFraudBlogClient />
    </>
  );
}
