/**
 * SEO Metadata for all pages
 * Used for meta descriptions, Open Graph tags, and canonical URLs
 */

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
    description: "Fast, secure, and FCRA-compliant background screening services for businesses. Criminal checks, employment verification, drug screening, and MVR checks.",
    ogImage: "https://saffhire.com/og-image-home.jpg",
    ogImageAlt: "SaffHire Background Screening",
    keywords: "background screening, pre-employment screening, criminal background check, employment verification, drug screening, FCRA compliance",
  },
  "/blog": {
    title: "Background Screening Blog - Compliance, Hiring, and Industry News",
    description: "Expert insights on background screening, FCRA compliance, hiring best practices, and industry trends. Read our latest articles and guides.",
    ogImage: "https://saffhire.com/og-image-blog.jpg",
    ogImageAlt: "SaffHire Blog",
    keywords: "background screening blog, FCRA compliance, hiring best practices, employment screening",
  },
  "/services": {
    title: "Background Screening Services - Criminal, Employment, Drug & MVR",
    description: "Comprehensive background screening services including criminal checks, employment verification, education verification, drug screening, and MVR checks.",
    ogImage: "https://saffhire.com/og-image-services.jpg",
    ogImageAlt: "SaffHire Services",
    keywords: "background screening services, criminal background check, employment verification, drug screening, MVR check",
  },
  "/industries": {
    title: "Industry-Specific Background Screening Solutions",
    description: "Tailored background screening for healthcare, staffing, transportation, construction, financial services, and more. Industry-specific compliance solutions.",
    ogImage: "https://saffhire.com/og-image-industries.jpg",
    ogImageAlt: "SaffHire Industries",
    keywords: "industry background screening, healthcare screening, staffing screening, transportation screening",
  },
  "/contact": {
    title: "Contact SaffHire - Get a Background Screening Quote",
    description: "Contact SaffHire for a free background screening quote. Speak with our compliance experts about your hiring needs.",
    ogImage: "https://saffhire.com/og-image-contact.jpg",
    ogImageAlt: "Contact SaffHire",
    keywords: "contact background screening company, get a quote, background check services",
  },
  "/why-saffhire": {
    title: "Why Choose SaffHire for Background Screening",
    description: "Discover why SaffHire is the trusted background screening partner for thousands of businesses. Fast turnaround, FCRA compliance, and expert support.",
    ogImage: "https://saffhire.com/og-image-why-saffhire.jpg",
    ogImageAlt: "Why SaffHire",
    keywords: "why choose saffhire, background screening company, FCRA compliant",
  },
  "/criminal-background-checks": {
    title: "Criminal Background Checks - FCRA Compliant & Fast Turnaround",
    description: "Comprehensive criminal background checks with fast turnaround times. FCRA compliant, county-verified records, and expert support for hiring.",
    ogImage: "https://saffhire.com/og-image-criminal-checks.jpg",
    ogImageAlt: "Criminal Background Checks",
    keywords: "criminal background check, criminal record check, criminal screening, FCRA compliant background check",
  },
  "/employment-verification": {
    title: "Employment Verification Services - Verify Employment History",
    description: "Fast and accurate employment verification services. Verify employment history, dates, titles, and salary information for hiring decisions.",
    ogImage: "https://saffhire.com/og-image-employment-verification.jpg",
    ogImageAlt: "Employment Verification",
    keywords: "employment verification, verify employment history, employment background check",
  },
  "/education-verification": {
    title: "Education Verification - Verify Degrees & Credentials",
    description: "Education verification services to confirm degrees, diplomas, and professional credentials. Fast turnaround and FCRA compliant.",
    ogImage: "https://saffhire.com/og-image-education-verification.jpg",
    ogImageAlt: "Education Verification",
    keywords: "education verification, degree verification, credential verification",
  },
  "/drug-screening": {
    title: "Drug Screening Services - Pre-Employment Drug Tests",
    description: "Pre-employment drug screening services with fast results. DOT compliant, customizable panels, and reliable testing for hiring.",
    ogImage: "https://saffhire.com/og-image-drug-screening.jpg",
    ogImageAlt: "Drug Screening",
    keywords: "drug screening, pre-employment drug test, drug testing services, DOT compliant",
  },
  "/mvr-checks": {
    title: "Motor Vehicle Records (MVR) Checks - Driving History Reports",
    description: "Motor Vehicle Records checks for driving history verification. Fast turnaround, multi-state coverage, and FCRA compliant.",
    ogImage: "https://saffhire.com/og-image-mvr-checks.jpg",
    ogImageAlt: "MVR Checks",
    keywords: "MVR check, motor vehicle records, driving history check, driving record verification",
  },
  "/industries/healthcare": {
    title: "Healthcare Background Screening - OIG & Compliance Requirements",
    description: "Specialized background screening for healthcare organizations. OIG exclusion checks, OFAC screening, and full FCRA compliance.",
    ogImage: "https://saffhire.com/og-image-healthcare.jpg",
    ogImageAlt: "Healthcare Screening",
    keywords: "healthcare background screening, OIG exclusion check, healthcare compliance",
  },
  "/industries/staffing": {
    title: "Staffing Agency Background Screening - Fast Turnaround",
    description: "Background screening solutions for staffing agencies. Fast turnaround, high volume discounts, and FCRA compliance for temporary placements.",
    ogImage: "https://saffhire.com/og-image-staffing.jpg",
    ogImageAlt: "Staffing Screening",
    keywords: "staffing agency background screening, temporary staffing screening, staffing compliance",
  },
  "/industries/transportation": {
    title: "Transportation & Trucking Background Screening - DOT Compliant",
    description: "Transportation and trucking industry background screening. DOT compliant, MVR checks, and fast turnaround for drivers.",
    ogImage: "https://saffhire.com/og-image-transportation.jpg",
    ogImageAlt: "Transportation Screening",
    keywords: "transportation background screening, trucking screening, DOT compliant background check",
  },
  "/industries/manufacturing": {
    title: "Manufacturing Background Screening - Safety & Compliance",
    description: "Background screening for manufacturing facilities. Criminal checks, employment verification, and safety-focused screening.",
    ogImage: "https://saffhire.com/og-image-manufacturing.jpg",
    ogImageAlt: "Manufacturing Screening",
    keywords: "manufacturing background screening, industrial screening, safety background check",
  },
  "/industries/hospitality": {
    title: "Hospitality & Retail Background Screening - Customer-Facing Roles",
    description: "Background screening for hospitality and retail businesses. Fast turnaround for high-volume hiring and customer-facing positions.",
    ogImage: "https://saffhire.com/og-image-hospitality.jpg",
    ogImageAlt: "Hospitality Screening",
    keywords: "hospitality background screening, retail background check, customer-facing screening",
  },
  "/industries/energy": {
    title: "Energy Industry Background Screening - Compliance & Safety",
    description: "Background screening for energy sector companies. Specialized compliance requirements, safety screening, and fast turnaround.",
    ogImage: "https://saffhire.com/og-image-energy.jpg",
    ogImageAlt: "Energy Screening",
    keywords: "energy industry background screening, oil and gas screening, utility company screening",
  },
  "/industries/education": {
    title: "Education Background Screening - Schools & Universities",
    description: "Background screening for educational institutions. Child safety focus, education verification, and comprehensive compliance.",
    ogImage: "https://saffhire.com/og-image-education.jpg",
    ogImageAlt: "Education Screening",
    keywords: "education background screening, school background check, teacher screening",
  },
  "/industries/church-nonprofit": {
    title: "Nonprofit & Church Background Screening - Volunteer & Staff",
    description: "Background screening for nonprofits and religious organizations. Volunteer screening, staff vetting, and child safety compliance.",
    ogImage: "https://saffhire.com/og-image-nonprofit.jpg",
    ogImageAlt: "Nonprofit Screening",
    keywords: "nonprofit background screening, church background check, volunteer screening",
  },
  "/referral-partners": {
    title: "SaffHire Referral Partners - Partner Network",
    description: "Discover SaffHire's trusted partner network. Integration opportunities and partnership programs for background screening.",
    ogImage: "https://saffhire.com/og-image-partners.jpg",
    ogImageAlt: "SaffHire Partners",
    keywords: "background screening partners, referral partners, integration partners",
  },
  "/privacy-policy": {
    title: "Privacy Policy - SaffHire",
    description: "SaffHire privacy policy. Learn how we protect your data and comply with privacy regulations.",
    keywords: "privacy policy, data protection, GDPR compliance",
  },
  "/terms-of-service": {
    title: "Terms of Service - SaffHire",
    description: "SaffHire terms of service. Legal terms and conditions for using our background screening services.",
    keywords: "terms of service, legal terms, service agreement",
  },
  "/fcra-news": {
    title: "FCRA Compliance News & Updates - Background Screening Regulations",
    description: "Latest FCRA compliance news, regulatory updates, and background screening industry trends.",
    ogImage: "https://saffhire.com/og-image-fcra-news.jpg",
    ogImageAlt: "FCRA News",
    keywords: "FCRA news, background screening regulations, compliance updates",
  },
};

