import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import { navItems, site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'SaffHire Background Screening', template: '%s | SaffHire' },
  description: 'SaffHire provides employer background screening services for staffing agencies, trucking companies, churches, nonprofits, and businesses across the United States.',
  alternates: { canonical: '/' },
  openGraph: { title: 'SaffHire Background Screening', description: 'Fast, secure background screening support for employers.', url: site.url, siteName: site.name, type: 'website' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="top-strip"><div className="top-inner"><span>FCRA-focused background screening support for employers</span><span><a href={site.phoneHref}>{site.phone}</a> · <a href={site.emailHref}>{site.email}</a></span></div></div>
        <header className="site-header"><div className="header-inner"><Link className="brand" href="/"><Image src="/saffhire-logo.png" alt="SaffHire Background Screening" width={220} height={57} priority /></Link><nav className="site-nav">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<a href={site.loginUrl} target="_blank" rel="noreferrer">Login</a></nav><div className="header-actions"><a className="btn btn-secondary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-primary" href="/request-a-quote">Request Quote</Link></div></div></header>
        <main>{children}</main>
        <section className="cta-band"><div className="inner"><div><p className="eyebrow">Ready to get started?</p><h2>Talk with SaffHire about your screening needs.</h2></div><div className="hero-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-light" href="/request-a-quote">Request a Quote</Link></div></div></section>
        <footer className="footer"><div className="footer-inner"><div><Image src="/saffhire-logo.png" alt="SaffHire Background Screening" width={220} height={57} /><p>Employer background screening services since {site.established}. Based in {site.city}, {site.state}. Serving all 50 states.</p></div><div><h3>Services</h3><Link href="/services/criminal-background-checks">Criminal Checks</Link><Link href="/services/employment-verification">Employment Verification</Link><Link href="/services/drug-screening">Drug Screening</Link></div><div><h3>Contact</h3><a href={site.phoneHref}>{site.phone}</a><a href={site.emailHref}>{site.email}</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div><div className="footer-bottom">© {new Date().getFullYear()} SaffHire Background Screening. All rights reserved.</div></footer>
      </body>
    </html>
  );
}
