/*
 * Criminal Background Checks Service Page
 * Design: Clean Professional Trust dark navy hero, white content sections, green accents
 * Route: /criminal-background-checks
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  FileSearch,
  AlertTriangle,
  Phone,
  Globe,
  MapPin,
  Users,
} from "lucide-react";

const CRIMINAL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/criminal-background-checks-hero.webp";

// Criminal search types with descriptions
const searchTypes = [
  {
    icon: Globe,
    title: "National Criminal Database Search",
    description:
      "Searches a multi-jurisdictional database of criminal records from across the United States. Returns results instantly and is ideal as a first-pass search. Note: national databases are incomplete and should always be paired with a county search for thorough screening.",
  },
  {
    icon: MapPin,
    title: "County Criminal Court Search",
    description:
      "The most accurate criminal search available. We retrieve actual court records directly from the county courthouse for each jurisdiction where your applicant has lived or worked. Essential for compliant, thorough screening.",
  },
  {
    icon: ShieldCheck,
    title: "Federal Criminal Court Search",
    description:
      "Searches federal district court records for crimes prosecuted at the federal level including fraud, embezzlement, drug trafficking, and other federal offenses not captured in county records.",
  },
  {
    icon: FileSearch,
    title: "State Criminal Repository Search",
    description:
      "Searches the statewide criminal record repository for the states where your applicant has lived. Coverage and completeness varies by state.",
  },
  {
    icon: AlertTriangle,
    title: "Sex Offender Registry Search",
    description:
      "Checks all 50 state sex offender registries to confirm your applicant does not appear on any registered offender list.",
  },
  {
    icon: Clock,
    title: "Global Watchlist Search",
    description:
      "Searches international terrorist watchlists, OFAC lists, and other global compliance databases. Essential for financial services and government contractors.",
  },
];

// Stats
const stats = [
  { value: "Minutes", label: "National Search Results" },
  { value: "24-48 hrs", label: "County Search Turnaround" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

// Industries served
const industries = [
  "Staffing Agencies",
  "Healthcare",
  "Transportation",
  "Warehousing & Logistics",
  "Oil & Gas",
  "Small Businesses",
  "Nonprofits",
];

// Key benefits
const benefits = [
  "National searches return results in minutes",
  "County searches completed within 24-48 hours",
  "100% FCRA compliant screening process",
  "No setup fees or monthly minimums",
  "24/7 secure portal access",
];

export default function CriminalBackgroundChecksPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/criminal-background-checks"
        title="Criminal Background Check Services for Employers | SaffHire"
        description="FCRA-compliant criminal background checks for businesses of all sizes. National, state, federal, and county-level searches. Serving Frisco TX and businesses nationwide."
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
                CRIMINAL SCREENING
              </p>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Criminal Background
                <br />
                <span style={{ color: "#22c55e" }}>Check Services</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Hiring without a criminal background check is a risk no business should take. SaffHire delivers fast, accurate, and fully FCRA-compliant criminal screening for employers across every industry from small businesses to large staffing agencies.
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
                src={CRIMINAL_IMG}
                alt="Criminal background check screening"
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

      {/* ── Types of Criminal Searches ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Types of Criminal Searches We Offer
            </h2>
            <div className="w-16 h-1" style={{ backgroundColor: "#22c55e" }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchTypes.map((search, idx) => {
              const Icon = search.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Icon size={28} style={{ color: "#22c55e", flexShrink: 0 }} />
                    <h3
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {search.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{search.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why County-Level Searches Matter ──────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Why County-Level Searches Matter
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              National criminal databases are incomplete. Many counties do not report their records to national databases, which means a national search alone can miss critical criminal history. The only way to get a complete picture of an applicant's criminal background is to search at the county level where the crime was actually prosecuted.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              SaffHire does it right. We pair national database searches with targeted county-level searches in every jurisdiction where your applicant has lived or worked. This comprehensive approach ensures you have the full story before making a hiring decision.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Relying solely on national databases puts your organization at legal risk. Our multi-layered approach to criminal screening is the industry standard for FCRA compliance and thorough due diligence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who We Serve ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Who We Serve
          </h2>
          <div className="w-16 h-1 mb-12" style={{ backgroundColor: "#22c55e" }}></div>

          <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-3xl">
            Whether you're a staffing agency placing hundreds of candidates, a healthcare organization screening clinical staff, a transportation company managing drivers, or a small business making your first hire, SaffHire delivers the criminal background screening you need. We also serve warehousing and logistics, oil and gas, and nonprofits with specialized compliance solutions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                <span className="text-gray-900 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fast Turnaround. Full Compliance. ──────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Fast Turnaround. Full Compliance.
          </h2>

          <div className="space-y-4 mb-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2
                  size={24}
                  style={{ color: "#22c55e", flexShrink: 0, marginTop: "2px" }}
                />
                <span className="text-gray-700 text-lg font-medium">{benefit}</span>
              </div>
            ))}
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
