/*
 * Defense By Design Partner Page - SaffHire Background Screening
 * Route: /referral-partners/defense-by-design
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
  Users,
  Zap,
  Send,
  Loader2,
  Phone,
  FileText,
  Eye,
  BookOpen,
  Building2,
  Mic,
} from "lucide-react";

const DEFENSEBYDESIGN_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/defensebydesign-logo-nav_8b4f9659.webp";

const features = [
  {
    icon: Eye,
    title: "Spot Trouble Before It Spots You",
    description:
      "Jeff McKissack's signature program teaches employees and leaders how to recognize pre-incident indicators of violence, exploitation, and workplace threats before they escalate.",
  },
  {
    icon: Mic,
    title: "Conference and Convention Events",
    description:
      "Engaging keynotes, breakouts, and workshops tailored to your conference or convention audience, covering personal and professional safety and security topics across any industry.",
  },
  {
    icon: Building2,
    title: "Employee Training Events",
    description:
      "Highly customized onsite training programs for office and field-based teams, including critical due diligence documentation for risk management and legal defensibility.",
  },
  {
    icon: Users,
    title: "Client Value-Add Events",
    description:
      "Differentiate your business by co-hosting safety and security events for your clients. Defense By Design offers programs for both personal and commercial client audiences.",
  },
  {
    icon: BookOpen,
    title: "Continuing Education Credits",
    description:
      "Programs are available with CME, CNE, CPE, HRCI, SHRM, CLE, and other professional continuing education credits, depending on the industry and audience.",
  },
  {
    icon: Shield,
    title: "Due Diligence Documentation",
    description:
      "Every employee training program includes documentation of key risk management points, giving organizations a clear paper trail of their safety and security due diligence efforts.",
  },
];

const industries = [
  "Insurance",
  "Legal",
  "Medical and Healthcare",
  "Financial Services",
  "Educational Institutions",
  "Multi-Tenant Property Management",
  "Professional Associations",
  "Houses of Worship",
  "Restaurant and Franchise Groups",
  "Multi-Family Property Management",
];

const howItWorks = [
  {
    step: "01",
    title: "Book an Event",
    description:
      "Contact Defense By Design to discuss your conference, employee training, or client value-add event. Jeff works with you to tailor the program to your audience and objectives.",
  },
  {
    step: "02",
    title: "Customized Program Design",
    description:
      "Jeff develops a customized presentation or training program based on your industry, audience size, event format, and specific safety and security concerns.",
  },
  {
    step: "03",
    title: "Engaging Delivery",
    description:
      "Jeff delivers the program in person, covering threat recognition, prevention strategies, and practical personal and professional safety skills your audience can apply immediately.",
  },
  {
    step: "04",
    title: "Documentation and Follow-Up",
    description:
      "Employee training events include due diligence documentation for risk management purposes. Jeff is also available for follow-up questions and future engagements.",
  },
];

export default function DefenseByDesignPage() {
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
      partnerSlug: "defense-by-design",
      partnerName: "Defense By Design",
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
      <PageSEO path="/referral-partners/defense-by-design" title="Defense by Design Referral Partner" description="SaffHire and Defense by Design partnership. Background screening services for Defense by Design clients." />

      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #7c3a00 100%)" }}
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
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm mb-10 font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <ArrowLeft size={16} />
            Back to Referral Partners
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
                style={{
                  backgroundColor: "rgba(249,115,22,0.1)",
                  color: "#f97316",
                  borderColor: "rgba(249,115,22,0.3)",
                }}
              >
                Referral Partner
              </div>
              <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-md">
                <img
                  src={DEFENSEBYDESIGN_LOGO}
                  alt="Defense By Design"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Defense By Design
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#f97316", fontFamily: "'Montserrat', sans-serif" }}
              >
                Predict. Prevent. Protect.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Defense By Design helps organizations turn foresight into 20/20 when it comes
                to preventing workplace violence and exploitation. Through engaging training
                events, keynotes, and customized programs, Jeff McKissack equips employees
                and leaders with the skills to spot trouble before it spots them.
              </p>
              <a
                href="#request-intro"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-orange-400 hover:text-orange-400 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction
              </a>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "20+", label: "Years of Experience" },
                { value: "100s", label: "Events Delivered" },
                { value: "10+", label: "Industries Served" },
                { value: "CE", label: "Credits Available" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 border border-white/10 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="text-3xl font-black mb-2"
                    style={{ color: "#f97316", fontFamily: "'Montserrat', sans-serif" }}
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
              <p className="section-label mb-3">ABOUT DEFENSE BY DESIGN</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Turn Foresight Into 20/20 Safety
              </h2>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-5">
                We have all heard the phrase "hindsight is 20/20," but what if we could
                develop the foresight to prevent violence and exploitation before it occurs?
                Defense By Design was founded on that belief, offering educational and
                training programs that teach individuals and organizations how to recognize
                and respond to threats in the workplace and in daily life.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Led by Jeff McKissack, Defense By Design brings a unique background in
                safety and security to every engagement. Jeff delivers programs for
                conferences and conventions, onsite employee training, continuing education
                events, and client value-add events across a wide range of industries,
                from insurance and legal to healthcare, financial services, and property
                management.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every program is tailored to the audience and designed to be immediately
                actionable. Attendees leave with practical skills, greater situational
                awareness, and the confidence to protect themselves and the people around
                them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">WHAT THEY OFFER</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Programs and Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "#fff7ed" }}
                  >
                    <Icon size={22} style={{ color: "#f97316" }} />
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

      {/* Industries Served */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">INDUSTRIES SERVED</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Programs for Every Industry
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Defense By Design serves a wide range of industries, tailoring every
                program to the specific risks, audiences, and objectives of each sector.
                Whether your team works in an office, in the field, or in a client-facing
                environment, there is a program designed for your needs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industries.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: "#f97316" }} className="flex-shrink-0" />
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
                  style={{ backgroundColor: "#fff7ed" }}
                >
                  <Shield size={20} style={{ color: "#f97316" }} />
                </div>
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Why Workplace Safety Training Matters
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Proactive Prevention",
                    desc: "Most workplace incidents have pre-incident indicators. Training employees to recognize these signs can stop threats before they materialize.",
                  },
                  {
                    title: "Legal and Liability Protection",
                    desc: "Documented safety training demonstrates due diligence and can reduce organizational liability in the event of a workplace incident.",
                  },
                  {
                    title: "Employee Confidence",
                    desc: "Employees who feel equipped to handle safety concerns are more confident, more engaged, and more likely to report concerns early.",
                  },
                  {
                    title: "Client and Community Trust",
                    desc: "Hosting safety events for clients and the community builds trust, strengthens relationships, and differentiates your organization.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "#f97316" }}
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
              How Defense By Design Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-0.5 z-0"
                    style={{ backgroundColor: "#fed7aa", width: "calc(100% - 2rem)" }}
                  />
                )}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative z-10">
                  <div
                    className="text-3xl font-black mb-4"
                    style={{ color: "#f97316", fontFamily: "'Montserrat', sans-serif" }}
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
                Request an Introduction to Defense By Design
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Interested in bringing a Defense By Design program to your conference,
                company, or client event? Fill out the form and the SaffHire team will
                connect you directly with Jeff McKissack to discuss your needs.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: FileText, text: "No obligation, no pressure" },
                  { icon: Users, text: "Programs available for groups of all sizes" },
                  { icon: CheckCircle2, text: "Free consultation to discuss your event" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#fff7ed" }}
                      >
                        <Icon size={16} style={{ color: "#f97316" }} />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-5 rounded-xl border border-orange-100" style={{ backgroundColor: "#fff7ed" }}>
                <p className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Visit Defense By Design
                </p>
                <a
                  href="https://www.defensebydesign.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#f97316" }}
                >
                  www.defensebydesign.com
                </a>
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
                    style={{ backgroundColor: "#fff7ed" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#f97316" }} />
                  </div>
                  <h3
                    className="text-xl font-black text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Request Received!
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    The SaffHire team will reach out to connect you with Defense By Design
                    within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold underline"
                    style={{ color: "#f97316" }}
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
                    Tell Us About Your Event
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          borderColor: errors.firstName ? "#ef4444" : "#e5e7eb",
                        }}
                        placeholder="Jane"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                        style={{ borderColor: errors.lastName ? "#ef4444" : "#e5e7eb" }}
                        placeholder="Smith"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                      style={{ borderColor: errors.email ? "#ef4444" : "#e5e7eb" }}
                      placeholder="jane@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                      style={{ borderColor: errors.company ? "#ef4444" : "#e5e7eb" }}
                      placeholder="Acme Corp"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Event Type
                    </label>
                    <select
                      name="employeeCount"
                      value={form.employeeCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 transition-colors bg-white"
                    >
                      <option value="">Select event type</option>
                      <option value="conference">Conference or Convention</option>
                      <option value="employee-training">Employee Training</option>
                      <option value="client-value-add">Client Value-Add Event</option>
                      <option value="continuing-education">Continuing Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Tell Us About Your Event
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 transition-colors resize-none"
                      placeholder="Describe your event, audience size, and any specific topics you would like covered..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white text-sm transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: "#f97316", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {submitLead.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Request Introduction
                      </>
                    )}
                  </button>

                  {submitLead.isError && (
                    <p className="text-red-500 text-xs text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
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
