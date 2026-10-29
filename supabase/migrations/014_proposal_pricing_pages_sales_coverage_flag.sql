-- Explicit flag for price sheets whose prices already include the 10% sales coverage (Robert, Oct 29 2026, PR #34).
-- The Proposal Builder uses this flag only (no name/description matching) to lock the checkbox and never add a
-- second 10%. Additive: one new column with a default; RLS, policies and grants on the table are unchanged.
-- Rollback: alter table public.proposal_pricing_pages drop column if exists includes_sales_coverage;

alter table public.proposal_pricing_pages
  add column if not exists includes_sales_coverage boolean not null default false;

comment on column public.proposal_pricing_pages.includes_sales_coverage is
  'True when this sheet''s prices already include the 10% sales coverage. Admin only; never shown to clients.';

-- Existing sheets: the seeded "Staffing + 10% Sales Coverage" sheet and any sheet saved from the builder with
-- coverage already in its prices. Everything else stays false (the default).
update public.proposal_pricing_pages
set includes_sales_coverage = true
where name = 'Staffing + 10% Sales Coverage'
   or (description ilike 'Created from the proposal builder%'
       and (description ilike '%10\% sales coverage%' or description ilike '%+ 10\% Sales Coverage%'));

notify pgrst, 'reload schema';
