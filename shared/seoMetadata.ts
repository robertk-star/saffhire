export interface PageMetadata {
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;
  keywords?: string;
}

export const seoMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "SaffHire Background Pre-Employment Screening",
    description: "Fast, secure background screening services with FCRA-compliant screening workflows. Criminal checks, employment verification, drug screening, and MVR checks.",
    ogImage: "https://saffhire.com/og-image-home.jpg",
    ogImageAlt: "SaffHire Background Screening",
    keywords: "background screening, pre-employment screening, criminal background check, employment verification, drug screening, FCRA-compliant screening workflows",
  },
  "/blog": {
    title: "Background Screening Blog - Compliance, Hiring, and Industry News",
    description: "Insights on background screening, FCRA-aware hiring practices, and industry trends.",
    ogImage: "https://saffhire.com/og-image-blog.jpg",
    ogImageAlt: "SaffHire Blog",
    keywords: "background screening blog, FCRA-aware hiring, employment screening",
  },
  "/services": {
    title: "Background Screening Services - Criminal, Employment, Drug & MVR",
    description: "Background screening services including criminal checks, employment verification, education verification, drug screening, and MVR checks.",
    ogImage: "https://saffhire.com/og-image-services.jpg",
    ogImageAlt: "SaffHire Services",
    keywords: "background screening services, criminal background check, employment verification, drug screening, MVR check",
  },
  "/industries": {
    title: "Industry-Specific Background Screening Solutions",
    description: "Background screening for healthcare, staffing, transportation, manufacturing, hospitality, energy, education, churches, and more.",
    ogImage: "https://saffhire.com/og-image-industries.jpg",
    ogImageAlt: "SaffHire Industries",
    keywords: "industry background screening, healthcare screening, staffing screening, transportation screening",
  },
  "/contact": {
    title: "Contact SaffHire - Get a Background Screening Quote",
    description: "Contact SaffHire for a free background screening quote. Talk with the team about your hiring needs.",
    ogImage: "https://saffhire.com/og-image-contact.jpg",
    ogImageAlt: "Contact SaffHire",
    keywords: "contact background screening company, get a quote, background check services",
  },
  "/why-saffhire": {
    title: "Why Choose SaffHire for Background Screening",
    description: "Learn why employers nationwide use SaffHire for background screening. Fast turnaround, FCRA-compliant screening workflows, and practical support.",
    ogImage: "https://saffhire.com/og-image-why-saffhire.jpg",
    ogImageAlt: "Why SaffHire",
    keywords: "why choose saffhire, background screening company, FCRA-compliant screening workflows",
  },
  "/criminal-background-checks": {
    title: "Criminal Background Checks - Fast Turnaround",
    description: "Criminal background checks with county, state, and federal searches. FCRA-compliant screening workflows and practical hiring support.",
    ogImage: "https://saffhire.com/og-image-criminal-checks.jpg",
    ogImageAlt: "Criminal Background Checks",
    keywords: "criminal background check, criminal record check, criminal screening",
  },
  "/employment-verification": {
    title: "Employment Verification Services - Verify Employment History",
    description: "Employment verification services to confirm employment history, dates, and titles for hiring decisions.",
    ogImage: "https://saffhire.com/og-image-employment-verification.jpg",
    ogImageAlt: "Employment Verification",
    keywords: "employment verification, verify employment history, employment background check",
  },
  "/education-verification": {
    title: "Education Verification - Verify Degrees & Credentials",
    description: "Education verification services to confirm degrees, diplomas, and professional credentials through FCRA-compliant screening workflows.",
    ogImage: "https://saffhire.com/og-image-education-verification.jpg",
    ogImageAlt: "Education Verification",
    keywords: "education verification, degree verification, credential verification",
  },
  "/drug-screening": {
    title: "Drug Screening Services - Pre-Employment Drug Tests",
    description: "Pre-employment drug screening services with DOT-related testing options and customizable panels.",
    ogImage: "https://saffhire.com/og-image-drug-screening.jpg",
    ogImageAlt: "Drug Screening",
    keywords: "drug screening, pre-employment drug test, drug testing services",
  },
  "/mvr-checks": {
    title: "Motor Vehicle Records (MVR) Checks - Driving History Reports",
    description: "Motor Vehicle Records checks for driving history verification with multi-state coverage and FCRA-compliant screening workflows.",
    ogImage: "https://saffhire.com/og-image-mvr-checks.jpg",
    ogImageAlt: "MVR Checks",
    keywords: "MVR check, motor vehicle records, driving history check, driving record verification",
  },
  "/industries/healthcare": {
    title: "Healthcare Background Screening - OIG & Compliance Requirements",
    description: "Background screening for healthcare organizations, including OIG exclusion checks and FCRA-compliant screening workflows.",
    ogImage: "https://saffhire.com/og-image-healthcare.jpg",
    ogImageAlt: "Healthcare Screening",
    keywords: "healthcare background screening, OIG exclusion check, healthcare compliance",
  },
  "/industries/staffing": {
    title: "Staffing Agency Background Screening - Fast Turnaround",
    description: "Background screening solutions for staffing agencies, with FCRA-compliant screening workflows for temporary and direct-hire placements.",
    ogImage: "https://saffhire.com/og-image-staffing.jpg",
    ogImageAlt: "Staffing Screening",
    keywords: "staffing agency background screening, temporary staffing screening",
  },
  "/industries/transportation": {
    title: "Transportation & Trucking Background Screening",
    description: "Transportation and trucking background screening, including MVR checks and DOT-related testing options.",
    ogImage: "https://saffhire.com/og-image-transportation.jpg",
    ogImageAlt: "Transportation Screening",
    keywords: "transportation background screening, trucking screening, MVR checks",
  },
  "/industries/manufacturing": {
    title: "Manufacturing Background Screening - Safety & Compliance",
    description: "Background screening for manufacturing facilities, including criminal checks and employment verification.",
    ogImage: "https://saffhire.com/og-image-manufacturing.jpg",
    ogImageAlt: "Manufacturing Screening",
    keywords: "manufacturing background screening, industrial screening",
  },
  "/industries/hospitality": {
    title: "Hospitality & Retail Background Screening - Customer-Facing Roles",
    description: "Background screening for hospitality and retail businesses hiring customer-facing staff.",
    ogImage: "https://saffhire.com/og-image-hospitality.jpg",
    ogImageAlt: "Hospitality Screening",
    keywords: "hospitality background screening, retail background check",
  },
  "/industries/energy": {
    title: "Energy Industry Background Screening - Compliance & Safety",
    description: "Background screening for energy sector companies, with safety-focused packages and FCRA-compliant screening workflows.",
    ogImage: "https://saffhire.com/og-image-energy.jpg",
    ogImageAlt: "Energy Screening",
    keywords: "energy industry background screening, oil and gas screening",
  },
  "/industries/education": {
    title: "Education Background Screening - Schools & Universities",
    description: "Background screening for educational institutions, including education verification and student-safety focused packages.",
    ogImage: "https://saffhire.com/og-image-education.jpg",
    ogImageAlt: "Education Screening",
    keywords: "education background screening, school background check, teacher screening",
  },
  "/industries/church-nonprofit": {
    title: "Nonprofit & Church Background Screening - Volunteer & Staff",
    description: "Background screening for nonprofits and churches, including volunteer screening and staff vetting.",
    ogImage: "https://saffhire.com/og-image-nonprofit.jpg",
    ogImageAlt: "Nonprofit Screening",
    keywords: "nonprofit background screening, church background check, volunteer screening",
  },
  "/referral-partners": {
    title: "SaffHire Referral Partners - Partner Network",
    description: "Discover SaffHire's partner network and partnership programs for background screening.",
    ogImage: "https://saffhire.com/og-image-partners.jpg",
    ogImageAlt: "SaffHire Partners",
    keywords: "background screening partners, referral partners",
  },
  "/privacy-policy": {
    title: "Privacy Policy - SaffHire",
    description: "SaffHire privacy policy. Learn how we protect your data.",
    keywords: "privacy policy, data protection",
  },
  "/terms-of-service": {
    title: "Terms of Service - SaffHire",
    description: "SaffHire terms of service for using our background screening services.",
    keywords: "terms of service, legal terms, service agreement",
  },
  "/fcra-news": {
    title: "FCRA Compliance News & Updates - Background Screening Regulations",
    description: "FCRA news, regulatory updates, and background screening industry trends.",
    ogImage: "https://saffhire.com/og-image-fcra-news.jpg",
    ogImageAlt: "FCRA News",
    keywords: "FCRA news, background screening regulations, compliance updates",
  },
};

