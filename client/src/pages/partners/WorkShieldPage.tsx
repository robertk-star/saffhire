/*
 * WorkShield Partner Page - SaffHire Background Screening
 * Route: /referral-partners/workshield
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import PageSEO from "@/components/PageSEO";

import {
  ArrowLeft,
  CheckCircle2,
  Shield,
  Search,
  BarChart3,
  Users,
  Zap,
  Lock,
  Send,
  Loader2,
  Phone,
  FileText,
  AlertTriangle,
} from "lucide-react";

const WORKSHIELD_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/workshield-logo_c864ef78.webp";

const features = [
  {
    icon: Phone,
    title: "Multi-Channel Reporting",
    description:
      "Employees can report workplace misconduct anytime through mobile app, web portal, or a dedicated call center, ensuring no incident goes unheard.",
  },
  {
    icon: Search,
    title: "Unbiased Investigations",
    description:
      "Third-party investigators deliver efficient, neutral, and unbiased resolution recommendations, removing internal bias and HR burden.",
  },
  {
    icon: Zap,
    title: "4x Faster Resolution",
    description:
      "Work Shield resolves workplace misconduct cases 4 times faster than the national average, reducing disruption and legal exposure.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Leaders gain real-time updates and detailed workplace insights, enabling stronger compliance and proactive culture management.",
  },
  {
    icon: Lock,
    title: "Confidential and Secure",
    description:
      "All reports and investigations are handled with strict confidentiality, protecting both the reporting employee and the organization.",
  },
  {
    icon: Shield,
    title: "Proven ROI",
    description:
      "Work Shield has delivered over $90 million in total client savings by reducing incidents, lowering legal exposure, and cutting settlement costs.",
  },
];

const stats = [
  { value: "300+", label: "Clients Protected" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "4x", label: "Faster Than National Avg." },
  { value: "$90M+", label: "Total Client Savings" },
];

const howItWorks = [
  {
    step: "01",
    title: "Employee Reports an Incident",
    description:
      "An employee submits a misconduct report through the mobile app, web portal, or call center, 24 hours a day, 7 days a week.",
  },
  {
    step: "02",
    title: "Work Shield Assigns an Investigator",
    description:
      "A qualified, neutral third-party investigator is assigned to the case, removing internal HR from the investigation process entirely.",
  },
  {
    step: "03",
    title: "Swift, Unbiased Investigation",
    description:
      "The investigator conducts a thorough review and delivers a resolution recommendation, typically 4 times faster than internal processes.",
  },
  {
    step: "04",
    title: "Leaders Receive Actionable Insights",
    description:
      "Leadership receives clear outcomes, real-time analytics, and compliance documentation to make informed decisions and prevent recurrence.",
  },
];

export default function WorkShieldPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    employeeCount: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitLead = trpc.referral.submitLead.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid work email is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitLead.mutate({
      ...form,
      partnerSlug: "workshield",
      partnerName: "WorkShield",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/workshield" title="WorkShield Referral Partner" description="SaffHire and WorkShield partnership. Integrated background screening solutions for WorkShield clients." />

      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f4c2a 100%)" }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/referral-partners"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-10 font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <ArrowLeft size={16} />
            Back to Referral Partners
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/30"
                style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                Referral Partner
              </div>
              <div className="mb-6 p-4 bg-white/10 rounded-xl inline-block">
                <img
                  src={WORKSHIELD_LOGO}
                  alt="Work Shield"
                  className="h-14 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Work Shield
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                Workplace Misconduct Solution
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Work Shield delivers technology-driven, human-led workplace misconduct
                resolution. Unbiased investigations, faster outcomes, and stronger
                compliance, so your HR team can focus on the business, not the fallout.
              </p>
              <a
                href="#request-intro"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 border border-white/10 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="text-3xl font-black mb-2"
                    style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-3">ABOUT WORK SHIELD</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Create Workplaces Built on Integrity and Trust
              </h2>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-5">
                Most organizations track workplace misconduct. Work Shield resolves it.
                Internal HR teams often spend valuable time caught in the drama, bias, and
                legal exposure that comes with handling harassment and discrimination
                complaints internally. Work Shield removes that burden entirely.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Work Shield's platform combines secure, multi-channel reporting with
                third-party investigators who deliver unbiased resolution recommendations.
                The result is faster case closure, reduced legal exposure, and a workplace
                culture built on trust and accountability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With over 300 clients protected, a 95% satisfaction rate, and more than
                $90 million in total client savings, Work Shield has proven that resolving
                misconduct quickly and fairly is not just the right thing to do, it is
                also the smart business decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">KEY FEATURES</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why Organizations Choose Work Shield
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "#f0fdf4" }}
                  >
                    <Icon size={22} style={{ color: "#22c55e" }} />
                  </div>
                  <h3
                    className="font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Work Shield Handles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">WHAT THEY HANDLE</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                End-to-End Misconduct Resolution
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Work Shield handles the full spectrum of workplace misconduct, from initial
                reporting through final resolution, so your HR team never has to manage
                these sensitive situations internally.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Harassment complaints",
                  "Discrimination claims",
                  "Retaliation reports",
                  "Hostile work environment",
                  "Bullying and intimidation",
                  "Ethics and policy violations",
                  "Workplace violence concerns",
                  "Anonymous tip management",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: "#22c55e" }} className="flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-8 border border-gray-100"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#f0fdf4" }}
                >
                  <AlertTriangle size={20} style={{ color: "#22c55e" }} />
                </div>
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Why Internal Investigations Fall Short
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Bias Risk",
                    desc: "Internal investigators may have relationships with the parties involved, compromising objectivity.",
                  },
                  {
                    title: "HR Bandwidth",
                    desc: "Investigations are time-consuming and pull HR away from strategic priorities.",
                  },
                  {
                    title: "Legal Exposure",
                    desc: "Poorly conducted internal investigations increase liability and litigation risk.",
                  },
                  {
                    title: "Slow Resolution",
                    desc: "Internal processes average 4 times longer than Work Shield's third-party investigations.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{item.title}: </span>
                      <span className="text-gray-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">THE PROCESS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How Work Shield Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-100 z-0" style={{ width: "calc(100% - 2rem)" }} />
                )}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative z-10">
                  <div
                    className="text-3xl font-black mb-4"
                    style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="font-bold text-gray-900 mb-3 text-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request an Introduction Form */}
      <section id="request-intro" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <p className="section-label mb-3">GET CONNECTED</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction to Work Shield
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Interested in bringing Work Shield's misconduct resolution platform to your
                organization? Fill out the form and the SaffHire team will connect you
                directly with the Work Shield team to get you started.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: FileText, text: "No obligation, no pressure" },
                  { icon: Users, text: "Works for organizations of all sizes" },
                  { icon: CheckCircle2, text: "Free consultation with the Work Shield team" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#f0fdf4" }}
                      >
                        <Icon size={16} style={{ color: "#22c55e" }} />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Form */}
            <div
              className="rounded-2xl p-8 border border-gray-100 shadow-sm"
              style={{ backgroundColor: "#f8fafc" }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "#f0fdf4" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#22c55e" }} />
                  </div>
                  <h3
                    className="text-xl font-black text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Request Received!
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    The SaffHire team will reach out to connect you with Work Shield within
                    1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-green-600 hover:text-green-700 font-semibold underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3
                    className="text-xl font-black text-gray-900 mb-6"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Request an Introduction
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.email ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                        Phone
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.company ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      Number of Employees
                    </label>
                    <select
                      name="employeeCount"
                      value={form.employeeCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
                    >
                      <option value="">Select range</option>
                      <option value="1-50">1 to 50</option>
                      <option value="51-200">51 to 200</option>
                      <option value="201-500">201 to 500</option>
                      <option value="501-1000">501 to 1,000</option>
                      <option value="1001-5000">1,001 to 5,000</option>
                      <option value="5000+">5,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us a bit about your organization and what you are looking for..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {submitLead.isPending ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {submitLead.isPending ? "Submitting..." : "Request Introduction"}
                  </button>

                  {submitLead.isError && (
                    <p className="text-red-500 text-sm text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SaffHire + Work Shield: A Complete Hiring Solution
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            SaffHire screens candidates before they are hired. Work Shield protects your
            organization after they join. Together, we help you build a safer, more
            compliant workplace from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#request-intro"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              Connect with Work Shield
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Get a Background Screening Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
