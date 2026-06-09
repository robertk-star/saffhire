/*
 * Hooray Health Referral Partner Page
 * Showcases Hooray Health affordable healthcare benefits as a complementary partner solution
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

const HOORAY_HEALTH_LOGO = "/hooray-health-logo.png";

const features = [
  {
    icon: DollarSign,
    title: "Affordable Coverage Options",
    description:
      "Hooray Health offers guaranteed-issue plans with no deductibles, $25 urgent care visits, and $0 virtual primary care. MAX plans ($5K, $30K, $60K) and MVP options provide flexibility for businesses of all sizes.",
  },
  {
    icon: Heart,
    title: "Comprehensive Provider Network",
    description:
      "Access to 4,700+ in-network urgent care and retail clinic locations across 47 states. 84% of the U.S. population is within 20 miles of a contracted provider, ensuring employees get care when they need it.",
  },
  {
    icon: Zap,
    title: "Prescription & Wellness Benefits",
    description:
      "37 acute prescriptions at $0 cost, 200 chronic medications at $5 copay, plus behavioral health support with included counseling visits. Discount dental, vision, and radiology services round out the offering.",
  },
  {
    icon: BarChart3,
    title: "Industry-Leading Satisfaction",
    description:
      "Hooray Health reports an NPS of 86, outperforming major insurance brands like Cigna, Humana, Kaiser, and United Health. Mobile-first member experience keeps employees engaged and satisfied.",
  },
];

const benefits = [
  {
    title: "Recruit & Retain Talent",
    description: "Meaningful benefits at lower costs help attract and retain hourly employees. The average cost of replacing an hourly employee is $3,500—competitive benefits pay for themselves.",
  },
  {
    title: "ACA Compliance Made Easy",
    description: "Guaranteed-issue plans with no health questionnaires. Part A and B compliant options ensure your business meets regulatory requirements without complexity.",
  },
  {
    title: "Mobile-First Member Experience",
    description: "Employees manage their benefits through an intuitive mobile portal. Easy enrollment, claims tracking, and provider search keep your team engaged.",
  },
  {
    title: "Dedicated Account Management",
    description: "From proposal review through ongoing support, Hooray Health provides implementation guidance and continuous account management to ensure success.",
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

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  employeeCount: "",
  message: "",
};

const employeeCountOptions = [
  "1-50",
  "51-100",
  "101-250",
  "251-500",
  "501-1000",
  "1000+",
];

export default function HoorayHealthPartner() {
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
      partnerSlug: "hooray-health",
      partnerName: "Hooray Health",
      ...form,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-sm border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/hooray-health" title="Hooray Health Referral Partner" description="SaffHire and Hooray Health partnership. Affordable healthcare benefits for hourly employees paired with thorough background screening." />

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
                Healthcare Benefits
              </span>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hooray Health
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                Affordable Healthcare for Hourly Employees
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Hooray Health provides guaranteed-issue healthcare plans designed specifically for businesses with hourly, part-time, and full-time employees. With affordable coverage, nationwide provider networks, and industry-leading satisfaction, Hooray Health helps employers attract and retain talent while meeting ACA compliance requirements.
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
                  src={HOORAY_HEALTH_LOGO}
                  alt="Hooray Health logo"
                  className="max-h-32 max-w-xs object-contain"
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
            <p className="section-label mb-3">ABOUT HOORAY HEALTH</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Healthcare Benefits That Employees Actually Want
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Founded in 2018, Hooray Health is on a mission to improve access to healthcare while protecting employees' financial health. The company specializes in serving staffing companies, restaurants, retail employers, and other businesses with hourly or part-time workforces—industries where benefits are often overlooked or too expensive.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              When paired with thorough background screening from SaffHire, employers gain a complete hiring and retention solution. We help you hire safely and compliantly, while Hooray Health ensures your team has access to affordable, comprehensive healthcare. Together, we help you build a workplace where employees feel valued and protected.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hooray Health's guaranteed-issue plans require no health questionnaires, making enrollment simple and inclusive. With an industry-leading NPS of 86, employees consistently rate Hooray Health higher than major insurance brands like Cigna, Humana, Kaiser, and United Health.
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
              What Hooray Health Delivers
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
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plan Options Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">PLAN OPTIONS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Flexible Plans for Every Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-10 border border-green-200">
              <h3
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hooray Health MAX Plans
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">MAX $5,000, $30,000, $60,000 options</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">No deductibles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">$25 urgent care visits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">$0 virtual primary care</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">Accident coverage up to $10,000</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">ACA Part A compliant with optional MEC</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-10 border border-blue-200">
              <h3
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Minimum Value Plans (MVP)
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">Bronze, Silver, and Plus options</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">ACA Part A & B compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">Guaranteed issue, no questionnaires</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">$0 deductible options available</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span className="text-gray-700">Major medical coverage</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">Perfect for employers needing comprehensive options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Benefits */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">WHY EMPLOYERS CHOOSE HOORAY HEALTH</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Build a Workplace Where Employees Feel Valued
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <h3
                  className="text-lg font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Network Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">NATIONWIDE COVERAGE</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Your Employees Get Care Anywhere
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Hooray Health provides access to a nationwide network of 4,700+ urgent care and retail clinic locations across 47 states. With approximately 84% of the U.S. population within 20 miles of a contracted provider, employees can get the care they need, when they need it.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The network includes major providers such as CVS MinuteClinic, NextCare, FastMed, Carbon Health, and MedExpress, ensuring quality care and convenience.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} style={{ color: "#22c55e" }} />
                  <span className="font-semibold text-gray-900">4,700+ locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} style={{ color: "#22c55e" }} />
                  <span className="font-semibold text-gray-900">47 states covered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} style={{ color: "#22c55e" }} />
                  <span className="font-semibold text-gray-900">84% within 20 miles</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-10 border border-green-200">
              <h3
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Prescription & Wellness Benefits
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold text-gray-900">37 Acute Prescriptions at $0</p>
                    <p className="text-sm text-gray-600">Common medications covered at no cost</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold text-gray-900">200 Chronic Medications at $5</p>
                    <p className="text-sm text-gray-600">Ongoing medications at affordable copay</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold text-gray-900">Behavioral Health Support</p>
                    <p className="text-sm text-gray-600">Included counseling visits for mental wellness</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold text-gray-900">Discount Dental & Vision</p>
                    <p className="text-sm text-gray-600">Additional savings on preventive care</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Request Introduction Form */}
      <section className="py-20 bg-white" id="request-intro">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">GET STARTED</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Request an Introduction
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Connect with a Hooray Health specialist to learn how affordable healthcare benefits can help your business attract and retain talent.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-10 border border-gray-200">
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#f0fdf4" }}
                >
                  <CheckCircle2 size={32} style={{ color: "#22c55e" }} />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your request has been submitted successfully. A Hooray Health specialist will contact you shortly to discuss how we can help your business.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm"
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
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
                      placeholder="Doe"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Number of Employees</label>
                    <select
                      name="employeeCount"
                      value={form.employeeCount}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select employee count</option>
                      {employeeCountOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Message (Optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business or any questions you have..."
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
                  your interest in Hooray Health.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
