import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { getPageMetadata } from '@/shared/seoMetadata';
import { serviceSchema } from '@/lib/structuredData';
import { ContentBody } from '@/components/ContentPage';
import { serviceUpgrades } from '@/data/checkPages';

const meta = getPageMetadata('/education-verification');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const schema = serviceSchema({ name: 'Education Verification', description: meta.description, path: '/education-verification' });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegacyClientPage page="educationVerification" path="/education-verification">
        <ContentBody sections={serviceUpgrades['/education-verification'].sections} faqs={serviceUpgrades['/education-verification'].faqs} faqTitle={serviceUpgrades['/education-verification'].faqTitle} />
      </LegacyClientPage>
    </>
  );
}
