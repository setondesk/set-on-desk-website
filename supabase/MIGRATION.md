# Supabase Migration — SoD Driving School Pro

Copy the SQL code block below and paste it into the **Supabase SQL Editor** as a new query, then click **Run**.

---

## How to run

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (`ogqvvognhzubopbnskbb`)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Paste the entire SQL below
6. Click **Run** (or press `Ctrl+Enter`)

---

## SQL

```sql
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
                    check (status in ('pending', 'completed', 'failed', 'refunded')),
  payment_method      text,
  payment_reference   text,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.orders is 'Purchase orders and payment records.';


-- =====================================================================
-- 4. LICENSE ACTIVATIONS TABLE
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
-- 5. HELPER: GENERATE A LICENSE KEY
--    Format: SOD-XXXX-XXXX-XXXX-XXXX  (alphanumeric, uppercase)
-- =====================================================================

create or replace function public.generate_license_key()
returns text
language plpgsql
as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
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
-- 6. TRIGGER: AUTO-CREATE PROFILE ON SIGNUP
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
-- 7. TRIGGER: AUTO-UPDATE updated_at TIMESTAMP
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
-- 8. ROW LEVEL SECURITY (RLS)
-- =====================================================================

alter table public.profiles  enable row level security;
alter table public.licenses  enable row level security;
alter table public.orders    enable row level security;
alter table public.license_activations enable row level security;

-- Grant table-level privileges to authenticated users
grant select, insert, update on public.profiles to authenticated;
grant select on public.licenses to authenticated;
grant select, insert on public.orders to authenticated;
grant select on public.license_activations to authenticated;

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
-- 9. INDEXES (performance)
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


-- =====================================================================
-- DONE
-- =====================================================================
```

---

## Step 2: Set up Automatic Email (SMTP)

After running the SQL above, configure email so customers receive their license key automatically.

### Option A: Using Google Workspace (your current email)

Since you have Google Workspace connected to `setondesk.com`, you can send from `help@setondesk.com`:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → **Project Settings** → **Email**
2. Enable **Custom SMTP**
3. Use these settings:
   - **SMTP Host:** `smtp.gmail.com`
   - **SMTP Port:** `587`
   - **SMTP User:** `help@setondesk.com`
   - **SMTP Pass:** *(see below)*
   - **Sender Name:** `Set On Desk`
   - **SMTP From:** `help@setondesk.com`

> **For the password:** You need an **App Password** (not your regular password).
> 1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
> 2. Enable **2-Step Verification** (if not already)
> 3. Search for **App passwords**
> 4. Create a new app password → copy the 16-character code
> 5. Paste it as the SMTP Pass

### Option B: Using Brevo (recommended — free 300 emails/day)

Brevo is more reliable for transactional emails:

1. Sign up at [brevo.com](https://www.brevo.com) (free)
2. Go to **SMTP & API** → copy your credentials
3. In Supabase → **Project Settings** → **Email** → **Custom SMTP**:
   - **SMTP Host:** `smtp-relay.brevo.com`
   - **SMTP Port:** `587`
   - **SMTP Login:** *(your Brevo login email)*
   - **SMTP Password:** *(your Brevo master API key)*
   - **SMTP From:** `help@setondesk.com`

---

## Step 3: Deploy the Payment Webhook (Edge Function)

The edge function at `supabase/functions/payment-webhook/index.ts` handles automatic license generation + email.

### Deploy via Supabase CLI:
```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref ogqvvognhzubopbnskbb

# Deploy the function
supabase functions deploy payment-webhook
```

### Or deploy manually:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → **Edge Functions**
2. Click **Create a New Function**
3. Name it `payment-webhook`
4. Paste the contents of `supabase/functions/payment-webhook/index.ts`
5. Click **Deploy**

### Set environment variables:
In Supabase Dashboard → **Edge Functions** → `payment-webhook` → **Settings**:
- `SMTP_HOST` — your SMTP host (e.g. `smtp-relay.brevo.com`)
- `SMTP_PORT` — `587`
- `SMTP_USER` — your SMTP username
- `SMTP_PASS` — your SMTP password
- `SMTP_FROM` — `Set On Desk <help@setondesk.com>`

---

## How the automatic flow works

```
User clicks "Buy License"
        │
        ▼
┌─────────────────────┐
│  Sign Up / Sign In  │  ← PurchaseDialog handles auth
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Select Payment     │  ← Card / JazzCash / EasyPaisa / Bank
│  Method             │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Payment Details    │  ← Order created in Supabase (pending)
│  + "I Have Paid"    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  License Generated  │  ← generate_license_key() called
│  + Order → completed│  ← order status updated
│  + Email Sent       │  ← user receives SOD-XXXX-XXXX-XXXX-XXXX
└─────────────────────┘
```

---

## What this creates

| Table | Purpose |
|---|---|
| `profiles` | User profiles linked to auth — name, business, country, phone |
| `licenses` | License keys (SOD-XXXX-XXXX-XXXX-XXXX), plan, status, expiry |
| `orders` | Purchase records — amount, currency, payment status |
| `license_activations` | Machine fingerprint tracking per license |

**Functions & Triggers:**
- `generate_license_key()` — auto-generates `SOD-XXXX-XXXX-XXXX-XXXX` keys
- `handle_new_user()` — auto-creates profile on signup
- `payment-webhook` (Edge Function) — processes payment, generates license, sends email
- `handle_updated_at()` — auto-updates timestamps on edit

**Security:**
- Row Level Security (RLS) enabled on all tables
- Users can only see their own data
- Service role can manage licenses/orders/activations
