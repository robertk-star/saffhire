/*
 * Home Page SaffHire Background Screening
 * Design: Clean Professional Trust
 * Sections: Navbar, HeroSlider, IndustriesSection, AboutSection, StatsSection, WhyChooseUsSection, ContactSection, Footer
 */

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
const IndustriesSection = dynamic(() => import("@/components/IndustriesSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const WhySaffHireHighlights = dynamic(() => import("@/components/WhySaffHireHighlights"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const WhyChooseUsSection = dynamic(() => import("@/components/WhyChooseUsSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const Footer = dynamic(() => import("@/components/Footer"));
import PageSEO from "@/components/PageSEO";
const LatestBlogPost = dynamic(() => import("@/components/LatestBlogPost").then((m) => m.LatestBlogPost));


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
        "https://www.google.com/search?q=Saffhire+Background+Screening&stick=H4sIAAAAAAAA_-NgU1I1qLAwM0k2TjKxMEi2SLFITbW0MqgwMUxKMzU2TTVPMUk0MzW0XMQqG5yYlpaRWZSq4JSYnJ1elF-al6IQnFyUmpqXmZcOAPfw2MJJAAAA"
      ]
    });
    document.head.appendChild(schemaScript);

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
        <section style={{ backgroundColor: "#17843f" }} className="py-3">
          <p className="text-center text-white font-bold tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Veteran-Owned Small Business &middot; Headquartered in Frisco, TX &middot; Serving Employers Nationwide
          </p>
        </section>
        <IndustriesSection />
        <AboutSection />
        <WhySaffHireHighlights />
        <StatsSection />
        <WhyChooseUsSection />
        <LatestBlogPost />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
