/*
 * Staffing for Healthcare Referral Partner Page
 * Showcases Staffing for Healthcare as a complementary partner for healthcare staffing solutions
 * Route: /referral-partners/staffing-for-healthcare
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
  Users,
  Zap,
  BarChart3,
  Shield,
  Send,
  Loader2,
} from "lucide-react";

const STAFFING_FOR_HEALTHCARE_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/staffing_for_healthcare_logo_5c1c3710.webp";

const features = [
  {
    icon: Users,
    title: "Specialty Healthcare Recruiting",
    description:
      "Access to specialty recruiters within Medical Facilities, Dentistry Services, Behavioral Health, and Vision segments. We connect you with the right quality talent you need to run your practice more effectively.",
  },
  {
    icon: Zap,
    title: "Flexible Staffing Solutions",
    description:
      "Multiple staffing options to meet your immediate and long-term needs. Whether you need temporary coverage or permanent placements, we have the resources available to engage talent at the time you need it.",
  },
  {
    icon: BarChart3,
    title: "Human Capital & Back-Office Solutions",
    description:
      "Beyond staffing, we provide PEO alternatives, Employer of Record solutions, and payroll support to handle the operational side of your business and improve profitability.",
  },
  {
    icon: Shield,
    title: "30+ Years of Ownership Experience",
    description:
      "We understand healthcare business challenges from the owner's perspective. Our team of quick learners and excellent problem solvers helps overcome difficult people-problems and business issues hindering your growth.",
  },
];

const healthcareSegments = [
  {
    title: "Medical Facilities",
    description: "Hospitals, surgical centers, and other medical facilities seeking qualified clinical and administrative staff.",
  },
  {
    title: "Dentistry Services",
    description: "Dentists, endodontists, oral surgery facilities, and dental practices needing specialized talent.",
  },
  {
    title: "Behavioral Health",
    description: "Psychologists, counselors, clinicians, social workers, therapists, and technicians for behavioral health organizations.",
  },
  {
    title: "Vision Services",
    description: "Optometrists, ophthalmologists, and vision care professionals for eye care practices.",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  healthcare_segment: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  healthcare_segment: "",
  message: "",
};

const healthcareSegmentOptions = [
  "Medical Facilities",
  "Dentistry Services",
  "Behavioral Health",
  "Vision Services",
  "Other",
];

export default function StaffingForHealthcarePage() {
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
      partnerSlug: "staffing-for-healthcare",
      partnerName: "Staffing for Healthcare",
      ...form,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-sm border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/staffing-for-healthcare" title="Staffing for Healthcare Referral Partner" description="SaffHire and Staffing for Healthcare partnership. Healthcare staffing solutions paired with thorough background screening." />

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
                Healthcare Staffing
              </span>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Staffing for Healthcare
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                We Keep You Smiling!
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Staffing for Healthcare helps healthcare business owners solve their people problems to facilitate strategic growth and profitability. With over 30 years of ownership experience, we understand the challenges healthcare leaders face and provide specialty recruiting, flexible staffing, and back-office solutions tailored to your needs.
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
                  src={STAFFING_FOR_HEALTHCARE_LOGO}
                  alt="Staffing for Healthcare logo"
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
            <p className="section-label mb-3">ABOUT STAFFING FOR HEALTHCARE</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Your Partner in Healthcare Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              As a division of Level-C Solutions, Staffing for Healthcare is designed to help owners and leaders run the business part of their practice better. We work with and represent specialty recruiters within each healthcare segment to ensure you find the right quality talent to run your business more effectively.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              We are quick learners, excellent problem solvers, and innovative thinkers. By working with multiple strategic service alliances, we have the right resources available to engage the talent and solutions you need at the time you need it. When paired with thorough background screening from SaffHire, you gain the complete foundation for safe, compliant, and efficient healthcare operations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With over 30 years of firsthand ownership experience running a business, we look at things from your side of the table. We help solve difficult people-problems and overcome challenging business issues that may be hindering the growth of your practice.
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

      {/* Healthcare Segments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3">EXPERTISE</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Healthcare Segments We Serve
            </h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              We specialize in connecting healthcare organizations with the talent they need across multiple segments, from medical facilities to behavioral health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthcareSegments.map((segment) => (
              <div
                key={segment.title}
                className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <h3
                  className="text-lg font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {segment.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{segment.description}</p>
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
                Request an Introduction to Staffing for Healthcare
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Looking to strengthen your healthcare staffing strategy and ensure thorough background screening? Fill out the form and the SaffHire team will connect you directly with the Staffing for Healthcare team to get you started.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: Users, text: "Specialty recruiters across all healthcare segments" },
                  { icon: Shield, text: "30+ years of healthcare ownership experience" },
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
                    The SaffHire team will reach out to connect you with Staffing for Healthcare within 1 business day.
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
                      placeholder="Healthcare Organization Name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Healthcare Segment</label>
                    <select
                      name="healthcare_segment"
                      value={form.healthcare_segment}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a healthcare segment</option>
                      {healthcareSegmentOptions.map((opt) => (
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
                      placeholder="Tell us about your organization or any questions you have..."
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
                    your interest in Staffing for Healthcare.
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
