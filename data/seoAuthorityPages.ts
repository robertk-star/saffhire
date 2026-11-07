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
  detailSections?: Array<{ heading: string; paragraphs: string[] }>;
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
      "A package sized to the role can make screening practical for smaller organizations.",
    ],
    faqs: [
      {
        question: "Do volunteers need background checks?",
        answer:
          "Many organizations choose to screen volunteers, especially when volunteers work with children, seniors, vulnerable adults, transportation, finances, or sensitive information. Whether a particular role must be screened is a decision for the organization and its own counsel.",
      },
      {
        question: "Are volunteer background checks different from employee checks?",
        answer:
          "They can be. Volunteer screening packages are often built around the role, risk level, and population served by the organization. A driver who transports people is a different screen from a volunteer who never drives and never works with children.",
      },
      {
        question: "Does SaffHire work with churches and nonprofits?",
        answer:
          "Yes. SaffHire works with churches, faith-based groups, nonprofits, and volunteer organizations. SaffHire is headquartered in Frisco, TX and serves organizations nationwide. There are no setup fees and no minimums.",
      },
      {
        question: "How does a volunteer screening order work?",
        answer:
          "The organization orders the package in the SaffHire portal. The person being screened receives a standalone written disclosure and provides written authorization through the invitation workflow. Results come back in the portal. The organization makes its own decision about the role.",
      },
      {
        question: "How long do volunteer background checks take?",
        answer:
          "Instant searches such as the National Criminal Database, SSN Trace, and MVR usually return in minutes. Full background packages take 1 to 3 days on average. A county search can take longer when the court is slow.",
      },
      {
        question: "Does SaffHire tell us whether a volunteer is allowed to serve?",
        answer:
          "No. SaffHire provides the report. SaffHire is not a law firm and does not decide who may volunteer. The organization, with its own counsel when it needs legal advice, decides how to use the information.",
      },
    ],
    detailSections: [
      {
        heading: "What volunteer screening covers",
        paragraphs: [
          "A volunteer background check is a package built for the role, not a single database with every record in the country. Organizations commonly start with a criminal search and a sex offender registry search, then add other searches when the role needs them.",
          "An identity and address history search shows names and addresses associated with the person, which is how the right counties are chosen for a court search. A person who has lived in more than one county may need more than one county search. A national database search is a broad starting point, and it is not a substitute for the court record when the role calls for one. Read more on [criminal background checks](/criminal-background-checks) and [county criminal searches](/county-criminal-background-checks).",
          "Volunteers who drive, including people who transport children, seniors, or equipment, can add a [motor vehicle record check](/mvr-checks). The report comes from the state, usually returns in minutes, and state fees may apply. What the state includes, and how far back it reports, depends on that state.",
        ],
      },
      {
        heading: "Who volunteer screening is for",
        paragraphs: [
          "Churches and faith-based groups use it for teachers, youth leaders, drivers, and people who handle offerings or private information. Nonprofits use it for mentors, shelter staff, and program volunteers. Youth sports and mentoring programs use it for coaches and anyone who is alone with children. Schools and education programs use it for volunteers who work on campus. Organizations that serve seniors or other vulnerable adults use it for people who enter homes or handle medication reminders and money.",
          "A one-time event helper who is always supervised may not need the same package as a weekly youth leader. SaffHire helps the organization match the package to the role. Packages are customized to each client's needs. The [church and nonprofit industry page](/industries/church-nonprofit) describes how those employers use the same searches.",
        ],
      },
      {
        heading: "How the process works",
        paragraphs: [
          "Tell SaffHire which roles you screen and what those people do. A youth role, a driving role, and a finance role are not the same package. You can call 888-588-1733 or use the [contact form](/contact). There are no setup fees and no minimums, so a small program can order when it has someone to screen.",
          "The organization places the order in the SaffHire portal. SaffHire's invitation workflow sends a standalone written disclosure and collects written authorization before the report is ordered. The person completes that step electronically. Searches then run. Instant searches usually return in minutes. Full background packages take 1 to 3 days on average. County searches and any verification still depend on courts and other sources, so an individual result can vary.",
          "Results are delivered in the portal. The organization reviews them and decides whether the person serves. SaffHire does not make that decision.",
        ],
      },
      {
        heading: "Compliance notes",
        paragraphs: [
          "When a background report is ordered through SaffHire, the person being screened gets a standalone written disclosure and provides written authorization first. That workflow is how SaffHire supports an FCRA-aware process. The organization remains responsible for its own decisions and for following the federal, state, and local rules that apply to it.",
          "SaffHire is not a law firm, a compliance advisor, or a government agency. This page is general information, not legal advice. Rules for volunteers who work with children, for drivers, and for people in certain care settings differ by state. Ask your own counsel which searches a role requires and how you may use the report.",
          "SaffHire is a Veteran-Owned company headquartered in Frisco, TX and serving organizations nationwide. SaffHire does not publish prices. Ask for a quote for the package you need.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Church and Nonprofit Screening", href: "/industries/church-nonprofit" },
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "MVR Checks", href: "/mvr-checks" },
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
          "Yes. Small businesses can run background checks when they provide a proper disclosure and get written authorization. SaffHire's invitation workflow collects both electronically. The business remains responsible for its own hiring decisions and legal compliance.",
      },
      {
        question: "What background check package should a small business use?",
        answer:
          "The right package depends on the role. A driving job may need an MVR check. A role that depends on a degree may need education verification. A healthcare role may need a sanctions check. A general hire often starts with criminal searches. Packages are customized to each client's needs.",
      },
      {
        question: "Does SaffHire help choose the right screening package?",
        answer:
          "Yes. SaffHire helps employers choose screening services based on the position, industry, and risk level. Call 888-588-1733 or use the contact form and describe the roles you hire.",
      },
      {
        question: "Is there a setup fee or a monthly minimum?",
        answer:
          "No. SaffHire has no setup fees and no minimums. You order the searches you need. Court access fees may apply to state and county criminal searches, and state fees may apply to motor vehicle reports. Those are pass-through fees.",
      },
      {
        question: "How long does a small business background check take?",
        answer:
          "Instant searches such as the National Criminal Database, SSN Trace, and MVR usually return in minutes. Full background packages take 1 to 3 days on average. County searches and verifications can take longer when a court, a prior employer, or a school is slow to respond.",
      },
      {
        question: "Will SaffHire tell me who to hire?",
        answer:
          "No. SaffHire provides the report. SaffHire is not a law firm and does not decide who should be hired. The employer makes that decision and should ask its own counsel when a legal question comes up.",
      },
    ],
    detailSections: [
      {
        heading: "What small business screening covers",
        paragraphs: [
          "Small business background checks use the same searches larger employers use, ordered in a package that fits the job. A typical starting point is a criminal search: a national criminal database search, and county or state searches for the places the applicant has lived. The national database is broad and incomplete, so many employers add a county search when the role calls for a court record. See [criminal background checks](/criminal-background-checks).",
          "Other searches are added by role. [Employment verification](/employment-verification) confirms prior employer names, dates, and job titles. [Education verification](/education-verification) confirms a degree or diploma with the school when the job requires it. [Drug screening](/drug-screening) is ordered in the portal and collected at a Labcorp facility. [MVR checks](/mvr-checks) show license status and driving history for anyone who drives for work. Healthcare employers can add [sanctions and OIG checks](/healthcare-sanctions-oig-checks).",
          "SaffHire does not treat every job the same. A receptionist, a driver, and a bookkeeper can have three different packages inside one account.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "This page is for employers that hire without a large HR department. That includes local service businesses, professional offices, shops, contractors, clinics, and growing teams that want one repeatable process instead of a different method for every manager.",
          "SaffHire is a Veteran-Owned company headquartered in Frisco, TX and serving employers nationwide. You do not need a Texas location to order. Federal, state, and county searches follow the jurisdictions where the applicant has lived.",
        ],
      },
      {
        heading: "How the process works",
        paragraphs: [
          "Describe the roles you hire, the states that show up on applications, and any client or insurance requirement such as a drug screen or an MVR. SaffHire recommends a package from that. You can start from the [standard packages](/packages) or ask for a custom mix. There are no setup fees and no minimums.",
          "When you are ready to screen someone, you order in the SaffHire portal. The applicant gets a standalone written disclosure and provides written authorization through the invitation workflow before the report is run. The portal is available 24/7.",
          "Instant searches usually return in minutes. Full background packages take 1 to 3 days on average. A county court, a prior employer, or a school can take longer, and the report shows what was confirmed and what is still pending. You review the result and make the hiring decision.",
        ],
      },
      {
        heading: "Compliance notes",
        paragraphs: [
          "Before a report is ordered, the applicant receives a standalone written disclosure and gives written authorization. SaffHire's invitation workflow collects both electronically. Employers remain responsible for their own hiring decisions and legal compliance.",
          "SaffHire is not a law firm and does not provide legal advice. Some states and cities limit when you may ask about criminal history or which records you may consider. This page is general information. Review your process with your own counsel for the states where you hire.",
          "SaffHire does not publish prices. Court access fees on state and county searches, and state fees on motor vehicle reports, are pass-through fees when they apply. Call 888-588-1733 or [contact SaffHire](/contact) for a quote.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Background Screening Services", href: "/services" },
      { label: "Employment Verification", href: "/employment-verification" },
      { label: "Standard Packages", href: "/packages" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
];

export function getSeoAuthorityPage(path: string) {
  return seoAuthorityPages.find((page) => page.path === path);
}
