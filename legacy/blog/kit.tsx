/*
 * Shared building blocks for code-based blog articles in legacy/blog/.
 * Headings start at h2 (the page H1 is the post title in legacy/BlogPost.tsx).
 */
import React from "react";

export type Faq = { question: string; answer: string };

const heading = { fontFamily: "'Montserrat', sans-serif" } as const;

export function Article({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8" style={{ fontFamily: "'Open Sans', sans-serif", color: "#374151", lineHeight: "1.8" }}>
      {children}
    </div>
  );
}

export function Answer({ title = "The short answer", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid #17843f" }}>
      <p className="font-bold text-gray-900 mb-2" style={heading}>{title}</p>
      <div className="text-gray-800 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900" style={heading}>{title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-gray-900" style={heading}>{title}</h3>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white text-sm"
            style={{ backgroundColor: "#17843f", ...heading }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div>
            <p className="font-bold text-gray-900 mb-1" style={heading}>{item.title}</p>
            <div className="text-gray-700 leading-relaxed">{item.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="text-left p-3 font-bold text-gray-900 border-b border-gray-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td key={j} className="p-3 border-b border-gray-100 text-gray-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 text-sm text-gray-700" style={{ backgroundColor: "#fffbeb", borderLeft: "4px solid #d97706" }}>
      {children}
    </div>
  );
}

export function L({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="text-green-700 hover:text-green-800 underline font-medium"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Visible FAQ plus matching FAQPage JSON-LD. */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="space-y-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <h2 className="text-2xl font-bold text-gray-900" style={heading}>Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.question} className="p-5 rounded-xl border border-gray-100 bg-white">
            <h3 className="font-bold text-gray-900 mb-2" style={heading}>{f.question}</h3>
            <p className="text-gray-700 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Sources({ items }: { items: { label: string; href: string }[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900" style={heading}>Sources</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        {items.map((s) => (
          <li key={s.href}>
            <L href={s.href}>{s.label}</L>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AboutSaffHire({ children }: { children?: React.ReactNode }) {
  return (
    <div className="rounded-xl p-8" style={{ backgroundColor: "#f8fafc", borderTop: "3px solid #17843f" }}>
      <h2 className="text-xl font-bold text-gray-900 mb-3" style={heading}>Work with SaffHire</h2>
      <div className="text-gray-700 leading-relaxed space-y-3">
        {children}
        <p>
          SaffHire is a Veteran-Owned background screening company based in Frisco, TX, serving employers Nationwide. It was
          founded by Robert Krebsbach, John Waak and Jody Thigpen. There are no minimums and no setup fees, data is protected
          with bank-level encryption, and the employer portal is available 24/7.
        </p>
        <p>
          <L href="/contact">Talk to our team</L> or <L href="/services">see all screening services</L>.
        </p>
        <p className="text-xs text-gray-500">
          This article is general information, not legal advice. Talk to your employment counsel about your specific situation.
        </p>
      </div>
    </div>
  );
}