export function getPageMetadata(path: string): PageMetadata {
  return seoMetadata[path] || seoMetadata["/"];
}

export interface FAQItem {
  question: string;
  answer: string;
}

const workflowAnswer =
  "SaffHire provides FCRA-compliant screening workflows, including disclosures, authorization, and adverse-action support. Employers remain responsible for their own hiring decisions and legal compliance.";

export const serviceFAQs: Record<string, FAQItem[]> = {
  "/criminal-background-checks": [
    {
      question: "How long does a criminal background check take?",
      answer: "Many criminal background checks are completed within 24-48 hours. Rush processing is available for urgent hiring needs.",
    },
    {
      question: "What records are included in a criminal background check?",
      answer: "Criminal background checks can include county criminal records, state records, and federal records. County and source-level records are verified at the court or issuing source when those searches are ordered.",
    },
    {
      question: "Are criminal background checks FCRA compliant?",
      answer: workflowAnswer,
    },
    {
      question: "How far back do criminal background checks go?",
      answer: "Lookback periods depend on the search type, role, and applicable federal, state, and local rules.",
    },
    {
      question: "What is the cost of a criminal background check?",
      answer: "Pricing varies based on the scope of the search. Contact SaffHire for a custom quote.",
    },
  ],
  "/employment-verification": [
    {
      question: "How long does employment verification take?",
      answer: "Most employment verifications complete within standard business timeframes, depending on how quickly prior employers respond.",
    },
    {
      question: "What information is verified in employment verification?",
      answer: "Employment verification can confirm dates, job titles, and employer names when that information is available.",
    },
    {
      question: "Can you verify employment from previous employers?",
      answer: "Yes. SaffHire can attempt verification with prior employers when the applicant authorizes the search.",
    },
    {
      question: "Is employment verification FCRA compliant?",
      answer: workflowAnswer,
    },
    {
      question: "What if a previous employer won't verify employment?",
      answer: "If an employer will not verify, the attempt is documented and noted in the report.",
    },
  ],
  "/education-verification": [
    {
      question: "How long does education verification take?",
      answer: "Education verifications often complete within a few business days, depending on the institution.",
    },
    {
      question: "What credentials can be verified?",
      answer: "Degrees, diplomas, certifications, and professional credentials can be verified with issuing institutions when available.",
    },
    {
      question: "Can you verify international education credentials?",
      answer: "International education credentials can be requested, though processing times may be longer.",
    },
    {
      question: "Is education verification FCRA compliant?",
      answer: workflowAnswer,
    },
    {
      question: "What if a school won't verify credentials?",
      answer: "If a school will not verify, the attempt is documented. Candidates may also provide official transcripts.",
    },
  ],
  "/drug-screening": [
    {
      question: "How long do drug screening results take?",
      answer: "Turnaround depends on the panel and whether instant or lab-based testing is used.",
    },
    {
      question: "What drug panels are available?",
      answer: "Standard and customized panels are available, including DOT-related testing options for transportation roles.",
    },
    {
      question: "Are drug screens DOT compliant?",
      answer: "SaffHire offers DOT-related drug screening options for transportation and safety-sensitive positions. Employers remain responsible for meeting applicable DOT requirements.",
    },
    {
      question: "What is the cost of drug screening?",
      answer: "Pricing varies based on the panel type and testing method. Contact SaffHire for a quote.",
    },
    {
      question: "Is drug screening FCRA compliant?",
      answer: workflowAnswer,
    },
  ],
  "/mvr-checks": [
    {
      question: "How long do MVR checks take?",
      answer: "Most MVR checks return quickly, though timing can vary by state.",
    },
    {
      question: "What states can you check for MVR records?",
      answer: "MVR coverage is available nationwide, including multi-state driving histories when needed.",
    },
    {
      question: "How far back do MVR checks go?",
      answer: "Lookback periods depend on state reporting rules and the type of violation.",
    },
    {
      question: "Are MVR checks FCRA compliant?",
      answer: workflowAnswer,
    },
    {
      question: "What violations appear on an MVR report?",
      answer: "MVR reports can show moving violations, accidents, license suspensions, and other driving-related incidents reported by the state.",
    },
  ],
};

export function generateFAQSchema(pageUrl: string, faqs: FAQItem[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
}
