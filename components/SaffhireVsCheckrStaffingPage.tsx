'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Minus, Phone, ArrowRight } from 'lucide-react';

const rows = [
  { label: 'Best fit', saffhire: 'Staffing agencies and mid-size employers that want custom packages and direct support', checkr: 'High-volume and tech-forward hiring teams that want a packaged self-serve platform' },
  { label: 'Setup fees', saffhire: 'No setup fees', checkr: 'No monthly platform fee on standard orders; package pricing applies per report' },
  { label: 'Minimums', saffhire: 'No monthly minimums', checkr: 'Pay per completed report; volume pricing is typically quoted at higher annual volume' },
  { label: 'Starting published package price', saffhire: 'Custom quotes; basic packages can start around $20 per applicant', checkr: 'Published packages start at $29.99 per report for Basic' },
  { label: 'County criminal searches', saffhire: 'County searches can be built into the package you need', checkr: 'Unlimited county search is in Essential ($54.99) and Complete; Basic does not include it' },
  { label: 'Drug screening', saffhire: 'Lab-based and instant-result options available', checkr: 'Available as an add-on through clinic and onsite options' },
  { label: 'Employment verification', saffhire: 'Available as part of a staffing package', checkr: 'Add-on, starting around $12.50 per check' },
  { label: 'MVR / driving records', saffhire: 'Available for driving roles', checkr: 'Add-on MVR and commercial MVR options' },
  { label: 'Support model', saffhire: 'U.S.-based team with a published phone number', checkr: 'Platform-first support with account and help-center workflows' },
  { label: 'FCRA posture', saffhire: 'FCRA-compliant screening workflows; employers remain responsible for hiring decisions', checkr: 'FCRA-compliant screening workflows and adverse-action tools' },
];

const reasons = [
  {
    title: 'Variable staffing volume',
    body: 'Staffing agencies often hire in waves. A no-minimum model can be easier when volume rises and falls by client, season, or contract.',
  },
  {
    title: 'Client-specific packages',
    body: 'Different clients want different searches. SaffHire can build packages around the role and the client requirement instead of forcing one published tier.',
  },
  {
    title: 'Human support during placements',
    body: 'When a candidate is waiting on a start date, agencies often need a person to call. SaffHire publishes a phone number in the header of every page.',
  },
  {
    title: 'Practical turnaround',
    body: 'Many searches return quickly. County, verification, and lab-based drug screens take longer because they depend on courts, prior employers, and labs.',
  },
];

export default function SaffhireVsCheckrStaffingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-16" style={{ backgroundColor: '#0f172a' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-3" style={{ color: '#22c55e' }}>STAFFING COMPARISON</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              SaffHire vs Checkr for Staffing Agencies
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              Checkr is a well-known screening platform with published package pricing. SaffHire is built for employers and staffing agencies that want custom packages, no setup fees, no minimums, and a team they can call.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="btn-green inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Staffing Quote <ArrowRight size={16} /></a>
              <a href="tel:8885881733" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}><Phone size={16} />(888) 588-1733</a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Side-by-side comparison</h2>
            <p className="text-gray-600 mb-8">Checkr package prices below are from Checkr's public pricing page. SaffHire pricing is quoted by package and volume. Court, DMV, and lab pass-through fees can apply with any provider.</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead style={{ backgroundColor: '#0f172a' }}>
                  <tr>
                    <th className="text-left text-white font-bold px-4 py-3">Category</th>
                    <th className="text-left text-white font-bold px-4 py-3">SaffHire</th>
                    <th className="text-left text-white font-bold px-4 py-3">Checkr</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.label} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-4 font-semibold text-gray-900 align-top">{row.label}</td>
                      <td className="px-4 py-4 text-gray-700 align-top">{row.saffhire}</td>
                      <td className="px-4 py-4 text-gray-700 align-top">{row.checkr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>When staffing agencies choose SaffHire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start gap-3">
                    <Check size={18} className="mt-1 flex-shrink-0" style={{ color: '#22c55e' }} />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{reason.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{reason.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>What this comparison does not claim</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p className="flex items-start gap-3"><Minus size={18} className="mt-1 flex-shrink-0 text-gray-400" /><span>SaffHire does not claim to be cheaper than Checkr in every case. Final cost depends on the searches ordered, court and DMV fees, and volume.</span></p>
              <p className="flex items-start gap-3"><Minus size={18} className="mt-1 flex-shrink-0 text-gray-400" /><span>SaffHire does not claim that a national database search replaces county court searches.</span></p>
              <p className="flex items-start gap-3"><Minus size={18} className="mt-1 flex-shrink-0 text-gray-400" /><span>SaffHire provides FCRA-compliant screening workflows. Employers remain responsible for hiring decisions and legal compliance.</span></p>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ backgroundColor: '#0f172a' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Compare a staffing package with SaffHire</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Tell us the roles you fill and we will quote a package with no setup fees and no minimums.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-green inline-flex items-center gap-2 px-8 py-3 rounded-sm font-bold">Contact Us</a>
              <a href="/industries/staffing" className="inline-flex items-center gap-2 px-8 py-3 rounded-sm font-bold border border-gray-600 text-white hover:border-green-400 hover:text-green-400 transition-colors">Staffing screening</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
