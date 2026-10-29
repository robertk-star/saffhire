// The three saved price sheets as stored in production (public.proposal_pricing_pages, Supabase project
// ggtlbhyvyqkligdqircs), read-only on Thu Oct 29, 2026. Values copied verbatim; ids shortened. No flag column exists.
import type { BaseSheet, SheetRow } from '../../lib/proposalBuilder';

const rows = (s: string): SheetRow[] => s.split('|').map((x) => { const [label, price] = x.split('='); return { label, price }; });

export const MIN = rows('Social Security Trace=$5.00|Sex Offender Registry=Included|Global Security Watch List=Included|National Database Search=Included');
export const IND = rows('Federal Search=$5.00|MVR=$4.50|Safety Performance=$10.00|DOT Verification=$5.00|1 County Criminal Search=$6.00|3 County Criminal Searches=$16.50|Civil Search Upper Only=$6.50|Civil Search Lower Only=$6.50|Civil Search Upper & Lower=$11.00|Education Verification=$9.00|Employment Verification=$9.00|WOTC=$5.00|Drug Screening=$28.50|State Database Search=$3.00|Healthcare/MedEx/OIG=$8.00|Medical License Verification=$9.00|Continuous Monitoring=$2.00');
export const MIN_COV = rows('Social Security Trace=$5.50|Sex Offender Registry=Included|Global Security Watch List=Included|National Database Search=Included');
export const IND_COV = rows('Federal Search=$5.50|MVR=$4.95|Safety Performance=$11.00|DOT Verification=$5.50|1 County Criminal Search=$6.60|3 County Criminal Searches=$18.15|Civil Search Upper Only=$7.15|Civil Search Lower Only=$7.15|Civil Search Upper & Lower=$12.10|Education Verification=$9.90|Employment Verification=$9.90|WOTC=$5.50|Drug Screening=$31.35|State Database Search=$3.30|Healthcare/MedEx/OIG=$8.80|Medical License Verification=$9.90|Continuous Monitoring=$2.20');

export const productionSheets: BaseSheet[] = [
  { id: '28b559e6', name: 'SaffHire Direct Pricing', description: 'Standard direct client pricing from the sample proposal.', minimum_package: MIN, individual_pricing: IND },
  { id: 'c42d6dcc', name: 'Saffhire Pricing', description: 'Pricing oriented for staffing company clients.', minimum_package: MIN, individual_pricing: IND },
  { id: 'd1024696', name: 'Staffing + 10% Sales Coverage', description: 'Staffing pricing with a 10% uplift to cover salesperson cost.', minimum_package: MIN_COV, individual_pricing: IND_COV },
];
