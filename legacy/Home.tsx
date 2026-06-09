/*
 * Home Page SaffHire Background Screening
 * Design: Clean Professional Trust
 * Sections: Navbar, HeroSlider, IndustriesSection, AboutSection, StatsSection, WhyChooseUsSection, ContactSection, Footer
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import IndustriesSection from "@/components/IndustriesSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { LatestBlogPost } from "@/components/LatestBlogPost";


export default function Home() {
  useEffect(() => {
    // Set page title within 30-60 characters for SEO
    document.title = "SaffHire Background Pre-Employment Screening";

    // Add keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement("meta");
      keywordsMeta.setAttribute("name", "keywords");
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute(
      "content",
      "background screening, pre-employment screening, criminal background check, employment verification, drug screening, MVR check, FCRA compliance, background check company, employee screening, hiring compliance"
    );

    // Add JSON-LD structured data schema markup
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "SaffHire Background Screening",
      "url": "https://saffhire.com",
      "logo": "https://saffhire.com/logo.png",
      "description": "SaffHire provides fast, secure, and FCRA-compliant background screening services for businesses of all sizes nationwide. Headquartered in Frisco, TX.",
      "telephone": "+1-888-588-1733",
      "email": "info@saffhire.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Frisco",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "serviceType": "Background Screening",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Background Screening Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Criminal Background Checks"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Employment Verification"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Drug Screening"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Education Verification"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "MVR and Driving Record Checks"}}
        ]
      },
      "sameAs": [
        "https://www.linkedin.com/company/saffhire-background-screening",
        "https://www.facebook.com/saffhire",
        "https://www.instagram.com/saffhire"
      ]
    });
    document.head.appendChild(schemaScript);

    // Add Review schema markup for testimonials
    const reviewSchemaScript = document.createElement("script");
    reviewSchemaScript.type = "application/ld+json";
    reviewSchemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "3",
      "bestRating": "5",
      "worstRating": "1",
      "itemReviewed": {
        "@type": "Service",
        "name": "Background Screening Services",
        "provider": {
          "@type": "Organization",
          "name": "SaffHire Background Screening"
        }
      },
      "reviews": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          },
          "reviewBody": "SaffHire made our screening process incredibly simple. Results come back fast and their team is always available when we have questions. We would never go back to our old provider.",
          "author": {
            "@type": "Person",
            "name": "Jennifer M.",
            "jobTitle": "HR Director"
          },
          "datePublished": "2026-05-04"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          },
          "reviewBody": "As a healthcare facility, compliance is everything. SaffHire handles all our OIG checks, license verifications, and drug testing in one place. They understand what we need.",
          "author": {
            "@type": "Person",
            "name": "Marcus T.",
            "jobTitle": "Operations Manager"
          },
          "datePublished": "2026-05-04"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          },
          "reviewBody": "We run background checks on dozens of drivers every month. SaffHire's DOT-compliant packages save us time and the pricing is the best we have found anywhere.",
          "author": {
            "@type": "Person",
            "name": "Sandra R.",
            "jobTitle": "Fleet Manager"
          },
          "datePublished": "2026-05-04"
        }
      ]
    });
    document.head.appendChild(reviewSchemaScript);

    return () => {
      // Reset to default on unmount
      document.title = "SaffHire Background Pre-Employment Screening";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/" title="Fast, Secure Background Screening Services" description="SaffHire provides fast, secure, and reliable background screening services for businesses across all industries. FCRA and EEOC compliant." />

      <Navbar />
      <main>
        <HeroSlider />
        <IndustriesSection />
        <AboutSection />
        <StatsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <LatestBlogPost />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
