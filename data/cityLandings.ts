export type CityFaq = { question: string; answer: string };
export type CityLink = { label: string; href: string };
export type CityCard = { title: string; body: string; href: string };

export type CityLanding = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  hero: string;
  whyTitle: string;
  whyParagraphs: string[];
  bullets: string[];
  searchesTitle: string;
  searchesParagraphs: string[];
  hqTitle: string;
  hqParagraphs: string[];
  localTitle: string;
  localParagraphs: string[];
  startTitle: string;
  startParagraphs: string[];
  serviceCards: CityCard[];
  faqTitle: string;
  faqs: CityFaq[];
  related: CityLink[];
  serviceArea: string;
};

export const minutesBullet =
  "These searches usually return in minutes: Motor Vehicle Reports, Sex Offender registry searches, Global Security Watch List searches, SSN traces, state database searches, and National Criminal Database searches.";

export const serviceCards: CityCard[] = [
  {
    title: "Criminal Background Checks",
    href: "/criminal-background-checks",
    body: "National criminal database, federal, state, and county searches for the jurisdictions where the applicant has lived.",
  },
  {
    title: "County Criminal Searches",
    href: "/county-criminal-background-checks",
    body: "Court-record searches in the counties on the applicant's address history. Timing depends on the court.",
  },
  {
    title: "Employment Verification",
    href: "/employment-verification",
    body: "Confirmation of prior employers, dates of employment, and job titles when the prior employer provides that information.",
  },
  {
    title: "Education Verification",
    href: "/education-verification",
    body: "Confirmation of degrees, diplomas, and attendance with the school. Timing depends on the school.",
  },
  {
    title: "Drug Screening",
    href: "/drug-screening",
    body: "Pre-employment, random, post-accident, and reasonable-suspicion testing, DOT and non-DOT. Testing is performed at Labcorp facilities.",
  },
  {
    title: "MVR Checks",
    href: "/mvr-checks",
    body: "Motor vehicle reports for license status and driving history. State fees may apply.",
  },
];

