import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import PageFAQ from '@/components/PageFAQ';
import { industryFaqs } from '@/data/industryFaqs';
import { getPageMetadata } from '@/shared/seoMetadata';

const meta = getPageMetadata('/industries/church-nonprofit');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const faq = industryFaqs['/industries/church-nonprofit'];
  return (
    <LegacyClientPage page="churchNonprofit" path="/industries/church-nonprofit">
      <PageFAQ title={faq.title} items={faq.items} />
    </LegacyClientPage>
  );
}
