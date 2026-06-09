/*
 * IndustriesSection Component SaffHire Background Screening
 * Design: 3-column card grid with image overlays and hover effects
 * 8 industries: Healthcare, Staffing, Transportation, Manufacturing, Hospitality, Energy, Education, Churches/Non-Profit
 */

import { ArrowRight } from "lucide-react";

const industries = [
  {
    name: "Healthcare",
    description: "Comprehensive screening solutions for healthcare providers and medical facilities.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/healthcare-doctor-nTFoqwwszBNffvezvpUdxY.webp",
    href: "/industries/healthcare",
  },
  {
    name: "Staffing",
    href: "/industries/staffing",
    description: "Streamlined background checks to help staffing agencies place candidates faster.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/staffing-recruiting-HQ8peYmxmBwDN6V8FFHabf.webp",
  },
  {
    name: "Transportation",
    href: "/industries/transportation",
    description: "DOT-compliant screening for drivers and transportation professionals.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/transportation-trucking-e5XVJsb3NqKq7bBzpvWYdp.webp",
  },
  {
    name: "Manufacturing / Warehousing",
    href: "/industries/manufacturing",
    description: "Reliable screening for warehouse, logistics, and manufacturing roles.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/manufacturing-warehouse-MRbE6ngTRYM7etAtYgJE2K.webp",
  },
  {
    name: "Hospitality",
    href: "/industries/hospitality",
    description: "Protect your guests and staff with thorough hospitality industry checks.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/hospitality-hotel-hPwjFumDVuE53coRNdmCA5.webp",
  },
  {
    name: "Energy",
    href: "/industries/energy",
    description: "Safety-first screening for energy sector workers and contractors.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/energy-worker-6uXbGGHeWEWGLof37q9FAz.webp",
  },
  {
    name: "Education",
    href: "/industries/education",
    description: "Protect students and staff with thorough educator background checks.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/education-teacher-ZXUK3NiRcgkPtpdCJ6LBUf.webp",
  },
  {
    name: "Churches / Non-Profit",
    href: "/industries/church-nonprofit",
    description: "Affordable screening solutions for faith-based and non-profit organizations.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/church-nonprofit-i472wLXW7cpcTt6sne5C2x.webp",
  },
];

export default function IndustriesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">INDUSTRIES</p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Serving Every Sector
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At SaffHire, we strive to make our services align with your needs. We view our clients as
            partners our motto is Win/Win. Tell us what you need and we'll make your applicant
            processing work exactly the way you want.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <a
              key={industry.name}
              href={(industry as any).href || "#contact"}
              className="industry-card group block"
            >
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full object-cover"
                style={{ height: 220 }}
              />
              <div className="overlay">
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {industry.name}
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed hidden group-hover:block transition-all">
                      {industry.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="arrow text-green-400 flex-shrink-0 ml-2 mb-1"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