export const sharedRelated: CityLink[] = [
  { label: "Staffing agency background checks", href: "/industries/staffing" },
  { label: "FAQ", href: "/faq" },
  { label: "Texas background checks", href: "/background-checks-texas" },
  { label: "Criminal background checks", href: "/criminal-background-checks" },
  { label: "National criminal database search", href: "/national-criminal-database-search" },
  { label: "County criminal background checks", href: "/county-criminal-background-checks" },
  { label: "Employment verification", href: "/employment-verification" },
  { label: "Education verification", href: "/education-verification" },
  { label: "Drug screening", href: "/drug-screening" },
  { label: "MVR checks", href: "/mvr-checks" },
  { label: "Standard packages and turnaround", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

export const friscoLanding: CityLanding = {
  path: "/background-screening-frisco-tx",
  seoTitle: "Frisco, TX Background Screening for Employers",
  seoDescription:
    "Background screening for Frisco, TX employers. SaffHire is headquartered in Frisco, TX and screens applicants for employers nationwide.",
  eyebrow: "FRISCO, TX",
  h1: "Background Screening Services for Frisco, TX Businesses",
  hero:
    "SaffHire provides background screening for employers in Frisco, TX and for employers nationwide. SaffHire is headquartered in Frisco, TX. A Frisco employer uses the same client portal, the same FCRA-compliant screening workflows, and the same searches as a client in any other U.S. city. This page is local context for Frisco employers. The service area is the United States.",
  whyTitle: "Why Frisco employers use SaffHire",
  whyParagraphs: [
    "Frisco employers hire for staffing, healthcare, professional services, technology, and operational roles. Applicants may have lived in Collin County, in Dallas County, in another Texas county, or in another state. A criminal search is ordered for the jurisdictions where the applicant has lived, including jurisdictions outside Frisco.",
    "SaffHire was founded by Robert Krebsbach, John Waak, and Jody Thigpen. Frisco employers order criminal background checks, employment verification, education verification, drug screening, and motor vehicle records from one portal. Packages are customized to each client's needs. There are no setup fees and no minimums, and the client portal is available 24/7. Our screening platform is SOC 2 Type 2 audited (SSAE 18).",
  ],
  bullets: [
    minutesBullet,
    "County and state criminal searches cover the jurisdictions where the applicant has lived. Court access fees may apply and are passed through.",
    "FCRA-compliant screening workflows collect a standalone disclosure and the applicant's written authorization before a report is ordered.",
    "Employers remain responsible for their own hiring decisions and legal compliance. Data is protected with bank-level encryption.",
  ],
  searchesTitle: "Searches Frisco employers order",
  searchesParagraphs: [
    "[Criminal background checks](/criminal-background-checks) can include a [national criminal database search](/national-criminal-database-search), a federal search, and state and [county criminal searches](/county-criminal-background-checks). National databases are aggregated and incomplete, so many employers add county searches for the counties where the applicant has lived. A Frisco hire whose address history includes Dallas County, another Texas county, or another state is screened in those jurisdictions, not only in Collin County.",
    "[Employment verification](/employment-verification) confirms prior employers, dates of employment, and job titles when the prior employer provides that information. [Education verification](/education-verification) confirms degrees, diplomas, and attendance with the school. Timing for verifications depends on the prior employer or the school. County search timing depends on the court.",
    "[Drug screening](/drug-screening) is ordered in the SaffHire portal. Testing is performed at Labcorp facilities, and results are delivered through the portal. Employers can order pre-employment, random, post-accident, and reasonable-suspicion tests, including DOT and non-DOT programs. [MVR checks](/mvr-checks) report license status and driving history from the state. State fees may apply to motor vehicle reports.",
    "Healthcare employers can add [healthcare sanctions and OIG checks](/healthcare-sanctions-oig-checks). Staffing firms that place candidates for Frisco clients, and for clients in other cities, can review [staffing agency background checks](/industries/staffing). Published average turnaround for standard packages is on [Standard Packages and Turnaround](/packages): packages range from 1 day to 2-5 days depending on the searches included. Common questions are on the [FAQ](/faq).",
  ],
  hqTitle: "Headquartered in Frisco, TX, serving employers nationwide",
  hqParagraphs: [
    "SaffHire is headquartered in Frisco, TX. The service area is nationwide. Use Frisco, TX when you describe where SaffHire is based. A Frisco staffing firm, clinic, professional-services firm, or operations team can screen an applicant who lived in Plano, Dallas, McKinney, Allen, another Texas city, or another state. Federal, state, and county searches follow the applicant's address history.",
    "Statewide rules that matter to Frisco employers are summarized on the [Texas background checks](/background-checks-texas) page. That page explains that Texas employers follow the federal Fair Credit Reporting Act when they use a screening company, that Texas DPS conviction and deferred adjudication records are public information, and why county searches are often added to a statewide repository search. This is general information, not legal advice. Employers remain responsible for their own hiring decisions and legal compliance.",
    "Ordering works the same way for a Frisco employer as it does for every other client. The employer enters the applicant's name and email in the portal. SaffHire sends the applicant a secure link to enter personal information and sign the required FCRA disclosure and authorization. Results are delivered to the employer's portal. There is no minimum number of orders.",
  ],
  localTitle: "How Frisco employers put a package together",
  localParagraphs: [
    "Tell SaffHire which roles you fill, which states your applicants have lived or worked in, and any client, insurance, or regulatory requirements. A staffing order may start with the national criminal database search, a sex offender registry search, a global watch list search, and an SSN trace, then add county searches for the counties on the address history. A driving role adds a motor vehicle report. A healthcare role can add an OIG exclusion check. A professional role may add employment verification and education verification.",
    "Standard packages are starting points. SaffHire customizes the package to the client's needs and sends a custom quote. SaffHire does not publish prices. Neighboring cities have their own local pages for the same nationwide service: [Dallas](/background-screening-dallas-tx), [Plano](/background-screening-plano-tx), [McKinney](/background-screening-mckinney-tx), and [Allen](/background-screening-allen-tx). The [services overview](/services) lists the searches. [Contact SaffHire](/contact) when you want a package built for the roles you hire in Frisco and elsewhere.",
    "Frisco is the headquarters city, and it is also one hiring market among many. An applicant for a Frisco job may have a short local history or a history that runs through several states. The report follows that history. SaffHire's invitation workflow collects the disclosure and authorization before the report is ordered, and the employer reviews the result in the portal before making a hiring decision.",
  ],
  startTitle: "What to have ready before you request a quote",
  startParagraphs: [
    "A useful quote starts with the work. Note whether you hire through a staffing desk, a clinic, a professional office, or an operations team. Note whether any roles involve driving, patient care, or client sites outside Frisco. Note the states that show up on applications. SaffHire uses that information to recommend searches and to explain which results depend on a court, a prior employer, or a school.",
    "You can call (888) 588-1733, email info@saffhire.com, or use the [contact page](/contact). If you want the published package list first, open [Standard Packages and Turnaround](/packages), then the [FAQ](/faq), then the [Texas background checks](/background-checks-texas) page. Staffing companies should also read [staffing agency background checks](/industries/staffing) before the first order.",
  ],
  serviceCards,
  faqTitle: "Questions from Frisco employers",
  faqs: [
    {
      question: "Does SaffHire only screen employers in Frisco, TX?",
      answer:
        "SaffHire is headquartered in Frisco, TX and serves employers nationwide. Frisco employers use the same portal and the same searches as clients in other cities and states. This page is local context for Frisco. It describes the headquarters city and the searches Frisco employers order.",
    },
    {
      question: "Which criminal searches can a Frisco employer order?",
      answer:
        "Employers can order a [national criminal database search](/national-criminal-database-search), federal, state, and [county criminal searches](/county-criminal-background-checks), a Sex Offender registry search, and a Global Security Watch List search. County and state searches follow the jurisdictions where the applicant has lived. That may be outside Collin County and outside Texas. See [criminal background checks](/criminal-background-checks).",
    },
    {
      question: "How do staffing agencies in Frisco order screening?",
      answer:
        "Staffing agencies order screening from the SaffHire portal for the candidates they place, including candidates who will work outside Frisco. Read [staffing agency background checks](/industries/staffing) for high-volume hiring, and the [FAQ](/faq) for turnaround and compliance questions. Packages are customized to each client's needs.",
    },
    {
      question: "Where can Frisco employers read Texas screening rules?",
      answer:
        "Read [Texas background checks](/background-checks-texas) for statewide rules written for employers, including the federal Fair Credit Reporting Act and public Texas DPS records. This Frisco page is local context for ordering. This is general information, not legal advice. Employers remain responsible for their own hiring decisions and legal compliance.",
    },
  ],
  related: [
    ...sharedRelated,
    { label: "Dallas background screening", href: "/background-screening-dallas-tx" },
    { label: "Plano background screening", href: "/background-screening-plano-tx" },
    { label: "McKinney background screening", href: "/background-screening-mckinney-tx" },
    { label: "Allen background screening", href: "/background-screening-allen-tx" },
  ],
  serviceArea: "Frisco employers and employers nationwide",
};

export const dallasLanding: CityLanding = {
  path: "/background-screening-dallas-tx",
  seoTitle: "Dallas, TX Background Screening for Employers",
  seoDescription:
    "Background screening for Dallas, TX employers. SaffHire is headquartered in Frisco, TX and serves Dallas employers and employers nationwide.",
  eyebrow: "DALLAS, TX",
  h1: "Background Screening Services for Dallas, TX Businesses",
  hero:
    "SaffHire screens applicants for Dallas, TX employers and for employers nationwide. SaffHire is headquartered in Frisco, TX. Dallas employers use the same portal and the same FCRA-compliant screening workflows as clients everywhere else in the United States. This page explains how Dallas employers order screening. It is local context, and the service area stays nationwide.",
  whyTitle: "Background screening for Dallas employers",
  whyParagraphs: [
    "Dallas employers hire across healthcare, staffing, logistics, hospitality, financial services, and professional offices. An applicant for a Dallas job may have lived in Dallas County, in Collin County, in another Texas county, or outside Texas. SaffHire orders criminal searches for the jurisdictions on that address history, so a Dallas job is not limited to a Dallas County search when the applicant lived somewhere else.",
    "SaffHire was founded by Robert Krebsbach, John Waak, and Jody Thigpen and is headquartered in Frisco, TX. Dallas is a market SaffHire serves. It is not a second headquarters. Dallas employers order criminal background checks, employment verification, education verification, drug screening, and motor vehicle records in the same portal used by clients in other states. There are no setup fees and no minimums. The client portal is available 24/7. Our screening platform is SOC 2 Type 2 audited (SSAE 18).",
  ],
  bullets: [
    minutesBullet,
    "State and county searches follow the applicant's address history, including Dallas County when the applicant lived there and other counties when the history shows them.",
    "Court access fees may apply to state and county searches and are passed through. State fees may apply to motor vehicle reports.",
    "The applicant receives a standalone FCRA disclosure and provides written authorization through SaffHire's invitation workflow before the report is ordered.",
  ],
  searchesTitle: "Searches Dallas employers commonly add",
  searchesParagraphs: [
    "A [national criminal database search](/national-criminal-database-search) is often the starting point, together with an SSN trace, a Sex Offender registry search, and a Global Security Watch List search. National databases are aggregated and incomplete, so many Dallas employers add [county criminal background checks](/county-criminal-background-checks) for each county where the applicant has lived. If that history includes Dallas County, the county search is ordered there. If it includes other Texas counties or other states, those jurisdictions are ordered too. The full criminal offering is described on [criminal background checks](/criminal-background-checks).",
    "Logistics and other driving roles add [MVR checks](/mvr-checks) for license status and driving history. Healthcare employers can add [healthcare sanctions and OIG checks](/healthcare-sanctions-oig-checks) to a package that also includes the criminal searches the role requires. Hospitality and customer-facing roles often use the same criminal and verification searches as other industries. The [industries overview](/industries) shows how screening is organized by type of employer.",
    "[Employment verification](/employment-verification) and [education verification](/education-verification) check what the applicant reported. Drug screens are ordered in the portal, collected at Labcorp, and returned through the portal. See [drug screening](/drug-screening) for pre-employment, random, post-accident, and reasonable-suspicion testing, including DOT and non-DOT options.",
    "Staffing agencies that fill Dallas openings, including openings for client sites in other cities, should read [staffing agency background checks](/industries/staffing). Average turnaround for standard packages is published on [Standard Packages and Turnaround](/packages), from 1 day to 2-5 days depending on the package. County searches and verifications still depend on courts, prior employers, and schools. The [FAQ](/faq) answers the questions employers ask before the first order.",
  ],
  hqTitle: "Frisco, TX headquarters, Dallas employers included",
  hqParagraphs: [
    "Describe SaffHire's location as Frisco, TX. Dallas employers are served from that headquarters on a nationwide platform. A Dallas clinic, warehouse, staffing desk, hotel, or professional office orders the same way a client in another state orders. The report covers the applicant's history, which is why a candidate who moved to Dallas from another state is not screened as if they had always lived in Dallas County.",
    "The [Texas background checks](/background-checks-texas) page is the statewide companion to this Dallas page. It covers the federal Fair Credit Reporting Act, public Texas DPS conviction and deferred adjudication records, and the practice of adding county searches to a repository search. This is general information, not legal advice. Employers remain responsible for their own hiring decisions and legal compliance.",
    "The employer enters the applicant's name and email. SaffHire emails a secure link so the applicant can submit personal information and sign the disclosure and authorization. The completed report is posted to the employer's portal. Dallas employers who also hire in Frisco, Plano, McKinney, or Allen can use the same account for those orders.",
  ],
  localTitle: "Dallas hiring situations this page is written for",
  localParagraphs: [
    "A healthcare office in Dallas may need a criminal search, an OIG exclusion check, and employment verification for clinical and front-office roles. A logistics employer may need a motor vehicle report along with the criminal searches tied to the driver's address history. A hospitality employer may screen customer-facing staff with the same FCRA workflow used for every other role. A staffing firm may place several candidates in a day and needs the portal available 24/7, with packages set per client rather than one package for every job.",
    "None of those examples changes the headquarters. SaffHire is headquartered in Frisco, TX. None of them limits service to Dallas. The same account screens applicants for employers nationwide. Local pages for [Frisco](/background-screening-frisco-tx), [Plano](/background-screening-plano-tx), [McKinney](/background-screening-mckinney-tx), and [Allen](/background-screening-allen-tx) give the same kind of context for those cities.",
    "When you ask for a quote, describe the Dallas roles, the states on recent applications, and any client or regulatory requirement. SaffHire recommends a package from that description. Standard packages on the [packages page](/packages) are starting points. SaffHire does not publish prices. [Contact SaffHire](/contact) to request the quote, or start from the [services overview](/services) if you want the full search list first.",
  ],
  startTitle: "Before a Dallas employer places the first order",
  startParagraphs: [
    "Decide who will invite applicants, who will read reports, and which roles share a package. A driver package and a front-office package are built from different searches. Write down whether DOT drug testing, an OIG check, or an MVR belongs on the order. SaffHire will match those requirements to searches and will tell you which results wait on a court, a prior employer, or a school.",
    "Read the [FAQ](/faq) for how screening works, the [Texas background checks](/background-checks-texas) page for statewide rules, and [staffing agency background checks](/industries/staffing) if a staffing desk will place the orders. Call (888) 588-1733 or email info@saffhire.com if you would rather walk through the roles with the team.",
  ],
  serviceCards,
  faqTitle: "Questions from Dallas employers",
  faqs: [
    {
      question: "Is SaffHire based in Dallas?",
      answer:
        "SaffHire is headquartered in Frisco, TX and serves Dallas employers as part of a nationwide service area. Dallas employers use the same portal, workflows, and searches as clients in other cities. There is a separate page for [Frisco background screening](/background-screening-frisco-tx) because Frisco is the headquarters city.",
    },
    {
      question: "Will a Dallas background check include only Dallas County?",
      answer:
        "County and state searches follow the jurisdictions where the applicant has lived. If the address history includes Dallas County, a county search can be ordered there. If the applicant also lived in other counties or other states, those jurisdictions can be ordered too. Start with [county criminal background checks](/county-criminal-background-checks) and [criminal background checks](/criminal-background-checks).",
    },
    {
      question: "Can a Dallas staffing agency screen candidates for clients outside Dallas?",
      answer:
        "Yes. Staffing agencies order in the SaffHire portal for the candidates they place, including placements outside Dallas and outside Texas. See [staffing agency background checks](/industries/staffing) and the [FAQ](/faq). Packages are customized to each client's needs, with no setup fees and no minimums.",
    },
    {
      question: "Where are Texas rules explained for Dallas employers?",
      answer:
        "The [Texas background checks](/background-checks-texas) page summarizes statewide rules for employers, including the federal Fair Credit Reporting Act and public Texas DPS records. This Dallas page is the local ordering context. This is general information, not legal advice.",
    },
  ],
  related: [
    ...sharedRelated,
    { label: "Frisco background screening", href: "/background-screening-frisco-tx" },
    { label: "Plano background screening", href: "/background-screening-plano-tx" },
    { label: "Healthcare background screening", href: "/industries/healthcare" },
    { label: "Transportation background screening", href: "/industries/transportation" },
  ],
  serviceArea: "Dallas employers and employers nationwide",
};

export const planoLanding: CityLanding = {
  path: "/background-screening-plano-tx",
  seoTitle: "Plano, TX Background Screening for Employers",
  seoDescription:
    "Background screening for Plano, TX employers. SaffHire is headquartered in Frisco, TX and serves Plano employers and employers nationwide.",
  eyebrow: "PLANO, TX",
  h1: "Background Screening Services for Plano, TX Businesses",
  hero:
    "SaffHire provides background screening for Plano, TX employers and for employers nationwide. SaffHire is headquartered in Frisco, TX, in the same Collin County area where many Plano applicants have lived or worked. Plano employers use the same FCRA-compliant workflows and the same portal as every other SaffHire client. This page is local context. Service is not limited to Plano.",
  whyTitle: "Background screening for Plano employers",
  whyParagraphs: [
    "Plano employers hire for corporate, technology, healthcare, professional services, and staffing roles. Applicants may show address history in Collin County, in Dallas County, and in other states. SaffHire orders searches for the jurisdictions on that history. A Plano job title does not, by itself, decide which courthouses are searched.",
    "SaffHire was founded by Robert Krebsbach, John Waak, and Jody Thigpen. The headquarters is Frisco, TX. Plano employers are clients of that nationwide service. They order criminal background checks, employment verification, education verification, drug screening, and motor vehicle records without a setup fee and without a minimum. The portal is available 24/7. Our screening platform is SOC 2 Type 2 audited (SSAE 18).",
  ],
  bullets: [
    minutesBullet,
    "Employment and education verification are common on professional and corporate roles. Timing depends on the prior employer or the school.",
    "County searches are added for the counties where the applicant lived, in Collin County, Dallas County, or elsewhere. Court access fees may apply and are passed through.",
    "Employers remain responsible for hiring decisions and legal compliance. SaffHire provides the FCRA disclosure and authorization workflow.",
  ],
  searchesTitle: "Searches Plano employers use for different roles",
  searchesParagraphs: [
    "Corporate and professional roles in Plano often include [employment verification](/employment-verification) and [education verification](/education-verification) along with a criminal search. Verification confirms dates, titles, degrees, diplomas, and attendance when the source responds. It does not replace the criminal search. [Criminal background checks](/criminal-background-checks) still include the [national criminal database search](/national-criminal-database-search) and, when ordered, federal, state, and [county](/county-criminal-background-checks) searches.",
    "National databases are aggregated and incomplete, so many employers add county searches. For a Plano applicant, those counties might include Collin County, Dallas County, and counties outside Texas. Sex Offender registry searches, Global Security Watch List searches, SSN traces, state database searches, National Criminal Database searches, and Motor Vehicle Reports usually return in minutes. County timing depends on the court.",
    "Healthcare offices in Plano can add [healthcare sanctions and OIG checks](/healthcare-sanctions-oig-checks). Roles that involve driving add [MVR checks](/mvr-checks). [Drug screening](/drug-screening) is ordered in the portal and performed at Labcorp, including pre-employment and DOT-related options when the employer requests them. Staffing partners who support Plano clients should read [staffing agency background checks](/industries/staffing), because a staffing package is often set per client rather than once for the whole agency.",
    "Published averages for standard packages are on [Standard Packages and Turnaround](/packages), from 1 day to 2-5 days depending on what the package contains. The [FAQ](/faq) explains how to read those ranges. The [services overview](/services) is the full list if you are comparing searches before you request a quote.",
  ],
  hqTitle: "Frisco, TX is the headquarters. Plano is a client market.",
  hqParagraphs: [
    "SaffHire is headquartered in Frisco, TX. Plano employers are part of the nationwide service area. When you name SaffHire's location, use Frisco, TX. The [Frisco background screening](/background-screening-frisco-tx) page is the headquarters page. This Plano page explains how employers in Plano order the same services, including applicants whose history reaches [Dallas](/background-screening-dallas-tx) or other states.",
    "Texas employers, including Plano employers, can read [Texas background checks](/background-checks-texas) for the federal Fair Credit Reporting Act, public Texas DPS conviction and deferred adjudication records, and the reason county searches are paired with a statewide repository search. This is general information, not legal advice. Employers remain responsible for their own hiring decisions and legal compliance.",
    "An employer in Plano enters the applicant's name and email in the portal. The applicant opens a secure link, enters personal information, and signs the FCRA disclosure and authorization. Results return to the employer's portal. The same account can be used for hires in Plano, in other Collin County cities such as [McKinney](/background-screening-mckinney-tx) and [Allen](/background-screening-allen-tx), and for hires outside Texas.",
  ],
  localTitle: "Building a Plano screening package",
  localParagraphs: [
    "A Plano professional-services firm may want employment verification, education verification, and county searches for every county on the address history. A Plano healthcare office may want those searches plus an OIG exclusion check. A Plano staffing desk may want a base package for light-industrial placements and a wider package for professional placements, both ordered from the same portal. A role that includes driving adds a motor vehicle report. SaffHire customizes those packages. Standard packages are the starting list, not a requirement to buy every search.",
    "SaffHire does not publish prices. Request a custom quote with the roles, the states where applicants have lived or worked, and any client or regulatory requirement. [Contact SaffHire](/contact) or call (888) 588-1733. There are no setup fees and no minimums, so a Plano employer can start with the roles it is hiring now and add searches later when a new role needs them.",
    "Keep the geography straight when you brief a colleague. The applicant might live in Plano, the job might be in Plano, and SaffHire's headquarters is Frisco, TX. The screening service still covers employers nationwide. County searches follow the applicant. They are not limited to the city on the job requisition, and they are not limited to the headquarters city.",
  ],
  startTitle: "What Plano employers usually send with a quote request",
  startParagraphs: [
    "List the role families you hire: professional, healthcare, staffing placements, drivers, or operations. List the states that appear on applications. Say whether a client contract requires a county search, a drug screen, or an MVR. That is enough for SaffHire to recommend a package and to point you to the published turnaround ranges. If a search depends on a court, a school, or a prior employer, the quote conversation will say that.",
    "Useful pages before that conversation: the [FAQ](/faq), [Texas background checks](/background-checks-texas), [staffing agency background checks](/industries/staffing), and [Standard Packages and Turnaround](/packages). Email info@saffhire.com if you want the recommendation in writing.",
  ],
  serviceCards,
  faqTitle: "Questions from Plano employers",
  faqs: [
    {
      question: "Is SaffHire's office in Plano?",
      answer:
        "SaffHire is headquartered in Frisco, TX and serves employers nationwide, including Plano employers. Use Frisco, TX for the headquarters. The [Frisco background screening](/background-screening-frisco-tx) page is the headquarters page. This page is local context for Plano employers.",
    },
    {
      question: "Do Plano criminal searches stay inside Collin County?",
      answer:
        "County and state searches follow where the applicant has lived. That can include Collin County, Dallas County, and jurisdictions outside Texas. Read [county criminal background checks](/county-criminal-background-checks) and the [national criminal database search](/national-criminal-database-search). National databases are aggregated and incomplete, so many employers add county searches.",
    },
    {
      question: "Can Plano staffing firms screen candidates for other cities?",
      answer:
        "Yes. A staffing agency orders in the SaffHire portal for the candidates it places, whether the assignment is in Plano or somewhere else in the country. See [staffing agency background checks](/industries/staffing) and the [FAQ](/faq). Packages are customized to each client's needs.",
    },
    {
      question: "Which page explains Texas rules for a Plano employer?",
      answer:
        "Use [Texas background checks](/background-checks-texas) for statewide employer rules, including the federal Fair Credit Reporting Act and public Texas DPS records. Use this Plano page for local ordering context, and the [FAQ](/faq) for how screening and turnaround work. This is general information, not legal advice.",
    },
  ],
  related: [
    ...sharedRelated,
    { label: "Frisco background screening", href: "/background-screening-frisco-tx" },
    { label: "Dallas background screening", href: "/background-screening-dallas-tx" },
    { label: "McKinney background screening", href: "/background-screening-mckinney-tx" },
    { label: "Allen background screening", href: "/background-screening-allen-tx" },
  ],
  serviceArea: "Plano employers and employers nationwide",
};
