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
import { Calendar, Clock, ArrowLeft, Tag, BookOpen, ChevronRight } from "lucide-react";
import { blogPosts, getRelatedPosts } from "@/data/blogPosts";
import { blogPostRegistry } from "./blogRegistry";

// Legacy FCRA article content (kept for the original post)
import { Section, NumberedCard, WarningBox, ConclusionBox, CheckList } from "./blogRegistry";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

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
              <div className="sticky top-24 space-y-8">
                {/* Key Takeaways */}
                <div
                  className="rounded-xl p-6 border-l-4"
                  style={{ backgroundColor: "#f0fdf4", borderColor: "#22c55e" }}
                >
                  <h3
                    className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {registryEntry.keyTakeaways.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2
                          size={15}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "#22c55e" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div
                  className="rounded-xl p-6 text-white"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  <h3
                    className="font-bold mb-2 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Ready to Screen with Confidence?
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                    SaffHire helps simplify background screening workflows with compliance-support features like pre-adverse action email delivery.
                  </p>
                  <a
                    href="/#contact"
                    className="btn-green w-full block text-center rounded-sm py-2.5 text-sm font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Get a Free Quote
                  </a>
                </div>

                {/* Related Topics */}
                <div className="rounded-xl border border-gray-100 p-6">
                  <h3
                    className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {registryEntry.relatedTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Related Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getRelatedPosts(slug || "").map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col bg-white">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full w-fit mb-3"
                        style={{
                          backgroundColor: "rgba(34,197,94,0.15)",
                          color: "#22c55e",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <Tag size={10} />
                        {post.category}
                      </span>
                      <h3
                        className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          {post.date}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-green-600 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Legacy FCRA Article (original post) ─────────────────────────────────────
function LegacyFCRAArticle() {
  return (
    <div
      className="space-y-8"
      style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}
    >
      <p className="text-lg text-gray-700 leading-relaxed font-medium">
        For any business that conducts background checks on job applicants or employees, the Fair
        Credit Reporting Act (FCRA) is not optional - it is the law. Enacted in 1970 and
        significantly amended over the decades, the FCRA establishes the rights of consumers and
        the obligations of employers and consumer reporting agencies (CRAs) like SaffHire. At
        SaffHire, FCRA compliance is not a checkbox - it is embedded into every step of our
        screening process.
      </p>

      <Section title="What Is the FCRA and Why Does It Matter?">
        <p>
          The Fair Credit Reporting Act is a federal law enforced by the Federal Trade Commission
          (FTC) and the Consumer Financial Protection Bureau (CFPB). It governs how consumer
          reporting agencies collect, store, and share consumer information - including criminal
          records, employment history, credit reports, and other background data used in hiring
          decisions.
        </p>
        <p>
          Non-compliance with the FCRA carries serious consequences. Employers and CRAs that
          violate the Act can face civil lawsuits, statutory damages of up to $1,000 per violation,
          punitive damages, and attorney's fees. Willful violations can result in penalties of up
          to $2,500 per violation under the FTC's enforcement authority. For businesses conducting
          high-volume hiring, the financial and reputational exposure can be substantial.
        </p>
        <p>
          SaffHire operates as a Consumer Reporting Agency under the FCRA, which means we are held
          to the highest standards of accuracy, fairness, and privacy in every report we produce.
        </p>
      </Section>

      <Section title="The Four Pillars of FCRA Compliance at SaffHire">
        <p>
          SaffHire's compliance framework is built around four core obligations that the FCRA
          places on employers and CRAs. Each pillar is supported by automated workflows within our
          platform to eliminate the risk of human error.
        </p>
        <NumberedCard
          number="1"
          title="Permissible Purpose"
          description="Before SaffHire initiates any background check, our platform verifies that the requesting employer has a permissible purpose under the FCRA - most commonly, employment purposes. Employers must certify this purpose when setting up their account, and our system enforces it at the point of every order. We do not process screening requests that lack a documented permissible purpose."
        />
        <NumberedCard
          number="2"
          title="Written Disclosure and Authorization"
          description="The FCRA requires that employers provide applicants with a clear written disclosure that a background check will be conducted, and obtain the applicant's written authorization before ordering the report. SaffHire's platform generates a compliant standalone disclosure and authorization form for every applicant, delivered electronically with a legally valid e-signature option."
        />
        <NumberedCard
          number="3"
          title="Pre-Adverse Action Notice"
          description="If an employer intends to take adverse action based in whole or in part on information in a SaffHire background report, the FCRA mandates a two-step adverse action process. First, the employer must provide the applicant with a Pre-Adverse Action Notice that includes a copy of the background report and a summary of their rights under the FCRA. SaffHire's platform generates this notice automatically and delivers it to the applicant, giving them a reasonable period to review the report and dispute any inaccuracies before a final decision is made."
        />
        <NumberedCard
          number="4"
          title="Final Adverse Action Notice"
          description="If the employer proceeds with the adverse decision after the waiting period, a Final Adverse Action Notice must be provided to the applicant. This notice must include the name, address, and phone number of the CRA that provided the report; a statement that the CRA did not make the adverse decision; and information about the applicant's right to obtain a free copy of the report within 60 days and to dispute the accuracy of the report. SaffHire generates and delivers this notice through our platform, ensuring every required element is present and documented."
        />
      </Section>

      <Section title="Accuracy Standards: Our Commitment to Reliable Data">
        <p>
          The FCRA requires that CRAs follow reasonable procedures to ensure the maximum possible
          accuracy of the information in consumer reports. At SaffHire, accuracy is not simply a
          legal obligation - it is the foundation of our value to clients. An inaccurate background
          report can harm an innocent applicant and expose an employer to legal liability.
        </p>
        <p>
          Our accuracy protocols include multi-source verification for criminal record searches,
          direct verification with employers and educational institutions for employment and
          education history, and rigorous quality-control review before any report is delivered.
          We also maintain a dedicated dispute resolution team that investigates and resolves
          applicant disputes within the 30-day statutory window required by the FCRA.
        </p>
      </Section>

      <WarningBox
        headline='Important: The "Standalone Disclosure" Requirement'
        body="One of the most commonly violated FCRA provisions is the requirement that the written disclosure to the applicant must be provided in a document that consists solely of the disclosure. It cannot be embedded in an employment application or combined with other forms. SaffHire's platform enforces this automatically - the disclosure is always delivered as a separate, standalone document."
      />

      <Section title="EEOC Compliance and Individualized Assessment">
        <p>
          FCRA compliance does not operate in isolation. The Equal Employment Opportunity
          Commission (EEOC) has issued guidance on how employers should use criminal history
          information in hiring decisions. Under EEOC standards, a blanket policy of excluding all
          applicants with criminal records may constitute disparate impact discrimination under
          Title VII of the Civil Rights Act.
        </p>
        <p>
          SaffHire supports employers in conducting individualized assessments when criminal
          history is a factor in a hiring decision. This means evaluating the nature and gravity of
          the offense, the time elapsed since the offense or completion of the sentence, and the
          nature of the job sought. Our platform provides the structured data employers need to
          conduct these assessments consistently and defensibly.
        </p>
      </Section>

      <Section title="State and Local Law Compliance">
        <p>
          Beyond the federal FCRA, many states and municipalities have enacted their own background
          screening laws - some of which are stricter than federal requirements. Fair chance hiring
          laws in numerous jurisdictions restrict when employers may inquire about criminal history.
          States such as California, New York, and Massachusetts have additional requirements
          around disclosure, waiting periods, and the types of records that may be reported.
        </p>
        <p>
          SaffHire's compliance team continuously monitors state and local legislative changes.
          Our platform is configured to apply jurisdiction-specific rules automatically based on
          the applicant's location, ensuring that every report delivered is compliant with the
          applicable law - not just the federal baseline.
        </p>
      </Section>

      <ConclusionBox
        title="The SaffHire Commitment"
        body="SaffHire was founded on the principle that background screening should be fast, fair, and fully compliant. The FCRA exists to protect consumers - and by extension, it protects employers who follow it. Our platform automates every required step of the FCRA process, from initial disclosure through adverse action, so that every screening SaffHire delivers is one you can stand behind. If you have questions about FCRA compliance or how SaffHire can support your hiring process, contact our team for a free consultation."
      />

      <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-6">
        Disclaimer: This article is provided for informational purposes only and does not constitute
        legal advice. Employers should consult qualified employment counsel for guidance specific to
        their circumstances, industry, and jurisdiction.
      </p>
    </div>
  );
}
