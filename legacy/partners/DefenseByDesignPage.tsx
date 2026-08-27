/*
 * Defense By Design Partner Page
 * Route: /referral-partners/defense-by-design
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowLeft,
  Shield,
  Users,
  Eye,
  BookOpen,
  Building2,
  Mic,
} from "lucide-react";

const DEFENSEBYDESIGN_LOGO = "/images/partner-defense-by-design.png";

const features = [
  { icon: Eye, title: "Spot Trouble Before It Spots You", description: "Recognize pre-incident indicators of violence and workplace threats before they escalate." },
  { icon: Mic, title: "Conference and Convention Events", description: "Keynotes, breakouts, and workshops on personal and professional safety." },
  { icon: Building2, title: "Employee Training Events", description: "Customized onsite training with due diligence documentation." },
  { icon: Users, title: "Client Value-Add Events", description: "Co-host safety and security events for your clients." },
  { icon: BookOpen, title: "Continuing Education Credits", description: "Programs available with CME, CNE, CPE, HRCI, SHRM, and CLE credits." },
  { icon: Shield, title: "Due Diligence Documentation", description: "A clear paper trail of safety and security training efforts." },
];

export default function DefenseByDesignPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/defense-by-design" title="Defense by Design Referral Partner" description="SaffHire and Defense by Design partnership. Background screening services for Defense by Design clients." />
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #7c3a00 100%)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm mb-10 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}><ArrowLeft size={16} />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-md">
                <img src={DEFENSEBYDESIGN_LOGO} alt="Defense By Design" className="h-14 w-auto object-contain" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Defense By Design</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#f97316", fontFamily: "'Montserrat', sans-serif" }}>Predict. Prevent. Protect.</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Defense By Design helps organizations prevent workplace violence and exploitation through training events, keynotes, and customized programs.</p>
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#fff7ed" }}><Icon size={22} style={{ color: "#f97316" }} /></div>
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
