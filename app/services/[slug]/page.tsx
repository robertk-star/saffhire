import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { serviceSchema } from '@/lib/schema';
import { services, site } from '@/lib/site';

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: service?.title || 'Service', description: service?.description || '' };
}

export default async function ServicePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd data={serviceSchema(service.title, service.description)} />
      <section className="page-hero"><p className="eyebrow">SaffHire Services</p><h1>{service.title}</h1><p>{service.description}</p></section>
      <section className="section"><div className="grid"><div><h2>{service.intro}</h2><p>SaffHire helps employers build practical screening workflows that support hiring decisions without making the process harder for applicants.</p><div className="hero-actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn ghost" href="/request-a-quote">Request a Quote</Link></div></div><div className="card"><h3>Common options</h3><ul className="check-list">{service.bullets.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    </>
  );
}
