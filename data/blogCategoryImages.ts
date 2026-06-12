export const defaultBlogImage = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/top-industries-screening-hero-WE6rERMRUjdEYRvK8mNf9T.webp';

export const blogCategoryImages: Record<string, string> = {
  'Hiring Risk': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/Screenshot2026-04-30at2.37.09PM_978eaaef.png',
  'Background Screening Strategy': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/top-industries-screening-hero-WE6rERMRUjdEYRvK8mNf9T.webp',
  'Criminal Background Checks': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/7-year-rule-timeline-RNfqFxtfK4odkJVZXaNVE4.webp',
  'Healthcare Compliance': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/healthcare-screening-workers-hero-NbHrLjLNvrWmpCgvpdRJFj.webp',
  'Healthcare Screening': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/oig-healthcare-compliance-blog-hero-emwEM2MDQQNZe97joqH4us.webp',
  'Transportation Screening': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/trucking-bad-hire-hero-GofKsS6GbaNL9HsuaMrxE2.webp',
  'Volunteer Screening': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/top-industries-screening-hero-WE6rERMRUjdEYRvK8mNf9T.webp',
  'Small Business Screening': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/bad-hire-client-relationship-hero-hjyshZQ43uR2h48dJNuT3D.webp',
  'Staffing Screening': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/top-industries-screening-hero-WE6rERMRUjdEYRvK8mNf9T.webp',
  'Drug Screening': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/healthcare-screening-workers-hero-NbHrLjLNvrWmpCgvpdRJFj.webp',
  'Verification': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/Screenshot2026-04-30at2.37.09PM_978eaaef.png',
  'Hiring Efficiency': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/roi-speed-background-checks-blog-hero-bPJuHRWgUsr5pcVwmFfDrh.webp',
  'Compliance': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/fcra-2026-compliance-hero-g324ywwzt2UJGqNbxmxm5L.webp',
  'Technology': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/Screenshot2026-04-30at2.37.09PM_978eaaef.png',
  'Industry-Specific': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/top-industries-screening-hero-WE6rERMRUjdEYRvK8mNf9T.webp',
  'Risk Management': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/ongoing-employee-screening-blog-hero-96awRDR6NxKQcuSdzJqFAx.webp',
};

export function getBlogImageForCategory(category?: string | null) {
  if (!category) return defaultBlogImage;
  return blogCategoryImages[category] || defaultBlogImage;
}
