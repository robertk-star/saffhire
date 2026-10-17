import type { ContentPageData, ContentSection } from "@/components/ContentPage";
import type { FAQEntry } from "@/components/PageFAQ";

/**
 * Check-type pages. `standalone` pages render with ContentPage; `upgrade` entries add
 * long-form sections + FAQ under an existing legacy service page.
 */

const FCRA_SHORT =
  "Before ordering, the employer gives the applicant a standalone written disclosure and gets written authorization; SaffHire's invitation workflow collects both electronically. Employers remain responsible for their own hiring decisions and legal compliance.";
const COURT_FEES = "Court access fees may apply to State and County searches; these are pass-through fees.";
const NO_FEES = "There are no setup fees and no minimums.";
const DRUG_OFFER =
  "SaffHire offers pre-employment, random, post-accident and reasonable-suspicion drug testing through certified labs nationwide, with DOT and non-DOT programs and instant result options.";

export type CheckPage = ContentPageData & {
  path: string;
  serviceName: string;
  metaTitle: string;
  description: string;
  parent?: { name: string; path: string };
};

const criminalLinks = [
  { label: "Criminal Background Checks", href: "/criminal-background-checks" },
  { label: "National Criminal Database Search", href: "/national-criminal-database-search" },
  { label: "County Criminal Searches", href: "/county-criminal-background-checks" },
  { label: "State Criminal Searches", href: "/state-criminal-background-checks" },
  { label: "Federal Criminal Searches", href: "/federal-criminal-background-checks" },
  { label: "Global Watch List Search", href: "/global-watch-list-search" },
];
const drugLinks = [
  { label: "Drug Screening", href: "/drug-screening" },
  { label: "DOT Drug Testing", href: "/dot-drug-testing" },
  { label: "Random Drug Testing", href: "/random-drug-testing" },
  { label: "Instant Drug Testing", href: "/instant-drug-testing" },
];

