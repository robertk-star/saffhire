import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  CheckCircle,
  Monitor,
  Shield,
  Cloud,
  Printer,
  Phone,
  Settings,
  ArrowRight,
  Users,
  Clock,
  Star,
  Building2,
} from "lucide-react";

const NOVATECH_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/novatech-logo_3fbfe67d.png";

const services = [
  {
    icon: Monitor,
    title: "Managed IT Services",
    description:
      "24/7 monitoring and management, remote helpdesk, network consulting, and installation services. One point of contact for all your business technology needs.",
  },
  {
    icon: Shield,
    title: "Managed Cybersecurity",
    description:
      "Managed detection and response, managed firewall, Zero Trust architecture, SASE, and user awareness training to protect your business from evolving threats.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Microsoft 365, Microsoft Azure, collaboration tools, video conferencing, and document workflow solutions to keep your team connected and productive.",
  },
  {
    icon: Printer,
    title: "Copiers and Printers",
    description:
      "Full line of copiers, printers, and managed print services from Canon, Sharp, Konica Minolta, HP, and Xerox. Production print and wide format solutions available.",
  },
  {
    icon: Phone,
    title: "Voice and Video Collaboration",
    description:
      "NovaVoice unified communications, video conferencing, and collaboration platforms to modernize how your team communicates internally and with clients.",
  },
  {
    icon: Settings,
    title: "Professional Services",
    description:
      "IT hardware and infrastructure, document software solutions, print management, content management, and production print automation tailored to your workflows.",
  },
];

const stats = [
  { value: "1", label: "Point of Contact", sub: "For All Tech Needs" },
  { value: "24/7", label: "Technical Support", sub: "365 Days a Year" },
  { value: "19s", label: "Avg Wait Time", sub: "Call Center Response" },
  { value: "99.99%", label: "Data Center Uptime", sub: "Reliability Guaranteed" },
];

const compliance = [
  "NIST Cybersecurity Framework alignment",
  "HIPAA-compliant IT infrastructure support",
  "SOC 2 readiness guidance",
  "Zero Trust security architecture",
  "SASE (Secure Access Service Edge) implementation",
  "User awareness and phishing training",
  "Managed detection and response (MDR)",
  "Managed firewall and endpoint protection",
];

const roles = [
  "Small Businesses",
  "Mid-Size Companies",
  "Healthcare Organizations",
  "Legal Firms",
  "Financial Services",
  "Manufacturing",
  "Education",
  "Government Entities",
  "Non-Profits",
  "Retail Operations",
  "Professional Services",
  "Remote Workforces",
];

const steps = [
  {
    number: "01",
    title: "Submit Your Introduction Request",
    description:
      "Fill out the form below with your company details and technology challenges. SaffHire will connect you directly with the NovaTech team.",
  },
  {
    number: "02",
    title: "Discovery Consultation",
    description:
      "NovaTech's team will schedule a no-obligation consultation to assess your current IT environment, pain points, and business goals.",
  },
  {
    number: "03",
    title: "Custom Technology Roadmap",
    description:
      "Receive a tailored managed office proposal covering IT, cybersecurity, cloud, and print solutions with transparent pricing.",
  },
  {
    number: "04",
    title: "Seamless Onboarding",
    description:
      "NovaTech handles the full transition with minimal disruption. Ongoing 24/7 support ensures your technology keeps pace with your business.",
  },
];

