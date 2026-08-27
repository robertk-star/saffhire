export const defaultBlogImage = '/images/blog-gig-economy.webp';

export const blogCategoryImages: Record<string, string> = {
  'Hiring Risk': '/images/blog-ai-resume-fraud.webp',
  'Background Screening Strategy': '/images/blog-gig-economy.webp',
  'Criminal Background Checks': '/images/blog-eeoc-criminal.webp',
  'Healthcare Compliance': '/images/blog-oig-healthcare.webp',
  'Healthcare Screening': '/images/blog-oig-healthcare.webp',
  'Transportation Screening': '/images/blog-trucking.webp',
  'Volunteer Screening': '/images/blog-gig-economy.webp',
  'Small Business Screening': '/images/blog-true-cost-bad-hire.webp',
  'Staffing Screening': '/images/blog-gig-economy.webp',
  'Drug Screening': '/images/blog-healthcare-workers.webp',
  'Verification': '/images/blog-ai-resume-fraud.webp',
  'Hiring Efficiency': '/images/blog-roi-speed.webp',
  'Compliance': '/images/blog-fcra-checklist.webp',
  'Technology': '/images/blog-ai-resume-fraud.webp',
  'Industry-Specific': '/images/blog-warehousing.webp',
  'Risk Management': '/images/blog-ongoing-screening.webp',
  'Workforce Risk': '/images/blog-gig-economy.webp',
  'Hiring Best Practices': '/images/blog-true-cost-bad-hire.webp',
};

export function getBlogImageForCategory(category?: string | null) {
  if (!category) return defaultBlogImage;
  return blogCategoryImages[category] || defaultBlogImage;
}
