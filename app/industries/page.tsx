import Link from 'next/link';
import { industries, site } from '@/lib/site';

export const metadata = {
  title: 'Industries Served',
  description: 'SaffHire provides background screening services for many types of employers, including transportation, healthcare, staffing, churches, nonprofits, manufacturing, hospitality, construction, professional services, retail, energy, education, and small businesses.',
};

export default function IndustriesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Industries Served</p>
          <h1>Background screening for many types of employers.</h1>
          <p>
            SaffHire helps companies, churches, nonprofits, staffing agencies, healthcare teams, transportation companies, manufacturers, service businesses, and small employers build a screening process that fits how they hire.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Not a one-industry provider</p>
            <h2>Every organization hires differently.</h2>
            <p>
              A trucking company, church, staffing firm, clinic, warehouse, restaurant, and professional office may all need background checks, but they do not all need the same package.
            </p>
            <p>
              SaffHire helps employers choose practical screening options based on the role, the workflow, and the applicant experience.
            </p>
            <div className="actions">
              <a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a>
              <Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link>
            </div>
          </div>
          <div className="card">
            <h3>Common questions we help answer</h3>
            <ul className="check-list">
              <li>Which checks should we run for this role?</li>
              <li>How do we keep applicants moving?</li>
              <li>What package makes sense for our industry?</li>
              <li>How do we support higher-volume hiring?</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap">
          <div className="section-title">
            <p className="kicker">Who SaffHire helps</p>
            <h2>Industry pages and common employer types.</h2>
          </div>
          <div className="grid-3">
            {industries.map((industry) => (
              <Link className="card card-link" key={industry.slug} href={`/industries/${industry.slug}`}>
                <p className="kicker">{industry.eyebrow}</p>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
                <strong>Learn more →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
