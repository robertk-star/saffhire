/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd2xsxph8kpxj0f.cloudfront.net' },
      { protocol: 'https', hostname: 'saffhire.com' },
      { protocol: 'https', hostname: 'www.saffhire.com' },
    ],
  },
  async redirects() {
    return [
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
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
