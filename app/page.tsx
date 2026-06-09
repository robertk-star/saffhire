import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema } from '@/lib/schema';
import { industries, services, site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <section className="hero"><div className="hero-inner"><div><p className="eyebrow">Background screening since {site.established}</p><h1>Fast, secure background screening with real human support.</h1><p className="hero-lead">SaffHire helps employers screen applicants with simple ordering, applicant-friendly workflows, and practical screening options across all 50 states.</p><div className="hero-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-light" href="/request-a-quote">Request a Quote</Link></div><div className="trust-row"><span>No setup fee focus</span><span>No subscription pressure</span><span>Serving all 50 states</span></div></div><div className="hero-panel"><h2>Built for hiring teams that need answers.</h2><p>Simple background screening support for employers, applicants, and high-volume hiring teams.</p><ul className="quick-list"><li>Criminal background checks</li><li>Employment verification</li><li>Drug screening options</li><li>Trucking, churches, and staffing focus</li></ul></div></div></section>
      <section className="section"><p className="eyebrow">Core services</p><h2>Background screening services for employers.</h2><p className="intro">Choose screening options based on your role, hiring volume, industry, and workflow needs.</p><div className="cards">{services.map((service)=><Link className="card card-link" key={service.slug} href={`/services/${service.slug}`}><h3>{service.title}</h3><p>{service.description}</p><strong>Learn more →</strong></Link>)}</div></section>
      <section className="section-alt"><div className="inner"><div className="split"><div><p className="eyebrow">Why SaffHire</p><h2>A cleaner process for employers and applicants.</h2><p className="intro">Background screening should be easy to order, easy to understand, and supported by real people when questions come up.</p><ul className="check-list"><li>Employer-focused screening packages.</li><li>Applicant-friendly digital process.</li><li>Support for common hiring workflows.</li><li>Responsive help when your team needs it.</li></ul></div><div className="highlight-box"><h3>Call first for the fastest help.</h3><p>If you need a screening package for trucking, churches, staffing, or general hiring, call SaffHire and talk through the best next step.</p><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a></div></div></div></section>
      <section className="section"><p className="eyebrow">Top industries</p><h2>Focused screening pages for your strongest hiring needs.</h2><div className="cards">{industries.map((industry)=><Link className="card card-link" key={industry.slug} href={`/industries/${industry.slug}`}><p className="eyebrow">{industry.eyebrow}</p><h3>{industry.title}</h3><p>{industry.description}</p><strong>View industry page →</strong></Link>)}</div></section>
    </>
  );
}
