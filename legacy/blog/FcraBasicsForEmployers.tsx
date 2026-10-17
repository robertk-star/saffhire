import React from "react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";
import { Article, Answer, Section, Sub, Bullets, Steps, Note, L, FaqSection, Sources, AboutSaffHire, type Faq } from "./kit";

const slug = "fcra-basics-for-employers";
const title = "FCRA Basics for Employers: Disclosure, Authorization and What a CRA Does";
const description =
  "A plain-English FCRA primer for employers: what counts as a consumer report, the standalone disclosure, written authorization, your certification to the CRA, and what a consumer reporting agency is responsible for.";

const faqs: Faq[] = [
  {
    question: "Does the FCRA apply to every employer that runs background checks?",
    answer:
      "The FCRA applies whenever an employer gets a background report from a third-party consumer reporting agency for employment purposes, regardless of company size. It covers applicants and current employees. If you research a candidate entirely in-house without a CRA, the FCRA's consumer report rules generally do not apply, though other laws may.",
  },
  {
    question: "Can the FCRA disclosure be part of the job application?",
    answer:
      "No. The FCRA requires the disclosure to be clear and conspicuous and made in a document that consists solely of the disclosure. Courts have found that adding liability waivers or unrelated terms to the form can violate the law. Keep it as a separate, standalone document.",
  },
  {
    question: "Can the disclosure and authorization be signed electronically?",
    answer:
      "Yes. Electronic disclosures and electronic signatures are widely used for FCRA authorizations, as long as the disclosure is still a standalone document and the applicant clearly agrees before the report is ordered.",
  },
  {
    question: "What is the difference between a consumer report and an investigative consumer report?",
    answer:
      "A consumer report is any CRA communication about a person's character, reputation, personal characteristics or mode of living used for employment purposes. An investigative consumer report is a type of consumer report in which that information comes from personal interviews with people who know the applicant, such as neighbors or associates. Investigative reports carry an extra written disclosure requirement under 15 U.S.C. 1681d.",
  },
  {
    question: "Who is responsible for FCRA compliance, the employer or the CRA?",
    answer:
      "Both, for different things. The employer must give the disclosure, get written authorization and certify its compliance to the CRA. The CRA must follow reasonable procedures for maximum possible accuracy, respect the FCRA's reporting limits and handle consumer disputes.",
  },
];

