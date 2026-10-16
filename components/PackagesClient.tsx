"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFAQ from "@/components/PageFAQ";
import { packagesFaqs } from "@/data/pageFaqs";

export const baseItems = [
  "SSN Trace",
  "Address History",
  "National Criminal Database",
  "Global Security Watch List",
  "Federal Search †",
];

const addOns = [
  "Motor Vehicle Report (MVR) §",
  "State Search † ‡",
  "County Search † ‡",
  "Drug Screening",
  "Employment Verification",
  "Education Verification",
];

export const packages = [
  { name: "Package 1", adds: 0, turnaround: "1 day" },
  { name: "Package 2", adds: 1, turnaround: "1 day" },
  { name: "Package 3", adds: 2, turnaround: "1 day" },
  { name: "Package 4", adds: 3, turnaround: "1-2 days" },
  { name: "Package 5", adds: 4, turnaround: "2-5 days" },
  { name: "Package 6", adds: 6, turnaround: "2-5 days" },
];

const font = { fontFamily: "'Montserrat', sans-serif" };

export default function PackagesClient() {
  const rows = [...baseItems.map((label) => ({ label, minAdds: 0 })), ...addOns.map((label, i) => ({ label, minAdds: i + 1 }))];
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3" style={{ color: "#22c55e", ...font }}>PACKAGES</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={font}>Standard Packages &amp; Turnaround</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Packages are customized to each client&apos;s needs. These are the standard starting points.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" style={font}>Included in every package</h2>
          <p className="text-gray-700 mb-10">
            All packages include SSN Trace, Address History, National Criminal Database, Global Security Watch List and Federal Search.
            The National Criminal Database search also includes a Sex Offender registry search.
          </p>
          <p className="text-gray-700 mb-10">
            Instant searches (SSN Trace, Sex Offender, Global Security Watch List, National Criminal Database, state database and MVR) usually return in minutes. Full packages average the turnaround shown below.
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6" style={font}>Compare packages</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr style={{ backgroundColor: "#0f172a" }} className="text-white">
                  <th className="p-3 text-left">Search</th>
                  {packages.map((p) => <th key={p.name} className="p-3 text-center">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-gray-200">
                    <td className="p-3 text-gray-900">{r.label}</td>
                    {packages.map((p) => (
                      <td key={p.name} className="p-3 text-center text-green-600 font-bold">{p.adds >= r.minAdds ? "✓" : ""}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="p-3">Average turnaround</td>
                  {packages.map((p) => <td key={p.name} className="p-3 text-center">{p.turnaround}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-6 space-y-1 text-sm text-gray-600">
            <li>† Searches all jurisdictions where the applicant has lived.</li>
            <li>‡ Court access fees may apply (pass-through).</li>
            <li>§ State fees may apply.</li>
          </ul>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-14 mb-4" style={font}>What each search covers</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>SSN Trace and Address History:</strong> helps confirm identity and lists names and addresses associated with the applicant, which guide where other searches are run.</li>
            <li><strong>National Criminal Database:</strong> an aggregated multi-source records search that includes a Sex Offender registry search. Databases are not complete, which is why many employers add State and County searches.</li>
            <li><strong>Global Security Watch List:</strong> checks government watch and sanctions lists.</li>
            <li><strong>Federal Search:</strong> federal court criminal records in the jurisdictions where the applicant has lived.</li>
            <li><strong>State and County Searches:</strong> state-level and county court criminal records in the jurisdictions where the applicant has lived.</li>
            <li><strong>Motor Vehicle Report (MVR):</strong> driving history from the state, for roles that involve driving.</li>
            <li><strong>Drug Screening, Employment Verification and Education Verification:</strong> lab-based drug testing and confirmation of past employment and education.</li>
          </ul>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-14 mb-4" style={font}>Packages customized to your needs</h2>
          <p className="text-gray-700">The standard packages are starting points. We can add or remove searches by position, location or client requirement. Every order follows FCRA-compliant workflows, including candidate disclosure and authorization.</p>
          <div className="mt-12">
            <a href="/contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={font}>Get a Custom Quote</a>
          </div>
        </div>
      </section>
      <PageFAQ title="Package Questions" items={packagesFaqs} />
      <Footer />
    </div>
  );
}
