/*
 * Footer Component SaffHire Background Screening
 * Design: Dark navy background, social icons, phone, copyright
 */

import { Facebook, Linkedin, Phone } from "lucide-react";

function getFooterConversion(label: string) {
  if (label === "Login") return "login_click";
  if (label === "Create Account") return "create_account_click";
  if (label === "Contact") return "contact_click";
  if (label === "Background Screening Guides") return "guide_hub_click";
  return "footer_link_click";
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Why SaffHire", href: "/#why-saffhire" },
    { label: "Services", href: "/#services" },
    { label: "Industries", href: "/#services" },
    { label: "Background Screening Guides", href: "/background-screening-guides" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Referral Partners", href: "/referral-partners" },
    { label: "Contact", href: "/#contact" },
    { label: "Login", href: "https://saffhire.instascreen.net/sso/login.taz" },
    { label: "Create Account", href: "https://sendlink.co/documents/doc-form/69679c4ebf297f0594403f7a?locale=en-US" },
  ];

  const services = [
    { label: "Criminal Background Checks", href: "/criminal-background-checks" },
    { label: "County Criminal Checks", href: "/county-criminal-background-checks" },
    { label: "National Criminal Search", href: "/national-criminal-database-search" },
    { label: "Healthcare OIG Checks", href: "/healthcare-sanctions-oig-checks" },
    { label: "Volunteer Background Checks", href: "/volunteer-background-checks" },
    { label: "Small Business Checks", href: "/small-business-background-checks" },
    { label: "Employment Verification", href: "/employment-verification" },
    { label: "Drug Screening", href: "/drug-screening" },
    { label: "Education Verification", href: "/education-verification" },
    { label: "MVR / Driving Records", href: "/mvr-checks" },
    { label: "FCRA Compliance News", href: "/fcra-news" },
  ];

  return (
    <footer style={{ backgroundColor: "#0f172a" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/saffhire-logo_fe0fac3a.png"
                alt="SaffHire Background Screening"
                className="h-12 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              Frisco, TX | Serving All 50 States
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Providing fast, secure, and reliable background screening services for businesses
              across all industries since 2020.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                aria-label="Facebook"
                data-conversion="social_click"
                data-location="footer_facebook"
              >
                <Facebook size={16} className="text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/company/saffhire"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                aria-label="LinkedIn"
                data-conversion="social_click"
                data-location="footer_linkedin"
              >
                <Linkedin size={16} className="text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5 tracking-wider uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors"
                    data-conversion={getFooterConversion(link.label)}
                    data-location="footer_quick_links"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5 tracking-wider uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors"
                    data-conversion="service_link_click"
                    data-location="footer_services"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5 tracking-wider uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Nationwide Coverage
            </h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm leading-relaxed">
                SaffHire provides background screening services nationwide for employers across all 50 states.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Based in Frisco, Texas. Serving businesses throughout the United States.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-5 tracking-wider uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(34,197,94,0.15)" }}
                >
                  <Phone size={14} style={{ color: "#22c55e" }} />
                </div>
                <a
                  href="tel:8885881733"
                  className="text-gray-300 text-sm hover:text-green-400 transition-colors font-medium"
                  data-conversion="phone_click"
                  data-location="footer_contact"
                >
                  (888) 588-1733
                </a>
              </div>
              <div className="mt-6">
                <p className="text-gray-500 text-xs mb-3">FCRA & EEOC Compliant</p>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Portal Available 24-7.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {currentYear}. All Rights Reserved. SaffHire Background Screening
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="/fcra-news" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              FCRA Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
