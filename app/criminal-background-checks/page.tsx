import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';
import { serviceSchema } from '@/lib/structuredData';
import { ContentBody } from '@/components/ContentPage';
import { serviceUpgrades } from '@/data/checkPages';

const meta = getPageMetadata('/criminal-background-checks');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const schema = serviceSchema({ name: 'Criminal Background Checks', description: meta.description, path: '/criminal-background-checks' });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegacyClientPage page="criminal" path="/criminal-background-checks">
        <ContentBody sections={serviceUpgrades['/criminal-background-checks'].sections} faqs={serviceUpgrades['/criminal-background-checks'].faqs} faqTitle={serviceUpgrades['/criminal-background-checks'].faqTitle} />
      </LegacyClientPage>
    </>
  );
}
