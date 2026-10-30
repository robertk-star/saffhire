import { SITE_URL } from "./siteUrl";

const siteUrl = SITE_URL;

const founders = ["Robert Krebsbach", "John Waak", "Jody Thigpen"].map((name) => ({
  "@type": "Person",
  name,
  worksFor: { "@id": `${siteUrl}/#organization` },
}));

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: "SaffHire Background Screening",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/saffhire-logo.png`,
    width: 2637,
    height: 683,
  },
  image: `${siteUrl}/images/saffhire-logo.png`,
  telephone: "+1-888-588-1733",
  email: "info@saffhire.com",
  foundingDate: "2020",
  founder: founders,
  slogan: "Veteran-Owned Small Business",
  keywords: "Veteran-Owned, background screening, pre-employment screening",
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
  sameAs: [
    "https://www.linkedin.com/company/saffhire-background-screening",
    "https://www.facebook.com/saffhire",
    "https://www.google.com/search?q=Saffhire+Background+Screening&stick=H4sIAAAAAAAA_-NgU1I1qLAwM0k2TjKxMEi2SLFITbW0MqgwMUxKMzU2TTVPMUk0MzW0XMQqG5yYlpaRWZSq4JSYnJ1elF-al6IQnFyUmpqXmZcOAPfw2MJJAAAA",
  ],
  description:
    "SaffHire is a Veteran-Owned company that provides fast, secure background screening services and FCRA-compliant screening workflows for employers across the United States.",
  knowsAbout: [
    "FCRA-compliant screening workflows",
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

const monthIndex: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** Listing dates ("May 21, 2026") and ISO timestamps both become ISO 8601. */
export function toSchemaDate(value: string) {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed;
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return trimmed;
  const month = monthIndex[match[1].toLowerCase()];
  if (!month) return trimmed;
  return `${match[3]}-${month}-${match[2].padStart(2, "0")}`;
}

function absoluteAsset(url: string | null | undefined) {
  if (!url) return `${siteUrl}/images/saffhire-logo.png`;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export function blogPostingSchema(input: {
  slug: string;
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string | null;
}) {
  const published = toSchemaDate(input.datePublished);
  const modifiedRaw = toSchemaDate(input.dateModified || input.datePublished);
  const modified = modifiedRaw < published ? published : modifiedRaw;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    image: absoluteAsset(input.image),
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "SaffHire Background Screening",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/saffhire-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${input.slug}`,
    },
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
