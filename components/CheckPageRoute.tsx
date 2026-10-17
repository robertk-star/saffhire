import ContentPage from "@/components/ContentPage";
import type { CheckPage } from "@/data/checkPages";
import { breadcrumbSchema, serviceSchema } from "@/lib/structuredData";

/** Renders a standalone check-type page with Service + BreadcrumbList JSON-LD (FAQPage comes from PageFAQ). */
export default function CheckPageRoute({ page }: { page: CheckPage }) {
  const crumbs = [{ name: "Home", path: "/" }];
  if (page.parent) crumbs.push(page.parent);
  crumbs.push({ name: page.serviceName, path: page.path });
  const schemas = [serviceSchema({ name: page.serviceName, description: page.description, path: page.path }), breadcrumbSchema(crumbs)];
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ContentPage data={page} />
    </>
  );
}
