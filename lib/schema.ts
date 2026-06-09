import { site, faqs } from './site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    foundingDate: site.established,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: 'TX', addressCountry: 'US' },
    areaServed: 'United States',
  };
}

export function faqSchema(items = faqs) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
}

export function serviceSchema(name: string, description: string) {
  return { '@context': 'https://schema.org', '@type': 'Service', name, description, provider: { '@type': 'Organization', name: site.name, url: site.url }, areaServed: 'United States' };
}
