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
  Syringe,
  BadgeCheck,
  Phone,
} from "lucide-react";

const DOCTOR_IMG = "/images/industry-healthcare.webp";

const services = [
  { icon: FileSearch, title: "Criminal Background Checks", description: "Multi-jurisdictional criminal history searches including county, state, and federal records. OIG and SAM exclusion checks included for clinical roles." },
  { icon: Syringe, title: "Drug & Alcohol Testing", description: "Pre-employment, random, post-accident, and reasonable-suspicion drug testing through certified labs. Instant result options available." },
  { icon: BadgeCheck, title: "License & Credential Verification", description: "Primary source verification of nursing licenses, medical licenses, DEA registrations, and clinical certifications." },
  { icon: Users, title: "Employment & Education Verification", description: "Confirm prior employment history and educational credentials for clinical and administrative staff." },
  { icon: ShieldCheck, title: "OIG / SAM Exclusion Screening", description: "Exclusion database checks against the HHS OIG and SAM lists used for Medicare and Medicaid participation." },
  { icon: Clock, title: "Ongoing Monitoring", description: "Post-hire monitoring options for license expirations, new criminal activity, and exclusion list additions." },
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "FCRA-aware", label: "Screening Workflows" },
  { value: "50+", label: "States Covered" },
  { value: "24/7", label: "Portal Access" },
];

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/healthcare" title="Background Screening for Healthcare Organizations" description="Healthcare background screening for hospitals, clinics, and staffing agencies. OIG exclusion checks, license verification, and FCRA-compliant screening workflows." />
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>INDUSTRY SOLUTIONS</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Healthcare<br /><span style={{ color: "#22c55e" }}>Background Screening</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">Protecting patients, staff, and your organization's reputation with compliance-aware background screening built for healthcare employers.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={DOCTOR_IMG} alt="Doctor with stethoscope in hospital" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
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
      <Footer />
    </div>
  );
}
