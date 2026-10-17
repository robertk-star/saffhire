import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import PageFAQ from '@/components/PageFAQ';
import { industryFaqs } from '@/data/industryFaqs';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/industries/manufacturing');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const faq = industryFaqs['/industries/manufacturing'];
  return (
    <LegacyClientPage page="manufacturing" path="/industries/manufacturing">
      <PageFAQ title={faq.title} items={faq.items} />
    </LegacyClientPage>
  );
}
