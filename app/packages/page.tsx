import type { Metadata } from 'next';
import PackagesClient from '@/components/PackagesClient';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Standard Background Check Packages & Turnaround',
  description:
    'SaffHire standard packages take 1 to 3 days on average. They include SSN Trace, Address History, National Criminal Database, and Federal Search.',
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
