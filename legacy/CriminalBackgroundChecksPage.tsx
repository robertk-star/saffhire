/*
 * Criminal Background Checks Service Page
 * Route: /criminal-background-checks
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
  AlertTriangle,
  Phone,
  Globe,
  MapPin,
} from "lucide-react";

const CRIMINAL_IMG = "/images/hero-background-screening.webp";

const searchTypes = [
  { icon: Globe, title: "National Criminal Database Search", description: "Multi-jurisdictional database search across the United States. Pair with county searches for thorough screening." },
  { icon: MapPin, title: "County Criminal Court Search", description: "Court records retrieved directly from each county where your applicant has lived or worked." },
  { icon: ShieldCheck, title: "Federal Criminal Court Search", description: "Federal district court records for fraud, embezzlement, drug trafficking, and other federal offenses." },
  { icon: FileSearch, title: "State Criminal Repository Search", description: "Statewide criminal record repositories for the states where your applicant has lived." },
  { icon: AlertTriangle, title: "Sex Offender Registry Search", description: "All 50 state sex offender registries." },
  { icon: Clock, title: "Global Watchlist Search", description: "OFAC and international watchlists for financial services and government contractors." },
];

const stats = [
  { value: "Minutes", label: "National Search Results" },
  { value: "24-48 hrs", label: "County Search Turnaround" },
  { value: "100%", label: "FCRA Compliant" },
  { value: "24/7", label: "Portal Access" },
];

export default function CriminalBackgroundChecksPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/criminal-background-checks" title="Criminal Background Check Services for Employers | SaffHire" description="FCRA-compliant criminal background checks for businesses of all sizes. National, state, federal, and county-level searches." />
      <Navbar />
      <section className="relative pt-20 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12">
              <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Home</a>
              <p className="section-label mb-3" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>CRIMINAL SCREENING</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Criminal Background<br /><span style={{ color: "#22c55e" }}>Check Services</span></h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">Fast, accurate, FCRA-compliant criminal screening for employers across every industry.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Quote <ArrowRight size={16} /></a>
                <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />888-588-1733</a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={CRIMINAL_IMG} alt="Criminal background check screening" className="absolute inset-0 w-full h-full object-cover object-center" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%)" }} />
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
                <p className="text-sm text-green-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>Types of Criminal Searches We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchTypes.map((search) => {
              const Icon = search.icon;
              return (
                <div key={search.title} className="p-8 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-4 mb-4"><Icon size={28} style={{ color: "#22c55e" }} /><h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{search.title}</h3></div>
                  <p className="text-gray-700 leading-relaxed">{search.description}</p>
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
