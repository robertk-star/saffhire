/*
 * Churches / Non-Profit Industry Page
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

const CHURCH_IMG = "/images/industry-church-nonprofit.webp";

const services = [
  { icon: FileSearch, title: "Criminal Background Checks", description: "Multi-jurisdictional criminal history searches for every employee and volunteer who interacts with congregation members and vulnerable populations." },
  { icon: Eye, title: "Sex Offender Registry Search", description: "National and state-level sex offender registry searches for organizations working with children, youth groups, or vulnerable adults." },
  { icon: Heart, title: "Child Abuse and Neglect Registry", description: "State-specific abuse and neglect registry checks for ministry, youth programs, and childcare ministries." },
  { icon: BadgeCheck, title: "Employment and Credential Verification", description: "Verify prior employment, credentials, and ministry references for pastoral and administrative roles." },
  { icon: Users, title: "Volunteer Screening", description: "No-minimum screening for Sunday school teachers, youth group leaders, mission trip participants, and program volunteers." },
  { icon: RefreshCw, title: "Ongoing Workforce Monitoring", description: "Continuous criminal monitoring between annual renewal cycles." },
];

const challenges = [
  { icon: HandHeart, title: "Protecting Vulnerable Populations", description: "Every staff member and volunteer who interacts with children, the elderly, or other vulnerable groups must be thoroughly vetted." },
  { icon: Users, title: "High Volume of Volunteers", description: "SaffHire's no-minimum model means you can screen every volunteer regardless of how many you have." },
  { icon: AlertTriangle, title: "Limited HR Resources", description: "Simple online portal and affordable pricing without a dedicated HR department." },
  { icon: Clock, title: "Seasonal and Event-Based Hiring", description: "Fast turnaround for VBS, summer camps, mission trips, and holiday programs." },
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

const roles = ["Pastors and Ministers", "Youth Group Leaders", "Children's Ministry Workers", "Sunday School Teachers", "Nursery and Childcare Staff", "Counselors and Social Workers", "Program Directors", "Administrative Staff", "Volunteers", "Mission Trip Participants", "Camp Counselors", "Contractors and Vendors"];

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
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>INDUSTRY SOLUTIONS</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Churches and<br /><span style={{ color: "#22c55e" }}>Non-Profit Screening</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">Protect your congregation, your program participants, and your mission with affordable, FCRA-compliant background screening and no minimums.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={CHURCH_IMG} alt="Faith community leader in a welcoming church hall" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
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
              <img src={CHURCH_IMG} alt="Faith community leader in a welcoming church hall" className="w-full object-cover" style={{ height: 480 }} />
            </div>
            <div>
              <p className="section-label mb-3">THE CHALLENGE</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Community Trusts You to Keep Them Safe.</h2>
              <p className="text-gray-600 leading-relaxed mb-8">SaffHire makes it simple and affordable to screen employees, volunteers, contractors, and ministry leaders with no volume commitments.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2"><Icon size={16} style={{ color: "#22c55e" }} /><p className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</p></div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Complete Screening for Your Entire Ministry</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#f0fdf4" }}><Icon size={22} style={{ color: "#22c55e" }} /></div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Screening That Protects Your Mission and Your Community</h2>
              <p className="text-gray-600 leading-relaxed mb-8">SaffHire's FCRA-compliant reports and digital authorization workflow keep your screening program legally sound and audit-ready.</p>
              <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Talk to a Specialist <ArrowRight size={16} /></a>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Every Role in Your Organization</h2>
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
