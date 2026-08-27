/*
 * Healthcare Industry Page SaffHire Background Screening
 * Design: Clean Professional Trust dark navy hero, white content sections, green accents
 * Route: /industries/healthcare
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
  Syringe,
  BadgeCheck,
  AlertTriangle,
  Phone,
} from "lucide-react";


const DOCTOR_IMG =
  "/images/industry-healthcare.webp";

// ─── Services offered for Healthcare ─────────────────────────────────────────
const services = [
  {
    icon: FileSearch,
    title: "Criminal Background Checks",
    description:
      "Multi-jurisdictional criminal history searches including county, state, and federal records. OIG and SAM exclusion checks included for all clinical roles.",
  },
  {
    icon: Syringe,
    title: "Drug & Alcohol Testing",
    description:
      "Pre-employment, random, post-accident, and reasonable-suspicion drug testing panels. Candidates are sent to a certified lab for fast, accurate results. Instant result options available.",
  },
  {
    icon: BadgeCheck,
    title: "License & Credential Verification",
    description:
      "Primary source verification of nursing licenses, medical licenses, DEA registrations, and all clinical certifications directly with issuing boards.",
  },
  {
    icon: Users,
    title: "Employment & Education Verification",
    description:
      "Confirm prior employment history and educational credentials for all clinical and administrative staff to ensure accuracy and prevent credential fraud.",
  },
  {
    icon: ShieldCheck,
    title: "OIG / SAM Exclusion Screening",
    description:
      "Mandatory exclusion database checks against the HHS Office of Inspector General and System for Award Management lists required for Medicare/Medicaid participation.",
  },
  {
    icon: Clock,
    title: "Ongoing Monitoring",
    description:
      "Continuous post-hire monitoring for license expirations, new criminal activity, and exclusion list additions keeping your workforce compliant year-round.",
  },
];

const complianceItems = [
  "The Joint Commission (TJC) accreditation standards",
  "CMS Conditions of Participation for Medicare & Medicaid",
  "OIG exclusion list screening requirements",
  "State nursing board and medical board regulations",
  "HIPAA privacy and security compliance",
  "EEOC and FCRA fair hiring requirements",
  "State-specific healthcare worker registry checks",
  "Background check requirements for home health aides (HCBS)",
];

const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "50+", label: "States Covered" },
  { value: "24/7", label: "Portal Access" },
];

const roles = [
  "Physicians & Surgeons",
  "Registered Nurses (RN)",
  "Licensed Practical Nurses (LPN)",
  "Certified Nursing Assistants (CNA)",
  "Medical Assistants",
  "Pharmacy Technicians",
  "Home Health Aides",
  "Physical & Occupational Therapists",
  "Radiologists & Imaging Technicians",
  "Hospital Administrators",
  "Medical Billing & Coding Staff",
  "Travel Nurses & Locum Tenens",
];

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/healthcare" title="Background Screening for Healthcare Organizations" description="Healthcare background screening for hospitals, clinics, and staffing agencies in Frisco TX and nationwide. OIG exclusion checks, license verification, FCRA compliant." />
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
                Healthcare<br /><span style={{ color: "#22c55e" }}>Background Screening</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Protecting patients, staff, and your organization's reputation with comprehensive,
                compliance-driven background screening solutions built specifically for the
                healthcare industry.
              </p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img src={DOCTOR_IMG} alt="Healthcare professional" className="w-full object-cover" style={{ height: 480 }} />
            </div>
            <div>
              <p className="section-label mb-3">WHY IT MATTERS</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>The Stakes Are Higher in Healthcare</h2>
              <p className="text-gray-600 leading-relaxed mb-5">Healthcare organizations bear a unique responsibility: the people they hire have direct access to vulnerable patients, sensitive medical records, and controlled substances.</p>
              <p className="text-gray-600 leading-relaxed mb-8">SaffHire's healthcare screening program is designed to meet the rigorous compliance demands of hospitals, clinics, home health agencies, long-term care facilities, and staffing firms.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">OUR SERVICES</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Comprehensive Healthcare Screening Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 group">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Meeting Every Regulatory Standard</h2>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Every Role. Every Level.</h2>
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
