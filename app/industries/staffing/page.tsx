import type { Metadata } from 'next';
import LegacyClientPage from '@/components/next-bridge/LegacyClientPage';
import { ContentBody } from '@/components/ContentPage';
import { getPageMetadata } from '@/shared/seoMetadata';
import { breadcrumbSchema, serviceSchema } from '@/lib/structuredData';
import { staffingGuideFaqs, staffingGuideSections } from '@/data/staffingGuide';

const meta = getPageMetadata('/industries/staffing');
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  const schemas = [
    serviceSchema({ name: 'Background Screening for Staffing Agencies', description: meta.description, path: '/industries/staffing' }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
      { name: 'Staffing', path: '/industries/staffing' },
    ]),
  ];
  return (
    <LegacyClientPage page="staffing" path="/industries/staffing">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ContentBody sections={staffingGuideSections} faqs={staffingGuideFaqs} faqTitle="Staffing Agency Background Check FAQ" />
    </LegacyClientPage>
  );
}
