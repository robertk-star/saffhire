import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = { title: 'Why SaffHire', description: 'Learn why employers choose SaffHire for professional background screening support.' };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="kicker">Why SaffHire</p><h1>Background screening should feel professional, clear, and supported.</h1><p>SaffHire helps employers gather applicant information, order screening services, and keep the process organized.</p></div></section>
      <section className="section"><div className="wrap split"><div><p className="kicker">Since {site.established}</p><h2>Serving employers with practical screening support.</h2><p>SaffHire was created to help businesses make more informed hiring decisions through a screening process that is easier for both employers and applicants.</p><p>Our focus is simple: responsive service, practical screening options, and a digital process that helps reduce friction for hiring teams.</p><div className="actions"><a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a><Link className="btn btn-outline" href="/request-a-quote">Request a Quote</Link></div></div><div className="card"><h3>What makes SaffHire different</h3><ul className="check-list"><li>Professional process for clients and applicants.</li><li>Custom package options based on employer needs.</li><li>No public pricing pressure or one-size-fits-all package push.</li><li>Direct support when your team has questions.</li></ul></div></div></section>
    </>
  );
}
