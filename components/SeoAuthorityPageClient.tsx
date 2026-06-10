"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { SeoAuthorityPage } from "@/data/seoAuthorityPages";

export default function SeoAuthorityPageClient({ page }: { page: SeoAuthorityPage }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            BACKGROUND SCREENING GUIDE
          </p>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {page.title}
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            {page.description}
          </p>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-green-200 bg-green-50 p-8 mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-green-700 mb-3">
              Quick Answer
            </p>
            <p className="text-xl leading-relaxed text-slate-800">{page.heroAnswer}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Who needs it?</h2>
              <ul className="space-y-3 text-gray-700">
                {page.whoNeedsIt.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What it checks</h2>
              <ul className="space-y-3 text-gray-700">
                {page.whatItChecks.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Why it matters</h2>
              <ul className="space-y-3 text-gray-700">
                {page.whyItMatters.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Common Questions</h2>
            <div className="space-y-5">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Related SaffHire resources</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex rounded-full border border-green-300 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#0f172a" }}>
            <h2 className="text-3xl font-black text-white mb-4">Need help choosing the right screening package?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              SaffHire helps employers build background screening packages based on role, industry,
              risk level, and compliance needs.
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
