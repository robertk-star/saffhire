"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Tag, BookOpen } from "lucide-react";

export default function GigEconomyBlogClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24 pb-10" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <a href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8">
            <ArrowLeft size={14} />
            Back to Blog
          </a>
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
            >
              <Tag size={10} />
              Workforce Risk
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Gig Economy Background Screening: Contingent Workforce Liability Employers Can’t Ignore
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} />May 22, 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />9 min read</span>
            <span className="flex items-center gap-1.5"><BookOpen size={14} />By SaffHire Compliance Team</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            <article className="lg:col-span-2 prose-article">
              <div className="space-y-8" style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  The gig economy has changed how companies hire, staff, deliver, and serve customers. Contractors, temporary workers, delivery drivers, project-based specialists, freelancers, and seasonal workers can help a company move faster. But they also create a risk that many employers underestimate: contingent workers can still create liability for the company they represent.
                </p>

                <Section title="Why contingent workforce screening matters">
                  <p>
                    Many businesses treat gig workers and contractors differently from employees. That can make sense for payroll, benefits, and scheduling, but it does not eliminate safety, customer, compliance, or reputation risk. If a contractor enters a customer’s home, drives on behalf of your company, handles sensitive information, works around children, or represents your brand, background screening should be part of the risk review.
                  </p>
                  <p>
                    The question is not only whether someone is a full-time employee. The better question is: what level of trust, access, and responsibility does the role require?
                  </p>
                </Section>

                <Section title="Common contingent workforce risk areas">
                  <div className="space-y-4">
                    <RiskCard title="Customer access" body="Drivers, service workers, home repair contractors, cleaners, caregivers, and field workers may interact directly with customers or enter private spaces." />
                    <RiskCard title="Brand reputation" body="Even when a worker is technically independent, customers often see that person as part of the company. A poor screening process can damage trust quickly." />
                    <RiskCard title="Workplace safety" body="Temporary and project-based workers may work beside employees, operate equipment, handle inventory, or access facilities." />
                    <RiskCard title="Data and financial access" body="Freelancers and contractors may handle customer records, payment information, HR files, credentials, or internal systems." />
                    <RiskCard title="Driving exposure" body="Delivery, transportation, courier, and field-service roles may require MVR checks and driver safety review." />
                  </div>
                </Section>

                <Section title="Gig worker does not mean no screening responsibility">
                  <p>
                    A common mistake is assuming that background screening only applies to traditional W-2 employees. In practice, businesses may still need to screen non-employee workers when the role creates meaningful risk. The screening package should be based on the role, not just the worker classification.
                  </p>
                  <p>
                    For example, a remote designer who never touches customer data may not need the same screening package as a contractor who enters client facilities. A delivery driver may need a motor vehicle record check. A healthcare contractor may need sanctions screening, license verification, or OIG-related checks. A volunteer or temporary worker around vulnerable populations may require a more careful review.
                  </p>
                </Section>

                <Section title="What employers should consider before screening contingent workers">
                  <Checklist
                    items={[
                      "Will this person interact with customers, patients, students, or vulnerable populations?",
                      "Will this person enter homes, offices, job sites, facilities, or restricted areas?",
                      "Will this person drive on behalf of the company or use a personal vehicle for work?",
                      "Will this person handle money, inventory, payment information, or company property?",
                      "Will this person access confidential data, employee records, or customer information?",
                      "Does the role have industry-specific compliance needs such as healthcare, transportation, education, or financial services?",
                      "Is the screening process consistent with FCRA disclosure, authorization, and adverse action requirements?",
                    ]}
                  />
                </Section>

                <Section title="The FCRA still matters">
                  <p>
                    When a third-party background screening company is used for employment-related purposes, employers should treat the process with FCRA care. That means clear disclosure, written authorization, proper review, and compliant adverse action steps when a background report affects a decision.
                  </p>
                  <p>
                    The label “contractor” does not make compliance disappear. If the background report is being used to decide whether someone can perform work, access a role, or remain eligible for an assignment, the process should be handled carefully.
                  </p>
                </Section>

                <Section title="How to build a practical screening policy for gig and contingent workers">
                  <div className="space-y-4">
                    <NumberedStep number="1" title="Classify roles by risk" body="Group contingent roles by access level: low risk, customer-facing, driving, financial/data access, vulnerable population access, or regulated industry work." />
                    <NumberedStep number="2" title="Match screening to the role" body="Do not use one generic package for every worker. Choose criminal searches, MVR checks, employment verification, license checks, sanctions checks, or drug screening based on the job duties." />
                    <NumberedStep number="3" title="Use a consistent process" body="Apply the same screening standard to similar roles. Consistency helps reduce compliance risk and makes the process easier to defend." />
                    <NumberedStep number="4" title="Document decisions" body="Keep records of what was screened, why it was screened, and how decisions were made when a report returned possible risk information." />
                    <NumberedStep number="5" title="Review the policy regularly" body="Gig work changes quickly. Review screening packages when roles, customer access, locations, or compliance obligations change." />
                  </div>
                </Section>

                <Section title="Industries with higher contingent workforce screening needs">
                  <Checklist
                    items={[
                      "Staffing agencies placing workers into client environments",
                      "Transportation, delivery, courier, and logistics companies",
                      "Healthcare staffing and home health providers",
                      "Hospitality, event, and seasonal employers",
                      "Churches, nonprofits, and volunteer organizations",
                      "Construction, maintenance, cleaning, and field-service companies",
                      "Companies using contractors for IT, finance, HR, or customer data access",
                    ]}
                  />
                </Section>

                <ConclusionBox
                  title="The contingent workforce is flexible, but the risk is real"
                  body="Gig workers, contractors, temporary staff, and freelancers can help a business move faster. But speed should not come at the expense of safety, compliance, or customer trust. A role-based background screening process helps employers protect their workforce, customers, and reputation while still using flexible labor effectively."
                />

                <div className="mt-8 p-6 rounded-xl border border-green-200 bg-green-50">
                  <p className="text-sm text-gray-600">
                    <strong>SaffHire helps employers build role-based screening packages</strong> for employees, contractors, temporary workers, volunteers, drivers, healthcare workers, and contingent workforce programs. <a href="/contact" className="text-green-700 font-semibold hover:underline">Contact SaffHire</a> to review the right package for your workforce.
                  </p>
                </div>

                <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-6">
                  Disclaimer: This article is provided for informational purposes only and does not constitute legal advice. Employers should consult qualified employment counsel for guidance specific to their hiring and contractor-screening practices.
                </p>
              </div>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-100 p-6 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Related resources</h3>
                  <div className="space-y-3 text-sm">
                    <a className="block text-green-700 hover:underline" href="/background-screening-guides">Background Screening Guides</a>
                    <a className="block text-green-700 hover:underline" href="/small-business-background-checks">Small Business Background Checks</a>
                    <a className="block text-green-700 hover:underline" href="/volunteer-background-checks">Volunteer Background Checks</a>
                    <a className="block text-green-700 hover:underline" href="/mvr-checks">MVR / Driving Records</a>
                    <a className="block text-green-700 hover:underline" href="/contact">Request a Quote</a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

function RiskCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}

function NumberedStep({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="flex gap-5 p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white text-sm" style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>{number}</div>
      <div>
        <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-gray-700">
          <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ConclusionBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl p-8" style={{ backgroundColor: "#f8fafc", borderTop: "3px solid #22c55e" }}>
      <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h3>
      <p className="text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
}
