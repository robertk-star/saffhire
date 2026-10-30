import React from "react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";
import { Article, Answer, Section, Sub, Bullets, Table, Note, L, FaqSection, Sources, AboutSaffHire, type Faq } from "./kit";

const slug = "types-of-employment-drug-tests";
const title = "Types of Employment Drug Tests: Random, Instant, Lab-Based, DOT and Panel Basics";
const description =
  "A plain-English guide to employment drug testing: lab-based vs. instant tests, when to use random testing, how DOT tests differ from non-DOT tests, specimen types, and what 5-panel and expanded panels cover.";

const faqs: Faq[] = [
  {
    question: "What is the most common type of pre-employment drug test?",
    answer:
      "A lab-based urine test is the most widely used option for pre-employment screening. The candidate provides a specimen at a collection site, a certified laboratory screens it, and non-negative results are confirmed and reviewed by a Medical Review Officer before they are reported.",
  },
  {
    question: "Are instant drug tests accurate?",
    answer:
      "Instant tests give a quick preliminary screen, but a non-negative instant result is not a final result. It should be sent to a laboratory for confirmation testing and reviewed by a Medical Review Officer before an employer relies on it. Instant tests are not permitted for DOT-regulated drug testing.",
  },
  {
    question: "What does a 5-panel drug test check for?",
    answer:
      "A standard 5-panel generally screens for marijuana (THC), cocaine, amphetamines, opioids and phencyclidine (PCP). The DOT 5-panel is fixed by federal rule and includes specific opioids such as hydrocodone and oxycodone. Non-DOT panels can be customized.",
  },
  {
    question: "Can a private employer do random drug testing?",
    answer:
      "Random testing is required for DOT-covered safety-sensitive employees. For non-DOT employees, whether and how random testing is allowed depends on state and local law and your written policy, so employers should confirm the rules where they operate.",
  },
  {
    question: "Can I add drugs to a DOT drug test?",
    answer:
      "No. The DOT panel is set by 49 CFR part 40 and cannot be changed. If you want to test for additional substances, that must be done as a separate non-DOT test under your own policy.",
  },
];

