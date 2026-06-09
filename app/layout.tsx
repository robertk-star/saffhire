import type { Metadata } from 'next';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/"><span className="brand-mark">S</span><span>SaffHire</span></Link>
          <nav>
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <a href={site.loginUrl} target="_blank" rel="noreferrer">Login</a>
          </nav>
          <a className="header-phone" href={site.phoneHref}>{site.phone}</a>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div><strong>{site.name}</strong><p>Employer background screening services since {site.established}. Based in {site.city}, {site.state}. Serving all 50 states.</p></div>
          <div><a href={site.phoneHref}>{site.phone}</a><a href={site.emailHref}>{site.email}</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </footer>
      </body>
    </html>
  );
}
