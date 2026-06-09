import { site } from '@/lib/site';

export const metadata = { title: 'Privacy Policy', description: 'SaffHire website privacy policy.' };

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><p className="kicker">Privacy</p><h1>Privacy Policy</h1><p>This page explains how SaffHire handles information submitted through this website.</p></div></section>
      <article className="content"><p>SaffHire uses website forms to collect information submitted by employers and organizations that request background screening information or quotes.</p><p>Information submitted through this website may include name, company, email, phone number, industry, screening volume, and message details.</p><p>SaffHire uses this information to respond to inquiries, provide quote information, and communicate about background screening services.</p><p>This website is not intended for applicants to submit screening details. Applicant information should be submitted through the proper screening portal or process.</p><p>To contact SaffHire about privacy questions, email <a href={site.emailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p></article>
    </>
  );
}
