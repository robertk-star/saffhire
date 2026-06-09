/*
 * Navbar Component SaffHire Background Screening
 * Design: Clean Professional Trust (Option 1)
 * Updated: Cleaner layout, reduced clutter, Solutions highlighted with NEW badge
 */

import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const industryItems = [
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Staffing", href: "/industries/staffing" },
    { label: "Transportation", href: "/industries/transportation" },
    { label: "Manufacturing / Warehousing", href: "/industries/manufacturing" },
    { label: "Hospitality", href: "/industries/hospitality" },
    { label: "Energy", href: "/industries/energy" },
    { label: "Education", href: "/industries/education" },
    { label: "Churches / Non-Profit", href: "/industries/church-nonprofit" },
  ]

  const resourceItems = [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/#resources" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/saffhire-logo_fe0fac3a.png"
              alt="SaffHire Background Screening"
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Why SaffHire */}
            <a href="/#why-saffhire" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">
              Why SaffHire
            </a>

            {/* Industries Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors flex items-center gap-1">
                Industries
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 max-h-96 overflow-y-auto">
                {industryItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions with NEW badge */}
            <a href="https://solutions.saffhire.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">Solutions</span>
              <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            </a>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors flex items-center gap-1">
                Resources
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {resourceItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Partners */}
            <a href="/referral-partners" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">
              Partners
            </a>
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              className="p-2 text-gray-500 hover:text-green-600 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <a
              href="https://saffhire.instascreen.net/sso/login.taz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors"
            >
              Login
            </a>
            <a
              href="https://intake.saffhire.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2 rounded-md transition-colors"
            >
              Create Account
            </a>
            <a
              href="/#contact"
              className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2 rounded-md transition-colors"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {/* Why SaffHire */}
            <a
              href="/#why-saffhire"
              className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Why SaffHire
            </a>

            {/* Industries Dropdown */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full text-left py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors flex items-center justify-between"
              >
                Industries
                <ChevronDown size={16} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {industryItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block py-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions */}
            <a
              href="https://solutions.saffhire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              Solutions
              <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            </a>

            {/* Resources Dropdown */}
            <div>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full text-left py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors flex items-center justify-between"
              >
                Resources
                <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {resourceItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block py-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Partners */}
            <a
              href="/referral-partners"
              className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Partners
            </a>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <a
                href="https://saffhire.instascreen.net/sso/login.taz"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </a>
              <a
                href="https://intake.saffhire.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white text-center font-semibold text-sm py-2 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Create Account
              </a>
              <a
                href="/#contact"
                className="block bg-green-500 hover:bg-green-600 text-white text-center font-semibold text-sm py-2 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
