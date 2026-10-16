export const dynamic = 'force-static';

const U = 'https://saffhire.com';

const body = `# SaffHire Background Screening

> SaffHire is a Veteran-Owned, FCRA-compliant pre-employment background screening company based in Frisco, TX, serving employers nationwide. Founded by Robert Krebsbach, John Waak and Jody Thigpen, SaffHire provides criminal background checks, employment and education verification, drug screening and MVR checks, with screening packages customized to each client's needs.

## Services

- [Background Screening Services](${U}/services): Overview of all SaffHire screening services for employers.
- [Criminal Background Checks](${U}/criminal-background-checks): County, state and federal criminal record searches for hiring decisions.
- [National Criminal Database Search](${U}/national-criminal-database-search): Multi-jurisdiction criminal database search including sex offender registries and watch lists.
- [County Criminal Background Checks](${U}/county-criminal-background-checks): Direct county court record searches in every jurisdiction where an applicant has lived.
- [Employment Verification](${U}/employment-verification): Confirmation of past employers, dates and job titles.
- [Education Verification](${U}/education-verification): Confirmation of degrees, diplomas and attendance.
- [Drug Screening](${U}/drug-screening): Pre-employment and ongoing drug testing programs.
- [MVR Checks](${U}/mvr-checks): Motor vehicle record reports for driving positions.
- [Healthcare Sanctions and OIG Checks](${U}/healthcare-sanctions-oig-checks): Exclusion and sanctions list screening for healthcare employers.
- [Standard Packages and Turnaround](${U}/packages): Standard screening packages and typical turnaround times, customized per client.

## Industries

- [Industries Served](${U}/industries): Overview of the industries SaffHire screens for.
- [Staffing](${U}/industries/staffing): High-volume, fast-turnaround screening for staffing agencies.
- [Healthcare](${U}/industries/healthcare): Screening and sanctions checks for healthcare organizations.
- [Transportation](${U}/industries/transportation): Driver screening including MVR and drug testing.
- [Manufacturing and Warehousing](${U}/industries/manufacturing): Screening for manufacturing and warehouse workforces.
- [Hospitality](${U}/industries/hospitality): Screening for hotels, restaurants and hospitality employers.
- [Energy](${U}/industries/energy): Screening for energy and oilfield employers.
- [Education](${U}/industries/education): Screening for schools and education employers.
- [Churches and Non-Profits](${U}/industries/church-nonprofit): Volunteer and staff screening for churches and non-profit organizations.
- [Small Business Background Checks](${U}/small-business-background-checks): Screening for small employers with no minimums.
- [Volunteer Background Checks](${U}/volunteer-background-checks): Background checks for volunteer programs.

## Company

- [Why SaffHire](${U}/why-saffhire): Who we are, our Veteran-Owned leadership and our approach to compliant screening.
- [FAQ](${U}/faq): Answers to common questions about background checks, turnaround and compliance.
- [Contact](${U}/contact): Request a custom quote or talk to the SaffHire team.

## Optional

- [Background Screening in Frisco, TX](${U}/background-screening-frisco-tx): Local screening services for Frisco-area employers.
- [Background Screening Guides](${U}/background-screening-guides): Guides on screening best practices and FCRA compliance.
- [Blog](${U}/blog): Articles on hiring, screening and FCRA updates.
`;

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
