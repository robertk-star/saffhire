/*
 * Transportation Industry Page - SaffHire Background Screening
 * Design: Clean Professional Trust - dark navy hero, white content sections, green accents
 * Route: /industries/transportation
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
  Truck,
  Zap,
  BadgeCheck,
  BarChart3,
  Phone,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const TRANSPORT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/transportation-trucking-e5XVJsb3NqKq7bBzpvWYdp.webp";

// Services
const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional county, state, and federal criminal history searches. Identify disqualifying offenses before a driver ever gets behind the wheel.",
  },
  {
    icon: Truck,
    title: "MVR / Driving Record Checks",
    description:
      "Motor vehicle record reports pulled directly from state DMV sources. Review license class, endorsements, violations, suspensions, and accident history.",
  },
  {
    icon: Zap,
    title: "DOT Drug and Alcohol Testing",
    description:
      "FMCSA-mandated pre-employment, random, post-accident, and return-to-duty drug and alcohol testing conducted at certified labs. Full DOT compliance.",
  },
  {
    icon: BadgeCheck,
    title: "CDL Verification",
    description:
      "Verify commercial driver's license class, endorsements (Hazmat, Tanker, Doubles/Triples), and current status directly with issuing state authorities.",
  },
  {
    icon: BarChart3,
    title: "Employment Verification",
    description:
      "Confirm prior employment history including DOT-regulated employer inquiries covering drug and alcohol testing records for the previous three years.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing MVR Monitoring",
    description:
      "Continuous license monitoring alerts you when a driver receives a new violation, suspension, or revocation between annual review cycles.",
  },
];

// Challenges
const challenges = [
  {
    icon: AlertTriangle,
    title: "FMCSA Compliance Requirements",
    description:
      "DOT-regulated carriers must follow strict pre-employment and ongoing screening requirements under 49 CFR Part 391. SaffHire delivers fully compliant reports that meet federal standards.",
  },
  {
    icon: Clock,
    title: "Fast Driver Onboarding",
    description:
      "Driver shortages mean you cannot afford slow screening. SaffHire returns MVR and criminal results in as little as 5 minutes so you can onboard qualified drivers without delay.",
  },
  {
    icon: ShieldCheck,
    title: "Negligent Entrustment Risk",
    description:
      "Putting an unqualified driver behind the wheel exposes your company to significant liability. Thorough pre-employment screening is your first line of defense.",
  },
  {
    icon: BarChart3,
    title: "High Driver Turnover",
    description:
      "The trucking industry sees annual turnover rates above 90% at large carriers. SaffHire's no-minimum, no-setup-fee model scales with your hiring volume without punishing you for fluctuations.",
  },
];

// Compliance items
const complianceItems = [
  "FMCSA 49 CFR Part 391 driver qualification standards",
  "DOT pre-employment drug and alcohol testing requirements",
  "MVR review requirements for CDL and non-CDL drivers",
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "Multi-state and multi-jurisdictional criminal coverage",
];

// Roles commonly screened
const roles = [
  "CDL Class A Drivers (OTR, Regional)",
  "CDL Class B Drivers",
  "Non-CDL Delivery Drivers",
  "Owner-Operators",
  "Hazmat Drivers",
  "Tanker and Flatbed Drivers",
  "Last-Mile Delivery Drivers",
  "Dispatcher and Fleet Managers",
  "Warehouse and Dock Workers",
  "Bus and Motorcoach Drivers",
  "School Bus Drivers",
  "Logistics and Operations Staff",
];

// Stats
const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "All 50", label: "States Covered" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function TransportationPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/transportation" title="Background Screening for Transportation Companies" description="DOT-compliant background screening for drivers and transportation companies. MVR checks, drug testing, and criminal history. Serving Frisco TX and nationwide." />

      <Navbar />

      {/* Hero */}
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
                INDUSTRY SOLUTIONS
              </p>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Transportation
                <br />
                <span style={{ color: "#22c55e" }}>Background Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                DOT-compliant driver screening built for trucking companies, logistics providers,
                and fleet operators. Keep unsafe drivers off the road and your company protected
                from liability.
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
                src={TRANSPORT_IMG}
                alt="Commercial truck driver at a freight terminal"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
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
                <p className="text-green-900 text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={TRANSPORT_IMG}
                alt="Truck driver at logistics hub"
                className="w-full object-cover"
                style={{ height: 480 }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: "linear-gradient(to top, rgba(15,23,42,0.95) 0%, transparent 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    <Truck size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      DOT-Compliant Screening
                    </p>
                    <p className="text-gray-400 text-xs">
                      FMCSA-ready reports for every driver you hire.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="section-label mb-3">THE CHALLENGE</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Every Driver You Hire Is a Risk Decision.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Transportation companies face a unique combination of regulatory pressure and
                public safety responsibility. Federal Motor Carrier Safety Administration (FMCSA)
                regulations require specific pre-employment screening for CDL drivers, and failure
                to comply can result in fines, out-of-service orders, and loss of operating
                authority.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Beyond compliance, a single accident involving a driver with a disqualifying
                history can expose your company to catastrophic negligent entrustment liability.
                SaffHire's transportation screening program is built to keep your fleet compliant,
                your drivers qualified, and your company protected.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={16} style={{ color: "#22c55e" }} />
                        <p
                          className="font-bold text-gray-900 text-sm"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.title}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">OUR SERVICES</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Complete Driver Qualification Screening
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From MVR reports and DOT drug testing to CDL verification and ongoing monitoring,
              SaffHire provides every screening component required to build a compliant driver
              qualification file.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "#f0fdf4" }}
                  >
                    <Icon size={22} style={{ color: "#22c55e" }} />
                  </div>
                  <h3
                    className="font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-3">COMPLIANCE</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Built for DOT-Regulated Carriers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                DOT-regulated motor carriers operating under FMCSA authority must meet specific
                driver qualification standards defined in 49 CFR Part 391. These include criminal
                background checks, MVR reviews, drug and alcohol testing, and verification of
                prior employment with DOT-regulated employers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                SaffHire provides FCRA-compliant background screening reports designed to support
                your driver qualification file requirements. Our platform handles all required
                disclosure and authorization workflows digitally, keeping your hiring process
                efficient and your records audit-ready.
              </p>
              <a
                href="/#contact"
                className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Talk to a Compliance Specialist <ArrowRight size={16} />
              </a>
            </div>

            <div className="space-y-3">
              <p
                className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Compliance Areas We Support
              </p>
              {complianceItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 bg-white hover:border-green-200 hover:bg-green-50 transition-colors"
                >
                  <CheckCircle2 size={18} className="flex-shrink-0" style={{ color: "#22c55e" }} />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Screen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">COVERAGE</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every Driver. Every Role.
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              From long-haul CDL drivers to last-mile delivery and school bus operators, SaffHire
              has a screening package built for every position in your fleet.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div
                key={role}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm text-center hover:border-green-300 hover:shadow-md transition-all"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "#f0fdf4" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
                </div>
                <p
                  className="text-gray-800 text-sm font-semibold leading-snug"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">PROCESS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Onboard Drivers Without the Wait
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Set Up Your Account",
                desc: "Create your SaffHire portal in minutes. Configure DOT and non-DOT screening packages for each driver category with no setup fees or minimums.",
              },
              {
                step: "02",
                title: "Submit Driver Order",
                desc: "Enter the driver's information directly in the portal or integrate with your TMS or ATS. Order individual checks or full DOT qualification packages.",
              },
              {
                step: "03",
                title: "Driver Completes Authorization",
                desc: "The driver receives a digital invitation and completes FCRA-compliant disclosure and authorization entirely online from any device.",
              },
              {
                step: "04",
                title: "Results in Your Portal",
                desc: "MVR results in as little as 5 minutes. Full criminal and verification results within 48 hours. Reports are formatted for easy inclusion in your driver qualification file.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < 3 && (
                  <div
                    className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px"
                    style={{ backgroundColor: "#e2e8f0" }}
                  />
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  <span
                    className="text-xl font-black"
                    style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">EXPLORE MORE</p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="/mvr-checks"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                MVR / Driving Records
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                DOT-compliant motor vehicle records and driving history checks.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/drug-screening"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Drug Screening
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                DOT and non-DOT drug testing for transportation professionals.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/criminal-background-checks"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Criminal Background Checks
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive criminal history searches for all drivers.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
            style={{
              backgroundColor: "rgba(34,197,94,0.15)",
              color: "#22c55e",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <ShieldCheck size={14} />
            FMCSA and FCRA Compliant
          </div>
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Keep Your Fleet Safe and Your Company Protected.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Transportation companies across the country trust SaffHire to deliver fast, accurate,
            and DOT-compliant driver screening. Get your drivers qualified and on the road faster
            without cutting corners on safety.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#contact"
              className="btn-green inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-lg"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Get a Free Quote <ArrowRight size={18} />
            </a>
            <a
              href="tel:8885881733"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-lg border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Phone size={18} />
              Call 888-588-1733
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
