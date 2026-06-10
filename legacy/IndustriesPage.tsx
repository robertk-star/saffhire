import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "wouter";

const industries = [
  {
    name: "Healthcare",
    href: "/industries/healthcare",
    description:
      "OIG LEIE monitoring, license verification, and FCRA-compliant screening for hospitals, clinics, home health, and long-term care facilities.",
    image: "https://saffhire.com/sites/default/files/2025-06/helthcare.jpeg",
  },
  {
    name: "Staffing",
    href: "/industries/staffing",
    description:
      "Fast, scalable background screening for staffing agencies. Reduce time-to-fill and stay FCRA compliant across every client placement.",
    image: "https://saffhire.com/sites/default/files/2025-06/staffing.jpeg",
  },
  {
    name: "Transportation",
    href: "/industries/transportation",
    description:
      "DOT-compliant background checks and MVR screening for transportation and logistics companies. Keep your fleet safe and compliant.",
    image: "https://saffhire.com/sites/default/files/2025-06/transportation.jpeg",
  },
  {
    name: "Manufacturing",
    href: "/industries/manufacturing",
    description:
      "Pre-employment background screening for manufacturing and industrial employers. Verify safety records and reduce workplace risk.",
    image: "https://saffhire.com/sites/default/files/2025-06/manufacturing.jpeg",
  },
  {
    name: "Hospitality",
    href: "/industries/hospitality",
    description:
      "Fast background checks for hotels, restaurants, and hospitality businesses. Protect guests and staff with FCRA-compliant screening.",
    image: "https://saffhire.com/sites/default/files/2025-06/hospitality.jpeg",
  },
  {
    name: "Energy",
    href: "/industries/energy",
    description:
      "Safety-first screening for energy, oil and gas, and utilities workers. Verify safety credentials and reduce workforce risk.",
    image: "https://saffhire.com/sites/default/files/2025-06/energy.jpeg",
  },
  {
    name: "Education",
    href: "/industries/education",
    description:
      "FCRA-compliant background checks for K-12 schools, universities, and education organizations. Protect students with thorough screening.",
    image: "https://saffhire.com/sites/default/files/2025-06/education.jpeg",
  },
  {
    name: "Churches & Nonprofits",
    href: "/industries/church-nonprofit",
    description:
      "Affordable, FCRA-compliant background screening for churches, faith-based organizations, and nonprofits. Protect your community.",
    image: "https://saffhire.com/sites/default/files/2025-06/church-nonprofit.jpg",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        path="/industries"
        title="Industries We Serve"
        description="SaffHire provides FCRA-compliant background screening for Healthcare, Staffing, Transportation, Manufacturing, Hospitality, Energy, Education, and Nonprofits."
      />
      <Navbar />
      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>
            INDUSTRIES
          </p>
          <h1
            className="text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Background Screening for Every Industry
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            SaffHire serves organizations across many industries with tailored, FCRA-compliant
            background screening solutions. Select your industry to learn more.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <Link key={industry.href} href={industry.href}>
                <div className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-green-400 transition-all duration-200 cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3
                      className="absolute bottom-4 left-4 text-xl font-bold text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {industry.name}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-600 leading-relaxed text-sm flex-1">
                      {industry.description}
                    </p>
                    <p className="mt-4 text-green-600 font-semibold text-sm">Learn more →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Don't See Your Industry?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We work with businesses across all sectors. Contact us and we can build a custom
            screening package that fits your specific needs.
          </p>
          <a
            href="/contact"
            className="btn-green rounded-sm px-10 py-4 text-base font-bold inline-block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Contact Us
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
