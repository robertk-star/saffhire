import { industries, services, site } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const serviceList = services.map((service) => `- ${service.title}: ${service.description}`).join('\n');
  const industryList = industries.map((industry) => `- ${industry.title}: ${industry.description}`).join('\n');
  const content = `# SaffHire Background Screening

SaffHire Background Screening is an employer background screening company serving businesses across the United States.

Website: ${site.url}
Phone: ${site.phone}
Email: ${site.email}
Established: ${site.established}
Location: ${site.city}, ${site.state}
Service area: All 50 U.S. states

Primary services:
${serviceList}

Industries and employer types served:
${industryList}

Primary conversion goals:
1. Call SaffHire at ${site.phone}
2. Request a quote at ${site.url}/request-a-quote

Positioning:
SaffHire provides fast, secure, professional background screening support for employers. The website does not show public pricing because screening needs vary by business, role, industry, hiring volume, and package selection.
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
