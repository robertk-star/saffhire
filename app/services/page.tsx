import Link from 'next/link';
import { services, site } from '@/lib/site';

export const metadata = {
  title: 'Background Screening Services',
  description: 'Employer background screening services from SaffHire, including criminal background checks, employment verification, education verification, drug screening, motor vehicle records, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Services</p>
          <h1>Background screening services for employers.</h1>
          <p>
            SaffHire helps employers choose screening options based on the role, industry, applicant volume, and business need.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-title">
            <p className="kicker">Screening options</p>
            <h2>Build a screening package that fits how you hire.</h2>
            <p>
              Every business is different. SaffHire supports employers with practical background screening options and a process that is easier for applicants to complete.
            </p>
          </div>
          <div className="grid-3">
            {services.map((service) => (
              <Link className="card card-link" key={service.slug} href={`/services/${service.slug}`}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <strong>Learn more →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap split">
          <div>
            <p className="kicker">Need help choosing?</p>
            <h2>Call SaffHire before you guess at a package.</h2>
            <p>
              The best package depends on who you hire, what they do, whether they drive, whether they work with vulnerable people, and how much volume you expect.
            </p>
          </div>
          <div className="card">
            <h3>Start with a quick conversation.</h3>
            <p>Tell us about your business and we will help you think through the right screening approach.</p>
            <div className="actions">
              <a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a>
              <Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
