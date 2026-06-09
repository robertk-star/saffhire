import { site } from '@/lib/site';

export const metadata = { title: 'Terms of Use', description: 'SaffHire website terms of use.' };

export default function TermsPage() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="kicker">Terms</p><h1>Terms of Use</h1><p>These terms apply to use of the SaffHire marketing website.</p></div></section>
      <article className="content"><p>The information on this website is provided for general business information about SaffHire background screening services.</p><p>Submitting a form does not create a client relationship, guarantee service availability, or guarantee any screening result.</p><p>Background screening services may depend on package selection, applicant information, vendor availability, court access, verification sources, and applicable law.</p><p>Employers are responsible for using screening information in a lawful and appropriate manner.</p><p>For questions, contact SaffHire at <a href={site.phoneHref}>{site.phone}</a> or <a href={site.emailHref}>{site.email}</a>.</p></article>
    </>
  );
}
