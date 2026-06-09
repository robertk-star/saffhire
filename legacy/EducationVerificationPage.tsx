/*
 * Education Verification Service Page
 * Design: Clean Professional Trust dark navy hero, white content sections, green accents
 * Route: /education-verification
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Phone,
  Award,
  Shield,
} from "lucide-react";

const EDUCATION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/education-verification-hero.webp";

// Key features
const features = [
  "Degree and diploma verification",
  "Certification and license verification",
  "Attendance dates confirmation",
  "GPA verification when available",
  "Primary source verification",
  "Direct contact with institutions",
  "Fast turnaround times",
  "FCRA compliant process",
];

// Stats
const stats = [
  { value: "24-48 hrs", label: "Average Turnaround" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "10,000+", label: "Institutions Covered" },
  { value: "24/7", label: "Portal Access" },
];

export default function EducationVerificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/education-verification"
        title="Education Verification Services for Employers | SaffHire"
        description="Verify degrees, diplomas, and certifications quickly and accurately. FCRA-compliant education verification for employers nationwide. Serving Frisco TX."
      />

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            {/* Left: Text */}
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"
              >
                <ArrowLeft size={14} />
                Back to Home
              </a>
              <p
                className="section-label mb-3"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                EDUCATION VERIFICATION
              </p>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Education
                <br />
                <span style={{ color: "#22c55e" }}>Verification Services</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Verify degrees, diplomas, and certifications quickly and accurately. SaffHire delivers fast, FCRA-compliant education verification for employers nationwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/#contact"
                  className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Get a Free Quote <ArrowRight size={16} />
                </a>
                <a
                  href="tel:8885881733"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Phone size={16} />
                  888-588-1733
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden lg:block">
              <img
                src={EDUCATION_IMG}
                alt="Education verification screening"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#22c55e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-green-400">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 px-6 text-center">
                <p
                  className="text-2xl lg:text-3xl font-black text-white mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-green-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Education Verification Matters ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Why Education Verification Matters
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Credential fraud is a growing problem. Job applicants falsify educational credentials more often than employers realize. Fake degrees, inflated certifications, and misrepresented educational backgrounds can lead to hiring unqualified candidates and exposing your organization to liability.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Education verification confirms that an applicant's claimed degrees, diplomas, and certifications are legitimate. We contact educational institutions directly to verify enrollment, graduation dates, degrees awarded, and certifications earned. This simple step prevents credential fraud before it becomes a hiring mistake.
            </p>
            <p className="text-gray-700 leading-relaxed">
              SaffHire makes education verification fast and reliable. Our team handles all communication with schools, colleges, universities, and certification bodies. You get detailed verification reports in 24-48 hours, fully FCRA compliant.
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Verify ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            What We Verify
          </h2>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2
                  size={24}
                  style={{ color: "#22c55e", flexShrink: 0, marginTop: "2px" }}
                />
                <span className="text-gray-700 text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primary Source Verification ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Primary Source Verification
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <Award size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Direct Verification</h3>
                <p className="text-gray-700">
                  We verify credentials directly with the issuing institutions, not through third-party databases. This ensures accuracy and catches fraudulent credentials that might slip through other verification methods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Turnaround</h3>
                <p className="text-gray-700">
                  Most education verifications are completed within 24-48 hours. Our team works directly with registrars and credential departments to get the information you need quickly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">FCRA Compliant</h3>
                <p className="text-gray-700">
                  All education verification is conducted in full compliance with the Fair Credit Reporting Act. We handle all required disclosures and authorizations on your behalf.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-300">
            <a
              href="/#contact"
              className="btn-green inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-lg"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Get a Free Quote <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
