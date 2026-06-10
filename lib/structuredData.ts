const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.saffhire.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: "SaffHire Background Screening",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  telephone: "+1-888-588-1733",
  email: "info@saffhire.com",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frisco",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  sameAs: ["https://www.linkedin.com/company/saffhire"],
  description:
    "SaffHire provides fast, secure, and FCRA-compliant background screening services for employers across the United States.",
  knowsAbout: [
    "FCRA-compliant background screening",
    "criminal background checks",
    "employment verification",
    "education verification",
    "drug screening",
    "motor vehicle record checks",
    "healthcare sanctions screening",
    "staffing agency background checks",
    "transportation background checks",
    "volunteer background checks",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "SaffHire Background Screening",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-US",
};

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Background screening",
    url: `${siteUrl}${path}`,
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
