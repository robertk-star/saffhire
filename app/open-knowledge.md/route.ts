import { openKnowledgePages } from '@/data/openKnowledgePages';
import { SITE_URL } from '@/lib/siteUrl';

export const dynamic = 'force-static';

export function GET() {
  const body = [
    '# SaffHire Open Knowledge Format',
    '',
    `Source: ${SITE_URL}/open-knowledge`,
    `JSON: ${SITE_URL}/open-knowledge/okf.json`,
    `LLMs: ${SITE_URL}/llms.txt`,
    '',
    ...openKnowledgePages.flatMap((page) => [
      `---`,
      `URL: ${SITE_URL}/open-knowledge/${page.slug}`,
      page.markdown.trim(),
      '',
    ]),
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'index, follow, all',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
