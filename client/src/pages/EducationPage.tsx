/*
 * Education Industry Page - SaffHire Background Screening
 * Design: Clean Professional Trust - dark navy hero, white content sections, green accents
 * Route: /industries/education
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
  BookOpen,
  BadgeCheck,
  Users,
  Phone,
  RefreshCw,
  AlertTriangle,
  GraduationCap,
  Heart,
  Eye,
} from "lucide-react";

const EDUCATION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/education-teacher-ZXUK3NiRcgkPtpdCJ6LBUf.webp";

const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional county, state, and federal criminal history searches covering all prior addresses. Education employers need comprehensive criminal coverage to identify any history that could pose a risk to students or campus safety.",
  },
  {
    icon: Eye,
    title: "Sex Offender Registry Search",
    description:
      "National and state-level sex offender registry searches are a foundational requirement for any role involving contact with minors. SaffHire runs this check as a standard component of every education screening package.",
  },
  {
    icon: Heart,
    title: "Child Abuse and Neglect Registry",
    description:
      "State-specific abuse and neglect registry checks identify individuals with substantiated findings of child abuse or neglect. Many states require this check for all employees and volunteers working with minors.",
  },
  {
    icon: BadgeCheck,
    title: "Education and Credential Verification",
    description:
      "Verify degrees, certifications, and teaching credentials directly with issuing institutions. Confirm that teachers, counselors, and administrators hold the qualifications they claim before they enter your classrooms.",
  },
  {
    icon: BookOpen,
    title: "Employment Verification",
    description:
      "Confirm prior work history, job titles, and dates of employment for all education candidates. Identify gaps in employment history and verify that prior roles align with the position being filled.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Workforce Monitoring",
    description:
      "Continuous criminal monitoring alerts your HR team to new arrests or convictions between annual renewal cycles, providing year-round protection for your students, staff, and campus without waiting for scheduled re-screenings.",
  },
];

const challenges = [
  {
    icon: GraduationCap,
    title: "Protecting Vulnerable Student Populations",
    description:
      "Schools, childcare centers, and universities have a duty of care to protect students from harm. A single unvetted hire with a disqualifying history can expose your institution to catastrophic liability and irreparable reputational damage.",
  },
  {
    icon: Heart,
    title: "Volunteer and Contractor Screening",
    description:
      "Education institutions rely heavily on volunteers, substitute teachers, tutors, and contractors who may have unsupervised access to students. SaffHire screens your entire extended workforce, not just direct hires.",
  },
  {
    icon: AlertTriangle,
    title: "State Licensing and Certification Requirements",
    description:
      "Many states mandate specific background check types and registry searches for education employees. SaffHire's compliance team helps you navigate state-specific requirements so your screening program meets all applicable standards.",
  },
  {
    icon: Clock,
    title: "High-Volume Seasonal Hiring",
    description:
      "Back-to-school hiring seasons and mid-year substitute teacher needs create surges in screening volume. SaffHire's no-minimum model and fast turnaround times let you scale up instantly without delays or volume commitments.",
  },
];

const complianceItems = [
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "Child abuse and neglect registry search requirements",
  "Sex offender registry search requirements",
  "Multi-state and multi-jurisdictional criminal coverage",
  "State and local fair chance hiring laws",
];

const roles = [
  "Teachers and Instructors",
  "School Administrators",
  "Counselors and Social Workers",
  "Coaches and Athletic Staff",
  "Substitute Teachers",
  "Paraprofessionals and Aides",
  "Childcare Workers",
  "Bus Drivers and Transportation Staff",
  "Custodial and Facilities Staff",
  "Tutors and Academic Coaches",
  "Volunteers",
  "Contractors and Vendors",
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "All 50", label: "States Covered" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/education" title="Background Screening for Schools and Education" description="Background screening for schools and education organizations. Protect students with thorough educator checks. FCRA and EEOC compliant, serving nationwide." />

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
                Education Sector
                <br />
                <span style={{ color: "#22c55e" }}>Background Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Protect your students, your staff, and your institution with thorough, FCRA-compliant
                background screening built for K-12 schools, childcare providers, universities,
                and education contractors.
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
                alt="School administrator in a modern classroom library"
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
                src={EDUCATION_IMG}
                alt="School administrator in a modern classroom library"
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
                      Student-First Screening
                    </p>
                    <p className="text-gray-400 text-xs">
                      Comprehensive checks designed to protect every student in your care.
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
                Every Student Deserves a Safe Learning Environment.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Education institutions carry one of the most serious responsibilities of any
                employer: protecting children and young adults in their care. Every teacher,
                coach, counselor, bus driver, and volunteer who enters your campus must be
                thoroughly vetted before they have contact with students. A single oversight
                can result in irreversible harm to a child and devastating consequences for
                your institution.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                SaffHire delivers fast, accurate, FCRA-compliant background screening that
                covers criminal history, sex offender registries, abuse and neglect registries,
                and credential verification, so every person in your school community has been
                properly screened before they step into your classrooms.
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
              Complete Screening for Education Employers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From criminal background checks and sex offender registry searches to credential
              verification and ongoing monitoring, SaffHire covers every layer of your education
              workforce including employees, volunteers, substitutes, and contractors.
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
                Screening That Meets Education Industry Standards
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Education employers must navigate a complex landscape of federal and state
                regulations governing who can work with students and what background checks are
                required. Requirements vary significantly by state, role type, and whether
                positions involve direct contact with minors. SaffHire's compliance team helps
                you build a screening program that meets all applicable requirements for your
                institution and your state.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our FCRA-compliant reports are designed to support your HR and administration
                teams with accurate, legally defensible results. Our digital disclosure and
                authorization workflow keeps your hiring process audit-ready, and our no-minimum
                model means you can screen a single substitute teacher or an entire incoming
                class of staff without volume commitments or setup fees.
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
              Every Role in Your School Community
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              From classroom teachers and coaches to bus drivers, volunteers, and contractors,
              SaffHire has a screening package built for every person who interacts with your
              students and campus.
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
              Screen Every Hire Before They Enter Your Campus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Set Up Your Account",
                desc: "Create your SaffHire portal in minutes. Configure screening packages by role type, grade level, or position with no setup fees or volume minimums.",
              },
              {
                step: "02",
                title: "Submit a Screening Order",
                desc: "Enter the candidate's information directly in the portal or integrate with your HRIS. Order individual checks or complete pre-employment packages including registry searches.",
              },
              {
                step: "03",
                title: "Candidate Completes Authorization",
                desc: "The candidate receives a digital invitation and completes FCRA-required disclosure and authorization entirely online from any device, including mobile.",
              },
              {
                step: "04",
                title: "Results in Your Portal",
                desc: "Criminal and registry results delivered within 48 hours. Clear, easy-to-read reports with status indicators delivered directly to your HR or administration team.",
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
                Comprehensive criminal history searches for educators and school staff.
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
                Verify degrees, certifications, and teaching credentials.
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
                Verify prior employment and teaching experience.
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
            Protect Every Student in Your Care.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Schools, childcare centers, and universities across the country rely on SaffHire to
            screen teachers, staff, volunteers, and contractors quickly, accurately, and
            compliantly. Start screening today with no minimums and no setup fees.
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
