import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';
import TrackingScripts from '@/components/TrackingScripts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com'),
  title: {
    default: 'SaffHire Background Pre-Employment Screening',
    template: '%s | SaffHire',
  },
  description: 'Fast, secure, and FCRA-compliant background screening services for businesses. Criminal checks, employment verification, drug screening, and MVR checks.',
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <TrackingScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
