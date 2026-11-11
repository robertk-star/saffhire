import type { ContentPageData } from "@/components/ContentPage";

/**
 * SH-14 / SH-15 / SH-16: one page for "background screening companies",
 * "background check companies" and "companies that do background checks".
 */
export const backgroundCheckCompaniesMeta = {
  path: "/background-check-companies",
  name: "Background Check Companies",
  title: "Background Check Companies: How to Choose One",
  description:
    "How to compare background check companies: FCRA process, search coverage, turnaround, support and security, plus what SaffHire offers. Call 888-588-1733.",
};

export const backgroundCheckCompaniesPage: ContentPageData = {
  eyebrow: "CHOOSING A BACKGROUND SCREENING COMPANY",
  h1: "Background Check Companies: How to Choose the Right One",
  intro:
    "There are many companies that do background checks, and on the surface they can look alike. This guide explains what background check companies and background screening companies actually do, what to ask before you sign up with one, and how SaffHire, a Veteran-Owned background screening company headquartered in Frisco, TX, works with employers nationwide.",
  quickAnswer:
    "A background check company, also called a background screening company, is a business that gathers records and verifies information about job applicants for employers. When the report is used for hiring, the company is a consumer reporting agency under the Fair Credit Reporting Act (FCRA). To choose one, compare how it handles the FCRA steps, where its criminal records come from, how it reports turnaround and pending items, how ordering fits your hiring process, how it protects applicant data, and whether you can reach a real person when you have a question.",
  sections: [
    {
      heading: "What Background Check Companies Do",
      paragraphs: [
        "Employers hire background check companies so they do not have to search courts, call past employers and schools, and arrange drug tests on their own. The company takes the applicant's authorization, runs the searches the employer picks, and returns a report the employer reviews before making its own hiring decision.",
        "Under the FCRA, a company that assembles reports about people for employment purposes is a consumer reporting agency. That brings duties for the company, such as following reasonable procedures for accuracy and handling disputes from applicants. It also brings duties for the employer, such as giving the applicant a standalone disclosure and getting written authorization before the report is ordered.",
        "Not every website that sells record searches is set up for employment screening. Many people search sites state in their terms that their results may not be used for hiring decisions. If you are screening applicants or employees, use a background screening company that works with employers and follows FCRA procedures.",
      ],
    },
    {
      heading: "Background Screening Companies vs. Background Check Companies",
      paragraphs: [
        "In practice the two terms describe the same kind of business. \"Background check companies\" is the everyday phrase employers search for. \"Background screening companies\" is the term the industry tends to use, because a screening program is usually more than one check: an identity and address search, criminal searches, verifications, and sometimes drug testing and driving records, all ordered together for a role.",
        "What matters more than the label is the scope. Some companies focus on one type of search, such as drug testing or fingerprinting. Others, like SaffHire, offer the full set of employment screening searches in one portal so an employer can build a package for each role.",
      ],
    },
    {
      heading: "How to Choose a Background Check Company",
      paragraphs: [
        "Use the points below as a checklist when you compare companies that do background checks. Ask each company the same questions so the answers are easy to line up side by side.",
      ],
      subsections: [
        {
          heading: "1. An FCRA-aware process",
          bullets: [
            "Does the company provide a standalone disclosure and collect the applicant's written authorization before the report runs, and can that happen electronically?",
            "If a report may lead you to decide not to hire someone, does the company help you send the applicant a copy of the report and a summary of their rights before your decision is final, and a final notice afterward?",
            "How does the company handle an applicant who says a record is wrong? Ask who investigates and how the applicant is kept informed.",
            "Will the company be honest that it is not your lawyer? A screening company can explain its process, but questions about your own legal obligations belong with your own legal counsel.",
          ],
        },
        {
          heading: "2. Search coverage and where records come from",
          bullets: [
            "Most criminal cases are filed at the county level, and there is no single national court database. Ask whether the company runs [county criminal searches](/county-criminal-background-checks) for the places the applicant has lived, not only a database search.",
            "Ask how a possible match from a [national criminal database search](/national-criminal-database-search) is confirmed before it appears on a report.",
            "Ask whether the address history from an [SSN trace](/ssn-trace) is used to pick which counties and states to search, and whether other names the applicant has used are searched too.",
            "Check that the company offers the other searches your roles need, such as [employment verification](/employment-verification), [education verification](/education-verification), [drug screening](/drug-screening), [MVR checks](/mvr-checks) and [healthcare sanctions and OIG checks](/healthcare-sanctions-oig-checks).",
          ],
        },
        {
          heading: "3. Turnaround you can plan around",
          bullets: [
            "Ask which searches usually return in minutes and which depend on a court clerk, a past employer or a school.",
            "Ask how the report shows a search that is still pending, so you know what is complete and what is not.",
            "Be wary of any promise that every search is instant. Court searches and verifications depend on the people and offices that hold the records.",
          ],
        },
        {
          heading: "4. Ordering, integrations and the applicant experience",
          bullets: [
            "How do you place an order? Look for a secure online portal and an invitation link that lets the applicant enter their own personal information, so you do not have to collect or store Social Security numbers.",
            "If you use an applicant tracking system or HR software, ask whether and how orders and results move between it and the screening portal.",
            "Can you set up different packages for different roles, so a driver and an office hire are not screened the same way?",
            "Is the portal available when your hiring managers work, including evenings and weekends?",
          ],
        },
        {
          heading: "5. Data security",
          bullets: [
            "Ask how applicant data is encrypted and who can see it.",
            "Ask whether the screening platform has an independent audit, such as a SOC 2 Type 2 report.",
          ],
        },
        {
          heading: "6. Support from real people",
          bullets: [
            "When a result is confusing or a search is delayed, can you call and speak with someone who knows your account?",
            "Will the company help you choose searches based on the role, the industry and the states where you hire, instead of selling one package to everyone?",
          ],
        },
      ],
    },
    {
      heading: "Questions to Ask Before You Sign Up",
      bullets: [
        "Which searches do you recommend for each of our roles, and why?",
        "How do you collect the disclosure and authorization from applicants?",
        "Where do your criminal results come from, and how are database matches confirmed?",
        "How do you decide which counties and states to search?",
        "Which searches usually return quickly, and which depend on outside sources?",
        "What does the report look like when a search is still pending?",
        "How do applicants dispute something on their report?",
        "Who do we call when we have a question, and how do we reach them?",
        "How is applicant data protected?",
        "Can we order drug tests and driving records in the same portal as the background check?",
      ],
    },
    {
      heading: "Warning Signs When Comparing Companies",
      bullets: [
        "No disclosure and authorization step before the report is ordered.",
        "A \"national\" criminal search sold as complete coverage, with no county searches and no explanation of how matches are confirmed.",
        "No clear way for an applicant to dispute an error.",
        "One package for every role, with no questions about the job.",
        "Promises that every search is instant.",
        "Claims that the company will make hiring decisions for you or act as your legal advisor.",
      ],
    },
    {
      heading: "What SaffHire Offers Employers",
      paragraphs: [
        "SaffHire is a Veteran-Owned background screening company founded in 2019 and headquartered in Frisco, TX. We screen applicants for employers nationwide, and every search is ordered through one secure portal that is available 24/7.",
      ],
      bullets: [
        "[Criminal background checks](/criminal-background-checks), including the [national criminal database search](/national-criminal-database-search), [county](/county-criminal-background-checks), [state](/state-criminal-background-checks) and [federal](/federal-criminal-background-checks) searches, and the [Global Watch List search](/global-watch-list-search).",
        "An [SSN trace and address history](/ssn-trace) in every standard package, to point the criminal searches at the right places.",
        "[Employment verification](/employment-verification) and [education verification](/education-verification).",
        "[Drug screening](/drug-screening), including [DOT drug testing](/dot-drug-testing), [random drug testing](/random-drug-testing) and [instant drug testing](/instant-drug-testing), with collections at Labcorp facilities.",
        "[MVR checks](/mvr-checks) for roles that drive, and [healthcare sanctions and OIG checks](/healthcare-sanctions-oig-checks) for healthcare employers.",
        "Packages built around each role, with [standard packages](/packages) as a starting point. See [small business background checks](/small-business-background-checks), [volunteer background checks](/volunteer-background-checks) and the [industries we serve](/industries).",
        "Bank-level encryption for applicant and client data, and a screening platform that is SOC 2 Type 2 audited (SSAE 18).",
      ],
    },
    {
      heading: "How Ordering Works with SaffHire",
      bullets: [
        "Tell us about the roles you hire, the states on your applications, and any client, insurance or regulatory requirement.",
        "We recommend searches for each role, and you choose the package.",
        "You enter the applicant's name and email in the SaffHire portal, and the applicant receives a secure invitation link.",
        "The applicant reviews the standalone disclosure, signs the authorization, and enters their own personal information.",
        "Instant searches usually return in minutes. County searches and verifications depend on the courts, employers and schools involved, and the report shows what is still pending. Average turnaround for standard packages is published on [Standard Packages and Turnaround](/packages).",
        "You review the completed report in the portal and make your own hiring decision.",
      ],
    },
    {
      heading: "Talk with SaffHire",
      paragraphs: [
        "SaffHire is not a law firm and does not provide legal advice. This page is general information to help you compare background screening companies. Talk to your own legal counsel about your obligations under the FCRA and the state and local rules where you hire.",
        "Comparing background check companies for your business? Please call us for more information or fill out a contact form. Call 888-588-1733 or use the [contact form](/contact).",
      ],
    },
  ],
  faqTitle: "Background Check Companies FAQ",
  faqs: [
    {
      question: "What do background check companies do?",
      answer:
        "Background check companies gather records and verify information about applicants for employers, such as criminal records, past employment, education, drug test results and driving records. The employer chooses the searches, the applicant authorizes the check, and the employer reviews the report and makes its own decision.",
    },
    {
      question: "Is a background screening company the same as a background check company?",
      answer:
        "Yes, the terms are used for the same kind of business. \"Background screening\" usually describes a full program of searches for a role, while \"background check\" is the everyday term. Both are consumer reporting agencies under the FCRA when the report is used for employment.",
    },
    {
      question: "How do I choose a background check company?",
      answer:
        "Compare how each company handles the FCRA disclosure and authorization, where its criminal records come from and how database matches are confirmed, how it reports turnaround and pending searches, how ordering fits your hiring process, how it protects applicant data, and whether you can reach a real person for support.",
    },
    {
      question: "Can I use a people search website to screen job applicants?",
      answer:
        "Many people search websites state that their results may not be used for employment decisions. For hiring, use a background screening company that works with employers and follows FCRA procedures, including the applicant's disclosure and authorization.",
    },
    {
      question: "Are national criminal database searches enough on their own?",
      answer:
        "Usually not. Databases are broad but incomplete, and most criminal cases are filed at the county level. Many employers pair a [national criminal database search](/national-criminal-database-search) with [county criminal searches](/county-criminal-background-checks) for the places the applicant has lived.",
    },
    {
      question: "How long does a background check take?",
      answer:
        "It depends on the searches. Instant searches such as an SSN trace usually return in minutes. County court searches and verifications depend on the courts, past employers and schools involved. SaffHire publishes average turnaround for its standard packages on the [packages page](/packages).",
    },
    {
      question: "Do background check companies decide who gets hired?",
      answer:
        "No. The company provides the report. The employer reviews it and makes the hiring decision. SaffHire is not a law firm and does not provide legal advice, so talk to your own legal counsel about how to use a report.",
    },
    {
      question: "What does SaffHire offer as a background screening company?",
      answer:
        "SaffHire offers criminal background checks, SSN trace and address history, employment and education verification, drug screening, MVR checks, and healthcare sanctions and OIG checks, ordered in one portal and built into packages for each role. SaffHire is Veteran-Owned, headquartered in Frisco, TX, and serves employers nationwide. Call 888-588-1733 or [contact SaffHire](/contact).",
    },
  ],
  relatedLinks: [
    { label: "Background Screening Services", href: "/services" },
    { label: "Criminal Background Checks", href: "/criminal-background-checks" },
    { label: "SSN Trace and Address History", href: "/ssn-trace" },
    { label: "Small Business Background Checks", href: "/small-business-background-checks" },
    { label: "Standard Packages & Turnaround", href: "/packages" },
    { label: "Why SaffHire", href: "/why-saffhire" },
    { label: "Contact SaffHire", href: "/contact" },
  ],
  ctaTitle: "Compare SaffHire with the companies on your list",
  ctaText:
    "Questions about which searches your roles need? Call us for more information or fill out a contact form. Call 888-588-1733. SaffHire is Veteran-Owned, headquartered in Frisco, TX, and serves employers nationwide.",
};
