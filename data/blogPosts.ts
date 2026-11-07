/**
 * Blog Posts Data - Single Source of Truth
 * 2026-08-27: Local images replacing broken Manus CDN URLs
 */

import { adverseTwoStepListing } from "@/legacy/blog/FcraAdverseActionTwoStep";
import { fcraBasicsListing } from "@/legacy/blog/FcraBasicsForEmployers";
import { criminalCheckTypesListing } from "@/legacy/blog/TypesOfCriminalBackgroundChecks";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

import { texasLawsListing } from "@/legacy/blog/TexasBackgroundCheckLaws";
import { dotClearinghouseListing } from "@/legacy/blog/DotDrugTestingClearinghouse";

export const blogPosts: BlogPost[] = [
  adverseTwoStepListing,
  fcraBasicsListing,
  criminalCheckTypesListing,
  {
    slug: "ai-powered-resume-fraud-hiring-challenge",
    title: "AI-Powered Resume Fraud: The New Hiring Challenge Employers Can’t Ignore",
    excerpt:
      "AI-generated resumes can overstate a candidate's qualifications. Learn how verification and background screening reduce that hiring risk.",
    category: "Hiring Risk",
    date: "May 25, 2026",
    readTime: "8 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-ai-resume-fraud.webp",
  },
  {
    slug: "gig-economy-background-screening-contingent-workforce-liability",
    title: "Gig Economy Background Screening: Contingent Workforce Liability Employers Can’t Ignore",
    excerpt:
      "Gig workers, contractors, and temporary staff can still create safety and compliance risk. Learn how employers screen a contingent workforce.",
    category: "Workforce Risk",
    date: "May 22, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-gig-economy.webp",
  },
  {
    slug: "why-warehousing-companies-cant-afford-hiring-mistakes",
    title: "Why Warehousing Companies Can't Afford Hiring Mistakes",
    excerpt:
      "One bad hire can slow down the entire warehouse operation. Learn why background screening is critical for warehouse safety, efficiency, and profitability.",
    category: "Industry-Specific",
    date: "May 21, 2026",
    readTime: "10 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-warehousing.webp",
  },
  {
    slug: "trucking-companies-bad-hiring-decisions",
    title: "Why Trucking Companies Can't Afford Bad Hiring Decisions",
    excerpt:
      "A bad hire in trucking can mean liability, downtime, and safety risk. Learn why driver background screening matters for fleet safety.",
    category: "Industry-Specific",
    date: "May 18, 2026",
    readTime: "12 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-trucking.webp",
  },
  texasLawsListing,
  dotClearinghouseListing,
  {
    slug: "fcra-compliance-checklist-employers-2026",
    title: "FCRA Compliance Checklist for Employers in 2026",
    excerpt:
      "An FCRA checklist for high-turnover employers: standalone disclosures, written authorization, and mistakes that lead to disputes.",
    category: "Compliance",
    date: "March 10, 2026",
    readTime: "8 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-fcra-checklist.webp",
  },
  {
    slug: "eeoc-guidance-criminal-records-employers",
    title: "EEOC Guidance and Criminal Records: What Every Employer Must Know Before Their Next Hire",
    excerpt:
      "Blanket criminal-record bans can create EEOC risk. Learn the Green factors and how an individualized review fits a screening policy.",
    category: "Compliance",
    date: "March 16, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-eeoc-criminal.webp",
  },
  drugTestTypesListing,
  staffingChecklistListing,
  {
    slug: "ban-the-box-laws-by-state-employer-guide",
    title: "The Employer's State-by-State Guide to Ban-the-Box Laws: What You Must Do Before You Ask",
    excerpt:
      "Ban-the-box laws cover many cities and states. See how delayed criminal-history questions change the hiring process employers should follow.",
    category: "Compliance",
    date: "March 23, 2026",
    readTime: "10 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-ban-the-box.webp",
  },
  {
    slug: "roi-of-speed-5-minute-background-checks-time-to-hire",
    title: "The ROI of Speed: How 5-Minute Background Checks Slash Your Time-to-Hire",
    excerpt:
      "Slow background checks can stall hiring and lose candidates. See how employers reduce delays without skipping the searches a role needs.",
    category: "Hiring Efficiency",
    date: "March 26, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-roi-speed.webp",
  },
  {
    slug: "ongoing-employee-screening-long-term-risk-management",
    title: "Why Ongoing Employee Screening Will Change the Way You Manage Long-Term Risk",
    excerpt:
      "A pre-hire background check shows history at the start. Learn why some employers add ongoing screening after the employee starts work.",
    category: "Risk Management",
    date: "March 30, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-ongoing-screening.webp",
  },
  {
    slug: "what-oig-expects-healthcare-organizations",
    title: "What the OIG Expects from Healthcare Organizations",
    excerpt:
      "The OIG exclusion list is updated every month. Learn what healthcare employers should check before hiring and why exclusions matter.",
    category: "Healthcare Compliance",
    date: "April 2, 2026",
    readTime: "8 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-oig-healthcare.webp",
  },
  {
    slug: "birthdate-redaction-background-check-delays",
    title: "Birthdate Redaction: Why Some States Are Slowing Down Your Background Checks (and How to Handle It)",
    excerpt:
      "Birthdate redaction rules in some states can slow background checks. Learn why the delay happens and how employers keep screening moving.",
    category: "Compliance",
    date: "April 6, 2026",
    readTime: "9 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-birthdate-redaction.webp",
  },
  {
    slug: "fcra-compliance-2026-background-screening-employers",
    title: "The FCRA Is Getting Stricter in 2026 (And Most Employers Are Not Ready)",
    excerpt:
      "In 2026, regulators are looking harder at background screening. Learn what changed for employers and how to keep an FCRA-aware hiring process.",
    category: "Compliance",
    date: "May 4, 2026",
    readTime: "12 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-fcra-2026.webp",
  },
  {
    slug: "fcra-enforcement-2026-employer-background-screening-compliance",
    title: "The True Cost of a Bad Hire: How Background Screening Protects Client Relationships",
    excerpt:
      "One bad hire can damage client relationships permanently. Learn how background screening protects your reputation and keeps clients coming back.",
    category: "Hiring Best Practices",
    date: "May 14, 2026",
    readTime: "10 min read",
    author: "SaffHire Compliance Team",
    image: "/images/blog-bad-hire-clients.webp",
  },
];

export function parseBlogDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function formatRssDate(date: Date): string {
  return date.toUTCString();
}

export function getRelatedPosts(slug: string): BlogPost[] {
  const relatedPostsMap: Record<string, string[]> = {
    "ai-powered-resume-fraud-hiring-challenge": [
      "small-business-background-checks",
    ],
    "gig-economy-background-screening-contingent-workforce-liability": [
      "trucking-companies-bad-hiring-decisions",
    ],
    "fcra-compliance-checklist-employers-2026": [
      "fcra-basics-for-employers",
    ],
  };

  const relatedSlugs = relatedPostsMap[slug] || [];
  return relatedSlugs
    .map((relatedSlug) => blogPosts.find((post) => post.slug === relatedSlug))
    .filter((post): post is BlogPost => post !== undefined);
}

import { drugTestTypesListing } from "@/legacy/blog/TypesOfEmploymentDrugTests";
import { staffingChecklistListing } from "@/legacy/blog/StaffingClientRequirementsChecklist";
