/*
 * Drug Screening Service Page
 * Route: /drug-screening
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  FlaskConical,
  Clock,
  ShieldCheck,
} from "lucide-react";

const DRUG_IMG = "/images/industry-healthcare.webp";

const features = [
  { icon: FlaskConical, title: "5, 10, and 12 Panel Testing", description: "Standard and expanded panels for pre-employment and ongoing screening." },
  { icon: Clock, title: "Fast Turnaround", description: "Negative results typically return quickly so hiring stays on schedule." },
  { icon: ShieldCheck, title: "DOT and Non-DOT Options", description: "Screening programs for regulated and non-regulated workforces." },
  { icon: CheckCircle2, title: "Nationwide Collection Network", description: "Convenient collection sites so candidates can complete testing quickly." },
];

export default function DrugScreeningPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/drug-screening" title="Drug Screening Services for Employers | SaffHire" description="Pre-employment and ongoing drug screening for employers nationwide." />
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>WORKPLACE TESTING</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Drug Screening<br /><span style={{ color: "#22c55e" }}>Services</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">Keep your workplace safe with fast, reliable drug screening that fits your hiring timeline.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={DRUG_IMG} alt="Drug screening services" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-8 border border-gray-200 rounded-lg">
                  <Icon size={28} style={{ color: "#22c55e" }} />
                  <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
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
