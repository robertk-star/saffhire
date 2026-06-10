import type { Metadata } from "next";
import BackgroundScreeningGuidesClient from "@/components/BackgroundScreeningGuidesClient";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Background Screening Guides for Employers",
  description:
    "Employer guides for background screening, criminal searches, county checks, healthcare sanctions, volunteer screening, small business screening, and FCRA-aware hiring workflows.",
};

export default function Page() {
  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Background Screening Guides", path: "/background-screening-guides" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BackgroundScreeningGuidesClient />
    </>
  );
}
