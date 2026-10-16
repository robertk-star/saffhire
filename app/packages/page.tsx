import type { Metadata } from 'next';
import PackagesClient from '@/components/PackagesClient';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Standard Background Check Packages & Turnaround',
  description:
    'SaffHire standard background screening packages and average turnaround, from 1 day to 2-5 days. Every package includes SSN Trace, Address History, National Criminal Database, Global Security Watch List and Federal Search.',
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
