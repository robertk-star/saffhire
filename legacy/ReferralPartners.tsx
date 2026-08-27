/*
 * Referral Partners Page - SaffHire Background Screening
 * Route: /referral-partners
 * 2026-08-27: Partner logos moved from broken Manus CDN to local public/images
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, HandshakeIcon } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const BENEFITSME_LOGO = "/images/partner-benefitsme.png";
const WORKSHIELD_LOGO = "/images/partner-workshield.png";
const GMGSAVINGS_LOGO = "/images/partner-gmg-savings.png";
const NOVATECH_LOGO = "/images/partner-novatech.png";
const DEFENSEBYDESIGN_LOGO = "/images/partner-defense-by-design.png";
const SANDENE_LOGO = "/images/partner-sandene.png";
const FYNN_LOGO = "/images/partner-fynn.png";
const STAFFING_FOR_HEALTHCARE_LOGO = "/images/partner-staffing-for-healthcare.png";
const LEVELC_SOLUTIONS_LOGO = "/images/partner-levelc-solutions.png";
const HOORAY_HEALTH_LOGO = "/images/partner-hooray-health.png";

const partners = [
  {
    name: "BenefitsMe",
    slug: "benefitsme",
    tagline: "Employer-Sponsored Purchasing Assistance Program",
    description:
      "BenefitsMe is an employer-sponsored purchasing assistance program that gives employees instant access to thousands of brand-name products, paid over time through convenient payroll deduction. No credit check required, no interest, and no hidden fees. Available for companies with 200 or more employees.",
    logo: BENEFITSME_LOGO,
    category: "Employee Benefits",
    logoInvert: false,
  },
  {
    name: "Work Shield",
    slug: "workshield",
    tagline: "Workplace Misconduct Solution",
    description:
      "Work Shield delivers technology-driven, human-led workplace misconduct resolution. Unbiased third-party investigations, faster resolutions, and stronger compliance so your HR team can focus on the business, not the fallout.",
    logo: WORKSHIELD_LOGO,
    category: "Workplace Compliance",
    logoInvert: false,
  },
  {
    name: "GMG Savings",
    slug: "gmg-savings",
    tagline: "Your Growth Is Our Business",
    description:
      "Growth Management Group (GMG) helps small and mid-sized companies grow smarter through tax strategy, AI-driven automation, and operational advisory. For over 23 years, GMG has partnered with 200,000+ businesses and captured over $37 billion in value.",
    logo: GMGSAVINGS_LOGO,
    category: "Business Growth",
    logoInvert: false,
  },
  {
    name: "NovaTech",
    slug: "novatech",
    tagline: "Bring Everything Up to Speed",
    description:
      "NovaTech is a full-service managed office technology provider delivering IT support, cybersecurity, cloud solutions, and print management. One partner, one point of contact, and 24/7 support for everything your business needs to run.",
    logo: NOVATECH_LOGO,
    category: "Managed IT Services",
    logoInvert: false,
  },
  {
    name: "Defense By Design",
    slug: "defense-by-design",
    tagline: "Predict. Prevent. Protect.",
    description:
      "Defense By Design helps organizations turn foresight into 20/20 safety through engaging workplace safety training, conference keynotes, and client value-add events. Led by Jeff McKissack, programs teach employees to spot trouble before it spots them.",
    logo: DEFENSEBYDESIGN_LOGO,
    category: "Workplace Safety Training",
    logoInvert: false,
  },
  {
    name: "Sandene Strategies",
    slug: "sandene-strategies",
    tagline: "Your Future Is Now. Let's Get to Work!",
    description:
      "Sandene Strategies is a comprehensive financial planning firm serving entrepreneurs, executives, and wealth builders. Their proprietary Your 360 Future Blueprint process looks at the entirety of your finances and your life, creating a plan built around what matters most to you.",
    logo: SANDENE_LOGO,
    category: "Financial Planning",
    logoInvert: false,
  },
  {
    name: "Fynn",
    slug: "fynn",
    tagline: "AI-Driven EHR for Senior Living",
    description:
      "Fynn is an intelligent electronic health record platform built by operators for Assisted Living and Memory Care facilities. It unites clinical, operational, and family engagement tools to streamline operations, enhance care quality, and strengthen relationships with residents and families.",
    logo: FYNN_LOGO,
    category: "Healthcare Technology",
    logoInvert: false,
  },
  {
    name: "Staffing for Healthcare",
    slug: "staffing-for-healthcare",
    tagline: "We Keep You Smiling!",
    description:
      "Staffing for Healthcare helps healthcare business owners solve their people problems to facilitate strategic growth and profitability. With specialty recruiting, flexible staffing, and back-office solutions across Medical Facilities, Dentistry, Behavioral Health, and Vision segments.",
    logo: STAFFING_FOR_HEALTHCARE_LOGO,
    category: "Healthcare Staffing",
    logoInvert: false,
  },
  {
    name: "Level-C Solutions",
    slug: "level-c-solutions",
    tagline: "Helping Business Owners Solve Their People Problems",
    description:
      "Level-C Solutions guides business owners and leaders with P&L responsibility on growing their business and improving profitability. With 30+ years of expertise in recruiting, staffing, and business consulting, we help solve difficult people-problems and overcome challenging business issues.",
    logo: LEVELC_SOLUTIONS_LOGO,
    category: "Business Consulting",
    logoInvert: false,
  },
  {
    name: "Hooray Health",
    slug: "hooray-health",
    tagline: "Affordable Healthcare for Hourly Employees",
    description:
      "Hooray Health provides guaranteed-issue healthcare plans designed for businesses with hourly, part-time, and full-time employees. With $25 urgent care visits, $0 virtual primary care, and an industry-leading NPS of 86, Hooray Health helps employers attract and retain talent while meeting ACA compliance requirements.",
    logo: HOORAY_HEALTH_LOGO,
    category: "Healthcare Benefits",
    logoInvert: false,
  },
];

export default function ReferralPartners() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners" title="Referral Partner Program" description="Partner with SaffHire Background Screening and earn referral commissions. Help your clients hire smarter with fast, FCRA-compliant background checks. Frisco TX." />

      <Navbar />

      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
            style={{
              backgroundColor: "rgba(34,197,94,0.15)",
              color: "#22c55e",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <HandshakeIcon size={14} />
            TRUSTED PARTNERS
          </div>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Refer Clients to SaffHire and Earn
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            SaffHire partners with trusted businesses that share our commitment to supporting
            employers and their teams. Explore our network of referral partners and discover
            services that complement your workforce strategy.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <div
                  className="flex items-center justify-center p-8 border-b border-gray-100"
                  style={{ backgroundColor: "#f8fafc", minHeight: 140 }}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-20 max-w-full object-contain"
                    style={(partner as any).logoInvert ? { filter: "brightness(0) saturate(100%)" } : undefined}
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "#f0fdf4",
                      color: "#16a34a",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {partner.category}
                  </span>
                  <h2
                    className="text-xl font-black text-gray-900 mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {partner.name}
                  </h2>
                  <p className="text-sm font-semibold mb-4" style={{ color: "#22c55e" }}>
                    {partner.tagline}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {partner.description}
                  </p>

                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                    <a
                      href={`/referral-partners/${partner.slug}`}
                      className="btn-green inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold text-sm flex-1 justify-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Learn More <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-10 text-center"
              style={{ minHeight: 340 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <HandshakeIcon size={24} style={{ color: "#22c55e" }} />
              </div>
              <p
                className="font-bold text-gray-400 mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                More Partners Coming Soon
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                We are continually expanding our network of trusted referral partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl lg:text-3xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Interested in Becoming a Referral Partner?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            If your business serves employers and their teams, we would love to explore a
            partnership. Reach out to the SaffHire team to learn more about our referral
            partner program.
          </p>
          <a
            href="/#contact"
            className="btn-green inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Contact Us <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
