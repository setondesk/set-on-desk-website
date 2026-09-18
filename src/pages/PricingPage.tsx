import { useState } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Globe, Plus, Minus } from 'lucide-react'
import SEO from '../components/SEO'
import GlassCard, { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import { PrimaryButton, GhostButton } from '../components/Buttons'
import { DOWNLOAD_LINKS } from '../config/links'
import { useLocalPrice } from '../hooks/useLocalPrice'

const plans = [
  {
    name: 'Trial',
    price: 'Free',
    period: '30-day trial',
    desc: 'Full-featured trial to evaluate before purchasing.',
    features: [
      'All Pro features enabled',
      '30-day full access',
      'Local database included',
      'Community support',
    ],
    cta: 'Start Trial',
    highlight: false,
  },
  {
    name: 'Pro License',
    price: '22,400',
    originalPrice: '32,000',
    period: 'one-time payment',
    desc: 'Lifetime license for one Windows machine. Includes all future updates, support, Instructor App and Website Connector.',
    badge: '30% OFF',
    features: [
      'Everything in Trial',
      'Lifetime license key',
      'All future updates',
      'Priority email & WhatsApp support',
      'Instructor App included',
      'Website Connector included',
    ],
    cta: 'Buy License',
    highlight: true,
  },
]

const pricingFaqs = [
  {
    question: 'Is the trial really free?',
    answer: 'Yes. The 30-day trial has all Pro features enabled — no credit card required, no feature limitations. Download and start using it immediately.',
  },
  {
    question: 'What happens after the trial ends?',
    answer: 'After 30 days, the app prompts you to enter a license key. Your trial data is fully preserved when you upgrade to Pro.',
  },
  {
    question: 'Is this a subscription?',
    answer: 'No. The Pro license is a one-time payment for a lifetime license. There are no monthly or annual fees.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Since the full-featured trial is free, you can evaluate everything before purchasing. Contact support if you have concerns.',
  },
  {
    question: 'Can I use it on multiple computers?',
    answer: 'Each license is for one Windows machine. Multi-machine licenses are available — contact us for details.',
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const local = useLocalPrice()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "SoD Driving School Pro",
    "description": "Lifetime license driving school management software for Windows. One-time payment, no subscriptions.",
    "offers": {
      "@type": "Offer",
      "price": "22400",
      "priceCurrency": "PKR",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <>
      <SEO
        title="Pricing — Simple, Transparent Licensing | Set on Desk"
        description="SoD Driving School Pro pricing: free 30-day trial, then a one-time PKR 22,400 lifetime license. No subscriptions, no per-student fees. Includes instructor app and all future updates."
        canonical="https://setondesk.com/pricing"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section sx={{ pt: 16, pb: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography component="h1" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' }, fontWeight: 700, lineHeight: 1.1, mb: 3 }}>
              Pricing — Simple, Transparent Licensing
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Start with a free trial. When you're ready, a single license unlocks everything — no subscriptions, no per-student fees.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section sx={{ pt: 0 }}>
        <Container>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, maxWidth: 720, mx: 'auto' }}>
            {plans.map((p) => (
              <PricingCard key={p.name} plan={p} local={local} />
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              Need a custom plan, volume pricing, or a reseller partnership?{' '}
              <a href="mailto:help@setondesk.com" style={{ color: '#EA580C', fontWeight: 500 }}>Get in touch</a>.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* What's Included */}
      <Section>
        <Container>
          <SectionHeading label="Included" title="What's in the Pro License" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 800, mx: 'auto' }}>
            {[
              { title: 'Desktop Application', desc: 'Windows 10/11 (x64) with local database. Works offline.' },
              { title: 'Instructor Android App', desc: 'Free companion APK — daily lessons, signatures, GPS tracking.' },
              { title: 'Website Connector', desc: 'Accept online booking requests from your website directly into the app.' },
              { title: 'All Future Updates', desc: 'Free updates for the lifetime of the product.' },
              { title: 'Priority Support', desc: 'Email and WhatsApp support for setup, migration, and issues.' },
              { title: 'WhatsApp Integration', desc: 'Send booking confirmations, reminders, and payment alerts.' },
            ].map((item) => (
              <Box key={item.title} sx={{ p: 3, borderRadius: '12px', background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <SectionHeading label="Questions" title="Pricing FAQ" />
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            {pricingFaqs.map((faq, i) => (
              <Box key={i} sx={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Box
                  component="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  sx={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 2, py: 2.5, px: 0, background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left', color: '#fff',
                    fontFamily: "'Manrope', sans-serif", fontWeight: 600,
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    transition: 'color 0.2s', '&:hover': { color: '#EA580C' },
                  }}
                >
                  <span>{faq.question}</span>
                  <Box sx={{ flexShrink: 0, color: '#EA580C' }}>
                    {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </Box>
                </Box>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <Typography sx={{ pb: 2.5, fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 650 }}>
                        {faq.answer}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            ))}
          </Box>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <a href="/faq" style={{ color: '#EA580C', fontSize: '0.9rem', fontWeight: 500 }}>View all FAQs →</a>
          </Box>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Typography component="h2" sx={{ fontFamily: "'Manrope', sans-serif", fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
              Ready to Get Started?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}>
              Download the free trial and see if Set on Desk is right for your driving school.
            </Typography>
            <a href={DOWNLOAD_LINKS.windows} download style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 32px', borderRadius: '8px', background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
              Download Free Trial
            </a>
          </Box>
        </Container>
      </Section>
    </>
  )
}

function PricingCard({ plan: p, local }: { plan: typeof plans[number]; local: { price: string; currency: string } }) {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
      <GlassCard accent={p.highlight} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', ...(p.highlight && { borderColor: 'rgba(234,88,12,0.25)', boxShadow: '0 0 30px rgba(234,88,12,0.06)' }) }}>
        {p.highlight && p.badge && (
          <Chip icon={<Sparkles size={12} />} label={p.badge} size="small" sx={{ position: 'absolute', top: 12, right: 12, background: 'linear-gradient(135deg, rgba(229,41,41,0.2) 0%, rgba(234,88,12,0.15) 100%)', color: '#EA580C', border: '1px solid rgba(234,88,12,0.3)', fontSize: '0.65rem', fontWeight: 600, height: 22, '& .MuiChip-icon': { mr: 0.5 } }} />
        )}
        <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem', mb: 1.5 }}>{p.name}</Typography>
        {p.highlight ? (
          <Box sx={{ mb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography component="span" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.9rem' }}>PKR {p.price}</Typography>
              <Typography component="span" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>PKR {p.originalPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.3 }}>
              <Globe size={11} style={{ color: '#06B6D4' }} />
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>≈ {local.price} {local.currency}</Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', mt: 0.3 }}>{p.period}</Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 0.5 }}>
            <Typography component="span" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.9rem' }}>{p.price}</Typography>
            <Typography component="span" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', ml: 1 }}>{p.period}</Typography>
          </Box>
        )}
        <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', mb: 2, lineHeight: 1.5 }}>{p.desc}</Typography>
        <Box sx={{ flex: 1 }}>
          {p.features.map((f) => (
            <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.highlight ? 'linear-gradient(135deg, rgba(229,41,41,0.2) 0%, rgba(234,88,12,0.15) 100%)' : 'rgba(34,197,94,0.12)', color: p.highlight ? '#EA580C' : '#22C55E', flexShrink: 0 }}>
                <Check size={10} />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>{f}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 3 }}>
          {p.highlight ? (
            <a href="mailto:help@setondesk.com?subject=Purchase%20Pro%20License" style={{ textDecoration: 'none', display: 'block' }}>
              <PrimaryButton fullWidth sx={{ py: 1, fontSize: '0.82rem' }}>{p.cta}</PrimaryButton>
            </a>
          ) : (
            <a href={DOWNLOAD_LINKS.windows} download style={{ textDecoration: 'none', display: 'block' }}>
              <GhostButton component="span" fullWidth sx={{ py: 1, fontSize: '0.82rem' }}>{p.cta}</GhostButton>
            </a>
          )}
        </Box>
      </GlassCard>
    </Box>
  )
}
