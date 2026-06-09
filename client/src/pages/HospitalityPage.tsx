/*
 * Hospitality Industry Page - SaffHire Background Screening
 * Design: Clean Professional Trust - dark navy hero, white content sections, green accents
 * Route: /industries/hospitality
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
  Star,
  Users,
  Lock,
} from "lucide-react";

const HOSP_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/hospitality-hotel-hPwjFumDVuE53coRNdmCA5.webp";

const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional county, state, and federal criminal history searches to identify disqualifying offenses before a worker interacts with your guests or handles their property.",
  },
  {
    icon: Zap,
    title: "Drug and Alcohol Testing",
    description:
      "Pre-employment drug testing conducted at certified labs with instant result options. Maintain a safe, professional environment for guests and staff alike.",
  },
  {
    icon: BadgeCheck,
    title: "Employment Verification",
    description:
      "Confirm prior work history, job titles, and dates of employment to ensure candidates have the service experience they claim and reduce costly mis-hires.",
  },
  {
    icon: BarChart3,
    title: "Education and Credential Verification",
    description:
      "Verify degrees, certifications, and professional licenses for management, culinary, and specialized roles where qualifications directly affect service quality.",
  },
  {
    icon: Lock,
    title: "Sex Offender Registry Search",
    description:
      "National and state sex offender registry searches are critical for properties that host families, children's events, or vulnerable guests. Protect your guests and your brand.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Workforce Monitoring",
    description:
      "Continuous criminal monitoring for your existing workforce alerts you to new arrests or convictions between annual review cycles, keeping your property protected year-round.",
  },
];

const challenges = [
  {
    icon: Users,
    title: "Guest Safety and Brand Reputation",
    description:
      "Hotels, resorts, and restaurants place employees in direct, often unsupervised contact with guests and their belongings. A single incident involving an unscreened hire can generate negative reviews, legal liability, and lasting brand damage.",
  },
  {
    icon: AlertTriangle,
    title: "Theft and Property Security",
    description:
      "Hospitality workers routinely access guest rooms, valuables, cash drawers, and sensitive personal information. Thorough criminal and identity screening is your first line of defense against internal theft.",
  },
  {
    icon: Clock,
    title: "Seasonal and High-Turnover Hiring",
    description:
      "Peak seasons, events, and high turnover mean constant onboarding. SaffHire's no-minimum model scales with your volume so you can screen every hire, whether you are onboarding 2 or 200 workers at once.",
  },
  {
    icon: Star,
    title: "Protecting Your Brand Standards",
    description:
      "Luxury and branded properties are held to elevated service and conduct standards. Screening ensures the people representing your brand have the background and character your guests expect.",
  },
];

const complianceItems = [
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "State and local fair chance hiring laws",
  "Drug-free workplace program requirements",
  "Multi-state and multi-jurisdictional criminal coverage",
  "Sex offender and abuse registry compliance",
];

const roles = [
  "Front Desk Agents",
  "Concierge Staff",
  "Housekeeping and Room Attendants",
  "Food and Beverage Servers",
  "Bartenders",
  "Kitchen and Culinary Staff",
  "Valet and Parking Attendants",
  "Security Personnel",
  "Event and Banquet Staff",
  "Hotel Managers and Supervisors",
  "Spa and Wellness Staff",
  "Maintenance and Engineering",
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "All 50", label: "States Covered" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/hospitality" title="Background Screening for Hospitality Employers" description="Background screening for hotels, restaurants, and hospitality businesses. Protect guests and staff with thorough, FCRA-compliant screening nationwide." />

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
                Hospitality
                <br />
                <span style={{ color: "#22c55e" }}>Background Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Protect your guests, your staff, and your brand with fast, FCRA-compliant
                background screening built for hotels, restaurants, resorts, and event venues.
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
                src={HOSP_IMG}
                alt="Hotel concierge in a luxury hotel lobby"
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
                src={HOSP_IMG}
                alt="Hotel concierge in a luxury hotel lobby"
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
                    <Star size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Guest-First Screening
                    </p>
                    <p className="text-gray-400 text-xs">
                      Built for properties where every guest interaction matters.
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
                Your Guests Trust You with Their Safety.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                In hospitality, your employees are your brand. They welcome guests into their
                rooms, handle their valuables, serve their food, and represent your property in
                every interaction. The stakes for a bad hire are uniquely high: a single incident
                involving an unscreened employee can result in guest harm, legal liability, and
                reputational damage that takes years to repair.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                SaffHire delivers fast, accurate, FCRA-compliant background checks so you can
                onboard seasonal staff at peak speed without compromising the safety and trust
                your guests expect when they walk through your doors.
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
              Complete Screening for Hospitality Employers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From criminal background checks and drug testing to sex offender registry searches
              and ongoing monitoring, SaffHire covers every layer of your guest-facing workforce.
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
                Screening That Meets Your Legal and Brand Standards
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Hospitality employers operate under federal and state requirements governing fair
                hiring, drug-free workplaces, and guest safety. SaffHire's FCRA-compliant reports
                are designed to support your HR and operations teams with accurate, legally
                defensible results that hold up to scrutiny.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our digital disclosure and authorization workflow keeps your hiring process
                audit-ready, and our compliance team stays current on evolving fair chance hiring
                laws so you do not have to. Whether you operate a single boutique hotel or a
                multi-property portfolio, SaffHire scales to fit your operation.
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
              Every Role on Your Property
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              From front desk agents and housekeeping to culinary staff and security, SaffHire
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
              Onboard Your Team Before the Season Starts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Set Up Your Account",
                desc: "Create your SaffHire portal in minutes. Configure screening packages by role or property with no setup fees or volume minimums.",
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
                Comprehensive criminal history searches for hospitality and guest-facing roles.
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
                Pre-employment drug testing for hospitality staff and management.
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
                Verify employment history and hospitality experience.
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
            Protect Your Guests. Protect Your Brand.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Hospitality companies across the country rely on SaffHire to screen guest-facing
            workers quickly, accurately, and compliantly. Start screening today with no minimums
            and no setup fees.
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
