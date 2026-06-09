/**
 * PageSEO - Injects per-page canonical link, meta tags, OG tags, and FAQ schema via react-helmet-async.
 * Usage: <PageSEO path="/services/criminal-background-checks" title="..." description="..." ogImage="..." includeFAQ={true} />
 * The `path` prop should be the exact canonical path (no trailing slash, no query string).
 */

import { Helmet } from "react-helmet-async";
import { getPageMetadata, serviceFAQs, generateFAQSchema } from "@shared/seoMetadata";

const BASE_URL = "https://saffhire.com";

interface PageSEOProps {
  /** Canonical path, e.g. "/blog/fcra-compliance-checklist-employers-2026" */
  path: string;
  /** Page <title> — appended with " | SaffHire" automatically */
  title?: string;
  /** Meta description */
  description?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Open Graph image alt text */
  ogImageAlt?: string;
  /** Include FAQ schema for service pages */
  includeFAQ?: boolean;
}

export default function PageSEO({ 
  path, 
  title, 
  description,
  ogImage,
  ogImageAlt,
  includeFAQ = false,
}: PageSEOProps) {
  const canonical = `${BASE_URL}${path}`;
  
  // Get metadata from seoMetadata config
  const pageMetadata = getPageMetadata(path);
  const finalTitle = title || pageMetadata.title;
  const fullTitle = `${finalTitle} | SaffHire`;
  const metaDesc = description || pageMetadata.description;
  const finalOgImage = ogImage || pageMetadata.ogImage;
  const finalOgImageAlt = ogImageAlt || pageMetadata.ogImageAlt || finalTitle;

  // Generate FAQ schema if applicable
  const faqSchema = includeFAQ && serviceFAQs[path] 
    ? generateFAQSchema(canonical, serviceFAQs[path])
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      {finalOgImage && (
        <>
          <meta property="og:image" content={finalOgImage} />
          <meta property="og:image:alt" content={finalOgImageAlt} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {finalOgImage && <meta name="twitter:image" content={finalOgImage} />}
      
      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {faqSchema}
        </script>
      )}
    </Helmet>
  );
}
