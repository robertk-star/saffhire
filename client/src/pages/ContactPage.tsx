/*
 * ContactPage - Standalone /contact route
 * Renders the full contact form so Google can index it.
 * Previously only accessible as /#contact (hash anchor on the homepage).
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageSEO from "@/components/PageSEO";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/contact"
        title="Contact Us"
        description="Get in touch with SaffHire for a free consultation and custom background screening quote. Call 888-588-1733 or fill out our contact form."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-10" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            GET IN TOUCH
          </p>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Contact SaffHire
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to streamline your hiring process? Our team is here to help with a free
            consultation and a custom quote tailored to your business.
          </p>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
}
