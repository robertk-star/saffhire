import type { Metadata } from "next";
import GigEconomyBlogClient from "@/components/GigEconomyBlogClient";

const title = "Gig Economy Background Screening: Contingent Workforce Liability Employers Can’t Ignore";
const description = "Gig workers, contractors, temporary staff, and freelancers can still create safety, customer, compliance, and reputation risk. Learn how employers should approach contingent workforce background screening.";

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
    datePublished: "2026-05-22",
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
      "@id": "https://www.saffhire.com/blog/gig-economy-background-screening-contingent-workforce-liability",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GigEconomyBlogClient />
    </>
  );
}
