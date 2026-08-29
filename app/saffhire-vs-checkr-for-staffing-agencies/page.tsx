import type { Metadata } from 'next';
import SaffhireVsCheckrStaffingPage from '@/components/SaffhireVsCheckrStaffingPage';

export const metadata: Metadata = {
  title: 'SaffHire vs Checkr for Staffing Agencies',
  description:
    'Compare SaffHire and Checkr for staffing agencies. See differences in pricing model, minimums, county searches, support, and FCRA-compliant screening workflows.',
  alternates: {
    canonical: '/saffhire-vs-checkr-for-staffing-agencies',
  },
};

export default function Page() {
  return <SaffhireVsCheckrStaffingPage />;
}
