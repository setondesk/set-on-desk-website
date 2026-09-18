-- =====================================================================
-- SoD Driving School Pro — Initial Schema
-- =====================================================================
-- Paste this entire file into the Supabase SQL Editor as a new query.
-- It is idempotent: safe to run on a fresh project.
-- =====================================================================


-- =====================================================================
-- 1. PROFILES TABLE
--    Extends auth.users with business & contact info.
-- =====================================================================

create table if not exists public.profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  email               text not null,
  full_name           text,
  business_name       text,
  country             text,
  phone               text,
  avatar_url          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.profiles is 'Public profile data for each authenticated user.';


-- =====================================================================
-- 2. LICENSES TABLE
--    Stores generated license keys tied to a user.
-- =====================================================================

create table if not exists public.licenses (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  license_key         text not null unique,
  plan                text not null default 'pro',
  status              text not null default 'active'
                    check (status in ('active', 'trial', 'expired', 'revoked')),
  activated_at        timestamptz,
  expires_at          timestamptz,
  max_machines        int not null default 1,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.licenses is 'License keys issued to customers.';


-- =====================================================================
-- 3. ORDERS TABLE
--    Records every purchase / payment attempt.
-- =====================================================================

create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  license_id          uuid references public.licenses(id) on delete set null,
  amount              numeric(12,2) not null,
  currency            text not null default 'PKR',
  status              text not null default 'pending'
                    check (status in ('pending', 'awaiting_verification', 'completed', 'failed', 'refunded')),
  payment_method      text,
  payment_reference   text,
  proof_url           text,
  paid_at             timestamptz,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.orders is 'Purchase orders and payment records.';

-- Add columns if they don't exist (for existing deployments)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='orders' and column_name='proof_url') then
    alter table public.orders add column proof_url text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='orders' and column_name='paid_at') then
    alter table public.orders add column paid_at timestamptz;
  end if;
  -- Update status constraint to include awaiting_verification
  if exists (select 1 from information_schema.table_constraints where table_name='orders' and constraint_name='orders_status_check') then
    alter table public.orders drop constraint orders_status_check;
  end if;
  alter table public.orders add constraint orders_status_check
    check (status in ('pending', 'awaiting_verification', 'completed', 'failed', 'refunded'));
end $$;


-- =====================================================================
-- 4. LICENSE REQUESTS TABLE
--    Customers submit license requests from their dashboard.
--    Admin approves/denies → triggers license generation.
-- =====================================================================

create table if not exists public.license_requests (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  business_name       text not null,
  owner_name          text not null,
  software            text not null default 'desktop'
                    check (software in ('desktop', 'instructor', 'website')),
  status              text not null default 'pending'
                    check (status in ('pending', 'approved', 'denied')),
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.license_requests is 'License requests submitted by customers via the dashboard.';

-- Trigger for updated_at
drop trigger if exists set_updated_at_license_requests on public.license_requests;
create trigger set_updated_at_license_requests
  before update on public.license_requests
  for each row execute procedure public.handle_updated_at();


-- =====================================================================
-- 5. LICENSE ACTIVATIONS TABLE
--    Tracks which machine (by fingerprint) activated a license.
-- =====================================================================

create table if not exists public.license_activations (
  id                  uuid primary key default gen_random_uuid(),
  license_id          uuid not null references public.licenses(id) on delete cascade,
  machine_fingerprint text not null,
  machine_name        text,
  ip_address          inet,
  activated_at        timestamptz not null default now(),
  last_seen_at        timestamptz not null default now()
);

comment on table public.license_activations is 'Machine activations per license key.';


-- =====================================================================
-- 6. HELPER: GENERATE A LICENSE KEY
--    Format: SOD-XXXX-XXXX-XXXX-XXXX  (alphanumeric, uppercase)
-- =====================================================================

create or replace function public.generate_license_key()
returns text
language plpgsql
as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- no ambiguous 0/O/1/I
  result text := 'SOD';
  i int;
begin
  for i in 1..4 loop
    result := result || '-' || substr(
      array_to_string(
        array(
          select chars[1 + floor(random() * length(chars))::int]
          from generate_series(1, 4)
        ),
        ''
      ),
      1,
      4
    );
  end loop;
  return result;
end;
$$;

comment on function public.generate_license_key is 'Generates a random SOD-XXXX-XXXX-XXXX-XXXX license key.';


-- =====================================================================
-- 7. TRIGGER: AUTO-CREATE PROFILE ON SIGNUP
--    Fires when a new row is inserted into auth.users.
-- =====================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, business_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    coalesce(new.raw_user_meta_data->>'business_name', null)
  );
  return new;
