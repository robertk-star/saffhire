import React from "react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";
import { Article, Answer, Section, Sub, Bullets, Steps, Table, Note, L, FaqSection, AboutSaffHire, type Faq } from "./kit";

const slug = "staffing-agency-client-screening-requirements-checklist";
const title = "Staffing Agency Screening: A Client-Requirements Checklist for Every Job Order";
const description =
  "A practical checklist staffing agencies can use to capture each client's background screening requirements at intake: searches, lookback, drug panel, driving, verifications, healthcare checks, rescreening and reporting.";

const faqs: Faq[] = [
  {
    question: "Who decides what background checks a staffing placement needs?",
    answer:
      "Usually the client sets minimum screening requirements in its contract or job order, and the agency, as the employer of record in most temporary placements, orders the checks and is responsible for its own legal compliance. Capturing the client's requirements in writing at intake keeps both sides aligned.",
  },
  {
    question: "Can a staffing agency reuse a background check for a different client?",
    answer:
      "Sometimes, but only if the existing report meets the new client's requirements, is recent enough for the client's policy, and the candidate's authorization covers it. Many clients require checks completed within a set window before the start date, so confirm before reusing.",
  },
  {
    question: "What should be in a staffing client screening profile?",
    answer:
      "At minimum: the required criminal searches and lookback period, identity and watch list checks, drug panel and specimen type, whether an MVR is needed, any employment, education or license verifications, healthcare sanctions checks if relevant, rescreening rules, turnaround expectations and how results should be reported to the client.",
  },
  {
    question: "How can staffing agencies keep screening fast without skipping client requirements?",
    answer:
      "Build a saved package for each client and role, start instant searches as soon as the candidate authorizes, and order slower items like county searches, drug tests and verifications at the same time instead of one after another.",
  },
];

