import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = { title: 'Why SaffHire', description: 'Learn why employers choose SaffHire for simple, secure background screening support.' };

export default function AboutPage() {
  return <><section className="page-hero"><p className="eyebrow">Why SaffHire</p><h1>Background screening should not be complicated.</h1><p>SaffHire helps employers gather applicant information, order background screening services, and keep the process organized.</p></section><section className="section"><div className="grid"><div><h2>Serving employers since {site.established}.</h2><p>SaffHire was created to help businesses make more informed hiring decisions through a screening process that is easier for both employers and applicants.</p><p>Our focus is simple: responsive service, practical screening options, and a digital process that helps reduce friction for hiring teams.</p></div><div className="card"><h3>What makes SaffHire different</h3><ul className="check-list"><li>User-friendly process for clients and applicants.</li><li>Custom package options based on employer needs.</li><li>No public pricing pressure or one-size-fits-all package push.</li><li>Direct support when your team has questions.</li></ul></div></div><div className="hero-actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><Link className="btn ghost" href="/request-a-quote">Request a Quote</Link></div></section></>;
}
