/*
 * FCRA Compliance News Page - SaffHire Background Screening
 * Route: /fcra-news
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, Scale, Bell, FileText, ExternalLink } from "lucide-react";
import PageSEO from "@/components/PageSEO";


const articles = [
  {
    category: "FCRA Compliance",
    date: "February 2025",
    title: "Understanding Adverse Action Requirements Under the FCRA",
    summary:
      "When an employer intends to take adverse action - such as rescinding a job offer or declining to hire - based on information in a background check report, the FCRA requires a specific two-step process. First, the employer must provide the applicant with a pre-adverse action notice along with a copy of the report and the Summary of Rights. After a reasonable waiting period (typically five business days), the employer may then issue the final adverse action notice. Failure to follow this process can expose employers to significant legal liability.",
  },
  {
    category: "Regulatory Update",
    date: "January 2025",
    title: "FTC Enforcement Trends: What Employers Need to Know",
    summary:
      "The Federal Trade Commission (FTC) continues to actively enforce the FCRA against both consumer reporting agencies and employers. Recent enforcement actions have focused on improper permissible purpose claims, failure to maintain reasonable procedures for accuracy, and inadequate adverse action processes. Employers should review their background check procedures annually to ensure ongoing compliance with FTC guidance.",
  },
  {
    category: "State Law Update",
    date: "December 2024",
    title: "Ban-the-Box and Fair Chance Laws: A Growing Patchwork",
    summary:
      "More than 35 states and 150 cities and counties have now enacted some form of ban-the-box or fair chance hiring legislation. These laws generally restrict when employers can ask about criminal history during the hiring process, with many requiring that a conditional offer of employment be extended before a background check is initiated. Employers operating in multiple jurisdictions must navigate a complex and evolving set of requirements. SaffHire's compliance team monitors these developments and updates our processes accordingly.",
  },
  {
    category: "EEOC Guidance",
    date: "November 2024",
    title: "EEOC Guidance on Criminal Records: The Individualized Assessment",
    summary:
      "The Equal Employment Opportunity Commission (EEOC) has long maintained that blanket exclusion policies based on criminal history can violate Title VII of the Civil Rights Act if they have a disparate impact on protected classes. The EEOC recommends that employers conduct an individualized assessment of each applicant's criminal record, considering the nature of the crime, the time elapsed since the offense, and the nature of the job. SaffHire's reports are designed to provide the information needed to conduct this assessment.",
  },
  {
    category: "Best Practices",
    date: "October 2024",
    title: "Maintaining a Written Background Check Policy",
    summary:
      "One of the most effective steps an employer can take to protect itself from FCRA liability is to maintain a written background check policy. This policy should define which positions require a background check, what types of searches are conducted, how results are evaluated, and what the adverse action process looks like. A well-documented policy demonstrates that the employer applies its screening criteria consistently and in a non-discriminatory manner.",
  },
  {
    category: "Consumer Rights",
    date: "September 2024",
    title: "Applicant Rights Under the FCRA: A Summary for Employers",
    summary:
      "Applicants have significant rights under the FCRA that employers must respect. These include the right to be notified when a consumer report is being obtained, the right to receive a copy of the report and the Summary of Rights before adverse action is taken, and the right to dispute inaccurate or incomplete information. Employers who fail to honor these rights face potential civil liability and FTC enforcement action.",
  },
];

export default function FCRANews() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/fcra-news" title="FCRA News and Compliance Updates" description="Stay current with the latest FCRA news, background check law updates, and compliance guidance for employers from the SaffHire team." />

      <Navbar />

      {/* Hero */}
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
              style={{
                backgroundColor: "rgba(34,197,94,0.15)",
                color: "#22c55e",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <Scale size={14} />
              COMPLIANCE RESOURCES
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              FCRA Compliance News
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Stay current on Fair Credit Reporting Act compliance, background screening
              regulations, and employment law developments that affect how employers use
              background checks in hiring decisions.
            </p>
          </div>
        </div>
      </section>

      {/* About FCRA */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                title: "What Is the FCRA?",
                desc: "The Fair Credit Reporting Act (FCRA) is a federal law that regulates the collection, dissemination, and use of consumer information, including background check reports. It establishes rights for consumers and obligations for employers and consumer reporting agencies.",
              },
              {
                icon: Bell,
                title: "Why It Matters for Employers",
                desc: "Employers who use background checks in hiring must comply with FCRA requirements, including obtaining written authorization, following adverse action procedures, and using reports only for permissible purposes. Non-compliance can result in civil lawsuits and FTC enforcement.",
              },
              {
                icon: BookOpen,
                title: "Staying Informed",
                desc: "FCRA enforcement, state fair chance laws, and EEOC guidance continue to evolve. This page provides updates and educational content to help employers stay current and maintain compliant hiring practices.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                >
                  <item.icon size={18} style={{ color: "#22c55e" }} />
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            LATEST UPDATES
          </p>
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Compliance News &amp; Articles
          </h2>

          <div className="space-y-8">
            {articles.map((article) => (
              <article
                key={article.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-green-200 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: "rgba(34,197,94,0.1)",
                      color: "#22c55e",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs">{article.date}</span>
                </div>
                <h3
                  className="text-xl font-black text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {article.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{article.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            OFFICIAL RESOURCES
          </p>
          <h2
            className="text-3xl font-black text-gray-900 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Key Regulatory Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "FTC: Fair Credit Reporting Act",
                desc: "Official FTC guidance and the full text of the FCRA.",
                href: "https://www.ftc.gov/legal-library/browse/statutes/fair-credit-reporting-act",
              },
              {
                title: "EEOC: Criminal History Guidance",
                desc: "EEOC enforcement guidance on the use of arrest and conviction records.",
                href: "https://www.eeoc.gov/laws/guidance/questions-and-answers-clarify-and-provide-common-interpretation-uniform-guidelines",
              },
              {
                title: "CFPB: Summary of Consumer Rights",
                desc: "The official Summary of Your Rights Under the FCRA required for adverse action notices.",
                href: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
              },
              {
                title: "DOL: Fair Chance Hiring",
                desc: "Department of Labor resources on fair chance hiring practices for federal contractors.",
                href: "https://www.dol.gov/agencies/ofccp/faqs/fair-chance-act",
              },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-green-200 transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                >
                  <FileText size={18} style={{ color: "#22c55e" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="font-bold text-gray-900 text-sm group-hover:text-green-600 transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {resource.title}
                    </h3>
                    <ExternalLink size={12} className="text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-gray-500 text-sm">{resource.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Questions About Compliance?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            SaffHire's team is available to help you understand your obligations under the
            FCRA and build a compliant background screening program.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-white"
            style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            Contact Us <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
