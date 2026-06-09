/*
 * Terms of Service Page - SaffHire Background Screening
 * Route: /terms-of-service
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";


const LAST_UPDATED = "March 2025";

const sections = [
  {
    title: "1. Use of the Website",
    content: [
      "You may use this website for lawful purposes only. You agree not to use the website in any way that violates applicable federal, state, or local law; infringes the rights of any third party; or transmits any unsolicited or unauthorized advertising or promotional material.",
      "You agree not to attempt to gain unauthorized access to any portion of the website, any server on which the website is stored, or any server, computer, or database connected to the website. You agree not to attack the website via a denial-of-service attack or a distributed denial-of-service attack. SaffHire reserves the right to terminate your access to the website for any violation of these Terms.",
    ],
  },
  {
    title: "2. User Responsibilities",
    content: [
      "Employer clients who use SaffHire's background screening services are responsible for ensuring that their use of the Services complies with all applicable laws, including the Fair Credit Reporting Act (FCRA), the Equal Employment Opportunity Commission (EEOC) guidance on the use of criminal records in employment decisions, and all applicable state and local ban-the-box, fair chance, and anti-discrimination laws.",
      "Employer clients are responsible for obtaining proper written authorization from applicants before initiating a background check, providing required disclosures in the format required by law, and following all adverse action procedures required by the FCRA if a background check result influences a hiring decision. SaffHire provides tools and guidance to assist with compliance, but the employer client remains solely responsible for its own compliance obligations.",
      "Users are responsible for maintaining the confidentiality of their account credentials and for all activity that occurs under their account. You agree to notify SaffHire immediately of any unauthorized use of your account.",
    ],
  },
  {
    title: "3. Service Limitations",
    content: [
      "SaffHire's background screening services are dependent on the availability and accuracy of information provided by third-party sources, including courts, government agencies, employers, and verification networks. SaffHire makes reasonable efforts to obtain accurate and complete information, but cannot guarantee that all records are current, complete, or error-free.",
      "Turnaround times for background check reports are estimates and may vary based on the responsiveness of third-party sources, the number of jurisdictions searched, and other factors outside SaffHire's control. SaffHire is not liable for delays caused by court closures, government agency backlogs, or other circumstances beyond our reasonable control.",
      "SaffHire reserves the right to modify, suspend, or discontinue any aspect of the Services at any time with or without notice. We will make reasonable efforts to notify active clients of material changes to the Services.",
    ],
  },
  {
    title: "4. Liability Disclaimers",
    content: [
      "THE SERVICES ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. SAFFHIRE DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.",
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SAFFHIRE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION, EVEN IF SAFFHIRE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      "SaffHire's total liability to you for any claim arising out of or relating to these Terms or the Services shall not exceed the amount paid by you to SaffHire in the twelve months preceding the claim. Some jurisdictions do not allow the exclusion or limitation of certain warranties or damages, so the above limitations may not apply to you.",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      "All content on this website, including text, graphics, logos, images, and software, is the property of SaffHire or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without the prior written consent of SaffHire.",
    ],
  },
  {
    title: "6. Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which SaffHire is incorporated, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in that state.",
    ],
  },
  {
    title: "7. Changes to These Terms",
    content: [
      "SaffHire reserves the right to update these Terms at any time. We will post the revised Terms on this page with an updated effective date. Your continued use of the website or Services after the posting of revised Terms constitutes your acceptance of the changes. We encourage you to review these Terms periodically.",
    ],
  },
  {
    title: "8. Contact Us",
    content: [
      "If you have questions about these Terms of Service, please contact us by phone at (888) 588-1733 or through the contact form on our website.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/terms-of-service" title="Terms of Service" description="Review the SaffHire terms of service governing use of our background screening platform and services." />

      <Navbar />

      {/* Hero */}
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1
              className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Terms of Service
            </h1>
            <p className="text-gray-400">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of the SaffHire
              Background Screening website and services ("Services"). By accessing our website
              or using our Services, you agree to be bound by these Terms. If you do not agree,
              please do not use our website or Services. These Terms apply to all visitors,
              employer clients, and other users of the Services.
            </p>

            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="text-2xl font-black text-gray-900 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((para, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
