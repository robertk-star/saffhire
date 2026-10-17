import type { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";
import PageFAQ, { type FAQEntry } from "@/components/PageFAQ";

export type ContentSubsection = { heading: string; paragraphs?: string[]; bullets?: string[] };
export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: ContentSubsection[];
};
export type ContentPageData = {
  eyebrow: string;
  h1: string;
  intro: string;
  quickAnswer?: string;
  sections: ContentSection[];
  faqTitle?: string;
  faqs: FAQEntry[];
  relatedLinks?: Array<{ label: string; href: string }>;
  ctaTitle?: string;
  ctaText?: string;
};

const font = { fontFamily: "'Montserrat', sans-serif" };

/** Renders text with simple [label](/href) links. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} className="font-semibold text-green-700 underline">
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 list-disc pl-6">
      {items.map((item) => (
        <li key={item}>
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}

/** Long-form sections plus the visible FAQ. Server-rendered; usable inside ContentPage or a legacy page slot. */
export function ContentBody({
  quickAnswer,
  sections,
  faqs,
  faqTitle,
}: {
  quickAnswer?: string;
  sections: ContentSection[];
  faqs?: FAQEntry[];
  faqTitle?: string;
}) {
  return (
    <>
      <div className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed">
          {quickAnswer && (
            <section className="rounded-2xl border border-green-200 bg-green-50 p-8 mb-12">
              <p className="text-sm font-bold uppercase tracking-wider text-green-800 mb-3">Quick Answer</p>
              <p className="text-lg leading-relaxed text-slate-800">
                <RichText text={quickAnswer} />
              </p>
            </section>
          )}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={font}>
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 48)} className="mt-4">
                    <RichText text={p} />
                  </p>
                ))}
                {section.bullets && <Bullets items={section.bullets} />}
                {section.subsections?.map((sub) => (
                  <div key={sub.heading} className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900" style={font}>
                      {sub.heading}
                    </h3>
                    {sub.paragraphs?.map((p) => (
                      <p key={p.slice(0, 48)} className="mt-3">
                        <RichText text={p} />
                      </p>
                    ))}
                    {sub.bullets && <Bullets items={sub.bullets} />}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
      {faqs && faqs.length > 0 && <PageFAQ title={faqTitle} items={faqs} />}
    </>
  );
}

/** Server-rendered long-form page: hero, sections, visible FAQ (with FAQPage JSON-LD), related links, CTA. */
export default function ContentPage({ data }: { data: ContentPageData }) {
  return (
    <SiteShell>
      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3" style={{ color: "#22c55e", ...font }}>
            {data.eyebrow}
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={font}>
            {data.h1}
          </h1>
          <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">{data.intro}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="/contact" className="btn-green inline-flex items-center px-7 py-3 rounded-sm font-bold" style={font}>
              Get a Free Quote
            </a>
            <a
              href="tel:8885881733"
              className="inline-flex items-center px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400"
              style={font}
            >
              888-588-1733
            </a>
          </div>
        </div>
      </section>

      <main>
        <ContentBody quickAnswer={data.quickAnswer} sections={data.sections} faqs={data.faqs} faqTitle={data.faqTitle} />
      </main>

      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={font}>
              Related SaffHire resources
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.relatedLinks.map((link) => (
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
      )}

      <section className="py-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4" style={font}>
            {data.ctaTitle || "Talk to SaffHire about your screening program"}
          </h2>
          <p className="text-gray-300 mb-6">
            {data.ctaText ||
              "SaffHire is a Veteran-Owned background screening company headquartered in Frisco, TX, serving employers nationwide with no setup fees and no minimums."}
          </p>
          <a href="/contact" className="btn-green rounded-sm px-10 py-4 font-bold inline-block" style={font}>
            Contact SaffHire
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
