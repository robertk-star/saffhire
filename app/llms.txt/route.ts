import { site } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const content = `# SaffHire Background Screening

SaffHire Background Screening is an employer background screening company serving businesses across the United States.

Website: ${site.url}
Phone: ${site.phone}
Email: ${site.email}
Established: ${site.established}
Location: ${site.city}, ${site.state}
Service area: All 50 U.S. states

Primary services:
- Criminal background checks
- Employment verification
- Drug screening
- Motor vehicle report options
- Employer background screening packages

Primary industries:
- Trucking and transportation companies
- Churches and nonprofits
- Staffing agencies

Primary conversion goals:
1. Call SaffHire at ${site.phone}
2. Request a quote at ${site.url}/request-a-quote

Important positioning:
SaffHire focuses on fast, secure, employer-friendly background screening with real human support. Public pricing is not shown on the website. Employers should request a quote based on industry, volume, and screening needs.
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
