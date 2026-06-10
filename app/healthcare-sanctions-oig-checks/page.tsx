import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoAuthorityPageClient from "@/components/SeoAuthorityPageClient";
import { getSeoAuthorityPage } from "@/data/seoAuthorityPages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structuredData";

const page = getSeoAuthorityPage("/healthcare-sanctions-oig-checks");

export const metadata: Metadata = {
  title: page?.metaTitle || "Healthcare Sanctions and OIG Checks",
  description: page?.description,
};

export default function Page() {
  if (!page) notFound();

  const schemas = [
    serviceSchema({ name: page.title, description: page.description, path: page.path }),
    faqSchema(page.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.title, path: page.path },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SeoAuthorityPageClient page={page} />
    </>
  );
}
