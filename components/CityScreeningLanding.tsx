import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import PageFAQ from "@/components/PageFAQ";
import RichText from "@/components/RichText";
import type { CityLanding } from "@/data/cityLandings";

const font = { fontFamily: "'Montserrat', sans-serif" };

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((paragraph) => (
        <p key={paragraph.slice(0, 80)} className="text-gray-700 mb-4 leading-relaxed">
          <RichText text={paragraph} />
        </p>
      ))}
    </>
  );
}

/** Shared layout for a city landing: local context, nationwide service, and a visible FAQ with FAQPage JSON-LD. */
export default function CityScreeningLanding({ data }: { data: CityLanding }) {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path={data.path} title={data.seoTitle} description={data.seoDescription} />
      <Navbar />
      <main id="city-landing">
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-green-400 font-semibold mb-2">{data.eyebrow}</p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={font}>
                {data.h1}
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{data.hero}</p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-[#17843f] text-white font-bold rounded-lg hover:bg-[#116b32] transition-colors"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6" style={font}>
                  {data.whyTitle}
                </h2>
                <Paragraphs items={data.whyParagraphs} />
                <ul className="space-y-3 mt-2">
                  {data.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 80)} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                      <span className="text-gray-700">
                        <RichText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={font}>
                  Talk with SaffHire
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Call</p>
                      <a href="tel:+1-888-588-1733" className="text-lg font-bold text-gray-900">
                        (888) 588-1733
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href="mailto:info@saffhire.com" className="text-lg font-bold text-gray-900">
                        info@saffhire.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Headquartered in</p>
                      <p className="text-lg font-bold text-gray-900">Frisco, TX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    <div>
                      <p className="text-sm text-gray-600">Service area</p>
                      <p className="text-lg font-bold text-gray-900">{data.serviceArea}</p>
                    </div>
                  </div>
                </div>
                <a
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-[#17843f] text-white font-bold rounded-lg hover:bg-[#116b32] transition-colors"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>

            <div className="max-w-4xl space-y-12 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={font}>
                  {data.searchesTitle}
                </h2>
                <Paragraphs items={data.searchesParagraphs} />
              </section>
              <section>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={font}>
                  {data.hqTitle}
                </h2>
                <Paragraphs items={data.hqParagraphs} />
              </section>
              <section>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={font}>
                  {data.localTitle}
                </h2>
                <Paragraphs items={data.localParagraphs} />
              </section>
              <section>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={font}>
                  {data.startTitle}
                </h2>
                <Paragraphs items={data.startParagraphs} />
              </section>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={font}>
                Screening services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.serviceCards.map((card) => (
                  <div key={card.href}>
                    <h3 className="font-bold text-gray-900 mb-2">
                      <a href={card.href} className="text-green-700 underline">
                        {card.title}
                      </a>
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PageFAQ title={data.faqTitle} items={data.faqs} />

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={font}>
              Related SaffHire pages
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              These pages cover staffing programs, common screening questions, Texas rules, and the searches employers order.
            </p>
            <div className="flex flex-wrap gap-3">
              {data.related.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex rounded-full border border-green-300 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
