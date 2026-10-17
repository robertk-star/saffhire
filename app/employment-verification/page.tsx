import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';
import { serviceSchema } from '@/lib/structuredData';
import { ContentBody } from '@/components/ContentPage';
import { serviceUpgrades } from '@/data/checkPages';

const meta = getPageMetadata('/employment-verification');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const schema = serviceSchema({ name: 'Employment Verification', description: meta.description, path: '/employment-verification' });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegacyClientPage page="employment" path="/employment-verification">
        <ContentBody sections={serviceUpgrades['/employment-verification'].sections} faqs={serviceUpgrades['/employment-verification'].faqs} faqTitle={serviceUpgrades['/employment-verification'].faqTitle} />
      </LegacyClientPage>
    </>
  );
}
