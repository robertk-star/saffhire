import { JsonLd } from '@/components/JsonLd';
import { faqSchema } from '@/lib/schema';
import { faqs, site } from '@/lib/site';

export const metadata = { title: 'Frequently Asked Questions', description: 'Answers to common questions about SaffHire background screening services.' };

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <section className="page-hero"><div className="wrap"><p className="kicker">FAQ</p><h1>Background screening questions, answered.</h1><p>Here are common questions employers ask before starting with SaffHire.</p></div></section>
      <section className="section"><div className="wrap"><div className="grid-3">{faqs.map((item) => <div className="card" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</div><div className="actions" style={{ marginTop: '28px' }}><a className="btn btn-gold" href={site.phoneHref}>Call {site.phone}</a></div></div></section>
    </>
  );
}