end;
$$;

-- Drop trigger if it exists (from previous run or Supabase default), then recreate
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

comment on function public.handle_new_user is 'Creates a profile row automatically when a user signs up.';


-- =====================================================================
-- 8. TRIGGER: AUTO-UPDATE updated_at TIMESTAMP
-- =====================================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at_licenses on public.licenses;
create trigger set_updated_at_licenses
  before update on public.licenses
  for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at_orders on public.orders;
create trigger set_updated_at_orders
  before update on public.orders
  for each row execute procedure public.handle_updated_at();


-- =====================================================================
-- 9. ROW LEVEL SECURITY (RLS)
-- =====================================================================

alter table public.profiles  enable row level security;
alter table public.licenses  enable row level security;
alter table public.orders    enable row level security;
alter table public.license_activations enable row level security;
alter table public.license_requests enable row level security;

-- Grant table-level privileges to authenticated users
grant select, insert, update on public.profiles to authenticated;
grant select on public.licenses to authenticated;
grant select, insert, update on public.orders to authenticated;
grant select on public.license_activations to authenticated;
grant select, insert on public.license_requests to authenticated;

-- Grant usage on sequences (needed for insert with uuid default)
grant usage, select on all sequences in schema public to authenticated;


-- ---- Profiles ----

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);


-- ---- Licenses ----

drop policy if exists "Users can view own licenses" on public.licenses;
create policy "Users can view own licenses"
  on public.licenses for select
  using (auth.uid() = user_id);

drop policy if exists "Service role can manage licenses" on public.licenses;
create policy "Service role can manage licenses"
  on public.licenses for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ---- Orders ----

drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own orders" on public.orders;
create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

drop policy if exists "Service role can manage orders" on public.orders;
create policy "Service role can manage orders"
  on public.orders for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ---- License Requests ----

drop policy if exists "Users can view own requests" on public.license_requests;
create policy "Users can view own requests"
  on public.license_requests for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own requests" on public.license_requests;
create policy "Users can insert own requests"
  on public.license_requests for insert
  with check (auth.uid() = user_id);

drop policy if exists "Service role can manage requests" on public.license_requests;
create policy "Service role can manage requests"
  on public.license_requests for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ---- License Activations ----

drop policy if exists "Users can view own activations" on public.license_activations;
create policy "Users can view own activations"
  on public.license_activations for select
  using (
    license_id in (select id from public.licenses where user_id = auth.uid())
  );

drop policy if exists "Service role can manage activations" on public.license_activations;
create policy "Service role can manage activations"
  on public.license_activations for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- =====================================================================
-- 10. INDEXES (performance)
-- =====================================================================

create index if not exists idx_profiles_email
  on public.profiles(email);

create index if not exists idx_licenses_user_id
  on public.licenses(user_id);

create index if not exists idx_licenses_key
  on public.licenses(license_key);

create index if not exists idx_orders_user_id
  on public.orders(user_id);

create index if not exists idx_orders_status
  on public.orders(status);

create index if not exists idx_activations_license_id
  on public.license_activations(license_id);

create index if not exists idx_requests_user_id
  on public.license_requests(user_id);

create index if not exists idx_requests_status
  on public.license_requests(status);


-- =====================================================================
-- 10. STORAGE — PAYMENT PROOFS
--     Bucket for users to upload payment screenshots / receipts.
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', true)
on conflict (id) do nothing;

-- RLS policies for payment-proofs bucket
drop policy if exists "Users can upload payment proofs" on storage.objects;
create policy "Users can upload payment proofs"
  on storage.objects for insert
  with check (
    bucket_id = 'payment-proofs'
    and (select auth.role()) = 'authenticated'
  );

drop policy if exists "Users can view payment proofs" on storage.objects;
create policy "Users can view payment proofs"
  on storage.objects for select
  using (
    bucket_id = 'payment-proofs'
  );

drop policy if exists "Users can update payment proofs" on storage.objects;
create policy "Users can update payment proofs"
  on storage.objects for update
  using (
    bucket_id = 'payment-proofs'
    and (select auth.role()) = 'authenticated'
  );

drop policy if exists "Service role can manage payment proofs" on storage.objects;
create policy "Service role can manage payment proofs"
  on storage.objects for all
  using (
    bucket_id = 'payment-proofs'
    and (select auth.role()) = 'service_role'
  )
  with check (
    bucket_id = 'payment-proofs'
    and (select auth.role()) = 'service_role'
  );

grant select, insert on public.orders to authenticated;


-- =====================================================================
-- DONE
-- =====================================================================
