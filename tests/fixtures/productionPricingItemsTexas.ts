// public.pricing_items for Texas as stored in production (Supabase project ggtlbhyvyqkligdqircs), read-only on
// Thu Oct 29, 2026. Values copied verbatim (service names include the production spelling "Civil Seaarch Lower Only").
// Production has 816 rows: 16 services × 51 states, every category column filled (no nulls).
import type { CatalogPricingItem } from '../../lib/proposalBuilder';

type Row = [service: string, totalCost: number, church: number, staffing: number, trucking: number, highVolume: number, general: number];
const rows: Row[] = [
  ['Civil Seaarch Lower Only', 5.32, 6.5, 7.5, 7.5, 6.5, 7.5],
  ['Civil Search Upper & Lower', 10, 11, 11, 11, 11, 11],
  ['Civil Search Upper Only', 5.32, 6.5, 7.5, 7.5, 6.5, 7.5],
  ['Continuous Monitoring', 0, 2, 2.5, 1, 2, 1],
  ['County Criminal Search', 4.1756, 5, 7, 9, 6, 8.5],
  ['DOT Verification', 0, 5, 6.5, 5, 5, 5],
  ['Drug Screening', 25.6, 28.5, 35, 30, 28.5, 37],
  ['Education Verification', 6.76, 9, 10, 10, 9, 10],
  ['Employment Verification', 6.76, 9, 10, 10, 9, 10],
  ['Federal Search', 1.58, 5, 6.5, 10, 5, 8],
  ['Healthcare/MedEx/OIG', 6.67, 8, 9, 9, 8, 9],
  ['Medical License Verification', 5.11, 9, 11, 11, 9, 11],
  ['MVR', 2.36, 4.5, 5.5, 4.5, 4.5, 4.5],
  ['National Criminal Alias Search', 1.58, 6.5, 6.5, 16.5, 5, 6.5],
  ['Safety Performance', 0, 10, 13.5, 10, 10, 10],
  ['State Database Search', 1.52, 3, 4, 4, 3, 4],
];

export const texasItems: CatalogPricingItem[] = rows.map(([service, total_cost, church_price, staffing_price, trucking_price, high_volume_price, general_price], i) => ({
  id: `tx-${i}`, service, state: 'Texas', cost: null, total_cost, church_price, staffing_price, trucking_price, high_volume_price, general_price,
}));
