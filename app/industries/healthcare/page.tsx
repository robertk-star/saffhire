import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import PageFAQ from '@/components/PageFAQ';
import { industryFaqs } from '@/data/industryFaqs';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/industries/healthcare');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const faq = industryFaqs['/industries/healthcare'];
  return (
    <LegacyClientPage page="healthcare" path="/industries/healthcare">
      <PageFAQ title={faq.title} items={faq.items} />
    </LegacyClientPage>
  );
}
