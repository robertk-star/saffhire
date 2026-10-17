import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';
import { serviceSchema } from '@/lib/structuredData';
import { ContentBody } from '@/components/ContentPage';
import { serviceUpgrades } from '@/data/checkPages';

const meta = getPageMetadata('/mvr-checks');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const schema = serviceSchema({ name: 'Motor Vehicle Record (MVR) Checks', description: meta.description, path: '/mvr-checks' });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegacyClientPage page="mvr" path="/mvr-checks">
        <ContentBody sections={serviceUpgrades['/mvr-checks'].sections} faqs={serviceUpgrades['/mvr-checks'].faqs} faqTitle={serviceUpgrades['/mvr-checks'].faqTitle} />
      </LegacyClientPage>
    </>
  );
}
