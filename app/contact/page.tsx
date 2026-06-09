import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/site';

export const metadata = { title: 'Contact SaffHire', description: 'Contact SaffHire Background Screening by phone, email, or online form.' };

export default function ContactPage() { return <><section className="page-hero"><p className="eyebrow">Contact</p><h1>Contact SaffHire today.</h1><p>Call first for the fastest help, or send a message online.</p></section><section className="section"><div className="split"><div><h2>Talk with SaffHire</h2><p><strong>Phone:</strong> <a href={site.phoneHref}>{site.phone}</a></p><p><strong>Email:</strong> <a href={site.emailHref}>{site.email}</a></p><p>Use the form to ask a question or request more information about background screening services.</p></div><div className="card"><LeadForm type="contact" /></div></div></section></>; }