function StaffingChecklistArticle() {
  return (
    <Article>
      <Answer>
        <p>
          The fastest way for a staffing agency to screen correctly is to <strong>capture each client&apos;s requirements
          once, in writing, at job-order intake</strong>, then turn them into a saved screening package for that client and
          role. A complete client profile answers ten questions: identity checks, criminal searches and lookback, drug
          testing, driving records, verifications, healthcare checks, site-specific rules, rescreening, turnaround and
          reporting. Use the checklist below on every new client or new role.
        </p>
      </Answer>

      <p>
        This post is a working checklist. For a broader overview of how SaffHire supports agencies, see our{" "}
        <L href="/industries/staffing">staffing industry page</L>.
      </p>

      <Section title="Why a client-requirements checklist matters">
        <p>
          Staffing agencies screen for many clients at once, and each client can want something different: one requires a
          county search in every county of residence, another wants a 10-panel drug test, a third needs a driving record for
          forklift or delivery roles. When those requirements live in emails or someone&apos;s memory, candidates get the wrong
          package, start dates slip, or a placement has to be rescreened.
        </p>
        <p>A written client profile fixes that. It gives recruiters one source of truth and lets you build a package per client.</p>
      </Section>

      <Section title="The client-requirements checklist">
        <Sub title="1. Identity and baseline searches">
          <Bullets
            items={[
              "SSN trace and address history required?",
              "National criminal database search?",
              "Sex offender registry search?",
              "Global watch list search?",
              "Federal criminal search?",
            ]}
          />
          <p className="text-sm text-gray-600">
            These instant searches (SSN trace, sex offender, global watch list, national criminal database and state
            database) usually return in minutes.
          </p>
        </Sub>
        <Sub title="2. Criminal searches and lookback">
          <Bullets
            items={[
              <>County searches: every county of residence, or only current county? See <L href="/county-criminal-background-checks">county criminal searches</L>.</>,
              "Statewide searches in which states?",
              "Lookback period the client expects (for example, 7 years), and how it lines up with state reporting limits.",
              "Any offense categories the client treats as job-related for this role, documented by the client.",
            ]}
          />
        </Sub>
        <Sub title="3. Drug testing">
          <Bullets
            items={[
              "Is a drug test required? Pre-placement only, or also random or post-accident?",
              "DOT or non-DOT? DOT applies only to covered safety-sensitive roles.",
              "Panel: 5-panel, expanded or custom?",
              "Specimen: urine, oral fluid or hair?",
              "How recent must the result be before the start date?",
            ]}
          />
          <p>
            Our guide to <L href="/blog/types-of-employment-drug-tests">types of employment drug tests</L> explains each
            option. See also <L href="/drug-screening">drug screening</L>.
          </p>
        </Sub>
        <Sub title="4. Driving">
          <Bullets
            items={[
              <>Does the role involve driving a company or client vehicle, forklifts on public roads, or deliveries? If so, order an <L href="/mvr-checks">MVR check</L>. State fees may apply.</>,
              "What license class and driving history standard does the client require?",
            ]}
          />
        </Sub>
        <Sub title="5. Verifications">
          <Bullets
            items={[
              <><L href="/employment-verification">Employment verification</L>: how many years or employers?</>,
              <><L href="/education-verification">Education verification</L>: highest degree only, or all claimed?</>,
              "Professional license or certification verification for skilled roles?",
            ]}
          />
        </Sub>
        <Sub title="6. Healthcare and regulated clients">
          <Bullets
            items={[
              <>For healthcare clients: <L href="/healthcare-sanctions-oig-checks">OIG exclusion and sanctions checks</L> before placement and on a recurring schedule?</>,
              "Any state-mandated checks for the client's industry?",
            ]}
          />
        </Sub>
        <Sub title="7. Site-specific rules">
          <Bullets
            items={[
              "Does the client's site have its own badging, safety or facility-access rules that depend on screening?",
              "Are there different requirements for different client locations?",
            ]}
          />
        </Sub>
        <Sub title="8. Rescreening">
          <Bullets
            items={[
              "Does the client require rescreening for long assignments, conversions to direct hire, or annually?",
              "Can a recent check from another assignment be reused, and within what time window?",
            ]}
          />
        </Sub>
        <Sub title="9. Turnaround expectations">
          <Bullets
            items={[
              "Target time from authorization to cleared candidate.",
              "Can the candidate start on instant results while county searches and verifications finish, or must every item be complete first?",
            ]}
          />
        </Sub>
        <Sub title="10. Reporting and records">
          <Bullets
            items={[
              "What does the client receive: a cleared/not-cleared status, or a copy of the report? Confirm the candidate's authorization and your agreements cover any sharing.",
              "Who on the client side receives updates?",
              "How long are records kept, and who keeps them?",
            ]}
          />
        </Sub>
      </Section>

      <Section title="Sample client profile">
        <Table
          head={["Requirement", "Example: light industrial client", "Example: healthcare client"]}
          rows={[
            ["Baseline", "SSN trace, national criminal database, sex offender, global watch list", "Same, plus federal search"],
            ["Criminal", "County searches, all counties of residence, 7-year lookback", "County and statewide searches, 7-year lookback"],
            ["Drug", "Non-DOT 5-panel urine, pre-placement", "Non-DOT expanded panel, pre-placement"],
            ["Driving", "MVR for forklift/yard driver roles", "Not required"],
            ["Verifications", "Not required", "Education and license verification"],
            ["Healthcare", "Not applicable", "OIG exclusion and sanctions, monthly"],
            ["Rescreen", "On conversion to direct hire", "Annually"],
          ]}
        />
        <Note>These profiles are illustrations of how to fill out the checklist, not recommendations for any specific client.</Note>
      </Section>

      <Section title="Turning the checklist into a workflow">
        <Steps
          items={[
            { title: "Capture requirements at intake", body: "Fill out the checklist when the client signs or opens a new role, and have the client confirm it in writing." },
            { title: "Build a saved package", body: "Create a package per client and role so recruiters order the same searches every time." },
            { title: "Invite the candidate", body: "Send the standalone disclosure and authorization electronically as soon as the candidate is selected." },
            { title: "Order everything at once", body: "Start instant searches, county searches, drug tests and verifications together rather than in sequence." },
            { title: "Report to the client the agreed way", body: "Share the status or report exactly as the client profile says." },
            { title: "Review profiles regularly", body: "Revisit each client profile when contracts renew or roles change." },
          ]}
        />
        <p>
          For the federal rules behind the disclosure and authorization step, see our{" "}
          <L href="/blog/fcra-basics-for-employers">FCRA basics primer</L>.
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <AboutSaffHire>
        <p>
          SaffHire builds custom packages for each staffing client, and recruiters can order and track every candidate in a
          portal that is available 24/7.
        </p>
      </AboutSaffHire>
    </Article>
  );
}

export const staffingChecklistListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "Industry-Specific",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/industry-staffing.webp",
};

export const staffingChecklistEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "Industry-Specific",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/industry-staffing.webp",
  featuredImageSuggestion: "Staffing recruiter filling out a client screening requirements checklist",
  keyTakeaways: [
    "Capture each client's screening requirements in writing at job-order intake",
    "Turn every client profile into a saved screening package",
    "Cover identity, criminal, drug, driving, verifications, healthcare, site rules, rescreening, turnaround and reporting",
    "Order instant searches, county searches, drug tests and verifications at the same time",
    "Review client profiles when contracts renew or roles change",
  ],
  relatedTags: ["Staffing", "Checklist", "Client Requirements", "Background Screening", "Drug Testing"],
  ArticleComponent: StaffingChecklistArticle,
};
