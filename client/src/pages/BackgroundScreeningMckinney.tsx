/*
 * Background Screening McKinney TX Page
 * Location-specific landing page for McKinney businesses
 */

import { CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

export default function BackgroundScreeningMckinney() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/background-screening-mckinney-tx"
        title="Background Screening Services in McKinney, TX | SaffHire"
        description="Background screening for McKinney TX businesses. Criminal checks, employment verification, and drug testing. FCRA compliant, no setup fees."
      />

      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-green-400 font-semibold mb-2">LOCATION SERVICES</p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Background Screening Services for McKinney, TX Businesses
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                McKinney is one of the fastest-growing cities in the United States, with a booming retail, healthcare, and manufacturing sector. SaffHire provides fast, reliable background screening for McKinney businesses of all sizes.
              </p>
              <a
                href="/#contact"
                className="inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Background Screening for Growing McKinney Businesses
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  McKinney's rapid growth means businesses need hiring solutions that keep pace with demand. SaffHire serves McKinney retailers, healthcare providers, and manufacturers with fast, FCRA-compliant background screening that scales with your business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <span className="text-gray-700">Fast turnaround times for retail and hospitality hiring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <span className="text-gray-700">FCRA and EEOC compliant screening</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <span className="text-gray-700">No setup fees, no minimums</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <span className="text-gray-700">24/7 portal access for all your screening needs</span>
                  </li>
                </ul>
              </div>

              {/* Right: Contact Info */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Contact Our Team
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Call us</p>
                      <a href="tel:+1-888-588-1733" className="text-lg font-bold text-gray-900">
                        (888) 588-1733
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href="mailto:info@saffhire.com" className="text-lg font-bold text-gray-900">
                        info@saffhire.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Service Area</p>
                      <p className="text-lg font-bold text-gray-900">McKinney and All 50 States</p>
                    </div>
                  </div>
                </div>
                <a
                  href="/#contact"
                  className="block w-full text-center px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Our Screening Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Criminal Background Checks</h3>
                  <p className="text-gray-700 text-sm">National and county-level criminal record searches.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Employment Verification</h3>
                  <p className="text-gray-700 text-sm">Verify employment history and job titles.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Drug Screening</h3>
                  <p className="text-gray-700 text-sm">Pre-employment and random drug testing.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Education Verification</h3>
                  <p className="text-gray-700 text-sm">Verify degrees and professional certifications.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
