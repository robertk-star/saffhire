import { JsonLd } from '@/components/JsonLd';
import { faqSchema } from '@/lib/schema';
import { faqs, site } from '@/lib/site';

export const metadata = { title: 'Frequently Asked Questions', description: 'Answers to common questions about SaffHire background screening services.' };

export default function FaqPage() {
  return <><JsonLd data={faqSchema()} /><section className="page-hero"><p className="eyebrow">FAQ</p><h1>Background screening questions, answered.</h1><p>Here are common questions employers ask before starting with SaffHire.</p></section><section className="section"><div className="blog-list">{faqs.map((item)=><div className="card" key={item.question}><h2>{item.question}</h2><p>{item.answer}</p></div>)}</div><div className="hero-actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a></div></section></>;
}
