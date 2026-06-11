"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Tag, Rss } from "lucide-react";

type BlogIndexPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
};

export default function BlogIndexClient({ posts }: { posts: BlogIndexPost[] }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            INSIGHTS &amp; RESOURCES
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            The SaffHire Blog
          </h1>
          <p className="text-gray-400 max-w-xl text-lg">
            Expert guidance on background screening, compliance, hiring best practices, and industry news.
          </p>
          <div className="mt-6">
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-opacity-10 transition-colors" style={{ borderColor: "#22c55e", color: "#22c55e" }}>
              <Rss size={16} />
              <span>Subscribe to RSS Feed</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
                <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="overflow-hidden" style={{ height: 220 }}>
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#f0fdf4", color: "#16a34a", fontFamily: "'Montserrat', sans-serif" }}>
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-600 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
