import React from "react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";
import { Article, Answer, Section, Sub, Bullets, Table, Note, L, FaqSection, Sources, AboutSaffHire, type Faq } from "./kit";

const slug = "types-of-criminal-background-checks";
const title = "Types of Criminal Background Checks: County, State, Federal and National Database Searches";
const description =
  "County, statewide, federal and national database criminal searches each cover different records. Learn what each one finds, what it misses and when employers should use it.";

const faqs: Faq[] = [
  {
    question: "Which criminal background check is the most thorough?",
    answer:
      "No single search is complete on its own. County court searches are the primary source for most felony and misdemeanor cases, so they are the core of a thorough check. Pairing county searches with a national criminal database search and, where it fits the role, statewide and federal searches gives the broadest coverage.",
  },
  {
    question: "Is a national criminal database search the same as an FBI check?",
    answer:
      "No. A national criminal database search used in private employment screening is a compilation of records gathered from many state and county sources. It is not the FBI's fingerprint-based system, which private employers generally can only use when a specific law authorizes it.",
  },
  {
    question: "Why does a county search sometimes take longer than other searches?",
    answer:
      "Some county courts require a court researcher to pull records in person or wait for a clerk, and some courts redact identifiers that are needed to confirm a match. Those court-side steps can add time that a database search does not have.",
  },
  {
    question: "Do federal criminal searches find state crimes?",
    answer:
      "No. Federal searches cover cases prosecuted in U.S. District Courts for violations of federal law, such as federal fraud, tax, drug trafficking or immigration offenses. State and local crimes are filed in state courts and show up in county or statewide searches.",
  },
  {
    question: "Which counties should be searched?",
    answer:
      "Most employers search the counties where the applicant has lived, and often where they have worked or gone to school, over the lookback period their policy sets. An SSN trace is commonly used to surface address history that helps identify those counties.",
  },
];

