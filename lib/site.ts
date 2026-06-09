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
    title: 'Trucking & Transportation',
    eyebrow: 'Transportation',
    description: 'Screen drivers, support staff, and safety-sensitive transportation roles with practical background screening options.',
    body: 'Transportation employers need background screening that is fast, organized, and easy to repeat. SaffHire helps review drivers and support roles with package options that can include criminal searches, motor vehicle reports, drug screening, and verification support.',
    bullets: ['Motor vehicle report options', 'Criminal search packages', 'Drug screening workflows', 'Fast ordering support'],
  },
  {
    slug: 'churches',
    title: 'Churches & Nonprofits',
    eyebrow: 'Faith & Nonprofit',
    description: 'Support staff, volunteers, ministry workers, and nonprofit teams with respectful screening workflows.',
    body: 'Churches and nonprofits need screening that is easy to use, affordable, and respectful of applicants and volunteers. SaffHire helps organizations create a practical process for staff, volunteer, and ministry-related screening needs.',
    bullets: ['Volunteer screening support', 'Staff background checks', 'Church and nonprofit packages', 'Simple applicant process'],
  },
  {
    slug: 'staffing',
    title: 'Staffing Agencies',
    eyebrow: 'Staffing',
    description: 'Flexible screening support for staffing firms that need repeatable workflows and fast response.',
    body: 'Staffing agencies need a background screening partner that can move quickly without making the process harder. SaffHire helps staffing teams order checks, manage candidate information, and support clients with clear screening options.',
    bullets: ['High-volume ordering support', 'Custom packages', 'Applicant-friendly digital process', 'No setup or subscription fees'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    eyebrow: 'Healthcare',
    description: 'Background screening support for healthcare employers, clinics, care teams, and medical support roles.',
    body: 'Healthcare employers need screening workflows that help protect patients, teams, and facilities while keeping hiring organized. SaffHire helps healthcare teams select screening options based on role, responsibility, and workflow needs.',
    bullets: ['Criminal background checks', 'Employment verification', 'Drug screening options', 'Role-based packages'],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing & Warehouse',
    eyebrow: 'Manufacturing',
    description: 'Screen production, warehouse, operations, and support staff with practical employer screening packages.',
    body: 'Manufacturing and warehouse employers often need fast hiring support for hourly, operations, production, and supervisory roles. SaffHire helps teams create screening workflows that are easy to repeat and easy for applicants to complete.',
    bullets: ['High-volume hiring support', 'Criminal search options', 'Drug screening options', 'Applicant-friendly workflow'],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality & Service Businesses',
    eyebrow: 'Hospitality',
    description: 'Support restaurants, hotels, service companies, and customer-facing teams with simple screening options.',
    body: 'Hospitality and service businesses need background screening that does not slow down hiring. SaffHire helps employers screen customer-facing, operations, and support roles with a process that keeps applicants moving.',
    bullets: ['Fast ordering support', 'Custom screening packages', 'Employment verification options', 'Simple applicant process'],
  },
  {
    slug: 'construction',
    title: 'Construction & Field Services',
    eyebrow: 'Construction',
    description: 'Screen field employees, crews, supervisors, and service workers with background check options that fit the role.',
    body: 'Construction and field service companies often hire for mobile, safety-sensitive, and customer-site roles. SaffHire helps employers choose screening options that support practical hiring decisions.',
    bullets: ['Criminal background checks', 'Drug screening options', 'Motor vehicle report options', 'Crew and field role support'],
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    eyebrow: 'Business Services',
    description: 'Support office, finance, administrative, sales, and client-facing hiring with employer screening services.',
    body: 'Professional service firms need screening that feels polished and easy for candidates. SaffHire helps employers screen office, administrative, finance, sales, and client-facing roles with clear package options.',
    bullets: ['Employment verification', 'Criminal search options', 'Applicant-friendly process', 'Clear status updates'],
  },
  {
    slug: 'small-business',
    title: 'Small Business Employers',
    eyebrow: 'Small Business',
    description: 'Simple background screening support for businesses that need help without a complicated platform or public pricing pressure.',
    body: 'Small businesses need screening help that is easy to understand and easy to start. SaffHire helps employers choose practical packages without making the process feel overwhelming.',
    bullets: ['Simple setup support', 'Custom package guidance', 'No public pricing pressure', 'Real human help'],
  },
];

export const faqs = [
  { question: 'What does SaffHire do?', answer: 'SaffHire provides employer background screening services, including criminal background checks, employment verification, drug screening, motor vehicle reports, and related screening options.' },
  { question: 'Does SaffHire serve companies outside Texas?', answer: 'Yes. SaffHire is based in Frisco, Texas and serves employers across all 50 states.' },
  { question: 'Does SaffHire show public pricing?', answer: 'Not at this time. Employers can request a quote so SaffHire can recommend screening options based on industry, volume, and hiring needs.' },
  { question: 'What industries does SaffHire serve?', answer: 'SaffHire supports many types of employers, including transportation, churches, nonprofits, staffing agencies, healthcare, manufacturing, hospitality, construction, professional services, and small businesses.' },
  { question: 'How should I get started?', answer: 'The fastest way is to call SaffHire at 888-588-1733. You can also submit the request-a-quote form online.' },
];
