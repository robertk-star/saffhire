'use client';

import { useEffect, useRef, useState } from 'react';

type SectionKey = 'cover' | 'whySaffhire' | 'services' | 'packages' | 'pricing' | 'process';

type PriceRow = {
  id?: string;
  label: string;
  price: string;
};

type ProposalPreviewData = {
  clientName?: string;
  contactName?: string;
  proposalNotes?: string;
  sections: SectionKey[];
  pricingPresetName?: string;
  minimumPackage: PriceRow[];
  individualPricing: PriceRow[];
  createdAt: string;
};

const saffhireLogoUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/saffhire-logo_fe0fac3a.png';

function PageShell({ children, pageNumber }: { children: React.ReactNode; pageNumber: number }) {
  return (
    <section className="proposal-page mb-8 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
      <div className="proposal-page-header mb-6 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-400">
        <span>SaffHire Background Screening | Proposal</span>
        <span>Page {pageNumber}</span>
      </div>
      <div className="proposal-page-body">{children}</div>
      <div className="proposal-page-footer mt-8 text-center text-xs text-slate-400">— {pageNumber} —</div>
    </section>
  );
}

export default function ProposalPreview() {
  const [proposal, setProposal] = useState<ProposalPreviewData | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('saffhire_proposal_preview');
    if (!saved) return;
    try {
      setProposal(JSON.parse(saved));
    } catch {
      setProposal(null);
    }
  }, []);

  async function downloadPdf() {
    if (!documentRef.current || exporting) return;

    setExporting(true);
    setExportError(null);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pages = Array.from(documentRef.current.querySelectorAll<HTMLElement>('.proposal-page'));
      if (pages.length === 0) {
        throw new Error('No proposal pages found to export.');
      }

      // Wait for images (logo) so capture matches the screen
      const images = Array.from(documentRef.current.querySelectorAll('img'));
      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
        ),
      );

      let pdf: InstanceType<typeof jsPDF> | null = null;

      for (let i = 0; i < pages.length; i += 1) {
        const page = pages[i];

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: page.scrollWidth,
          windowHeight: page.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Letter width, height proportional to the on-screen card so layout stays exact
        const pageWidthIn = 8.5;
        const pageHeightIn = Math.max(pageWidthIn * (canvas.height / canvas.width), 1);

        if (!pdf) {
          pdf = new jsPDF({
            orientation: pageHeightIn >= pageWidthIn ? 'portrait' : 'landscape',
            unit: 'in',
            format: [pageWidthIn, pageHeightIn],
            compress: true,
          });
        } else {
          pdf.addPage([pageWidthIn, pageHeightIn], pageHeightIn >= pageWidthIn ? 'portrait' : 'landscape');
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthIn, pageHeightIn, undefined, 'FAST');
      }

      if (!pdf) throw new Error('Unable to build PDF.');

      const client = proposal?.clientName?.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'proposal';
      const date = new Date().toISOString().slice(0, 10);
      pdf.save(`SaffHire-Proposal-${client}-${date}.pdf`);
    } catch (error) {
      console.error(error);
      setExportError(error instanceof Error ? error.message : 'Unable to create PDF.');
    } finally {
      setExporting(false);
    }
  }

  if (!proposal) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        No proposal preview was found. Go back to the proposal builder and generate a preview first.
      </div>
    );
  }

  const has = (key: SectionKey) => proposal.sections.includes(key);
  let pageNumber = 0;

  return (
    <div className="proposal-document space-y-6">
      <div className="proposal-toolbar flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a href="/admin/proposals" className="text-sm font-bold text-green-700 hover:underline">Back to proposal builder</a>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <button
            type="button"
            onClick={downloadPdf}
            disabled={exporting}
            className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {exporting ? 'Creating PDF…' : 'Download PDF'}
          </button>
          {exportError ? <p className="text-sm text-red-600">{exportError}</p> : null}
          <p className="text-xs text-slate-500">PDF is captured from the on-screen layout so it matches what you see.</p>
        </div>
      </div>

      <div ref={documentRef}>
        {has('cover') ? (
          <PageShell pageNumber={++pageNumber}>
            <div className="proposal-cover flex min-h-[70vh] flex-col items-center justify-center text-center">
              <img
                src={saffhireLogoUrl}
                alt="SaffHire"
                crossOrigin="anonymous"
                className="mb-10 h-20 w-auto object-contain"
              />
              <h1 className="text-5xl font-black tracking-tight text-slate-900">SAFFHIRE</h1>
              <h2 className="mt-4 text-2xl font-bold text-slate-800">BACKGROUND SCREENING</h2>
              <div className="my-8 h-px w-40 bg-slate-800" />
              <p className="text-lg text-slate-600">Comprehensive Background Screening Solutions</p>
              {(proposal.clientName || proposal.contactName) ? (
                <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-700">
                  {proposal.clientName ? <div><span className="font-bold">Prepared for:</span> {proposal.clientName}</div> : null}
                  {proposal.contactName ? <div className="mt-1"><span className="font-bold">Contact:</span> {proposal.contactName}</div> : null}
                  <div className="mt-1"><span className="font-bold">Date:</span> {new Date(proposal.createdAt).toLocaleDateString()}</div>
                </div>
              ) : null}
            </div>
          </PageShell>
        ) : null}

        {has('whySaffhire') ? (
          <PageShell pageNumber={++pageNumber}>
            <h2 className="text-3xl font-black text-slate-900">Why SaffHire</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              SaffHire Background Screening helps employers make confident hiring decisions through accurate, compliant, and timely background screening solutions.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We provide a single source for criminal background screening, employment and education verifications, identity verification, drug testing, motor vehicle reports, healthcare compliance screening, occupational health services, and continuous monitoring.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              <span className="font-bold">Our mission is simple:</span> Provide employers with the information they need to hire confidently while delivering exceptional customer service, industry expertise, and fast turnaround times.
            </p>

            <h3 className="mt-8 text-2xl font-black text-slate-900">Veteran-Owned Commitment</h3>
            <p className="mt-3 text-slate-700 leading-relaxed">
              SaffHire is proud to be a <span className="font-bold">Veteran-Owned Small Business</span>. Military service instills values that directly benefit our clients:
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-slate-700 sm:grid-cols-2">
              <li>• Integrity in every report we deliver</li>
              <li>• Accountability and dependable service</li>
              <li>• Attention to detail and accuracy</li>
              <li>• Commitment to protecting your organization</li>
              <li>• Responsive customer support</li>
            </ul>
            <p className="mt-4 text-slate-700 leading-relaxed">
              For organizations that value supplier diversity, partnering with a veteran-owned business may also help support corporate supplier diversity initiatives and government contracting requirements.
            </p>

            <h3 className="mt-8 text-2xl font-black text-slate-900">Why Employers Choose SaffHire</h3>
            <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-800 sm:grid-cols-2">
              <div>✓ Veteran-Owned Small Business</div>
              <div>✓ Mobile-friendly platform</div>
              <div>✓ Fast turnaround times</div>
              <div>✓ FCRA compliant processes</div>
              <div>✓ U.S.-based customer support</div>
              <div>✓ DOT screening expertise</div>
              <div>✓ Secure online ordering</div>
              <div>✓ Healthcare compliance expertise</div>
              <div>✓ Applicant self-service portal</div>
              <div>✓ Customized screening packages</div>
              <div>✓ Dedicated account management</div>
            </div>
          </PageShell>
        ) : null}

        {has('services') ? (
          <PageShell pageNumber={++pageNumber}>
            <h2 className="text-3xl font-black text-slate-900">Our Services</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">Criminal Background Screening</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• County Criminal Searches</li>
                  <li>• State Criminal Searches</li>
                  <li>• National Criminal Database Searches</li>
                  <li>• Federal Criminal Searches</li>
                  <li>• International Criminal Searches</li>
                  <li>• Civil Searches</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Identity Searches</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• Social Security Trace</li>
                  <li>• Address History</li>
                  <li>• Death Index</li>
                  <li>• Alias Searches</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Registry Searches</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• National Sex Offender Registry</li>
                  <li>• State Sex Offender Registry</li>
                  <li>• Global Security Watch List</li>
                  <li>• OFAC</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Healthcare Exclusion Searches</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• OIG</li>
                  <li>• SAM</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Verifications</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• Employment Verification</li>
                  <li>• Education Verification</li>
                  <li>• Professional License Verification</li>
                  <li>• Reference Verification</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">DOT Services</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• DOT Drug Testing</li>
                  <li>• Non-DOT Drug Testing</li>
                  <li>• Motor Vehicle Report Monitoring</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Motor Vehicle Reports</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• Motor Vehicle Reports (MVR)</li>
                  <li>• CDLIS</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Occupational Health</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• Drug Testing</li>
                  <li>• Alcohol Testing</li>
                </ul>
                <h3 className="mt-5 text-lg font-black text-slate-900">Continuous Monitoring</h3>
                <p className="mt-2 text-sm text-slate-700">Stay informed after the hiring process is complete. Receive alerts when:</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>• Criminal activity is reported</li>
                  <li>• Driver license status changes</li>
                  <li>• Medical certificates expire</li>
                  <li>• Healthcare sanctions are issued</li>
                </ul>
              </div>
            </div>
          </PageShell>
        ) : null}

        {has('packages') ? (
          <PageShell pageNumber={++pageNumber}>
            <h2 className="text-3xl font-black text-slate-900">Service Packages</h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Package</th>
                    <th className="px-4 py-3 text-left">Includes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 align-top">
                      <div className="font-bold text-slate-900">Basic Screening</div>
                      <div className="text-xs text-slate-500">General employment positions</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">National Criminal Search · Social Security Trace · Global Security Watch List · National Sex Offender Registry</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 align-top">
                      <div className="font-bold text-slate-900">Professional Screening</div>
                      <div className="text-xs text-slate-500">Comprehensive background investigation</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">National Criminal Search · County Criminal Searches · Federal Criminal Search · Social Security Trace · Global Security Watch List · National Sex Offender Registry · Employment Verification · Education Verification</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 align-top">
                      <div className="font-bold text-slate-900">Healthcare Screening</div>
                      <div className="text-xs text-slate-500">Healthcare providers & compliance</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">Drug Screening · Healthcare Compliance Screening · Professional License Verification</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 align-top">
                      <div className="font-bold text-slate-900">DOT Screening</div>
                      <div className="text-xs text-slate-500">Transportation & safety-sensitive positions</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">Criminal Background Screening · Safety Reports · Drug Screening · Motor Vehicle Reports</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 align-top">
                      <div className="font-bold text-slate-900">Executive Screening</div>
                      <div className="text-xs text-slate-500">Most comprehensive package</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">National Criminal Search · County Criminal Searches · Federal Criminal Search · Social Security Trace · Global Security Watch List · National Sex Offender Registry · Employment Verification · Education Verification · Drug Screening · Motor Vehicle Reports</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-black text-slate-900">Custom Screening Packages</h3>
              <p className="mt-2 text-slate-700 leading-relaxed">
                Every organization has unique hiring requirements. We will work with you to build a screening package that matches your industry, compliance requirements, and budget.
              </p>
            </div>
          </PageShell>
        ) : null}

        {has('pricing') ? (
          <PageShell pageNumber={++pageNumber}>
            <h2 className="text-3xl font-black text-slate-900">Pricing</h2>
            {proposal.pricingPresetName ? <p className="mt-2 text-sm font-bold text-slate-500">{proposal.pricingPresetName}</p> : null}

            <h3 className="mt-6 text-xl font-black text-slate-900">Minimum Package</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {proposal.minimumPackage.map((item, index) => (
                    <tr key={`${item.label}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-2.5 text-slate-800">{item.label}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-slate-900">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 text-xl font-black text-slate-900">Individual Pricing</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Individual Service</th>
                    <th className="px-4 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {proposal.individualPricing.map((item, index) => (
                    <tr key={`${item.label}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-2.5 text-slate-800">{item.label}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-slate-900">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {proposal.proposalNotes ? (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-bold uppercase tracking-wide text-slate-500">Notes</div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{proposal.proposalNotes}</p>
              </div>
            ) : null}
          </PageShell>
        ) : null}

        {has('process') ? (
          <PageShell pageNumber={++pageNumber}>
            <h2 className="text-3xl font-black text-slate-900">Our Process</h2>
            <ol className="mt-6 space-y-3">
              {[
                'Place your order online.',
                'Applicant completes authorization.',
                'Searches begin immediately.',
                'Results are delivered electronically.',
                'Ongoing customer support is available throughout the process.',
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">{index + 1}</span>
                  <span className="pt-1 text-slate-800">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 text-2xl font-black text-slate-900">Customer Support</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone</div>
                <div className="mt-1 font-bold text-slate-900">888-588-1733</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</div>
                <div className="mt-1 font-bold text-slate-900">info@saffhire.com</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Website</div>
                <div className="mt-1 font-bold text-slate-900">www.saffhire.com</div>
              </div>
            </div>
          </PageShell>
        ) : null}
      </div>
    </div>
  );
}
