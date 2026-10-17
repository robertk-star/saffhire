import type { FAQEntry } from "@/components/PageFAQ";

const TURNAROUND =
  "Instant searches (SSN Trace, Sex Offender, Global Security Watch List, National Criminal Database, state database and MVR) usually return in minutes. Standard Packages 1-3 average 1 day, Package 4 averages 1-2 days, and Packages 5 and 6 average 2-5 days. County searches and verifications depend on courts, employers and schools, so individual results can vary.";

export const staffingFaqs: FAQEntry[] = [
  {
    question: "How fast can a staffing agency get background check results?",
    answer: TURNAROUND,
  },
  {
    question: "Can we use different packages for different clients or job orders?",
    answer:
      "Yes. Packages are customized to each client's needs. Many agencies set up a base package for general placements and add searches such as MVR, County Search, Drug Screening or verifications when a client or role requires them.",
  },
  {
    question: "Who is responsible for FCRA compliance when a staffing agency orders a background check?",
    answer:
      "The agency ordering the report is the user of the consumer report under the FCRA. That means providing a standalone disclosure and getting the candidate's written authorization before ordering. SaffHire's invitation workflow collects both electronically; the agency remains responsible for its own hiring decisions and legal compliance.",
  },
  {
    question: "Are there extra fees on some searches?",
    answer:
      "Court access fees may apply to State and County searches; these are pass-through fees. State fees may apply to Motor Vehicle Reports (MVR). There are no setup fees and no minimums.",
  },
  {
    question: "Do you screen candidates outside Texas?",
    answer:
      "Yes. SaffHire is headquartered in Frisco, TX and serves employers nationwide. Federal, State and County searches cover the jurisdictions where the applicant has lived.",
  },
];

export const contactFaqs: FAQEntry[] = [
  {
    question: "What happens after I submit the contact form?",
    answer:
      "A member of the SaffHire team reviews your request and follows up to learn about the roles you hire for, the searches your clients or policies require, and how many candidates you screen. From there we put together a package recommendation and a custom quote.",
  },
  {
    question: "What information helps you prepare a quote?",
    answer:
      "It helps to know your industry, the positions you are filling, the states where candidates live or work, whether roles involve driving, and any client or regulatory requirements such as drug screening or employment and education verification.",
  },
  {
    question: "Can I call instead of filling out the form?",
    answer: "Yes. Call 888-588-1733 or email info@saffhire.com.",
  },
  {
    question: "Is there a setup fee or a minimum to open an account?",
    answer: "No. SaffHire has no setup fees and no minimums.",
  },
  {
    question: "Where is SaffHire located?",
    answer: "SaffHire is a Veteran-Owned company headquartered in Frisco, TX, serving employers nationwide.",
  },
];

export const packagesFaqs: FAQEntry[] = [
  {
    question: "Which package should I choose?",
    answer:
      "Start with the roles you hire for. Package 1 covers the base searches included in every package. Add a Motor Vehicle Report for driving roles, State and County searches for deeper criminal history coverage, and Drug Screening, Employment Verification or Education Verification when your policies or clients require them. Packages are customized to each client's needs, so these are starting points.",
  },
  {
    question: "How long does each package take?",
    answer: TURNAROUND,
  },
  {
    question: "What is the difference between a National Criminal Database search and a County Search?",
    answer:
      "The National Criminal Database search checks an aggregated database of records from many sources across the country, and it includes a Sex Offender registry search. National databases are not complete, so a County Search goes to the court records in the jurisdictions where the applicant has lived to confirm and add detail.",
  },
  {
    question: "Are there additional fees?",
    answer:
      "Court access fees may apply to State and County searches; these are pass-through fees. State fees may apply to Motor Vehicle Reports (MVR).",
  },
  {
    question: "Can I add or remove searches from a package?",
    answer:
      "Yes. Every package can be adjusted. Contact us and we will build a package around your positions and requirements.",
  },
];
