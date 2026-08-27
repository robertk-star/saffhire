/*
 * WorkShield Partner Page
 * Route: /referral-partners/workshield
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowLeft,
  CheckCircle2,
  Shield,
  Search,
  BarChart3,
  Zap,
  Lock,
  Phone,
} from "lucide-react";

const WORKSHIELD_LOGO = "/images/partner-workshield.png";

const features = [
  { icon: Phone, title: "Multi-Channel Reporting", description: "Employees can report workplace misconduct through app, web, or call center." },
  { icon: Search, title: "Unbiased Investigations", description: "Third-party investigators deliver efficient, neutral resolution recommendations." },
  { icon: Zap, title: "4x Faster Resolution", description: "Work Shield resolves cases 4 times faster than the national average." },
  { icon: BarChart3, title: "Real-Time Analytics", description: "Leaders gain real-time updates and workplace insights." },
  { icon: Lock, title: "Confidential and Secure", description: "Reports and investigations are handled with strict confidentiality." },
  { icon: Shield, title: "Proven ROI", description: "More than $90 million in total client savings." },
];

export default function WorkShieldPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/workshield" title="WorkShield Referral Partner" description="SaffHire and WorkShield partnership. Integrated background screening solutions for WorkShield clients." />
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f4c2a 100%)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-10 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}><ArrowLeft size={16} />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 p-4 bg-white rounded-xl inline-block">
                <img src={WORKSHIELD_LOGO} alt="Work Shield" className="h-14 w-auto object-contain" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Work Shield</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Workplace Misconduct Solution</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Work Shield delivers technology-driven, human-led workplace misconduct resolution.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#f0fdf4" }}><Icon size={22} style={{ color: "#22c55e" }} /></div>
                  <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
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
