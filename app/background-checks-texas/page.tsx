import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { texasMeta, texasPage, texasPath } from "@/data/texasPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: texasMeta.title,
  description: texasMeta.description,
};

export default function Page() {
  const service = {
    ...serviceSchema({ name: "Texas Employment Background Checks", description: texasMeta.description, path: texasPath }),
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "Country", name: "United States" },
    ],
  };
  const schemas = [
    service,
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Texas Background Checks", path: texasPath },
    ]),
  ];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ContentPage data={texasPage} />
    </>
  );
}
