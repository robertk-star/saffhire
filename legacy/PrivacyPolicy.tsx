/*
 * Privacy Policy Page - SaffHire Background Screening
 * Route: /privacy-policy
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";


const LAST_UPDATED = "March 2025";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/privacy-policy" title="Privacy Policy" description="Read the SaffHire privacy policy to understand how we collect, use, and protect your personal information." />

      <Navbar />

      {/* Hero */}
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none space-y-10">

            {/* Intro */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                SaffHire Background Screening ("SaffHire," "we," "our," or "us") is committed to
                protecting the privacy of the individuals and organizations that use our services.
                This Privacy Policy explains how we collect, use, store, and protect personal
                information in connection with our background screening services and website. By
                using our website or services, you agree to the practices described in this policy.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                1. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SaffHire collects information from two primary groups: employer clients who use
                our platform to order background checks, and applicants whose information is
                submitted for screening.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>From employer clients,</strong> we collect business contact information
                including name, email address, phone number, company name, and billing details
                necessary to establish and maintain a service account. We also collect information
                about screening orders placed through our platform, including the types of searches
                requested and the jurisdictions involved.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>From applicants,</strong> we collect personally identifiable information
                necessary to conduct background checks, including full legal name, date of birth,
                Social Security Number, current and prior addresses, driver's license number (for
                MVR searches), and employment history. This information is collected through our
                secure applicant portal and is used solely for the purpose of fulfilling the
                background check order initiated by the employer client.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We also collect technical information automatically when you visit our website,
                including IP address, browser type, pages visited, and time spent on the site.
                This information is used for analytics and to improve the performance and usability
                of our website.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                2. How We Use Personal Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Personal information collected from applicants is used exclusively to fulfill
                background check orders. This includes querying criminal record databases,
                verifying employment and education history, obtaining motor vehicle records,
                and conducting any other searches included in the order. Applicant information
                is not sold, rented, or shared with any third party for marketing or commercial
                purposes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Personal information collected from employer clients is used to manage service
                accounts, process billing, communicate about orders and results, and provide
                customer support. We may also use client contact information to send service
                updates, compliance notices, and information about new features or offerings.
                Clients may opt out of marketing communications at any time.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Technical and usage data collected from website visitors is used in aggregate
                form to analyze traffic patterns, identify areas for improvement, and optimize
                the website experience. This data is not used to identify individual visitors.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                3. How Information Is Stored and Protected
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SaffHire uses industry-standard security measures to protect personal information
                against unauthorized access, disclosure, alteration, and destruction. Our platform
                employs encryption in transit (TLS/SSL) and at rest for all sensitive data fields.
                Access to applicant information is restricted to authorized personnel who require
                it to fulfill screening orders.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Background check reports and associated applicant data are retained for the period
                required by applicable law and our contractual obligations to employer clients.
                After the applicable retention period, data is securely deleted or anonymized.
                Employer clients may request deletion of their account data at any time, subject
                to our legal retention obligations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                While we take reasonable precautions to protect personal information, no system
                is completely secure. We encourage users to use strong, unique passwords for their
                accounts and to contact us immediately if they suspect unauthorized access.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                4. Compliance with Privacy Regulations
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SaffHire's background screening services are governed by the Fair Credit Reporting
                Act (FCRA), which establishes strict requirements for the collection, use, and
                disclosure of consumer report information. As a Consumer Reporting Agency (CRA)
                under the FCRA, SaffHire is required to maintain reasonable procedures to ensure
                the accuracy of the information we report and to provide consumers with the rights
                afforded to them under the Act.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Applicants have the right to request a copy of their consumer report, to dispute
                inaccurate or incomplete information, and to be notified when an adverse action
                is taken against them based on the contents of a background check report. These
                rights are described in the Summary of Your Rights Under the FCRA, which is
                provided to applicants as part of the screening process.
              </p>
              <p className="text-gray-600 leading-relaxed">
                To the extent applicable, SaffHire also complies with state privacy laws,
                including laws in California, New York, and other jurisdictions that impose
                additional requirements on the collection and use of personal information.
                If you have questions about your rights under applicable privacy law, please
                contact us using the information below.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                5. Third-Party Service Providers
              </h2>
              <p className="text-gray-600 leading-relaxed">
                SaffHire works with third-party service providers to fulfill background check
                orders, including court research vendors, employment verification services,
                drug testing laboratories, and motor vehicle record providers. These providers
                receive only the information necessary to complete the specific service requested
                and are contractually prohibited from using applicant information for any other
                purpose. We do not sell personal information to third parties.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2
                className="text-2xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                6. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy, wish to exercise your rights
                under applicable law, or need to report a privacy concern, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-700 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  SaffHire Background Screening
                </p>
                <p className="text-gray-600 text-sm mt-1">Phone: (888) 588-1733</p>
                <p className="text-gray-600 text-sm mt-1">
                  Website:{" "}
                  <a href="/#contact" className="hover:underline" style={{ color: "#22c55e" }}>
                    Contact Form
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
