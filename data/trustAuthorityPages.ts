export type TrustAuthorityPage = {
  path: string;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  quickAnswer: string;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ label: string; href: string }>;
};

export const trustAuthorityPages: TrustAuthorityPage[] = [
  {
    path: "/about-saffhire",
    slug: "about-saffhire",
    title: "About SaffHire Background Screening",
    metaTitle: "About SaffHire Background Screening",
    description:
      "Learn about SaffHire, a Frisco, Texas background screening company serving employers nationwide with FCRA-compliant screening support.",
    eyebrow: "ABOUT SAFFHIRE",
    quickAnswer:
      "SaffHire is a background screening company based in Frisco, Texas and serving employers across the United States. SaffHire helps businesses choose and manage FCRA-compliant screening services including criminal background checks, employment verification, education verification, drug screening, MVR checks, and industry-specific screening packages.",
    sections: [
      {
        heading: "Who SaffHire helps",
        body: "SaffHire supports employers that need a faster, clearer, and more human background screening process.",
        bullets: ["Small businesses", "Staffing agencies", "Healthcare employers", "Transportation companies", "Churches and nonprofits", "Manufacturing, hospitality, energy, and education organizations"],
      },
      {
        heading: "What SaffHire does",
        body: "SaffHire helps employers build screening packages around the role, industry, risk level, and compliance needs. Services may include criminal searches, employment verification, education verification, drug screening, motor vehicle records, healthcare sanctions checks, and volunteer screening.",
      },
      {
        heading: "Why employers choose SaffHire",
        body: "Employers choose SaffHire because they want background screening support that is responsive, practical, and compliance-aware without feeling like they are lost inside a large self-service platform.",
        bullets: ["FCRA-aware process", "Nationwide coverage", "Human support", "Industry-specific screening options", "Fast and practical hiring support"],
      },
    ],
    faqs: [
      { question: "Where is SaffHire based?", answer: "SaffHire is based in Frisco, Texas and serves employers nationwide." },
      { question: "When was SaffHire founded?", answer: "SaffHire has served employers since 2020." },
      { question: "Does SaffHire serve all 50 states?", answer: "Yes. SaffHire provides background screening services for employers across the United States." },
    ],
    relatedLinks: [
      { label: "Background Screening Services", href: "/services" },
      { label: "Background Screening Guides", href: "/background-screening-guides" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
  {
    path: "/why-background-screening-matters",
    slug: "why-background-screening-matters",
    title: "Why Background Screening Matters for Employers",
    metaTitle: "Why Background Screening Matters for Employers",
    description:
      "Learn why background screening matters for employers, how it supports safer hiring, and why a consistent FCRA-aware process is important.",
    eyebrow: "EMPLOYER GUIDE",
    quickAnswer:
      "Background screening matters because it helps employers make more informed hiring decisions, reduce workplace risk, protect customers and staff, and follow a more consistent hiring process. A good screening program should match the role, industry, and compliance needs of the employer.",
    sections: [
      {
        heading: "It helps reduce hiring risk",
        body: "A bad hire can affect safety, productivity, client trust, and company reputation. Background screening gives employers more information before making a hiring decision.",
      },
      {
        heading: "It supports a consistent process",
        body: "A consistent background screening process helps employers treat applicants more fairly and document hiring decisions more clearly.",
      },
      {
        heading: "It should match the job",
        body: "The right background check depends on the role. A driver may need an MVR check. A healthcare worker may need sanctions checks. A volunteer working with children may need a different screening package than an office employee.",
      },
    ],
    faqs: [
      { question: "Why do employers run background checks?", answer: "Employers run background checks to better understand candidate history, reduce risk, and support safer hiring decisions." },
      { question: "Should every job use the same background check?", answer: "No. Screening should be based on the role, industry, risk level, and applicable compliance needs." },
      { question: "Can background screening help small businesses?", answer: "Yes. Small businesses often have more to lose from one bad hire, so a consistent screening process can be especially helpful." },
    ],
    relatedLinks: [
      { label: "Small Business Background Checks", href: "/small-business-background-checks" },
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
  {
    path: "/national-vs-county-criminal-search",
    slug: "national-vs-county-criminal-search",
    title: "National Criminal Search vs County Criminal Search",
    metaTitle: "National vs County Criminal Background Checks",
    description:
      "Compare national criminal database searches and county criminal background checks, including when employers may use each type of search.",
    eyebrow: "BACKGROUND CHECK COMPARISON",
    quickAnswer:
      "A national criminal database search is broad and fast, but it may not include every record and potential hits should be verified. A county criminal search checks court records in a specific county and is often used to verify possible records at the source.",
    sections: [
      {
        heading: "National searches are broad",
        body: "National database searches can help identify possible records across many sources. They are useful as a broad screening tool, but they are not a complete substitute for source-level verification.",
      },
      {
        heading: "County searches are more targeted",
        body: "County criminal searches focus on records in a specific county court system. These checks are often important because many criminal cases are filed and maintained at the county level.",
      },
      {
        heading: "The strongest approach may use both",
        body: "Many employers use a national database search to identify possible records and county-level checks to verify relevant hits or search counties tied to address history.",
      },
    ],
    faqs: [
      { question: "Is a national criminal database search enough?", answer: "It can be useful, but it should not be treated as a complete replacement for county or court-level verification when a possible record is found." },
      { question: "Why do county checks matter?", answer: "County courts are often the original source for criminal case records, so county checks can improve accuracy." },
      { question: "Can SaffHire help choose the right search?", answer: "Yes. SaffHire can help employers build a package that may include national searches, county checks, and other screening services." },
    ],
    relatedLinks: [
      { label: "National Criminal Database Search", href: "/national-criminal-database-search" },
      { label: "County Criminal Background Checks", href: "/county-criminal-background-checks" },
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
    ],
  },
  {
    path: "/what-shows-up-on-an-employment-background-check",
    slug: "what-shows-up-on-an-employment-background-check",
    title: "What Shows Up on an Employment Background Check?",
    metaTitle: "What Shows Up on an Employment Background Check?",
    description:
      "Learn what may show up on an employment background check and why results depend on the screening package, role, location, and compliance rules.",
    eyebrow: "EMPLOYER GUIDE",
    quickAnswer:
      "What shows up on an employment background check depends on the package ordered, the applicant's history, the position, the states involved, and applicable reporting rules. Common searches may include criminal records, employment verification, education verification, driving records, drug screening, sanctions checks, and identity/address history support.",
    sections: [
      {
        heading: "Common background check components",
        body: "Employment background checks are not all the same. Employers choose the searches that fit the role.",
        bullets: ["Criminal background checks", "Employment verification", "Education verification", "Motor vehicle records", "Drug screening", "Healthcare sanctions checks", "Volunteer screening checks"],
      },
      {
        heading: "Results depend on the package",
        body: "A basic criminal search will not show the same information as a package that also includes employment verification, education verification, MVR checks, or sanctions screening.",
      },
      {
        heading: "Compliance matters",
        body: "Employers using background checks for hiring should follow FCRA requirements, including disclosure, authorization, and proper adverse action steps when applicable.",
      },
    ],
    faqs: [
      { question: "Do employment background checks show every record?", answer: "No. Results depend on the search type, court/source coverage, reporting limits, and the package ordered by the employer." },
      { question: "Can employment history be verified?", answer: "Yes. Employment verification can confirm details such as employer, job title, and dates when available." },
      { question: "Can driving records be included?", answer: "Yes. MVR checks are often used for roles that involve driving or operating company vehicles." },
    ],
    relatedLinks: [
      { label: "Employment Verification", href: "/employment-verification" },
      { label: "MVR Checks", href: "/mvr-checks" },
      { label: "Background Screening Guides", href: "/background-screening-guides" },
    ],
  },
  {
    path: "/how-long-do-background-checks-take",
    slug: "how-long-do-background-checks-take",
    title: "How Long Do Background Checks Take?",
    metaTitle: "How Long Do Employment Background Checks Take?",
    description:
      "Learn how long employment background checks may take and what causes delays in criminal checks, verifications, drug screens, and MVR reports.",
    eyebrow: "EMPLOYER GUIDE",
    quickAnswer:
      "Many background checks are completed quickly, but timing depends on the search type, court availability, employer or school response times, drug screening steps, and whether additional verification is needed. Some checks may return within a day, while others can take several business days.",
    sections: [
      {
        heading: "Fast checks",
        body: "Some searches, such as certain database searches or MVR checks, may return quickly when the source is available and no extra review is needed.",
      },
      {
        heading: "Checks that can take longer",
        body: "County court searches, employment verification, education verification, and drug screening may take longer depending on the court, employer, school, lab, or candidate response time.",
      },
      {
        heading: "How employers can reduce delays",
        body: "Employers can reduce delays by ordering the right package, collecting accurate candidate information, using clear authorization steps, and responding quickly to screening questions.",
      },
    ],
    faqs: [
      { question: "Can a background check be completed in one day?", answer: "Some checks can return within a day, but not every search type or jurisdiction can be completed that quickly." },
      { question: "Why do background checks get delayed?", answer: "Delays may happen because of court processing, missing candidate information, employer or school response times, drug screen steps, or additional verification needs." },
      { question: "Can SaffHire help speed up screening?", answer: "SaffHire helps employers choose practical screening packages and manage the process so hiring teams have clearer expectations." },
    ],
    relatedLinks: [
      { label: "Background Screening Services", href: "/services" },
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "Contact SaffHire", href: "/contact" },
    ],
  },
];

export function getTrustAuthorityPage(path: string) {
  return trustAuthorityPages.find((page) => page.path === path);
}
