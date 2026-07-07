import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type PricingItem = {
  id: string;
  service: string;
  state: string;
  cost: number | null;
  total_cost: number | null;
  church_price: number | null;
  staffing_price: number | null;
  trucking_price: number | null;
  high_volume_price: number | null;
  general_price: number | null;
};

function numberOrNull(value: unknown) {
  return value === null || value === undefined || value === '' ? null : Number(value);
}

export async function getPricingItems(): Promise<PricingItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('pricing_items')
    .select('id, service, state, cost, total_cost, church_price, staffing_price, trucking_price, high_volume_price, general_price')
    .order('service', { ascending: true })
    .order('state', { ascending: true });

  if (error) {
    console.error('Unable to load pricing items', error);
    return [];
  }

  return (data || []).map((item) => ({
    id: item.id,
    service: item.service,
    state: item.state,
    cost: numberOrNull(item.cost),
    total_cost: numberOrNull(item.total_cost),
    church_price: numberOrNull(item.church_price),
    staffing_price: numberOrNull(item.staffing_price),
    trucking_price: numberOrNull(item.trucking_price),
    high_volume_price: numberOrNull(item.high_volume_price),
    general_price: numberOrNull(item.general_price),
  }));
}
