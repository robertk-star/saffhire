import { site } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const content = `# SaffHire Background Screening\n\nSaffHire Background Screening is an employer background screening company serving businesses across the United States.\n\nWebsite: ${site.url}\nPhone: ${site.phone}\nEmail: ${site.email}\nEstablished: ${site.established}\nLocation: ${site.city}, ${site.state}\nService area: All 50 U.S. states\n\nPrimary services:\n- Criminal background checks\n- Employment verification\n- Drug screening\n- Motor vehicle report options\n- Employer background screening packages\n\nPrimary industries:\n- Trucking and transportation companies\n- Churches and nonprofits\n- Staffing agencies\n\nPrimary conversion goals:\n1. Call SaffHire at ${site.phone}\n2. Request a quote at ${site.url}/request-a-quote\n\nImportant positioning:\nSaffHire focuses on fast, secure, employer-friendly background screening with real human support. Public pricing is not shown on the website. Employers should request a quote based on industry, volume, and screening needs.\n`;
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
