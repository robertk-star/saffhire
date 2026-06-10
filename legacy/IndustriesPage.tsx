import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "wouter";

const industries = [
  { name: "Healthcare", href: "/industries/healthcare", description: "Screening support for hospitals, clinics, home health, and long-term care facilities.", image: "/industry-healthcare.svg" },
  { name: "Staffing", href: "/industries/staffing", description: "Fast, scalable screening support for staffing agencies and client placements.", image: "/industry-staffing.svg" },
  { name: "Transportation", href: "/industries/transportation", description: "DOT-focused checks and MVR support for transportation and logistics companies.", image: "/industry-transportation.svg" },
  { name: "Manufacturing", href: "/industries/manufacturing", description: "Pre-employment screening for manufacturing, warehouse, and industrial employers.", image: "/industry-manufacturing.svg" },
  { name: "Hospitality", href: "/industries/hospitality", description: "Fast screening support for hotels, restaurants, hospitality, and service businesses.", image: "/industry-hospitality.svg" },
  { name: "Energy", href: "/industries/energy", description: "Screening support for energy, oil and gas, utilities, and field-based teams.", image: "/industry-energy.svg" },
  { name: "Education", href: "/industries/education", description: "Screening support for schools, universities, education organizations, and staff roles.", image: "/industry-education.svg" },
  { name: "Churches & Nonprofits", href: "/industries/church-nonprofit", description: "Affordable screening support for churches, faith-based groups, volunteers, and nonprofits.", image: "/industry-church-nonprofit.svg" },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/industries" title="Industries We Serve" description="SaffHire provides employer screening support for many industries." />
      <Navbar />
      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3" style={{ color: "#22c55e" }}>INDUSTRIES</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Background Screening for Every Industry</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">SaffHire serves organizations across many industries with tailored background screening solutions. Select your industry to learn more.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <Link key={industry.href} href={industry.href}>
                <div className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-green-400 transition-all duration-200 cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <img src={industry.image} alt={industry.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{industry.name}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-600 leading-relaxed text-sm flex-1">{industry.description}</p>
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
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Don't See Your Industry?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">We work with many types of organizations. Contact us and we can help match the screening process to your needs.</p>
          <a href="/contact" className="btn-green rounded-sm px-10 py-4 text-base font-bold inline-block" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact Us</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
