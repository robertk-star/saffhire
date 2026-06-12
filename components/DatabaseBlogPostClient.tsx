"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PublicBlogPost } from "@/lib/blogDrafts";
import { Calendar, Clock, ArrowLeft, Tag, BookOpen, ChevronRight } from "lucide-react";

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbers"; items: string[] };

function cleanInlineMarkdown(value: string) {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .trim();
}

function parseContent(content: string): ContentBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let numbers: string[] = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: cleanInlineMarkdown(paragraph.join(" ")) });
      paragraph = [];
    }
  }

  function flushBullets() {
    if (bullets.length) {
      blocks.push({ type: "bullets", items: bullets.map(cleanInlineMarkdown) });
      bullets = [];
    }
  }

  function flushNumbers() {
    if (numbers.length) {
      blocks.push({ type: "numbers", items: numbers.map(cleanInlineMarkdown) });
      numbers = [];
    }
  }

  function flushAll() {
    flushParagraph();
    flushBullets();
    flushNumbers();
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushAll();
      continue;
    }

    if (line.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "heading", text: cleanInlineMarkdown(line.replace(/^##\s+/, "")) });
      continue;
    }

    if (line.startsWith("# ")) {
      flushAll();
      blocks.push({ type: "heading", text: cleanInlineMarkdown(line.replace(/^#\s+/, "")) });
      continue;
    }

    if (line.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "subheading", text: cleanInlineMarkdown(line.replace(/^###\s+/, "")) });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushNumbers();
      bullets.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\d+[.)]\s+/.test(line)) {
      flushParagraph();
      flushBullets();
      numbers.push(line.replace(/^\d+[.)]\s+/, ""));
      continue;
    }

    flushBullets();
    flushNumbers();
    paragraph.push(line);
  }

  flushAll();
  return blocks;
}

function NumberedCard({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex gap-5 p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white text-sm"
        style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
      >
        {number}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed pt-1">{text}</p>
    </div>
  );
}

export default function DatabaseBlogPostClient({ post }: { post: PublicBlogPost }) {
  const blocks = parseContent(post.content);

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
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              <Tag size={10} />
              {post.category}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
            <span className="flex items-center gap-1.5"><BookOpen size={14} />By {post.author}</span>
          </div>
        </div>
      </section>

      {post.image ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[420px] object-cover rounded-xl shadow-2xl"
          />
        </div>
      ) : null}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            <article className="lg:col-span-2">
              <div
                className="space-y-8"
                style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}
              >
                <p className="text-lg text-gray-700 leading-relaxed font-medium rounded-xl bg-gray-50 border border-gray-100 p-6">
                  {post.excerpt}
                </p>

                {blocks.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={index}
                        className="text-2xl lg:text-3xl font-bold text-gray-900 pt-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "subheading") {
                    return (
                      <h3
                        key={index}
                        className="text-xl font-bold text-gray-900"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.type === "bullets") {
                    return (
                      <ul key={index} className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-gray-700">
                            <span className="mt-2 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "numbers") {
                    return (
                      <div key={index} className="space-y-4">
                        {block.items.map((item, itemIndex) => (
                          <NumberedCard key={item} number={itemIndex + 1} text={item} />
                        ))}
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {block.text}
                    </p>
                  );
                })}

                <div className="mt-8 p-6 rounded-xl border border-green-200 bg-green-50">
                  <p className="text-sm text-gray-600">
                    <strong>SaffHire helps employers build background screening packages</strong> based on role, industry, risk level, and compliance needs. <a href="/contact" className="text-green-700 font-semibold hover:underline">Contact SaffHire</a> to review the right screening package for your hiring process.
                  </p>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-100 p-6 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Related resources
                  </h3>
                  <div className="space-y-3 text-sm">
                    <a className="block text-green-700 hover:underline" href="/background-screening-guides">Background Screening Guides</a>
                    <a className="block text-green-700 hover:underline" href="/criminal-background-checks">Criminal Background Checks</a>
                    <a className="block text-green-700 hover:underline" href="/employment-verification">Employment Verification</a>
                    <a className="block text-green-700 hover:underline" href="/education-verification">Education Verification</a>
                    <a className="block text-green-700 hover:underline" href="/contact">Request a Quote</a>
                  </div>
                </div>

                <div className="rounded-xl p-6" style={{ backgroundColor: "#0f172a" }}>
                  <h3 className="text-white font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Need Background Screening?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get a custom quote for your company's screening needs.
                  </p>
                  <a href="/contact" className="btn-green rounded-sm px-5 py-2.5 text-sm font-bold inline-flex items-center gap-1">
                    Contact Us <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
