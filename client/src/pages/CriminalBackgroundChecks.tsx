/*
 * Criminal Background Checks Page - SaffHire Background Screening
 * Route: /criminal-background-checks
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Shield, Search, MapPin, Clock, Briefcase, CheckCircle } from "lucide-react";
import PageSEO from "@/components/PageSEO";


export default function CriminalBackgroundChecks() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/criminal-background-checks" title="Criminal Background Checks for Employers" description="FCRA-compliant criminal background checks for employers. Fast, accurate county, state, and federal criminal record searches for every industry." includeFAQ={true} />

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
              <Shield size={14} />
              BACKGROUND SCREENING
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Criminal Background Checks
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Comprehensive criminal history searches that help employers make informed, compliant
              hiring decisions. SaffHire combines national database searches with county-level
              court verification for the most accurate and complete results available.
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              THE PROCESS
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How Criminal Background Checks Are Conducted
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A criminal background check begins when an employer initiates a search through
              SaffHire's secure portal. The applicant's identifying information - including full
              legal name, date of birth, and Social Security Number - is used to query multiple
              criminal record databases simultaneously. This multi-source approach ensures that
              records from different jurisdictions and court systems are captured in a single,
              consolidated report.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Once the initial database search is complete, any records that are flagged are
              forwarded to our county-level verification team. Researchers access the originating
              court directly - either through online portals, physical courthouse visits, or
              certified court runners - to confirm the accuracy and completeness of each record
              before it is included in the final report.
            </p>
          </div>
        </div>
      </section>

      {/* National vs County */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            SEARCH TYPES
          </p>
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            National Database vs. County Court Verification
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* National */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Search size={22} style={{ color: "#22c55e" }} />
              </div>
              <h3
                className="text-xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                National Criminal Database Search
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                A national criminal database search queries an aggregated repository of criminal
                records compiled from courts, correctional facilities, sex offender registries,
                and other public record sources across the country. This search is fast - often
                returning results within minutes - and casts a wide net across multiple states
                and jurisdictions simultaneously.
              </p>
              <p className="text-gray-600 leading-relaxed">
                However, national databases are not comprehensive. Not every county or court
                system reports to these databases, and records may be incomplete, outdated, or
                missing disposition information. For this reason, a national database search
                alone is not sufficient for a fully compliant background check.
              </p>
            </div>

            {/* County */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <MapPin size={22} style={{ color: "#22c55e" }} />
              </div>
              <h3
                className="text-xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                County Court Verification
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                County court verification involves searching the actual court records at the
                county level where an applicant has lived or worked. Because most criminal cases
                are filed and adjudicated at the county level, this is the most authoritative
                source of criminal record information available.
              </p>
              <p className="text-gray-600 leading-relaxed">
                County searches capture records that may not appear in national databases,
                provide the most current case status and disposition information, and are
                considered the gold standard for background screening compliance. SaffHire
                performs county searches in all jurisdictions relevant to the applicant's
                residential and employment history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why County Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              COMPLIANCE & ACCURACY
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why County-Level Verification Matters
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Regulatory guidance from the Equal Employment Opportunity Commission (EEOC) and
              the Fair Credit Reporting Act (FCRA) requires that background check information
              used in hiring decisions be accurate, complete, and up to date. Relying solely on
              a national database search can expose employers to legal risk if a hiring decision
              is made based on incomplete or inaccurate record information.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              County court verification ensures that every record included in a report has been
              confirmed at the source. This means the case number, charges, and final disposition
              are verified directly from the court - not inferred from a third-party database
              that may not have received the latest updates.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For employers operating in regulated industries - including healthcare, finance,
              education, and transportation - county-level verification is not just best practice;
              it is often a regulatory requirement. SaffHire's standard screening packages include
              county court verification to ensure your process meets the highest compliance standards.
            </p>
          </div>
        </div>
      </section>

      {/* Turnaround & Usage */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Turnaround */}
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Clock size={22} style={{ color: "#22c55e" }} />
              </div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Typical Turnaround Times
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Most criminal background checks are completed within one to three business days.
                The exact turnaround depends on the number of jurisdictions searched, the
                responsiveness of individual court systems, and whether any records require
                manual verification.
              </p>
              <ul className="space-y-3">
                {[
                  "National database searches: same day to 24 hours",
                  "County court searches (online access): 1–2 business days",
                  "County court searches (manual/courthouse): 2–5 business days",
                  "Multi-state or multi-county searches: 3–5 business days",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#22c55e" }} />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How Employers Use */}
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Briefcase size={22} style={{ color: "#22c55e" }} />
              </div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                How Employers Use Background Checks
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Criminal background checks help employers assess whether an applicant's history
                is relevant to the position being filled. Under EEOC guidance, employers must
                evaluate each record individually, considering the nature of the offense, the
                time elapsed, and the nature of the job - rather than applying blanket exclusion
                policies.
              </p>
              <p className="text-gray-600 leading-relaxed">
                SaffHire provides clear, organized reports that make this individualized
                assessment straightforward. Our reports include the charge, conviction status,
                sentence, and jurisdiction for each record - giving your HR team the information
                needed to make a fair and defensible hiring decision.
              </p>
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
            Criminal Background Checks for Every Industry
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
                Comprehensive screening for medical professionals and healthcare workers.
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
                Fast screening for temporary and permanent placement candidates.
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
                DOT-compliant screening for drivers and transportation companies.
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
                Safety-first screening for warehouse and manufacturing workers.
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
                Guest-first screening for hotels, restaurants, and hospitality businesses.
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Learn More <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="/industries/education"
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Education
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Student-first screening for schools and educational institutions.
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
            Ready to Start Screening?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Contact SaffHire today to set up your account and begin running compliant criminal
            background checks for your organization.
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
