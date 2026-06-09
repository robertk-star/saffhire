/*
 * Employment Verification Page - SaffHire Background Screening
 * Route: /employment-verification
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, FileCheck, Database, Users, Zap, CheckCircle, Building2 } from "lucide-react";
import PageSEO from "@/components/PageSEO";


export default function EmploymentVerification() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/employment-verification" title="Employment Verification Services" description="Verify candidate work history quickly and accurately. SaffHire employment verification services confirm dates, titles, and eligibility for rehire." includeFAQ={true} />

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
              <FileCheck size={14} />
              BACKGROUND SCREENING
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Employment Verification
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Confirm that candidates have the work history they claim. SaffHire's employment
              verification service combines automated database searches with direct employer
              outreach to deliver accurate, timely results for every hire.
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
              How Employment Verification Is Performed
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Employment verification begins with the applicant's self-reported work history,
              collected through SaffHire's secure applicant portal. Once submitted, our team
              initiates a multi-step verification process designed to confirm the accuracy of
              each position listed - including employer name, dates of employment, job title,
              and eligibility for rehire where permitted by law.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The process typically starts with automated database queries, which can instantly
              confirm employment records for millions of employers whose payroll data is
              accessible through verification networks. For employers not covered by these
              databases, our team contacts the employer directly by phone, email, or written
              request to obtain confirmation from an authorized representative.
            </p>
          </div>
        </div>
      </section>

      {/* Databases & Services */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Database size={22} style={{ color: "#22c55e" }} />
              </div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Verification Databases
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Many large employers participate in automated verification networks that allow
                credentialed background screening providers to query employment records
                electronically. These networks aggregate payroll and HR data from participating
                employers, enabling near-instant confirmation of employment dates, job titles,
                and income history for covered employees.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This database-driven approach dramatically reduces turnaround time for
                verifications at large corporations, national retail chains, healthcare systems,
                and other major employers. When a match is found in the database, the
                verification is completed automatically - with no manual outreach required -
                and the result is returned to the employer within hours.
              </p>
            </div>

            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Building2 size={22} style={{ color: "#22c55e" }} />
              </div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Third-Party Verification Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Many employers choose to outsource their employment verification function to
                dedicated third-party verification services. Rather than handling incoming
                verification requests internally, these employers direct all verification
                inquiries to a designated verification partner who responds on their behalf.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When SaffHire encounters an employer that uses a third-party verification
                service, we route the request through the appropriate channel automatically.
                This ensures that the verification is handled correctly, that the employer's
                privacy policies are respected, and that the response is returned in a
                standardized format that integrates cleanly into the final report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speed & Accuracy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
            >
              <Zap size={22} style={{ color: "#22c55e" }} />
            </div>
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              SPEED & ACCURACY
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Faster Verification, Better Accuracy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The combination of automated verification databases and established relationships
              with third-party verification services allows SaffHire to complete most employment
              verifications significantly faster than manual outreach alone. Employers that
              previously waited days for callbacks from HR departments now receive confirmed
              results within hours for covered employees.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Accuracy improves as well. Automated database responses eliminate transcription
              errors and reduce the risk of receiving incorrect information from an uninformed
              contact at the employer. Third-party verification services are trained specifically
              to respond to verification requests, ensuring that the information provided is
              authoritative and formatted correctly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For employers, faster and more accurate employment verification means shorter
              time-to-hire, reduced risk of onboarding candidates with falsified credentials,
              and a more defensible hiring process overall.
            </p>
          </div>
        </div>
      </section>

      {/* What We Verify */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
          >
            WHAT WE VERIFY
          </p>
          <h2
            className="text-3xl font-black text-gray-900 mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Standard Employment Verification Includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Employer Name", desc: "Confirms the legal name of the employing organization." },
              { icon: FileCheck, title: "Dates of Employment", desc: "Verifies start and end dates for each position listed." },
              { icon: Building2, title: "Job Title", desc: "Confirms the applicant's title or role at the organization." },
              { icon: CheckCircle, title: "Full-Time or Part-Time", desc: "Clarifies employment status where available." },
              { icon: Zap, title: "Eligibility for Rehire", desc: "Reported where permitted by the employer's policy." },
              { icon: Database, title: "Reason for Separation", desc: "Provided when disclosed by the employer." },
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

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl lg:text-4xl font-black text-white mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Verify Every Hire with Confidence
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Contact SaffHire to learn how our employment verification service can reduce
            your time-to-hire and protect your organization from credential fraud.
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
