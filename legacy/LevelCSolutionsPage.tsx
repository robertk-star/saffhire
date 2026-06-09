/*
 * Level-C Solutions Referral Partner Page
 * Showcases Level-C Solutions as a complementary partner for business consulting and staffing solutions
 * Route: /referral-partners/level-c-solutions
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
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Shield,
  Send,
  Loader2,
} from "lucide-react";

const LEVELC_SOLUTIONS_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/levelc_solutions_logo_9d966f6e.webp";

const features = [
  {
    icon: TrendingUp,
    title: "Business Growth Consulting",
    description:
      "30+ years of expertise helping business owners build top-line sales revenues, design cost-effective staffing solutions, and improve bottom-line profits. We guide leaders with P&L responsibility through strategic growth initiatives.",
  },
  {
    icon: Users,
    title: "Recruiting & Staffing Solutions",
    description:
      "Access to multiple recruiting and staffing options tailored to your needs. Whether you need temporary coverage or permanent placements, we have the right tools to engage talent at the time you need it.",
  },
  {
    icon: Zap,
    title: "Back Office & Employer of Record Solutions",
    description:
      "Partner with Signature Back Office Solutions to handle payroll, benefits, compliance, and HR administration. We work with over 400 staffing firms and process thousands of W-2s and 1099s annually.",
  },
  {
    icon: Shield,
    title: "Owner's Advocate Approach",
    description:
      "We look at your business from your side of the table. With an owner's advocate viewpoint, we help improve company performance, realign responsibilities, and focus your team on what they do best.",
  },
];

const industriesServed = [
  "Recruiting & Staffing",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Energy",
  "Banking",
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  message: "",
};

const industryOptions = [
  "Recruiting & Staffing",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Energy",
  "Banking",
  "Other",
];

export default function LevelCSolutionsPage() {
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
      partnerSlug: "level-c-solutions",
      partnerName: "Level-C Solutions",
      ...form,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-sm border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/level-c-solutions" title="Level-C Solutions Referral Partner" description="SaffHire and Level-C Solutions partnership. Business consulting and staffing solutions paired with thorough background screening." />

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
                Business Consulting
              </span>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Level-C Solutions
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                Helping Business Owners Solve Their People Problems
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Level-C Solutions guides business owners and leaders with P&L responsibility on growing their business and improving profitability. With 30+ years of expertise in recruiting, staffing, and business consulting, we help solve difficult people-problems and overcome challenging business issues that may be hindering your growth.
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
                  src={LEVELC_SOLUTIONS_LOGO}
                  alt="Level-C Solutions logo"
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
            <p className="section-label mb-3">ABOUT LEVEL-C SOLUTIONS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Your Partner in Business Growth & Profitability
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Founded in 2009 by Brad Stevens, Level-C Solutions was built on a simple principle: business owners need advocates who understand their challenges from the inside. Brad brings over 30 years of firsthand experience in the recruiting and staffing industry, combined with a passion for helping business owners find their success.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              We are quick learners, excellent problem solvers, and innovative thinkers. By working with and representing multiple recruiting, staffing, and human capital options, we have the right tools available to engage the talent and solutions you need at the time you need it. When paired with thorough background screening from SaffHire, you gain a comprehensive foundation for safe, compliant, and efficient business operations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We look at your business from your side of the table. With an owner's advocate viewpoint, we step you through the process of improving your company's performance. As we learn your leadership team's strengths, there may be some realignment of responsibilities which can positively impact your organization's bottom line.
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
              What We Deliver
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

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">EXPERTISE</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Industries We Serve
            </h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              We specialize in helping businesses across multiple industries solve their people problems and achieve strategic growth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industriesServed.map((industry) => (
              <div
                key={industry}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition text-center"
              >
                <h3
                  className="text-base font-bold text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {industry}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request an Introduction Form */}
      <section id="request-intro" className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <div>
              <p className="section-label mb-3">GET CONNECTED</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction to Level-C Solutions
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ready to solve your people problems and drive business growth? Fill out the form and the SaffHire team will connect you directly with the Level-C Solutions team to discuss how we can help your business.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: Users, text: "30+ years of business growth and consulting expertise" },
                  { icon: TrendingUp, text: "Proven track record helping companies improve profitability" },
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
              style={{ backgroundColor: "#ffffff" }}
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
                    The SaffHire team will reach out to connect you with Level-C Solutions within 1 business day.
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

                  <div>
                    <label className={labelClass}>Work Email *</label>
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

                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Industry</label>
                    <select
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select an industry</option>
                      {industryOptions.map((opt) => (
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
                      placeholder="Tell us about your business challenges or any questions you have..."
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
                    your interest in Level-C Solutions.
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
