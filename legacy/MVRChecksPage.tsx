/*
 * MVR Checks Service Page
 * Design: Clean Professional Trust dark navy hero, white content sections, green accents
 * Route: /mvr-checks
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
  Truck,
  Shield,
} from "lucide-react";

const MVR_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/mvr-checks-hero.webp";

// Key features
const features = [
  "License status and validity verification",
  "Traffic violations and citations",
  "Accident history",
  "DUI and suspension records",
  "Commercial driver license (CDL) status",
  "DOT compliance verification",
  "All 50 states covered",
  "FCRA compliant process",
];

// Stats
const stats = [
  { value: "24-48 hrs", label: "Average Turnaround" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "50", label: "States Covered" },
  { value: "24/7", label: "Portal Access" },
];

export default function MVRChecksPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/mvr-checks"
        title="MVR and Driving Record Checks for Employers | SaffHire"
        description="Motor vehicle record checks for drivers and transportation companies. DOT compliant, fast results. Serving Frisco TX and businesses nationwide."
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
                MVR CHECKS
              </p>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                MVR and Driving
                <br />
                <span style={{ color: "#22c55e" }}>Record Checks</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Motor vehicle record checks for drivers and transportation companies. SaffHire delivers fast, DOT-compliant MVR checks covering all 50 states.
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
                src={MVR_IMG}
                alt="MVR driving record checks"
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

      {/* ── What an MVR Check Includes ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            What an MVR Check Includes
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              An MVR (Motor Vehicle Record) check reveals the complete driving history of a candidate. This includes current license status, traffic violations, accidents, DUI records, license suspensions, and commercial driver license information. For any position involving driving, an MVR check is essential.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              SaffHire retrieves MVR records directly from state motor vehicle departments. Our reports are comprehensive, accurate, and updated in real-time. We cover all 50 states and provide DOT-compliant reports for transportation industry requirements.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you need MVR checks for delivery drivers, commercial truck drivers, rideshare operators, or any role involving vehicle operation, SaffHire delivers fast, reliable results.
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Check ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            What We Check
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

      {/* ── Why MVR Checks Matter ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Why MVR Checks Matter
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <Truck size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Safety First</h3>
                <p className="text-gray-700">
                  Drivers with poor driving records pose a safety risk to your organization, customers, and the public. MVR checks help you identify high-risk drivers before they cause accidents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertTriangle size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Liability Protection</h3>
                <p className="text-gray-700">
                  Hiring a driver with a history of DUI, reckless driving, or accidents can expose your company to negligent hiring liability. MVR checks protect your organization.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield size={24} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">DOT Compliance</h3>
                <p className="text-gray-700">
                  For commercial transportation, DOT regulations require MVR checks as part of the hiring process. SaffHire provides DOT-compliant reports that meet all federal requirements.
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
