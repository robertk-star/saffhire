/*
 * Sandene Strategies Partner Page - SaffHire Background Screening
 * Route: /referral-partners/sandene-strategies
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import PageSEO from "@/components/PageSEO";

import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Send,
  Loader2,
  FileText,
  Target,
  Compass,
  BarChart3,
  Building2,
  Briefcase,
} from "lucide-react";

const SANDENE_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/sandene-strategies-logo_622c0e7d.webp";

// Sandene brand teal: #1a7a72 (from their site header)
const BRAND = "#0e6e66";
const BRAND_LIGHT = "rgba(14,110,102,0.1)";
const BRAND_BORDER = "rgba(14,110,102,0.3)";

const features = [
  {
    icon: Compass,
    title: "Your 360 Future Blueprint",
    description:
      "Sandene Strategies' proprietary planning process looks at the entirety of your finances and your life, tying every piece together into a comprehensive blueprint designed around your vision for the future.",
  },
  {
    icon: TrendingUp,
    title: "360 Asset Strategy",
    description:
      "A full evaluation of your personal balance sheet, assessing every significant asset and liability to ensure each one is still fulfilling its original purpose and contributing to your long-term wealth and happiness.",
  },
  {
    icon: Building2,
    title: "Closely-Held Business Planning",
    description:
      "For entrepreneurs, your business is your largest asset. Sandene Strategies collaborates with exit planning and valuation professionals to accurately incorporate your business into your personal financial plan.",
  },
  {
    icon: BarChart3,
    title: "Tax Integration",
    description:
      "Working alongside CPAs who stay current on tax law, Sandene Strategies integrates tax strategies directly into your financial plan, balancing current liabilities against potential future outcomes.",
  },
  {
    icon: Target,
    title: "Risk Management",
    description:
      "Their process identifies and assesses threats that could negatively affect your financial future, then works with insurance professionals to develop strategies that proactively protect your family and assets.",
  },
  {
    icon: FileText,
    title: "Estate and Legacy Planning",
    description:
      "The estate and legacy component illustrates how planning assumptions impact your finances during your lifetime and beyond, including strategies for asset distribution, trusts, charitable giving, and life insurance.",
  },
];

const whoTheyServe = [
  {
    audience: "Growth-Minded Entrepreneurs",
    description:
      "Many entrepreneurs lack a personal financial plan that incorporates their business plan. Sandene Strategies integrates both to give you a full perspective on growing your wealth to match your future needs.",
  },
  {
    audience: "Driven Executives and Professionals",
    description:
      "For those who have achieved financial security through a successful career, Sandene Strategies helps organize and structure your wealth for the future you have in mind, whether that means retirement or your next adventure.",
  },
  {
    audience: "Wealth Builders Ready to Plan",
    description:
      "For those who work hard and are ready to focus on building their wealth, Sandene Strategies creates a comprehensive plan that considers both your finances and your life plans, keeping you moving toward an empowered future.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Discover Your Goals",
    description:
      "The process begins with a deep conversation about your life's plans and your vision for the future. What matters most to you? What will your days look like? Where will you live? These questions shape everything that follows.",
  },
  {
    step: "02",
    title: "Build Your Blueprint",
    description:
      "Using the Your 360 Future Blueprint process, Sandene Strategies evaluates your full financial picture, including assets, liabilities, business interests, tax situation, estate plans, and risk exposures, to create a comprehensive plan.",
  },
  {
    step: "03",
    title: "Implement and Invest",
    description:
      "With your blueprint in hand, Sandene Strategies guides you through implementation, including investment strategy through their Smarter Planning, Smarter Investing approach, aligned with your goals and timeline.",
  },
  {
    step: "04",
    title: "Stay the Course Together",
    description:
      "Your plan evolves as your life does. Sandene Strategies stays by your side through every new beginning, adjusting your blueprint as goals are reached and new ones are set, keeping you on track toward growth, purpose, and fulfillment.",
  },
];

export default function SandeneStrategiesPage() {
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
      newErrors.email = "Valid email is required";
    if (!form.company.trim()) newErrors.company = "Company or occupation is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitLead.mutate({
      ...form,
      partnerSlug: "sandene-strategies",
      partnerName: "Sandene Strategies",
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
      <PageSEO path="/referral-partners/sandene-strategies" title="Sandene Strategies Referral Partner" description="SaffHire and Sandene Strategies partnership. Background screening solutions for Sandene Strategies clients." />

      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0a3d38 100%)" }}
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
            className="inline-flex items-center gap-2 text-gray-400 transition-colors text-sm mb-10 font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4dd9cf")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            <ArrowLeft size={16} />
            Back to Referral Partners
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
                style={{
                  backgroundColor: BRAND_LIGHT,
                  color: "#4dd9cf",
                  borderColor: BRAND_BORDER,
                }}
              >
                Referral Partner
              </div>
              <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-md">
                <img
                  src={SANDENE_LOGO}
                  alt="Sandene Strategies"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <h1
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Sandene Strategies
              </h1>
              <p
                className="text-lg font-semibold mb-5"
                style={{ color: "#4dd9cf", fontFamily: "'Montserrat', sans-serif" }}
              >
                Your Future Is Now. Let's Get to Work!
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                Sandene Strategies is a comprehensive financial planning firm serving
                entrepreneurs, executives, and wealth builders who are ready to design
                their next new beginning. Their proprietary Your 360 Future Blueprint
                process looks at the entirety of your finances and your life, creating a
                plan built around what matters most to you.
              </p>
              <a
                href="#request-intro"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4dd9cf";
                  e.currentTarget.style.color = "#4dd9cf";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "white";
                }}
              >
                Request an Introduction
              </a>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "360°", label: "Future Blueprint Process" },
                { value: "3", label: "Client Audiences Served" },
                { value: "6", label: "Planning Components" },
                { value: "0", label: "Minimums. No Pressure." },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 border border-white/10 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="text-3xl font-black mb-2"
                    style={{ color: "#4dd9cf", fontFamily: "'Montserrat', sans-serif" }}
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
              <p className="section-label mb-3">ABOUT SANDENE STRATEGIES</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Financial Planning Built Around Your Life
              </h2>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-5">
                Most financial planners focus on the money. Sandene Strategies starts with
                your life. Their planning process begins with a conversation about your
                vision for the future, your goals, your values, and what growth, purpose,
                and fulfillment look like for you specifically. Only then does the financial
                plan take shape around that vision.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Sandene Strategies serves high achievers who are approaching a new
                beginning, whether that means selling a business, transitioning from a
                corporate career, or simply deciding it is time to get serious about
                building wealth. Their clients are driven, goal-oriented people who expect
                the same intensity and commitment from their financial advisor that they
                bring to everything else in their lives.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Located in Addison, Texas, Sandene Strategies operates with no minimums,
                no pressure, and no judgment, only an obsessive focus on their clients'
                success. They uphold their fiduciary responsibilities in an advisory
                capacity and are guided by core values of integrity, excellence, diligence,
                generosity, and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who They Serve */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">WHO THEY SERVE</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Built for High Achievers
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sandene Strategies serves three distinct audiences, each at a different stage
              of their financial journey but united by a shared drive to build a future of
              growth, purpose, and fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoTheyServe.map((item) => (
              <div
                key={item.audience}
                className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                style={{ borderTopWidth: 3, borderTopColor: BRAND }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: BRAND_LIGHT }}
                >
                  <Briefcase size={22} style={{ color: BRAND }} />
                </div>
                <h3
                  className="font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.audience}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">THE BLUEPRINT COMPONENTS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Six Components. One Comprehensive Plan.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The Your 360 Future Blueprint process covers every dimension of your financial
              life, ensuring nothing is overlooked and every piece is connected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                  style={{ borderColor: "#e5e7eb" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9de8e3")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: BRAND_LIGHT }}
                  >
                    <Icon size={22} style={{ color: BRAND }} />
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

      {/* Core Values */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">HOW THEY OPERATE</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                No Pressure. No Judgment. No Minimums.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Sandene Strategies operates differently from most financial planning firms.
                There are no account minimums, no pressure to move quickly, and no judgment
                about where you are starting from. Their only focus is on your success.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                As a fiduciary, Sandene Strategies is legally and ethically obligated to
                act in your best interest at all times. This means their recommendations
                are driven entirely by what is right for you, not by commissions or
                product incentives.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Integrity",
                  "Excellence",
                  "Diligence",
                  "Generosity",
                  "Abundance",
                  "Discernment",
                  "Collaboration",
                  "Professionalism",
                ].map((value) => (
                  <div key={value} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: BRAND }} className="flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-8 border border-gray-100"
              style={{ backgroundColor: "#f0faf9" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: BRAND_LIGHT }}
                >
                  <Users size={20} style={{ color: BRAND }} />
                </div>
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  What Clients Are Saying
                </h3>
              </div>
              <blockquote className="text-gray-600 text-sm leading-relaxed italic mb-4 border-l-4 pl-4" style={{ borderColor: BRAND }}>
                "As an entrepreneur that experienced a few exits, it was critical that we
                worked with someone who could listen to us, guide us, and take care of
                part of our net worth. Jeff also understood when we invested in real estate
                that we wanted to diversify and manage on our own. It was very important
                to us that Jeff did not try to talk us out of these investments. As we move
                closer to retirement, Jeff is now transitioning with us as well. He treats
                us as partners vs. clients."
              </blockquote>
              <p className="text-gray-500 text-xs font-semibold">
                Dean F. - Technology Consultant
              </p>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                This statement is a testimonial by a client of the financial professional.
                The client has not been paid or received any compensation for making these
                statements. These views may not be representative of the views of other
                clients and are not indicative of future performance or success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">THE PROCESS</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How Sandene Strategies Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-0.5 z-0"
                    style={{ backgroundColor: "#b2e8e4", width: "calc(100% - 2rem)" }}
                  />
                )}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative z-10">
                  <div
                    className="text-3xl font-black mb-4"
                    style={{ color: BRAND, fontFamily: "'Montserrat', sans-serif" }}
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
      <section id="request-intro" className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <p className="section-label mb-3">GET CONNECTED</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Request an Introduction to Sandene Strategies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ready to start designing your future? Fill out the form and the SaffHire
                team will connect you directly with Sandene Strategies to schedule your
                first conversation.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Fast introduction, usually within 1 business day" },
                  { icon: FileText, text: "No obligation, no pressure, no minimums" },
                  { icon: Users, text: "Serving entrepreneurs, executives, and wealth builders" },
                  { icon: CheckCircle2, text: "Fiduciary advisor, always acting in your best interest" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: BRAND_LIGHT }}
                      >
                        <Icon size={16} style={{ color: BRAND }} />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-8 p-5 rounded-xl border"
                style={{ backgroundColor: "#f0faf9", borderColor: "#b2e8e4" }}
              >
                <p className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Sandene Strategies
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  15851 Dallas Parkway, Suite 400, Addison, TX 75001 | (972) 789-1201
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div
              className="rounded-2xl p-8 border border-gray-100 shadow-sm bg-white"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: BRAND_LIGHT }}
                  >
                    <CheckCircle2 size={32} style={{ color: BRAND }} />
                  </div>
                  <h3
                    className="text-xl font-black text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Request Received!
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    The SaffHire team will reach out to connect you with Sandene Strategies
                    within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold underline"
                    style={{ color: BRAND }}
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
                    Tell Us About Yourself
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
                        style={{ borderColor: errors.firstName ? "#ef4444" : "#e5e7eb" }}
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
                      Email *
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
                      Company / Occupation *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                      style={{ borderColor: errors.company ? "#ef4444" : "#e5e7eb" }}
                      placeholder="Acme Corp / Entrepreneur"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      I Am Best Described As
                    </label>
                    <select
                      name="employeeCount"
                      value={form.employeeCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 transition-colors bg-white"
                    >
                      <option value="">Select one</option>
                      <option value="entrepreneur">An Entrepreneur or Business Owner</option>
                      <option value="executive">An Executive or Senior Professional</option>
                      <option value="wealth-builder">A Wealth Builder Ready to Plan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      What Would You Like to Discuss?
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 transition-colors resize-none"
                      placeholder="Tell us a bit about your financial goals or what you are looking to accomplish..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white text-sm transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: BRAND, fontFamily: "'Montserrat', sans-serif" }}
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
