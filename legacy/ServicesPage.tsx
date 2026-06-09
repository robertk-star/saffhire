/*
 * ServicesPage - Standalone /services route
 * Renders the full services and industries content so Google can index it.
 * Previously only accessible as /#services (hash anchor on the homepage).
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustriesSection from "@/components/IndustriesSection";
import PageSEO from "@/components/PageSEO";
import { Link } from "wouter";

const services = [
  {
    title: "Criminal Background Checks",
    href: "/criminal-background-checks",
    description:
      "FCRA-compliant county, state, and federal criminal record searches. Fast, accurate results for every industry.",
    icon: "🔍",
  },
  {
    title: "Employment Verification",
    href: "/employment-verification",
    description:
      "Confirm work history, dates of employment, job titles, and eligibility for rehire with precision.",
    icon: "✅",
  },
  {
    title: "Education Verification",
    href: "/education-verification",
    description:
      "Verify degrees, diplomas, and certifications to protect your organization from credential fraud.",
    icon: "🎓",
  },
  {
    title: "Drug Screening",
    href: "/drug-screening",
    description:
      "DOT-compliant and non-DOT drug panels for pre-employment and ongoing workforce screening.",
    icon: "🧪",
  },
  {
    title: "MVR / Driving Records",
    href: "/mvr-checks",
    description:
      "Instant Motor Vehicle Record checks for any role requiring a valid driver's license.",
    icon: "🚗",
  },
  {
    title: "FCRA Compliance News",
    href: "/fcra-news",
    description:
      "Stay current with the latest background check law updates, EEOC guidance, and compliance news.",
    icon: "📋",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/services"
        title="Background Screening Services"
        description="Explore SaffHire's full suite of background screening services: criminal checks, employment verification, drug screening, MVR checks, education verification, and FCRA compliance news."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            OUR SERVICES
          </p>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Comprehensive Background Screening Solutions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Fast, FCRA-compliant background screening services built for businesses of every size
            and industry. Results in as little as 5 minutes.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">WHAT WE OFFER</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Everything You Need to Hire with Confidence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Each service is designed to integrate seamlessly with your existing hiring workflow,
              with no setup fees and no minimums.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <div className="group border border-gray-200 rounded-lg p-8 hover:shadow-lg hover:border-green-400 transition-all duration-200 cursor-pointer h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <p className="mt-4 text-green-600 font-semibold text-sm">
                    Learn more →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section reused from homepage */}
      <IndustriesSection />

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            No setup fees, no minimums. Get a custom quote tailored to your business in minutes.
          </p>
          <a
            href="/contact"
            className="btn-green rounded-sm px-10 py-4 text-base font-bold inline-block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
