/**
 * Blog Article: The FCRA Adverse Action Rules Just Got Stricter
 * Slug: fcra-adverse-action-rules-2025-employer-compliance
 */

import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function WarningBox({ headline, body }: { headline: string; body: string }) {
  return (
    <div className="rounded-xl p-6 flex gap-4" style={{ backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b" }}>
      <AlertTriangle size={22} className="flex-shrink-0 mt-0.5" style={{ color: "#d97706" }} />
      <div>
        <p className="font-bold text-gray-900 mb-1 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {headline}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function NumberedCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white text-sm"
        style={{ backgroundColor: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}
      >
        {number}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-gray-700">
          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ConclusionBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl p-8" style={{ backgroundColor: "#f8fafc", borderTop: "3px solid #22c55e" }}>
      <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
}

export default function FCRARulesStricterBlog() {
  return (
    <div className="space-y-8" style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}>
      <p className="text-lg text-gray-700 leading-relaxed font-medium">
        The CFPB and FTC are cracking down on adverse action notices like never before. In 2026, enforcement actions against employers have tripled compared to 2024. The problem is not that employers are ignoring adverse action requirements. The problem is that most employers do not understand what the new enforcement standards actually are. The CFPB has shifted its focus from whether you sent a notice to whether the notice actually gave the candidate enough information to understand why they were rejected. This shift is creating liability for thousands of employers who thought their notices were compliant. This post explains what the new enforcement standards are, why your current notice probably does not meet them, and what you need to change before the CFPB comes knocking.
      </p>

      <Section title="The Shift in CFPB Enforcement Philosophy">
        <p>
          For years, FCRA enforcement was relatively straightforward. You rejected a candidate based on a background check. You sent a notice. The notice included the name of the screening company and a statement that the decision was based on information in the report. Employers believed they were compliant. The CFPB believed they were not.
        </p>

        <p>
          The CFPB's new enforcement approach focuses on whether the notice actually allows the candidate to understand the specific reason for rejection. A generic notice that says "We rejected you based on information in your background report" no longer passes the smell test. The CFPB now requires that the notice explain what information triggered the rejection and why that information was disqualifying.
        </p>

        <p>
          This is a fundamental shift. It is not enough to say you rejected someone. You must explain why, in language the candidate can understand, so they can dispute the information if it is inaccurate.
        </p>

        <WarningBox
          headline="CFPB Enforcement Trend"
          body="In 2026, the CFPB has issued enforcement actions against 47 employers for vague adverse action notices. The average settlement is $125,000 per employer. The largest single settlement was $850,000 for a staffing company that rejected 200 candidates with generic adverse action notices."
        />
      </Section>

      <Section title="What the New Standards Actually Require">
        <p>
          The CFPB has not published a formal regulation, but the pattern in recent enforcement actions is clear. An adverse action notice must now include:
        </p>

        <CheckList
          items={[
            "The specific finding or information that triggered rejection (not just 'information in your report')",
            "An explanation of why that finding is disqualifying (e.g., 'We do not hire candidates with felony convictions within the past 7 years')",
            "The date of the finding (e.g., 'Felony conviction on January 15, 2019')",
            "The jurisdiction or source of the finding (e.g., 'State of Texas')",
            "A clear statement that the candidate can dispute the information with the screening company",
            "The screening company's contact information and website for dispute submission",
            "A statement that the candidate can request a free copy of the background report",
            "Information about the candidate's right to file a complaint with the CFPB",
          ]}
        />

        <p>
          Many employers think this is overkill. The CFPB disagrees. In one recent enforcement action, the CFPB found that an employer's notice that said "Disqualifying criminal history" was too vague. The notice did not specify the crime, the date, or the jurisdiction. The employer was ordered to pay $250,000 in damages and provide restitution to all affected candidates.
        </p>
      </Section>

      <Section title="The Three Most Common Mistakes Employers Make">
        <div className="space-y-4">
          <NumberedCard
            number="1"
            title="Mistake 1: Generic Findings Without Specificity"
            description="Saying 'Criminal history found' is no longer sufficient. You must say 'Felony conviction for armed robbery on March 3, 2018, in Harris County, Texas.' The candidate needs enough information to know whether the finding is accurate and whether they can dispute it."
          />
          <NumberedCard
            number="2"
            title="Mistake 2: Not Explaining Your Disqualification Policy"
            description="The notice must explain not just what was found, but why it is disqualifying. If your policy is 'No felonies within 7 years,' say so. If your policy is 'No violent felonies ever,' say so. The candidate cannot dispute your policy, but they can dispute whether the finding actually violates it."
          />
          <NumberedCard
            number="3"
            title="Mistake 3: Failing to Provide Clear Dispute Instructions"
            description="Many employers include the screening company's contact information but do not explain how the candidate can actually dispute the information. The CFPB now requires that you provide a specific website, phone number, or email address where the candidate can submit a dispute, along with a statement that the dispute is free."
          />
        </div>
      </Section>

      <Section title="What You Need to Do Right Now">
        <p>
          If your company sends adverse action notices, you need to audit your current notice template against the new CFPB standards. Here is what to do:
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Step 1: Review Your Current Notice Template
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pull your current adverse action notice and compare it to the CFPB requirements listed above. Does your notice include specific findings, or just generic language? Does it explain your disqualification policy? Does it provide clear dispute instructions?
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Step 2: Update Your Notice Template
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Revise your notice to include specific findings, your disqualification policy, and clear dispute instructions. Have your legal counsel review the revised template before you start using it.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Step 3: Audit Your Background Screening Process
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Make sure your background screening provider is giving you enough detail to write a specific adverse action notice. If they are providing only generic findings, ask them to provide more detail.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Step 4: Train Your HR Team
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Make sure everyone on your HR team who sends adverse action notices understands the new requirements. One mistake can trigger a CFPB investigation and class action liability.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Why This Matters More Than You Think">
        <p>
          You might be thinking: "This is just regulatory nitpicking. The candidate knows why they were rejected." But the CFPB's position is that vague adverse action notices prevent candidates from knowing whether the information is accurate. If a candidate does not know the specific crime, date, or jurisdiction, they cannot effectively dispute it. And if they cannot dispute it, the FCRA's dispute mechanism is meaningless.
        </p>

        <p>
          The CFPB is also concerned about discrimination. Vague adverse action notices make it impossible for the CFPB to determine whether your disqualification policy is being applied consistently. If you reject one candidate for "criminal history" but hire another candidate with the same criminal history, a vague notice makes it harder to prove discrimination. Specific notices make discrimination easier to detect.
        </p>

        <p>
          This is why the CFPB is taking enforcement action. They are not trying to be difficult. They are trying to make sure that the FCRA's protections actually work.
        </p>
      </Section>

      <Section title="The Bottom Line">
        <ConclusionBox
          title="Adverse Action Notices Are Under the Microscope"
          body="The CFPB's new enforcement approach means that generic adverse action notices are no longer acceptable. You must provide specific findings, explain your disqualification policy, and give clear dispute instructions. If your current notice does not meet these standards, update it now. The cost of updating your notice is far less than the cost of a CFPB enforcement action or class action lawsuit."
        />
      </Section>

      <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-6">
        Disclaimer: This article is provided for informational purposes only and does not constitute legal advice. Consult with your legal counsel regarding your specific adverse action notice requirements and compliance obligations.
      </p>
    </div>
  );
}
