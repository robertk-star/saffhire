/*
 * ContactSection Component SaffHire Background Screening
 * Design: Dark navy background CTA banner + contact form
 */

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackConversion(eventName: string, details: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...details });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, details);
  }
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "contact" }),
      });
    } catch {
      // Keep the user experience simple even if email/storage is not configured yet.
    }

    trackConversion("contact_form_submit", {
      form_type: "contact",
      has_company: Boolean(formData.company),
      has_phone: Boolean(formData.phone),
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  return (
    <>
      {/* CTA Banner */}
      <section
        className="py-16"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2
                className="text-2xl lg:text-3xl font-bold text-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Looking for the Best Consumer Reporting Solution?
              </h2>
              <p className="text-gray-400 mt-2">
                Join hundreds of businesses that trust SaffHire for their background screening needs.
              </p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 btn-green rounded-sm px-8 py-3 text-base font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-conversion="quote_cta_click"
              data-location="contact_cta_banner"
              onClick={() => trackConversion("quote_cta_click", { location: "contact_cta_banner" })}
            >
              Get Quote
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Info */}
            <div>
              <p className="section-label mb-3">CONTACT US</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Ready to streamline your hiring process? Contact our team for a free consultation
                and custom quote tailored to your business needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="feature-icon-box">
                    <Phone size={18} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Phone
                    </p>
                    <a
                      href="tel:8885881733"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                      data-conversion="phone_click"
                      data-location="contact_section"
                      onClick={() => trackConversion("phone_click", { location: "contact_section" })}
                    >
                      (888) 588-1733
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="feature-icon-box">
                    <Mail size={18} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Email
                    </p>
                    <a
                      href="mailto:info@saffhire.com"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                      data-conversion="email_click"
                      data-location="contact_section"
                      onClick={() => trackConversion("email_click", { location: "contact_section" })}
                    >
                      info@saffhire.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="feature-icon-box">
                    <MapPin size={18} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Service Area
                    </p>
                    <p className="text-gray-600">Headquartered in Frisco, TX, Serving Businesses Nationwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#f0fdf4" }}
                  >
                    <Send size={28} style={{ color: "#22c55e" }} />
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-form="contact"
                  data-conversion="contact_form_submit"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                      placeholder="Tell us about your screening needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-green rounded-sm py-3 text-base font-bold flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    data-conversion="contact_form_submit"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
