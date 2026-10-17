import { faqSchema } from "@/lib/structuredData";

export type FAQEntry = { question: string; answer: string };

/** On-page FAQ list (answers visible by default) plus a single FAQPage JSON-LD block for the page. */
export default function PageFAQ({ title = "Frequently Asked Questions", items }: { title?: string; items: FAQEntry[] }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }} />
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <details key={item.question} open className="border border-gray-200 rounded-lg bg-white px-6 py-4">
              <summary className="cursor-pointer font-semibold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <h3 className="inline">{item.question}</h3>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
