import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/terms-of-service');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  return <LegacyClientPage page="terms" path="/terms-of-service" />;
}
