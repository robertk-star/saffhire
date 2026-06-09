import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { serviceSchema } from '@/lib/schema';
import { industries, site } from '@/lib/site';

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() { return industries.map((industry) => ({ slug: industry.slug })); }
export async function generateMetadata({ params }: { params: PageParams }) { const { slug } = await params; const industry = industries.find((item) => item.slug === slug); return { title: industry?.title || 'Industry', description: industry?.description || '' }; }
export default async function IndustryPage({ params }: { params: PageParams }) { const { slug } = await params; const industry = industries.find((item) => item.slug === slug); if (!industry) notFound(); return <><JsonLd data={serviceSchema(industry.title, industry.description)} /><section className="page-hero"><p className="eyebrow">{industry.eyebrow}</p><h1>{industry.title}</h1><p>{industry.description}</p></section><section className="section"><div className="split"><div><h2>Screening support built around your workflow.</h2><p>{industry.body}</p><p>SaffHire keeps the process clear for your hiring team and simple for applicants.</p><div className="hero-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link></div></div><div className="card"><h3>Common needs</h3><ul className="check-list">{industry.bullets.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section></> }
