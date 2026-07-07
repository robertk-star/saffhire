import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type PricingItem = {
  id: string;
  service: string;
  state: string;
  church_price: number | null;
  staffing_price: number | null;
  trucking_price: number | null;
  high_volume_price: number | null;
  general_price: number | null;
};

export async function getPricingItems(): Promise<PricingItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('pricing_items')
    .select('id, service, state, church_price, staffing_price, trucking_price, high_volume_price, general_price')
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
    church_price: item.church_price === null ? null : Number(item.church_price),
    staffing_price: item.staffing_price === null ? null : Number(item.staffing_price),
    trucking_price: item.trucking_price === null ? null : Number(item.trucking_price),
    high_volume_price: item.high_volume_price === null ? null : Number(item.high_volume_price),
    general_price: item.general_price === null ? null : Number(item.general_price),
  }));
}
