const points = [
  { title: "Veteran-Owned", text: "SaffHire is a Veteran-Owned background screening company based in Frisco, TX." },
  { title: "Founded by Industry Leaders", text: "Founded by Robert Krebsbach, John Waak and Jody Thigpen." },
  { title: "SOC 2 Type 2 Platform", text: "Our screening platform is SOC 2 Type 2 audited (SSAE 18)." },
  { title: "Bank-Level Encryption", text: "Applicant and client data is protected with bank-level encryption." },
  { title: "24/7 Portal Access", text: "Order, track and review reports in our secure portal, available 24/7." },
  { title: "No Minimums or Setup Fees", text: "No setup fees and no minimums for using our portal." },
  { title: "Nationwide", text: "We screen candidates and serve employers nationwide." },
];

/** Lightweight, text-only "Why SaffHire" highlights for the homepage (no images, no client JS). */
export default function WhySaffHireHighlights() {
  return (
    <section aria-labelledby="why-saffhire-highlights" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="section-label mb-3">WHY SAFFHIRE</p>
        <h2 id="why-saffhire-highlights" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Why SaffHire
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <li key={p.title} className="bg-white rounded-lg p-6 border border-gray-100" style={{ borderTop: "3px solid #22c55e" }}>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
