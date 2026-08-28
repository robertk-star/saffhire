import { openKnowledgePages } from '@/data/openKnowledgePages';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';

  const payload = {
    okf_version: '1.0',
    site: {
      name: 'SaffHire Background Screening',
      short_name: 'SaffHire',
      url: siteUrl,
      location: 'Frisco, Texas',
      coverage: 'United States, all 50 states',
      phone: '(888) 588-1733',
      email: 'info@saffhire.com',
      login_url: 'https://saffhire.instascreen.net/sso/login.taz',
      account_setup_url: 'https://intake.saffhire.com/',
    },
    positioning: 'Fast, secure, reliable background screening services for employers across all industries.',
    pages: openKnowledgePages.map((page) => ({
      title: page.title,
      description: page.description,
      url: `${siteUrl}/open-knowledge/${page.slug}`,
    })),
    discovery: {
      hub: `${siteUrl}/open-knowledge`,
      company_information: `${siteUrl}/company-information`,
      llms_txt: `${siteUrl}/llms.txt`,
      sitemap: `${siteUrl}/sitemap.xml`,
    },
  };

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
