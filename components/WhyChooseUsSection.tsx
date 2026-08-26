/*
 * WhyChooseUsSection Component SaffHire Background Screening
 * Design: Two-column layout, image left with "Since 2020" badge, feature list right
 * Bottom: Three quality badges
 * 2026-08-26: Replaced broken Manus CDN image with local asset
 */

import { CheckCircle2, Star, Zap } from "lucide-react";

const features = [
  "Core platform communicates and integrates with most ATS and HRIS platforms",
  "Intuitive and user-friendly for both clients and applicants",
  "Signatures and authorizations are all done digitally online",
  "Instant result drug testing available",
  "Custom packages with competitive pricing",
  "100% web-based SaaS with bank encrypted security access 24/7",
  "No setup fees, no minimums for using our portal",
  "Custom solutions available for unique business needs",
];

const badges = [
  {
    icon: Star,
    title: "Customer Satisfaction",
    description: "Consistently rated 5 stars by our clients for accuracy and speed.",
  },
  {
    icon: CheckCircle2,
    title: "Committed to Quality",
    description: "Every report is verified for accuracy before delivery.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Results in as little as 5 minutes, with full verification within 48 hours.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-saffhire" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          {/* Left: Image with badge */}
          <div className="relative">
            <img
              src="/images/why-choose-us.webp"
              alt="SaffHire team working"
              className="w-full rounded-lg shadow-xl object-cover"
              style={{ height: 500 }}
            />
            {/* Since 2020 badge */}
            <div
              className="absolute bottom-6 left-6 bg-white rounded-lg shadow-xl p-5"
              style={{ borderLeft: "4px solid #22c55e" }}
            >
              <p
                className="text-3xl font-black"
                style={{ fontFamily: "'Montserrat', sans-serif", color: "#22c55e" }}
              >
                Since
              </p>
              <p
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                2020
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="section-label mb-3">WHY CHOOSE US</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Information Made Easy
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              SaffHire's advanced user interface makes information gathering simple to acquire
              accurate information about your applicants for all background screening needs.
            </p>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#22c55e" }}
                  />
                  <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="text-center p-8 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <badge.icon size={24} style={{ color: "#22c55e" }} />
              </div>
              <h4
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {badge.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
