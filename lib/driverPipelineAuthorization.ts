import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function encryptionKey() {
  const secret = process.env.AUTHORIZATION_ENCRYPTION_KEY || process.env.ADMIN_SESSION_SECRET || '';
  if (!secret) throw new Error('AUTHORIZATION_ENCRYPTION_KEY is not configured.');
  return createHash('sha256').update(secret).digest();
}

export function encryptSensitive(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64url')}:${tag.toString('base64url')}:${encrypted.toString('base64url')}`;
}

export function decryptSensitive(value: string | null) {
  if (!value) return '';
  if (!value.startsWith('v1:')) return value;
  const [, iv, tag, encrypted] = value.split(':');
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8');
}

export type AuthorizationInput = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  dlNumber: string;
  licenseExpiration: string;
  licenseIssued: string;
  issuingState: string;
  noMiddleName: boolean;
  currentAddress: string;
  datesLivedHere: string;
  otherNames: string;
  yearsUsed: string;
  signatureName: string;
  signatureDataUrl: string;
  disclosureAcknowledged: boolean;
  rightsAcknowledged: boolean;
  esignAcknowledged: boolean;
};

const states = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]);

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

export function validateAuthorization(input: AuthorizationInput) {
  const errors: string[] = [];
  if (!input.firstName.trim()) errors.push('First name is required.');
  if (!input.lastName.trim()) errors.push('Last name is required.');
  if (!input.noMiddleName && !input.middleName.trim()) errors.push('Middle name is required, or check that you do not have a legal middle name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.push('A valid email is required.');
  if (!input.phone.trim()) errors.push('Phone is required.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.dateOfBirth)) errors.push('Date of birth is required.');
  const ssn = digitsOnly(input.ssn);
  if (ssn.length !== 9) errors.push('Social Security number must be 9 digits.');
  if (!input.dlNumber.trim()) errors.push('Driver license number is required.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.licenseExpiration)) errors.push('License expiration date is required.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.licenseIssued)) errors.push('License date issued is required.');
  if (!states.has(input.issuingState)) errors.push('Issuing state is required.');
  if (!input.currentAddress.trim()) errors.push('Current address is required.');
  if (!input.signatureName.trim()) errors.push('Type your full legal name to sign.');
  if (!input.signatureDataUrl.startsWith('data:image/png')) errors.push('Draw your signature before submitting.');
  if (!input.disclosureAcknowledged) errors.push('Acknowledge the background check disclosure.');
  if (!input.rightsAcknowledged) errors.push('Acknowledge the Summary of Rights.');
  if (!input.esignAcknowledged) errors.push('Agree to sign electronically.');
  return errors;
}

export function makeReferenceCode() {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const token = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DP-${stamp}-${token}`;
}

export async function insertAuthorization(input: AuthorizationInput, meta: { ipAddress: string | null; userAgent: string | null }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');
  const ssn = digitsOnly(input.ssn);
  const referenceCode = makeReferenceCode();
  const { data, error } = await supabase
    .from('driver_pipeline_authorizations')
    .insert({
      reference_code: referenceCode,
      first_name: input.firstName.trim(),
      middle_name: input.noMiddleName ? null : input.middleName.trim(),
      no_middle_name: Boolean(input.noMiddleName),
      last_name: input.lastName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      date_of_birth: input.dateOfBirth,
      ssn: encryptSensitive(ssn),
      ssn_last4: ssn.slice(-4),
      dl_number: input.dlNumber.trim(),
      license_expiration: input.licenseExpiration,
      license_issued: input.licenseIssued,
      issuing_state: input.issuingState,
      current_address: input.currentAddress.trim(),
      dates_lived_here: input.datesLivedHere.trim() || null,
      other_names: input.otherNames.trim() || null,
      years_used: input.yearsUsed.trim() || null,
      signature_name: input.signatureName.trim(),
      signature_data_url: input.signatureDataUrl,
      ip_address: meta.ipAddress,
      user_agent: meta.userAgent,
      disclosure_acknowledged: true,
      rights_acknowledged: true,
      esign_acknowledged: true,
    })
    .select('id, reference_code, signed_at')
    .single();
  if (error) throw new Error(error.message);
  return data as { id: string; reference_code: string; signed_at: string };
}

export async function listAuthorizations(query: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  let request = supabase
    .from('driver_pipeline_authorizations')
    .select('id, reference_code, first_name, middle_name, last_name, email, phone, issuing_state, ssn_last4, signed_at')
    .order('signed_at', { ascending: false })
    .limit(200);
  const q = query.trim();
  if (q) {
    const safe = q.replace(/[%_,]/g, '');
    request = request.or(`first_name.ilike.%${safe}%,last_name.ilike.%${safe}%,email.ilike.%${safe}%,reference_code.ilike.%${safe}%`);
  }
  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getAuthorization(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase.from('driver_pipeline_authorizations').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return { ...data, ssn: decryptSensitive(data.ssn), dl_number: data.dl_number };
}
