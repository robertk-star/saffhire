/*
 * Staffing Industry Page - SaffHire Background Screening
 * Design: Clean Professional Trust - dark navy hero, white content sections, green accents
 * Route: /industries/staffing
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
  Users,
  Zap,
  BadgeCheck,
  BarChart3,
  Phone,
  RefreshCw,
  Building2,
} from "lucide-react";

const STAFFING_IMG =
  "/images/industry-staffing.webp";

const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional county, state, and federal criminal history searches. Instant and standard turnaround options to match your placement speed requirements.",
  },
  {
    icon: Zap,
    title: "Lab-Based Drug Screening",
    description:
      "Lab-based drug testing panels with instant result options. Candidates are sent to a certified lab for fast, accurate results before placement.",
  },
  {
    icon: BadgeCheck,
    title: "Employment Verification",
    description:
      "Confirm prior employment dates, titles, and eligibility for rehire. Catch resume fraud before it reaches your client's desk.",
  },
  {
    icon: Users,
    title: "Education Verification",
    description:
      "Primary-source verification of degrees, diplomas, and certifications. Critical for professional, technical, and executive placements.",
  },
  {
    icon: BarChart3,
    title: "MVR / Driving Records",
    description:
      "Motor vehicle record checks for any role that involves driving. Fast, accurate reports from state DMV sources.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing and Periodic Rescreening",
    description:
      "Automated rescreening programs for your temp and contract workforce. Keep your clients protected throughout the entire assignment lifecycle.",
  },
];

const challenges = [
  {
    icon: Clock,
    title: "Speed-to-Placement Pressure",
    description:
      "Staffing agencies live and die by fill rates. Our results in as little as 5 minutes with full verification within 48 hours and instant lab drug testing options mean you never lose a placement to a slow background check.",
  },
  {
    icon: Building2,
    title: "Client Compliance Requirements",
    description:
      "Your clients have their own background check standards. SaffHire's configurable packages let you build custom screening programs that match each client's unique requirements.",
  },
  {
    icon: ShieldCheck,
    title: "FCRA and EEOC Compliance",
    description:
      "Staffing agencies are consumer reporting users under the FCRA. SaffHire provides fully FCRA-compliant reports so your agency can meet its obligations with confidence.",
  },
  {
    icon: BarChart3,
    title: "High-Volume Scalability",
    description:
      "Whether you're placing 10 or 10,000 candidates a month, SaffHire's platform scales with your volume. No setup fees, no minimums, no per-seat licensing.",
  },
];

const complianceItems = [
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "Client-specific background check standards",
  "Drug-free workplace program requirements",
  "Multi-state and multi-jurisdictional coverage",
];

const roles = [
  "Temporary and Contract Workers",
  "Direct Hire Candidates",
  "Executive and C-Suite Placements",
  "IT and Technology Professionals",
  "Finance and Accounting Staff",
  "Administrative and Clerical",
  "Light Industrial Workers",
  "Healthcare Staffing (Travel Nurses, Locum Tenens)",
  "Legal and Compliance Professionals",
  "Sales and Marketing Talent",
  "Engineering and Technical Roles",
  "Remote and Hybrid Workforce",
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "No Minimums", label: "No Setup Fees" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function StaffingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/staffing" title="Background Screening for Staffing Agencies" description="Background screening for staffing agencies nationwide. Fast, accurate criminal checks and employment verification to place candidates faster. FCRA compliant." />
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8">
                <ArrowLeft size={14} />
                Back to Home
              </a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>INDUSTRY SOLUTIONS</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Staffing Agency<br /><span style={{ color: "#22c55e" }}>Background Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Fast, high-volume background screening built for staffing agencies. Helping you place candidates faster, satisfy client compliance requirements, and protect your agency from liability.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={STAFFING_IMG} alt="Recruiter conducting a job interview" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#22c55e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-green-400">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 px-6 text-center">
                <p className="text-2xl lg:text-3xl font-black text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.value}</p>
                <p className="text-green-900 text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img src={STAFFING_IMG} alt="Staffing agency recruiter" className="w-full object-cover" style={{ height: 480 }} />
            </div>
            <div>
              <p className="section-label mb-3">THE CHALLENGE</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Staffing Moves Fast. Your Screening Should Too.</h2>
              <p className="text-gray-600 leading-relaxed mb-5">Staffing agencies operate in one of the most competitive, time-sensitive environments in business. SaffHire delivers fast, accurate, and fully compliant background checks that keep your pipeline moving.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={16} style={{ color: "#22c55e" }} />
                        <p className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</p>
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
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">OUR SERVICES</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Everything Your Agency Needs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#f0fdf4" }}>
                    <Icon size={22} style={{ color: "#22c55e" }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-3">COMPLIANCE</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Protecting Your Agency at Every Step</h2>
              <p className="text-gray-600 leading-relaxed mb-8">SaffHire provides fully FCRA-compliant background screening reports and handles all required disclosure and authorization workflows digitally.</p>
              <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Talk to a Compliance Specialist <ArrowRight size={16} /></a>
            </div>
            <div className="space-y-3">
              {complianceItems.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50">
                  <CheckCircle2 size={18} className="flex-shrink-0" style={{ color: "#22c55e" }} />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">COVERAGE</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Every Placement. Every Industry.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div key={role} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                <p className="text-gray-800 text-sm font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
