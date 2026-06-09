/*
 * TestimonialsSection Component SaffHire Background Screening
 * Design: Three testimonial cards with star ratings, quotes, names, titles, and industries
 */

import { Star } from "lucide-react";

const testimonials = [
  {
    stars: 5,
    quote: "SaffHire made our screening process incredibly simple. Results come back fast and their team is always available when we have questions. We would never go back to our old provider.",
    name: "Jennifer M.",
    title: "HR Director",
    industry: "Staffing Agency",
  },
  {
    stars: 5,
    quote: "As a healthcare facility, compliance is everything. SaffHire handles all our OIG checks, license verifications, and drug testing in one place. They understand what we need.",
    name: "Marcus T.",
    title: "Operations Manager",
    industry: "Home Health Agency",
  },
  {
    stars: 5,
    quote: "We run background checks on dozens of drivers every month. SaffHire's DOT-compliant packages save us time and the pricing is the best we have found anywhere.",
    name: "Sandra R.",
    title: "Fleet Manager",
    industry: "Transportation Company",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">WHAT OUR CLIENTS SAY</p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Trusted by Businesses Across Every Industry
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-current"
                    style={{ color: "#22c55e" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Client Info */}
              <div className="border-t border-gray-100 pt-4">
                <p
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
                <p className="text-sm text-gray-500">{testimonial.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
