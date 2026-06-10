export type SeoAuthorityPage = {
  path: string;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  heroAnswer: string;
  whoNeedsIt: string[];
  whatItChecks: string[];
  whyItMatters: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ label: string; href: string }>;
};

export const seoAuthorityPages: SeoAuthorityPage[] = [
  {
    path: "/national-criminal-database-search",
    slug: "national-criminal-database-search",
    title: "National Criminal Database Search",
    metaTitle: "National Criminal Database Search for Employers",
    description:
      "Learn how a national criminal database search helps employers identify possible criminal record history and why county verification is still important.",
    heroAnswer:
      "A national criminal database search is a broad background screening tool that searches many criminal record sources at once. It can help identify possible records quickly, but potential hits should be verified through the proper court source before an employer makes a hiring decision.",
    whoNeedsIt: [
      "Employers hiring across multiple states",
      "Staffing agencies that need fast initial screening support",
      "Small businesses that want a broader criminal record search",
      "Organizations that need a starting point before county-level verification",
    ],
    whatItChecks: [
      "Multi-jurisdiction criminal record databases",
      "Possible felony and misdemeanor record matches",
      "Records from participating courts, states, corrections sources, and public databases",
      "Supplemental sources that may help identify where a county search is needed",
    ],
    whyItMatters: [
      "It gives employers a broader view than one county alone.",
      "It may identify records tied to prior addresses or past locations.",
      "It can support faster screening workflows when used correctly.",
      "It should not replace court-level verification for reportable criminal records.",
    ],
    faqs: [
      {
        question: "Is a national criminal database search the same as a county criminal search?",
        answer:
          "No. A national database search is broad and fast, but it is not the same as checking records directly with a county court. Potential criminal record hits should be verified at the source before being reported for employment purposes.",
      },
      {
        question: "Can employers use a national database search for hiring?",
        answer:
          "Yes, but employers should use it as part of an FCRA-compliant screening process. SaffHire helps employers use national searches with proper verification and compliance support.",
      },
      {
        question: "Does a national criminal database search cover every record in the United States?",
        answer:
          "No database contains every criminal record from every court. Coverage varies by source, state, county, and update schedule.",
      },
    ],
    relatedLinks: [
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "County Criminal Background Checks", href: "/county-criminal-background-checks" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
  {
    path: "/county-criminal-background-checks",
    slug: "county-criminal-background-checks",
    title: "County Criminal Background Checks",
    metaTitle: "County Criminal Background Checks for Employers",
    description:
      "County criminal background checks help employers verify criminal records directly with local court sources for more accurate employment screening.",
    heroAnswer:
      "A county criminal background check searches criminal court records in a specific county. County checks are often the most important source for verifying possible criminal records because many cases are filed and maintained at the county court level.",
    whoNeedsIt: [
      "Employers that need accurate criminal record verification",
      "Businesses hiring applicants with recent county address history",
      "Staffing agencies placing workers in client environments",
      "Organizations that require a stronger FCRA-compliant review process",
    ],
    whatItChecks: [
      "County-level felony records",
      "County-level misdemeanor records",
      "Pending criminal cases where available and legally reportable",
      "Court identifiers used to confirm whether a record belongs to the applicant",
    ],
    whyItMatters: [
      "County courts are often the original source of criminal case records.",
      "County verification helps reduce false positives from database-only searches.",
      "It supports more accurate hiring decisions.",
      "It helps employers follow a more defensible background screening process.",
    ],
    faqs: [
      {
        question: "Why are county criminal background checks important?",
        answer:
          "County courts are often where criminal cases are filed. Checking county records helps verify possible hits and improves accuracy in the screening process.",
      },
      {
        question: "How are counties selected for a background check?",
        answer:
          "Counties are commonly selected based on the applicant's address history, SSN address trace results, job location, and possible record locations found during screening.",
      },
      {
        question: "How long do county criminal background checks take?",
        answer:
          "Many county checks are completed quickly, but turnaround time depends on the county court, record availability, and whether additional verification is needed.",
      },
    ],
    relatedLinks: [
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "National Criminal Database Search", href: "/national-criminal-database-search" },
      { label: "FCRA Compliance News", href: "/fcra-news" },
    ],
  },
  {
    path: "/healthcare-sanctions-oig-checks",
    slug: "healthcare-sanctions-oig-checks",
    title: "Healthcare Sanctions and OIG Checks",
    metaTitle: "Healthcare Sanctions and OIG Checks for Employers",
    description:
      "Healthcare sanctions and OIG checks help healthcare employers screen for exclusions, sanctions, and compliance risks before hiring or credentialing.",
    heroAnswer:
      "Healthcare sanctions and OIG checks help healthcare employers identify whether a candidate or provider may appear on exclusion or sanctions lists. These checks are important for hospitals, clinics, home health providers, long-term care facilities, and other healthcare organizations.",
    whoNeedsIt: [
      "Hospitals and clinics",
      "Home health and hospice providers",
      "Long-term care and senior care facilities",
      "Healthcare staffing agencies",
      "Organizations hiring licensed or credentialed healthcare workers",
    ],
    whatItChecks: [
      "OIG List of Excluded Individuals/Entities where applicable",
      "Healthcare sanctions and exclusion sources",
      "Professional license verification when requested",
      "Watchlist and compliance-related screening sources",
    ],
    whyItMatters: [
      "Healthcare employers often face higher compliance and patient-safety risk.",
      "Sanctions and exclusion checks help protect patients, staff, and the organization.",
      "Screening can support credentialing and onboarding workflows.",
      "Ongoing monitoring may be needed for some healthcare roles.",
    ],
    faqs: [
      {
        question: "What is an OIG exclusion check?",
        answer:
          "An OIG exclusion check is a search used to help identify whether an individual or entity appears on the OIG List of Excluded Individuals/Entities.",
      },
      {
        question: "Who should run healthcare sanctions checks?",
        answer:
          "Healthcare employers, healthcare staffing agencies, and organizations hiring employees or contractors in patient-care or regulated healthcare settings often use sanctions checks.",
      },
      {
        question: "Can SaffHire help with healthcare screening packages?",
        answer:
          "Yes. SaffHire can help employers build healthcare screening packages that may include criminal checks, OIG checks, license verification, employment verification, and other screening services.",
      },
    ],
    relatedLinks: [
      { label: "Healthcare Background Screening", href: "/industries/healthcare" },
      { label: "Employment Verification", href: "/employment-verification" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
  {
    path: "/volunteer-background-checks",
    slug: "volunteer-background-checks",
    title: "Volunteer Background Checks",
    metaTitle: "Volunteer Background Checks for Churches and Nonprofits",
    description:
      "Volunteer background checks help churches, nonprofits, schools, and community organizations protect the people they serve.",
    heroAnswer:
      "Volunteer background checks help organizations screen people who serve in trusted roles, especially when volunteers work with children, seniors, vulnerable adults, money, transportation, or private information.",
    whoNeedsIt: [
      "Churches and faith-based organizations",
      "Nonprofits and community groups",
      "Youth sports and mentoring programs",
      "Schools and education programs",
      "Organizations serving children, seniors, or vulnerable adults",
    ],
    whatItChecks: [
      "Criminal background checks",
      "Sex offender registry searches",
      "Identity and address history support",
      "MVR checks for volunteers who drive",
      "Custom screening packages based on role risk",
    ],
    whyItMatters: [
      "Volunteer roles can involve high levels of trust.",
      "Screening helps protect the people your organization serves.",
      "Consistent screening policies help reduce risk.",
      "Affordable packages can make screening practical for smaller organizations.",
    ],
    faqs: [
      {
        question: "Do volunteers need background checks?",
        answer:
          "Many organizations choose to screen volunteers, especially when volunteers work with children, seniors, vulnerable adults, transportation, finances, or sensitive information.",
      },
      {
        question: "Are volunteer background checks different from employee checks?",
        answer:
          "They can be. Volunteer screening packages are often built around the role, risk level, and population served by the organization.",
      },
      {
        question: "Does SaffHire work with churches and nonprofits?",
        answer:
          "Yes. SaffHire provides affordable background screening support for churches, faith-based groups, nonprofits, and volunteer organizations.",
      },
    ],
    relatedLinks: [
      { label: "Church and Nonprofit Screening", href: "/industries/church-nonprofit" },
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
  {
    path: "/small-business-background-checks",
    slug: "small-business-background-checks",
    title: "Small Business Background Checks",
    metaTitle: "Small Business Background Checks for Employers",
    description:
      "Small business background checks help employers make safer hiring decisions with fast, simple, and FCRA-compliant screening support.",
    heroAnswer:
      "Small business background checks help employers verify key information before hiring. SaffHire gives small businesses access to professional background screening support without the confusing process or oversized enterprise approach.",
    whoNeedsIt: [
      "Small businesses hiring employees or contractors",
      "Local service businesses",
      "Professional offices",
      "Growing teams that need a repeatable hiring process",
      "Employers that want human support instead of a self-serve only platform",
    ],
    whatItChecks: [
      "Criminal background checks",
      "Employment verification",
      "Education verification",
      "Drug screening",
      "MVR checks for driving roles",
      "Custom packages based on the position",
    ],
    whyItMatters: [
      "Small businesses often cannot afford a bad hire.",
      "Screening helps protect customers, employees, and company reputation.",
      "A consistent process helps support compliance.",
      "Human support helps small employers choose the right screening package.",
    ],
    faqs: [
      {
        question: "Can small businesses run background checks?",
        answer:
          "Yes. Small businesses can run background checks when they follow proper disclosure, authorization, and adverse action requirements under the FCRA.",
      },
      {
        question: "What background check package should a small business use?",
        answer:
          "The right package depends on the role. A driving job may need an MVR check, while a finance or healthcare role may need additional screening.",
      },
      {
        question: "Does SaffHire help choose the right screening package?",
        answer:
          "Yes. SaffHire helps employers choose screening services based on the position, industry, and risk level.",
      },
    ],
    relatedLinks: [
      { label: "Background Screening Services", href: "/services" },
      { label: "Employment Verification", href: "/employment-verification" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
];

export function getSeoAuthorityPage(path: string) {
  return seoAuthorityPages.find((page) => page.path === path);
}
