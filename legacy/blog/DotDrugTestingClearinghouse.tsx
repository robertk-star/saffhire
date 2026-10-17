import React from "react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";
import { Article, Answer, Section, Sub, Bullets, Steps, Table, Note, L, FaqSection, Sources, AboutSaffHire, type Faq } from "./kit";

const slug = "dot-drug-testing-fmcsa-clearinghouse-guide";
const title = "DOT Drug Testing and the FMCSA Clearinghouse: An Employer's Guide";
const description =
  "Who needs DOT drug and alcohol testing, the six FMCSA test types, the 5-panel DOT drug test, and how pre-employment and annual FMCSA Drug & Alcohol Clearinghouse queries work under 49 CFR parts 40 and 382.";

const P382 = "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-382";
const P40 = "https://www.ecfr.gov/current/title-49/subtitle-A/part-40";
const CH = "https://clearinghouse.fmcsa.dot.gov/";
const FMCSA_DA = "https://www.fmcsa.dot.gov/regulations/drug-alcohol-testing-program";
const RATES = "https://www.transportation.gov/odapc/random-testing-rates";

const faqs: Faq[] = [
  {
    question: "Who has to follow FMCSA drug and alcohol testing rules?",
    answer:
      "Employers of drivers who operate commercial motor vehicles requiring a commercial driver's license (CDL) on public roads, and the CDL drivers themselves, are covered by 49 CFR part 382. That includes owner-operators, who must meet both the employer and driver requirements.",
  },
  {
    question: "What drugs does a DOT drug test screen for?",
    answer:
      "The DOT 5-panel test under 49 CFR part 40 covers marijuana metabolites, cocaine metabolites, amphetamines (including methamphetamine and MDMA), opioids (including codeine, morphine, 6-acetylmorphine, hydrocodone, hydromorphone, oxycodone and oxymorphone) and phencyclidine (PCP). Employers may not add other drugs to a DOT test.",
  },
  {
    question: "Does a Clearinghouse query replace a pre-employment drug test?",
    answer:
      "No. Before a driver performs safety-sensitive functions for the first time, the employer must receive a verified negative pre-employment drug test result and must also run a full Clearinghouse query. They are separate requirements.",
  },
  {
    question: "What is the difference between a full query and a limited query?",
    answer:
      "A full query shows the details of any violation in the Clearinghouse and requires the driver's specific electronic consent inside the Clearinghouse. It is required for pre-employment. A limited query only shows whether information exists, can be done with a general written consent, and satisfies the annual query requirement. If a limited query shows information, the employer must run a full query within 24 hours or remove the driver from safety-sensitive duty.",
  },
  {
    question: "Can an employer use a DOT test for non-DOT employees?",
    answer:
      "No. DOT testing procedures and forms are only for employees covered by DOT rules. Employees who are not DOT-regulated should be tested under a separate non-DOT program.",
  },
];

