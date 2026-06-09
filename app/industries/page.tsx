import Link from 'next/link';
import { industries, site } from '@/lib/site';

export const metadata = {
  title: 'Industries Served',
  description: 'SaffHire provides background screening services for many types of employers, including transportation, healthcare, staffing, churches, nonprofits, manufacturing, hospitality, construction, professional services, and small businesses.',
};

export default function IndustriesPage() {
  return (
    <>
      <section className="page-hero page-hero-centered">
        <p className="eyebrow">Industries Served</p>
        <h1>Background screening for many types of employers.</h1>
        <p>SaffHire helps companies, churches, nonprofits, staffing agencies, healthcare teams, transportation companies, manufacturers, service businesses, and small employers build a screening process that fits how they hire.</p>
      </section>

      <section className="section section-narrow intro-center">
        <p className="eyebrow">Not a one-industry provider</p>
        <h2>Every organization hires differently.</h2>
        <p className="intro">A trucking company, church, staffing firm, clinic, warehouse, restaurant, and professional office may all need background checks, but they do not all need the same package. SaffHire helps employers choose practical screening options based on the role, the workflow, and the applicant experience.</p>
        <div className="hero-actions centered-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link></div>
      </section>

      <section className="section industries-directory">
        <p className="eyebrow">Common employer types</p>
        <h2>Who SaffHire helps</h2>
        <div className="industry-directory-grid">
          {industries.map((industry) => (
            <Link className="industry-tile" key={industry.slug} href={`/industries/${industry.slug}`}>
              <span>{industry.eyebrow}</span>
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
              <strong>Learn more →</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
