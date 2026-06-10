import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';
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
  return (
    <html lang="en">
      <body>
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
