import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type PriceRow = {
  label: string;
  price: string;
};

export type ProposalPricingPage = {
  id: string;
  name: string;
  description: string;
  minimum_package: PriceRow[];
  individual_pricing: PriceRow[];
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export const defaultProposalPricingPages: ProposalPricingPage[] = [
  {
    id: 'direct',
    name: 'SaffHire Direct Pricing',
    description: 'Standard direct client pricing from the sample proposal.',
    minimum_package: [
      { label: 'Social Security Trace', price: '$5.00' },
      { label: 'Sex Offender Registry', price: 'Included' },
      { label: 'Global Security Watch List', price: 'Included' },
      { label: 'National Database Search', price: 'Included' },
    ],
    individual_pricing: [
      { label: 'Federal Search', price: '$5.00' },
      { label: 'MVR', price: '$4.50' },
      { label: 'Safety Performance', price: '$10.00' },
      { label: 'DOT Verification', price: '$5.00' },
      { label: '1 County Criminal Search', price: '$6.00' },
      { label: '3 County Criminal Searches', price: '$16.50' },
      { label: 'Civil Search Upper Only', price: '$6.50' },
      { label: 'Civil Search Lower Only', price: '$6.50' },
      { label: 'Civil Search Upper & Lower', price: '$11.00' },
      { label: 'Education Verification', price: '$9.00' },
      { label: 'Employment Verification', price: '$9.00' },
      { label: 'WOTC', price: '$5.00' },
      { label: 'Drug Screening', price: '$28.50' },
      { label: 'State Database Search', price: '$3.00' },
      { label: 'Healthcare/MedEx/OIG', price: '$8.00' },
      { label: 'Medical License Verification', price: '$9.00' },
      { label: 'Continuous Monitoring', price: '$2.00' },
    ],
    sort_order: 1,
  },
  {
    id: 'staffing',
    name: 'Staffing Company Pricing',
    description: 'Pricing oriented for staffing company clients.',
    minimum_package: [
      { label: 'Social Security Trace', price: '$5.00' },
      { label: 'Sex Offender Registry', price: 'Included' },
      { label: 'Global Security Watch List', price: 'Included' },
      { label: 'National Database Search', price: 'Included' },
    ],
    individual_pricing: [
      { label: 'Federal Search', price: '$5.00' },
      { label: 'MVR', price: '$4.50' },
      { label: 'Safety Performance', price: '$10.00' },
      { label: 'DOT Verification', price: '$5.00' },
      { label: '1 County Criminal Search', price: '$6.00' },
      { label: '3 County Criminal Searches', price: '$16.50' },
      { label: 'Civil Search Upper Only', price: '$6.50' },
      { label: 'Civil Search Lower Only', price: '$6.50' },
      { label: 'Civil Search Upper & Lower', price: '$11.00' },
      { label: 'Education Verification', price: '$9.00' },
      { label: 'Employment Verification', price: '$9.00' },
      { label: 'WOTC', price: '$5.00' },
      { label: 'Drug Screening', price: '$28.50' },
      { label: 'State Database Search', price: '$3.00' },
      { label: 'Healthcare/MedEx/OIG', price: '$8.00' },
      { label: 'Medical License Verification', price: '$9.00' },
      { label: 'Continuous Monitoring', price: '$2.00' },
    ],
    sort_order: 2,
  },
  {
    id: 'staffing-sales',
    name: 'Staffing + 10% Sales Coverage',
    description: 'Staffing pricing with a 10% uplift to cover salesperson cost.',
    minimum_package: [
      { label: 'Social Security Trace', price: '$5.50' },
      { label: 'Sex Offender Registry', price: 'Included' },
      { label: 'Global Security Watch List', price: 'Included' },
      { label: 'National Database Search', price: 'Included' },
    ],
    individual_pricing: [
      { label: 'Federal Search', price: '$5.50' },
      { label: 'MVR', price: '$4.95' },
      { label: 'Safety Performance', price: '$11.00' },
      { label: 'DOT Verification', price: '$5.50' },
      { label: '1 County Criminal Search', price: '$6.60' },
      { label: '3 County Criminal Searches', price: '$18.15' },
      { label: 'Civil Search Upper Only', price: '$7.15' },
      { label: 'Civil Search Lower Only', price: '$7.15' },
      { label: 'Civil Search Upper & Lower', price: '$12.10' },
      { label: 'Education Verification', price: '$9.90' },
      { label: 'Employment Verification', price: '$9.90' },
      { label: 'WOTC', price: '$5.50' },
      { label: 'Drug Screening', price: '$31.35' },
      { label: 'State Database Search', price: '$3.30' },
      { label: 'Healthcare/MedEx/OIG', price: '$8.80' },
      { label: 'Medical License Verification', price: '$9.90' },
      { label: 'Continuous Monitoring', price: '$2.20' },
    ],
    sort_order: 3,
  },
];

function normalizeRows(value: unknown): PriceRow[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      label: String((item as PriceRow)?.label || '').trim(),
      price: String((item as PriceRow)?.price || '').trim(),
    }))
    .filter((item) => item.label);
}

