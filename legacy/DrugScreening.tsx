/*
 * Drug Screening Page - SaffHire Background Screening
 * Route: /drug-screening
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, FlaskConical, MapPin, Package, CheckCircle, Clock, ShoppingCart } from "lucide-react";
import PageSEO from "@/components/PageSEO";


export default function DrugScreening() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/drug-screening" title="Drug Screening Services for Employers" description="Comprehensive pre-employment and ongoing drug screening services. DOT-compliant and non-DOT panels available for all industries." includeFAQ={true} />

      <Navbar />

      {/* Hero */}
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
              style={{
                backgroundColor: "rgba(34,197,94,0.15)",
                color: "#22c55e",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <FlaskConical size={14} />
              BACKGROUND SCREENING
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Drug Screening
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              SaffHire offers both lab-based drug screening through Labcorp and in-house
              screening products for employers who prefer to test on-site. Our drug screening
              solutions are designed to be fast, accurate, and easy to administer.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-white"
              style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              Get a Quote <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Lab-Based */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            LAB-BASED SCREENING
          </p>
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Lab-Based Drug Screening Through Labcorp
          </h2>
          <p className="text-gray-600 leading-relaxed mb-12 max-w-3xl">
            SaffHire's lab-based drug screening program is powered by Labcorp, one of the
            nation's largest and most trusted clinical laboratory networks. This option is
            ideal for employers who require certified, legally defensible results - including
            those in regulated industries such as transportation, healthcare, and government
            contracting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                step: "Step 1",
                title: "Applicant Scheduled",
                desc: "Once an employer initiates a drug screen order through SaffHire's portal, the applicant receives a notification with instructions and a donor pass to visit a Labcorp collection site.",
              },
              {
                icon: MapPin,
                step: "Step 2",
                title: "Applicant Visits Labcorp",
                desc: "The applicant visits any Labcorp Patient Service Center at their convenience. With thousands of locations nationwide, scheduling is simple and collection is handled by trained staff.",
              },
              {
                icon: FlaskConical,
                step: "Step 3",
                title: "Sample Collected",
                desc: "A trained collector gathers the specimen - typically urine, though oral fluid and hair follicle options are available - under chain-of-custody protocols that ensure sample integrity.",
              },
              {
                icon: CheckCircle,
                step: "Step 4",
                title: "Results Returned",
                desc: "Negative results are typically returned within 24–48 hours. If a non-negative result is detected, the sample is forwarded to the laboratory for confirmation testing by a Medical Review Officer (MRO).",
              },
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                >
                  <item.icon size={18} style={{ color: "#22c55e" }} />
                </div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.step}
                </p>
                <h3
                  className="font-black text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MRO Note */}
      <section className="py-12" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 max-w-3xl">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
              style={{ backgroundColor: "rgba(34,197,94,0.2)" }}
            >
              <CheckCircle size={18} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <h3
                className="font-black text-gray-900 mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Medical Review Officer (MRO) Oversight
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                All non-negative results are reviewed by a licensed Medical Review Officer before
                being reported to the employer. The MRO contacts the donor to determine whether
                there is a legitimate medical explanation for the result, ensuring that
                prescription medications and other valid medical uses are not incorrectly flagged.
                This step is a critical safeguard for both employers and applicants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-House */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Package size={22} style={{ color: "#22c55e" }} />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                IN-HOUSE SCREENING
              </p>
              <h2
                className="text-3xl font-black text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                On-Site Drug Screening Products
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                For employers who prefer to conduct drug screening on-site - whether for
                convenience, cost efficiency, or immediate results - SaffHire offers a selection
                of in-house screening products. These products allow HR teams, safety officers,
                and supervisors to administer tests directly at the workplace without scheduling
                a lab visit.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                In-house screening is commonly used for post-accident testing, reasonable
                suspicion testing, and random drug screening programs where speed is essential.
                Results are typically available within minutes, allowing employers to take
                immediate action when necessary.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                  >
                    <ShoppingCart size={18} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Saliva Oral Tests
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      Non-invasive oral fluid collection devices that detect recent drug use.
                      Ideal for post-accident and reasonable suspicion testing due to their
                      ease of administration and rapid results.
                    </p>
                    <a
                      href="https://www.amazon.com/s?k=saliva+oral+drug+test"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-bold hover:opacity-80 transition-opacity"
                      style={{ color: "#22c55e" }}
                    >
                      Shop Saliva Oral Tests <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                  >
                    <ShoppingCart size={18} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Drug Test Cups
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      All-in-one urine drug test cups that provide instant results for multiple
                      substances simultaneously. Available in a variety of panel configurations
                      to match your screening policy requirements.
                    </p>
                    <a
                      href="https://www.amazon.com/s?k=drug+test+cups"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-bold hover:opacity-80 transition-opacity"
                      style={{ color: "#22c55e" }}
                    >
                      Shop Drug Test Cups <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            INDUSTRIES WE SERVE
          </p>
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Drug Screening for Every Industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="/industries/healthcare"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Healthcare
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Drug testing for medical professionals and healthcare workers.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/industries/transportation"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Transportation
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                DOT and non-DOT drug testing for drivers and transportation companies.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/industries/manufacturing"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Manufacturing
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Drug testing for warehouse and manufacturing workers.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/industries/energy"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Energy
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Drug testing for energy sector and safety-sensitive positions.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/industries/hospitality"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Hospitality
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Drug testing for hotels, restaurants, and hospitality businesses.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/industries/staffing"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Staffing
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Drug testing for temporary and permanent placement candidates.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Build a Safer Workplace
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Contact SaffHire to set up your drug screening program - whether lab-based,
            in-house, or a combination of both.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-white"
            style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            Get Started <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
