alter table public.driver_pipeline_authorizations
  add column if not exists locale text not null default 'en';
