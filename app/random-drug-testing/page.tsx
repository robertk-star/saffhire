import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckPageRoute from "@/components/CheckPageRoute";
import { getCheckPage } from "@/data/checkPages";

const page = getCheckPage("/random-drug-testing");

export const metadata: Metadata = { title: page?.metaTitle, description: page?.description };

export default function Page() {
  if (!page) notFound();
  return <CheckPageRoute page={page} />;
}
