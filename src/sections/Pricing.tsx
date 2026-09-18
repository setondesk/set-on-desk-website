import { Box, Typography, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { Check, Sparkles, Globe } from 'lucide-react'
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

export default function Pricing({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          label="Pricing"
          title="Simple, transparent licensing."
          subtitle="Start with a free trial. When you're ready, a single license unlocks everything — no subscriptions, no per-student fees."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2.5,
            maxWidth: 720,
            mx: 'auto',
          }}
        >
          {plans.map((p) => (
            <PricingCard key={p.name} plan={p} onBuy={onBuyClick} />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Need a custom plan, volume pricing, or a reseller partnership?{' '}
            <a href="#contact" style={{ color: '#EA580C', fontWeight: 500 }}>Get in touch</a>.
          </Typography>
        </Box>
      </Container>
    </Section>
  )
}

function PricingCard({ plan: p, onBuy }: { plan: typeof plans[number]; onBuy: () => void }) {
  const local = useLocalPrice()

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard
        accent={p.highlight}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...(p.highlight && {
            borderColor: 'rgba(234,88,12,0.25)',
            boxShadow: '0 0 30px rgba(234,88,12,0.06)',
          }),
        }}
      >
        {p.highlight && p.badge && (
          <Chip
            icon={<Sparkles size={12} />}
            label={p.badge}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'linear-gradient(135deg, rgba(229,41,41,0.2) 0%, rgba(234,88,12,0.15) 100%)',
              color: '#EA580C',
              border: '1px solid rgba(234,88,12,0.3)',
              fontSize: '0.65rem',
              fontWeight: 600,
              height: 22,
              '& .MuiChip-icon': { mr: 0.5 },
            }}
          />
        )}

        <Typography
          component="h3"
          sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem', mb: 1.5 }}
        >
          {p.name}
        </Typography>

        {p.highlight ? (
          <Box sx={{ mb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography
                component="span"
                sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.9rem' }}
              >
                PKR {p.price}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'line-through',
                }}
              >
                PKR {p.originalPrice}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.3 }}>
              <Globe size={11} style={{ color: '#06B6D4' }} />
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>
                ≈ {local.price} {local.currency}
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', mt: 0.3 }}>
              {p.period}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 0.5 }}>
            <Typography
              component="span"
              sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.9rem' }}
            >
              {p.price}
            </Typography>
            <Typography component="span" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', ml: 1 }}>
              {p.period}
            </Typography>
          </Box>
        )}

        <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', mb: 2, lineHeight: 1.5 }}>
          {p.desc}
        </Typography>

        <Box sx={{ flex: 1 }}>
          {p.features.map((f) => (
            <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: p.highlight
                    ? 'linear-gradient(135deg, rgba(229,41,41,0.2) 0%, rgba(234,88,12,0.15) 100%)'
                    : 'rgba(34,197,94,0.12)',
                  color: p.highlight ? '#EA580C' : '#22C55E',
                  flexShrink: 0,
                }}
              >
                <Check size={10} />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>{f}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 3 }}>
          {p.highlight ? (
            <PrimaryButton onClick={onBuy} fullWidth sx={{ py: 1, fontSize: '0.82rem' }}>
              {p.cta}
            </PrimaryButton>
          ) : (
            <a href={DOWNLOAD_LINKS.windows} download style={{ textDecoration: 'none', display: 'block' }}>
              <GhostButton component="span" fullWidth sx={{ py: 1, fontSize: '0.82rem' }}>
                {p.cta}
              </GhostButton>
            </a>
          )}
        </Box>
      </GlassCard>
    </Box>
  )
}
