/*
 * Churches / Non-Profit Industry Page - SaffHire Background Screening
 * Design: Clean Professional Trust - dark navy hero, white content sections, green accents
 * Route: /industries/church-nonprofit
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
  BadgeCheck,
  Users,
  Phone,
  RefreshCw,
  AlertTriangle,
  Heart,
  Eye,
  HandHeart,
} from "lucide-react";

const CHURCH_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/church-nonprofit-i472wLXW7cpcTt6sne5C2x.webp";

const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional county, state, and federal criminal history searches covering all prior addresses. Faith-based organizations and non-profits need comprehensive criminal coverage for every employee and volunteer who interacts with congregation members, program participants, and vulnerable populations.",
  },
  {
    icon: Eye,
    title: "Sex Offender Registry Search",
    description:
      "National and state-level sex offender registry searches are essential for any organization working with children, youth groups, or vulnerable adults. SaffHire includes this search as a standard component of every church and non-profit screening package.",
  },
  {
    icon: Heart,
    title: "Child Abuse and Neglect Registry",
    description:
      "State-specific abuse and neglect registry checks identify individuals with substantiated findings of child abuse or neglect. This check is critical for any ministry, youth program, childcare ministry, or non-profit serving children and families.",
  },
  {
    icon: BadgeCheck,
    title: "Employment and Credential Verification",
    description:
      "Verify prior employment history, professional credentials, and ministry references for pastoral staff, program directors, and administrative roles. Confirm that leadership candidates have the background and qualifications they represent.",
  },
  {
    icon: Users,
    title: "Volunteer Screening",
    description:
      "SaffHire's no-minimum model is built for organizations that screen large numbers of volunteers at low or no cost to the candidate. Screen every Sunday school teacher, youth group leader, mission trip participant, and program volunteer before they serve.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Workforce Monitoring",
    description:
      "Continuous criminal monitoring alerts your leadership team to new arrests or convictions between annual renewal cycles, providing year-round protection for your congregation, program participants, and community without waiting for scheduled re-screenings.",
  },
];

const challenges = [
  {
    icon: HandHeart,
    title: "Protecting Vulnerable Populations",
    description:
      "Churches and non-profits often serve children, the elderly, individuals in recovery, and other vulnerable groups. Every staff member and volunteer who interacts with these populations must be thoroughly vetted before they serve.",
  },
  {
    icon: Users,
    title: "High Volume of Volunteers",
    description:
      "Faith-based organizations and non-profits rely heavily on volunteers who may have unsupervised access to children and vulnerable adults. SaffHire's no-minimum model means you can screen every volunteer regardless of how many you have.",
  },
  {
    icon: AlertTriangle,
    title: "Limited HR Resources",
    description:
      "Most churches and non-profits operate with small administrative teams and limited budgets. SaffHire's simple online portal and affordable pricing make it easy to run thorough background checks without a dedicated HR department.",
  },
  {
    icon: Clock,
    title: "Seasonal and Event-Based Hiring",
    description:
      "Vacation Bible school, summer camps, mission trips, and holiday programs create surges in volunteer and temporary staff needs. SaffHire's fast turnaround and no-minimum model let you scale instantly without volume commitments.",
  },
];

const complianceItems = [
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "Sex offender registry search requirements",
  "Child abuse and neglect registry search requirements",
  "Multi-state and multi-jurisdictional criminal coverage",
  "State and local fair chance hiring laws",
  "Volunteer screening best practices",
];

const roles = [
  "Pastors and Ministers",
  "Youth Group Leaders",
  "Children's Ministry Workers",
  "Sunday School Teachers",
  "Nursery and Childcare Staff",
  "Counselors and Social Workers",
  "Program Directors",
  "Administrative Staff",
  "Volunteers",
  "Mission Trip Participants",
  "Camp Counselors",
  "Contractors and Vendors",
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "No Min.", label: "Volume Required" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function ChurchNonProfitPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/church-nonprofit" title="Background Screening for Churches and Nonprofits" description="Affordable background screening for churches and nonprofits. Protect your congregation and volunteers. FCRA compliant, serving Frisco TX and nationwide." />

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
                Churches and
                <br />
                <span style={{ color: "#22c55e" }}>Non-Profit Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Protect your congregation, your program participants, and your mission with
                affordable, FCRA-compliant background screening built for faith-based organizations
                and non-profits of every size, with no minimums and no setup fees.
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
                src={CHURCH_IMG}
                alt="Faith community leader in a welcoming church hall"
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
                src={CHURCH_IMG}
                alt="Faith community leader in a welcoming church hall"
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
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Mission-First Screening
                    </p>
                    <p className="text-gray-400 text-xs">
                      Affordable, no-minimum screening built for faith-based organizations.
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
                Your Community Trusts You to Keep Them Safe.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Churches, ministries, and non-profit organizations are built on trust. Your
                congregation, your donors, and the communities you serve trust that every person
                in a position of leadership or service has been properly vetted. A single
                unscreened volunteer or staff member with a disqualifying history can cause
                irreparable harm to your community and your organization's reputation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                SaffHire makes it simple and affordable for faith-based organizations and
                non-profits of every size to screen employees, volunteers, contractors, and
                ministry leaders. Our no-minimum model means you can screen a single volunteer
                or an entire team without volume commitments, setup fees, or complex contracts.
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
              Complete Screening for Your Entire Ministry
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From criminal background checks and sex offender registry searches to volunteer
              screening and ongoing monitoring, SaffHire covers every person who serves your
              organization, including paid staff, volunteers, contractors, and ministry leaders.
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
                Screening That Protects Your Mission and Your Community
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Faith-based organizations and non-profits must navigate the same federal and
                state background screening regulations as any other employer, including FCRA
                compliance, EEOC guidelines, and state-specific registry search requirements.
                Many states also have specific laws governing who can work with or volunteer
                around children and vulnerable adults in organizational settings.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                SaffHire's FCRA-compliant reports and digital authorization workflow keep your
                screening program legally sound and audit-ready. Our compliance team is available
                to help you build a screening policy that fits your organization's size, budget,
                and the populations you serve, whether you are a small congregation or a large
                multi-site non-profit.
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
              Every Role in Your Organization
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              From pastors and program directors to Sunday school teachers, camp counselors,
              and mission trip volunteers, SaffHire has a screening package built for every
              person who serves your community.
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
              Simple Screening for Every Size Organization
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Set Up Your Account",
                desc: "Create your SaffHire portal in minutes with no setup fees, no contracts, and no volume minimums. Configure screening packages by role type, whether paid staff, volunteers, or contractors.",
              },
              {
                step: "02",
                title: "Submit a Screening Order",
                desc: "Enter the candidate or volunteer's information directly in the portal. Order individual checks or complete packages including sex offender and abuse registry searches.",
              },
              {
                step: "03",
                title: "Candidate Completes Authorization",
                desc: "The candidate or volunteer receives a digital invitation and completes FCRA-required disclosure and authorization entirely online from any device, including mobile.",
              },
              {
                step: "04",
                title: "Results in Your Portal",
                desc: "Criminal and registry results delivered within 48 hours. Clear, easy-to-read reports with status indicators delivered directly to your leadership or administrative team.",
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
                Comprehensive criminal history searches for volunteers and staff.
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
                Verify prior employment and volunteer experience.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/education-verification"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Education Verification
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Verify degrees and professional certifications.
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
            No Minimums. No Setup Fees.
          </div>
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Protect Your Congregation and Your Mission.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Churches, ministries, and non-profits across the country rely on SaffHire to screen
            staff, volunteers, and contractors quickly, accurately, and affordably. Start
            screening today with no minimums, no contracts, and no setup fees.
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
