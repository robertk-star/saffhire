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
  { label: 'Why SaffHire', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries/trucking' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  { slug: 'criminal-background-checks', title: 'Criminal Background Checks', description: 'County, state, national, and federal criminal search options for employer background screening programs.', bullets: ['County criminal searches', 'Federal criminal searches', 'National criminal database searches', 'Sex offender registry searches', 'Watch list options'], intro: 'SaffHire helps employers run criminal background checks with a process designed to be simple for your team and secure for applicants.' },
  { slug: 'employment-verification', title: 'Employment Verification', description: 'Verification support to help confirm candidate employment history and reduce hiring uncertainty.', bullets: ['Prior employer verification', 'Candidate-reported history review', 'Documentation-focused workflows', 'Clear status updates'], intro: 'Employment verification helps employers compare candidate-provided information against available employer records.' },
  { slug: 'drug-screening', title: 'Drug Screening', description: 'Drug and alcohol testing options for employers that need a practical screening process.', bullets: ['5-panel options', '10-panel options', 'Alcohol testing options', 'Employer-friendly ordering support'], intro: 'SaffHire supports drug screening workflows that are built for employer needs, candidate communication, and practical turnaround expectations.' },
];

export const industries = [
  { slug: 'trucking', title: 'Background Checks for Trucking Companies', eyebrow: 'Trucking & Transportation', description: 'Screen drivers and transportation employees with checks built around safety-sensitive hiring needs.', bullets: ['Motor vehicle report options', 'Criminal search packages', 'Drug screening workflows', 'Fast ordering support'], body: 'Trucking companies need screening that is fast, organized, and easy to repeat. SaffHire helps transportation employers review drivers and support roles with packages that can include criminal searches, motor vehicle reports, drug screening, and verification options.' },
  { slug: 'churches', title: 'Background Checks for Churches and Nonprofits', eyebrow: 'Churches & Nonprofits', description: 'Affordable screening support for staff, volunteers, ministry workers, and nonprofit teams.', bullets: ['Volunteer screening support', 'Staff background checks', 'Church and nonprofit packages', 'Simple applicant process'], body: 'Churches and nonprofits need screening that is easy to use, affordable, and respectful of applicants and volunteers. SaffHire helps organizations create a practical process for staff, volunteer, and ministry-related screening needs.' },
  { slug: 'staffing', title: 'Background Checks for Staffing Agencies', eyebrow: 'Staffing Agencies', description: 'Flexible screening support for staffing firms that need repeatable workflows and fast response.', bullets: ['High-volume ordering support', 'Custom packages', 'Applicant-friendly digital process', 'No setup or subscription fees'], body: 'Staffing agencies need a background screening partner that can move quickly without making the process harder. SaffHire helps staffing teams order checks, manage candidate information, and support clients with clear screening options.' },
];

export const faqs = [
  { question: 'What does SaffHire do?', answer: 'SaffHire provides employer background screening services, including criminal background checks, employment verification, drug screening, motor vehicle reports, and related screening options.' },
  { question: 'Does SaffHire serve companies outside Texas?', answer: 'Yes. SaffHire is based in Texas and serves employers across all 50 states.' },
  { question: 'Does SaffHire show public pricing?', answer: 'Not on this website. Employers can request a quote so SaffHire can recommend screening options based on their hiring needs.' },
  { question: 'Is there a setup fee or subscription fee?', answer: 'SaffHire focuses on simple screening programs and no public pricing is listed here. Contact SaffHire for current package details and account setup information.' },
  { question: 'Who should request a quote?', answer: 'Employers, staffing agencies, trucking companies, churches, nonprofits, and other organizations that need background screening support should request a quote.' },
];
