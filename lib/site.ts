export const site = {
  name: 'SaffHire Background Screening',
  shortName: 'SaffHire',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com',
  phone: '888-588-1733',
  phoneHref: 'tel:18885881733',
  email: 'info@saffhire.com',
  emailHref: 'mailto:info@saffhire.com',
  established: '2020',
  loginUrl: 'https://saffhire.instascreen.net',
  city: 'Frisco',
  state: 'Texas',
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  {
    slug: 'criminal-background-checks',
    title: 'Criminal Background Checks',
    shortTitle: 'Criminal Checks',
    description: 'County, state, national, and federal criminal search options for employer background screening programs.',
    intro: 'SaffHire helps employers order criminal background checks through a clean, applicant-friendly process with support when questions come up.',
    bullets: ['County criminal searches', 'Federal criminal searches', 'National criminal database search options', 'Sex offender registry searches', 'Watch list options'],
  },
  {
    slug: 'employment-verification',
    title: 'Employment Verification',
    shortTitle: 'Employment Verification',
    description: 'Verification support to help confirm candidate employment history and reduce hiring uncertainty.',
    intro: 'Employment verification helps employers compare candidate-provided information against available employer records.',
    bullets: ['Prior employer verification', 'Candidate-reported history review', 'Clear status updates', 'Documentation-focused workflow'],
  },
  {
    slug: 'drug-screening',
    title: 'Drug Screening',
    shortTitle: 'Drug Screening',
    description: 'Drug and alcohol testing options for employers that need a practical screening process.',
    intro: 'SaffHire supports drug screening workflows that are built around employer needs, candidate communication, and practical turnaround expectations.',
    bullets: ['5-panel options', '10-panel options', 'Alcohol testing options', 'Employer-friendly ordering support'],
  },
];

export const industries = [
  {
    slug: 'trucking',
    title: 'Background Checks for Trucking Companies',
    eyebrow: 'Trucking & Transportation',
    description: 'Screen drivers and transportation employees with checks built around safety-sensitive hiring needs.',
    body: 'Trucking companies need background screening that is fast, organized, and easy to repeat. SaffHire helps transportation employers review drivers and support roles with package options that can include criminal searches, motor vehicle reports, drug screening, and verification support.',
    bullets: ['Motor vehicle report options', 'Criminal search packages', 'Drug screening workflows', 'Fast ordering support'],
  },
  {
    slug: 'churches',
    title: 'Background Checks for Churches and Nonprofits',
    eyebrow: 'Churches & Nonprofits',
    description: 'Affordable screening support for staff, volunteers, ministry workers, and nonprofit teams.',
    body: 'Churches and nonprofits need screening that is easy to use, affordable, and respectful of applicants and volunteers. SaffHire helps organizations create a practical process for staff, volunteer, and ministry-related screening needs.',
    bullets: ['Volunteer screening support', 'Staff background checks', 'Church and nonprofit packages', 'Simple applicant process'],
  },
  {
    slug: 'staffing',
    title: 'Background Checks for Staffing Agencies',
    eyebrow: 'Staffing Agencies',
    description: 'Flexible screening support for staffing firms that need repeatable workflows and fast response.',
    body: 'Staffing agencies need a background screening partner that can move quickly without making the process harder. SaffHire helps staffing teams order checks, manage candidate information, and support clients with clear screening options.',
    bullets: ['High-volume ordering support', 'Custom packages', 'Applicant-friendly digital process', 'No setup or subscription fees'],
  },
];

export const faqs = [
  { question: 'What does SaffHire do?', answer: 'SaffHire provides employer background screening services, including criminal background checks, employment verification, drug screening, motor vehicle reports, and related screening options.' },
  { question: 'Does SaffHire serve companies outside Texas?', answer: 'Yes. SaffHire is based in Frisco, Texas and serves employers across all 50 states.' },
  { question: 'Does SaffHire show public pricing?', answer: 'Not at this time. Employers can request a quote so SaffHire can recommend screening options based on industry, volume, and hiring needs.' },
  { question: 'What industries does SaffHire focus on?', answer: 'SaffHire supports many employers, with priority pages for trucking and transportation companies, churches and nonprofits, and staffing agencies.' },
  { question: 'How should I get started?', answer: 'The fastest way is to call SaffHire at 888-588-1733. You can also submit the request-a-quote form online.' },
];
