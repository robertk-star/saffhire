import Link from 'next/link';
import { services, site } from '@/lib/site';

export const metadata = { title: 'Background Screening Services', description: 'Employer background screening services from SaffHire.' };

export default function ServicesPage(){return <><section className="page-hero"><p className="eyebrow">Services</p><h1>Background screening services for employers.</h1><p>Choose screening options based on your hiring needs, industry, and workflow.</p></section><section className="section"><div className="cards">{services.map(service=><Link className="card card-link" key={service.slug} href={`/services/${service.slug}`}><h2>{service.title}</h2><p>{service.description}</p><strong>Learn more →</strong></Link>)}</div><div className="hero-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link></div></section></>}
