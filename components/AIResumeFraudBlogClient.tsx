"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Tag, BookOpen } from "lucide-react";

export default function AIResumeFraudBlogClient() {
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
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>
              <Tag size={10} />
              Hiring Risk
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 max-w-4xl leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            AI-Powered Resume Fraud: The New Hiring Challenge Employers Can’t Ignore
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} />May 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />8 min read</span>
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
                  AI is changing the hiring process. For job seekers, that is not always a bad thing. AI can help candidates improve grammar, organize experience, build professional resumes, and write better cover letters. But there is a growing problem employers need to be aware of: AI is also making it easier to exaggerate, manipulate, and even fabricate qualifications.
                </p>

                <Section title="The resume has always been a marketing tool">
                  <p>
                    Resumes have never been perfect. Candidates have always tried to present themselves in the best possible light. They highlight achievements, downplay weaknesses, and use impressive language to stand out.
                  </p>
                  <p>
                    The difference today is that AI can help applicants create highly polished resumes in minutes, regardless of whether the information is complete, accurate, or properly supported. What used to take hours now takes seconds.
                  </p>
                </Section>

                <Section title="How AI is changing resume fraud">
                  <p>
                    Modern AI tools can generate professional resumes that look clean, confident, and highly tailored to a job description. That means hiring teams may see more candidates who appear qualified on paper but cannot verify the experience, skills, or credentials they claim.
                  </p>
                  <div className="space-y-4">
                    <RiskCard title="Inflated job duties" body="A candidate may use AI to turn limited experience into executive-level language that sounds more advanced than the actual role." />
                    <RiskCard title="Fabricated skills" body="AI can insert keywords, software platforms, certifications, and technical skills that match a job posting even if the candidate has little or no hands-on experience." />
                    <RiskCard title="Polished employment gaps" body="Resume gaps can be rewritten in a way that makes the timeline appear cleaner or less concerning than it really is." />
                    <RiskCard title="Fake project descriptions" body="AI can create detailed project summaries that sound real, making it harder for hiring managers to separate genuine experience from invented claims." />
                  </div>
                </Section>

                <Section title="Why employers should care">
                  <p>
                    Resume fraud is not just an HR inconvenience. A bad hire can create financial loss, compliance problems, safety issues, client dissatisfaction, and damage to company culture. The risk is even higher when the role involves customer trust, sensitive data, regulated work, driving, healthcare, finance, or unsupervised access.
                  </p>
                  <Checklist
                    items={[
                      "The candidate may not have the experience required to perform the job safely or effectively.",
                      "A false credential may expose the company to compliance risk.",
                      "A fabricated employment history may hide past performance or integrity issues.",
                      "A bad hire can damage customer relationships and team trust.",
                      "Hiring teams may waste time interviewing candidates who only look qualified because AI made the resume stronger.",
                    ]}
                  />
                </Section>

                <Section title="Employment and education verification matter more now">
                  <p>
                    As AI-generated resumes become more common, verification becomes more important. Employers should not rely only on how polished a resume looks. They should verify the claims that matter most to the role.
                  </p>
                  <p>
                    Employment verification can confirm where the candidate worked, when they worked there, and in some cases the title or role held. Education verification can confirm degrees, attendance, diplomas, and credentials. Professional license verification can help confirm whether a license is active and appropriate for the position.
                  </p>
                </Section>

                <Section title="What employers should verify before making a hiring decision">
                  <Checklist
                    items={[
                      "Employment history for key roles listed on the resume",
                      "Job titles and dates of employment where available",
                      "Education credentials and degrees required for the position",
                      "Professional licenses or certifications required for regulated roles",
                      "Criminal background check results when relevant and legally permissible",
                      "Motor vehicle records for driving roles",
                      "Healthcare sanctions, OIG checks, or license checks for healthcare roles",
                    ]}
                  />
                </Section>

                <Section title="Interviewing should also change">
                  <p>
                    AI-generated resumes may sound impressive, but candidates still need to explain their actual work. Hiring managers should ask specific, experience-based questions that require real examples.
                  </p>
                  <Checklist
                    items={[
                      "Ask the candidate to describe a project from the resume in detail.",
                      "Ask what tools they used, what they personally did, and what the outcome was.",
                      "Ask follow-up questions that go beyond buzzwords.",
                      "Compare interview answers with verified work history.",
                      "Be cautious when a candidate cannot explain the experience listed on the resume.",
                    ]}
                  />
                </Section>

                <Section title="AI is not the enemy, but trust still needs verification">
                  <p>
                    AI can help honest applicants communicate better. It can help people organize their experience and reduce grammar mistakes. The problem is not the use of AI by itself. The problem is when AI is used to create a false impression of qualifications, experience, or credibility.
                  </p>
                  <p>
                    Employers do not need to reject every resume that appears AI-assisted. They need a hiring process that verifies important claims before the company relies on them.
                  </p>
                </Section>

                <ConclusionBox
                  title="The stronger the resume, the more important verification becomes"
                  body="AI-powered resumes can make candidates look polished, but employers still need to confirm the facts. Employment verification, education verification, license checks, background screening, and structured interviews help employers separate real qualifications from AI-enhanced claims. In a hiring market where resumes are easier than ever to polish, verification is one of the best protections against costly hiring mistakes."
                />

                <div className="mt-8 p-6 rounded-xl border border-green-200 bg-green-50">
                  <p className="text-sm text-gray-600">
                    <strong>SaffHire helps employers verify candidate claims</strong> through employment verification, education verification, criminal background checks, MVR checks, healthcare screening, and custom background screening packages. <a href="/contact" className="text-green-700 font-semibold hover:underline">Contact SaffHire</a> to build the right screening package for your hiring process.
                  </p>
                </div>

                <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-6">
                  Disclaimer: This article is provided for informational purposes only and does not constitute legal advice. Employers should consult qualified employment counsel before making hiring decisions based on background screening results.
                </p>
              </div>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-100 p-6 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Related resources</h3>
                  <div className="space-y-3 text-sm">
                    <a className="block text-green-700 hover:underline" href="/employment-verification">Employment Verification</a>
                    <a className="block text-green-700 hover:underline" href="/education-verification">Education Verification</a>
                    <a className="block text-green-700 hover:underline" href="/small-business-background-checks">Small Business Background Checks</a>
                    <a className="block text-green-700 hover:underline" href="/background-screening-guides">Background Screening Guides</a>
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