function DrugTestTypesArticle() {
  return (
    <Article>
      <Answer>
        <p>
          Employment drug tests differ in three ways: <strong>how the specimen is tested</strong> (a certified{" "}
          <strong>lab</strong> or an <strong>instant</strong> on-site device), <strong>when the test happens</strong>{" "}
          (pre-employment, <strong>random</strong>, post-accident, reasonable suspicion), and{" "}
          <strong>which rules apply</strong> (<strong>DOT</strong>-regulated or non-DOT). The <strong>panel</strong> is the
          list of drugs screened, usually a 5-panel or an expanded panel. For most employers, a lab-based urine test with
          Medical Review Officer review is the dependable default. DOT-covered employees must be tested under DOT rules with
          the fixed DOT 5-panel.
        </p>
      </Answer>

      <Section title="Lab-based drug tests">
        <p>
          In a lab-based test, the candidate visits a collection site, a trained collector gathers the specimen under
          chain-of-custody procedures, and a laboratory performs an initial screen. Non-negative screens get confirmation
          testing, usually by gas or liquid chromatography with mass spectrometry, and a Medical Review Officer (MRO), who is a
          licensed physician, reviews the result with the donor before it is verified.
        </p>
        <Sub title="Why employers choose it">
          <Bullets
            items={[
              "Confirmation testing and MRO review reduce the chance of acting on a false positive.",
              "Documented chain of custody makes results easier to defend.",
              "Required for DOT drug testing.",
            ]}
          />
        </Sub>
        <Sub title="Tradeoff">
          <p>
            It takes longer than an instant test because the specimen travels to a lab. Negative results often come back
            within a day or two of collection; non-negative results take longer because of confirmation and MRO review.
          </p>
        </Sub>
      </Section>

      <Section title="Instant (point-of-collection) drug tests">
        <p>
          Instant tests use a cup or device that shows a preliminary result on-site, usually before the candidate leaves the collection site.
        </p>
        <Bullets
          items={[
            <><strong>Good for:</strong> non-DOT programs where a fast preliminary negative helps start a candidate quickly.</>,
            <><strong>Limits:</strong> results are preliminary. A non-negative result should be sent to a lab for confirmation and MRO review before any decision.</>,
            <><strong>Not allowed for DOT:</strong> DOT drug tests must be processed by an HHS-certified laboratory.</>,
            <><strong>State rules:</strong> some states regulate or restrict on-site testing, so check where you hire.</>,
          ]}
        />
      </Section>

      <Section title="Testing by occasion: when tests happen">
        <Table
          head={["Occasion", "What it is", "Common use"]}
          rows={[
            ["Pre-employment", "Test after a conditional offer, before the person starts work.", "Most employers that test at all"],
            ["Random", "Unannounced tests of employees selected by a neutral, random method from a pool.", "Required for DOT safety-sensitive roles; optional for others where state law allows"],
            ["Post-accident", "Test after a workplace or vehicle accident that meets policy criteria.", "Transportation, warehousing, manufacturing"],
            ["Reasonable suspicion", "Test based on specific, documented observations of possible impairment.", "Any employer with a written policy and trained supervisors"],
            ["Return-to-duty and follow-up", "Tests before and after an employee returns from a policy violation.", "DOT programs and many non-DOT policies"],
          ]}
        />
        <Sub title="Random testing basics">
          <Bullets
            items={[
              "Every employee in the pool must have an equal chance of being selected each time.",
              "Selection should be truly unannounced and spread through the year.",
              "DOT agencies set minimum annual random rates; FMCSA's 2026 minimums are 50% for drugs and 10% for alcohol.",
              "Many smaller employers join a consortium pool rather than running their own.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="DOT vs. non-DOT drug tests">
        <Table
          head={["", "DOT test", "Non-DOT test"]}
          rows={[
            ["Who", "Employees in DOT safety-sensitive roles (for example, CDL drivers under FMCSA)", "Everyone else, under your company policy"],
            ["Rules", "49 CFR part 40 plus the agency rule (e.g., 49 CFR part 382)", "Your written policy, within state and local law"],
            ["Panel", "Fixed DOT 5-panel; cannot be changed", "Flexible: 5-panel, expanded, or custom"],
            ["Lab", "HHS-certified lab; MRO review required", "Lab-based or instant; lab confirmation and MRO review recommended"],
            ["Specimen", "Urine (federal rules govern any other specimen types)", "Urine, oral fluid or hair, depending on policy and state law"],
          ]}
        />
        <p>
          Keep DOT and non-DOT programs separate. DOT forms and procedures should only be used for covered employees. For the
          full DOT picture, including Clearinghouse queries, see our{" "}
          <L href="/blog/dot-drug-testing-fmcsa-clearinghouse-guide">DOT drug testing and Clearinghouse guide</L>.
          Non-DOT programs can use <L href="/instant-drug-testing">instant drug testing</L> for a fast preliminary screen, and{" "}
          <L href="/random-drug-testing">random drug testing</L> when a written policy calls for unannounced tests.
        </p>
      </Section>

      <Section title="Panel basics: 5-panel, expanded and custom">
        <Sub title="5-panel">
          <p>
            The classic panel screens for marijuana (THC), cocaine, amphetamines, opioids and phencyclidine (PCP). The DOT
            version is defined by regulation and includes specific opioids such as codeine, morphine, heroin metabolite,
            hydrocodone, hydromorphone, oxycodone and oxymorphone.
          </p>
        </Sub>
        <Sub title="Expanded panels">
          <p>
            Expanded panels (often called 10-panel or similar) add classes such as benzodiazepines, barbiturates, methadone
            or propoxyphene, depending on the lab&apos;s menu. Employers choose them when roles carry higher safety risk or when
            a client contract asks for them.
          </p>
        </Sub>
        <Sub title="Marijuana and state law">
          <p>
            State marijuana laws vary widely, and some states and cities limit pre-employment THC testing for certain jobs.
            Review your panel by state, especially for non-safety-sensitive roles. These limits do not change DOT
            requirements.
          </p>
        </Sub>
      </Section>

      <Section title="Specimen types">
        <Bullets
          items={[
            <><strong>Urine:</strong> the most common specimen and the standard for DOT testing; typically reflects recent use.</>,
            <><strong>Oral fluid:</strong> collected under direct observation, which reduces tampering; typically reflects very recent use.</>,
            <><strong>Hair:</strong> can show a longer pattern of use; it is not a good indicator of very recent use.</>,
          ]}
        />
        <Note>
          The right mix depends on the role, your state, and any client or regulatory requirement. Write it down in a drug
          testing policy and apply it the same way for everyone in the same role.
        </Note>
      </Section>

      <Section title="How to choose">
        <Bullets
          items={[
            "Start with whether any employees are DOT-covered. If so, set up a DOT program for them first.",
            "For everyone else, a lab-based urine 5-panel with MRO review is a reliable baseline.",
            "Add expanded panels or other specimen types only where the role or a contract calls for it.",
            "Check state and local rules on marijuana, random testing and on-site testing where you hire.",
          ]}
        />
        <p>
          See SaffHire&apos;s <L href="/drug-screening">drug screening services</L>, or pair testing with{" "}
          <L href="/criminal-background-checks">criminal background checks</L> and <L href="/mvr-checks">MVR checks</L>{" "}
          (state fees may apply) for safety-sensitive roles.
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <Sources
        items={[
          { label: "49 CFR part 40: Procedures for Transportation Workplace Drug and Alcohol Testing Programs (eCFR)", href: "https://www.ecfr.gov/current/title-49/subtitle-A/part-40" },
          { label: "U.S. DOT ODAPC: Random Testing Rates", href: "https://www.transportation.gov/odapc/random-testing-rates" },
          { label: "SAMHSA: Drug-Free Workplace resources", href: "https://www.samhsa.gov/workplace" },
        ]}
      />

      <AboutSaffHire>
        <p>
          SaffHire offers DOT-compliant and non-DOT drug screening with collection at Labcorp patient service centers
          Nationwide.
        </p>
      </AboutSaffHire>
    </Article>
  );
}

export const drugTestTypesListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "Screening Guides",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/hero-business-services.webp",
};

export const drugTestTypesEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "Screening Guides",
  date: "October 17, 2026",
  readTime: "8 min read",
  author: "SaffHire Compliance Team",
  image: "/images/hero-business-services.webp",
  featuredImageSuggestion: "Drug test collection site with specimen cups and a custody form",
  keyTakeaways: [
    "Lab-based tests with MRO review are the dependable default",
    "Instant tests are preliminary and not allowed for DOT testing",
    "Random testing needs a neutral selection method and is required for DOT safety-sensitive roles",
    "The DOT 5-panel is fixed; non-DOT panels can be expanded or customized",
    "Check state marijuana and testing laws where you hire",
  ],
  relatedTags: ["Drug Testing", "DOT", "Random Testing", "Drug Panels", "Screening Guides"],
  ArticleComponent: DrugTestTypesArticle,
};
