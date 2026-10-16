import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import PageFAQ from "@/components/PageFAQ";
import { staffingFaqs } from "@/data/pageFaqs";

import {
  ArrowRight,
  ArrowLeft,
  FileSearch,
  Users,
  Zap,
  BadgeCheck,
  BarChart3,
  Phone,
  RefreshCw,
} from "lucide-react";

const STAFFING_IMG = "/images/industry-staffing.webp";

const services = [
  { icon: FileSearch, title: "Criminal Background Checks", description: "Multi-jurisdictional county, state, and federal criminal history searches with turnaround options that match placement speed." },
  { icon: Zap, title: "Lab-Based Drug Screening", description: "Lab-based drug testing panels with instant result options before placement." },
  { icon: BadgeCheck, title: "Employment Verification", description: "Confirm prior employment dates, titles, and eligibility for rehire." },
  { icon: Users, title: "Education Verification", description: "Primary-source verification of degrees, diplomas, and certifications." },
  { icon: BarChart3, title: "MVR / Driving Records", description: "Motor vehicle record checks for roles that involve driving." },
  { icon: RefreshCw, title: "Ongoing and Periodic Rescreening", description: "Rescreening programs for temp and contract workforces." },
];

const stats = [
  { value: "Minutes", label: "Instant Searches" },
  { value: "No Minimums", label: "No Setup Fees" },
  { value: "FCRA-aware", label: "Screening Workflows" },
  { value: "24/7", label: "Portal Access" },
];

export default function StaffingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/staffing" title="Background Screening for Staffing Agencies" description="Background screening for staffing agencies nationwide. Fast criminal checks and employment verification with FCRA-compliant screening workflows." />
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>INDUSTRY SOLUTIONS</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Staffing Agency{" "}<br /><span style={{ color: "#22c55e" }}>Background Screening</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">Fast, high-volume background screening built for staffing agencies. Place candidates faster while supporting client compliance requirements.</p>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Background Checks for Staffing Placements</h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-3xl">Staffing agencies screen candidates for many different clients, roles and states at once. SaffHire lets you match the searches to each job order, from a base criminal and identity package for general labor to driving records, drug screening and verifications for roles that need them.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                  <Icon size={22} style={{ color: "#22c55e" }} />
                  <h3 className="font-bold text-gray-900 mt-4 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Turnaround for High-Volume Hiring</h2>
            <p>Instant searches (SSN Trace, Sex Offender, Global Security Watch List, National Criminal Database, state database and MVR) usually return in minutes. Standard Packages 1-3 average 1 day, Package 4 (adds County Search) averages 1-2 days, and Packages 5 and 6 (add Drug Screening and verifications) average 2-5 days. County searches depend on court record access, and verifications depend on how quickly prior employers and schools respond. See <a href="/packages" className="font-bold text-green-600 underline">Standard Packages &amp; Turnaround</a> for details.</p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Packages Customized for Each Client</h2>
            <p>Packages are customized to each client&apos;s needs. Every standard package includes SSN Trace, Address History, National Criminal Database, Global Security Watch List and Federal Search. From there you can add a Motor Vehicle Report, State and County searches, Drug Screening, Employment Verification and Education Verification. Court access fees may apply to State and County searches (pass-through), and state fees may apply to MVRs.</p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>FCRA-Compliant Screening Workflows</h2>
            <p>When an agency orders a background check, it must give the candidate a standalone written disclosure, get written authorization, and follow the pre-adverse and adverse action process before acting on the report. SaffHire&apos;s candidate invitation and authorization workflow supports those steps. Your agency remains responsible for its hiring decisions and for meeting federal, state and local requirements.</p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Veteran-Owned, Serving Agencies Nationwide</h2>
            <p>SaffHire is a Veteran-Owned company headquartered in Frisco, TX, founded by Robert Krebsbach, John Waak and Jody Thigpen. We work with staffing agencies nationwide, with no setup fees and no minimums. <a href="/contact" className="font-bold text-green-600 underline">Contact us</a> or call 888-588-1733 for a custom quote.</p>
          </div>
        </div>
      </section>
      <PageFAQ title="Staffing Agency Background Check FAQ" items={staffingFaqs} />
      <Footer />
    </div>
  );
}
