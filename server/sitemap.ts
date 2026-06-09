// Sitemap generator for SEO
// This file generates an XML sitemap with all public pages

export function generateSitemap(baseUrl: string): string {
  const pages = [
    // Main pages
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/why-saffhire', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.8', changefreq: 'monthly' },
    { url: '/industries', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/faq', priority: '0.7', changefreq: 'monthly' },
    { url: '/referral-partners', priority: '0.7', changefreq: 'monthly' },

    // Service pages
    { url: '/criminal-background-checks', priority: '0.8', changefreq: 'monthly' },
    { url: '/employment-verification', priority: '0.8', changefreq: 'monthly' },
    { url: '/drug-screening', priority: '0.8', changefreq: 'monthly' },
    { url: '/education-verification', priority: '0.8', changefreq: 'monthly' },
    { url: '/mvr-checks', priority: '0.8', changefreq: 'monthly' },

    // Industry pages
    { url: '/industries/healthcare', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/staffing', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/transportation', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/manufacturing', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/hospitality', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/energy', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/education', priority: '0.7', changefreq: 'monthly' },
    { url: '/industries/church-nonprofit', priority: '0.7', changefreq: 'monthly' },

    // Location pages
    { url: '/background-screening-frisco-tx', priority: '0.7', changefreq: 'monthly' },
    { url: '/background-screening-dallas-tx', priority: '0.7', changefreq: 'monthly' },
    { url: '/background-screening-plano-tx', priority: '0.7', changefreq: 'monthly' },
    { url: '/background-screening-mckinney-tx', priority: '0.7', changefreq: 'monthly' },
    { url: '/background-screening-allen-tx', priority: '0.7', changefreq: 'monthly' },

    // Blog posts
    { url: '/blog/fcra-compliance-2026-background-screening-employers', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/nyc-aedt-law-background-screening-compliance', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/fcra-compliance-checklist-employers', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/eeoc-guidance-criminal-records-hiring', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/ban-the-box-laws-by-state', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/roi-of-speed-5-minute-background-checks', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/ongoing-employee-screening-long-term-risk', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/oig-expects-healthcare-organizations', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/birthdate-redaction-background-checks', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/how-long-background-checks-go-back-7-year-rule', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/true-cost-bad-hire', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/top-industries-require-most-screening', priority: '0.6', changefreq: 'monthly' },

    // Policy pages
    { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
    { url: '/fcra-news', priority: '0.6', changefreq: 'monthly' },
  ];

  const sitemapEntries = pages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
}
