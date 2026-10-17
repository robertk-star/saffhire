import React from "react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";
import { Article, Answer, Section, Sub, Bullets, Table, Note, L, FaqSection, Sources, AboutSaffHire, type Faq } from "./kit";

const slug = "texas-background-check-laws-employers";
const title = "Texas Background Check Laws for Employers: The 7-Year Rule, Fair Chance Hiring and DPS Records";
const description =
  "What Texas employers need to know about background checks: the Texas 7-year reporting limit and its $75,000 salary exception, the status of Austin's fair chance ordinance, DPS criminal history records, nondisclosure orders and negligent hiring.";

const BC20 = "https://statutes.capitol.texas.gov/Docs/BC/htm/BC.20.htm";
const GV411 = "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.411.htm";
const CP142 = "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.142.htm";
const HB2127 = "https://capitol.texas.gov/tlodocs/88R/billtext/html/HB02127F.htm";
const AUSTIN = "https://www.austintexas.gov/equity-inclusion/fair-chance-hiring";
const DPS_FAQ = "https://www.dps.texas.gov/section/crime-records/faq/crime-records-services-faqs";
const DPS_CRD = "https://crimerecords.dps.texas.gov/DPSWEBSITE/CriminalHistory/";

const faqs: Faq[] = [
  {
    question: "How far back can a background check go in Texas?",
    answer:
      "Under Texas Business and Commerce Code Section 20.05, a consumer reporting agency generally may not report a record of arrest, indictment or conviction when the date of disposition, release or parole is more than seven years before the report. The limit does not apply when the job's annual salary is, or is reasonably expected to be, $75,000 or more. Federal law and other exceptions can also apply.",
  },
  {
    question: "Does Texas have a ban-the-box law for private employers?",
    answer:
      "Texas has no statewide ban-the-box law for private employers. The City of Austin adopted a Fair Chance Hiring Ordinance in 2016 that covers certain private employers, but a 2023 state law, Texas Labor Code Section 1.005, declares local rules on private employer hiring practices void, and litigation over that law is ongoing. Employers in Austin should get legal advice on the current status.",
  },
  {
    question: "Can employers in Texas search Texas DPS criminal history records?",
    answer:
      "Yes, in part. Under Texas Government Code Section 411.135, conviction and deferred adjudication records maintained by the Texas Department of Public Safety are public and anyone can obtain them through the DPS public site. Broader access through the DPS secure site is limited to entities the Legislature has specifically authorized.",
  },
  {
    question: "What happens if a Texas record has been sealed by an order of nondisclosure?",
    answer:
      "A person with an order of nondisclosure does not have to disclose the related criminal proceeding on an employment application (Texas Government Code Section 411.0755). A private company that sells criminal history information must destroy and may not disseminate records it has been notified are subject to an expunction or nondisclosure order (Section 411.0851).",
  },
  {
    question: "Does Texas law protect employers who hire people with criminal records?",
    answer:
      "Texas Civil Practice and Remedies Code Section 142.002 limits negligent hiring claims brought solely because an employee has a criminal conviction. The protection has exceptions, for example where the employer knew or should have known of a conviction for an offense committed in a substantially similar job, or for certain serious violent or sexually violent offenses.",
  },
];

