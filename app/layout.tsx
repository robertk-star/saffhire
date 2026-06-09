import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import { navItems, site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'SaffHire Background Screening', template: '%s | SaffHire' },
  description:
    'SaffHire provides FCRA-focused employer background screening services for businesses, staffing agencies, churches, nonprofits, transportation companies, healthcare teams, and employers across the United States.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SaffHire Background Screening',
    description: 'Fast, secure, professional background screening support for employers.',
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="top-bar">
          <div className="top-bar-inner">
            <span>Fast • Secure • Reliable Background Screening</span>
            <span>
              <a href={site.phoneHref}>{site.phone}</a> · <a href={site.emailHref}>{site.email}</a>
            </span>
          </div>
        </div>

        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="SaffHire home">
              <Image src="/saffhire-logo.png" alt="SaffHire Background Screening" width={220} height={57} priority />
            </Link>

            <nav className="site-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <a href={site.loginUrl} target="_blank" rel="noreferrer">Login</a>
            </nav>

            <div className="header-actions">
              <a className="btn btn-blue" href={site.phoneHref}>Call {site.phone}</a>
              <Link className="btn btn-gold" href="/request-a-quote">Request Quote</Link>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <section className="final-cta">
          <div className="wrap final-cta-inner">
            <div>
              <p className="kicker">Ready to start screening?</p>
              <h2>Talk with SaffHire about the right background check package for your business.</h2>
            </div>
            <div className="actions">
              <a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a>
              <Link className="btn btn-white" href="/request-a-quote">Request a Quote</Link>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="wrap footer-grid">
            <div className="footer-brand">
              <Image src="/saffhire-logo.png" alt="SaffHire Background Screening" width={220} height={57} />
              <p>
                SaffHire provides employer background screening services from Frisco, Texas to businesses across all 50 states.
              </p>
            </div>
            <div>
              <h3>Services</h3>
              <Link href="/services/criminal-background-checks">Criminal Background Checks</Link>
              <Link href="/services/employment-verification">Employment Verification</Link>
              <Link href="/services/drug-screening">Drug Screening</Link>
              <Link href="/services/motor-vehicle-records">Motor Vehicle Records</Link>
            </div>
            <div>
              <h3>Industries</h3>
              <Link href="/industries">Industries Served</Link>
              <Link href="/industries/staffing">Staffing Agencies</Link>
              <Link href="/industries/trucking">Transportation</Link>
              <Link href="/industries/churches">Churches & Nonprofits</Link>
            </div>
            <div>
              <h3>Contact</h3>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.emailHref}>{site.email}</a>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>
          <div className="footer-bottom">© {new Date().getFullYear()} SaffHire Background Screening. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
