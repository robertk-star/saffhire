import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { backgroundCheckCompaniesMeta as meta, backgroundCheckCompaniesPage } from "@/data/backgroundCheckCompaniesPage";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

/** Guide page. FAQPage JSON-LD comes from PageFAQ inside ContentPage. */
export default function Page() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: meta.name, path: meta.path },
    ]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ContentPage data={backgroundCheckCompaniesPage} />
    </>
  );
}
