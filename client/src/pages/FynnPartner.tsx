/*
 * Fynn Referral Partner Page
 * Showcases Fynn AI-driven EHR for senior living as a complementary partner solution
 * Route: /referral-partners/fynn
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
  Zap,
  Users,
  BarChart3,
  Shield,
  Send,
  Loader2,
} from "lucide-react";

const FYNN_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/fynn-logo_658b6e67.png";

const features = [
  {
    icon: Zap,
    title: "Resident-Centered Intelligence",
    description:
      "Fynn monitors behaviors, mood, and subtle changes in condition to surface at-risk residents sooner. This enables earlier interventions, reduces falls and hospitalizations, and extends resident length of stay while improving care quality and NOI.",
  },
  {
    icon: Users,
    title: "Proactive Care Workflows",
    description:
      "Developed with Mayo Clinic, Fynn identifies risk earlier by analyzing behaviors and trends against each resident's baseline. Proactive workflows, forms, and tasks are embedded directly into daily care, ensuring timely interventions and consistent follow-up.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Leadership Dashboards",
    description:
      "Caregivers see exactly what needs to be done each shift. Leaders get real-time dashboards that track KPIs, trends, and compliance. At the portfolio level, executives can benchmark performance and identify which communities need support.",
  },
  {
    icon: Shield,
    title: "Family Engagement & Transparency",
    description:
      "Families get controlled, real-time visibility into their loved one's care. This reduces inbound calls, builds trust, and provides communities with a tangible differentiator during tours and move-ins.",
  },
];

const integrations = [
  {
    title: "CRM Platforms",
    description: "WelcomeHome and other leading CRM solutions for seamless resident data flow.",
  },
  {
    title: "Accounting Systems",
    description: "Sage Intacct, RealPage, QuickBooks, and custom GL exports for financial integration.",
  },
  {
    title: "Pharmacies",
    description: "Long-term care pharmacies with true bi-directional data exchange.",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  facilityType: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  facilityType: "",
  message: "",
};

const facilityTypeOptions = [
  "Assisted Living",
  "Memory Care",
  "Both",
  "Senior Living Operator",
  "Other",
];

export default function FynnPartner() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const submitLead = trpc.referral.submitLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setFormError("");
    },
    onError: (err) => {
      setFormError(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.firstName || !form.lastName || !form.email) {
      setFormError("Please fill in all required fields.");
      return;
    }
    submitLead.mutate({
      partnerSlug: "fynn",
      partnerName: "Fynn",
      ...form,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-sm border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/fynn" title="Fynn Referral Partner" description="SaffHire and Fynn partnership. AI-driven EHR for senior living communities paired with thorough background screening." />

      <Navbar />

      {/* Hero */}
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <a
            href="/referral-partners"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"
          >
            <ArrowLeft size={14} />
            Back to Referral Partners
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(34,197,94,0.15)",
                  color: "#22c55e",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Healthcare Technology
              </span>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Fynn
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                AI-Driven EHR for Senior Living
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Fynn is an intelligent electronic health record platform designed specifically for Assisted Living and Memory Care facilities. By uniting clinical, operational, and family engagement tools in one place, Fynn helps communities streamline operations, enhance care quality, and strengthen relationships with residents and families.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#request-intro"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Send size={15} />
                  Request an Introduction
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div
                className="rounded-2xl p-12 flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: 420, minHeight: 220 }}
              >
                <img
                  src={FYNN_LOGO}
                  alt="Fynn logo"
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-label mb-3">ABOUT FYNN</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The Complete Foundation for Senior Living Communities
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Senior living communities face unprecedented operational complexity. Staff turnover is high, compliance requirements are stringent, and families expect transparency and communication. Fynn addresses these challenges by providing a unified platform that improves care coordination, reduces administrative burden, and builds family trust.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              When paired with thorough background screening from SaffHire, communities gain the complete foundation for safe, compliant, and efficient operations. Together, we help you hire safely, operate efficiently, and deliver exceptional care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Fynn was built by operators for operators. With an open API and configurable workflows, communities get a future-proof platform that adapts to their care model while connecting seamlessly to their existing ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">CORE CAPABILITIES</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What Fynn Delivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#f0fdf4" }}
                    >
                      <Icon size={24} style={{ color: "#22c55e" }} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold text-gray-900 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">ECOSYSTEM</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Built for Your Technology Stack
            </h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              Fynn is built with an open API, ensuring flexibility and connectivity across the senior living ecosystem. Communities reduce fragmentation and risk by integrating directly with leading platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((integration) => (
              <div
                key={integration.title}
                className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <h3
                  className="text-lg font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {integration.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">PRICING</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Transparent, All-Inclusive Pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <h3
                className="text-lg font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Per Active Resident
              </h3>
              <p className="text-4xl font-black text-green-600 mb-2">$15</p>
              <p className="text-gray-600 text-sm mb-6">
                per active resident per month (not licensed beds or units)
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
                  All features included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
                  Full integrations
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <h3
                className="text-lg font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Onboarding
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                One-time implementation fee per operator
              </p>
              <p className="text-gray-600 text-sm">
                Includes dedicated support to ensure a smooth transition and rapid time-to-value.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <h3
                className="text-lg font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                All-Inclusive
              </h3>
              <p className="text-gray-600 text-sm">
                Pricing includes integrations, updates, and dedicated support. No hidden costs or surprise fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request an Introduction Form */}
      <section id="request-intro" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <div>
              <p className="section-label mb-3">GET CONNECTED</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction to Fynn
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Interested in learning how Fynn can help your senior living community streamline operations and enhance care quality? Fill out the form and the SaffHire team will connect you directly with the Fynn team to get you started.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: Shield, text: "Comprehensive platform for clinical and operational needs" },
                  { icon: Users, text: "Built by operators for Assisted Living and Memory Care" },
                  { icon: CheckCircle2, text: "No obligation, no pressure" },
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
                    The SaffHire team will reach out to connect you with Fynn within 1 business day.
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
                  <div>
                    <h3
                      className="text-lg font-black text-gray-900 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Request an Introduction
                    </h3>
                    <p className="text-gray-500 text-sm">
                      All fields marked with * are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Work Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Organization Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Senior Living Community Name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Facility Type</label>
                    <select
                      name="facilityType"
                      value={form.facilityType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a facility type</option>
                      {facilityTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Message (Optional)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your community or any questions you have..."
                      rows={3}
                      className={inputClass + " resize-none"}
                    />
                  </div>

                  {formError && (
                    <p className="text-red-500 text-sm font-medium">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="btn-green w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {submitLead.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Request <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center leading-relaxed">
                    By submitting this form, you agree to be contacted by SaffHire regarding
                    your interest in Fynn.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
