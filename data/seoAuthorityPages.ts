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
  ctaTitle?: string;
  ctaText?: string;
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
      { label: "SSN Trace and Address History", href: "/ssn-trace" },
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
    metaTitle: "Volunteer Background Checks for Churches & Nonprofits",
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
    metaTitle: "Small Business Background Checks: A Practical Guide",
    description:
      "Small business background checks without an HR department: which searches fit each role, the FCRA steps, and how ordering works. Call 888-588-1733.",
    heroAnswer:
      "Small business background checks use the same searches large employers use: criminal searches, an SSN trace, employment and education verification, drug screening and driving records. The difference is the setup. A small business needs a short list of packages matched to its roles, an applicant disclosure and authorization step that happens every time, and a person to call when a result raises a question. SaffHire builds that for small businesses nationwide from Frisco, TX.",
    whoNeedsIt: [
      "Small businesses hiring employees or contractors",
      "Local service businesses that send staff into customers' homes",
      "Professional offices, clinics, shops and restaurants",
      "Growing teams that need a repeatable hiring process",
      "Employers that want human support instead of a self-serve only platform",
    ],
    whatItChecks: [
      "SSN trace and address history",
      "Criminal background checks",
      "Employment verification",
      "Education verification",
      "Drug screening",
      "MVR checks for driving roles",
      "Custom packages based on the position",
    ],
    whyItMatters: [
      "Each hire carries more weight on a small team.",
      "Screening helps protect customers, employees, and company reputation.",
      "A consistent process applied to every applicant for a role is easier to defend.",
      "Human support helps small employers choose the right screening package.",
    ],
    faqs: [
      {
        question: "Can small businesses run background checks?",
        answer:
          "Yes. Small businesses can run background checks when they provide a proper disclosure and get written authorization. SaffHire's invitation workflow collects both electronically. The business remains responsible for its own hiring decisions and legal compliance.",
      },
      {
        question: "Do I need the applicant's permission to run a background check?",
        answer:
          "Yes. When you use a background screening company, the FCRA requires you to give the applicant a standalone written disclosure and get their written authorization before the report is ordered. SaffHire's secure invitation link handles both steps electronically before any search runs.",
      },
      {
        question: "What background check package should a small business use?",
        answer:
          "The right package depends on the role. A driving job may need an [MVR check](/mvr-checks). A role that depends on a degree may need [education verification](/education-verification). A healthcare role may need a [sanctions check](/healthcare-sanctions-oig-checks). A general hire often starts with an SSN trace and [criminal searches](/criminal-background-checks). Packages are customized to each client's needs.",
      },
      {
        question: "Is a national criminal database search enough for a small business?",
        answer:
          "Usually not by itself. Databases are broad but incomplete, and most criminal cases are filed at the county level. Many small businesses pair a [national criminal database search](/national-criminal-database-search) with [county criminal searches](/county-criminal-background-checks) for the places the applicant has lived, which the [SSN trace](/ssn-trace) helps identify.",
      },
      {
        question: "Can I use a free people search website instead?",
        answer:
          "Many people search websites state that their results may not be used for employment decisions, and they do not collect the applicant's disclosure and authorization. For hiring, use a background screening company that works with employers and follows FCRA procedures.",
      },
      {
        question: "Should I run the background check before or after a job offer?",
        answer:
          "Many employers run the check after a conditional job offer, and some states and cities require that timing or limit when you can ask about criminal history. Rules vary by location, so talk to your own legal counsel about the places where you hire.",
      },
      {
        question: "Can I screen current employees, not just applicants?",
        answer:
          "Yes, with the same disclosure and authorization steps. Some small businesses rescreen when an employee moves into a driving role or a role with access to customers' homes or money. Driving roles often add an annual [MVR check](/mvr-checks).",
      },
      {
        question: "What if the report shows something that concerns me?",
        answer:
          "Do not decide on the spot. Look at whether the result relates to the job, and if you may decide not to hire the person because of the report, the FCRA requires notice steps. You give the applicant a copy of the report and a summary of their rights before the decision is final, allow time for them to respond, then send a final notice. Talk to your own legal counsel about your process.",
      },
      {
        question: "Does SaffHire help choose the right screening package?",
        answer:
          "Yes. SaffHire helps employers choose screening services based on the position, industry, and risk level. Call us for more information or fill out a contact form. Call 888-588-1733 or use the [contact form](/contact) and describe the roles you hire.",
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
        heading: "Why small businesses run background checks",
        paragraphs: [
          "On a team of five or fifty, each person you hire is a bigger share of the business. They may handle cash, drive a company vehicle, work alone in a customer's home, or be the first voice a customer hears. A background check gives you verified information about the things that matter for that job before you make a hiring decision.",
          "Screening also brings consistency. When every applicant for the same role goes through the same searches and the same steps, hiring is less dependent on gut feel, and your process is easier to explain if a decision is ever questioned.",
        ],
      },
      {
        heading: "What small business screening covers",
        paragraphs: [
          "Small business background checks use the same searches larger employers use, ordered in a package that fits the job. A typical starting point is an [SSN trace and address history](/ssn-trace), which shows where the applicant has lived and the names they have used, followed by criminal searches: a national criminal database search, and county or state searches for the places the applicant has lived. The national database is broad and incomplete, so many employers add a county search when the role calls for a court record. See [criminal background checks](/criminal-background-checks).",
          "Other searches are added by role. [Employment verification](/employment-verification) confirms prior employer names, dates, and job titles. [Education verification](/education-verification) confirms a degree or diploma with the school when the job requires it. [Drug screening](/drug-screening) is ordered in the portal and collected at a Labcorp facility. [MVR checks](/mvr-checks) show license status and driving history for anyone who drives for work. Healthcare employers can add [sanctions and OIG checks](/healthcare-sanctions-oig-checks).",
          "SaffHire does not treat every job the same. A receptionist, a driver, and a bookkeeper can have three different packages inside one account.",
        ],
      },
      {
        heading: "Matching searches to common small business roles",
        paragraphs: [
          "Office and front desk roles often start with the SSN trace, criminal searches for the counties and states on the address history, and [employment verification](/employment-verification) to confirm recent jobs.",
          "Drivers and anyone who uses a vehicle for work usually add an [MVR check](/mvr-checks) for license status and driving history. Commercial drivers in DOT-regulated roles also need [DOT drug testing](/dot-drug-testing).",
          "Technicians, cleaners, caregivers and other staff who work in customers' homes or businesses often get a fuller criminal search, with [county criminal searches](/county-criminal-background-checks) for each county on the address history, plus a [drug screen](/drug-screening) if your policy calls for one.",
          "Roles that require a license, degree or certification add [education verification](/education-verification), and healthcare roles add [healthcare sanctions and OIG checks](/healthcare-sanctions-oig-checks). These are examples, not rules. SaffHire recommends a package after you describe the job.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "This page is for employers that hire without a large HR department. That includes local service businesses, professional offices, shops, contractors, clinics, restaurants, and growing teams that want one repeatable process instead of a different method for every manager.",
          "SaffHire is a Veteran-Owned company headquartered in Frisco, TX and serving employers nationwide. You do not need a Texas location to order. Federal, state, and county searches follow the jurisdictions where the applicant has lived.",
        ],
      },
      {
        heading: "How the process works",
        paragraphs: [
          "Describe the roles you hire, the states that show up on applications, and any client or insurance requirement such as a drug screen or an MVR. SaffHire recommends a package from that. You can start from the [standard packages](/packages) or ask for a custom mix. There are no setup fees and no minimums.",
          "When you are ready to screen someone, you enter the applicant's name and email in the SaffHire portal. The applicant gets a secure invitation link, reviews a standalone written disclosure, provides written authorization, and enters their own personal information, so you do not have to collect or store Social Security numbers. The portal is available 24/7.",
          "Instant searches usually return in minutes. Full background packages take 1 to 3 days on average. A county court, a prior employer, or a school can take longer, and the report shows what was confirmed and what is still pending. You review the result and make the hiring decision.",
        ],
      },
      {
        heading: "Setting up a simple screening policy",
        paragraphs: [
          "You do not need a thick manual. A one page policy that answers a few questions goes a long way: which roles are screened, which package each role gets, at what point in hiring the check runs, who reviews the reports, and where the reports are kept and who can see them.",
          "Apply the same package to every applicant for the same role. Write down how you look at a criminal record, such as whether it relates to the duties of the job and how long ago it happened, and use that approach each time. Keep reports confidential and separate from general personnel files. Your own legal counsel can review the policy for the states where you hire.",
        ],
      },
      {
        heading: "Mistakes to avoid",
        paragraphs: [
          "Using a people search website or a social media search in place of an employment background check. Many of those sources say they are not for hiring, and they skip the applicant's disclosure and authorization.",
          "Ordering a report before the applicant has received the standalone disclosure and signed the authorization. Screening only some applicants for the same role. Treating a database hit as final without a court-level confirmation. Making a final decision on a report before the applicant has seen it and had a chance to respond.",
        ],
      },
      {
        heading: "When a report raises a concern",
        paragraphs: [
          "A record on a report is a reason to look closer, not an automatic no. Consider whether it relates to the job and how long ago it happened, and remember that names and dates can be matched to the wrong person. If you may decide not to hire someone based in whole or in part on the report, the FCRA requires notice steps: before the decision is final, give the applicant a copy of the report and a summary of their rights and give them time to respond. After you decide, send a final notice. Some states and cities add their own steps.",
        ],
      },
      {
        heading: "Compliance notes",
        paragraphs: [
          "Before a report is ordered, the applicant receives a standalone written disclosure and gives written authorization. SaffHire's invitation workflow collects both electronically. Employers remain responsible for their own hiring decisions and legal compliance.",
          "SaffHire is not a law firm and does not provide legal advice. Some states and cities limit when you may ask about criminal history or which records you may consider. This page is general information. Review your process with your own counsel for the states where you hire.",
          "SaffHire does not publish prices. Court access fees on state and county searches, and state fees on motor vehicle reports, are pass-through fees when they apply.",
        ],
      },
      {
        heading: "Why small businesses work with SaffHire",
        paragraphs: [
          "SaffHire is a Veteran-Owned background screening company founded in 2019 and headquartered in Frisco, TX. Small businesses order every search in one secure portal, including drug tests and driving records, and the portal is available 24/7. Applicant data is protected with bank-level encryption.",
          "When a result is confusing or a search is pending, you can call and talk with a person. Want help picking searches for your roles? Please call us for more information or fill out a contact form. Call 888-588-1733 or use the [contact form](/contact).",
        ],
      },
    ],
    relatedLinks: [
      { label: "Background Screening Services", href: "/services" },
      { label: "SSN Trace and Address History", href: "/ssn-trace" },
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "County Criminal Searches", href: "/county-criminal-background-checks" },
      { label: "Employment Verification", href: "/employment-verification" },
      { label: "Drug Screening", href: "/drug-screening" },
      { label: "MVR Checks", href: "/mvr-checks" },
      { label: "Standard Packages", href: "/packages" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
    ctaTitle: "Set up small business background checks",
    ctaText:
      "Not sure which searches your roles need? Call us for more information or fill out a contact form. Call 888-588-1733. SaffHire is Veteran-Owned, headquartered in Frisco, TX, and serves small businesses nationwide.",
  },
];

export function getSeoAuthorityPage(path: string) {
  return seoAuthorityPages.find((page) => page.path === path);
}
