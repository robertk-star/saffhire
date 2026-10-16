import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';
import { serviceSchema } from '@/lib/structuredData';

const meta = getPageMetadata('/drug-screening');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const schema = serviceSchema({ name: 'Drug Screening', description: meta.description, path: '/drug-screening' });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegacyClientPage page="drug" path="/drug-screening" />
    </>
  );
}
