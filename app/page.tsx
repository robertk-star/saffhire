import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PeopleIllustration } from '@/components/PeopleIllustration';
import { organizationSchema } from '@/lib/schema';
import { industries, services, site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <section className="hero people-hero">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">Background screening since {site.established}</p>
            <h1>Background checks with people behind the process.</h1>
            <p className="hero-lead">SaffHire helps employers screen applicants without making hiring feel cold, confusing, or automated. Your team gets clear screening support, and applicants get a simple digital process.</p>
            <div className="hero-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-light" href="/request-a-quote">Request a Quote</Link></div>
            <div className="trust-row"><span>Real support when questions come up</span><span>Built for employers and applicants</span><span>Serving all 50 states</span></div>
          </div>
          <PeopleIllustration />
        </div>
      </section>

      <section className="people-strip">
        <div className="inner people-strip-grid">
          <div><strong>For employers</strong><span>Simple ordering and clear next steps.</span></div>
          <div><strong>For applicants</strong><span>A smoother process with less confusion.</span></div>
          <div><strong>For hiring teams</strong><span>Screening help from real people.</span></div>
        </div>
      </section>

      <section className="section story-section">
        <div className="story-grid">
          <div>
            <p className="eyebrow">The SaffHire difference</p>
            <h2>Hiring is about people. Screening should support that.</h2>
            <p className="intro">A background check is not just a report. It affects an applicant, a hiring manager, a business owner, a church volunteer coordinator, or a staffing recruiter trying to move quickly.</p>
            <p>SaffHire keeps the process practical: collect the right information, order the right checks, and help your team understand what comes next.</p>
          </div>
          <div className="human-card-stack">
            <div className="human-card"><span className="mini-avatar">HR</span><div><strong>Hiring manager</strong><p>Needs clear status and fewer delays.</p></div></div>
            <div className="human-card"><span className="mini-avatar gold">A</span><div><strong>Applicant</strong><p>Needs simple steps and clear instructions.</p></div></div>
            <div className="human-card"><span className="mini-avatar">SH</span><div><strong>SaffHire support</strong><p>Helps when the process needs a real person.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section services-soft">
        <p className="eyebrow">Core services</p>
        <h2>Screening services built around real hiring workflows.</h2>
        <p className="intro">Choose screening options based on the role, the industry, and how your team hires.</p>
        <div className="cards softer-cards">{services.map((service)=><Link className="card card-link" key={service.slug} href={`/services/${service.slug}`}><h3>{service.title}</h3><p>{service.description}</p><strong>Learn more →</strong></Link>)}</div>
      </section>

      <section className="section-alt industry-people-section"><div className="inner"><div className="split"><div><p className="eyebrow">Who we help most</p><h2>Focused support for teams that screen people every day.</h2><p className="intro">Trucking companies, churches, nonprofits, and staffing agencies all need screening, but they do not all need the same process.</p><ul className="check-list"><li>Trucking teams screening drivers and safety-sensitive roles.</li><li>Churches and nonprofits screening staff and volunteers.</li><li>Staffing agencies managing repeatable, high-volume hiring.</li></ul></div><div className="warm-panel"><h3>Talk through your hiring process first.</h3><p>Instead of forcing every employer into the same package, SaffHire helps you think through what checks make sense for your organization.</p><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a></div></div></div></section>

      <section className="section">
        <p className="eyebrow">Top industries</p>
        <h2>Screening pages for the teams we serve most.</h2>
        <div className="cards industry-cards">{industries.map((industry)=><Link className="card card-link" key={industry.slug} href={`/industries/${industry.slug}`}><p className="eyebrow">{industry.eyebrow}</p><h3>{industry.title}</h3><p>{industry.description}</p><strong>View industry page →</strong></Link>)}</div>
      </section>
    </>
  );
}
