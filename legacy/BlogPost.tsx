/*
 * BlogPost Page - SaffHire Background Screening
 * Design: Clean Professional Trust - article layout with sidebar
 * Route: /blog/:slug
 * Posts are registered in blogRegistry.tsx
 */

import { useParams, Link } from "wouter";
import PageSEO from "@/components/PageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigEconomyBlogClient from "@/components/GigEconomyBlogClient";
import AIResumeFraudBlogClient from "@/components/AIResumeFraudBlogClient";
import { Calendar, Clock, ArrowLeft, Tag, BookOpen, ChevronRight } from "lucide-react";
import { blogPosts, getRelatedPosts } from "@/data/blogPosts";
import { blogPostRegistry } from "./blogRegistry";

// Legacy FCRA article content (kept for the original post)
import { Section, NumberedCard, WarningBox, ConclusionBox, CheckList } from "./blogRegistry";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  if (slug === "gig-economy-background-screening-contingent-workforce-liability") {
    return <GigEconomyBlogClient />;
  }

  if (slug === "ai-powered-resume-fraud-hiring-challenge") {
    return <AIResumeFraudBlogClient />;
  }

  // Find post metadata from Blog listing
  const postMeta = blogPosts.find((p) => p.slug === slug);

  // Find full article from registry
  const registryEntry = blogPostRegistry.find((p) => p.slug === slug);

  if (!postMeta || !registryEntry) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h1
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Article Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link href="/blog" className="btn-green rounded-sm px-6 py-2.5 inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { ArticleComponent } = registryEntry;

  // Generate JSON-LD schema for the article
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postMeta.title,
    "description": registryEntry.metaDescription,
    "image": postMeta.image,
    "datePublished": postMeta.date,
    "author": {
      "@type": "Organization",
      "name": postMeta.author,
      "url": "https://saffhire.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SaffHire",
      "url": "https://saffhire.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saffhire.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://saffhire.com/blog/${slug}`
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path={`/blog/${slug}`}
        title={postMeta.title}
        description={registryEntry.metaDescription}
      />
      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-10" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8">
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(34,197,94,0.15)",
                color: "#22c55e",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <Tag size={10} />
              {postMeta.category}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 max-w-3xl leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {postMeta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {postMeta.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {postMeta.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} />
              By {postMeta.author}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src={postMeta.image}
          alt={postMeta.title}
          className="w-full rounded-xl shadow-2xl"
        />
      </div>

      {/* Article Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Main Content */}
            <article className="lg:col-span-2 prose-article">
              {slug === "how-saffhire-follows-fcra-guidelines" ? (
                <LegacyFCRAArticle />
              ) : (
                <ArticleComponent />
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-100 p-6 bg-gray-50">
                  <h3
                    className="font-bold text-gray-900 mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {getRelatedPosts(postMeta.slug).map((related) => (
                      <a
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600 leading-snug">
                          {related.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <Clock size={10} />
                          {related.readTime}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-xl p-6"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  <h3
                    className="text-white font-bold mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Need Background Screening?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get a custom quote for your company's screening needs.
                  </p>
                  <a href="/#contact" className="btn-green rounded-sm px-5 py-2.5 text-sm font-bold inline-flex items-center gap-1">
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

function LegacyFCRAArticle() {
  return (
    <div className="space-y-8" style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}>
      <p className="text-lg text-gray-700 leading-relaxed font-medium">
        At SaffHire, compliance is not an add-on — it is built into how we perform every background screening. The Fair Credit Reporting Act (FCRA) sets the rules for how consumer reports can be used for employment decisions, and employers must follow these rules carefully.
      </p>

      <Section title="What the FCRA Requires">
        <p>
          The FCRA requires employers to provide proper disclosure, obtain written authorization, follow adverse action procedures, and use background check information fairly and accurately.
        </p>
      </Section>

      <Section title="How SaffHire Supports Compliance">
        <CheckList items={[
          "Clear disclosure and authorization workflows",
          "Accurate background screening reports",
          "Support for pre-adverse and adverse action steps",
          "Secure handling of applicant information",
          "Employer-focused guidance on screening best practices",
        ]} />
      </Section>

      <WarningBox
        headline="Compliance reminder"
        body="Employers should consult qualified counsel before making final hiring decisions based on background screening results."
      />

      <ConclusionBox
        title="SaffHire Helps Employers Screen Responsibly"
        body="Our process is designed to help employers make informed hiring decisions while respecting applicant rights and FCRA requirements."
      />
    </div>
  );
}
