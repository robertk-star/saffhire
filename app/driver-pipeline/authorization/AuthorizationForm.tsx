'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { authorizationCopy, type AuthorizationLocale } from '@/lib/authorizationCopy';

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const empty = {
  firstName: '', middleName: '', lastName: '', email: '', phone: '', dateOfBirth: '', ssn: '', dlNumber: '',
  licenseExpiration: '', licenseIssued: '', issuingState: '', currentAddress: '', datesLivedHere: '', otherNames: '', yearsUsed: '', signatureName: '',
};

export default function AuthorizationForm({ locale = 'en' }: { locale?: AuthorizationLocale }) {
  const copy = authorizationCopy[locale];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [form, setForm] = useState(empty);
  const [disclosureAcknowledged, setDisclosureAcknowledged] = useState(false);
  const [rightsAcknowledged, setRightsAcknowledged] = useState(false);
  const [esignAcknowledged, setEsignAcknowledged] = useState(false);
  const [noMiddleName, setNoMiddleName] = useState(false);
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
        locale,
        signatureDataUrl: signed ? signatureDataUrl : '',
        disclosureAcknowledged,
        rightsAcknowledged,
        esignAcknowledged,
        noMiddleName,
      }),
    });
    const data = await response.json().catch(() => ({}));
    setPending(false);
    if (!response.ok) {
      setError(data.error || copy.submitError);
      return;
    }
    setForm(empty);
    clearSignature();
    setDone({ referenceCode: data.referenceCode, signedAt: data.signedAt });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-green-600">{copy.received}</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900">{copy.thanks}</h2>
        <p className="mt-3 text-slate-600">{copy.reference}: <strong>{done.referenceCode}</strong></p>
        <p className="mt-1 text-slate-600">{copy.signedAt}: {new Date(done.signedAt).toLocaleString(locale === 'es' ? 'es-US' : 'en-US', { timeZone: 'America/Chicago' })} {copy.timeZoneLabel}</p>
        <p className="mt-4 text-sm text-slate-500">{copy.keep}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">{copy.disclosureTitle}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">{copy.disclosure}</p>
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-800">
          <input type="checkbox" checked={disclosureAcknowledged} onChange={(event) => setDisclosureAcknowledged(event.target.checked)} className="mt-1" />
          <span>{copy.disclosureCheck}</span>
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">{copy.rightsTitle}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">{copy.rights}</p>
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-800">
          <input type="checkbox" checked={rightsAcknowledged} onChange={(event) => setRightsAcknowledged(event.target.checked)} className="mt-1" />
          <span>{copy.rightsCheck}</span>
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">{copy.authTitle}</h2>
        <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
          {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label={copy.firstName} value={form.firstName} onChange={(value) => setField('firstName', value)} required />
          <Field label={copy.lastName} value={form.lastName} onChange={(value) => setField('lastName', value)} required />
          <div>
            <Field label={copy.middleName} value={form.middleName} onChange={(value) => setField('middleName', value)} required={!noMiddleName} disabled={noMiddleName} />
            <label className="mt-2 flex items-start gap-2 text-sm font-normal text-slate-700">
              <input type="checkbox" checked={noMiddleName} onChange={(event) => { setNoMiddleName(event.target.checked); if (event.target.checked) setField('middleName', ''); }} className="mt-1" />
              <span>{copy.noMiddle}</span>
            </label>
          </div>
          <Field label={copy.dob} type="date" value={form.dateOfBirth} onChange={(value) => setField('dateOfBirth', value)} required />
          <Field label={copy.ssn} value={form.ssn} onChange={(value) => setField('ssn', value)} required autoComplete="off" />
          <Field label={copy.email} type="email" value={form.email} onChange={(value) => setField('email', value)} required />
          <Field label={copy.phone} value={form.phone} onChange={(value) => setField('phone', value)} required />
          <Field label={copy.dl} value={form.dlNumber} onChange={(value) => setField('dlNumber', value)} required />
          <Field label={copy.expiration} type="date" value={form.licenseExpiration} onChange={(value) => setField('licenseExpiration', value)} required />
          <Field label={copy.issued} type="date" value={form.licenseIssued} onChange={(value) => setField('licenseIssued', value)} required />
          <label className="block text-sm font-bold text-slate-800">{copy.state}
            <select required value={form.issuingState} onChange={(event) => setField('issuingState', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal">
              <option value="">{copy.select}</option>
              {states.map((state) => <option key={state} value={state}>{state}</option>)}
            </select>
          </label>
          <div className="sm:col-span-2"><Field label={copy.address} value={form.currentAddress} onChange={(value) => setField('currentAddress', value)} required /></div>
          <Field label={copy.moved} type="date" value={form.datesLivedHere} onChange={(value) => setField('datesLivedHere', value)} />
          <Field label={copy.otherNames} value={form.otherNames} onChange={(value) => setField('otherNames', value)} />
          <Field label={copy.years} value={form.yearsUsed} onChange={(value) => setField('yearsUsed', value)} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">{copy.signTitle}</h2>
        <p className="mt-2 text-sm text-slate-600">{copy.signHelp}</p>
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
        <button type="button" onClick={clearSignature} className="mt-2 text-sm font-bold text-slate-600 underline">{copy.clear}</button>
        <div className="mt-4"><Field label={copy.typed} value={form.signatureName} onChange={(value) => setField('signatureName', value)} required /></div>
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-800">
          <input type="checkbox" checked={esignAcknowledged} onChange={(event) => setEsignAcknowledged(event.target.checked)} className="mt-1" />
          <span>{copy.esign}</span>
        </label>
      </section>

      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button disabled={pending} className="rounded-md bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60">{pending ? copy.submitting : copy.submit}</button>
      <p className="text-xs leading-5 text-slate-500">{copy.stateNote}</p>
    </form>
  );
}

function Field({ label, value, onChange, type = 'text', required = false, autoComplete, disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; autoComplete?: string; disabled?: boolean }) {
  return (
    <label className="block text-sm font-bold text-slate-800">{label}
      <input required={required} disabled={disabled} type={type} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal disabled:bg-slate-100" />
    </label>
  );
}
