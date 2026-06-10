"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { seoAuthorityPages } from "@/data/seoAuthorityPages";

const coreServices = [
  { label: "Criminal Background Checks", href: "/criminal-background-checks" },
  { label: "Employment Verification", href: "/employment-verification" },
  { label: "Education Verification", href: "/education-verification" },
  { label: "Drug Screening", href: "/drug-screening" },
  { label: "MVR / Driving Records", href: "/mvr-checks" },
];

const industries = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Staffing", href: "/industries/staffing" },
  { label: "Transportation", href: "/industries/transportation" },
  { label: "Churches & Nonprofits", href: "/industries/church-nonprofit" },
  { label: "Small Business", href: "/small-business-background-checks" },
];

export default function BackgroundScreeningGuidesClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            BACKGROUND SCREENING RESOURCES
          </p>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Background Screening Guides for Employers
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Clear, plain-English background screening guides to help employers understand criminal
            searches, county records, healthcare sanctions checks, volunteer screening, small
            business screening, and FCRA-aware hiring workflows.
          </p>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-green-200 bg-green-50 p-8 mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-green-700 mb-3">
              Quick Answer
            </p>
            <p className="text-xl leading-relaxed text-slate-800">
              SaffHire helps employers choose background screening services based on role, industry,
              risk level, and compliance needs. These guides explain common screening tools in a way
              that is useful for employers, search engines, and AI answer tools.
            </p>
          </section>

          <section className="mb-14">
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Featured guides</h2>
                <p className="text-gray-600">
                  Start here for the highest-value employer background screening topics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seoAuthorityPages.map((page) => (
                <a
                  key={page.path}
                  href={page.path}
                  className="group rounded-2xl border border-gray-200 p-6 hover:border-green-400 hover:shadow-lg transition-all"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-green-600 mb-3">
                    Employer Guide
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-green-700">
                    {page.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{page.heroAnswer}</p>
                  <span className="text-green-700 font-bold">Read guide →</span>
                </a>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            <section className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-4">Core screening services</h2>
              <p className="text-gray-700 mb-5">
                These are the main background screening services employers commonly use during hiring.
              </p>
              <div className="flex flex-wrap gap-3">
                {coreServices.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-green-300 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-4">Industry screening</h2>
              <p className="text-gray-700 mb-5">
                Different industries have different risk levels, turnaround needs, and compliance concerns.
              </p>
              <div className="flex flex-wrap gap-3">
                {industries.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-green-300 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#0f172a" }}>
            <h2 className="text-3xl font-black text-white mb-4">
              Need help building a screening package?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              SaffHire helps employers choose the right mix of criminal searches, verifications,
              drug screening, MVR checks, sanctions checks, and industry-specific screening services.
            </p>
            <a
              href="/contact"
              className="btn-green rounded-sm px-10 py-4 text-base font-bold inline-block"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Contact SaffHire
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