function FcraBasicsArticle() {
  return (
    <Article>
      <Answer>
        <p>
          The Fair Credit Reporting Act (FCRA) is the federal law that governs background checks ordered from a third-party
          screening company. Before you order one for hiring, you must (1) give the applicant a clear written disclosure, in
          a document by itself, that a background report may be obtained, (2) get the applicant&apos;s written authorization,
          and (3) certify to the screening company that you have done both and will use the report lawfully. The screening
          company, called a consumer reporting agency (CRA), is responsible for accurate reporting, for following the
          FCRA&apos;s reporting limits and for handling disputes.
        </p>
      </Answer>

      <p>
        This primer covers the front end of the process: what the FCRA is, when it applies, how to handle the disclosure and
        authorization correctly, and who does what. If you want a full compliance audit list, see our{" "}
        <L href="/blog/fcra-compliance-checklist-employers-2026">FCRA compliance checklist for employers</L>.
      </p>

      <Section title="What the FCRA is and when it applies">
        <p>
          The FCRA (15 U.S.C. 1681 and following) was passed to protect the accuracy, fairness and privacy of information
          that third parties collect about people. It is best known for credit reports, but it reaches much further. Under
          the law, a <strong>consumer report</strong> includes information a CRA provides about a person&apos;s
          &ldquo;character, general reputation, personal characteristics, or mode of living&rdquo; that is used for
          employment purposes. That covers criminal record searches, employment and education verifications, motor vehicle
          records and similar checks when they come from a screening company.
        </p>
        <p>The FCRA applies when all three of these are true:</p>
        <Bullets
          items={[
            "You get the information from a third party that assembles or evaluates it for others (a CRA).",
            "The information is about an individual (an applicant, employee or, in many cases, an independent contractor).",
            "You use it for employment purposes: hiring, promotion, reassignment or retention.",
          ]}
        />
        <p>
          Company size does not matter. A five-person business ordering one report has the same core obligations as a
          large employer. Many states and some cities add their own rules on top of the FCRA, so the federal law is the floor,
          not the ceiling.
        </p>
      </Section>

      <Section title="What a consumer reporting agency (CRA) does">
        <p>
          A CRA is any person or company that regularly assembles or evaluates information on consumers to furnish consumer
          reports to third parties for a fee. A background screening company like SaffHire is a CRA. Under the FCRA, a CRA
          must:
        </p>
        <Bullets
          items={[
            <>
              <strong>Confirm a permissible purpose.</strong> A CRA may furnish a report for employment only when the employer
              has certified that it made the required disclosure, obtained authorization and will follow the law (15 U.S.C.
              1681b(b)(1)).
            </>,
            <>
              <strong>Follow reasonable procedures to assure maximum possible accuracy</strong> of the information in the
              report (15 U.S.C. 1681e(b)). In practice that means careful identity matching and verifying records at the
              source when needed.
            </>,
            <>
              <strong>Respect reporting time limits.</strong> Under 15 U.S.C. 1681c, most adverse information older than seven
              years, including arrest records that did not lead to a conviction, may not be reported. Records of criminal
              convictions are not subject to that federal seven-year limit. The limits do not apply for a job with an annual
              salary reasonably expected to be $75,000 or more. Some states, including Texas, have their own rules.
            </>,
            <>
              <strong>Take extra care with public records used for employment</strong> (15 U.S.C. 1681k): either notify the
              consumer when reporting public record information likely to hurt their job chances, or keep strict procedures
              to make sure the record is complete and up to date.
            </>,
            <>
              <strong>Handle disputes.</strong> If the applicant disputes something in their file, the CRA must reinvestigate,
              generally within 30 days, and correct or delete information that is inaccurate or cannot be verified (15 U.S.C.
              1681i).
            </>,
          ]}
        />
        <p>
          What a CRA does <em>not</em> do is make the hiring decision. The employer decides whether the information is
          relevant to the job. The CRA&apos;s job is to report accurate, lawful information.
        </p>
      </Section>

      <Section title="The disclosure: a standalone document">
        <p>
          Before ordering a report, you must give the applicant a &ldquo;clear and conspicuous&rdquo; written disclosure that
          a consumer report may be obtained for employment purposes. The disclosure must be &ldquo;in a document that consists
          solely of the disclosure&rdquo; (15 U.S.C. 1681b(b)(2)(A)(i)). This is the single most litigated part of employment
          screening, and most problems come from adding things that do not belong.
        </p>
        <Sub title="What a good disclosure looks like">
          <Bullets
            items={[
              "A separate page or screen, not buried in the job application or onboarding packet.",
              "Plain language stating that a background report may be obtained for employment purposes.",
              "A readable font and layout. Nothing about it should be hidden or hard to find.",
              "If you will order an investigative consumer report (one based on personal interviews), the extra disclosure 15 U.S.C. 1681d requires.",
            ]}
          />
        </Sub>
        <Sub title="What to keep out of it">
          <Bullets
            items={[
              "Liability waivers or releases of claims against you or the CRA.",
              "At-will employment statements, application certifications or other unrelated terms.",
              "Long state-law notices crammed onto the same page. Many employers give required state notices as separate documents.",
            ]}
          />
        </Sub>
        <Note>
          The FCRA allows the authorization to appear on the same document as the disclosure, but nothing else should. When
          in doubt, keep it shorter.
        </Note>
      </Section>

      <Section title="Authorization: written permission before you order">
        <p>
          The applicant must authorize the report in writing before you request it (15 U.S.C. 1681b(b)(2)(A)(ii)). An
          electronic signature counts. A few practical points:
        </p>
        <Bullets
          items={[
            "Get authorization before the order, never after. A report ordered first and authorized later is a problem you cannot fix.",
            "Keep the signed disclosure and authorization with the applicant's file so you can prove it later.",
            "If you plan to rescreen employees during employment, say so in the authorization. The FCRA lets the authorization cover future reports when that is clear.",
            "For commercial drivers regulated by the DOT, the FCRA has a narrower set of rules that can allow oral, written or electronic consent in some situations. Most employers should still use the standard written process.",
          ]}
        />
      </Section>

      <Section title="Your certification to the CRA">
        <p>
          Before a CRA can release an employment report, the employer must certify that it has made the disclosure, obtained
          authorization, will not use the information in violation of equal employment opportunity laws, and will follow the
          FCRA&apos;s other employer requirements (15 U.S.C. 1681b(b)(1)). This usually happens once, when you set up your
          account with the screening company, and is repeated or confirmed in the ordering workflow.
        </p>
        <p>
          Read that certification. It is a legal promise, and it is the reason a CRA is allowed to give you the report at all.
        </p>
      </Section>

      <Section title="How it fits together: a simple order of operations">
        <Steps
          items={[
            { title: "Set up your account", body: "Complete the CRA's employer certification and decide which checks fit each role." },
            { title: "Make a conditional decision about the candidate", body: "Many employers wait until a conditional offer to screen, and some state and local rules require that." },
            { title: "Give the standalone disclosure", body: "On its own page or screen, with no extra terms." },
            { title: "Get written authorization", body: "Signed on paper or electronically, before anything is ordered." },
            { title: "Order the checks", body: "The CRA searches the sources, verifies records and assembles the report." },
            { title: "Review the report consistently", body: "Apply the same job-related standards to every candidate in the same role, and keep records." },
          ]}
        />
      </Section>

      <Section title="Checks that commonly fall under the FCRA">
        <p>When ordered from a CRA, all of these are consumer reports:</p>
        <Bullets
          items={[
            <><L href="/criminal-background-checks">Criminal background checks</L>, including <L href="/county-criminal-background-checks">county criminal searches</L> and the <L href="/national-criminal-database-search">national criminal database search</L></>,
            <><L href="/employment-verification">Employment verification</L> and <L href="/education-verification">education verification</L></>,
            <><L href="/mvr-checks">Motor vehicle record (MVR) checks</L></>,
            <><L href="/healthcare-sanctions-oig-checks">Healthcare sanctions and OIG exclusion checks</L></>,
          ]}
        />
        <p>
          Not sure which searches to include? Our guide to{" "}
          <L href="/blog/types-of-criminal-background-checks">types of criminal background checks</L> explains when to use
          county, state, federal and national database searches.
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <Sources
        items={[
          { label: "Fair Credit Reporting Act, 15 U.S.C. 1681 et seq. (U.S. Code, Office of the Law Revision Counsel)", href: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title15-chapter41-subchapter3&edition=prelim" },
          { label: "EEOC and FTC: Background Checks: What Employers Need to Know", href: "https://www.eeoc.gov/laws/guidance/background-checks-what-employers-need-know" },
          { label: "CFPB: Fair Credit Reporting Act (Regulation V)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1022/" },
        ]}
      />

      <AboutSaffHire>
        <p>
          SaffHire&apos;s ordering workflow is built around a standalone disclosure and electronic authorization, so
          candidates can complete them before any search is run.
        </p>
      </AboutSaffHire>
    </Article>
  );
}

export const fcraBasicsListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "Compliance",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-fcra-2026.webp",
};

export const fcraBasicsEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "Compliance",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-fcra-2026.webp",
  featuredImageSuggestion: "Employer reviewing a standalone background check disclosure form",
  keyTakeaways: [
    "The FCRA applies whenever an employer uses a third-party background screening company",
    "The disclosure must be clear, conspicuous and in a document by itself",
    "Written (or electronic) authorization comes before the report is ordered",
    "The employer certifies its compliance to the CRA before any report is released",
    "The CRA is responsible for accuracy, reporting limits and disputes",
  ],
  relatedTags: ["FCRA", "Compliance", "Disclosure", "Authorization", "Consumer Reporting Agency"],
  ArticleComponent: FcraBasicsArticle,
};
