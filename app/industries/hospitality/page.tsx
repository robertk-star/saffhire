import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import PageFAQ from '@/components/PageFAQ';
import { industryFaqs } from '@/data/industryFaqs';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/industries/hospitality');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const faq = industryFaqs['/industries/hospitality'];
  return (
    <LegacyClientPage page="hospitality" path="/industries/hospitality">
      <PageFAQ title={faq.title} items={faq.items} />
    </LegacyClientPage>
  );
}
