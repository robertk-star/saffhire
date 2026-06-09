/*
 * Motor Vehicle Records (MVR) Checks Page - SaffHire Background Screening
 * Route: /mvr-checks
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Car, FileText, AlertTriangle, CheckCircle, Briefcase, Shield } from "lucide-react";
import PageSEO from "@/components/PageSEO";


export default function MVRChecks() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/mvr-checks" title="Motor Vehicle Record (MVR) Checks" description="Instant MVR checks for transportation, delivery, and any role requiring a valid driver's license. Protect your fleet and reduce liability." />

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
              <Car size={14} />
              BACKGROUND SCREENING
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Motor Vehicle Records (MVR) Checks
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              For any role that involves operating a vehicle, an MVR check is an essential
              component of the hiring process. SaffHire retrieves official driving records
              directly from state motor vehicle agencies to give employers a complete picture
              of an applicant's driving history.
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

      {/* What Is an MVR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              WHAT IS AN MVR CHECK?
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Understanding Motor Vehicle Records
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A Motor Vehicle Record (MVR) check is a search of an individual's official
              driving history as maintained by the state Department of Motor Vehicles (DMV)
              or equivalent licensing authority. The record is tied to the applicant's driver's
              license number and reflects the history associated with that license in the
              issuing state.
            </p>
            <p className="text-gray-600 leading-relaxed">
              MVR checks are requested by employers as part of the pre-employment screening
              process for positions that involve driving a company vehicle, operating heavy
              equipment, transporting passengers or cargo, or any other role where a valid
              driver's license and a clean driving history are required. The information
              returned reflects the applicant's official record as of the date the search
              is conducted.
            </p>
          </div>
        </div>
      </section>

      {/* What's in a Report */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            REPORT CONTENTS
          </p>
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            What an MVR Report Contains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "License Status",
                desc: "Confirms whether the driver's license is valid, expired, suspended, or revoked at the time of the search.",
              },
              {
                icon: Car,
                title: "License Class & Endorsements",
                desc: "Identifies the class of license held (Class A, B, C, CDL) and any special endorsements such as passenger transport or hazardous materials.",
              },
              {
                icon: AlertTriangle,
                title: "Moving Violations",
                desc: "Lists traffic citations and moving violations such as speeding, reckless driving, failure to yield, and running red lights.",
              },
              {
                icon: Shield,
                title: "DUI / DWI Convictions",
                desc: "Reports any convictions for driving under the influence of alcohol or controlled substances.",
              },
              {
                icon: CheckCircle,
                title: "At-Fault Accidents",
                desc: "Some states include at-fault accident records in the MVR report, providing additional context about the applicant's driving history.",
              },
              {
                icon: Briefcase,
                title: "License Restrictions",
                desc: "Notes any restrictions on the license, such as corrective lenses required, daylight driving only, or vehicle type limitations.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                >
                  <item.icon size={18} style={{ color: "#22c55e" }} />
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Important */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Shield size={22} style={{ color: "#22c55e" }} />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                WHY IT MATTERS
              </p>
              <h2
                className="text-3xl font-black text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Why MVR Checks Are Important for Employers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Employers who hire drivers have a legal and ethical obligation to ensure that
                the individuals operating their vehicles have a safe and valid driving record.
                Negligent hiring liability - the legal theory that holds employers responsible
                for harm caused by employees they should have known posed a risk - applies
                directly to driving roles.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                An MVR check allows employers to identify applicants with patterns of unsafe
                driving behavior before they are placed behind the wheel of a company vehicle.
                A single DUI conviction, a history of speeding violations, or a currently
                suspended license are all factors that may disqualify a candidate for a
                driving-intensive role - and all of these are surfaced by an MVR check.
              </p>
              <p className="text-gray-600 leading-relaxed">
                For companies operating commercial fleets, MVR checks are also frequently
                required by insurance carriers as a condition of coverage. Maintaining an
                ongoing MVR monitoring program - not just pre-employment checks - is
                increasingly common among fleet-dependent organizations.
              </p>
            </div>

            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Briefcase size={22} style={{ color: "#22c55e" }} />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
              >
                HOW EMPLOYERS USE MVR CHECKS
              </p>
              <h2
                className="text-3xl font-black text-gray-900 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Assessing Driving History and Safety
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Employers use MVR reports to evaluate whether an applicant's driving history
                aligns with the requirements of the position. Most organizations establish
                written motor vehicle record policies that define acceptable and unacceptable
                driving histories for covered roles. These policies typically specify the
                lookback period, the types of violations that are disqualifying, and the
                number of points or incidents that trigger further review.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Common evaluation criteria include the number of moving violations within
                the past three to five years, the presence of any DUI or DWI convictions,
                whether the license is currently valid and unrestricted, and whether any
                at-fault accidents are on record.
              </p>
              <p className="text-gray-600 leading-relaxed">
                SaffHire delivers MVR reports in a clear, standardized format that makes
                it straightforward to apply your organization's motor vehicle policy and
                document your hiring decision for compliance purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            WHO NEEDS MVR CHECKS
          </p>
          <h2
            className="text-3xl font-black text-gray-900 mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Industries That Rely on MVR Screening
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Transportation & Logistics",
              "Healthcare & Home Care",
              "Delivery & Courier Services",
              "Construction & Trades",
              "Sales & Field Service",
              "Government & Public Safety",
            ].map((industry) => (
              <div
                key={industry}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
              >
                <p
                  className="text-gray-700 text-sm font-semibold leading-snug"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {industry}
                </p>
              </div>
            ))}
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
            Screen Your Drivers with Confidence
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Contact SaffHire to add MVR checks to your screening program and protect your
            organization from the risks of negligent hiring.
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