export default function NovaTechPage() {
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

  const submitLead = trpc.referral.submitLead.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      partnerSlug: "novatech",
      partnerName: "NovaTech",
      ...form,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/novatech" title="NovaTech Referral Partner" description="SaffHire and NovaTech partnership. Background screening solutions for NovaTech clients." />

      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a1628] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <a href="/referral-partners" className="text-gray-400 hover:text-white text-sm transition-colors">
              Referral Partners
            </a>
            <span className="text-gray-600">/</span>
            <span className="text-white text-sm">NovaTech</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-xl p-5 inline-block mb-6 shadow-lg">
                <img
                  src={NOVATECH_LOGO}
                  alt="NovaTech"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
                Managed IT Services Partner
              </p>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                Bring Everything Up to Speed
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                NovaTech is a full-service managed office technology provider delivering IT support, cybersecurity, cloud solutions, and print management. One partner, one point of contact, and 24/7 support for everything your business needs to run.
              </p>
              <a
                href="#intro-form"
                className="inline-flex items-center gap-2 bg-[#39b54a] hover:bg-[#2ea03e] text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Request an Introduction <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-[#39b54a] mb-1">{stat.value}</div>
                  <div className="text-white font-semibold text-sm">{stat.label}</div>
                  <div className="text-gray-400 text-xs mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
                About NovaTech
              </p>
              <h2 className="text-3xl font-extrabold text-[#0a1628] mb-5">
                The Managed Office Technology Leader
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                NovaTech is one of the largest managed office technology providers in the United States, serving thousands of businesses across multiple states. They combine managed IT services, cybersecurity, cloud solutions, and print management under a single, accountable partner relationship.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Their "Managed Office" approach eliminates the complexity of managing multiple vendors. Whether your team needs a printer serviced, a security incident resolved, or a cloud migration planned, NovaTech handles it all with a single call and a 19-second average wait time.
              </p>
              <p className="text-gray-600 leading-relaxed">
                SaffHire partners with NovaTech to help our clients access enterprise-grade technology services at a scale that fits any business size. If your organization is looking to modernize its IT infrastructure, strengthen cybersecurity, or streamline document workflows, NovaTech is the right partner.
              </p>
            </div>
            <div className="bg-[#f8f9fa] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#0a1628] mb-6">Why Businesses Choose NovaTech</h3>
              <ul className="space-y-4">
                {[
                  "Single point of contact for all technology needs",
                  "24/7/365 technical support with fast response times",
                  "Localized, customized, and scalable service delivery",
                  "Nationwide coverage with local expertise",
                  "Long-standing partnerships with top technology vendors",
                  "Proactive monitoring before problems impact your business",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#39b54a] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
              Services
            </p>
            <h2 className="text-3xl font-extrabold text-[#0a1628]">
              A Complete Technology Partnership
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              NovaTech covers every layer of your business technology so you can focus on growth, not IT headaches.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#0a1628] rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#39b54a]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity Compliance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
                Security and Compliance
              </p>
              <h2 className="text-3xl font-extrabold text-[#0a1628] mb-5">
                Enterprise-Grade Security for Every Business
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                NovaTech's cybersecurity practice is built around proactive threat detection, Zero Trust architecture, and compliance-ready frameworks. Their managed security services help businesses of all sizes meet industry standards without building an in-house security team.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {compliance.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#f8f9fa] rounded-lg px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-[#39b54a] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who They Serve */}
            <div>
              <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
                Who They Serve
              </p>
              <h2 className="text-3xl font-extrabold text-[#0a1628] mb-5">
                Built for Businesses of All Sizes
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                NovaTech's services are localized, customized, and scalable, whether you are a 10-person office or a 1,000-person enterprise. Their team adapts to your environment, not the other way around.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#f8f9fa] rounded-lg px-3 py-2">
                    <Building2 className="w-4 h-4 text-[#39b54a] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl font-extrabold text-white">
              Getting Connected with NovaTech
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-extrabold text-white/10 mb-3">{step.number}</div>
                <div className="w-10 h-1 bg-[#39b54a] mb-4 rounded-full" />
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-3 w-5 h-5 text-[#39b54a]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Form */}
      <section id="intro-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">
              Get Connected
            </p>
            <h2 className="text-3xl font-extrabold text-[#0a1628] mb-3">
              Request an Introduction to NovaTech
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Fill out the form below and SaffHire will personally connect you with the NovaTech team for a no-obligation technology consultation.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#f0fdf4] border border-[#39b54a] rounded-2xl p-10 text-center">
              <CheckCircle className="w-14 h-14 text-[#39b54a] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#0a1628] mb-2">Introduction Request Sent!</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Thank you! SaffHire will review your request and personally introduce you to the NovaTech team within one business day.
              </p>
              <a href="/referral-partners" className="inline-block mt-6 text-[#39b54a] font-semibold hover:underline">
                View All Referral Partners
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#f8f9fa] rounded-2xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">First Name *</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white"
                    placeholder="Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Number of Employees</label>
                  <select
                    value={form.employeeCount}
                    onChange={e => setForm(f => ({ ...f, employeeCount: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1 to 10</option>
                    <option value="11-50">11 to 50</option>
                    <option value="51-200">51 to 200</option>
                    <option value="201-500">201 to 500</option>
                    <option value="501-1000">501 to 1,000</option>
                    <option value="1000+">1,000+</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                  What technology challenges are you facing? (Optional)
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#39b54a] bg-white resize-none"
                  placeholder="Tell us about your current IT setup, pain points, or what you are looking to improve..."
                />
              </div>
              <button
                type="submit"
                disabled={submitLead.isPending}
                className="w-full bg-[#39b54a] hover:bg-[#2ea03e] disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-colors text-lg flex items-center justify-center gap-2"
              >
                {submitLead.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    Request Introduction to NovaTech <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                SaffHire will personally review your request and facilitate the introduction. Your information is never shared without your consent.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="w-10 h-10 text-[#39b54a] mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Pair Secure Hiring with Secure Technology
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            SaffHire handles your background screening. NovaTech handles your IT. Together, we help you build a safer, more efficient business from the ground up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#intro-form"
              className="inline-flex items-center justify-center gap-2 bg-[#39b54a] hover:bg-[#2ea03e] text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Connect with NovaTech <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#0a1628] font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Get a SaffHire Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
