import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/site';

export const metadata = { title: 'Request a Quote', description: 'Request a background screening quote from SaffHire.' };

export default function QuotePage() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="kicker">Request a Quote</p><h1>Get a background screening quote.</h1><p>Tell us a little about your company and screening needs. For faster help, call {site.phone}.</p></div></section>
      <section className="section"><div className="wrap split"><div><p className="kicker">Start here</p><h2>Build the right screening package for your business.</h2><p>SaffHire does not show public pricing on this website because employer needs vary by industry, role, volume, and screening package.</p><p>Use this form to request a quote, or call us directly if you want to talk through your options.</p><div className="actions"><a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a></div></div><div className="card"><LeadForm type="quote" /></div></div></section>
    </>
  );
}
