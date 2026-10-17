const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'd2xsxph8kpxj0f.cloudfront.net' },
      { protocol: 'https', hostname: 'saffhire.com' },
      { protocol: 'https', hostname: 'www.saffhire.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.saffhire.com' }],
        destination: 'https://saffhire.com/:path*',
        permanent: true,
      },
      { source: '/pricing', destination: '/contact', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },
      { source: '/about', destination: '/why-saffhire', permanent: true },
      { source: '/request-a-quote', destination: '/contact', permanent: true },
      { source: '/services/criminal-background-checks', destination: '/criminal-background-checks', permanent: true },
      { source: '/services/employment-verification', destination: '/employment-verification', permanent: true },
      { source: '/services/education-verification', destination: '/education-verification', permanent: true },
      { source: '/services/drug-screening', destination: '/drug-screening', permanent: true },
      { source: '/services/mvr-checks', destination: '/mvr-checks', permanent: true },
      { source: '/industries/trucking', destination: '/industries/transportation', permanent: true },
      { source: '/industries/churches', destination: '/industries/church-nonprofit', permanent: true },
      { source: '/industries/nonprofits', destination: '/industries/church-nonprofit', permanent: true },
      { source: '/industries/church-and-nonprofit', destination: '/industries/church-nonprofit', permanent: true },
      { source: '/industries/churches-and-nonprofits', destination: '/industries/church-nonprofit', permanent: true },

      // Blog cannibalization (2026-10-17): overlapping posts -> strongest post (keep in sync with data/consolidatedBlogPosts.ts)
      { source: '/blog/background-check-delays-reduce-hiring-time', destination: '/blog/background-check-delays-how-employers-can-reduce-them', statusCode: 301 },
      { source: '/blog/reduce-background-check-delays-hiring-efficiency', destination: '/blog/background-check-delays-how-employers-can-reduce-them', statusCode: 301 },
      { source: '/blog/staffing-background-checks-speed-consistency-client-protection', destination: '/blog/staffing-background-checks-speed-consistency-compliance', statusCode: 301 },

      // GSC index fixes (2026-10-17): long blog slugs -> canonical short slugs
      { source: '/blog/birthdate-redaction-why-some-states-are-slowing-down-your-background-checks', destination: '/blog/birthdate-redaction-background-check-delays', statusCode: 301 },
      { source: '/blog/eeoc-guidance-and-criminal-records-what-every-employer-must-know', destination: '/blog/eeoc-guidance-criminal-records-employers', statusCode: 301 },
      { source: '/blog/the-employers-state-by-state-guide-to-ban-the-box-laws', destination: '/blog/ban-the-box-laws-by-state-employer-guide', statusCode: 301 },
      { source: '/blog/the-roi-of-speed-how-5-minute-background-checks-slash-your-time-to-hire', destination: '/blog/roi-of-speed-5-minute-background-checks-time-to-hire', statusCode: 301 },
      { source: '/blog/why-ongoing-employee-screening-will-change-the-way-you-manage-long-term-risk', destination: '/blog/ongoing-employee-screening-long-term-risk-management', statusCode: 301 },
      { source: '/blog/what-the-oig-expects-from-healthcare-organizations', destination: '/blog/what-oig-expects-healthcare-organizations', statusCode: 301 },
      { source: '/blog/fcra-compliance-checklist-for-employers-in-2026', destination: '/blog/fcra-compliance-checklist-employers-2026', statusCode: 301 },
      { source: '/blog/how-saffhire-follows-fcra-guidelines', destination: '/blog/fcra-compliance-2026-background-screening-employers', statusCode: 301 },
      // Legacy CMS URLs
      { source: '/services/manufacturingwarehousing', destination: '/industries/manufacturing', statusCode: 301 },
      { source: '/services/churches-non-profit', destination: '/industries/church-nonprofit', statusCode: 301 },
      { source: '/services/:industry(healthcare|education|staffing|transportation|energy|hospitality)', destination: '/industries/:industry', statusCode: 301 },
      { source: '/contact-us', destination: '/contact', statusCode: 301 },
      { source: '/blog/fcra-adverse-action-rules-2025-employer-compliance', destination: '/blog/fcra-basics-for-employers', statusCode: 301 },
      { source: '/blog/fcra-adverse-action-two-step-notice-requirements-2026', destination: '/blog/fcra-basics-for-employers', statusCode: 301 },
      { source: '/contact-style-1', destination: '/contact', statusCode: 301 },
      { source: '/create-an-account', destination: '/contact', statusCode: 301 },
      { source: '/index.php/contact-us', destination: '/contact', statusCode: 301 },
      { source: '/index.php/contact-style-1', destination: '/contact', statusCode: 301 },
      { source: '/index.php/services/:industry(healthcare|education|staffing|transportation|energy|hospitality)', destination: '/industries/:industry', statusCode: 301 },
      { source: '/index.php', destination: '/', statusCode: 301 },
      { source: '/index.php/:path*', destination: '/:path*', statusCode: 301 },
    ];
  },
  experimental: {
    // Inline the (Tailwind) CSS into the HTML <head> instead of a render-blocking
    // <link rel=stylesheet>, removing an extra round trip before first paint.
    inlineCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
      '@shared': path.resolve(__dirname, 'shared'),
      '@/pages': path.resolve(__dirname, 'legacy'),
    };
    return config;
  },
};

module.exports = nextConfig;
