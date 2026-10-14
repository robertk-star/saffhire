import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type ProposalDraftSummary = { id: string; name: string; client_name: string; updated_at: string };
export type ProposalDraft = ProposalDraftSummary & { data: unknown; created_at: string };

export class DraftsUnavailableError extends Error {}

const MISSING_TABLE_MESSAGE = 'Draft storage is not installed yet (migration 013_proposal_drafts.sql). Drafts are saved in this browser only until it is applied.';

function check(error: { code?: string; message?: string } | null) {
  if (!error) return;
  const missing = error.code === '42P01' || error.code === 'PGRST205' || /proposal_drafts/.test(error.message || '') && /not find|does not exist/i.test(error.message || '');
  if (missing) throw new DraftsUnavailableError(MISSING_TABLE_MESSAGE);
  throw new Error(error.message || 'Database error');
}

function client() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new DraftsUnavailableError('Database is not configured. Drafts are saved in this browser only.');
  return supabase;
}

function cleanName(value: unknown) {
  const name = String(value || '').trim().slice(0, 200);
  if (!name) throw new Error('Draft name is required.');
  return name;
}

function cleanData(value: unknown) {
  if (!value || typeof value !== 'object') throw new Error('Draft data is required.');
  const json = JSON.stringify(value);
  if (json.length > 1_000_000) throw new Error('Draft is too large.');
  return JSON.parse(json);
}

export async function listProposalDrafts(): Promise<ProposalDraftSummary[]> {
  const { data, error } = await client()
    .from('proposal_drafts')
    .select('id, name, client_name, updated_at')
    .order('updated_at', { ascending: false })
    .limit(200);
  check(error);
  return (data || []) as ProposalDraftSummary[];
}

export async function getProposalDraft(id: string): Promise<ProposalDraft> {
  const { data, error } = await client()
    .from('proposal_drafts')
    .select('id, name, client_name, data, created_at, updated_at')
    .eq('id', id)
    .single();
  check(error);
  return data as ProposalDraft;
}

export async function createProposalDraft(input: { name: unknown; clientName?: unknown; data: unknown; user?: string | null }) {
  const { data, error } = await client()
    .from('proposal_drafts')
    .insert({
      name: cleanName(input.name),
      client_name: String(input.clientName || '').trim().slice(0, 200),
      data: cleanData(input.data),
      created_by: input.user || null,
      updated_by: input.user || null,
    })
    .select('id, name, client_name, updated_at')
    .single();
  check(error);
  return data as ProposalDraftSummary;
}

export async function updateProposalDraft(id: string, input: { name?: unknown; clientName?: unknown; data?: unknown; user?: string | null }) {
  const update: Record<string, unknown> = { updated_by: input.user || null };
  if (input.name !== undefined) update.name = cleanName(input.name);
  if (input.clientName !== undefined) update.client_name = String(input.clientName || '').trim().slice(0, 200);
  if (input.data !== undefined) update.data = cleanData(input.data);
  const { data, error } = await client()
    .from('proposal_drafts')
    .update(update)
    .eq('id', id)
    .select('id, name, client_name, updated_at')
    .single();
  check(error);
  return data as ProposalDraftSummary;
}