function TexasLawsArticle() {
  return (
    <Article>
      <Answer>
        <p>
          Texas employers follow the federal Fair Credit Reporting Act plus a short list of Texas rules. The biggest one is
          the <strong>Texas 7-year rule</strong>: a background screening company generally may not report arrests,
          indictments or convictions whose disposition, release or parole date is more than seven years old, unless the job
          pays, or is reasonably expected to pay, <strong>$75,000 a year or more</strong> (Tex. Bus. &amp; Com. Code
          §20.05). Texas has <strong>no statewide ban-the-box law</strong> for private employers. Austin&apos;s local fair
          chance ordinance is still on the books but its enforceability is in dispute. Texas DPS conviction and deferred
          adjudication records are public, and records under an expunction or nondisclosure order may not be reported.
        </p>
      </Answer>

      <p>
        This guide covers Texas-specific rules only. For the federal basics of disclosure and authorization, see our{" "}
        <L href="/blog/fcra-basics-for-employers">FCRA basics primer</L>. For a nationwide view of fair chance laws, see our{" "}
        <L href="/blog/ban-the-box-laws-by-state-employer-guide">ban-the-box guide</L>.
      </p>

      <Section title="1. The Texas 7-year reporting limit (Bus. & Com. Code §20.05)">
        <p>
          Chapter 20 of the Texas Business and Commerce Code regulates consumer reporting agencies, which includes
          background screening companies. Section 20.05(a) says a consumer reporting agency may not furnish a consumer report
          containing, among other things:
        </p>
        <Bullets
          items={[
            <>&ldquo;a record of arrest, indictment, or conviction of a crime in which the date of disposition, release, or parole predates the consumer report by more than seven years&rdquo; (§20.05(a)(4));</>,
            "a suit or judgment entered more than seven years before the report, or beyond the governing statute of limitations, whichever is longer (§20.05(a)(2));",
            "a bankruptcy case more than 10 years old (§20.05(a)(1)); and",
            "another item or event that predates the report by more than seven years (§20.05(a)(6)).",
          ]}
        />
        <Sub title="The salary exception">
          <p>
            Section 20.05(b)(3) lifts those limits when the information is provided in connection with &ldquo;the employment of
            a consumer at an annual salary that is or may reasonably be expected to be $75,000 or more.&rdquo; For those roles,
            older records can be reported, subject to federal law and any other restriction.
          </p>
        </Sub>
        <Sub title="How it differs from the federal rule">
          <p>
            The federal FCRA&apos;s seven-year limit (15 U.S.C. 1681c) does not apply to criminal <em>convictions</em>; it
            applies to arrests and other non-conviction items. The Texas statute&apos;s text covers convictions too, measured
            from the date of disposition, release or parole. Texas&apos;s definition of &ldquo;consumer&rdquo; is an individual
            who resides in Texas (§20.01(2)). How the state and federal rules interact for a particular report can be a
            legal question, so screening companies and employers often apply the stricter Texas reading for Texas residents
            in roles under the salary threshold.
          </p>
        </Sub>
        <Note>
          Practical effect: for a Texas resident applying for a job expected to pay under $75,000 a year, expect older
          criminal records to be left off the report. Set your hiring policy with that in mind rather than assuming a
          lifetime lookback.
        </Note>
        <Sub title="Medical information">
          <p>
            Section 20.05(c) also bars a consumer reporting agency from furnishing medical information in a report obtained
            for employment purposes unless the consumer consents.
          </p>
        </Sub>
      </Section>

      <Section title="2. Fair chance hiring in Texas: no state law, a contested Austin ordinance">
        <Sub title="Statewide">
          <p>
            Texas has no statewide law restricting when private employers may ask about criminal history. Private employers
            in most of the state can lawfully include a criminal history question on an application, though many choose to
            wait until later in the process. Federal EEOC guidance on the use of criminal records still applies.
          </p>
        </Sub>
        <Sub title="Austin">
          <p>
            The City of Austin&apos;s Fair Chance Hiring Ordinance took effect April 4, 2016. The city describes it as placing
            restrictions on certain private employers on when they can ask about an applicant&apos;s criminal history and how
            that information can be used, with complaints handled by the city&apos;s Office of Civil Rights.
          </p>
          <p>
            In 2023 the Legislature passed HB 2127, the Texas Regulatory Consistency Act. It added Texas Labor Code Section
            1.005, which says a city or county may not adopt, enforce or maintain a rule regulating conduct in a field the
            Labor Code occupies, and lists &ldquo;hiring practices&rdquo; as part of that field for employers other than a
            city or county. Several cities challenged the law. A state appeals court dismissed their challenge in 2025
            without deciding whether the law is constitutional, and further appeals were pending as of this writing.
          </p>
          <p>
            Bottom line: the Austin ordinance has not been repealed and the city still describes enforcement on its website,
            but a state statute says local hiring-practice rules are void. Employers with Austin workers should talk to
            counsel, and many simply follow the ordinance&apos;s timing as a conservative practice.
          </p>
        </Sub>
      </Section>

      <Section title="3. Texas DPS criminal history records">
        <p>
          The Texas Department of Public Safety (DPS) is the state&apos;s central repository for criminal history. Under Chapter
          66 of the Code of Criminal Procedure, its Computerized Criminal History (CCH) system holds arrest, prosecution and
          disposition information for offenses of Class B misdemeanor or greater, as reported by Texas criminal justice
          agencies.
        </p>
        <Bullets
          items={[
            <><strong>Public access:</strong> Texas Government Code §411.135 entitles any person to obtain DPS criminal history record information that relates to a conviction or a grant of deferred adjudication, including related arrest information. DPS provides this through its public Criminal History Conviction Name Search.</>,
            <><strong>Name-based limits:</strong> DPS notes that a &ldquo;no record&rdquo; result based on the identifiers submitted does not guarantee the person has no record under other identifiers.</>,
            <><strong>Texas only:</strong> DPS data covers records reported by Texas agencies. It will not show out-of-state cases.</>,
            <><strong>Secure site:</strong> fuller access, including fingerprint-based results, is limited to entities the Legislature has authorized, such as certain schools, healthcare providers and government employers.</>,
          ]}
        />
        <p>
          Because reporting to the state can be incomplete or delayed, a Texas statewide search works best alongside{" "}
          <L href="/county-criminal-background-checks">county criminal searches</L> in the counties where the applicant has
          lived. Our guide to <L href="/blog/types-of-criminal-background-checks">types of criminal background checks</L>{" "}
          explains how the searches fit together.
        </p>
      </Section>

      <Section title="4. Expunctions and orders of nondisclosure">
        <p>Texas offers two main ways to limit access to a criminal record, and both affect background checks:</p>
        <Table
          head={["Rule", "What it says", "Source"]}
          rows={[
            ["Applicant disclosure", "A person whose record is subject to an order of nondisclosure is not required to state on an employment application that they were the subject of the related criminal proceeding.", <L key="a" href={GV411}>Gov&apos;t Code §411.0755</L>],
            ["Screening company duty", "A private entity that compiles and sells criminal history information must destroy, and may not disseminate, information it has been notified is subject to an expunction order or an order of nondisclosure.", <L key="b" href={GV411}>Gov&apos;t Code §411.0851(a)</L>],
            ["Liability", "A private entity that disseminates information in violation of §411.0851 is liable for resulting damages, plus court costs and attorney's fees.", <L key="c" href={GV411}>Gov&apos;t Code §411.0851(c)</L>],
          ]}
        />
        <p>
          For employers, this means a sealed or expunged record should not appear on a compliant report, and an applicant who
          answers &ldquo;no&rdquo; about a nondisclosed matter is within their rights.
        </p>
      </Section>

      <Section title="5. Negligent hiring protection (Civ. Prac. & Rem. Code §142.002)">
        <p>
          Texas limits negligent hiring lawsuits based only on an employee&apos;s criminal record. Section 142.002(a) says a
          cause of action may not be brought against an employer &ldquo;solely for negligently hiring or failing to adequately
          supervise an employee, based on evidence that the employee has been convicted of an offense.&rdquo;
        </p>
        <p>The protection does not apply when the employer knew or should have known of the conviction and the offense was:</p>
        <Bullets
          items={[
            "committed while performing duties, or under conditions, substantially similar to those of the job;",
            "an offense listed in Article 42A.054 of the Code of Criminal Procedure; or",
            "a sexually violent offense as defined by Article 62.001 of the Code of Criminal Procedure.",
          ]}
        />
        <p>
          It also does not apply in certain suits over misuse of others&apos; funds or property when the employee had a prior
          fraud-related conviction and the job foreseeably involved fiduciary duties (§142.002(c)). In other words, screening
          still matters: the safe harbor is narrowest exactly where the job risk is highest.
        </p>
      </Section>

      <Section title="A Texas screening checklist">
        <Bullets
          items={[
            "Use the federal standalone disclosure and written authorization for every applicant.",
            "Decide each role's expected annual salary, since it controls whether the Texas 7-year limit applies.",
            "Search county courts where the applicant has lived, plus a Texas statewide search and a national criminal database search.",
            "Add role-specific checks such as MVR checks for drivers (state fees may apply) or healthcare sanctions checks.",
            "If you hire in Austin, get counsel's view on the Fair Chance Hiring Ordinance and set your timing accordingly.",
            "Apply the same job-related standards to every candidate in the same role and keep records of your process.",
          ]}
        />
        <p>
          SaffHire is headquartered in Frisco, TX and screens Nationwide. See our{" "}
          <L href="/background-screening-frisco-tx">Frisco, TX background screening</L> page,{" "}
          <L href="/criminal-background-checks">criminal background checks</L>,{" "}
          <L href="/national-criminal-database-search">national criminal database search</L> and{" "}
          <L href="/mvr-checks">MVR checks</L>.
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <Sources
        items={[
          { label: "Tex. Bus. & Com. Code ch. 20, incl. §20.01 and §20.05 (Texas Legislature)", href: BC20 },
          { label: "Tex. Gov't Code ch. 411, incl. §411.0755, §411.0851 and §411.135 (Texas Legislature)", href: GV411 },
          { label: "Tex. Civ. Prac. & Rem. Code ch. 142, §142.002 (Texas Legislature)", href: CP142 },
          { label: "HB 2127 (88th Leg.), Texas Regulatory Consistency Act, enrolled text (adds Labor Code §1.005)", href: HB2127 },
          { label: "City of Austin: Fair Chance Hiring", href: AUSTIN },
          { label: "Texas DPS: Crime Records Service FAQs", href: DPS_FAQ },
          { label: "Texas DPS Crime Records Division: Criminal History Name Search and secure site eligibility", href: DPS_CRD },
          { label: "Fair Credit Reporting Act, 15 U.S.C. 1681c (U.S. Code)", href: "https://www.law.cornell.edu/uscode/text/15/1681c" },
        ]}
      />

      <AboutSaffHire />
    </Article>
  );
}

export const texasLawsListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "Compliance",
  date: "October 17, 2026",
  readTime: "9 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-7-year-rule.webp",
};

export const texasLawsEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "Compliance",
  date: "October 17, 2026",
  readTime: "9 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-7-year-rule.webp",
  featuredImageSuggestion: "Texas map with a background check report and statute book",
  keyTakeaways: [
    "Texas Bus. & Com. Code §20.05 limits reporting of arrests, indictments and convictions older than seven years",
    "The limit does not apply to jobs expected to pay $75,000 or more a year",
    "Texas has no statewide ban-the-box law; Austin's ordinance faces state preemption under Labor Code §1.005",
    "DPS conviction and deferred adjudication records are public under Gov't Code §411.135",
    "Expunged and nondisclosed records may not be reported by screening companies",
  ],
  relatedTags: ["Texas", "State Laws", "7-Year Rule", "Fair Chance", "Texas DPS", "Compliance"],
  ArticleComponent: TexasLawsArticle,
};