function TypesOfCriminalChecksArticle() {
  return (
    <Article>
      <Answer>
        <p>
          There are four main types of criminal background checks for employment. <strong>County</strong> searches check
          the local courts where most criminal cases are filed and are the core of a thorough check.{" "}
          <strong>Statewide</strong> searches check a state&apos;s central repository or court system.{" "}
          <strong>Federal</strong> searches check U.S. District Courts for federal crimes. A{" "}
          <strong>national criminal database</strong> search scans compiled records from many jurisdictions at once to find
          places worth checking. Most employers combine a national database search with county searches where the applicant
          has lived, then add statewide or federal searches when the role calls for it.
        </p>
      </Answer>

      <Section title="Why there is more than one kind of criminal search">
        <p>
          The United States does not have one public, complete criminal record system that private employers can query.
          Criminal cases are filed in thousands of separate courts: state trial courts, usually organized by county, and
          federal district courts. Each keeps its own records. States also run central repositories that collect arrest and
          case information from local agencies, but how complete and current those repositories are varies from state to
          state.
        </p>
        <p>
          Each type of search is a different way of reaching those records. Knowing what each covers is how you build a
          check that fits the job without paying for searches that will not add anything.
        </p>
      </Section>

      <Section title="County criminal searches">
        <p>
          A <L href="/county-criminal-background-checks">county criminal search</L> checks felony and misdemeanor records at
          the court in a specific county. Because most criminal cases are prosecuted at the county level, this is the
          primary source for the records employers care most about.
        </p>
        <Sub title="What it finds">
          <Bullets
            items={[
              "Felony and misdemeanor cases filed in that county's courts",
              "Case details from the court record, such as charges, filing dates and dispositions",
              "Recent cases that may not have reached state or database sources yet",
            ]}
          />
        </Sub>
        <Sub title="Limits">
          <Bullets
            items={[
              "It only covers the county searched. A case one county over will not appear.",
              "Some courts need a researcher on site or a clerk to pull files, and some redact identifiers such as date of birth, which can add time.",
            ]}
          />
        </Sub>
        <Sub title="When to use it">
          <p>
            For nearly every role. County searches in the applicant&apos;s current and past counties of residence are the
            backbone of a defensible criminal check.
          </p>
        </Sub>
      </Section>

      <Section title="Statewide criminal searches">
        <p>
          A statewide search checks a state-level source, usually the state&apos;s central criminal history repository or a
          statewide court records system. In Texas, for example, the Department of Public Safety maintains the
          state&apos;s computerized criminal history and makes conviction and deferred adjudication records available to the
          public.
        </p>
        <Sub title="What it finds">
          <Bullets
            items={[
              "Records reported to the state from many counties at once",
              "Cases in counties you would not have thought to search",
            ]}
          />
        </Sub>
        <Sub title="Limits">
          <Bullets
            items={[
              "Coverage depends on how completely local agencies and courts report to the state.",
              "Some states restrict access or do not offer a statewide search suitable for employment.",
              "Reporting can lag behind the court record.",
            ]}
          />
        </Sub>
        <Sub title="When to use it">
          <p>
            When an applicant has lived in a state for a long time or in several counties in the same state, or when a state
            requires a state-level check for a regulated role. A state database search can often return in minutes, which
            makes it a useful complement to county searches.
          </p>
        </Sub>
      </Section>

      <Section title="Federal criminal searches">
        <p>
          A federal criminal search checks the U.S. District Courts for cases brought under federal law. Federal crimes are
          a different set of offenses from state crimes, and they are not filed in county courts.
        </p>
        <Sub title="What it finds">
          <Bullets
            items={[
              "Federal offenses such as fraud, embezzlement involving federal programs, tax crimes, federal drug trafficking, firearms and immigration offenses",
              "Cases in the federal district or districts searched",
            ]}
          />
        </Sub>
        <Sub title="Limits">
          <Bullets
            items={[
              "It does not show state or local crimes.",
              "Federal court indexes often carry limited identifiers, so careful matching matters.",
            ]}
          />
        </Sub>
        <Sub title="When to use it">
          <p>
            Roles involving money, financial access, sensitive data, government contracts or executive responsibility,
            where white-collar and federal offenses are directly relevant.
          </p>
        </Sub>
      </Section>

      <Section title="National criminal database searches">
        <p>
          A <L href="/national-criminal-database-search">national criminal database search</L> scans a large private
          compilation of criminal records gathered from state repositories, court systems, corrections agencies and other
          sources. It returns results in minutes and casts the widest net.
        </p>
        <Sub title="What it finds">
          <Bullets
            items={[
              "Possible records in jurisdictions outside the applicant's known address history",
              "Leads that point to which counties to search",
            ]}
          />
        </Sub>
        <Sub title="Limits">
          <Bullets
            items={[
              "No database contains every court's records, and update schedules vary by source.",
              "It is not the FBI's fingerprint system.",
              "Results should be verified against the original court record before they are reported for employment, so the report reflects the current, accurate status of the case.",
            ]}
          />
        </Sub>
        <Note>
          A database search is a discovery tool, not a replacement for county searches. Use it to find where to look, then
          confirm at the source.
        </Note>
      </Section>

      <Section title="Side-by-side comparison">
        <Table
          head={["Search", "Covers", "Best for", "Watch out for"]}
          rows={[
            ["County", "Felony and misdemeanor cases in one county court", "Core check for nearly every hire", "Only the counties searched; some courts add time"],
            ["Statewide", "State repository or statewide court system", "Long-time residents of one state; state-required roles", "Completeness and access vary by state"],
            ["Federal", "U.S. District Court cases for federal crimes", "Finance, executive, sensitive-data roles", "Does not include state crimes"],
            ["National database", "Compiled records from many jurisdictions", "Finding records outside known addresses", "Must be verified at the source"],
          ]}
        />
      </Section>

      <Section title="Choosing the right combination">
        <p>A practical way to decide is to start with a baseline and add searches based on risk:</p>
        <Bullets
          items={[
            <><strong>Baseline for most roles:</strong> SSN trace to identify address history, national criminal database search, and county searches in the counties the applicant has lived in during your lookback period. A sex offender registry search and global watch list search are commonly added and can return in minutes.</>,
            <><strong>Add statewide searches</strong> when the state offers a reliable repository or when regulations for the role require one.</>,
            <><strong>Add federal searches</strong> for roles with financial authority, access to sensitive data or federal contract work.</>,
            <><strong>Add role-specific checks</strong> such as <L href="/mvr-checks">MVR checks</L> for drivers (state fees may apply) or <L href="/healthcare-sanctions-oig-checks">healthcare sanctions and OIG checks</L> for healthcare roles.</>,
          ]}
        />
        <p>
          Apply the same package to everyone in the same role, document why, and remember that federal and state law limit
          how far back some records can be reported. Our <L href="/blog/fcra-basics-for-employers">FCRA basics primer</L>{" "}
          explains those rules, and our <L href="/criminal-background-checks">criminal background checks</L> page lists the
          searches SaffHire offers.
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <Sources
        items={[
          { label: "United States Courts: Court Records (PACER)", href: "https://www.uscourts.gov/court-records" },
          { label: "Texas DPS: Crime Records Service FAQs", href: "https://www.dps.texas.gov/section/crime-records/faq/crime-records-services-faqs" },
          { label: "EEOC and FTC: Background Checks: What Employers Need to Know", href: "https://www.eeoc.gov/laws/guidance/background-checks-what-employers-need-know" },
        ]}
      />

      <AboutSaffHire />
    </Article>
  );
}

export const criminalCheckTypesListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "Screening Guides",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-eeoc-criminal.webp",
};

export const criminalCheckTypesEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "Screening Guides",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-eeoc-criminal.webp",
  featuredImageSuggestion: "Courthouse records and a map of county, state and federal jurisdictions",
  keyTakeaways: [
    "County searches are the primary source for most criminal cases",
    "Statewide searches cover a state's central repository, with varying completeness",
    "Federal searches find federal crimes that county searches never show",
    "National database searches find where to look, then results are verified at the source",
    "Combine searches based on the role and apply them consistently",
  ],
  relatedTags: ["Criminal Background Checks", "County Search", "Federal Search", "National Database", "Screening Guides"],
  ArticleComponent: TypesOfCriminalChecksArticle,
};
