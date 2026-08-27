/*
 * Transportation Industry Page - SaffHire Background Screening
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
  "/images/industry-transportation.webp";

const services = [
  { icon: FileSearch, title: "Criminal Background Checks", description: "Multi-jurisdictional county, state, and federal criminal history searches. Identify disqualifying offenses before a driver ever gets behind the wheel." },
  { icon: Truck, title: "MVR / Driving Record Checks", description: "Motor vehicle record reports pulled directly from state DMV sources. Review license class, endorsements, violations, suspensions, and accident history." },
  { icon: Zap, title: "DOT Drug and Alcohol Testing", description: "FMCSA-mandated pre-employment, random, post-accident, and return-to-duty drug and alcohol testing conducted at certified labs. Full DOT compliance." },
  { icon: BadgeCheck, title: "CDL Verification", description: "Verify commercial driver's license class, endorsements (Hazmat, Tanker, Doubles/Triples), and current status directly with issuing state authorities." },
  { icon: BarChart3, title: "Employment Verification", description: "Confirm prior employment history including DOT-regulated employer inquiries covering drug and alcohol testing records for the previous three years." },
  { icon: RefreshCw, title: "Ongoing MVR Monitoring", description: "Continuous license monitoring alerts you when a driver receives a new violation, suspension, or revocation between annual review cycles." },
];

const challenges = [
  { icon: AlertTriangle, title: "FMCSA Compliance Requirements", description: "DOT-regulated carriers must follow strict pre-employment and ongoing screening requirements under 49 CFR Part 391. SaffHire delivers fully compliant reports that meet federal standards." },
  { icon: Clock, title: "Fast Driver Onboarding", description: "Driver shortages mean you cannot afford slow screening. SaffHire returns MVR and criminal results in as little as 5 minutes so you can onboard qualified drivers without delay." },
  { icon: ShieldCheck, title: "Negligent Entrustment Risk", description: "Putting an unqualified driver behind the wheel exposes your company to significant liability. Thorough pre-employment screening is your first line of defense." },
  { icon: BarChart3, title: "High Driver Turnover", description: "The trucking industry sees annual turnover rates above 90% at large carriers. SaffHire's no-minimum, no-setup-fee model scales with your hiring volume without punishing you for fluctuations." },
];

const complianceItems = [
  "FMCSA 49 CFR Part 391 driver qualification standards",
  "DOT pre-employment drug and alcohol testing requirements",
  "MVR review requirements for CDL and non-CDL drivers",
  "FCRA-compliant background screening reports",
  "EEOC individualized assessment guidelines",
  "Multi-state and multi-jurisdictional criminal coverage",
];

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
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>INDUSTRY SOLUTIONS</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Transportation<br /><span style={{ color: "#22c55e" }}>Background Screening</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">DOT-compliant driver screening built for trucking companies, logistics providers, and fleet operators. Keep unsafe drivers off the road and your company protected from liability.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={TRANSPORT_IMG} alt="Commercial truck driver at a freight terminal" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
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
              <img src={TRANSPORT_IMG} alt="Truck driver at logistics hub" className="w-full object-cover" style={{ height: 480 }} />
            </div>
            <div>
              <p className="section-label mb-3">THE CHALLENGE</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Every Driver You Hire Is a Risk Decision.</h2>
              <p className="text-gray-600 leading-relaxed mb-8">SaffHire's transportation screening program is built to keep your fleet compliant, your drivers qualified, and your company protected.</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Complete Driver Qualification Screening</h2>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Built for DOT-Regulated Carriers</h2>
              <p className="text-gray-600 leading-relaxed mb-8">SaffHire provides FCRA-compliant background screening reports designed to support your driver qualification file requirements.</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Every Driver. Every Role.</h2>
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
