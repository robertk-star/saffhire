import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema } from '@/lib/schema';
import { industries, services, site } from '@/lib/site';

const featuredIndustries = industries.slice(0, 12);
const featuredServices = services.slice(0, 8);

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      <section className="hero">
        <div className="hero-inner">
          <div>
            <p className="kicker">FCRA-focused employer background screening</p>
            <h1>Fast, secure background checks for today’s hiring teams.</h1>
            <p className="hero-lead">
              SaffHire helps employers, staffing firms, churches, nonprofits, transportation companies, healthcare teams, and growing businesses screen applicants with a professional process and real human support.
            </p>
            <div className="actions">
              <a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a>
              <Link className="btn btn-white" href="/request-a-quote">Request a Quote</Link>
            </div>
            <p className="hero-note">No public pricing pressure. No one-size-fits-all package. Talk with us about what your business actually needs.</p>
          </div>

          <aside className="hero-card">
            <div className="hero-card-head">
              <h2>Professional screening support without unnecessary complexity.</h2>
            </div>
            <div className="hero-card-body">
              <ul className="check-list">
                <li>Criminal background check packages</li>
                <li>Employment and education verification options</li>
                <li>Drug screening and MVR options</li>
                <li>Applicant-friendly digital workflows</li>
                <li>Support for employers across all 50 states</li>
              </ul>
              <div className="hero-stats">
                <div className="hero-stat"><strong>50</strong><span>States served</span></div>
                <div className="hero-stat"><strong>2020</strong><span>Serving employers since</span></div>
                <div className="hero-stat"><strong>0</strong><span>Public setup-fee pressure</span></div>
                <div className="hero-stat"><strong>1</strong><span>Real support team</span></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap">
          <div className="section-title center">
            <p className="kicker">What SaffHire does</p>
            <h2>Full-service background screening for employers.</h2>
            <p>
              Bring your hiring needs, applicant volume, industry concerns, and compliance questions. SaffHire helps you build a screening process that fits your organization.
            </p>
          </div>
          <div className="grid-3">
            <div className="card icon-box">
              <span className="icon">1</span>
              <div><h3>Choose the right checks</h3><p>Start with the role and business need instead of forcing every applicant into the same package.</p></div>
            </div>
            <div className="card icon-box">
              <span className="icon gold">2</span>
              <div><h3>Keep applicants moving</h3><p>Use a digital process that helps reduce confusion and keeps your hiring workflow organized.</p></div>
            </div>
            <div className="card icon-box">
              <span className="icon">3</span>
              <div><h3>Get real support</h3><p>When questions come up, SaffHire is built around practical help, not a cold self-service-only experience.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Services</p>
            <h2>Screening options that support better hiring decisions.</h2>
            <p className="section-title-text">
              SaffHire provides the background screening services employers commonly need when hiring employees, contractors, volunteers, drivers, field workers, office staff, and customer-facing team members.
            </p>
            <div className="actions">
              <Link className="btn btn-blue" href="/services">View Services</Link>
              <Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link>
            </div>
          </div>
          <div className="service-list">
            {featuredServices.map((service) => (
              <Link className="service-row" key={service.slug} href={`/services/${service.slug}`}>
                <strong>{service.shortTitle}</strong>
                <span>{service.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blue">
        <div className="wrap split">
          <div>
            <p className="kicker">Professional, credible, practical</p>
            <h2>A more established screening experience for your business.</h2>
            <p>
              Background screening is a trust service. Your website, hiring workflow, and applicant process should feel serious, safe, and professional. SaffHire gives employers a screening partner that understands that.
            </p>
          </div>
          <div>
            <ul className="check-list">
              <li>Designed for businesses that want responsive support.</li>
              <li>Useful for single-location employers and high-volume hiring teams.</li>
              <li>Built for applicants, employees, contractors, volunteers, and drivers.</li>
              <li>Helpful for companies that want background checks without a complicated sales process.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap">
          <div className="section-title">
            <p className="kicker">Industries served</p>
            <h2>Background screening for many types of employers.</h2>
            <p>
              SaffHire is not limited to one industry. We help businesses and organizations that need a professional way to screen applicants before hiring, onboarding, or approving volunteer roles.
            </p>
          </div>
          <div className="industry-list">
            {featuredIndustries.map((industry) => (
              <Link className="industry-pill" key={industry.slug} href={`/industries/${industry.slug}`}>{industry.title}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-title center">
            <p className="kicker">How it works</p>
            <h2>A simple process for employers and applicants.</h2>
          </div>
          <div className="grid-3 process">
            <div className="card"><h3>Tell us what you need</h3><p>Call SaffHire or request a quote with your industry, hiring volume, and screening goals.</p></div>
            <div className="card"><h3>Build your package</h3><p>Choose screening options based on the roles you hire for and how your team works.</p></div>
            <div className="card"><h3>Screen with support</h3><p>Use a process that keeps your team informed and gives applicants clear steps.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