function DotArticle() {
  return (
    <Article>
      <Answer>
        <p>
          If you employ drivers who need a CDL, federal rules require a drug and alcohol testing program under{" "}
          <strong>49 CFR part 382</strong> (FMCSA) carried out by the procedures in <strong>49 CFR part 40</strong> (DOT).
          Before a new driver performs safety-sensitive work, you need a <strong>verified negative pre-employment drug
          test</strong> and a <strong>full query of the FMCSA Drug &amp; Alcohol Clearinghouse</strong>. After that, run at
          least an annual Clearinghouse query on every driver, keep drivers in a random testing pool, test after qualifying
          accidents and on reasonable suspicion, and report violations to the Clearinghouse.
        </p>
      </Answer>

      <Section title="Who is covered">
        <p>
          Part 382 applies to employers of drivers who operate commercial motor vehicles that require a CDL on public roads,
          and to those drivers (49 CFR 382.103). Owner-operators count as both employer and driver. The rules cover
          &ldquo;safety-sensitive functions,&rdquo; which include driving and also time spent inspecting, loading or waiting
          to be dispatched while on duty.
        </p>
        <p>
          Other DOT agencies, such as the FAA, FRA, FTA and PHMSA, have their own testing rules that also use part 40
          procedures. This guide focuses on FMCSA-regulated motor carriers.
        </p>
      </Section>

      <Section title="The six FMCSA test types">
        <Table
          head={["Test", "When it happens", "Rule"]}
          rows={[
            ["Pre-employment", "Before a driver performs safety-sensitive functions for the first time. A verified negative drug result is required. Alcohol pre-employment testing is optional.", "49 CFR 382.301"],
            ["Post-accident", "After accidents that meet the FMCSA criteria, such as a fatality, or a citation combined with an injury requiring medical treatment away from the scene or a vehicle towed away.", "49 CFR 382.303"],
            ["Random", "Unannounced, selected by a scientifically valid method from a pool. FMCSA sets minimum annual rates; for 2026 they are 50% of average driver positions for drugs and 10% for alcohol.", "49 CFR 382.305"],
            ["Reasonable suspicion", "When a trained supervisor observes specific, contemporaneous signs of drug or alcohol use.", "49 CFR 382.307"],
            ["Return-to-duty", "Before a driver who violated the rules goes back to safety-sensitive work, after completing the substance abuse professional (SAP) process.", "49 CFR 382.309"],
            ["Follow-up", "Unannounced tests after return to duty, on the schedule the SAP sets.", "49 CFR 382.311"],
          ]}
        />
      </Section>

      <Section title="How a DOT drug test works (49 CFR part 40)">
        <Sub title="The 5-panel">
          <p>DOT drug tests use a fixed panel set by part 40. Employers cannot add or remove drugs:</p>
          <Bullets
            items={[
              "Marijuana metabolites",
              "Cocaine metabolites",
              "Amphetamines (amphetamine, methamphetamine, MDMA, MDA)",
              "Opioids (codeine, morphine, 6-acetylmorphine, hydrocodone, hydromorphone, oxycodone, oxymorphone)",
              "Phencyclidine (PCP)",
            ]}
          />
        </Sub>
        <Sub title="Collection, lab and MRO review">
          <Steps
            items={[
              { title: "Collection", body: "A trained collector follows part 40 procedures and the federal custody and control form, typically with a split urine specimen." },
              { title: "Laboratory testing", body: "The specimen goes to a laboratory certified by HHS for an initial screen and, if non-negative, confirmation testing." },
              { title: "Medical Review Officer", body: "A licensed physician MRO reviews lab results and talks with the donor about any legitimate medical explanation before verifying the result." },
              { title: "Result to employer", body: "The employer receives the verified result. Only verified results are acted on." },
            ]}
          />
        </Sub>
        <Note>
          Instant (point-of-collection) tests are not allowed for DOT drug testing. Use them only in non-DOT programs. See
          our <L href="/drug-screening">drug screening</L> page for DOT and non-DOT options.
        </Note>
      </Section>

      <Section title="The FMCSA Drug & Alcohol Clearinghouse">
        <p>
          The Clearinghouse is FMCSA&apos;s online database of CDL drivers&apos; drug and alcohol program violations. Employers,
          medical review officers, substance abuse professionals and others report violations to it, and employers must query
          it. Its requirements are in subpart G of part 382 (49 CFR 382.701 to 382.727).
        </p>
        <Sub title="Queries employers must run">
          <Bullets
            items={[
              <><strong>Pre-employment full query</strong> before a driver performs safety-sensitive functions. The driver must give specific electronic consent in the Clearinghouse, so they need their own Clearinghouse account (49 CFR 382.701(a)).</>,
              <><strong>Annual query</strong> on every driver you employ, at least once a year. A limited query, with a general written consent that can cover multiple years, satisfies this (49 CFR 382.701(b)).</>,
              <><strong>Escalation:</strong> if a limited query shows information exists, you must run a full query within 24 hours. If you cannot, the driver may not perform safety-sensitive functions until you do.</>,
            ]}
          />
        </Sub>
        <Sub title="What employers must report">
          <Bullets
            items={[
              "Alcohol test results of 0.04 or higher and refusals to test (other than drug test refusals, which the MRO reports)",
              "Actual knowledge of on-duty or pre-duty alcohol use, alcohol use after an accident, or controlled substance use",
              "Negative return-to-duty test results and completion of follow-up testing",
            ]}
          />
          <p>MROs report verified positive, adulterated and substituted drug test results.</p>
        </Sub>
        <Sub title="Prohibited status and CDL downgrades">
          <p>
            A driver with a violation and no completed return-to-duty process is in &ldquo;prohibited&rdquo; status and may
            not perform safety-sensitive functions. Since November 18, 2024, FMCSA rules require state driver licensing
            agencies to remove CDL privileges from drivers in prohibited status until they complete return-to-duty.
          </p>
        </Sub>
      </Section>

      <Section title="A DOT hiring checklist for motor carriers">
        <Steps
          items={[
            { title: "Get consent", body: "Have the driver register in the Clearinghouse and grant electronic consent for the full pre-employment query." },
            { title: "Run the full query", body: "Confirm the driver is not in prohibited status." },
            { title: "Order the pre-employment drug test", body: "Wait for a verified negative result before any safety-sensitive work." },
            { title: "Check the driving record", body: <>Order an <L href="/mvr-checks">MVR check</L> as part of driver qualification. State fees may apply.</> },
            { title: "Verify past employment", body: <>Confirm prior employers with <L href="/employment-verification">employment verification</L>, alongside the safety performance history the FMCSRs require.</> },
            { title: "Enroll in a random pool", body: "Add the driver to your random testing pool or a consortium/third-party administrator pool." },
            { title: "Calendar the annual query", body: "Set a reminder to query every driver at least once every 12 months." },
          ]}
        />
        <p>
          For more on screening drivers, see our <L href="/industries/transportation">transportation screening</L> page.
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <Sources
        items={[
          { label: "49 CFR part 382: Controlled Substances and Alcohol Use and Testing (eCFR)", href: P382 },
          { label: "49 CFR part 40: Procedures for Transportation Workplace Drug and Alcohol Testing Programs (eCFR)", href: P40 },
          { label: "FMCSA: Drug and Alcohol Testing Program", href: FMCSA_DA },
          { label: "FMCSA Drug & Alcohol Clearinghouse", href: CH },
          { label: "U.S. DOT ODAPC: 2026 Random Testing Rates", href: RATES },
        ]}
      />

      <AboutSaffHire>
        <p>
          SaffHire offers DOT-compliant and non-DOT drug screening, with collection at Labcorp patient service centers
          Nationwide.
        </p>
      </AboutSaffHire>
    </Article>
  );
}

export const dotClearinghouseListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "DOT Compliance",
  date: "October 17, 2026",
  readTime: "9 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-trucking.webp",
};

export const dotClearinghouseEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "DOT Compliance",
  date: "October 17, 2026",
  readTime: "9 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-trucking.webp",
  featuredImageSuggestion: "Commercial truck driver at a collection site with a DOT custody form",
  keyTakeaways: [
    "CDL drivers and their employers are covered by 49 CFR part 382, using part 40 procedures",
    "Pre-employment requires a verified negative drug test and a full Clearinghouse query",
    "Every driver needs at least an annual Clearinghouse query",
    "The DOT 5-panel is fixed and instant tests are not allowed for DOT testing",
    "Drivers in prohibited status lose CDL privileges until return-to-duty is complete",
  ],
  relatedTags: ["DOT", "FMCSA", "Clearinghouse", "Drug Testing", "CDL", "Compliance"],
  ArticleComponent: DotArticle,
};
