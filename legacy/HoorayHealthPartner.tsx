/*
 * Hooray Health Referral Partner Page
 * Route: /referral-partners/hooray-health
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Users,
  BarChart3,
  Shield,
  Send,
  Loader2,
  Heart,
  Zap,
} from "lucide-react";

const HOORAY_HEALTH_LOGO = "/images/partner-hooray-health.png";

const features = [
  { icon: DollarSign, title: "Affordable Coverage Options", description: "Guaranteed-issue plans with no deductibles, $25 urgent care visits, and $0 virtual primary care." },
  { icon: Heart, title: "Comprehensive Provider Network", description: "4,700+ in-network urgent care and retail clinic locations across 47 states." },
  { icon: Zap, title: "Prescription & Wellness Benefits", description: "37 acute prescriptions at $0 cost and 200 chronic medications at $5 copay." },
  { icon: BarChart3, title: "Industry-Leading Satisfaction", description: "NPS of 86, outperforming major insurance brands." },
];

export default function HoorayHealthPartner() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/hooray-health" title="Hooray Health Referral Partner" description="SaffHire and Hooray Health partnership. Affordable healthcare benefits for hourly employees paired with thorough background screening." />
      <Navbar />
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Healthcare Benefits</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Hooray Health</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Affordable Healthcare for Hourly Employees</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Hooray Health provides guaranteed-issue healthcare plans designed for businesses with hourly, part-time, and full-time employees.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Send size={15} />Request an Introduction</a>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl p-12 flex items-center justify-center shadow-2xl" style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: 420, minHeight: 220 }}>
                <img src={HOORAY_HEALTH_LOGO} alt="Hooray Health logo" className="max-h-32 max-w-xs object-contain" />
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
