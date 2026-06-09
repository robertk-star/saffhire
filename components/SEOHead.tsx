import { useEffect } from "react";
import { getPageMetadata, serviceFAQs, generateFAQSchema } from "@shared/seoMetadata";

interface SEOHeadProps {
  path: string;
  title?: string;
  description?: string;
  ogImage?: string;
  ogImageAlt?: string;
  includeFAQ?: boolean;
}

/**
 * SEO Head Component
 * Manages meta descriptions, Open Graph tags, canonical URLs, and FAQ schema
 */
export function SEOHead({
  path,
  title,
  description,
  ogImage,
  ogImageAlt,
  includeFAQ = false,
}: SEOHeadProps) {
  useEffect(() => {
    // Get metadata for this page
    const metadata = getPageMetadata(path);
    const finalTitle = title || metadata.title;
    const finalDescription = description || metadata.description;
    const finalOgImage = ogImage || metadata.ogImage;
    const finalOgImageAlt = ogImageAlt || metadata.ogImageAlt || finalTitle;

    // Update page title
    document.title = finalTitle;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", finalDescription);

    // Update or create canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://saffhire.com${path}`);

    // Update or create Open Graph tags
    const ogTags = [
      { property: "og:title", content: finalTitle },
      { property: "og:description", content: finalDescription },
      { property: "og:url", content: `https://saffhire.com${path}` },
      { property: "og:type", content: "website" },
    ];

    if (finalOgImage) {
      ogTags.push({ property: "og:image", content: finalOgImage });
      ogTags.push({ property: "og:image:alt", content: finalOgImageAlt });
    }

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Add Twitter Card tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: finalTitle },
      { name: "twitter:description", content: finalDescription },
    ];

    if (finalOgImage) {
      twitterTags.push({ name: "twitter:image", content: finalOgImage });
    }

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Add FAQ schema if applicable
    if (includeFAQ && serviceFAQs[path]) {
      const faqSchema = generateFAQSchema(`https://saffhire.com${path}`, serviceFAQs[path]);
      let faqScript = document.querySelector('script[type="application/ld+json"][data-faq="true"]');
      if (!faqScript) {
        faqScript = document.createElement("script");
        faqScript.setAttribute("type", "application/ld+json");
        faqScript.setAttribute("data-faq", "true");
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = faqSchema;
    }
  }, [path, title, description, ogImage, ogImageAlt, includeFAQ]);

  return null; // This component doesn't render anything
}
