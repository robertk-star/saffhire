/*
 * GMG Savings Partner Detail Page - SaffHire Background Screening
 * Route: /referral-partners/gmg-savings
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Cpu,
  Users,
  BarChart3,
  Handshake,
  Building2,
  ChevronRight,
} from "lucide-react";

const GMG_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/gmgsavings-logo-dark_199a5771.png";

const features = [
  {
    icon: DollarSign,
    title: "Tax-Based Profit Recovery",
    description:
      "GMG uncovers significant savings hidden in your operations and assets through specialized tax incentives, including 100s of available tax credits and an AI-powered capture platform.",
  },
  {
    icon: TrendingUp,
    title: "Growth and Operational Advisory",
    description:
      "Expert advisors help you refine processes, improve profitability, and prepare for strategic expansion through margin improvement, process design, and acquisition readiness.",
  },
  {
    icon: Cpu,
    title: "AI-Driven Automation",
    description:
      "GMG pioneered intelligent systems internally before offering them to clients. Their AI automation tools have delivered a 40% increase in processing speed for tax and operational workflows.",
  },
  {
    icon: Handshake,
    title: "Affiliate Revenue Engine",
    description:
      "Empower your network with GMG's white-labeled tools and generate a new, recurring revenue stream for your firm, backed by full training, onboarding, and seamless client servicing.",
  },
  {
    icon: BarChart3,
    title: "Margin and Profitability Improvement",
    description:
      "GMG's advisory team digs into your cost structure and revenue model to identify and implement sustainable improvements that flow directly to your bottom line.",
  },
  {
    icon: Building2,
    title: "Acquisition Preparedness",
    description:
      "Whether you are preparing to acquire or be acquired, GMG builds the operational frameworks and financial documentation that maximize your valuation and deal readiness.",
  },
];

const taxCredits = [
  "R&D Tax Credits",
  "Work Opportunity Tax Credit (WOTC)",
  "Employee Retention Credit (ERC)",
  "Cost Segregation Studies",
  "Section 179 Deductions",
  "Energy Efficiency Incentives",
  "State and Local Tax Credits",
  "HR Platform Tax Incentives",
];

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    description:
      "A brief conversation to understand your business size, industry, and current tax strategy.",
  },
  {
    num: "02",
    title: "Opportunity Assessment",
    description:
      "GMG's team analyzes your operations to identify uncaptured tax credits and growth opportunities.",
  },
  {
    num: "03",
    title: "Strategy Presentation",
    description:
      "You receive a clear, no-obligation report showing exactly what savings and growth levers are available.",
  },
  {
    num: "04",
    title: "Implementation",
    description:
      "GMG handles the execution, filing, and ongoing monitoring so you capture every dollar available.",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  employeeCount: string;
  message: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  employeeCount: "",
  message: "",
};

export default function GMGSavingsPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.referral.submitLead.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.company.trim()) newErrors.company = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitLead.mutate({
      ...form,
      partnerSlug: "gmg-savings",
      partnerName: "GMG Savings",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/gmg-savings" title="GMG Savings Referral Partner" description="SaffHire and GMG Savings partnership. Background screening services for GMG Savings clients." />

      <Navbar />

      {/* Hero */}
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <a
                href="/referral-partners"
                className="inline-flex items-center gap-1 text-sm mb-6 hover:opacity-80 transition-opacity"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                <ChevronRight size={14} className="rotate-180" />
                Back to Referral Partners
              </a>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
                style={{
                  backgroundColor: "rgba(34,197,94,0.15)",
                  color: "#22c55e",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                REFERRAL PARTNER
              </div>
              <img
                src={GMG_LOGO}
                alt="GMG Savings logo"
                className="h-16 w-auto object-contain mb-6"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Your Growth Is Our Business
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Growth Management Group (GMG) helps small and mid-sized companies grow smarter
                through tax strategy, AI-driven automation, and operational advisory. For over 23
                years, GMG has been a pivotal partner to more than 200,000 businesses, engineering
                strategies that have captured over $37 billion in value.
              </p>
              <a
                href="#introduction-form"
                className="btn-green inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction <ArrowRight size={16} />
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e293b" }}>
                <div className="p-8">
                  <p
                    className="text-sm font-bold uppercase tracking-widest mb-6"
                    style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    By the Numbers
                  </p>
                  {[
                    { value: "23+", label: "Years in Business" },
                    { value: "200K+", label: "Businesses Served" },
                    { value: "$37B+", label: "Value Captured" },
                    { value: "40%", label: "Faster Processing with AI" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between py-4 border-b border-slate-700 last:border-0"
                    >
                      <span className="text-gray-400 text-sm">{stat.label}</span>
                      <span
                        className="text-2xl font-black"
                        style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: "#22c55e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "23+", label: "Years Experience" },
              { value: "200K+", label: "Businesses Served" },
              { value: "$37B+", label: "Value Captured" },
              { value: "100s", label: "Tax Credits Available" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-green-100 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                ABOUT GMG
              </p>
              <h2
                className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                A Legacy of Value Creation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For over 23 years, Growth Management Group (GMG) has been a pivotal partner for
                more than 200,000 businesses, engineering strategies that have captured over $37
                billion in value. GMG is not just a consulting firm; they are architects of growth.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Their methodology fuses deep financial expertise with the power of modern systems.
                GMG designs robust operational frameworks and intelligent automations that translate
                strategic insights into sustained, measurable results.
              </p>
              <p className="text-gray-600 leading-relaxed">
                SaffHire partners with GMG because both companies share a commitment to helping
                employers build stronger, more resilient organizations. As you screen and onboard
                great people, GMG helps you maximize the financial and operational value those
                people create.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, title: "Tax Recovery", desc: "Capture hidden savings in your operations" },
                { icon: Cpu, title: "AI Automation", desc: "40% faster processing with intelligent systems" },
                { icon: TrendingUp, title: "Growth Advisory", desc: "Margin improvement and expansion strategy" },
                { icon: Users, title: "200K+ Clients", desc: "Trusted by businesses across every industry" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
                >
                  <item.icon size={28} className="mb-3" style={{ color: "#22c55e" }} />
                  <h3
                    className="font-black text-gray-900 text-sm mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              CORE SOLUTIONS
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Integrated Services for Growth
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              GMG's three core solution areas work together to uncover savings, improve operations,
              and build new revenue streams for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#f0fdf4" }}
                >
                  <f.icon size={22} style={{ color: "#22c55e" }} />
                </div>
                <h3
                  className="font-black text-gray-900 text-lg mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax credits checklist */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                TAX CREDIT CATEGORIES
              </p>
              <h2
                className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hundreds of Credits. Most Businesses Claim Zero.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                The U.S. tax code contains hundreds of incentives designed to reward businesses for
                hiring, investing, and innovating. The vast majority go unclaimed every year simply
                because most businesses do not know they exist. GMG's AI-powered platform finds
                every credit your business qualifies for.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {taxCredits.map((credit) => (
                  <div key={credit} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: "#22c55e", flexShrink: 0 }} />
                    <span className="text-gray-700 text-sm">{credit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "#0f172a" }}
            >
              <p
                className="text-sm font-bold uppercase tracking-widest mb-6"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                WHY MOST BUSINESSES MISS OUT
              </p>
              {[
                {
                  title: "Complexity",
                  desc: "Tax credit rules are highly specific to industry, location, and payroll structure. Without specialized expertise, most credits go unnoticed.",
                },
                {
                  title: "Time",
                  desc: "Identifying, documenting, and filing for tax credits is time-intensive work that most internal teams cannot prioritize alongside day-to-day operations.",
                },
                {
                  title: "Awareness",
                  desc: "Many credits are added, modified, or extended each year. Staying current requires dedicated monitoring that general CPAs rarely provide.",
                },
              ].map((item) => (
                <div key={item.title} className="mb-6 last:mb-0">
                  <h4
                    className="font-bold text-white mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              HOW IT WORKS
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              From Discovery to Dollars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-xl font-black"
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-black text-gray-900 text-lg mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request an Introduction form */}
      <section id="introduction-form" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              GET CONNECTED
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Request an Introduction to GMG
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Fill out the form below and SaffHire will personally connect you with the GMG team.
              Discover how much your business could be leaving on the table in uncaptured tax
              credits and untapped growth opportunities.
            </p>
          </div>

          {submitted ? (
            <div
              className="rounded-2xl p-12 text-center"
              style={{ backgroundColor: "#f0fdf4", border: "2px solid #22c55e" }}
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#22c55e" }} />
              <h3
                className="text-2xl font-black text-gray-900 mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Introduction Requested!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for your interest in GMG. The SaffHire team will be in touch shortly to
                make the introduction and help you get started.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {field.label} <span style={{ color: "#22c55e" }}>*</span>
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof FormState]}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: "#22c55e" } as React.CSSProperties}
                    />
                    {errors[field.name as keyof FormState] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.name as keyof FormState]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Work Email <span style={{ color: "#22c55e" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Name <span style={{ color: "#22c55e" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    name="employeeCount"
                    value={form.employeeCount}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1 to 10</option>
                    <option value="11-50">11 to 50</option>
                    <option value="51-200">51 to 200</option>
                    <option value="201-500">201 to 500</option>
                    <option value="501-1000">501 to 1,000</option>
                    <option value="1001+">1,001 or more</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What are you most interested in?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="e.g., Tax credit recovery, operational advisory, AI automation..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitLead.isPending}
                className="btn-green w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {submitLead.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    Request Introduction <ArrowRight size={16} />
                  </>
                )}
              </button>

              {submitLead.isError && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Ready to Uncover Hidden Value in Your Business?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            SaffHire and GMG are both committed to helping employers build stronger organizations.
            Let us make the introduction and help you discover what your business has been leaving
            on the table.
          </p>
          <a
            href="#introduction-form"
            className="btn-green inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Get Introduced to GMG <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
