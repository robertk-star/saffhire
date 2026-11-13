import type { Metadata } from 'next';
import PackagesClient from '@/components/PackagesClient';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Standard Background Check Packages & Turnaround',
  description:
    'Standard packages take 1 to 3 days on average, or 1 to 5 days with drug screening. Each includes SSN Trace, National Criminal Database and Federal Search.',
};

export default function Page() {
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Standard Packages & Turnaround', path: '/packages' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <PackagesClient />
    </>
  );
}
