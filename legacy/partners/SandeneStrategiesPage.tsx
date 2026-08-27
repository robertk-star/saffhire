/*
 * Sandene Strategies Partner Page
 * Route: /referral-partners/sandene-strategies
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  ArrowLeft,
  TrendingUp,
  FileText,
  Target,
  Compass,
  BarChart3,
  Building2,
} from "lucide-react";

const SANDENE_LOGO = "/images/partner-sandene.png";
const BRAND = "#0e6e66";
const BRAND_LIGHT = "rgba(14,110,102,0.1)";

const features = [
  { icon: Compass, title: "Your 360 Future Blueprint", description: "A comprehensive plan built around your vision for the future." },
  { icon: TrendingUp, title: "360 Asset Strategy", description: "Evaluate every significant asset and liability on your balance sheet." },
  { icon: Building2, title: "Closely-Held Business Planning", description: "Incorporate your business into your personal financial plan." },
  { icon: BarChart3, title: "Tax Integration", description: "Tax strategies integrated directly into your financial plan." },
  { icon: Target, title: "Risk Management", description: "Identify threats and protect your family and assets." },
  { icon: FileText, title: "Estate and Legacy Planning", description: "Asset distribution, trusts, charitable giving, and life insurance." },
];

export default function SandeneStrategiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/sandene-strategies" title="Sandene Strategies Referral Partner" description="SaffHire and Sandene Strategies partnership. Background screening solutions for Sandene Strategies clients." />
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0a3d38 100%)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 transition-colors text-sm mb-10 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}><ArrowLeft size={16} />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-md">
                <img src={SANDENE_LOGO} alt="Sandene Strategies" className="h-12 w-auto object-contain" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sandene Strategies</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#4dd9cf", fontFamily: "'Montserrat', sans-serif" }}>Your Future Is Now. Let's Get to Work!</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Sandene Strategies is a comprehensive financial planning firm serving entrepreneurs, executives, and wealth builders.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: BRAND_LIGHT }}><Icon size={22} style={{ color: BRAND }} /></div>
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
