/*
 * Employment Verification Service Page
 * Design: Clean Professional Trust dark navy hero, white content sections, green accents
 * Route: /employment-verification
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
  FileCheck,
  Shield,
} from "lucide-react";

const EMPLOYMENT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/employment-verification-hero.webp";

// Key features
const features = [
  "Verification of employment dates and tenure",
  "Job title and position confirmation",
  "Salary and compensation verification",
  "Eligibility for rehire status",
  "FCRA compliant process",
  "Fast turnaround times",
  "Direct contact with previous employers",
  "Detailed verification reports",
];

// Stats
const stats = [
  { value: "24-48 hrs", label: "Average Turnaround" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "50+", label: "States Covered" },
  { value: "24/7", label: "Portal Access" },
];

export default function EmploymentVerificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/employment-verification"
        title="Employment Verification Services for Employers | SaffHire"
        description="Verify past employment history quickly and accurately. FCRA-compliant employment verification for businesses nationwide. Serving Frisco TX."
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
                EMPLOYMENT VERIFICATION
              </p>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Employment
                <br />
                <span style={{ color: "#22c55e" }}>Verification Services</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Verify past employment history quickly and accurately. SaffHire delivers fast, FCRA-compliant employment verification for businesses of all sizes across every industry.
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
                src={EMPLOYMENT_IMG}
                alt="Employment verification screening"
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

      {/* ── Why Employment Verification Matters ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Why Employment Verification Matters
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Resume fraud is more common than most employers realize. Studies show that up to 40% of job applicants misrepresent their employment history, either by inflating job titles, extending employment dates, or omitting positions entirely. Hiring someone with falsified employment credentials puts your organization at risk.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Employment verification confirms that an applicant's claimed work history is accurate. We contact previous employers directly to verify employment dates, job titles, responsibilities, and eligibility for rehire. This simple step catches resume fraud before it becomes a hiring mistake.
            </p>
            <p className="text-gray-700 leading-relaxed">
              SaffHire makes employment verification fast and easy. Our team handles all the legwork, contacting employers and compiling detailed verification reports. You get the answers you need in 24-48 hours, fully FCRA compliant.
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

      {/* ── Fast Turnaround. Full Compliance. ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Fast Turnaround. Full Compliance.
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <Clock size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Quick Results</h3>
                <p className="text-gray-700">
                  Most employment verifications are completed within 24-48 hours. Our team works directly with HR departments and previous employers to get the information you need fast.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">FCRA Compliant</h3>
                <p className="text-gray-700">
                  All employment verification is conducted in full compliance with the Fair Credit Reporting Act. We handle all required disclosures and authorizations on your behalf.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FileCheck size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Detailed Reports</h3>
                <p className="text-gray-700">
                  Receive comprehensive verification reports that clearly show what was confirmed, what could not be verified, and any discrepancies found in the applicant's employment history.
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
