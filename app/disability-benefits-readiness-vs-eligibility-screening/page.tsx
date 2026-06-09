import type { Metadata } from "next";
import GuidePage from "@/components/seo/GuidePage";
import { SITE_URL } from "@/lib/site";

const title = "Disability Benefits Readiness vs. Eligibility Screening";
const description =
  "A plain-English guide explaining the difference between disability benefits readiness preparation and eligibility screening, and why organizing information first matters.";
const slug = "disability-benefits-readiness-vs-eligibility-screening";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/${slug}` },
  openGraph: { title, description, url: `${SITE_URL}/${slug}` },
};

const faqs = [
  {
    question: "What is disability benefits readiness?",
    answer:
      "Disability benefits readiness means organizing the information that may be useful before applying, appealing, or speaking with an advocate or representative. It focuses on records, treatment, work history, daily limitations, notices, and possible missing information.",
  },
  {
    question: "Is readiness the same as eligibility?",
    answer:
      "No. Readiness is about preparation and organization. Eligibility is decided by the Social Security Administration using official program rules and the complete information in a person's case.",
  },
  {
    question: "Why does readiness matter before applying?",
    answer:
      "Many people start with scattered records, unclear work history, missing treatment dates, or short answers about daily limits. Organizing those details first can make it easier to explain the situation clearly and avoid preventable gaps.",
  },
  {
    question: "Can a readiness screening tell someone what SSA will decide?",
    answer:
      "No. A readiness screening does not make benefit decisions, provide legal advice, or guarantee any result. It helps identify what information has been provided and what may still need attention.",
  },
  {
    question: "Who should use a readiness tool?",
    answer:
      "A readiness tool may help people who want to apply for disability benefits, people preparing an appeal, or people who are unsure whether their current information is organized clearly enough for the next step.",
  },
];

export default function DisabilityBenefitsReadinessVsEligibilityScreeningPage() {
  return (
    <GuidePage
      title={title}
      description={description}
      slug={slug}
      quickAnswer={
        <p>
          Disability benefits readiness is about getting organized before the next step. Eligibility screening
          often sounds like it can tell a person whether they meet program rules. A readiness approach is safer
          and clearer: it helps organize medical records, work history, treatment, daily limitations, notices,
          and missing information without making benefit decisions or promising results.
        </p>
      }
      whoThisIsFor="This page is for people who want to apply for disability benefits or prepare an appeal but are not sure whether their current information is complete, organized, or clearly explained. It can help you understand what medical, work, treatment, daily-limitation, and SSA notice information to gather, and how to think about wording your answers so your situation is easier to understand. It does not make benefit decisions or guarantee any result."
      checklistTitle="Readiness vs. eligibility: the key differences"
      checklistItems={[
        "Readiness focuses on whether important information is organized and easy to review",
        "Eligibility is decided only through official SSA rules and case review",
        "Readiness tools can help identify missing records, dates, providers, work details, or limitation examples",
        "A readiness report should not promise benefits, predict outcomes, or replace official SSA guidance",
        "Readiness preparation can help a person give clearer answers about medical treatment, work history, symptoms, and daily limits",
        "Eligibility questions often depend on medical evidence, work history, income, resources, duration, severity, and other official review factors",
      ]}
      whatToGatherTitle="What a readiness approach helps organize"
      whatToGatherItems={[
        "Medical providers, clinics, hospitals, specialists, and approximate treatment dates",
        "Current conditions, symptoms, diagnosis information, and treatment history",
        "Medications, side effects, devices, therapy, testing, imaging, and hospital or ER visits",
        "Work history, job duties, reduced hours, missed work, earnings, and last-worked information",
        "Daily limitations such as sitting, standing, walking, lifting, focus, memory, attendance, rest breaks, and help from others",
        "SSA notices, denial letters, appeal deadlines, hearing notices, and questions to ask before the next step",
      ]}
      commonMistakes={[
        "Using eligibility-style language when the tool is really helping with preparation",
        "Telling users a tool can decide or predict something only SSA can decide",
        "Collecting information without clearly explaining how it will be used",
        "Letting a person request advocate contact without making that consent separate and optional",
        "Giving only a short condition name instead of organizing treatment, work, and daily limitation examples",
        "Forgetting that missing information can be just as important as information already provided",
      ]}
      screeningHelp="The free readiness screening helps organize medical, treatment, work, daily limitation, application-status, and notice information into a preparation-focused report. It shows what information was provided and what may still be useful to gather before applying, appealing, or speaking with someone."
      faqs={faqs}
      relatedLinks={[
        { href: "/apply-for-disability-benefits-readiness", label: "Free Disability Benefits Readiness Screening" },
        { href: "/resources", label: "Disability Benefits Resources" },
        { href: "/disability-application-checklist", label: "Disability Application Checklist" },
        { href: "/medical-records-needed-for-disability", label: "Medical Records Needed for Disability" },
        { href: "/how-to-describe-work-limitations", label: "How to Describe Work Limitations" },
        { href: "/what-to-gather-before-talking-to-a-disability-advocate", label: "What to Gather Before Talking to an Advocate" },
        { href: "/disability-benefits-glossary", label: "Disability Benefits Glossary" },
      ]}
    />
  );
}
