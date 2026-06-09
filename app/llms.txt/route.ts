import { seoMetadata } from '@/shared/seoMetadata';

export const dynamic = 'force-static';

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';
  const pages = Object.entries(seoMetadata)
    .map(([path, meta]) => `- ${siteUrl}${path}: ${meta.title} — ${meta.description}`)
    .join('\n');
  const content = `# SaffHire Background Screening\n\nSaffHire Background Screening provides employer background screening services for businesses across the United States. Services include criminal background checks, employment verification, education verification, drug screening, MVR checks, and industry-specific screening support.\n\nPhone: 888-588-1733\nEmail: info@saffhire.com\nLocation: Frisco, Texas\nService area: United States\n\n## Important pages\n${pages}\n`;
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
