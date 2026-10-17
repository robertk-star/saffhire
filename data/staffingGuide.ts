import type { ContentSection } from "@/components/ContentPage";
import type { FAQEntry } from "@/components/PageFAQ";

/** Long-form guide rendered under the staffing industry hero (/industries/staffing). */
export const staffingGuideSections: ContentSection[] = [
  {
    heading: "Why Staffing Agencies Screen Differently",
    paragraphs: [
      "A direct employer usually screens for its own roles, under its own policy, in a handful of locations. A staffing agency screens for many clients at once. Each client can have its own required searches, its own drug panel, its own rules about what records disqualify a candidate, and its own start date that does not move. The same week can include a warehouse client that needs twenty general laborers by Monday, a healthcare client that requires sanctions checks, and a logistics client that needs driving records for forklift and delivery roles.",
      "That creates three pressures that most screening programs are not built for: speed (an unfilled shift is lost revenue for the agency and the client), consistency (every candidate for the same job order must be screened the same way), and compliance (the agency is usually the party ordering the report, so the federal Fair Credit Reporting Act and state rules apply to the agency's process). This guide walks through how agencies handle each of those, and where SaffHire fits.",
    ],
  },
  {
    heading: "Speed: Getting Candidates to Work Faster",
    paragraphs: [
      "In staffing, the background check is often the last step between an accepted offer and a filled shift. The fastest way to shorten it is to know which searches are instant and which depend on outside sources, and to build packages around that.",
    ],
    subsections: [
      {
        heading: "Searches that usually return in minutes",
        paragraphs: [
          "SSN Trace, Sex Offender registry, Global Security Watch List, the National Criminal Database search, state database searches and Motor Vehicle Reports (MVR) usually return in minutes. The National Criminal Database search is usually SaffHire's minimum package, and it includes the SSN Trace, Sex Offender registry search, Global Security Watch List and the national database search itself. State fees may apply to MVRs.",
        ],
      },
      {
        heading: "Searches that depend on courts, employers and schools",
        paragraphs: [
          "County criminal searches require retrieving records from the court, so timing depends on the county. Employment and education verifications depend on how quickly prior employers and schools respond. Drug screening depends on when the candidate gets to a collection site. Standard Packages 1-3 average 1 day, Package 4 (adds County Search) averages 1-2 days, and Packages 5 and 6 (add Drug Screening and verifications) average 2-5 days. Individual results can vary. See [Standard Packages & Turnaround](/packages) for what each package includes.",
        ],
      },
      {
        heading: "Practical ways agencies cut delays",
        bullets: [
          "Send the candidate invitation as soon as an offer is accepted. SaffHire only needs the candidate's name and email; the candidate enters their own personal information and signs the disclosure and authorization through a secure link.",
          "Tell candidates to watch for the invitation email and complete it the same day. Incomplete candidate information is one of the most common, and most avoidable, causes of delay.",
          "Match the package to the job order. Don't run county searches or verifications a client did not ask for, and don't skip ones it did.",
          "Send drug screening instructions with the invitation so the collection visit happens in parallel with the record searches, not after them.",
          "Check status in the portal instead of waiting for email. The SaffHire portal is available 24/7, so recruiters can see what is complete and what is pending at any hour.",
        ],
      },
    ],
  },
  {
    heading: "Volume: Screening Many Candidates Without Losing Track",
    paragraphs: [
      "Agencies that place dozens or hundreds of people a week need a process that does not depend on one recruiter remembering which client needs what. A few habits make high-volume screening manageable.",
    ],
    bullets: [
      "Build a named package for each client or job type, so a recruiter picks \"Client A - Warehouse\" instead of choosing individual searches every time.",
      "Keep one base package for general placements and add searches only where a client contract or role requires them.",
      "Use the same package for every candidate on the same job order. Consistent screening is easier to defend and easier to explain to clients.",
      "Order through the portal, where every candidate's status and completed report are in one place.",
      "Review results with written criteria, so two recruiters looking at the same report reach the same decision.",
    ],
  },
  {
    heading: "Client-Site Requirements and Client-Specific Packages",
    paragraphs: [
      "Many staffing clients write screening requirements into their contracts or site rules. Before the first placement, it helps to get those requirements in writing and turn them into a package. Typical items include:",
    ],
    bullets: [
      "Which criminal searches are required (for example National Criminal Database only, or National plus County searches for each place the candidate has lived).",
      "How far back the client wants searches to go, and which offenses it considers relevant to the role.",
      "Whether a drug screen is required, which panel, and whether it is lab-based or instant.",
      "Whether driving roles need a Motor Vehicle Report.",
      "Whether employment or education history must be verified.",
      "Industry-specific checks, such as [healthcare sanctions and OIG exclusion screening](/healthcare-sanctions-oig-checks) for healthcare clients.",
    ],
    subsections: [
      {
        heading: "Who decides, and who sees the report",
        paragraphs: [
          "Agree in the contract who reviews results and who makes the placement decision. If the client wants to see reports or make decisions based on them, involve your legal counsel: the FCRA's permissible purpose, disclosure and adverse action rules follow whoever uses the report for an employment decision. Many agencies keep report review in-house and tell the client only whether the candidate meets the client's written criteria.",
        ],
      },
    ],
  },
  {
    heading: "Rescreening Temporary and Long-Term Workers",
    paragraphs: [
      "A background check is a snapshot on the day it runs. Temp-to-hire workers, long-term assignments and workers who return to the agency after months away may need to be screened again, either because a client requires it or because the agency's own policy does.",
      "SaffHire supports ongoing and periodic rescreening programs for temp and contract workforces. Common triggers agencies use are a new assignment with a client that has stricter requirements, a worker returning after a set gap, a role change into driving or a regulated position, and a client's annual rescreening rule. Before rescreening, confirm that the original authorization covers ongoing checks, or get a new disclosure and authorization; state rules on this vary.",
    ],
  },
  {
    heading: "FCRA Basics Every Staffing Agency Owns",
    paragraphs: [
      "When a staffing agency orders a background check for employment purposes, the agency is a \"user\" of a consumer report under the Fair Credit Reporting Act. That puts several obligations on the agency itself. SaffHire's candidate invitation workflow collects the disclosure acknowledgment and authorization electronically, but your agency remains responsible for its hiring decisions and for following federal, state and local law.",
    ],
    subsections: [
      {
        heading: "Before ordering: disclosure and authorization",
        paragraphs: [
          "The candidate must get a clear, written disclosure that a background report may be obtained, in a document that consists solely of that disclosure, and must give written authorization before the report is ordered. Keep extra language, such as liability waivers, out of the disclosure.",
        ],
      },
      {
        heading: "Pre-adverse action notice",
        paragraphs: [
          "If the agency may decide not to place, hire or keep someone based in whole or in part on the report, the agency must first send the candidate a pre-adverse action notice. It must include a copy of the report and \"A Summary of Your Rights Under the Fair Credit Reporting Act.\" The point is to give the candidate a chance to review the report and dispute anything inaccurate before the decision is final.",
        ],
      },
      {
        heading: "Waiting period",
        paragraphs: [
          "After the pre-adverse notice, the agency waits a reasonable period before making the final decision. Agencies should set this period in their written policy with their counsel and apply it consistently. Some states and cities require specific waiting periods or extra steps.",
        ],
      },
      {
        heading: "Final adverse action notice",
        paragraphs: [
          "If the agency goes ahead with the decision, it sends a final adverse action notice. Under the FCRA that notice must include the name, address and phone number of the consumer reporting agency that supplied the report; a statement that the consumer reporting agency did not make the decision and cannot explain why it was made; and notice of the candidate's right to get a free copy of the report from that agency within 60 days and to dispute the accuracy or completeness of the information.",
        ],
      },
      {
        heading: "Who sends the notices",
        paragraphs: [
          "Your agency sends the pre-adverse and adverse action notices. SaffHire does not send adverse action letters on an agency's behalf. Your completed reports are in the SaffHire portal so you can attach the copy the pre-adverse notice requires. If a candidate disputes information in a report, the consumer reporting agency must reinvestigate it, generally within 30 days, and correct or delete information that is inaccurate or cannot be verified.",
        ],
      },
      {
        heading: "Individualized assessment",
        paragraphs: [
          "EEOC guidance encourages employers not to use blanket bans on anyone with a record. A common approach is to look at the nature and gravity of the offense, how much time has passed, and how it relates to the job, and to give the candidate a chance to share context before deciding. Writing these criteria down per client or job type also helps with consistency.",
        ],
      },
    ],
  },
  {
    heading: "Drug Testing for Staffing Placements",
    paragraphs: [
      "Drug screening is one of the most common client requirements in light industrial, warehouse, manufacturing and transportation placements. SaffHire offers pre-employment, random, post-accident and reasonable-suspicion drug testing through certified labs nationwide, with lab-based panels and instant result options. DOT and non-DOT programs are available for regulated and non-regulated workforces.",
    ],
    bullets: [
      "Confirm the client's required panel and whether it accepts instant results or requires lab-based testing.",
      "For DOT-regulated roles, such as commercial drivers, federal rules control the testing process, and the client or agency's DOT program requirements apply.",
      "State laws on testing and on marijuana vary. Check the rules in the state where the candidate will work, not just where your office is.",
      "Send collection instructions right away so the drug screen does not become the slowest part of the package.",
    ],
  },
  {
    heading: "Hiring Across Multiple States",
    paragraphs: [
      "Agencies that recruit in more than one state, or place workers with clients in other states, face a patchwork of rules on top of the FCRA. Some states and cities limit when an employer can ask about criminal history (often called ban-the-box or fair chance laws). For example, California's Fair Chance Act and New York City's Fair Chance Act generally require a conditional offer before an employer looks at criminal history, and add their own notice steps before a final decision. Other states limit how far back certain records can be reported or considered, or require additional disclosure forms.",
      "The practical approach is to build packages and adverse action steps per state where you place workers, review them with counsel, and revisit them when laws change. On the search side, SaffHire's Federal, State and County searches cover the jurisdictions where the applicant has lived, regardless of where your office is. Court access fees may apply to State and County searches; these are pass-through fees.",
    ],
  },
  {
    heading: "A Simple Screening Workflow for Agencies",
    bullets: [
      "Set up a package for each client or job type, based on the client's written requirements.",
      "When an offer is accepted, enter the candidate's name and email in the SaffHire portal to send the invitation.",
      "The candidate completes their personal information, disclosure and authorization through the secure link.",
      "Instant searches usually return in minutes; county searches, verifications and drug screens follow.",
      "Review the completed report against the client's written criteria.",
      "If you may not place the candidate because of the report, send the pre-adverse action notice, wait, then send the final adverse action notice if you go ahead.",
      "Rescreen when a client, assignment or policy calls for it.",
    ],
  },
  {
    heading: "Why Staffing Agencies Choose SaffHire",
    paragraphs: [
      "SaffHire is a Veteran-Owned company headquartered in Frisco, TX, founded by Robert Krebsbach, John Waak and Jody Thigpen, and serving staffing agencies nationwide. Packages are customized to each client's needs, with no setup fees and no minimums. Applicant and client data is protected with bank-level encryption, and the portal is available 24/7. [Contact us](/contact) or call 888-588-1733 for a custom quote.",
    ],
  },
];

