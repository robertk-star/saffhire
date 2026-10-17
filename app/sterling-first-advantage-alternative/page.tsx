import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { altMeta, altPage, altPath } from "@/data/alternativePage";
import { breadcrumbSchema, serviceSchema } from "@/lib/structuredData";

// noindex for now (Robert, 2026-10-17); also excluded from the sitemap.
export const metadata: Metadata = {
  title: altMeta.title,
  description: altMeta.description,
  robots: { index: false, follow: true },
};

export default function Page() {
  const schemas = [
    serviceSchema({ name: "Employment Background Screening", description: altMeta.description, path: altPath }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Sterling / First Advantage Alternative", path: altPath },
    ]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ContentPage data={altPage} />
    </>
  );
}
