alter table public.driver_pipeline_authorizations
  add column if not exists license_issued date,
  add column if not exists no_middle_name boolean not null default false;
