import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema } from '@/lib/schema';
import { industries, services, site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Background screening since {site.established}</p>
            <h1>Fast, secure background screening with real human support.</h1>
            <p>SaffHire helps employers screen applicants with simple ordering, applicant-friendly workflows, and practical screening options for businesses across all 50 states.</p>
            <div className="hero-actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn secondary" href="/request-a-quote">Request a Quote</Link></div>
          </div>
          <div className="hero-card">
            <h2>Built for hiring teams that need answers.</h2>
            <ul className="check-list">
              <li>No public pricing pressure.</li>
              <li>Custom screening packages.</li>
              <li>Support for trucking, churches, staffing, and more.</li>
              <li>Employer-focused background screening process.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">Core services</p><h2>Background screening services for employers.</h2>
        <div className="cards">{services.map((service)=><Link className="card" key={service.slug} href={`/services/${service.slug}`}><h3>{service.title}</h3><p>{service.description}</p></Link>)}</div>
      </section>
      <section className="section alt"><div className="inner"><p className="eyebrow">Top industries</p><h2>Focused pages for your strongest hiring needs.</h2><div className="cards">{industries.map((industry)=><Link className="card" key={industry.slug} href={`/industries/${industry.slug}`}><h3>{industry.title}</h3><p>{industry.description}</p></Link>)}</div></div></section>
      <section className="section"><div className="grid"><div><p className="eyebrow">Why SaffHire</p><h2>A cleaner process for employers and applicants.</h2><p>Background screening should be easy to order, easy to understand, and supported by real people when questions come up.</p></div><div className="card"><h3>Ready to talk?</h3><p>Call SaffHire first, or request a quote online.</p><div className="hero-actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn ghost" href="/request-a-quote">Request a Quote</Link></div></div></div></section>
    </>
  );
}
