import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import StatsSection from "@/components/StatsSection";
import PageSEO from "@/components/PageSEO";

const whyFaqs = [
  {
    question: "Who is behind SaffHire?",
    answer: "SaffHire is a Veteran-Owned background screening company founded by Robert Krebsbach, John Waak and Jody Thigpen.",
  },
  {
    question: "Where is SaffHire based, and who do you serve?",
    answer: "SaffHire is based in Frisco, TX and serves employers nationwide.",
  },
  {
    question: "Are there setup fees or minimums?",
    answer: "No. SaffHire has no setup fees and no minimums. You only pay for the screens you run.",
  },
  {
    question: "How fast are results?",
    answer:
      "Instant searches usually return in minutes: MVR, Sex Offender registry, Global Security Watch List, SSN Trace, state database searches and the National Criminal Database search. Searches that require court or employer contact, such as county criminal searches and verifications, take longer.",
  },
  {
    question: "How is applicant data protected?",
    answer: "SaffHire uses bank-level encryption to protect applicant and client data, and your secure portal is available 24/7.",
  },
  {
    question: "Does SaffHire help with FCRA compliance?",
    answer:
      "Yes. SaffHire's workflows support FCRA requirements, including the standalone disclosure and applicant authorization. Employers remain responsible for their own hiring decisions and legal compliance.",
  },
];

const whyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: whyFaqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function WhySaffHirePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/why-saffhire"
        title="Why Choose SaffHire"
        description="Learn why employers nationwide use SaffHire for background screening. FCRA-compliant screening workflows, no setup fees, no minimums, and practical hiring support."
      />
      <script type="application/ld+json">{JSON.stringify(whyFaqSchema)}</script>
      <Navbar />

      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>WHY SAFFHIRE</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            A Background Screening Partner You Can Trust
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A Veteran-Owned company delivering fast results, FCRA-compliant screening workflows, no setup fees, and a team that treats every client as a partner.
          </p>
        </div>
      </section>

      <AboutSection />
      <StatsSection />
      <WhyChooseUsSection />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {whyFaqs.map((f) => (
              <div key={f.question} className="border border-gray-200 rounded-lg overflow-hidden">
                <h3 className="px-6 py-4 font-semibold text-gray-900 bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.question}</h3>
                <p className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-700">
            More answers on our <a href="/faq" className="font-bold text-green-700 underline">FAQ page</a>.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Experience the SaffHire Difference?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join employers nationwide who use SaffHire for practical, compliance-aware background screening.
          </p>
          <a href="/contact" className="btn-green rounded-sm px-10 py-4 text-base font-bold inline-block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get a Free Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
