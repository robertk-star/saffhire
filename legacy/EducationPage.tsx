import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { ArrowRight, ArrowLeft, FileSearch, BadgeCheck, Phone, Eye, Heart, BookOpen, RefreshCw } from "lucide-react";

const EDUCATION_IMG = "/images/industry-education.webp";
const services = [
  { icon: FileSearch, title: "Criminal Background Checks", description: "Multi-jurisdictional county, state, and federal criminal history searches." },
  { icon: Eye, title: "Sex Offender Registry Search", description: "National and state-level sex offender registry searches." },
  { icon: Heart, title: "Child Abuse and Neglect Registry", description: "State-specific abuse and neglect registry checks." },
  { icon: BadgeCheck, title: "Education and Credential Verification", description: "Verify degrees, certifications, and teaching credentials." },
  { icon: BookOpen, title: "Employment Verification", description: "Confirm prior work history for education candidates." },
  { icon: RefreshCw, title: "Ongoing Workforce Monitoring", description: "Continuous criminal monitoring between renewal cycles." },
];
const stats = [
  { value: "5min-48hrs", label: "With Verification" },
  { value: "All 50", label: "States Covered" },
  { value: "FCRA-aware", label: "Screening Workflows" },
  { value: "24/7", label: "Portal Access" },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries/education" title="Background Screening for Schools and Education" description="Background screening for schools and education organizations with FCRA-compliant screening workflows." />
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>INDUSTRY SOLUTIONS</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Education Sector<br /><span style={{ color: "#22c55e" }}>Background Screening</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">Protect students, staff, and your institution with thorough, FCRA-compliant screening workflows built for schools, childcare providers, and universities.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={EDUCATION_IMG} alt="School administrator in a modern classroom library" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
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
