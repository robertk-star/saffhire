import type { Metadata } from "next";
import SeoAuthorityPageClient from "@/components/SeoAuthorityPageClient";
import { getSeoAuthorityPage } from "@/data/seoAuthorityPages";

const page = getSeoAuthorityPage("/small-business-background-checks");

export const metadata: Metadata = {
  title: page?.metaTitle || "Small Business Screening Services",
  description: page?.description,
};

export default function Page() {
  if (!page) return null;
  return <SeoAuthorityPageClient page={page} />;
}
