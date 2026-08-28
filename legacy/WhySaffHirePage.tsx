import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import StatsSection from "@/components/StatsSection";
import PageSEO from "@/components/PageSEO";

export default function WhySaffHirePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/why-saffhire"
        title="Why Choose SaffHire"
        description="Learn why employers nationwide use SaffHire for background screening. FCRA-compliant screening workflows, no setup fees, no minimums, and practical hiring support."
      />
      <Navbar />

      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>WHY SAFFHIRE</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            A Background Screening Partner You Can Trust
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Fast results, FCRA-compliant screening workflows, no setup fees, and a team that treats every client as a partner.
          </p>
        </div>
      </section>

      <AboutSection />
      <StatsSection />
      <WhyChooseUsSection />

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
