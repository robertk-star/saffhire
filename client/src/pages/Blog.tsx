/*
 * Blog Page SaffHire Background Screening
 * Design: Clean Professional Trust
 * Lists all blog posts; first post is about FCRA compliance
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Tag, Rss } from "lucide-react";
import PageSEO from "@/components/PageSEO";
import { blogPosts } from "@/data/blogPosts";

export { blogPosts } from "@/data/blogPosts";

// Keep the old export for backward compatibility
const _blogPostsArray = [
  {
    slug: "how-saffhire-follows-fcra-guidelines",
    title: "How SaffHire Follows FCRA Guidelines for All Screenings",
    excerpt:
      "The Fair Credit Reporting Act (FCRA) sets the legal foundation for how background checks must be conducted in the United States. Learn how SaffHire ensures every screening is fully compliant protecting both employers and applicants.",
    category: "Compliance",
    date: "March 8, 2026",
    readTime: "7 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/fcra-compliance-desk-3JC9VnSn79Eza4MX25aW3J.webp",
  },
  {
    slug: "fcra-compliance-checklist-employers-2026",
    title: "FCRA Compliance Checklist for Employers in 2026",
    excerpt:
      "A step-by-step FCRA compliance checklist for high-turnover employers. Covers standalone disclosures, written authorization, adverse action notices, 2026 regulatory updates, and the most common violations that lead to costly lawsuits.",
    category: "Compliance",
    date: "March 10, 2026",
    readTime: "8 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/fcra-checklist-blog-hero-RuTByNnDXXWqjAKqZs6sW9.webp",
  },
  {
    slug: "eeoc-guidance-criminal-records-employers",
    title: "EEOC Guidance and Criminal Records: What Every Employer Must Know Before Their Next Hire",
    excerpt:
      "Blanket criminal record exclusion policies can expose your company to EEOC liability. Learn the Green factors, individualized assessment requirements, and how to build a compliant screening policy that protects your business in 2026.",
    category: "Compliance",
    date: "March 16, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/eeoc-criminal-records-blog-hero-5pfApzDoAMU4s5WfbSooVw.webp",
  },
  {
    slug: "ban-the-box-laws-by-state-employer-guide",
    title: "The Employer's State-by-State Guide to Ban-the-Box Laws: What You Must Do Before You Ask",
    excerpt:
      "Ban-the-box laws now cover more than 150 cities and 37 states. This employer guide breaks down which states require delayed criminal history inquiries, key penalties, and how to build a compliant hiring process in 2026.",
    category: "Compliance",
    date: "March 23, 2026",
    readTime: "10 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/ban-the-box-blog-hero-EFcf5z8yzZtFAPfmVoSoXi.webp",
  },
  {
    slug: "roi-of-speed-5-minute-background-checks-time-to-hire",
    title: "The ROI of Speed: How 5-Minute Background Checks Slash Your Time-to-Hire",
    excerpt:
      "Slow background checks cost employers thousands per month in lost productivity and candidate drop-off. Discover how fast background checks and hiring efficiency go hand in hand, and how a 5-minute employment background check can transform your time-to-hire.",
    category: "Hiring Efficiency",
    date: "March 26, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/roi-speed-background-checks-blog-hero-bPJuHRWgUsr5pcVwmFfDrh.webp",
  },
  {
    slug: "ongoing-employee-screening-long-term-risk-management",
    title: "Why Ongoing Employee Screening Will Change the Way You Manage Long-Term Risk",
    excerpt:
      "A pre-hire background check only tells you who someone was on day one. Discover why ongoing employee screening services and continuous background screening solutions are the new standard for long-term workforce risk management.",
    category: "Risk Management",
    date: "March 30, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/ongoing-employee-screening-blog-hero-96awRDR6NxKQcuSdzJqFAx.webp",
  },
  {
    slug: "what-oig-expects-healthcare-organizations",
    title: "What the OIG Expects from Healthcare Organizations",
    excerpt:
      "The OIG exclusion list is updated every month, and employing an excluded individual, even unknowingly, can trigger civil penalties, full claim repayment, and loss of Medicare and Medicaid billing privileges. Learn what the standard of care actually requires.",
    category: "Healthcare Compliance",
    date: "April 2, 2026",
    readTime: "8 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/oig-healthcare-compliance-blog-hero-emwEM2MDQQNZe97joqH4us.webp",
  },
  {
    slug: "birthdate-redaction-background-check-delays",
    title: "Birthdate Redaction: Why Some States Are Slowing Down Your Background Checks (and How to Handle It)",
    excerpt:
      "California and Michigan birthdate redaction laws are causing background check delays of 4 to 5 days. Learn why PII redaction is spreading, how it affects your hiring timeline, and what strategies keep your screening process on track.",
    category: "Compliance",
    date: "April 6, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/birthdate-redaction-secure-database_97af283b.png",
  },
  {
    slug: "how-long-background-checks-go-back-7-year-rule",
    title: "How Long Background Checks Can Go Back (7-Year Rule Explained)",
    excerpt:
      "The FCRA 7-year rule is the federal baseline for background check lookback periods, but it is not the whole story. Learn about felony exceptions, state variations, industry-specific requirements, and how to determine the right lookback period for your hiring process.",
    category: "Compliance",
    date: "April 9, 2026",
    readTime: "10 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/7-year-rule-timeline-RNfqFxtfK4odkJVZXaNVE4.webp",
  },
  {
    slug: "true-cost-of-bad-hire",
    title: "The True Cost of a Bad Hire: How Background Screening Prevents Costly Mistakes",
    excerpt:
      "A single bad hire can cost $15,000 to $150,000 or more when you factor in recruitment, training, lost productivity, and legal liability. Learn what bad hires actually cost and how thorough background screening helps prevent the most expensive hiring mistakes.",
    category: "Hiring Best Practices",
    date: "April 10, 2026",
    readTime: "11 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/true-cost-bad-hire-hero-Z23nN5AZd3DgErExoejp4w.webp",
  },
  {
    slug: "top-industries-that-require-most-screening",
    title: "The Top Industries That Require the Most Screening (And Why Cutting Corners Gets Expensive Fast)",
    excerpt:
      "Six industries face the highest hiring risks: staffing, transportation, warehousing, healthcare, financial services, and construction. Learn why thorough background screening is non-negotiable in these sectors and what gaps most companies miss.",
    category: "Industry-Specific",
    date: "April 13, 2026",
    readTime: "11 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/top-industries-screening-hero-WE6rERMRUjdEYRvK8mNf9T.webp",
  },
  {
    slug: "screening-healthcare-workers-what-employers-must-verify",
    title: "Screening Healthcare Workers: What Employers MUST Verify",
    excerpt:
      "Hiring in healthcare is not like hiring for a grocery line. You are trusting someone with lives. Learn the 7 critical verifications every healthcare employer must perform, the compliance traps that cost employers millions, and the three screening setups that balance speed with protection.",
    category: "Healthcare Compliance",
    date: "April 27, 2026",
    readTime: "10 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/healthcare-screening-workers-hero-NbHrLjLNvrWmpCgvpdRJFj.webp",
  },
  {
    slug: "ai-in-background-screening-faster-smarter-more-reliable",
    title: "AI in Background Screening: Faster, Smarter, More Reliable",
    excerpt:
      "AI is transforming background screening - but it's not replacing it. Discover how AI speeds up turnaround times, improves data matching, flags risk patterns, and automates repetitive work. Plus: what AI cannot replace and why the best screening combines AI with human expertise.",
    category: "Technology",
    date: "April 30, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/Screenshot2026-04-30at2.37.09PM_978eaaef.png",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/blog" title="Background Screening Blog" description="Expert insights on FCRA compliance, background check best practices, hiring law updates, and workforce risk management from the SaffHire team." />

      <Navbar />

      {/* Page Header */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            INSIGHTS &amp; RESOURCES
          </p>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            The SaffHire Blog
          </h1>
          <p className="text-gray-400 max-w-xl text-lg">
            Expert guidance on background screening, compliance, hiring best practices, and industry
            news.
          </p>
          <div className="mt-6">
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-opacity-10 transition-colors"
              style={{ borderColor: "#22c55e", color: "#22c55e" }}
            >
              <Rss size={16} />
              <span>Subscribe to RSS Feed</span>
            </a>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="overflow-hidden" style={{ height: 220 }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#16a34a",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-600 transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      <span
                        className="flex items-center gap-1 text-xs font-bold"
                        style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