function mapRow(item: Record<string, unknown>): ProposalPricingPage {
  return {
    id: String(item.id),
    name: String(item.name || ''),
    description: String(item.description || ''),
    minimum_package: normalizeRows(item.minimum_package),
    individual_pricing: normalizeRows(item.individual_pricing),
    sort_order: Number(item.sort_order || 0),
    created_at: item.created_at ? String(item.created_at) : undefined,
    updated_at: item.updated_at ? String(item.updated_at) : undefined,
  };
}

export async function getProposalPricingPages(): Promise<ProposalPricingPage[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultProposalPricingPages;

  const { data, error } = await supabase
    .from('proposal_pricing_pages')
    .select('id, name, description, minimum_package, individual_pricing, sort_order, created_at, updated_at')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Unable to load proposal pricing pages', error);
    return defaultProposalPricingPages;
  }

  if (!data || data.length === 0) return defaultProposalPricingPages;
  return data.map((item) => mapRow(item as Record<string, unknown>));
}

export async function createProposalPricingPage(input: {
  name: string;
  description?: string;
  minimum_package?: PriceRow[];
  individual_pricing?: PriceRow[];
  sort_order?: number;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');

  const name = input.name.trim();
  if (!name) throw new Error('Name is required.');

  const { data: existing } = await supabase
    .from('proposal_pricing_pages')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextSort = input.sort_order ?? ((existing?.[0]?.sort_order || 0) + 1);

  const { data, error } = await supabase
    .from('proposal_pricing_pages')
    .insert({
      name,
      description: (input.description || '').trim(),
      minimum_package: normalizeRows(input.minimum_package || []),
      individual_pricing: normalizeRows(input.individual_pricing || []),
      sort_order: nextSort,
    })
    .select('id, name, description, minimum_package, individual_pricing, sort_order, created_at, updated_at')
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data as Record<string, unknown>);
}

export async function updateProposalPricingPage(
  id: string,
  input: {
    name?: string;
    description?: string;
    minimum_package?: PriceRow[];
    individual_pricing?: PriceRow[];
    sort_order?: number;
  },
) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');
  if (!id) throw new Error('Pricing page id is required.');

  const update: Record<string, unknown> = {};
  if (input.name !== undefined) {
    const name = input.name.trim();
    if (!name) throw new Error('Name is required.');
    update.name = name;
  }
  if (input.description !== undefined) update.description = input.description.trim();
  if (input.minimum_package !== undefined) update.minimum_package = normalizeRows(input.minimum_package);
  if (input.individual_pricing !== undefined) update.individual_pricing = normalizeRows(input.individual_pricing);
  if (input.sort_order !== undefined) update.sort_order = Number(input.sort_order) || 0;

  const { data, error } = await supabase
    .from('proposal_pricing_pages')
    .update(update)
    .eq('id', id)
    .select('id, name, description, minimum_package, individual_pricing, sort_order, created_at, updated_at')
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data as Record<string, unknown>);
}

export async function deleteProposalPricingPage(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');
  if (!id) throw new Error('Pricing page id is required.');

  const { error } = await supabase.from('proposal_pricing_pages').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