/**
 * Get metadata for a page
 * Falls back to home metadata if page not found
 */
export function getPageMetadata(path: string): PageMetadata {
  return seoMetadata[path] || seoMetadata["/"];
}

/**
 * FAQ Schema for service pages
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const serviceFAQs: Record<string, FAQItem[]> = {
  "/criminal-background-checks": [
    {
      question: "How long does a criminal background check take?",
      answer: "Most criminal background checks are completed within 24-48 hours. Rush processing is available for urgent hiring needs.",
    },
    {
      question: "What records are included in a criminal background check?",
      answer: "Our criminal background checks include county criminal records, state records, and federal records. We verify records directly with courts for accuracy.",
    },
    {
      question: "Are criminal background checks FCRA compliant?",
      answer: "Yes, all our background checks are fully FCRA compliant. We follow all Fair Credit Reporting Act requirements and provide proper disclosures and adverse action procedures.",
    },
    {
      question: "How far back do criminal background checks go?",
      answer: "Federal law allows us to report criminal records back 7 years for most positions. However, some roles and states allow longer lookback periods.",
    },
    {
      question: "What is the cost of a criminal background check?",
      answer: "Criminal background check pricing varies based on the scope and urgency. Contact us for a custom quote based on your hiring needs.",
    },
  ],
  "/employment-verification": [
    {
      question: "How long does employment verification take?",
      answer: "Most employment verifications are completed within 24-48 hours. We contact employers directly to verify employment history.",
    },
    {
      question: "What information is verified in employment verification?",
      answer: "We verify employment dates, job titles, responsibilities, salary information, and reason for separation when available.",
    },
    {
      question: "Can you verify employment from previous employers?",
      answer: "Yes, we can verify employment from any previous employer. We contact HR departments or employment verification services directly.",
    },
    {
      question: "Is employment verification FCRA compliant?",
      answer: "Yes, all employment verification services are fully FCRA compliant with proper disclosures and candidate consent.",
    },
    {
      question: "What if a previous employer won't verify employment?",
      answer: "If an employer won't verify, we document the attempt and provide a report noting the employer's non-cooperation.",
    },
  ],
  "/education-verification": [
    {
      question: "How long does education verification take?",
      answer: "Most education verifications are completed within 3-5 business days. We contact educational institutions directly.",
    },
    {
      question: "What credentials can be verified?",
      answer: "We verify degrees, diplomas, certifications, professional licenses, and other educational credentials from accredited institutions.",
    },
    {
      question: "Can you verify international education credentials?",
      answer: "Yes, we can verify international education credentials, though processing times may be longer depending on the institution.",
    },
    {
      question: "Is education verification FCRA compliant?",
      answer: "Yes, all education verification services comply with FCRA requirements and include proper candidate disclosures.",
    },
    {
      question: "What if a school won't verify credentials?",
      answer: "If a school won't verify, we document the attempt and provide a report. Candidates can provide official transcripts as alternative verification.",
    },
  ],
  "/drug-screening": [
    {
      question: "How long do drug screening results take?",
      answer: "Most drug screening results are available within 24-48 hours. Rapid testing options are available for urgent needs.",
    },
    {
      question: "What drug panels are available?",
      answer: "We offer standard 5-panel, 10-panel, and customized panels. DOT-compliant testing is available for transportation industry roles.",
    },
    {
      question: "Are drug screens DOT compliant?",
      answer: "Yes, we offer DOT-compliant drug screening for transportation and safety-sensitive positions.",
    },
    {
      question: "What is the cost of drug screening?",
      answer: "Drug screening pricing varies based on the panel type and testing method. Contact us for volume discounts and pricing.",
    },
    {
      question: "Is drug screening FCRA compliant?",
      answer: "Yes, all drug screening services comply with FCRA requirements and include proper candidate notifications.",
    },
  ],
  "/mvr-checks": [
    {
      question: "How long do MVR checks take?",
      answer: "Most MVR checks are completed within 24-48 hours. We access state motor vehicle records directly.",
    },
    {
      question: "What states can you check for MVR records?",
      answer: "We can check MVR records from all 50 states plus Washington D.C. Multi-state reports are available.",
    },
    {
      question: "How far back do MVR checks go?",
      answer: "MVR checks typically cover the past 3-7 years depending on state regulations and the severity of violations.",
    },
    {
      question: "Are MVR checks FCRA compliant?",
      answer: "Yes, all MVR checks are fully FCRA compliant with proper candidate disclosures and consent procedures.",
    },
    {
      question: "What violations appear on an MVR report?",
      answer: "MVR reports show moving violations, accidents, license suspensions, DUI/DWI convictions, and other driving-related incidents.",
    },
  ],
};

/**
 * Generate FAQ schema JSON-LD for a page
 */
export function generateFAQSchema(pageUrl: string, faqs: FAQItem[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
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
