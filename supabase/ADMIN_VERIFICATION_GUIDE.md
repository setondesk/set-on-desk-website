# Admin Payment Verification Guide

## Manual Verification Flow (Option 3)

When a customer purchases a SoD Driving School Pro license using JazzCash, EasyPaisa, or Bank Transfer, the flow is:

```
Customer signs up → verifies email → selects payment method → sees payment details
→ uploads payment proof → order status = "awaiting_verification"
→ ADMIN VERIFIES → license generated → email sent to customer
```

---

## How to Verify a Payment

### Step 1: Check for Pending Verifications

Go to **Supabase Dashboard → Table Editor → orders**

Filter by:
- `status` = `awaiting_verification`

Or run this SQL in the **SQL Editor**:

```sql
SELECT
  o.id AS order_id,
  o.amount,
  o.currency,
  o.payment_method,
  o.proof_url,
  o.paid_at,
  o.created_at,
  p.email,
  p.full_name,
  p.business_name
FROM public.orders o
JOIN public.profiles p ON p.id = o.user_id
WHERE o.status = 'awaiting_verification'
ORDER BY o.created_at DESC;
```

### Step 2: View the Payment Proof

Click the `proof_url` link to see the customer's uploaded screenshot/receipt.

Verify that:
- The amount matches **PKR 22,400**
- The payment is to your correct account
- The transaction looks legitimate

### Step 3: Generate License & Complete Order

If the payment is valid, run this SQL (replace `ORDER_UUID` with the actual order ID):

```sql
-- 1. Generate a license key
SELECT generate_license_key();

-- 2. Create the license (use the key from step 1)
INSERT INTO public.licenses (user_id, license_key, plan, status, activated_at)
VALUES (
  (SELECT user_id FROM public.orders WHERE id = 'ORDER_UUID'),
  'SOD-XXXX-XXXX-XXXX-XXXX',  -- <-- paste the generated key here
  'pro',
  'active',
  now()
);

-- 3. Update the order to completed
UPDATE public.orders
SET
  status = 'completed',
  license_id = (SELECT id FROM public.licenses WHERE license_key = 'SOD-XXXX-XXXX-XXXX-XXXX'),
  updated_at = now()
WHERE id = 'ORDER_UUID';
```

### Step 4: Send the License Key Email

Go to **Supabase Dashboard → Edge Functions → payment-webhook → Invoke**

Or send a POST request:

```bash
curl -X POST https://ogqvvognhzubopbnskbb.supabase.co/functions/v1/payment-webhook \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"order_id": "ORDER_UUID", "status": "completed"}'
```

The edge function will:
- Look up the order
- Find the user's email
- Send the license key email automatically

---

## Quick SQL: Approve & Auto-Generate (All-in-One)

Run this single query to generate a license, link it to the order, and mark it completed:

```sql
DO $$
DECLARE
  new_key text;
  new_license_id uuid;
  target_order_id uuid := 'ORDER_UUID';  -- <-- replace this
  target_user_id uuid;
BEGIN
  -- Get the user_id for this order
  SELECT user_id INTO target_user_id FROM public.orders WHERE id = target_order_id;

  -- Generate key
  new_key := generate_license_key();

  -- Create license
  INSERT INTO public.licenses (user_id, license_key, plan, status, activated_at)
  VALUES (target_user_id, new_key, 'pro', 'active', now())
  RETURNING id INTO new_license_id;

  -- Update order
  UPDATE public.orders
  SET status = 'completed', license_id = new_license_id, updated_at = now()
  WHERE id = target_order_id;

  RAISE NOTICE 'License created: % for order %', new_key, target_order_id;
END $$;
```

Then trigger the email:

```bash
curl -X POST https://ogqvvognhzubopbnskbb.supabase.co/functions/v1/payment-webhook \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"order_id": "ORDER_UUID", "status": "completed"}'
```

---

## Order Status Reference

| Status | Meaning |
|--------|---------|
| `pending` | Order created, payment not yet made |
| `awaiting_verification` | Customer uploaded proof, waiting for admin |
| `completed` | Payment verified, license issued |
| `failed` | Payment failed or rejected |
| `refunded` | Payment refunded to customer |

---

## WhatsApp Support

If you need to contact the customer:
- Their phone number is in `public.profiles.phone`
- Or reply to their email directly
- WhatsApp: +92 306 688 8855
