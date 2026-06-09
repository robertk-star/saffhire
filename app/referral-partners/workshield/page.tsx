import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/referral-partners/workshield');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  return <LegacyClientPage page="workShield" path="/referral-partners/workshield" />;
}
