import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { openKnowledgePages } from '@/data/openKnowledgePages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';

export const metadata: Metadata = {
  title: 'Open Knowledge Format for SaffHire Background Screening',
  description:
    'Public Open Knowledge Format pages for SaffHire Background Screening. Structured company, service, industry, compliance, and site information for customers, search engines, and AI search tools.',
  alternates: {
    canonical: '/open-knowledge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function OpenKnowledgeIndexPage() {
  return (
    <>
      <main className="bg-white text-slate-900">
        <section className="border-b border-slate-200 bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-wide text-green-700">Open Knowledge Format</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              SaffHire public knowledge pages
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              These pages are the public Open Knowledge Format for SaffHire Background Screening. They are written for people, search engines, and AI search tools that need a clear source of truth about the company.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
              <a className="text-green-700 hover:underline" href={`${siteUrl}/llms.txt`}>/llms.txt</a>
              <a className="text-green-700 hover:underline" href={`${siteUrl}/open-knowledge/okf.json`}>/open-knowledge/okf.json</a>
              <a className="text-green-700 hover:underline" href="/company-information">/company-information</a>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-5xl gap-4">
            {openKnowledgePages.map((page) => (
              <a
                key={page.slug}
                href={`/open-knowledge/${page.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-green-300 hover:bg-green-50"
              >
                <h2 className="text-xl font-black text-slate-950">{page.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">{page.description}</p>
                <p className="mt-3 text-sm font-bold text-green-700">/open-knowledge/{page.slug}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
