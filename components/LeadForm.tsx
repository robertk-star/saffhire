'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

type LeadFormProps = { type: 'quote' | 'contact' };

export function LeadForm({ type }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, formType: type }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus('error');
      setMessage(data.error || 'Something went wrong. Please call SaffHire at 888-588-1733.');
      return;
    }
    setStatus('success');
    setMessage(type === 'quote' ? 'Your quote request was received.' : 'Your message was received.');
    event.currentTarget.reset();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>Name<input name="name" required /></label>
      <label>Company<input name="company" /></label>
      <div className="form-grid"><label>Email<input name="email" type="email" required /></label><label>Phone<input name="phone" type="tel" /></label></div>
      <label>Industry<select name="industry" defaultValue=""><option value="" disabled>Select one</option><option>Trucking / Transportation</option><option>Church / Nonprofit</option><option>Staffing Agency</option><option>Healthcare</option><option>Manufacturing</option><option>Other</option></select></label>
      {type === 'quote' && <label>Estimated monthly background checks<input name="monthlyVolume" placeholder="Example: 10-25" /></label>}
      <label>Message<textarea name="message" /></label>
      <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending...' : type === 'quote' ? 'Request a Quote' : 'Send Message'}</button>
      {message && <p className={status === 'error' ? 'form-error' : 'form-success'}>{message}</p>}
    </form>
  );
}