const TURNAROUND =
  "Instant searches (SSN Trace, Sex Offender, Global Security Watch List, National Criminal Database, state database and MVR) usually return in minutes. Standard Packages 1-3 average 1 day, Package 4 averages 1-2 days, and Packages 5 and 6 average 2-5 days. County searches and verifications depend on courts, employers and schools, so individual results can vary.";

export const staffingGuideFaqs: FAQEntry[] = [
  { question: "How fast can a staffing agency get background check results?", answer: TURNAROUND },
  {
    question: "Can we use different packages for different clients or job orders?",
    answer:
      "Yes. Packages are customized to each client's needs. Many agencies set up a base package for general placements and add searches such as MVR, County Search, Drug Screening or verifications when a client or role requires them.",
  },
  {
    question: "Who is responsible for FCRA compliance when a staffing agency orders a background check?",
    answer:
      "The agency ordering the report is the user of the consumer report under the FCRA. That means providing a standalone disclosure, getting the candidate's written authorization, and following the pre-adverse and adverse action steps before taking action based on the report. SaffHire's invitation workflow collects the disclosure acknowledgment and authorization electronically; the agency remains responsible for its own hiring decisions and legal compliance.",
  },
  {
    question: "Does SaffHire send adverse action letters for us?",
    answer:
      "No. Your agency sends the pre-adverse and final adverse action notices. The completed report is in your SaffHire portal so you can include the copy the pre-adverse notice requires, along with A Summary of Your Rights Under the Fair Credit Reporting Act.",
  },
  {
    question: "Do you offer drug testing for staffing placements?",
    answer:
      "Yes. SaffHire offers pre-employment, random, post-accident and reasonable-suspicion drug testing through certified labs nationwide, with instant result options and DOT and non-DOT programs.",
  },
  {
    question: "Can we rescreen temporary or returning workers?",
    answer:
      "Yes. SaffHire supports ongoing and periodic rescreening programs for temp and contract workforces. Make sure your disclosure and authorization cover the rescreen, or collect a new one.",
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