export const checkPages: CheckPage[] = [
  // ---------- Drug testing ----------
  {
    path: "/dot-drug-testing",
    serviceName: "DOT Drug and Alcohol Testing",
    metaTitle: "DOT Drug Testing for Employers | SaffHire",
    description:
      "DOT drug and alcohol testing for transportation employers: pre-employment, random, post-accident, reasonable-suspicion and return-to-duty testing through certified labs nationwide.",
    parent: { name: "Drug Screening", path: "/drug-screening" },
    eyebrow: "DRUG TESTING",
    h1: "DOT Drug Testing for Employers",
    intro:
      "Employers with safety-sensitive transportation roles, such as commercial drivers, must follow federal Department of Transportation (DOT) testing rules. SaffHire offers DOT drug and alcohol testing through certified labs nationwide as part of DOT-related screening packages.",
    quickAnswer:
      "DOT drug testing is federally required testing for safety-sensitive transportation employees. It follows the DOT's procedures in 49 CFR Part 40 and the rules of the employer's DOT agency, such as FMCSA for commercial motor carriers. SaffHire offers DOT drug and alcohol testing, including pre-employment, random, post-accident, reasonable-suspicion and return-to-duty testing.",
    sections: [
      {
        heading: "Who Needs DOT Drug Testing",
        paragraphs: [
          "DOT testing applies to employees who perform safety-sensitive functions regulated by a DOT agency. The best-known group is commercial motor vehicle drivers who need a commercial driver's license (CDL) and fall under the Federal Motor Carrier Safety Administration (FMCSA). Other DOT agencies cover aviation, rail, transit, pipeline and maritime workers. Your DOT agency's rules decide which employees are covered.",
        ],
      },
      {
        heading: "DOT Test Types",
        bullets: [
          "Pre-employment: a covered employee must have a verified negative drug test result before first performing safety-sensitive functions.",
          "Random: covered employees are selected at random and tested unannounced throughout the year. See [random drug testing](/random-drug-testing).",
          "Post-accident: required after certain accidents as defined by the DOT agency's rules.",
          "Reasonable suspicion: required when a trained supervisor observes specific signs of possible drug or alcohol use.",
          "Return-to-duty and follow-up: required after a violation, following the return-to-duty process.",
        ],
      },
      {
        heading: "How DOT Testing Differs from Non-DOT Testing",
        paragraphs: [
          "DOT-required tests must follow the federal procedures in 49 CFR Part 40, including the collection process, laboratory testing and Medical Review Officer review. The DOT panel and cutoffs are set by federal rule, and employers cannot add their own drugs to a DOT test. Point-of-collection instant tests are not used for DOT-required drug tests. Employers can still run separate non-DOT testing under their own policy for roles that are not DOT-covered.",
        ],
      },
      {
        heading: "Other DOT Screening for Drivers",
        paragraphs: [
          "Driver hiring usually combines drug and alcohol testing with other checks. SaffHire's DOT-related packages for drivers and transportation professionals include [MVR checks](/mvr-checks), drug and alcohol testing, and criminal history searches. MVRs usually return in minutes; state fees may apply. Motor carriers also have their own FMCSA obligations, such as Drug and Alcohol Clearinghouse queries, that the carrier is responsible for.",
        ],
      },
      {
        heading: "Why Employers Choose SaffHire",
        paragraphs: [
          "SaffHire is a Veteran-Owned company headquartered in Frisco, TX and serving employers nationwide. Packages are customized to each client's needs, the portal is available 24/7, and there are no setup fees and no minimums.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you offer DOT-compliant screening for transportation companies?",
        answer:
          "Yes. We offer DOT-related background screening packages for drivers and transportation professionals, including MVR checks, drug and alcohol testing, and criminal history searches.",
      },
      {
        question: "Can a DOT pre-employment drug test be an instant test?",
        answer:
          "No. DOT-required drug tests follow the federal procedures in 49 CFR Part 40 with laboratory testing and Medical Review Officer review. Instant result options are for non-DOT testing under an employer's own policy.",
      },
      {
        question: "Can we use one program for DOT and non-DOT employees?",
        answer:
          "You can work with SaffHire for both, but DOT-covered employees must be tested under DOT rules and non-DOT employees under your company policy. Keep the two programs separate.",
      },
      { question: "Do you offer random testing?", answer: DRUG_OFFER },
    ],
    relatedLinks: [...drugLinks, { label: "Transportation Screening", href: "/industries/transportation" }],
  },
  {
    path: "/random-drug-testing",
    serviceName: "Random Drug Testing",
    metaTitle: "Random Drug Testing Programs for Employers | SaffHire",
    description:
      "Random drug testing for DOT-regulated and non-DOT workforces through certified labs nationwide, from SaffHire, a Veteran-Owned screening company in Frisco, TX.",
    parent: { name: "Drug Screening", path: "/drug-screening" },
    eyebrow: "DRUG TESTING",
    h1: "Random Drug Testing",
    intro:
      "Random drug testing selects employees unannounced from a defined pool. SaffHire offers random drug testing through certified labs nationwide for DOT-regulated and non-DOT workforces.",
    quickAnswer:
      "Random drug testing means employees in a testing pool are selected by a random process and tested without advance notice. It is required for DOT-covered safety-sensitive employees and is an option employers can adopt by policy for other roles.",
    sections: [
      {
        heading: "How Random Testing Works",
        bullets: [
          "Define the testing pool: which employees or roles are covered. DOT-covered employees belong in a DOT pool; other employees can be in a separate non-DOT pool.",
          "Select employees with a truly random method, so every employee in the pool has an equal chance each time.",
          "Notify selected employees and send them to collection promptly.",
          "Keep records of selections and results, and review results under your written policy.",
        ],
      },
      {
        heading: "DOT Random Testing",
        paragraphs: [
          "For DOT-covered employees, random testing is mandatory. The responsible DOT agency sets the minimum annual random testing rates, and tests must follow 49 CFR Part 40. See [DOT drug testing](/dot-drug-testing) for the other required test types.",
        ],
      },
      {
        heading: "Non-DOT Random Testing",
        paragraphs: [
          "Outside DOT rules, random testing is a company policy decision. State laws on workplace testing vary, including rules on notice, which employees can be tested, and how marijuana results are treated, so review your policy with counsel for each state where you have employees.",
        ],
      },
      {
        heading: "Working with SaffHire",
        paragraphs: [
          DRUG_OFFER,
          "SaffHire is Veteran-Owned, headquartered in Frisco, TX and serves employers nationwide, with no setup fees and no minimums.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is random drug testing required?",
        answer:
          "For DOT-covered safety-sensitive employees, yes. For other employees, random testing is an employer policy choice, subject to state law.",
      },
      {
        question: "Can DOT and non-DOT employees be in the same random pool?",
        answer: "DOT-covered employees should be in a DOT pool tested under DOT rules. Keep non-DOT employees in a separate pool under your company policy.",
      },
      {
        question: "What other drug tests does SaffHire offer?",
        answer: DRUG_OFFER,
      },
    ],
    relatedLinks: drugLinks,
  },
  {
    path: "/instant-drug-testing",
    serviceName: "Instant Drug Testing",
    metaTitle: "Instant Drug Testing for Employers | SaffHire",
    description:
      "Instant result drug testing options for non-DOT pre-employment screening, alongside lab-based testing, from SaffHire, a Veteran-Owned screening company serving employers nationwide.",
    parent: { name: "Drug Screening", path: "/drug-screening" },
    eyebrow: "DRUG TESTING",
    h1: "Instant Drug Testing",
    intro:
      "When a start date is close, instant result drug testing can help. SaffHire offers instant result options alongside lab-based drug testing for employers nationwide.",
    quickAnswer:
      "Instant drug testing gives a preliminary result at the time of collection. Employers use it for non-DOT testing under their own policy. A non-negative instant result is not a final result and should be confirmed by a laboratory before any decision. DOT-required tests cannot use instant tests.",
    sections: [
      {
        heading: "When Employers Use Instant Testing",
        bullets: [
          "Pre-employment testing for non-DOT roles with a fast start date.",
          "High-volume hiring, such as staffing, warehouse and hospitality placements, where a quick negative helps keep start dates.",
          "Employers whose policy accepts instant negatives and sends non-negatives to a lab.",
        ],
      },
      {
        heading: "Instant vs. Lab-Based Testing",
        paragraphs: [
          "Lab-based testing sends the specimen to a certified laboratory, which can confirm results and is required for DOT testing. Instant testing gives a preliminary answer at collection. Many employers use instant tests for speed and lab-based testing for confirmation, regulated roles and situations where a defensible result matters most.",
        ],
      },
      {
        heading: "Before You Use Instant Tests",
        paragraphs: [
          "Some states restrict or regulate on-site or instant workplace testing, and some require lab confirmation of a non-negative result. Review your policy with counsel for the states where you test. For DOT-covered employees, use [DOT drug testing](/dot-drug-testing).",
        ],
      },
      {
        heading: "Working with SaffHire",
        paragraphs: [DRUG_OFFER, NO_FEES],
      },
    ],
    faqs: [
      {
        question: "Is an instant drug test result final?",
        answer: "A negative instant result can be used under your policy. A non-negative instant result is preliminary and should be confirmed by a laboratory before you make a decision.",
      },
      { question: "Can instant tests be used for DOT testing?", answer: "No. DOT-required drug tests must follow 49 CFR Part 40 with laboratory testing." },
      { question: "Do you also offer lab-based testing?", answer: DRUG_OFFER },
    ],
    relatedLinks: drugLinks,
  },
  // ---------- Criminal sub-types ----------
  {
    path: "/state-criminal-background-checks",
    serviceName: "State Criminal Background Checks",
    metaTitle: "State Criminal Background Checks for Employers | SaffHire",
    description:
      "State criminal record searches for the states where an applicant has lived, including instant state database searches, from SaffHire, a Veteran-Owned screening company in Frisco, TX.",
    parent: { name: "Criminal Background Checks", path: "/criminal-background-checks" },
    eyebrow: "CRIMINAL SCREENING",
    h1: "State Criminal Background Checks",
    intro:
      "A state criminal search looks for records in a state's criminal record sources. SaffHire runs State searches for the states where your applicant has lived, alongside National, Federal and County searches.",
    quickAnswer:
      "A state criminal background check searches a state-level criminal record source, such as a statewide repository or a state court database. Coverage depends on what courts and agencies report to it, so many employers pair State searches with County searches. State database searches usually return in minutes.",
    sections: [
      {
        heading: "What a State Search Covers",
        paragraphs: [
          "Most states keep a central repository of criminal history reported by courts and law enforcement, and some offer statewide court databases. What is included, how current it is, and who may access it differ by state. Some states only release conviction records; others include more. For example, Texas treats DPS conviction and deferred adjudication records as public information.",
        ],
      },
      {
        heading: "State vs. County vs. National",
        bullets: [
          "[National Criminal Database](/national-criminal-database-search): broad, fast, aggregated from many sources, but incomplete.",
          "State search: one state's records; coverage depends on what is reported to the state source.",
          "[County search](/county-criminal-background-checks): records pulled directly from the court where cases are filed.",
          "[Federal search](/federal-criminal-background-checks): federal court cases, which are not in state or county records.",
        ],
      },
      {
        heading: "Ordering State Searches with SaffHire",
        paragraphs: [
          "State searches can be added to a package; see [Standard Packages & Turnaround](/packages). Federal, State and County searches cover the jurisdictions where the applicant has lived. " + COURT_FEES + " " + NO_FEES,
          FCRA_SHORT,
        ],
      },
    ],
    faqs: [
      { question: "How fast is a state criminal search?", answer: "State database searches usually return in minutes. Some state sources take longer depending on how records are accessed." },
      { question: "Does a state search replace a county search?", answer: "Not always. State sources depend on what courts report, so many employers also run County searches for the counties where the applicant has lived." },
      { question: "Are there extra fees?", answer: COURT_FEES + " " + NO_FEES },
    ],
    relatedLinks: criminalLinks,
  },
  {
    path: "/federal-criminal-background-checks",
    serviceName: "Federal Criminal Background Checks",
    metaTitle: "Federal Criminal Background Checks for Employers | SaffHire",
    description:
      "Federal criminal court searches for employers. Federal Search is included in every SaffHire standard package. Veteran-Owned, Frisco, TX, serving employers nationwide.",
    parent: { name: "Criminal Background Checks", path: "/criminal-background-checks" },
    eyebrow: "CRIMINAL SCREENING",
    h1: "Federal Criminal Background Checks",
    intro:
      "Federal crimes are prosecuted in U.S. District Courts, not state or county courts, so they don't show up in county or state searches. SaffHire includes a Federal Search in every standard package.",
    quickAnswer:
      "A federal criminal background check searches U.S. District Court records for federal criminal cases, such as fraud, embezzlement, drug trafficking and other federal offenses. Because federal cases are separate from state and county court systems, a Federal Search fills a gap that other criminal searches miss.",
    sections: [
      {
        heading: "What Federal Records Include",
        paragraphs: [
          "Federal criminal cases involve violations of federal law, for example mail and wire fraud, bank fraud, tax crimes, certain drug and firearms offenses, and crimes on federal property. These cases are filed in the 94 federal judicial districts. Searches cover the federal districts tied to where the applicant has lived.",
        ],
      },
      {
        heading: "Who Should Include a Federal Search",
        bullets: [
          "Roles that handle money, financial data or sensitive information.",
          "Government contractors and regulated industries.",
          "Any employer that wants a complete criminal picture, since federal cases are not in county or state results.",
        ],
      },
      {
        heading: "Included in Every Standard Package",
        paragraphs: [
          "All SaffHire standard packages include SSN Trace, Address History, National Criminal Database, Global Security Watch List and Federal Search. See [Standard Packages & Turnaround](/packages). " + NO_FEES,
          FCRA_SHORT,
        ],
      },
    ],
    faqs: [
      { question: "Is a Federal Search included in SaffHire packages?", answer: "Yes. All standard packages include a Federal Search, along with SSN Trace, Address History, National Criminal Database and Global Security Watch List." },
      { question: "Why isn't a federal case in a county search?", answer: "Federal cases are filed in U.S. District Courts, which are a separate court system from state and county courts." },
      { question: "How long does a package with a Federal Search take?", answer: "Standard Packages 1-3 average 1 day, Package 4 averages 1-2 days, and Packages 5 and 6 average 2-5 days. Individual results can vary." },
    ],
    relatedLinks: criminalLinks,
  },
  {
    path: "/global-watch-list-search",
    serviceName: "Global Security Watch List Search",
    metaTitle: "Global Watch List and Sanctions Search for Employers | SaffHire",
    description:
      "Global Security Watch List search covering OFAC and international watch lists, included in every SaffHire standard package and usually returned in minutes.",
    parent: { name: "Criminal Background Checks", path: "/criminal-background-checks" },
    eyebrow: "SANCTIONS AND WATCH LISTS",
    h1: "Global Watch List Search",
    intro:
      "A Global Security Watch List search checks an applicant against government sanctions and watch lists, including the U.S. Treasury's OFAC list and international lists. It is included in every SaffHire standard package and usually returns in minutes.",
    quickAnswer:
      "A global watch list search compares an applicant's name and identifiers against sanctions and watch lists such as the OFAC Specially Designated Nationals (SDN) list. It helps employers, especially in financial services and government contracting, avoid hiring a sanctioned person. Possible matches should be reviewed carefully, because names alone can match the wrong person.",
    sections: [
      {
        heading: "What the Search Covers",
        paragraphs: [
          "The Global Security Watch List search covers OFAC and international watch lists. The U.S. Department of the Treasury's Office of Foreign Assets Control (OFAC) publishes the SDN list, and U.S. persons are generally prohibited from dealing with people and entities on it.",
        ],
      },
      {
        heading: "Who Needs It",
        bullets: [
          "Financial services and fintech employers.",
          "Government contractors.",
          "Employers with international operations or payments.",
          "Any employer that wants the search as part of a standard package; it is already included in every SaffHire standard package.",
        ],
      },
      {
        heading: "Healthcare Exclusion Lists Are Different",
        paragraphs: [
          "Healthcare employers usually also need exclusion screening, which checks the HHS OIG exclusion list and the SAM database. That is a separate search; see [Healthcare Sanctions and OIG Checks](/healthcare-sanctions-oig-checks).",
        ],
      },
      {
        heading: "Ordering",
        paragraphs: [
          "The National Criminal Database search is usually SaffHire's minimum package and includes the Global Security Watch List, SSN Trace, Sex Offender registry search and the national database search. These usually return in minutes. " + NO_FEES,
        ],
      },
    ],
    faqs: [
      { question: "How fast is a global watch list search?", answer: "It usually returns in minutes." },
      { question: "Is it included in standard packages?", answer: "Yes. Every SaffHire standard package includes the Global Security Watch List." },
      { question: "Is this the same as an OIG check?", answer: "No. OIG and SAM exclusion screening for healthcare is a separate search. See Healthcare Sanctions and OIG Checks." },
    ],
    relatedLinks: [...criminalLinks, { label: "Healthcare Sanctions and OIG Checks", href: "/healthcare-sanctions-oig-checks" }],
  },
  // ---------- SSN trace ----------
  {
    path: "/ssn-trace",
    serviceName: "SSN Trace and Address History",
    metaTitle: "SSN Trace for Employment Background Checks | SaffHire",
    description:
      "SSN Trace and Address History for employers: find names and addresses associated with an applicant to guide where criminal searches run. Usually returns in minutes.",
    eyebrow: "IDENTITY",
    h1: "SSN Trace and Address History",
    intro:
      "An SSN Trace is the starting point of most background checks. It lists names and addresses associated with an applicant's Social Security number, which tells you where to run county, state and federal searches. It usually returns in minutes and is included in every SaffHire standard package.",
    quickAnswer:
      "An SSN Trace searches commercial data sources for names, aliases and addresses associated with a Social Security number. It is not a criminal search, but it shows where an applicant has lived so criminal searches cover the right jurisdictions.",
    sections: [
      {
        heading: "What an SSN Trace Shows",
        bullets: [
          "Names and aliases associated with the SSN, including maiden or previous names.",
          "Address history, which guides which counties and states to search.",
          "Possible inconsistencies worth a follow-up question, such as a name or address that does not match the application.",
        ],
      },
      {
        heading: "What It Does Not Do",
        paragraphs: [
          "An SSN Trace is not a criminal record and should not be used by itself to make a hiring decision. Results come from data sources, so they may be incomplete for applicants with little credit or address history.",
        ],
      },
      {
        heading: "Why It Matters for Criminal Searches",
        paragraphs: [
          "Most criminal cases are filed at the county level. Knowing where an applicant has lived lets you search the right counties and states, and the names found let searches include aliases. That is why the SSN Trace and Address History come first in every SaffHire package.",
        ],
      },
      {
        heading: "Ordering",
        paragraphs: [
          "The applicant enters their own personal information through SaffHire's secure invitation link, so you don't have to collect sensitive details yourself. Data is protected with bank-level encryption, and results appear in your portal, available 24/7. " + NO_FEES,
        ],
      },
    ],
    faqs: [
      { question: "How long does an SSN Trace take?", answer: "An SSN Trace usually returns in minutes." },
      { question: "Is an SSN Trace included in every package?", answer: "Yes. All standard packages include SSN Trace and Address History." },
      { question: "Do I have to collect the applicant's SSN?", answer: "No. SaffHire sends the applicant a secure link to enter their own personal information and sign the disclosure and authorization." },
    ],
    relatedLinks: [
      { label: "Criminal Background Checks", href: "/criminal-background-checks" },
      { label: "National Criminal Database Search", href: "/national-criminal-database-search" },
      { label: "Standard Packages & Turnaround", href: "/packages" },
    ],
  },
];

export function getCheckPage(path: string) {
  return checkPages.find((p) => p.path === path);
}

// ---------- Upgrades for existing service pages ----------
export const serviceUpgrades: Record<string, { sections: ContentSection[]; faqTitle: string; faqs: FAQEntry[] }> = {
  "/criminal-background-checks": {
    faqTitle: "Criminal Background Check FAQ",
    sections: [
      {
        heading: "Types of Criminal Searches",
        paragraphs: [
          "No single source contains every criminal record in the United States, so a strong criminal background check combines searches. Each search type has its own page with details:",
        ],
        bullets: [
          "[National Criminal Database search](/national-criminal-database-search): broad multi-source search, including a Sex Offender registry search; usually returns in minutes.",
          "[County criminal searches](/county-criminal-background-checks): records pulled directly from the county courts where the applicant has lived.",
          "[State criminal searches](/state-criminal-background-checks): statewide repositories and state databases; state database searches usually return in minutes.",
          "[Federal criminal searches](/federal-criminal-background-checks): U.S. District Court cases, included in every standard package.",
          "[Global Security Watch List](/global-watch-list-search): OFAC and international watch lists; usually returns in minutes.",
          "[SSN Trace and Address History](/ssn-trace): shows where the applicant has lived so the right jurisdictions are searched.",
        ],
      },
      {
        heading: "Building the Right Criminal Package",
        paragraphs: [
          "The National Criminal Database search is usually SaffHire's minimum package. It includes an SSN Trace, Sex Offender registry search, Global Security Watch List and the national database search. Because national databases are aggregated and incomplete, many employers add County searches for the counties where the applicant has lived, and State searches where useful. Standard Packages 1-3 average 1 day, and Package 4 (adds County Search) averages 1-2 days. " + COURT_FEES,
        ],
      },
      {
        heading: "Using Criminal Records Fairly and Legally",
        paragraphs: [
          FCRA_SHORT,
          "Some states and cities limit when you can ask about criminal history or which records you can consider. EEOC guidance encourages an individualized assessment that considers the nature of the offense, the time that has passed, and the nature of the job.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is included in the National Criminal Database search?",
        answer:
          "The National Criminal Database search is usually our minimum package. It includes an SSN Trace, a Sex Offender registry search, the Global Security Watch List and the National Criminal Database search itself. These searches usually return in minutes.",
      },
      {
        question: "Does a national database search replace a county criminal search?",
        answer:
          "No. National criminal databases are aggregated from many sources and are incomplete. A county criminal search goes directly to the court for that jurisdiction, so many employers add county searches for the places an applicant has lived.",
      },
      { question: "Are there additional fees on criminal searches?", answer: COURT_FEES + " " + NO_FEES },
      { question: "Do I need the applicant's permission?", answer: "Yes. Give a standalone written disclosure and get written authorization before ordering. SaffHire's invitation workflow collects both electronically." },
      { question: "Do you search outside Texas?", answer: "Yes. SaffHire is headquartered in Frisco, TX and serves employers nationwide. Federal, State and County searches cover the jurisdictions where the applicant has lived." },
    ],
  },
  "/employment-verification": {
    faqTitle: "Employment Verification FAQ",
    sections: [
      {
        heading: "What Employment Verification Confirms",
        paragraphs: [
          "Employment verification contacts an applicant's prior employers to confirm employer names, dates of employment and job titles. It helps catch inflated titles, invented employers and unexplained gaps before you make an offer final.",
        ],
        bullets: [
          "Employer name and dates of employment.",
          "Job title or position held.",
          "Unexplained gaps, so you can ask the right follow-up questions.",
        ],
      },
      {
        heading: "What Affects Timing",
        paragraphs: [
          "Employment verifications depend on how quickly prior employers respond. Some use third-party verification services, some have closed or merged, and some only confirm limited information. Packages 5 and 6, which add Drug Screening and Employment and Education Verification, average 2-5 days. Individual results can vary.",
        ],
      },
      {
        heading: "Tips for Faster Verifications",
        bullets: [
          "Ask applicants for complete employer names, locations and dates on the application.",
          "Ask about prior employers that have closed or changed names.",
          "Send the SaffHire invitation as soon as an offer is extended.",
        ],
      },
      { heading: "Compliance", paragraphs: [FCRA_SHORT] },
    ],
    faqs: [
      { question: "How long does employment verification take?", answer: "It depends on how quickly prior employers respond. Packages that include verifications (Packages 5 and 6) average 2-5 days." },
      { question: "What does employment verification confirm?", answer: "Employer names, dates of employment and job titles, and it can reveal unexplained gaps." },
      { question: "Does employment verification need the applicant's authorization?", answer: "Yes. Like other background checks from a screening company, it requires a standalone disclosure and written authorization, which SaffHire's invitation workflow collects." },
    ],
  },
  "/education-verification": {
    faqTitle: "Education Verification FAQ",
    sections: [
      {
        heading: "What Education Verification Confirms",
        paragraphs: [
          "Education verification confirms degrees, diplomas and attendance directly with the school or its authorized records source. It protects employers from degree fraud and diploma mills for roles where education is a real requirement.",
        ],
        bullets: [
          "Degree or diploma earned, and the field of study where available.",
          "Dates of attendance and graduation.",
          "Whether the institution confirms the credential at all.",
        ],
      },
      {
        heading: "What Affects Timing",
        paragraphs: [
          "Timing depends on how quickly schools respond. Schools that have closed, international schools, and records under a former name can take longer. Packages 5 and 6 average 2-5 days. Individual results can vary.",
        ],
      },
      { heading: "Compliance", paragraphs: [FCRA_SHORT] },
    ],
    faqs: [
      { question: "How long does education verification take?", answer: "It depends on how quickly schools respond. Packages that include verifications average 2-5 days." },
      { question: "What does education verification confirm?", answer: "Degrees, diplomas and attendance dates, confirmed with the school." },
      { question: "Should every role include education verification?", answer: "Usually only roles where a degree or diploma is a genuine job requirement. Packages are customized to each client's needs." },
    ],
  },
  "/mvr-checks": {
    faqTitle: "MVR Check FAQ",
    sections: [
      {
        heading: "What an MVR Shows",
        paragraphs: [
          "A Motor Vehicle Report (MVR) shows an applicant's driving record from the state, such as license status and driving history. What is reported, and how far back, depends on the state. MVRs usually return in minutes. State fees may apply.",
        ],
      },
      {
        heading: "Who Needs MVR Checks",
        bullets: [
          "Commercial drivers and delivery drivers.",
          "Employees who drive company vehicles or drive for work.",
          "Forklift, warehouse and field roles where driving is part of the job.",
          "Roles where your insurance carrier requires a driving record review.",
        ],
      },
      {
        heading: "MVRs for DOT-Regulated Drivers",
        paragraphs: [
          "Motor carriers have their own FMCSA driving-record requirements, such as obtaining driving records from each state where a driver held a license before hire and reviewing them annually. SaffHire's DOT-related packages include MVR checks along with [DOT drug and alcohol testing](/dot-drug-testing) and criminal history searches.",
        ],
      },
      { heading: "Compliance", paragraphs: [FCRA_SHORT] },
    ],
    faqs: [
      {
        question: "What does an MVR check show?",
        answer: "A Motor Vehicle Report (MVR) shows an applicant's driving record from the state, such as license status and driving history. MVRs usually return in minutes. State fees may apply.",
      },
      { question: "Are there fees on MVRs?", answer: "State fees may apply to Motor Vehicle Reports. There are no setup fees and no minimums." },
      { question: "Can I run MVRs on current employees?", answer: "Yes, with a proper disclosure and authorization. Many employers review driving records periodically for employees who drive for work." },
    ],
  },
  "/drug-screening": {
    faqTitle: "Drug Screening FAQ",
    sections: [
      {
        heading: "Drug Testing Options",
        paragraphs: [DRUG_OFFER, "Each test type has its own page:"],
        bullets: [
          "[DOT drug testing](/dot-drug-testing) for safety-sensitive transportation employees under 49 CFR Part 40.",
          "[Random drug testing](/random-drug-testing) for DOT pools and company policy programs.",
          "[Instant drug testing](/instant-drug-testing) for fast non-DOT pre-employment results.",
          "Pre-employment, post-accident and reasonable-suspicion testing under DOT rules or your company policy.",
        ],
      },
      {
        heading: "Choosing a Panel",
        paragraphs: [
          "SaffHire offers 5, 10 and 12 panel testing for pre-employment and ongoing screening. DOT tests use the federally set DOT panel. For non-DOT testing, the right panel depends on your industry, your clients' requirements and state law.",
        ],
      },
      {
        heading: "State Law Matters",
        paragraphs: [
          "State rules on workplace drug testing vary, including notice requirements, who can be tested, lab confirmation, and how marijuana results are handled. Review your policy with counsel for each state where you test.",
        ],
      },
    ],
    faqs: [
      { question: "Do you offer drug testing?", answer: "Yes. We offer pre-employment, random, post-accident, and reasonable-suspicion drug testing through certified labs nationwide. Instant result options are also available." },
      { question: "Do you offer DOT drug testing?", answer: "Yes. DOT and non-DOT programs are available. See DOT Drug Testing." },
      { question: "Which panels do you offer?", answer: "5, 10 and 12 panel testing for non-DOT programs; DOT tests use the federally set DOT panel." },
      { question: "Is there a setup fee or a minimum?", answer: "No. SaffHire has no setup fees and no minimums." },
    ],
  },
};
