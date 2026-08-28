export type OpenKnowledgePage = {
  slug: string;
  title: string;
  description: string;
  markdown: string;
};

export const openKnowledgePages: OpenKnowledgePage[] = [
  {
    slug: 'business-overview',
    title: 'SaffHire Business Overview',
    description: 'Who SaffHire is, what the company does, where it operates, and how employers can contact the team.',
    markdown: `# Business Overview\n\nSaffHire Background Screening provides fast, secure, and reliable background screening services for employers across all industries.\n\n## Website\nhttps://www.saffhire.com\n\n## Location and coverage\n- Based in Frisco, Texas\n- Serves employers nationwide across all 50 states\n- Local pages exist for Frisco, Dallas, Plano, McKinney, and Allen, Texas\n\n## Primary offer\nPre-employment and workforce background screening for businesses, including criminal background checks, employment verification, education verification, drug screening, MVR checks, healthcare sanctions and OIG checks, volunteer screening, and small business screening.\n\n## Main website goal\nHelp employers request a quote, contact SaffHire, or start account setup.\n\n## Public contact points\n- Phone: (888) 588-1733\n- Email: info@saffhire.com\n- Website: https://www.saffhire.com\n- Account setup: https://intake.saffhire.com/\n- Client login: https://saffhire.instascreen.net/sso/login.taz\n\n## Important posture\nSaffHire should be described as helpful, practical, trustworthy, and compliance-aware. SaffHire is not a law firm, legal advisor, or government agency. Employers remain responsible for hiring decisions.`,
  },
  {
    slug: 'brand-and-voice',
    title: 'SaffHire Brand and Voice',
    description: 'Brand name, tone, preferred messaging, and language SaffHire uses in public content.',
    markdown: `# Brand and Voice\n\n## Brand name\nUse SaffHire Background Screening. Acceptable shorter form: SaffHire.\n\n## Tone\nClear, professional, practical, trustworthy, helpful, business-focused, and compliance-aware without sounding like legal advice.\n\n## Preferred messaging\n- Hire with confidence\n- Fast, secure background screening\n- FCRA-aware screening workflows\n- Nationwide coverage\n- Built for businesses across all industries\n- No setup fees and no minimums where applicable\n\n## Preferred CTAs\nGet Quote, Get a Free Quote, Contact Us, Create Account, Start Account Setup, Learn More, Talk to SaffHire.\n\n## Do not position SaffHire as\nA law firm, legal counsel, government agency, a guarantee that an applicant is safe, or a company that makes final hiring decisions.`,
  },
  {
    slug: 'services',
    title: 'SaffHire Background Screening Services',
    description: 'Public SaffHire screening services and the pages that describe them.',
    markdown: `# Services\n\n## Core services\n- Criminal Background Checks: /criminal-background-checks\n- County Criminal Background Checks: /county-criminal-background-checks\n- National Criminal Database Search: /national-criminal-database-search\n- Employment Verification: /employment-verification\n- Education Verification: /education-verification\n- Drug Screening: /drug-screening\n- MVR / Driving Records: /mvr-checks\n- Healthcare Sanctions / OIG Checks: /healthcare-sanctions-oig-checks\n- Volunteer Background Checks: /volunteer-background-checks\n- Small Business Background Checks: /small-business-background-checks\n- FCRA Compliance News: /fcra-news\n\n## Service messaging rules\nEmployers remain responsible for hiring decisions. A national database search is not a complete replacement for county or court-level searches. Do not claim every search is instant.`,
  },
  {
    slug: 'industries-and-audiences',
    title: 'Industries and Audiences SaffHire Serves',
    description: 'Industries and employer types SaffHire supports with background screening.',
    markdown: `# Industries and Audiences\n\nSaffHire helps employers across all industries, with dedicated pages for several high-demand sectors.\n\n## Industry pages\n- /industries\n- /industries/healthcare\n- /industries/staffing\n- /industries/transportation\n- /industries/manufacturing\n- /industries/hospitality\n- /industries/energy\n- /industries/education\n- /industries/church-nonprofit\n\n## Key audiences\nEmployers and HR teams, staffing companies, transportation and trucking companies, healthcare employers, churches and nonprofits, volunteer organizations, and small businesses.`,
  },
  {
    slug: 'site-map-and-routes',
    title: 'SaffHire Public Site Map',
    description: 'Public SaffHire website routes for services, industries, guides, local pages, and contact.',
    markdown: `# Public Site Map\n\n## Core pages\n- /\n- /services\n- /industries\n- /why-saffhire\n- /contact\n- /blog\n- /faq\n- /company-information\n- /open-knowledge\n- /background-screening-guides\n- /llms.txt\n\n## Service pages\n- /criminal-background-checks\n- /county-criminal-background-checks\n- /national-criminal-database-search\n- /employment-verification\n- /education-verification\n- /drug-screening\n- /mvr-checks\n- /healthcare-sanctions-oig-checks\n- /volunteer-background-checks\n- /small-business-background-checks\n- /fcra-news\n\n## Local pages\n- /background-screening-frisco-tx\n- /background-screening-dallas-tx\n- /background-screening-plano-tx\n- /background-screening-mckinney-tx\n- /background-screening-allen-tx\n\n## Referral partners\n- /referral-partners`,
  },
  {
    slug: 'conversion-goals',
    title: 'SaffHire Conversion Goals',
    description: 'How SaffHire wants employers to take the next step: quote, contact, account setup, or call.',
    markdown: `# Conversion Goals\n\n## Primary public goals\n1. Request a quote or contact SaffHire\n2. Create an account / start account setup\n3. Client login\n4. Phone call\n5. Guide and resource engagement\n\n## Main links\n- Contact: /contact\n- Homepage contact: /#contact\n- Account setup: https://intake.saffhire.com/\n- Client login: https://saffhire.instascreen.net/sso/login.taz\n- Guides: /background-screening-guides\n- Blog: /blog\n- Phone: (888) 588-1733`,
  },
  {
    slug: 'compliance-and-claim-rules',
    title: 'SaffHire Compliance and Claim Rules',
    description: 'Language rules for describing SaffHire screening services without making legal guarantees.',
    markdown: `# Compliance and Claim Rules\n\nSaffHire content should be FCRA-aware and EEOC-aware. The company supports FCRA-compliant screening workflows, but does not offer legal advice or legal guarantees.\n\n## Preferred language\n- FCRA-compliant background screening services\n- Compliance-aware screening workflows\n- Helps employers make informed hiring decisions\n- Supports safer hiring decisions\n- Employers should follow applicable federal, state, and local requirements\n\n## Avoid\n- Guaranteed compliance\n- We eliminate hiring risk\n- We guarantee safe hires\n- This search finds every record\n- We decide if someone should be hired`,
  },
  {
    slug: 'content-and-seo-guidelines',
    title: 'SaffHire Content and SEO Guidelines',
    description: 'How SaffHire organizes public content for employers, search engines, and AI search tools.',
    markdown: `# Content and SEO Guidelines\n\nSaffHire content should support topical authority around employment background screening.\n\n## Content clusters\n- Services: criminal checks, verifications, drug screening, MVR, healthcare sanctions, volunteer checks, small business checks\n- Industries: healthcare, staffing, transportation, manufacturing, hospitality, energy, education, churches and nonprofits\n- Compliance and education: FCRA news, blog posts, background screening guides, FAQ, company information, open knowledge pages\n\n## AI and search discovery\nPublic discovery files include /llms.txt, /sitemap.xml, /robots.txt, /company-information, and /open-knowledge.`,
  },
];

export function getOpenKnowledgePage(slug: string) {
  return openKnowledgePages.find((page) => page.slug === slug) || null;
}
