/*
 * Corporate Talent Finder Referral Partner Page
 * Route: /referral-partners/corporate-talent-finder
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Users,
  HeartHandshake,
  Award,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const CORPORATE_TALENT_FINDER_LOGO = "/images/partner-corporate-talent-finder.png";

const features = [
  { icon: Briefcase, title: "Corporate Recruiting", description: "Sales, Marketing, HR, Accounting & Finance, Legal, IT, Operations, and other corporate functions" },
  { icon: Users, title: "Boutique, High-Touch Service", description: "Fewer searches, faster communication, and a recruiting team that stays closely involved throughout the process." },
  { icon: HeartHandshake, title: "People-First Approach", description: "Human judgment and genuine candidate relationships on every search." },
  { icon: Award, title: "SHRM-SCP Certified Leadership", description: "Experienced recruiters with national reach." },
];

export default function CorporateTalentFinderPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/corporate-talent-finder" title="Corporate Talent Finder Referral Partner" description="SaffHire and Corporate Talent Finder partnership. Boutique recruiting across corporate functions paired with thorough background screening." />
      <Navbar />
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Corporate Recruiting</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Corporate Talent Finder</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Boutique Recruiting Across Corporate Functions</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Corporate Talent Finder helps employers hire strong corporate talent through personal, relationship-driven recruiting.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Send size={15} />Request an Introduction</a>
              <div className="flex flex-col gap-2 mt-8 text-sm text-gray-400">
                <a href="tel:+14692611978" className="inline-flex items-center gap-2 hover:text-green-400 transition-colors"><Phone size={14} />469-261-1978</a>
                <a href="mailto:info@CorporateTalentFinder.com" className="inline-flex items-center gap-2 hover:text-green-400 transition-colors"><Mail size={14} />info@CorporateTalentFinder.com</a>
                <span className="inline-flex items-center gap-2"><MapPin size={14} />Based in Dallas-Fort Worth, Serving Companies Nationwide</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl p-12 flex items-center justify-center shadow-2xl" style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: 420, minHeight: 220 }}>
                <img src={CORPORATE_TALENT_FINDER_LOGO} alt="Corporate Talent Finder logo" className="max-h-20 max-w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f0fdf4" }}><Icon size={24} style={{ color: "#22c55e" }} /></div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
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
