import type { Metadata } from 'next';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';

export const metadata: Metadata = {
  title: 'Company Information for SaffHire Background Screening',
  description:
    'Authoritative company information about SaffHire Background Screening, including services, industries served, location, compliance approach, and contact details.',
  alternates: {
    canonical: '/company-information',
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

const services = [
  'Criminal background checks',
  'County criminal background checks',
  'National criminal database searches',
  'Federal criminal searches',
  'Sex offender registry searches',
  'Global security watch list searches',
  'Employment verification',
  'Education verification',
  'Drug screening',
  'Motor vehicle record checks',
  'Healthcare sanctions and OIG checks',
  'Volunteer background checks',
];

const industries = [
  'Healthcare',
  'Staffing',
  'Transportation and trucking',
  'Manufacturing and warehousing',
  'Hospitality',
  'Energy',
  'Education',
  'Churches and nonprofit organizations',
  'Small businesses',
  'Employers across all industries',
];

const importantLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Background Screening Guides', href: '/background-screening-guides' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'SaffHire Background Screening',
  url: siteUrl,
  logo: `${siteUrl}/images/saffhire-logo.png`,
  telephone: '+1-888-588-1733',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Frisco',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: 'United States',
  description:
    'SaffHire Background Screening provides employment background screening services for employers across the United States.',
  sameAs: [
    'https://www.facebook.com/saffhire',
    'https://www.linkedin.com/company/saffhire',
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/company-information#background-screening-service`,
  name: 'Employment Background Screening Services',
  provider: {
    '@id': `${siteUrl}/#organization`,
  },
  areaServed: 'United States',
  serviceType: services,
  description:
    'Employment background screening services including criminal searches, employment verification, education verification, drug screening, MVR checks, and related screening services.',
};

export default function CompanyInformationPage() {
  return (
    <>
      <main className="bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <section className="border-b border-slate-200 bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-wide text-green-700">Company Information</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              SaffHire Background Screening
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              SaffHire Background Screening provides employment background screening services for employers across the United States. This page is a public, crawlable company information source for customers, search engines, and AI search tools.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-950">What SaffHire does</h2>
                <p className="mt-3 leading-7 text-slate-700">
                  SaffHire helps employers make informed hiring decisions by providing background screening services such as criminal background checks, verification services, drug screening, motor vehicle record checks, and industry-specific screening workflows.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-950">Background screening services</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <div key={service} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm">
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-950">Industries served</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {industries.map((industry) => (
                    <div key={industry} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                      {industry}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-950">Important website links</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {importantLinks.map((link) => (
                    <a key={link.href} href={link.href} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-green-700 shadow-sm transition hover:border-green-300 hover:bg-green-50">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Business details</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-slate-950">Company</dt>
                    <dd className="mt-1 text-slate-700">SaffHire Background Screening</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-950">Website</dt>
                    <dd className="mt-1">
                      <a className="text-green-700 hover:underline" href="https://www.saffhire.com">www.saffhire.com</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-950">Location</dt>
                    <dd className="mt-1 text-slate-700">Frisco, Texas</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-950">Phone</dt>
                    <dd className="mt-1">
                      <a className="text-green-700 hover:underline" href="tel:8885881733">(888) 588-1733</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
