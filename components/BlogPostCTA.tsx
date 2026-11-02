import { ChevronRight, Phone } from "lucide-react";

/**
 * End-of-post call to action shown on every blog article, after the body and
 * before the disclaimer, sidebar and footer. Uses the site's existing contact
 * page (/contact) and the phone number already shown in the header and footer.
 */
export default function BlogPostCTA() {
  return (
    <div
      className="mt-10 rounded-xl p-8"
      style={{ backgroundColor: "#0f172a" }}
      data-section="blog_post_cta"
    >
      <h2
        className="text-2xl font-bold text-white mb-3"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Need background checks for your next hires?
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        Tell us what roles you&apos;re hiring for and we&apos;ll recommend the right screening package for your team.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/contact"
          className="btn-green rounded-sm px-6 py-3 text-sm font-bold inline-flex items-center gap-1"
          data-conversion="quote_cta_click"
          data-location="blog_post_end"
        >
          Request a Quote <ChevronRight size={16} />
        </a>
        <a
          href="tel:8885881733"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          data-conversion="phone_click"
          data-location="blog_post_end"
        >
          <Phone size={16} /> Call us: (888) 588-1733
        </a>
      </div>
    </div>
  );
}
