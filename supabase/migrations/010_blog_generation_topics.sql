-- Phase 17: Admin-managed blog generation topics
-- Safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists public.blog_generation_topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  topic text not null,
  angle text not null,
  category text not null,
  keywords text[] not null default '{}',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_generation_topics_active_sort_idx
on public.blog_generation_topics (active, sort_order, created_at);

create or replace function public.set_blog_generation_topics_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_generation_topics_set_updated_at on public.blog_generation_topics;
create trigger blog_generation_topics_set_updated_at
before update on public.blog_generation_topics
for each row execute function public.set_blog_generation_topics_updated_at();

insert into public.blog_generation_topics (slug, topic, angle, category, keywords, sort_order, active)
values
  ('identity-verification-before-background-check', 'Identity verification before the background check', 'Explain why employers need to know who they are screening before relying on background check results.', 'Hiring Risk', array['identity verification', 'background check', 'remote hiring', 'applicant fraud'], 10, true),
  ('county-criminal-checks-vs-national-database-searches', 'County criminal checks vs national database searches', 'Show why national database searches are useful but not enough for many hiring decisions.', 'Criminal Background Checks', array['county criminal check', 'national criminal database', 'employment screening'], 20, true),
  ('background-screening-for-small-businesses', 'Background screening for small businesses', 'Help small businesses understand how to screen without setup fees, minimums, or overbuilt packages.', 'Small Business Screening', array['small business background checks', 'hiring risk', 'employee screening'], 30, true),
  ('volunteer-background-checks-for-churches-and-nonprofits', 'Volunteer background checks for churches and nonprofits', 'Explain how volunteer screening protects trust, safety, and vulnerable populations.', 'Volunteer Screening', array['volunteer background checks', 'church background screening', 'nonprofit screening'], 40, true),
  ('healthcare-oig-exclusion-screening', 'Healthcare OIG exclusion screening', 'Explain why healthcare employers should review sanctions, exclusions, and license-related risks.', 'Healthcare Compliance', array['OIG exclusion check', 'healthcare sanctions', 'healthcare background checks'], 50, true),
  ('mvr-checks-for-employees-who-drive', 'MVR checks for employees who drive', 'Explain why driving records matter even when driving is only part of the job.', 'Transportation Screening', array['MVR checks', 'driving records', 'employee drivers'], 60, true),
  ('ai-powered-resume-fraud-and-employment-verification', 'AI-powered resume fraud and employment verification', 'Connect AI-assisted resumes to the need for employment and education verification.', 'Hiring Risk', array['AI resume fraud', 'employment verification', 'education verification'], 70, true),
  ('background-check-delays-and-how-employers-can-reduce-them', 'Background check delays and how employers can reduce them', 'Explain practical ways employers can reduce delays without cutting corners.', 'Hiring Efficiency', array['background check delays', 'time to hire', 'screening turnaround'], 80, true),
  ('role-based-background-screening-packages', 'Role-based background screening packages', 'Teach employers why every role does not need the same screening package.', 'Background Screening Strategy', array['screening packages', 'role-based screening', 'employment background checks'], 90, true),
  ('background-screening-for-staffing-companies', 'Background screening for staffing companies', 'Explain why staffing firms need speed, consistency, client protection, and compliance-minded screening.', 'Staffing Screening', array['staffing background checks', 'temporary worker screening', 'client risk'], 100, true),
  ('drug-testing-policy-basics-for-employers', 'Drug testing policy basics for employers', 'Explain pre-employment, random, post-accident, and reasonable-suspicion drug testing in plain language.', 'Drug Screening', array['drug testing', 'pre-employment drug screening', 'employer drug policy'], 110, true),
  ('education-verification-in-modern-hiring', 'Education verification in modern hiring', 'Explain why employers should verify degrees and credentials when a role depends on them.', 'Verification', array['education verification', 'degree verification', 'credential fraud'], 120, true)
on conflict (slug) do nothing;

alter table public.blog_generation_topics enable row level security;

drop policy if exists "No public access to blog generation topics" on public.blog_generation_topics;
create policy "No public access to blog generation topics"
on public.blog_generation_topics
for all
to anon, authenticated
using (false)
with check (false);

notify pgrst, 'reload schema';
