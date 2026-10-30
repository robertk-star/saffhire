import type { FAQEntry } from "@/components/PageFAQ";

/** Visible FAQs (with FAQPage schema) for industry pages and the services/industries hubs. */

const INSTANT =
  "Instant searches (SSN Trace, Sex Offender, Global Security Watch List, National Criminal Database, state database and MVR) usually return in minutes. Standard Packages 1-3 average 1 day, Package 4 averages 1-2 days, and Packages 5 and 6 average 2-5 days. County searches and verifications depend on courts, employers and schools, so individual results can vary.";
const FEES =
  "Court access fees may apply to State and County searches; these are pass-through fees. State fees may apply to Motor Vehicle Reports (MVR). There are no setup fees and no minimums.";
const NATIONWIDE =
  "Yes. SaffHire is a Veteran-Owned company headquartered in Frisco, TX and serves employers nationwide. Federal, State and County searches cover the jurisdictions where the applicant has lived.";

export const industryFaqs: Record<string, { title: string; items: FAQEntry[] }> = {
  "/industries/healthcare": {
    title: "Healthcare Background Screening FAQ",
    items: [
      {
        question: "Do you check the OIG exclusion list for healthcare employers?",
        answer:
          "Yes. SaffHire checks the HHS Office of Inspector General (OIG) exclusion list and the System for Award Management (SAM) database for healthcare clients. Learn more on our [Healthcare Sanctions and OIG Checks](/healthcare-sanctions-oig-checks) page.",
      },
      {
        question: "Why do healthcare organizations screen for exclusions?",
        answer:
          "Organizations that bill Medicare, Medicaid or other federal health care programs generally cannot be paid for items or services furnished by an excluded individual or entity, so many providers check exclusion lists before hire and on a recurring schedule.",
      },
      {
        question: "Can you screen both clinical and administrative staff?",
        answer:
          "Yes. Packages are customized to each client's needs, so a healthcare employer can use one package for clinical roles and another for administrative or support roles.",
      },
      {
        question: "Do you offer drug testing for healthcare employers?",
        answer:
          "Yes. SaffHire offers pre-employment, random, post-accident and reasonable-suspicion drug testing. Drug screens are ordered through the SaffHire portal, performed at Labcorp facilities, and results are delivered through the portal. Instant result options are available.",
      },
      { question: "How long does healthcare background screening take?", answer: INSTANT },
    ],
  },
  "/industries/transportation": {
    title: "Transportation Background Screening FAQ",
    items: [
      {
        question: "Do you offer DOT-compliant screening for transportation companies?",
        answer:
          "Yes. We offer DOT-related background screening packages for drivers and transportation professionals, including MVR checks, drug and alcohol testing, and criminal history searches.",
      },
      {
        question: "What does an MVR check show?",
        answer:
          "A Motor Vehicle Report (MVR) shows an applicant's driving record from the state, such as license status and driving history. MVRs usually return in minutes. State fees may apply.",
      },
      {
        question: "Do you offer drug and alcohol testing for drivers?",
        answer:
          "Yes. SaffHire offers pre-employment, random, post-accident and reasonable-suspicion drug testing. Drug screens are ordered through the SaffHire portal, performed at Labcorp facilities, and results are delivered through the portal. DOT and non-DOT testing is available.",
      },
      { question: "Are there extra fees on MVRs or court searches?", answer: FEES },
      { question: "Can you screen drivers who live in other states?", answer: NATIONWIDE },
    ],
  },
  "/industries/manufacturing": {
    title: "Manufacturing and Warehouse Screening FAQ",
    items: [
      {
        question: "What background checks do manufacturers and warehouses usually run?",
        answer:
          "Most start with a criminal and identity package. The National Criminal Database search is usually SaffHire's minimum package and includes an SSN Trace, Sex Offender registry search, Global Security Watch List and the national database search. Many employers add County searches, drug screening, and an MVR for forklift, delivery or driving roles.",
      },
      { question: "How fast can we get results for high-volume hiring?", answer: INSTANT },
      {
        question: "Do you offer drug testing for manufacturing employers?",
        answer:
          "Yes. SaffHire offers pre-employment, random, post-accident and reasonable-suspicion drug testing. Drug screens are ordered through the SaffHire portal, performed at Labcorp facilities, and results are delivered through the portal. Instant result options are available.",
      },
      {
        question: "Can we screen temp workers and contractors who work in our facility?",
        answer:
          "Yes. Packages are customized to each client's needs, so you can use the same or a separate package for contractors and temporary workers. Each person must still receive the disclosure and give written authorization.",
      },
      { question: "Is there a setup fee or a minimum?", answer: "No. SaffHire has no setup fees and no minimums." },
    ],
  },
  "/industries/hospitality": {
    title: "Hospitality Background Screening FAQ",
    items: [
      {
        question: "What background checks do hotels and restaurants usually run?",
        answer:
          "Many hospitality employers start with the National Criminal Database search, which includes an SSN Trace, Sex Offender registry search, Global Security Watch List and the national database search, and usually returns in minutes. Roles with guest-room access, cash handling or driving often add County searches, verifications or an MVR.",
      },
      { question: "How quickly can we fill seasonal or high-turnover roles?", answer: INSTANT },
      {
        question: "Do you offer drug testing for hospitality employers?",
        answer:
          "Yes. SaffHire offers pre-employment drug testing. Drug screens are ordered through the SaffHire portal, performed at Labcorp facilities, and results are delivered through the portal. Instant result options are available.",
      },
      {
        question: "Do we need the applicant's permission to run a background check?",
        answer:
          "Yes. Under the FCRA, an employer must give the applicant a clear written disclosure, in a document that consists solely of the disclosure, and get written authorization before ordering a background check. SaffHire's applicant invitation workflow collects the disclosure acknowledgment and authorization electronically.",
      },
      { question: "Is there a setup fee or a minimum?", answer: "No. SaffHire has no setup fees and no minimums." },
    ],
  },
  "/industries/energy": {
    title: "Energy Industry Background Check FAQ",
    items: [
      {
        question: "What is employee screening for the energy industry?",
        answer:
          "Employee screening for the energy industry is the set of checks an employer orders before someone works at a plant, field site, or in a vehicle. SaffHire is Veteran-Owned, headquartered in Frisco, TX, and provides that screening for energy employers nationwide.",
      },
      {
        question: "What does a background check for the energy industry include?",
        answer:
          "A background check for the energy industry commonly includes criminal searches, drug and alcohol testing, and employment verification. Driving roles can add an MVR. Licensed trades can add credential checks. Packages are customized to the role and to any site requirement.",
      },
      {
        question: "What energy industry background check solutions does SaffHire offer?",
        answer:
          "Energy industry background check solutions include criminal searches, pre-employment, random, post-accident, and reasonable-suspicion drug testing (DOT and non-DOT), and employment verification. Drug screens are ordered in the SaffHire portal, collected at Labcorp, and returned through the portal.",
      },
      { question: "Can energy employers screen workers hired for sites in other states?", answer: NATIONWIDE },
      { question: "How long does an energy industry background check take?", answer: INSTANT },
    ],
  },
  "/industries/education": {
    title: "Education Background Screening FAQ",
    items: [
      {
        question: "What checks do schools and childcare providers usually run?",
        answer:
          "Most include criminal searches and a Sex Offender registry search. Many add County searches, employment verification and education or credential verification. State law may also require specific checks, such as fingerprint-based checks through a state agency, so confirm your state's requirements.",
      },
      {
        question: "Do you verify degrees and teaching credentials?",
        answer:
          "Yes. Education verification confirms degrees, diplomas and attendance with the school. See [Education Verification](/education-verification).",
      },
      { question: "How long does education screening take?", answer: INSTANT },
      {
        question: "Can we screen volunteers as well as staff?",
        answer:
          "Yes. See [Volunteer Background Checks](/volunteer-background-checks). There are no setup fees and no minimums.",
      },
    ],
  },
  "/industries/church-nonprofit": {
    title: "Church and Nonprofit Screening FAQ",
    items: [
      {
        question: "Can churches and nonprofits screen volunteers?",
        answer:
          "Yes. Many churches and nonprofits screen staff and volunteers who work with children, youth or vulnerable adults. See [Volunteer Background Checks](/volunteer-background-checks).",
      },
      {
        question: "Is there a minimum number of checks?",
        answer: "No. SaffHire has no setup fees and no minimums, so small organizations can order only what they need.",
      },
      {
        question: "What does a typical volunteer check include?",
        answer:
          "Many organizations start with the National Criminal Database search, which includes an SSN Trace, Sex Offender registry search, Global Security Watch List and the national database search, and usually returns in minutes. Some add County searches for the places a person has lived.",
      },
      {
        question: "Do you offer nonprofit pricing?",
        answer: "Yes. We offer custom pricing for high-volume clients, staffing agencies, and nonprofits. Contact us for a custom quote.",
      },
      { question: "Do we need the volunteer's permission?", answer: "Yes. Get a clear written disclosure and written authorization before running a background check. SaffHire's invitation workflow collects them electronically." },
    ],
  },
  "/industries": {
    title: "Industries FAQ",
    items: [
      {
        question: "What industries does SaffHire work with?",
        answer:
          "We screen for staffing agencies, healthcare, transportation, manufacturing, hospitality, energy, education, churches and nonprofits, and small businesses. Packages are customized to each client's needs.",
      },
      {
        question: "Can one company use different packages for different roles?",
        answer: "Yes. Many employers use a base package for most roles and add searches such as MVR, County Search, Drug Screening or verifications where a role requires them.",
      },
      { question: "Do you serve employers outside Texas?", answer: NATIONWIDE },
      { question: "Is there a setup fee or a minimum?", answer: "No. SaffHire has no setup fees and no minimums." },
    ],
  },
  "/services": {
    title: "Background Screening Services FAQ",
    items: [
      {
        question: "What is included in every background check package?",
        answer:
          "All standard packages include SSN Trace, Address History, National Criminal Database (which includes a Sex Offender registry search), Global Security Watch List and Federal Search. Packages are customized to each client's needs; see [Standard Packages & Turnaround](/packages).",
      },
      { question: "Which searches come back in minutes?", answer: "Motor Vehicle Reports (MVR), Sex Offender registry, Global Security Watch List, SSN Trace, state database searches and the National Criminal Database search usually return in minutes. State fees may apply to MVRs." },
      {
        question: "Does a national database search replace a county criminal search?",
        answer:
          "No. National criminal databases are aggregated from many sources and are incomplete. A county criminal search goes directly to the court for that jurisdiction, so many employers add county searches for the places an applicant has lived.",
      },
      { question: "Are there additional fees on some searches?", answer: FEES },
      { question: "Is my data secure?", answer: "SaffHire uses bank-level encryption to protect applicant and client data. Our portal is available 24/7 with secure access. Our screening platform is SOC 2 Type 2 audited (SSAE 18)." },
    ],
  },
};
