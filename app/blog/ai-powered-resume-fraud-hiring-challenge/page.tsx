import type { Metadata } from "next";
import AIResumeFraudBlogClient from "@/components/AIResumeFraudBlogClient";

const title = "AI-Powered Resume Fraud: The New Hiring Challenge Employers Can’t Ignore";
const description = "AI-generated resumes can make candidates look more qualified than they are. Learn how employers can use verification and background screening to reduce hiring risk.";

export const metadata: Metadata = {
  title,
  description,
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: "2026-05-25",
    author: {
      "@type": "Organization",
      name: "SaffHire Compliance Team",
    },
    publisher: {
      "@type": "Organization",
      name: "SaffHire Background Screening",
      url: "https://www.saffhire.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.saffhire.com/blog/ai-powered-resume-fraud-hiring-challenge",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AIResumeFraudBlogClient />
    </>
  );
}
