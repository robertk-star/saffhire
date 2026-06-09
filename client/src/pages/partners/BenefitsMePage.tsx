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
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/benefitsme-logo-clean_2fd281f9.png";

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

const categories = [
  "Electronics",
  "Large Appliances",
  "Furniture",
  "Computers and Laptops",
  "Smartphones and Tablets",
  "Home and Kitchen",
  "Gaming and Entertainment",
  "Fitness and Wellness",
];

const employeeCountOptions = [
  "1 to 10",
  "11 to 50",
  "51 to 200",
  "201 to 500",
  "501 to 1,000",
  "1,000+",
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

export default function BenefitsMePage() {
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
      partnerSlug: "benefitsme",
      partnerName: "BenefitsMe",
      ...form,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-sm border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/benefitsme" title="BenefitsMe Referral Partner" description="SaffHire and BenefitsMe partnership. Streamlined background screening for BenefitsMe clients." />

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
                Employee Benefits
              </span>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                BenefitsMe
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                Employer-Sponsored Purchasing Assistance Program
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                BenefitsMe gives your employees instant access to thousands of brand-name
                products paid over time through convenient payroll deduction. No credit
                check, no interest, and no hidden fees. Available for companies with
                200 or more employees.
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
                  src={BENEFITSME_LOGO}
                  alt="BenefitsMe logo"
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
            <p className="section-label mb-3">ABOUT BENEFITSME</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              A Financial Wellness Benefit Your Employees Will Actually Use
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              BenefitsMe is an employer-sponsored purchasing assistance program designed to
              improve employee financial wellness without the costs and risks of credit cards
              or traditional consumer lending. The program is offered through the employer
              as a voluntary benefit, giving employees a responsible way to access the
              products they need and pay for them over time directly from their paycheck.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Unlike buy-now-pay-later services or store credit cards, BenefitsMe charges
              no interest and no hidden fees. Employees know exactly what they will pay
              before they order, and payments are handled automatically through payroll
              deduction so there are no bills to track and no risk of late fees.
            </p>
              <p className="text-gray-600 leading-relaxed">
              For employers with 200 or more employees, BenefitsMe is a zero-cost benefit that adds real value to your
              compensation package. In a competitive labor market, offering a program that
              gives employees access to products they need without the burden of high-interest
              debt is a meaningful differentiator for recruitment and retention.
            </p>
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
              Why Employers Choose BenefitsMe
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

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-3">PRODUCT CATALOG</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Thousands of Brand-Name Products Across Every Category
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                BenefitsMe offers a wide selection of popular merchandise from brands
                employees already know and trust. From electronics and appliances to
                furniture and home goods, employees can shop the products they want and
                pay for them over time through their paycheck.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Popular brands available through BenefitsMe include Beats by Dr. Dre,
                Apple AirPods, Nintendo Switch, HP Laptops, and many more.
              </p>

            </div>

            <div className="space-y-3">
              <p
                className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Available Product Categories
              </p>
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50 transition-colors"
                >
                  <CheckCircle2 size={18} className="flex-shrink-0" style={{ color: "#22c55e" }} />
                  <span className="text-gray-700 text-sm font-medium">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">HOW IT WORKS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Simple for Employers. Easy for Employees.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < 3 && (
                  <div
                    className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px"
                    style={{ backgroundColor: "#e2e8f0" }}
                  />
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  <span
                    className="text-xl font-black"
                    style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
                Request an Introduction to BenefitsMe
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Interested in offering BenefitsMe as an employee benefit at your organization?
                Fill out the form and the SaffHire team will connect you directly with the
                BenefitsMe team to get you started.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: DollarSign, text: "Zero cost to employers to enroll" },
                  { icon: Users, text: "Available for companies with 200 or more employees" },
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
                    The SaffHire team will reach out to connect you with BenefitsMe within
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
                    <label className={labelClass}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
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
                      <option value="">Select a range</option>
                      {employeeCountOptions.map((opt) => (
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
                      placeholder="Tell us a bit about your organization or any questions you have..."
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
                    your interest in BenefitsMe.
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
