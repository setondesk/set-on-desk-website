/**
 * Payment Webhook — Auto License Generation + Email
 *
 * Deploy this edge function to Supabase, then configure your payment
 * gateway (Stripe / JazzCash / EasyPaisa) to POST to its URL.
 *
 * Flow:
 *   1. Payment gateway sends webhook on successful payment
 *   2. This function verifies the payload
 *   3. Generates a license key via generate_license_key()
 *   4. Creates a license row assigned to the user
 *   5. Updates the order to 'completed'
 *   6. Sends the user an email with their license key
 *
 * Environment variables needed (set in Supabase Dashboard → Edge Functions):
 *   - SUPABASE_URL (auto-set)
 *   - SUPABASE_SERVICE_ROLE_KEY (auto-set)
 *   - SMTP_HOST     — e.g. smtp-relay.brevo.com or your Google Workspace SMTP
 *   - SMTP_PORT     — e.g. 587
 *   - SMTP_USER     — e.g. help@setondesk.com
 *   - SMTP_PASS     — app password
 *   - SMTP_FROM     — e.g. "Set On Desk <help@setondesk.com>"
 *   - STRIPE_SECRET_KEY (if using Stripe)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const SMTP_HOST = Deno.env.get('SMTP_HOST') ?? ''
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT') ?? '587')
const SMTP_USER = Deno.env.get('SMTP_USER') ?? ''
const SMTP_PASS = Deno.env.get('SMTP_PASS') ?? ''
const SMTP_FROM = Deno.env.get('SMTP_FROM') ?? 'Set On Desk <help@setondesk.com>'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

serve(async (req: Request) => {
  try {
    // Only accept POST
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
    }

    const body = await req.json()

    // ── Identify the order ──────────────────────────────────────────
    // Adapt these fields to your payment gateway's webhook payload.
    // Stripe example: body.data.object.metadata.order_id
    // JazzCash/EasyPaisa: custom integration sends { order_id, status }
    const orderId: string = body.order_id || body?.data?.object?.metadata?.order_id
    const paymentStatus: string = body.status || body?.data?.object?.status

    if (!orderId) {
      return new Response(JSON.stringify({ error: 'Missing order_id' }), { status: 400 })
    }

    // Only process successful payments
    if (paymentStatus !== 'completed' && paymentStatus !== 'succeeded' && paymentStatus !== 'paid') {
      return new Response(JSON.stringify({ message: 'Payment not completed, skipping' }), { status: 200 })
    }

    // ── Fetch the order ─────────────────────────────────────────────
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderErr || !order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 })
    }

    // Skip if already completed
    if (order.status === 'completed') {
      return new Response(JSON.stringify({ message: 'Order already processed' }), { status: 200 })
    }

    // ── Generate license key ────────────────────────────────────────
    const { data: keyData, error: keyErr } = await supabase.rpc('generate_license_key')
    if (keyErr) throw keyErr

    // ── Create license ──────────────────────────────────────────────
    const { data: license, error: licErr } = await supabase
      .from('licenses')
      .insert({
        user_id: order.user_id,
        license_key: keyData,
        plan: 'pro',
        status: 'active',
        activated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (licErr) throw licErr

    // ── Update order to completed ───────────────────────────────────
    await supabase
      .from('orders')
      .update({ status: 'completed', license_id: license.id })
      .eq('id', orderId)

    // ── Get user email ──────────────────────────────────────────────
    const { data: userData } = await supabase.auth.admin.getById(order.user_id)
    const userEmail = userData?.email

    // ── Send email ──────────────────────────────────────────────────
    if (userEmail && SMTP_HOST) {
      await sendLicenseEmail(userEmail, keyData, license.plan)
    }

    return new Response(
      JSON.stringify({ success: true, license_key: keyData, order_id: orderId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

// ── Email sender ──────────────────────────────────────────────────────
async function sendLicenseEmail(to: string, licenseKey: string, plan: string) {
  const subject = `Your SoD Driving School Pro License Key`
  const html = licenseEmailTemplate(licenseKey, plan)

  // Using SMTP via Deno's built-in SMTP client
  try {
    const conn = await Deno.connectTls({ hostname: SMTP_HOST, port: SMTP_PORT })
    const encoder = new TextEncoder()

    const send = async (cmd: string) => {
      await conn.write(encoder.encode(cmd + '\r\n'))
      // Read response (simplified)
    }

    await send(`EHLO setondesk.com`)
    await send(`AUTH LOGIN`)
    await send(btoa(SMTP_USER))
    await send(btoa(SMTP_PASS))
    await send(`MAIL FROM:<${SMTP_FROM.split('<')[1]?.split('>')[0] || SMTP_USER}>`)
    await send(`RCPT TO:<${to}>`)
    await send(`DATA`)
    await send(`From: ${SMTP_FROM}`)
    await send(`To: ${to}`)
    await send(`Subject: ${subject}`)
    await send(`Content-Type: text/html; charset=utf-8`)
    await send(``)
    await send(html)
    await send(`.`)
    await send(`QUIT`)

    conn.close()
  } catch (err) {
    console.error('Email send failed:', err)
  }
}

// ── Email template ───────────────────────────────────────────────────
function licenseEmailTemplate(key: string, plan: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#14141E;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">
        <!-- Accent bar -->
        <tr><td height="3" style="background:linear-gradient(135deg,#E52929 0%,#EA580C 100%);"></td></tr>
        <!-- Content -->
        <tr><td style="padding:40px 36px;">
          <h1 style="margin:0 0 8px;font-size:22px;color:#fff;font-family:'Segoe UI',sans-serif;">Your License is Ready</h1>
          <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.6;">Thank you for purchasing SoD Driving School Pro. Your license key is below.</p>
          <!-- License key box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:12px;margin-bottom:24px;">
            <tr><td style="padding:20px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;">License Key</p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:24px;font-weight:700;color:#22C55E;letter-spacing:0.08em;">${key}</p>
            </td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:14px;color:rgba(255,255,255,0.7);"><strong>Plan:</strong> ${plan.charAt(0).toUpperCase() + plan.slice(1)}</p>
          <p style="margin:0 0 8px;font-size:14px;color:rgba(255,255,255,0.7);"><strong>Type:</strong> Lifetime · 1 machine</p>
          <p style="margin:0 0 24px;font-size:14px;color:rgba(255,255,255,0.7);"><strong>Support:</strong> help@setondesk.com</p>
          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="background:linear-gradient(135deg,#E52929 0%,#EA580C 100%);border-radius:8px;">
              <a href="https://setondesk.com" style="display:inline-block;padding:14px 32px;color:#fff;text-decoration:none;font-weight:600;font-size:15px;">Download the App</a>
            </td></tr>
          </table>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.35);line-height:1.6;">Need help? Reply to this email or reach us on WhatsApp at +92 306 688 8855.</p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">© 2026 Set On Desk. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
