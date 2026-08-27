/*
 * BenefitsMe Partner Detail Page - SaffHire Background Screening
 * Route: /referral-partners/benefitsme
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
  ShoppingBag,
  CreditCard,
  Zap,
  Users,
  DollarSign,
  Package,
  Send,
  Loader2,
} from "lucide-react";

const BENEFITSME_LOGO =
  "/images/partner-benefitsme.svg";

const features = [
  {
    icon: Zap,
    title: "Instant Access",
    description:
      "Employees sign up in minutes and unlock their spending limit immediately. Products ship promptly after ordering, giving your team fast access to the items they need.",
  },
  {
    icon: CreditCard,
    title: "No Credit Required",
    description:
      "Your job is your credit. BenefitsMe does not require a credit check, making the program accessible to every employee regardless of their credit history.",
  },
  {
    icon: DollarSign,
    title: "No Interest, No Hidden Fees",
    description:
      "Unlike credit cards or consumer lending programs, BenefitsMe charges no interest and no hidden fees. Employees pay only for the products they purchase, nothing more.",
  },
  {
    icon: ShoppingBag,
    title: "Thousands of Brand-Name Products",
    description:
      "Employees can shop thousands of popular brand-name electronics, appliances, furniture, and more from brands they already know and love.",
  },
  {
    icon: Users,
    title: "Employer-Sponsored Program",
    description:
      "BenefitsMe is set up through the employer, making it a valuable addition to your benefits package that helps attract and retain quality employees.",
  },
  {
    icon: Package,
    title: "Convenient Payroll Deduction",
    description:
      "Payments are automatically deducted from the employee's paycheck on a schedule they agree to upfront. No bills to remember, no late fees, no stress.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Employer Enrolls",
    desc: "The employer partners with BenefitsMe and enables the program for their workforce. Setup is simple and requires no cost to the employer.",
  },
  {
    step: "02",
    title: "Employee Signs Up",
    desc: "Employees join the program for free in minutes and immediately unlock their personalized spending limit based on their employment.",
  },
  {
    step: "03",
    title: "Shop and Order",
    desc: "Employees browse thousands of brand-name products across electronics, appliances, furniture, and more, then place their order directly through the BenefitsMe platform.",
  },
  {
    step: "04",
    title: "Pay Over Time",
    desc: "Products ship after the employee reviews and accepts the payment terms. Payments are automatically deducted from each paycheck until the balance is paid in full.",
  },
];

export default function BenefitsMePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/benefitsme" title="BenefitsMe Referral Partner" description="SaffHire and BenefitsMe partnership. Streamlined background screening for BenefitsMe clients." />
      <Navbar />
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8">
            <ArrowLeft size={14} />
            Back to Referral Partners
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Employee Benefits</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>BenefitsMe</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Employer-Sponsored Purchasing Assistance Program</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">BenefitsMe gives your employees instant access to thousands of brand-name products paid over time through convenient payroll deduction. No credit check, no interest, and no hidden fees. Available for companies with 200 or more employees.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Send size={15} />Request an Introduction</a>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl p-12 flex items-center justify-center shadow-2xl" style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: 420, minHeight: 220 }}>
                <img src={BENEFITSME_LOGO} alt="BenefitsMe logo" className="max-h-20 max-w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-7 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#f0fdf4" }}><Icon size={22} style={{ color: "#22c55e" }} /></div>
                  <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
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
