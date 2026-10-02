'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const empty = {
  firstName: '', middleName: '', lastName: '', email: '', phone: '', dateOfBirth: '', ssn: '', dlNumber: '',
  licenseExpiration: '', issuingState: '', currentAddress: '', datesLivedHere: '', otherNames: '', yearsUsed: '', signatureName: '',
};

export default function AuthorizationForm() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [form, setForm] = useState(empty);
  const [disclosureAcknowledged, setDisclosureAcknowledged] = useState(false);
  const [rightsAcknowledged, setRightsAcknowledged] = useState(false);
  const [esignAcknowledged, setEsignAcknowledged] = useState(false);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ referenceCode: string; signedAt: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function startDraw(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    drawing.current = true;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    setSigned(true);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  }

  function setField(key: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    const signatureDataUrl = canvasRef.current?.toDataURL('image/png') || '';
    setPending(true);
    const response = await fetch('/api/driver-pipeline/authorization', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        signatureDataUrl: signed ? signatureDataUrl : '',
        disclosureAcknowledged,
        rightsAcknowledged,
        esignAcknowledged,
      }),
    });
    const data = await response.json().catch(() => ({}));
    setPending(false);
    if (!response.ok) {
      setError(data.error || 'Unable to submit the authorization.');
      return;
    }
    setForm(empty);
    clearSignature();
    setDone({ referenceCode: data.referenceCode, signedAt: data.signedAt });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-green-600">Authorization received</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900">Thank you. Your form is signed and stored.</h2>
        <p className="mt-3 text-slate-600">Reference number: <strong>{done.referenceCode}</strong></p>
        <p className="mt-1 text-slate-600">Signed at: {new Date(done.signedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })} Central Time</p>
        <p className="mt-4 text-sm text-slate-500">Keep this reference number. Driver Pipeline and SaffHire can retrieve the signed authorization with it.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">1. Standalone disclosure</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">Driver Pipeline may obtain a consumer report about you from SaffHire, a consumer reporting agency, for employment purposes. The report may include a criminal background screening and a motor vehicle report. This disclosure is provided on its own, before you authorize the report.</p>
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-800">
          <input type="checkbox" checked={disclosureAcknowledged} onChange={(event) => setDisclosureAcknowledged(event.target.checked)} className="mt-1" />
          <span>I have received and read this standalone disclosure that a consumer report may be obtained for employment purposes.</span>
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">2. Summary of Your Rights</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">Federal law requires that you receive A Summary of Your Rights Under the Fair Credit Reporting Act before a background check is ordered. Read the official summary, then acknowledge it below.</p>
        <a className="mt-3 inline-flex text-sm font-bold text-green-700 underline" href="https://www.consumerfinance.gov/compliance/compliance-resources/other-applicable-requirements/fair-credit-reporting-act/" target="_blank" rel="noreferrer">Open the CFPB Summary of Your Rights</a>
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-800">
          <input type="checkbox" checked={rightsAcknowledged} onChange={(event) => setRightsAcknowledged(event.target.checked)} className="mt-1" />
          <span>I acknowledge receipt of A Summary of Your Rights Under the Fair Credit Reporting Act and certify that I have read and understand my rights.</span>
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">3. Authorization</h2>
        <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
          <p>In connection with my application for employment, continued employment, or other permissible purpose, I understand that Driver Pipeline may obtain my motor vehicle record (MVR) and conduct a criminal background screening through its designated agents or consumer reporting agencies, including Saffhire, from state Departments of Motor Vehicles (DMV), law enforcement agencies, courts, or other authorized sources.</p>
          <p>The MVR may include my driving history, license status, traffic violations, accidents, and related information. The criminal background screening may include my criminal history, such as arrests, convictions, and other records from federal, state, or local agencies or courts.</p>
          <p>I agree that this information will be used for employment-related purposes, including evaluating my eligibility to operate a company or personal vehicle for company business and for employment, retention, promotion, or reassignment with Driver Pipeline.</p>
          <p>I authorize Driver Pipeline, Saffhire, and their agents to obtain and review my MVR and criminal background information now and, if employed, during my employment for retention, promotion, or reassignment, as permitted by law. I authorize any law enforcement agency, state or federal agency, institution, school, university, information service bureau, employer, or insurance company to provide requested background information to Driver Pipeline or Saffhire.</p>
          <p>This authorization remains in effect during my employment unless revoked in writing.</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="First name" value={form.firstName} onChange={(value) => setField('firstName', value)} required />
          <Field label="Last name" value={form.lastName} onChange={(value) => setField('lastName', value)} required />
          <Field label="Middle name" value={form.middleName} onChange={(value) => setField('middleName', value)} />
          <Field label="Date of birth" type="date" value={form.dateOfBirth} onChange={(value) => setField('dateOfBirth', value)} required />
          <Field label="Social Security number" value={form.ssn} onChange={(value) => setField('ssn', value)} required autoComplete="off" />
          <Field label="Email address" type="email" value={form.email} onChange={(value) => setField('email', value)} required />
          <Field label="Phone" value={form.phone} onChange={(value) => setField('phone', value)} />
          <Field label="DL number" value={form.dlNumber} onChange={(value) => setField('dlNumber', value)} required />
          <Field label="License expiration date" type="date" value={form.licenseExpiration} onChange={(value) => setField('licenseExpiration', value)} />
          <label className="block text-sm font-bold text-slate-800">Issuing state
            <select required value={form.issuingState} onChange={(event) => setField('issuingState', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal">
              <option value="">Select</option>
              {states.map((state) => <option key={state} value={state}>{state}</option>)}
            </select>
          </label>
          <div className="sm:col-span-2"><Field label="Current address" value={form.currentAddress} onChange={(value) => setField('currentAddress', value)} required /></div>
          <Field label="Dates lived here" value={form.datesLivedHere} onChange={(value) => setField('datesLivedHere', value)} />
          <Field label="Other names used, including maiden name" value={form.otherNames} onChange={(value) => setField('otherNames', value)} />
          <Field label="Years used" value={form.yearsUsed} onChange={(value) => setField('yearsUsed', value)} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">4. Electronic signature</h2>
        <p className="mt-2 text-sm text-slate-600">Draw your signature, then type your full legal name. The server time stamp, IP address, and reference number are stored with the form.</p>
        <canvas
          ref={canvasRef}
          width={900}
          height={240}
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={() => { drawing.current = false; }}
          onPointerLeave={() => { drawing.current = false; }}
          className="mt-4 h-40 w-full touch-none rounded-md border border-slate-300 bg-white"
        />
        <button type="button" onClick={clearSignature} className="mt-2 text-sm font-bold text-slate-600 underline">Clear signature</button>
        <div className="mt-4"><Field label="Type your full legal name" value={form.signatureName} onChange={(value) => setField('signatureName', value)} required /></div>
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-800">
          <input type="checkbox" checked={esignAcknowledged} onChange={(event) => setEsignAcknowledged(event.target.checked)} className="mt-1" />
          <span>I agree to sign this authorization electronically. My drawn signature and typed name are my legal signature.</span>
        </label>
      </section>

      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button disabled={pending} className="rounded-md bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60">{pending ? 'Submitting...' : 'Sign and submit'}</button>
      <p className="text-xs leading-5 text-slate-500">Pennsylvania, New Hampshire, and Washington may require a separate state MVR form before a driving record can be ordered. This page does not replace those state forms.</p>
    </form>
  );
}

function Field({ label, value, onChange, type = 'text', required = false, autoComplete }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="block text-sm font-bold text-slate-800">{label}
      <input required={required} type={type} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" />
    </label>
  );
}
