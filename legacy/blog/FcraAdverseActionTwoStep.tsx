import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import type { BlogPostMeta } from "../blogRegistry";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function NumberedCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-5 p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white text-sm" style={{ backgroundColor: "#17843f", fontFamily: "'Montserrat', sans-serif" }}>{number}</div>
      <div>
        <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function WarningBox({ headline, body }: { headline: string; body: string }) {
  return (
    <div className="rounded-xl p-6 flex gap-4" style={{ backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b" }}>
      <AlertTriangle size={22} className="flex-shrink-0 mt-0.5" style={{ color: "#d97706" }} />
      <div>
        <p className="font-bold text-gray-900 mb-1 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{headline}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
      </div>
    </div>
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

function BlogLink({ slug, title }: { slug: string; title: string }) {
  return <a href={`/blog/${slug}`} className="text-green-600 hover:text-green-700 hover:underline font-medium">{title}</a>;
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

const slug = "fcra-adverse-action-two-step-notice-requirements-2026";
const title = "The FCRA Adverse Action Two-Step: Why One Notice Is Not Enough (And What It's Costing You)";
const description =
  "Most employers still get FCRA adverse action wrong. Learn the two-step notice requirement. The employer, not SaffHire, sends both notices.";

export default function FcraAdverseActionTwoStep() {
  return (
    <div
      className="space-y-8"
      style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}
    >
      <p className="text-lg text-gray-700 leading-relaxed font-medium">
        Most employers think FCRA adverse action is a one-step process. You find something disqualifying in the background check. You send a rejection email. Done. This assumption is costing employers thousands of dollars in settlements and fines in 2026. The FCRA actually requires two separate notices, sent at two different times, for two different purposes. Skip either one, and you have violated federal law. Get the sequence wrong, and you have compounded the violation. This post explains exactly what the two-step process is, why employers keep getting it wrong, and what it is costing them.
      </p>
      <p>
        The employer sends both notices. SaffHire does not send, handle, or manage pre-adverse or adverse action notices for clients. That duty stays with the employer.
      </p>

      <Section title="The Two-Step Adverse Action Process Explained">
        <p>
          The FCRA requires employers to provide two distinct notices before making a final hiring decision based on background check information. These are not optional steps or procedural niceties. They are legal requirements that the Federal Trade Commission, state attorneys general, and private plaintiffs' attorneys are now actively enforcing.
        </p>

        <p>
          The two steps are the pre-adverse action notice and the adverse action notice. They serve different purposes, contain different information, and must be sent at different times in the hiring process. Understanding the distinction is the difference between a compliant hiring process and a lawsuit.
        </p>

        <div className="space-y-4">
          <NumberedCard
            number="1"
            title="Step 1: Pre-Adverse Action Notice (Before You Decide)"
            description="As soon as you receive the background check report and identify information that you plan to use to reject the candidate, you must send a pre-adverse action notice. This notice must include a copy of the background report, a summary of the candidate's rights under the FCRA, and information about how to dispute inaccurate information. You must give the candidate at least 5 business days to review the report and respond before you make your final decision."
          />
          <NumberedCard
            number="2"
            title="Step 2: Adverse Action Notice (After You Decide)"
            description="After the dispute period expires and you have made your final decision to reject the candidate, you must send an adverse action notice. This notice must explain the specific findings that led to rejection, clarify that the decision was based on information in the background report, provide the name and contact information of the screening company, and inform the candidate of their right to obtain a free copy of the report and dispute inaccurate information."
          />
        </div>
      </Section>

      <Section title="Why Employers Get This Wrong">
        <p>
          The two-step requirement seems straightforward in theory. In practice, employers violate it constantly. Here are the most common mistakes:
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-red-200 bg-red-50">
            <h4 className="font-bold text-red-900 mb-2">Mistake 1: Sending Only One Notice</h4>
            <p className="text-sm text-red-700">
              Many employers send a single rejection email that attempts to serve as both the pre-adverse action notice and the adverse action notice. This violates the FCRA because it does not give the candidate the required 5 business days to dispute the information before the final decision is made. The FTC considers this a direct violation.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-red-200 bg-red-50">
            <h4 className="font-bold text-red-900 mb-2">Mistake 2: Sending the Pre-Adverse Action Notice Too Late</h4>
            <p className="text-sm text-red-700">
              Some employers wait until after they have decided to reject the candidate before sending the pre-adverse action notice. This defeats the entire purpose of the pre-adverse action notice, which is to give the candidate a chance to dispute information before the decision is made. The FCRA requires the pre-adverse action notice to be sent before the final decision, not after.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-red-200 bg-red-50">
            <h4 className="font-bold text-red-900 mb-2">Mistake 3: Not Including Required Information in Either Notice</h4>
            <p className="text-sm text-red-700">
              The pre-adverse action notice must include a copy of the background report and a summary of FCRA rights. The adverse action notice must include specific findings and the screening company's contact information. Omitting any of this information violates the FCRA. Many employers send notices that lack one or more of these required elements.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-red-200 bg-red-50">
            <h4 className="font-bold text-red-900 mb-2">Mistake 4: Not Waiting the Full 5 Business Days</h4>
            <p className="text-sm text-red-700">
              The FCRA requires at least 5 business days for the candidate to dispute information after receiving the pre-adverse action notice. Some employers wait only 2 or 3 days before sending the adverse action notice. This violates the statute. The 5 business days is a minimum, not a guideline.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-red-200 bg-red-50">
            <h4 className="font-bold text-red-900 mb-2">Mistake 5: Sending Notices to the Wrong Contact Information</h4>
            <p className="text-sm text-red-700">
              If the pre-adverse action or adverse action notice does not reach the candidate, it is as if it was never sent. Some employers send notices to email addresses that bounce or phone numbers that are no longer valid. The FCRA requires reasonable effort to ensure the candidate actually receives the notices.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What the Pre-Adverse Action Notice Must Include">
        <p>
          The pre-adverse action notice is the first critical step. It must contain specific information, formatted in a specific way, and be sent at a specific time. Here is exactly what must be included:
        </p>

        <CheckList
          items={[
            "A clear statement that adverse action may be taken based on information in the background report",
            "A copy of the background report itself (the actual report from the screening company)",
            "A Summary of Your Rights Under the Fair Credit Reporting Act. A screening company may give that summary to the employer with the report. The employer, not SaffHire, puts it in the notice the employer sends.",
            "Information about how the candidate can dispute inaccurate information in the report",
            "The name, address, and phone number of the screening company that prepared the report",
            "A statement that the candidate has the right to contact the screening company to dispute any information",
            "A reasonable amount of time (at least 5 business days) for the candidate to review and respond before adverse action is taken",
          ]}
        />

        <WarningBox
          headline="The Pre-Adverse Action Notice Is Not Optional"
          body="Some employers think they can skip the pre-adverse action notice if the background check finding is obviously disqualifying (e.g., a felony conviction). This is incorrect. The FCRA requires the pre-adverse action notice regardless of how serious the finding is. Skipping this step is a direct violation."
        />
      </Section>

      <Section title="What the Adverse Action Notice Must Include">
        <p>
          After the dispute period expires and you have made your final decision, the adverse action notice must be sent. This is the second critical step. It must include:
        </p>

        <CheckList
          items={[
            "A clear statement that adverse action has been taken (the candidate is not being hired)",
            "The specific reason(s) for the adverse action based on information in the background report",
            "A statement that the decision was based in whole or in part on information obtained from the background report",
            "The name, address, and phone number of the screening company that prepared the report",
            "A statement that the screening company did not make the decision and cannot explain the employer's decision",
            "Information about the candidate's right to dispute inaccurate information with the screening company",
            "Information about the candidate's right to obtain a free copy of the background report from the screening company",
            "Information about the candidate's right to add a statement to their file if they dispute the accuracy of the report",
          ]}
        />

        <p>
          The adverse action notice must be specific. Saying 'We found disqualifying information in your background check' is not sufficient. You must explain exactly what information led to the rejection. For example: 'We did not move forward with your application because the background check revealed a felony conviction for armed robbery in 2018. This conviction is relevant to the position because the role requires handling cash and working with customers.'
        </p>
      </Section>

      <Section title="The Timeline: When Each Notice Must Be Sent">
        <p>
          The timing of these notices is critical. Send them in the wrong order or at the wrong time, and you have violated the FCRA. Here is the exact timeline:
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#0f172a" }}>
                <th className="text-left text-white font-bold px-5 py-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Event</th>
                <th className="text-left text-white font-bold px-5 py-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Timing</th>
                <th className="text-left text-white font-bold px-5 py-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Background report received", "Day 0", "Review report for disqualifying information"],
                ["Disqualifying info identified", "Day 0", "Employer sends the pre-adverse action notice"],
                ["Pre-adverse action notice sent", "Day 1", "Candidate receives notice and begins 5-business-day review period"],
                ["Dispute period", "Days 1-5", "Candidate has 5 business days to review and respond"],
                ["Dispute period expires", "Day 6", "You can now make final decision"],
                ["Final decision made", "Day 6-7", "Employer sends the adverse action notice"],
                ["Adverse action notice sent", "Day 7", "Candidate receives final rejection notice"],
              ].map(([event, timing, action], i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                  <td className="px-5 py-4 font-semibold text-gray-900">{event}</td>
                  <td className="px-5 py-4 text-gray-600">{timing}</td>
                  <td className="px-5 py-4 text-gray-600">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4">
          The key point: the pre-adverse action notice must be sent before you make your final decision. The adverse action notice must be sent after the dispute period expires and you have made your final decision. These are two separate events, separated by at least 5 business days.
        </p>
      </Section>

      <Section title="Real-World Consequences of Getting It Wrong">
        <p>
          The FTC and state attorneys general are now actively enforcing the two-step requirement. Here are real examples of what employers are facing:
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-orange-200 bg-orange-50">
            <h4 className="font-bold text-orange-900 mb-2">Example 1: Single Notice Violation</h4>
            <p className="text-sm text-orange-700">
              An employer sends a single email that says 'We received your background check and found disqualifying information. We are not moving forward with your application.' This email attempts to serve as both the pre-adverse action notice and the adverse action notice. The FTC considers this a violation because it does not give the candidate 5 business days to dispute the information before the decision is made. The employer faces a settlement of $50,000 to $100,000 plus class action liability.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-orange-200 bg-orange-50">
            <h4 className="font-bold text-orange-900 mb-2">Example 2: Missing Information Violation</h4>
            <p className="text-sm text-orange-700">
              An employer sends a pre-adverse action notice but fails to include a copy of the background report or information about dispute rights. The candidate cannot properly review the report or understand their rights. The FTC investigates and finds this is a pattern across 50+ candidates. The employer faces a $250,000 settlement plus required remediation.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-orange-200 bg-orange-50">
            <h4 className="font-bold text-orange-900 mb-2">Example 3: Insufficient Wait Time</h4>
            <p className="text-sm text-orange-700">
              An employer sends the pre-adverse action notice on Monday and the adverse action notice on Wednesday (only 2 business days later). The FCRA requires at least 5 business days. A private plaintiffs' firm files a class action on behalf of all candidates who received notices with insufficient wait time. The employer settles for $500,000 plus attorney fees.
            </p>
          </div>
        </div>
      </Section>

      <Section title="How to Implement the Two-Step Process Correctly">
        <p>
          Implementing the two-step process correctly requires a documented system and clear communication. Here is how to do it:
        </p>

        <div className="space-y-4">
          <NumberedCard
            number="1"
            title="Create a Pre-Adverse Action Notice Template"
            description="Work with your own legal counsel to create the employer's template. Include a copy of the background report, a Summary of Your Rights, dispute instructions, the screening company's contact information, and a clear statement of the 5-business-day review period. SaffHire does not draft, send, or manage these notices."
          />
          <NumberedCard
            number="2"
            title="Create an Adverse Action Notice Template"
            description="Create a separate template for the adverse action notice that includes all required elements: specific findings, statement that the decision was based on the background report, screening company contact information, and dispute rights. This template must be specific to each candidate and each finding."
          />
          <NumberedCard
            number="3"
            title="Set Up a Calendar System"
            description="When you send the pre-adverse action notice, immediately set a calendar reminder for 5 business days later. This reminder should trigger a review of whether the candidate has disputed any information. If no dispute has been received, you can then send the adverse action notice."
          />
          <NumberedCard
            number="4"
            title="Document Everything"
            description="Keep a record of when each notice was sent, to whom it was sent, and how it was delivered (email, certified mail, etc.). If the FTC or a plaintiff's attorney questions your process, this documentation is your defense."
          />
          <NumberedCard
            number="5"
            title="Train Your HR Team"
            description="Make sure everyone involved in the hiring process understands the two-step requirement. This includes HR staff, hiring managers, and anyone else who touches the background check process. A single mistake by one person can trigger an FTC investigation."
          />
        </div>
      </Section>

      <Section title="Common Questions About the Two-Step Process">
        <p>
          Employers often ask specific questions about how to implement the two-step process. Here are the answers to the most common ones:
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="font-bold text-gray-900 mb-2">Q: Can I send the pre-adverse action notice and adverse action notice on the same day?</h4>
            <p className="text-sm text-gray-700">
              No. The FCRA requires at least 5 business days between the pre-adverse action notice and the adverse action notice. This is not a guideline. It is a legal requirement. If you send both on the same day, you have violated the FCRA.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="font-bold text-gray-900 mb-2">Q: What if the candidate disputes the information? Do I still have to send the adverse action notice?</h4>
            <p className="text-sm text-gray-700">
              If the candidate disputes the information and the screening company corrects it, you must reassess your decision. If the corrected information is no longer disqualifying, you must hire the candidate or send a new pre-adverse action notice with the corrected information. If the information is still disqualifying after correction, you can send the adverse action notice.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="font-bold text-gray-900 mb-2">Q: What if the candidate does not respond to the pre-adverse action notice?</h4>
            <p className="text-sm text-gray-700">
              If the candidate does not respond within 5 business days, you can proceed with the adverse action notice. The candidate's failure to respond does not waive their rights. You still must send the adverse action notice with all required information.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="font-bold text-gray-900 mb-2">Q: Can I send the notices electronically, or do they have to be in writing?</h4>
            <p className="text-sm text-gray-700">
              The FCRA requires written notices. Electronic delivery (email) is acceptable as long as the candidate can print and retain a copy. However, you must ensure the email actually reaches the candidate. If the email bounces or goes to spam, you have not complied with the requirement to provide the notice.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="font-bold text-gray-900 mb-2">Q: Do I have to send the adverse action notice if I decide to hire the candidate after the pre-adverse action notice?</h4>
            <p className="text-sm text-gray-700">
              No. If you decide to hire the candidate after reviewing the background check, you do not need to send an adverse action notice. The adverse action notice is only required if you decide not to hire based on information in the background report.
            </p>
          </div>
        </div>
      </Section>

      <Section title="The Connection to Your Broader FCRA Compliance Program">
        <p>
          The two-step adverse action process is just one piece of a comprehensive FCRA compliance program. If you want to understand how this fits into your overall compliance obligations, read our post on the <BlogLink slug="fcra-compliance-checklist-employers-2026" title="FCRA Compliance Checklist for Employers in 2026" />. That post covers the entire hiring process from initial disclosure through final documentation.
        </p>

        <p>
          For a deeper dive into how FCRA enforcement is changing in 2026, see our post on <BlogLink slug="fcra-compliance-2026-background-screening-employers" title="The FCRA Is Getting Stricter in 2026" />. That post explains the FTC's enforcement priorities and real-world consequences of non-compliance.
        </p>
      </Section>

      <ConclusionBox
        title="The Two-Step Process Is Not Optional"
        body="The FCRA requires two separate notices, sent at two different times, for two different purposes. This is not a procedural nicety or a best practice. It is a legal requirement that the FTC, state attorneys general, and private plaintiffs are now actively enforcing. Employers who skip either step or get the timing wrong are facing settlements of $50,000 to $500,000 or more. The cost of compliance is minimal. The cost of non-compliance is substantial. Implement the two-step process correctly, document it, and train your team. This is one of the most important steps you can take to protect your company in 2026."
      />

      <div className="mt-8 p-6 rounded-xl border border-green-200 bg-green-50">
        <p className="text-sm text-gray-600">
          <strong>Use this as your checklist for every adverse action.</strong> Before the employer sends a pre-adverse action notice or an adverse action notice, review this post. Include the required information, wait the full 5 business days, and send the notices in order. SaffHire does not send these notices.
        </p>
      </div>

      <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-6">
        Disclaimer: This article is provided for informational purposes only and does not constitute legal advice. Employers should consult qualified employment counsel before making hiring decisions based on background check results or implementing FCRA compliance procedures.
      </p>
    </div>
  );
}

export const adverseTwoStepListing: BlogPost = {
  slug,
  title,
  excerpt: description,
  category: "Compliance",
  date: "May 7, 2026",
  readTime: "10 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-fcra-adverse-two-step.webp",
};

export const adverseTwoStepEntry: BlogPostMeta = {
  slug,
  title,
  metaDescription: description,
  category: "Compliance",
  date: "May 7, 2026",
  readTime: "10 min read",
  author: "SaffHire Compliance Team",
  image: "/images/blog-fcra-adverse-two-step.webp",
  featuredImageSuggestion: "Timeline showing pre-adverse action and adverse action notice process",
  keyTakeaways: [
    "The employer, not SaffHire, sends both the pre-adverse action notice and the adverse action notice",
    "The pre-adverse action notice goes out before the final decision, with time for the candidate to respond",
    "The adverse action notice goes out after that waiting period and states the specific findings",
    "One combined notice does not meet the two-step FCRA sequence",
    "SaffHire does not send, handle, or manage these notices for clients",
  ],
  relatedTags: ["FCRA", "Compliance", "Adverse Action", "Notice Requirements", "2026"],
  ArticleComponent: FcraAdverseActionTwoStep,
};
