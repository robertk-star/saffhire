/*
 * AboutSection Component SaffHire Background Screening
 */

import { RefreshCw, BarChart2, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="why-saffhire" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <div>
            <p className="section-label mb-3">ABOUT US</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              A Journey of Resilience and Growth
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                SaffHire opened its doors with excitement, passion, and a vision to make a lasting
                impact. But just one week later, the world changed in ways we could have never
                imagined. The COVID-19 pandemic hit, and what was supposed to be the thrilling start
                of our business turned into an immediate test of resilience and adaptability.
              </p>
              <p>
                Like many businesses, we faced uncertainty, challenges, and moments where we weren't
                sure how we would push through. But through it all, we remained committed to our
                mission, adapted quickly, and found ways to continue serving our clients.
              </p>
              <p>
                Headquartered in Frisco, Texas, SaffHire serves clients across all 50 states with a
                commitment to practical, compliance-aware background screening.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="feature-icon-box">
                  <RefreshCw size={20} style={{ color: "#22c55e" }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Stay Compliant</h4>
                  <p className="text-sm text-gray-600">
                    SaffHire supports FCRA-compliant screening workflows and EEOC-aware hiring practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="feature-icon-box">
                  <BarChart2 size={20} style={{ color: "#22c55e" }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Candidate Screening</h4>
                  <p className="text-sm text-gray-600">
                    Find out quickly and efficiently if a candidate is going to be a good fit for your company.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="feature-icon-box">
                  <Shield size={20} style={{ color: "#22c55e" }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Data Compliance</h4>
                  <p className="text-sm text-gray-600">
                    Bank-level encrypted security with 24/7 access to your screening portal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img src="/images/about-team.webp" alt="SaffHire team" className="w-full rounded-lg shadow-xl object-cover" style={{ height: 480 }} />
            <div className="absolute -bottom-6 -left-6 rounded-lg p-6 shadow-lg" style={{ backgroundColor: "#22c55e" }}>
              <p className="text-white text-4xl font-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>5+</p>
              <p className="text-white text-sm font-semibold mt-1">Years of Success</p>
              <p className="text-green-100 text-xs mt-1">Since 2020</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8" style={{ backgroundColor: "#22c55e" }}>
          <div>
            <p className="text-white text-sm font-bold tracking-widest mb-2" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.12em" }}>FREE CONSULTATION</p>
            <h3 className="text-white text-2xl lg:text-3xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Schedule for Free Consultation</h3>
            <p className="text-green-100 mt-2">
              Call us at{" "}
              <a href="tel:8885881733" className="text-white font-bold underline">888-588-1733</a>
            </p>
          </div>
          <a href="/#contact" className="flex-shrink-0 bg-white text-green-600 font-bold px-8 py-3 rounded-sm hover:bg-gray-100 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
