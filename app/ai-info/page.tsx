import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { aiInfoMeta, aiInfoPage } from "@/data/aiInfoPage";
import { breadcrumbSchema, organizationSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = { title: aiInfoMeta.title, description: aiInfoMeta.description };

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${SITE_URL}/ai-info#webpage`,
      url: `${SITE_URL}/ai-info`,
      name: aiInfoMeta.title,
      description: aiInfoMeta.description,
      about: { "@id": organizationSchema["@id"] },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "AI Information", path: "/ai-info" },
    ]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ContentPage data={aiInfoPage} />
    </>
  );
}
