import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

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
    { label: "All Industries", href: "/industries" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Staffing", href: "/industries/staffing" },
    { label: "Transportation", href: "/industries/transportation" },
    { label: "Manufacturing / Warehousing", href: "/industries/manufacturing" },
    { label: "Hospitality", href: "/industries/hospitality" },
    { label: "Energy", href: "/industries/energy" },
    { label: "Education", href: "/industries/education" },
    { label: "Churches / Non-Profit", href: "/industries/church-nonprofit" },
  ];

  const resourceItems = [
    { label: "Background Screening Guides", href: "/background-screening-guides" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="text-white" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-3">
          <a href="tel:8885881733" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-green-400 transition-colors" data-conversion="phone_click" data-location="header_bar">
            <Phone size={14} />
            (888) 588-1733
          </a>
          <a href="/contact" className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-sm transition-colors">
            Contact Us
          </a>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="/" className="flex-shrink-0">
              <img src="/images/saffhire-logo.png" alt="SaffHire Background Screening" className="h-14 w-auto object-contain" />
            </a>

            <nav className="hidden lg:flex items-center gap-7">
              <a href="/why-saffhire" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">Why SaffHire</a>
              <a href="/services" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">Services</a>
              <div className="relative group">
                <button className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors flex items-center gap-1">Industries <ChevronDown size={16} /></button>
                <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 max-h-96 overflow-y-auto">
                  {industryItems.map((item) => (
                    <a key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600">{item.label}</a>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors flex items-center gap-1">Resources <ChevronDown size={16} /></button>
                <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {resourceItems.map((item) => (
                    <a key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600">{item.label}</a>
                  ))}
                </div>
              </div>
              <a href="/referral-partners" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">Partners</a>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href="https://saffhire.instascreen.net/sso/login.taz" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors">Login</a>
              <a href="https://intake.saffhire.com/" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2 rounded-md transition-colors">Create Account</a>
            </div>

            <button className="lg:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a href="tel:8885881733" className="flex items-center gap-2 py-2 text-sm font-bold text-green-700" onClick={() => setMobileOpen(false)}>
              <Phone size={16} /> (888) 588-1733
            </a>
            <a href="/contact" className="block bg-green-500 hover:bg-green-600 text-white text-center font-semibold text-sm py-2 rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
              Contact Us
            </a>
            <a href="/why-saffhire" className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMobileOpen(false)}>Why SaffHire</a>
            <a href="/services" className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMobileOpen(false)}>Services</a>
            <div>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full text-left py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors flex items-center justify-between">
                Industries
                <ChevronDown size={16} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {industryItems.map((item) => (
                    <a key={item.label} href={item.href} className="block py-1 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={() => setMobileOpen(false)}>{item.label}</a>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setResourcesOpen(!resourcesOpen)} className="w-full text-left py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors flex items-center justify-between">
                Resources
                <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {resourceItems.map((item) => (
                    <a key={item.label} href={item.href} className="block py-1 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={() => setMobileOpen(false)}>{item.label}</a>
                  ))}
                </div>
              )}
            </div>
            <a href="/referral-partners" className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMobileOpen(false)}>Partners</a>
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <a href="https://saffhire.instascreen.net/sso/login.taz" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMobileOpen(false)}>Login</a>
              <a href="https://intake.saffhire.com/" target="_blank" rel="noopener noreferrer" className="block bg-green-500 hover:bg-green-600 text-white text-center font-semibold text-sm py-2 rounded-md transition-colors" onClick={() => setMobileOpen(false)}>Create Account</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
