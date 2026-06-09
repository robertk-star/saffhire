import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/site';

export const metadata = { title: 'Request a Quote', description: 'Request a background screening quote from SaffHire.' };

export default function QuotePage() { return <><section className="page-hero"><p className="eyebrow">Request a Quote</p><h1>Get a background screening quote.</h1><p>Tell us a little about your company and screening needs. For faster help, call {site.phone}.</p></section><section className="section"><div className="split"><div><h2>Start with the right screening package.</h2><p>SaffHire does not show public pricing on this website because employer needs vary by industry, volume, and screening package.</p><p>Use this form to request a quote for trucking, churches, staffing agencies, or other employer screening needs.</p><div className="hero-actions"><a className="btn btn-primary" href={site.phoneHref}>Call {site.phone}</a></div></div><div className="card"><LeadForm type="quote" /></div></div></section></>; }
