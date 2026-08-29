import { openKnowledgePages } from '@/data/openKnowledgePages';
import { SITE_URL } from '@/lib/siteUrl';

export const dynamic = 'force-static';

export function GET() {
  const payload = {
    okf_version: '1.0',
    site: {
      name: 'SaffHire Background Screening',
      short_name: 'SaffHire',
      url: SITE_URL,
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
      url: `${SITE_URL}/open-knowledge/${page.slug}`,
      markdown: page.markdown,
    })),
    discovery: {
      hub: `${SITE_URL}/open-knowledge`,
      markdown: `${SITE_URL}/open-knowledge.md`,
      company_information: `${SITE_URL}/company-information`,
      llms_txt: `${SITE_URL}/llms.txt`,
      well_known_llms: `${SITE_URL}/.well-known/llms.txt`,
      sitemap: `${SITE_URL}/sitemap.xml`,
    },
  };

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'index, follow, all',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
