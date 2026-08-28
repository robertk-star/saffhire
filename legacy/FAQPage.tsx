import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I get started with SaffHire?",
        answer:
          "Getting started is simple. Create a free account at intake.saffhire.com with no setup fees and no minimums. Once your account is active, you can begin ordering background checks immediately.",
      },
      {
        question: "Is there a setup fee or monthly minimum?",
        answer: "No. SaffHire has no setup fees and no monthly minimums. You only pay for the screens you run.",
      },
      {
        question: "How do I submit a background check request?",
        answer:
          "Enter your applicant's name and email address in your SaffHire portal. We send them a secure digital link to complete their authorization and personal information. You receive the results directly in your portal.",
      },
    ],
  },
  {
    title: "Turnaround Times",
    items: [
      {
        question: "How long does a background check take?",
        answer:
          "Many results are available in as little as 5 minutes. Fuller verification with county-level criminal searches and employment verification typically completes within 24 to 48 hours. Drug screening results from certified labs are typically available within 24 to 72 hours.",
      },
      {
        question: "Why do some background checks take longer than others?",
        answer:
          "Turnaround time depends on the type of search. National database searches can return quickly. County-level criminal searches require court record retrieval, which varies by county. Employment and education verifications depend on how quickly prior employers or institutions respond.",
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        question: "Are you FCRA compliant?",
        answer:
          "SaffHire is built around FCRA-compliant screening workflows, including disclosures, authorization, and adverse-action support. Employers remain responsible for following applicable federal, state, and local requirements.",
      },
      {
        question: "What is the FCRA and why does it matter?",
        answer:
          "The Fair Credit Reporting Act (FCRA) is a federal law that governs how background checks can be conducted and how the information can be used in hiring decisions. SaffHire provides tools and workflows to support disclosures and authorizations. Employers remain responsible for their own hiring decisions and legal compliance.",
      },
    ],
  },
  {
    title: "Types of Searches",
    items: [
      {
        question: "What is the difference between a national criminal search and a county criminal search?",
        answer:
          "A national criminal database search checks a large aggregated database of records from across the country. National databases are incomplete. A county criminal search goes directly to the courthouse and retrieves court records for that jurisdiction.",
      },
      {
        question: "Do you offer drug testing?",
        answer:
          "Yes. We offer pre-employment, random, post-accident, and reasonable-suspicion drug testing through certified labs nationwide. Instant result options are also available.",
      },
      {
        question: "Do you offer DOT-compliant screening for transportation companies?",
        answer:
          "Yes. We offer DOT-related background screening packages for drivers and transportation professionals, including MVR checks, drug and alcohol testing, and criminal history searches.",
      },
      {
        question: "Do you offer OIG exclusion screening for healthcare?",
        answer:
          "Yes. We check the HHS Office of Inspector General exclusion list and the System for Award Management (SAM) database for healthcare clients.",
      },
    ],
  },
  {
    title: "Pricing and Accounts",
    items: [
      {
        question: "How much does a background check cost?",
        answer:
          "Pricing starts at $20 per applicant for a basic screening package. Comprehensive packages can range between $35 and $110 depending on the extent of the screening. Custom packages are available for high-volume clients and nonprofits.",
      },
      {
        question: "Do you offer volume discounts?",
        answer: "Yes. We offer custom pricing for high-volume clients, staffing agencies, and nonprofits. Contact us for a custom quote.",
      },
      {
        question: "Is my data secure?",
        answer: "SaffHire uses bank-level encryption to protect applicant and client data. Our portal is available 24/7 with secure access.",
      },
    ],
  },
];

const generateFAQSchema = () => {
  const mainEntity = faqSections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  );
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity };
};

function FAQAccordion({ section }: { section: FAQSection }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  return (
    <div className="mb-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>{section.title}</h2>
      <div className="space-y-3">
        {section.items.map((item, index) => (
          <div key={item.question} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-400 transition-colors">
            <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
              <h3 className="text-left font-semibold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.question}</h3>
              <ChevronDown size={20} className={`text-green-500 flex-shrink-0 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`} />
            </button>
            {expandedIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/faq" title="Background Screening FAQ | SaffHire" description="Answers to common questions about background screening, FCRA-compliant workflows, turnaround times, and how SaffHire works." />
      <script type="application/ld+json">{JSON.stringify(generateFAQSchema())}</script>
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>HELP & SUPPORT</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Frequently Asked Questions</h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">Find answers to common questions about background screening, FCRA-compliant workflows, turnaround times, and how SaffHire works.</p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqSections.map((section) => (
            <FAQAccordion key={section.title} section={section} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
