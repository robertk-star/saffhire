import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/background-screening-plano-tx');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  return <LegacyClientPage page="plano" path="/background-screening-plano-tx" />;
}
