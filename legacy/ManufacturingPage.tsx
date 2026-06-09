/*
 * Manufacturing / Warehousing Industry Page - SaffHire Background Screening
 * Design: Clean Professional Trust - dark navy hero, white content sections, green accents
 * Route: /industries/manufacturing
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
  Zap,
  BadgeCheck,
  BarChart3,
  Phone,
  RefreshCw,
  AlertTriangle,
  HardHat,
  Package,
} from "lucide-react";

const MFG_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/manufacturing-warehouse-MRbE6ngTRYM7etAtYgJE2K.webp";

const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional county, state, and federal criminal history searches to identify disqualifying offenses before a worker enters your facility.",
  },
  {
    icon: Zap,
    title: "Drug and Alcohol Testing",
    description:
      "Pre-employment and random drug testing conducted at certified labs with instant result options. Keep your facility safe and OSHA-compliant.",
  },
  {
    icon: BadgeCheck,
    title: "Employment Verification",
    description:
      "Confirm prior work history, job titles, and dates of employment to ensure candidates have the experience they claim and reduce costly mis-hires.",
  },
  {
    icon: BarChart3,
    title: "Education and Credential Verification",
    description:
      "Verify degrees, certifications, and trade licenses for skilled trades, engineering, and supervisory roles where qualifications directly affect safety.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Workforce Monitoring",
    description:
      "Continuous criminal monitoring for your existing workforce alerts you to new arrests or convictions between annual review cycles.",
  },
  {
    icon: Package,
    title: "Contractor and Vendor Screening",
    description:
      "Screen third-party contractors, temp agency workers, and vendors who access your facility with the same rigor applied to direct hires.",
  },
];

const challenges = [
  {
    icon: AlertTriangle,
    title: "Workplace Safety and OSHA Compliance",
    description:
      "Manufacturing and warehouse environments involve heavy machinery, forklifts, and hazardous materials. A single unfit hire can trigger serious injuries, OSHA citations, and workers compensation claims.",
  },
  {
    icon: Clock,
    title: "High-Volume, High-Turnover Hiring",
    description:
      "Seasonal surges and high turnover mean you are constantly onboarding large numbers of workers. SaffHire's no-minimum model scales with your volume without slowing down your line.",
  },
  {
    icon: HardHat,
    title: "Theft and Inventory Shrinkage",
    description:
      "Workers with theft or fraud histories in roles with access to inventory, equipment, or cash create significant loss exposure. Criminal screening is your first line of defense.",
  },
  {
    icon: ShieldCheck,
    title: "Contractor and Temp Worker Risk",
    description:
      "Staffing agency workers and independent contractors often bypass the same screening standards as direct hires. SaffHire lets you screen every worker who enters your facility.",
  },
];

const complianceItems = [
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "OSHA workplace safety standards",
  "Drug-free workplace program requirements",
  "Multi-state and multi-jurisdictional criminal coverage",
  "Contractor and vendor screening best practices",
];

const roles = [
  "Assembly Line Workers",
  "Forklift Operators",
  "Warehouse Associates",
  "Shipping and Receiving Clerks",
  "Quality Control Technicians",
  "Maintenance Technicians",
  "Production Supervisors",
  "Inventory Control Specialists",
  "Logistics Coordinators",
  "Plant Managers",
  "Skilled Trades (Welders, Machinists)",
  "Temp and Contract Workers",
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "All 50", label: "States Covered" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function ManufacturingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/manufacturing" title="Background Screening for Manufacturing Companies" description="Background screening for warehouse, logistics, and manufacturing companies. Fast turnaround, FCRA compliant. Serving Frisco TX and businesses nationwide." />

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
                Manufacturing and
                <br />
                <span style={{ color: "#22c55e" }}>Warehousing Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Fast, FCRA-compliant background screening built for high-volume industrial
                employers. Keep your facility safe, your workforce qualified, and your operations
                running without delay.
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
                src={MFG_IMG}
                alt="Warehouse supervisor on a modern factory floor"
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
                src={MFG_IMG}
                alt="Warehouse supervisor with hard hat and safety vest"
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
                    <HardHat size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Safety-First Screening
                    </p>
                    <p className="text-gray-400 text-xs">
                      Built for high-volume industrial hiring environments.
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
                Safety and Speed Cannot Be Mutually Exclusive.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Manufacturing and warehouse operations run on tight margins and tighter timelines.
                When a production line is short-staffed or a seasonal surge hits, the pressure to
                hire fast is real. But cutting corners on background screening in an environment
                with heavy machinery, valuable inventory, and large workforces creates risks that
                far outweigh the cost of a thorough check.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                SaffHire delivers results in as little as 5 minutes for instant drug tests and
                criminal checks, so you can onboard workers at the speed your operation demands
                without compromising the safety of your team or the security of your facility.
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
              Complete Workforce Screening for Industrial Employers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From pre-employment criminal checks and drug testing to ongoing workforce monitoring
              and contractor screening, SaffHire covers every layer of your hiring process.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-3">COMPLIANCE</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Screening That Meets Your Industry Standards
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Manufacturing and warehouse employers operate under a range of federal and state
                requirements governing workplace safety, drug-free workplace programs, and fair
                hiring practices. SaffHire's FCRA-compliant reports are designed to support your
                HR and safety teams with accurate, legally defensible results.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our digital disclosure and authorization workflow keeps your hiring process
                audit-ready, and our compliance team stays current on evolving regulations so
                you do not have to. Whether you are a single-site manufacturer or a multi-location
                distribution network, SaffHire scales to fit your operation.
              </p>
              <a
                href="/#contact"
                className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Talk to a Specialist <ArrowRight size={16} />
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
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50 transition-colors"
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
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">COVERAGE</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every Role on Your Floor
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              From entry-level warehouse associates to plant managers and skilled trades, SaffHire
              has a screening package built for every position in your operation.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div
                key={role}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center hover:border-green-300 hover:shadow-md transition-all"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">PROCESS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Onboard Workers Without Slowing Down Your Line
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Set Up Your Account",
                desc: "Create your SaffHire portal in minutes. Configure screening packages by role or facility with no setup fees or volume minimums.",
              },
              {
                step: "02",
                title: "Submit a Screening Order",
                desc: "Enter the candidate's information directly in the portal or integrate with your HRIS or ATS. Order individual checks or complete pre-employment packages.",
              },
              {
                step: "03",
                title: "Candidate Completes Authorization",
                desc: "The candidate receives a digital invitation and completes FCRA-required disclosure and authorization entirely online from any device.",
              },
              {
                step: "04",
                title: "Results in Your Portal",
                desc: "Instant drug test results in as little as 5 minutes. Full criminal and verification results within 48 hours. Clear, easy-to-read reports delivered directly to your hiring team.",
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
              href="/criminal-background-checks"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Criminal Background Checks
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive criminal history searches for warehouse and manufacturing roles.
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
                Pre-employment and ongoing drug testing for safety-sensitive positions.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/employment-verification"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Employment Verification
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Verify employment history and work authorization.
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
            FCRA Compliant
          </div>
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Build a Safer Workforce. Hire with Confidence.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Manufacturing and warehouse companies across the country rely on SaffHire to screen
            workers quickly, accurately, and compliantly. Get your team in place faster without
            cutting corners on safety.
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
