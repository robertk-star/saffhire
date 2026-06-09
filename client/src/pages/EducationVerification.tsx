/*
 * Education Verification Page - SaffHire Background Screening
 * Route: /education-verification
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, GraduationCap, FileCheck, Building2, Zap, CheckCircle, Search, Globe, AlertTriangle } from "lucide-react";
import PageSEO from "@/components/PageSEO";


export default function EducationVerification() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/education-verification" title="Education Verification Services" description="Confirm degrees, diplomas, and certifications with SaffHire education verification. Protect your organization from credential fraud." includeFAQ={true} />

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
              <GraduationCap size={14} />
              BACKGROUND SCREENING
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Education Verification
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Confirm that candidates hold the degrees and credentials they claim. SaffHire's
              education verification service contacts institutions directly and leverages
              trusted verification networks to deliver accurate, timely results for every hire.
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
              How Education Verification Is Performed
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Education verification begins with the applicant's self-reported academic
              history, collected through SaffHire's secure applicant portal. Once submitted,
              our team initiates a verification process designed to confirm the accuracy of
              each credential listed, including the institution attended, the degree or
              diploma earned, the field of study, and the date of graduation or attendance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The process typically starts with queries through established education
              verification networks, which maintain records for thousands of accredited
              institutions in the United States and internationally. For institutions not
              covered by these networks, our team contacts the registrar's office directly
              to obtain official confirmation of the applicant's academic record.
            </p>
          </div>
        </div>
      </section>

      {/* Verification Methods */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Search size={22} style={{ color: "#22c55e" }} />
              </div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Verification Networks
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Many accredited colleges and universities participate in centralized
                education verification networks that allow credentialed background screening
                providers to query degree records electronically. These networks aggregate
                enrollment and graduation data from participating institutions, enabling
                fast confirmation of degrees, diplomas, and attendance dates for covered
                graduates.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This network-driven approach significantly reduces turnaround time for
                verifications at major universities, community colleges, and vocational
                institutions. When a match is found, the verification is completed
                automatically and the result is returned to the employer within hours,
                with no manual outreach required.
              </p>
            </div>

            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <Globe size={22} style={{ color: "#22c55e" }} />
              </div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Direct Registrar Contact
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For institutions not covered by automated verification networks, SaffHire
                contacts the registrar's office directly by phone, email, or written
                request. Our team works with registrar staff to obtain official confirmation
                of the applicant's enrollment, degree, and graduation date in a format that
                meets employer documentation requirements.
              </p>
              <p className="text-gray-600 leading-relaxed">
                International education verifications follow the same direct-contact
                approach, with our team reaching out to foreign institutions or engaging
                specialized international verification services when needed to confirm
                credentials earned outside the United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <AlertTriangle size={22} style={{ color: "#22c55e" }} />
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
                Credential Fraud Is More Common Than Most Employers Realize
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Resume fraud involving educational credentials is a persistent problem
                across industries. Candidates may exaggerate their level of education,
                claim degrees they never completed, list institutions they never attended,
                or present credentials from diploma mills that lack legitimate accreditation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                For roles that require specific degrees or professional credentials, hiring
                a candidate who does not actually hold the required qualifications can
                expose an organization to significant liability, regulatory risk, and
                reputational harm. Education verification is the only reliable way to
                confirm that a candidate's academic credentials are genuine.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Verifying education is especially critical for positions in healthcare,
                engineering, finance, law, education, and any other field where specific
                degrees or certifications are required by law, regulation, or professional
                standards.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 border border-gray-100"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <h3
                className="font-black text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Industries Where Education Verification Is Critical
              </h3>
              <div className="space-y-3">
                {[
                  { industry: "Healthcare", reason: "Physicians, nurses, and allied health professionals must hold valid degrees and licenses." },
                  { industry: "Engineering", reason: "Licensed engineers are required to hold accredited engineering degrees." },
                  { industry: "Finance", reason: "Regulatory and compliance roles often require specific academic qualifications." },
                  { industry: "Education", reason: "Teachers and administrators must hold valid degrees and certifications." },
                  { industry: "Legal", reason: "Attorneys and paralegals must hold degrees from accredited institutions." },
                  { industry: "Technology", reason: "Senior technical roles increasingly require verified computer science or engineering credentials." },
                ].map((item) => (
                  <div key={item.industry} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <CheckCircle size={16} style={{ color: "#22c55e" }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{item.industry}: </span>
                      <span className="text-gray-600 text-sm">{item.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            Standard Education Verification Includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Institution Name", desc: "Confirms the official name of the school, college, or university attended." },
              { icon: GraduationCap, title: "Degree or Diploma", desc: "Verifies the specific degree, diploma, or certificate earned by the applicant." },
              { icon: FileCheck, title: "Field of Study", desc: "Confirms the major, concentration, or area of study associated with the degree." },
              { icon: CheckCircle, title: "Dates of Attendance", desc: "Verifies the enrollment start and end dates reported by the applicant." },
              { icon: Zap, title: "Graduation Date", desc: "Confirms the date the degree was conferred or the program was completed." },
              { icon: Search, title: "Accreditation Status", desc: "Flags credentials from unaccredited or diploma mill institutions when identified." },
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
              TURNAROUND TIME
            </p>
            <h2
              className="text-3xl lg:text-4xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Fast Results for Most Institutions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              For institutions covered by automated verification networks, education
              verifications are typically completed within 24 to 48 hours. For institutions
              that require direct registrar contact, turnaround time depends on the
              institution's response time, though our team follows up proactively to keep
              the process moving.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              International education verifications may take additional time depending on
              the country, institution, and availability of records. SaffHire will keep
              employers informed of progress and expected completion dates throughout the
              process.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Employers who need to verify credentials for roles with strict qualification
              requirements are encouraged to initiate education verification early in the
              hiring process to avoid delays in onboarding.
            </p>
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
            Verify Every Credential with Confidence
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Contact SaffHire to learn how our education verification service can protect
            your organization from credential fraud and reduce hiring risk.
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
