create extension if not exists pgcrypto;

create table if not exists public.driver_pipeline_authorizations (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  first_name text not null,
  middle_name text,
  last_name text not null,
  email text not null,
  phone text,
  date_of_birth date not null,
  ssn text not null,
  ssn_last4 text not null,
  dl_number text not null,
  license_expiration date,
  issuing_state text not null,
  current_address text not null,
  dates_lived_here text,
  other_names text,
  years_used text,
  signature_name text not null,
  signature_data_url text not null,
  signed_at timestamptz not null default now(),
  ip_address text,
  user_agent text,
  disclosure_acknowledged boolean not null default false,
  rights_acknowledged boolean not null default false,
  esign_acknowledged boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists driver_pipeline_authorizations_name_idx
  on public.driver_pipeline_authorizations (last_name, first_name);

create index if not exists driver_pipeline_authorizations_signed_at_idx
  on public.driver_pipeline_authorizations (signed_at desc);

alter table public.driver_pipeline_authorizations enable row level security;
