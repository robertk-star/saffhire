/*
 * GMG Savings Partner Detail Page
 * Route: /referral-partners/gmg-savings
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Cpu,
  Handshake,
  BarChart3,
  Building2,
  ChevronRight,
} from "lucide-react";

const GMG_LOGO = "/images/partner-gmg-savings.png";

const features = [
  { icon: DollarSign, title: "Tax-Based Profit Recovery", description: "Uncover hidden savings through specialized tax incentives and an AI-powered capture platform." },
  { icon: TrendingUp, title: "Growth and Operational Advisory", description: "Refine processes, improve profitability, and prepare for strategic expansion." },
  { icon: Cpu, title: "AI-Driven Automation", description: "Intelligent systems that have delivered a 40% increase in processing speed." },
  { icon: Handshake, title: "Affiliate Revenue Engine", description: "White-labeled tools that create a recurring revenue stream for your firm." },
  { icon: BarChart3, title: "Margin and Profitability Improvement", description: "Identify and implement sustainable improvements that flow to the bottom line." },
  { icon: Building2, title: "Acquisition Preparedness", description: "Operational frameworks and documentation that maximize valuation and deal readiness." },
];

export default function GMGSavingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/gmg-savings" title="GMG Savings Referral Partner" description="SaffHire and GMG Savings partnership. Background screening services for GMG Savings clients." />
      <Navbar />
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/referral-partners" className="inline-flex items-center gap-1 text-sm mb-6 hover:opacity-80 transition-opacity" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}><ChevronRight size={14} className="rotate-180" />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 p-4 bg-white rounded-xl inline-block">
                <img src={GMG_LOGO} alt="GMG Savings logo" className="h-16 w-auto object-contain" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Growth Is Our Business</h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">Growth Management Group helps small and mid-sized companies grow smarter through tax strategy, AI-driven automation, and operational advisory.</p>
              <a href="/#contact" className="btn-green inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Request an Introduction <ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-8 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#f0fdf4" }}><f.icon size={22} style={{ color: "#22c55e" }} /></div>
                <h3 className="font-black text-gray-900 text-lg mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
