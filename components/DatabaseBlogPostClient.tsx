"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PublicBlogPost } from "@/lib/blogDrafts";
import { Calendar, Clock, ArrowLeft, Tag, BookOpen } from "lucide-react";

function formatContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function DatabaseBlogPostClient({ post }: { post: PublicBlogPost }) {
  const paragraphs = formatContent(post.content);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24 pb-10" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <a href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8">
            <ArrowLeft size={14} />
            Back to Blog
          </a>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>
              <Tag size={10} />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 max-w-4xl leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
            <span className="flex items-center gap-1.5"><BookOpen size={14} />By {post.author}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p className="text-xl font-medium text-gray-800">{post.excerpt}</p>
            {paragraphs.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-black text-slate-900 pt-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>{paragraph.replace(/^##\s+/, '')}</h2>;
              }
              if (paragraph.startsWith('# ')) {
                return <h2 key={index} className="text-3xl font-black text-slate-900 pt-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>{paragraph.replace(/^#\s+/, '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map((item) => item.replace(/^-\s+/, '').trim()).filter(Boolean);
                return (
                  <ul key={index} className="space-y-3 list-disc pl-6">
                    {items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
