/*
 * ContactPage - Standalone /contact route
 * Renders the full contact form so Google can index it.
 * Previously only accessible as /#contact (hash anchor on the homepage).
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageSEO from "@/components/PageSEO";
import PageFAQ from "@/components/PageFAQ";
import { contactFaqs } from "@/data/pageFaqs";

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

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>How to Get a Custom Quote</h2>
            <p>Tell us about the positions you hire for, the states where your candidates live or work, and any client, insurance or regulatory requirements. We will recommend a package and send a custom quote. Packages are customized to each client&apos;s needs, and the <a href="/packages" className="font-bold text-green-600 underline">standard packages</a> are good starting points.</p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ways to Reach SaffHire</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Phone: <a href="tel:8885881733" className="text-green-600 underline">888-588-1733</a></li>
              <li>Email: <a href="mailto:info@saffhire.com" className="text-green-600 underline">info@saffhire.com</a></li>
              <li>Headquarters: Frisco, TX, serving employers nationwide</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Before You Order Your First Background Check</h2>
            <p>Under the FCRA, employers must give candidates a standalone written disclosure and get their written authorization before ordering a background check. SaffHire&apos;s invitation workflow collects both electronically. Have questions first? Visit our <a href="/faq" className="font-bold text-green-600 underline">FAQ</a>.</p>
          </div>
        </div>
      </section>

      <PageFAQ title="Contact and Account Questions" items={contactFaqs} />

      <Footer />
    </div>
  );
}
