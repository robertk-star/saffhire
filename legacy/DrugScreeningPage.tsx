/*
 * Drug Screening Service Page
 * Design: Clean Professional Trust dark navy hero, white content sections, green accents
 * Route: /drug-screening
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Clock,
  Phone,
  Beaker,
  Shield,
} from "lucide-react";

const DRUG_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/drug-screening-hero.webp";

// Key features
const features = [
  "Pre-employment drug testing",
  "Random and post-accident testing",
  "Reasonable suspicion testing",
  "5-panel and 10-panel test options",
  "Instant results available",
  "Certified lab network nationwide",
  "DOT-compliant testing",
  "FCRA compliant process",
];

// Stats
const stats = [
  { value: "Minutes", label: "Instant Results Available" },
  { value: "100%", label: "Certified Labs" },
  { value: "50+", label: "States Covered" },
  { value: "24/7", label: "Scheduling Available" },
];

export default function DrugScreeningPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/drug-screening"
        title="Workplace Drug Testing Services for Employers | SaffHire"
        description="Pre-employment, random, and post-accident drug testing for employers. Certified labs, fast results, FCRA compliant. Serving Frisco TX and nationwide."
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
                DRUG SCREENING
              </p>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Workplace
                <br />
                <span style={{ color: "#22c55e" }}>Drug Testing Services</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Pre-employment, random, and post-accident drug testing for employers. SaffHire connects you with certified labs nationwide for fast, accurate, and FCRA-compliant drug screening.
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
                src={DRUG_IMG}
                alt="Drug screening testing"
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

      {/* ── Types of Drug Tests ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Types of Drug Tests We Offer
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              SaffHire offers comprehensive drug testing solutions for every stage of employment. Whether you need pre-employment screening, ongoing random testing, or post-accident investigation, our certified lab network delivers fast, accurate results.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We offer both 5-panel and 10-panel drug tests, with instant results available for urgent situations. All testing is conducted by certified laboratories and is fully compliant with FCRA requirements and DOT regulations for transportation industry clients.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Candidates are directed to nearby certified collection sites for testing. Results are typically available within 24 hours, with instant preliminary results available in many cases.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Testing Services ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Our Testing Services
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

      {/* ── Why Choose SaffHire ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Why Choose SaffHire for Drug Testing
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <Zap size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Results</h3>
                <p className="text-gray-700">
                  Instant preliminary results available for urgent situations. Confirmed results typically within 24 hours from our certified lab network.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Beaker size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Certified Labs</h3>
                <p className="text-gray-700">
                  All testing is performed by certified laboratories using industry-standard protocols. We maintain partnerships with collection sites nationwide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Full Compliance</h3>
                <p className="text-gray-700">
                  FCRA compliant process with proper candidate notifications and results handling. DOT-compliant testing available for transportation industry requirements.
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
