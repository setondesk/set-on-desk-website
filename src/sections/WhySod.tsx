import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Check, X, Zap, Shield, Wifi, DollarSign, Clock, Headphones } from 'lucide-react'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

const comparison = [
  { feature: 'One-time purchase (no monthly fees)', sod: true, others: false },
  { feature: 'Works offline without internet', sod: true, others: false },
  { feature: 'Built-in local database (no cloud fees)', sod: true, others: false },
  { feature: 'Instructor Android app included', sod: true, others: false },
  { feature: 'WhatsApp integration built-in', sod: true, others: false },
  { feature: 'Google Maps pick & drop', sod: true, others: false },
  { feature: 'Automatic certificate generation', sod: true, others: true },
  { feature: 'Website booking connector', sod: true, others: false },
  { feature: 'Priority WhatsApp & email support', sod: true, others: false },
  { feature: 'Free 30-day trial (full features)', sod: true, others: false },
]

const reasons = [
  {
    icon: DollarSign,
    title: 'One-time purchase, lifetime use',
    desc: 'No monthly subscriptions, no per-student fees. Pay PKR 22,400 once and use it forever with all future updates included.',
  },
  {
    icon: Wifi,
    title: 'True offline-first design',
    desc: 'Built on a local database. Your data stays on your machine. Works perfectly without internet — only needs connection for activation and WhatsApp.',
  },
  {
    icon: Zap,
    title: 'Everything in one app',
    desc: 'Student management, scheduling, finance, vehicles, documents, WhatsApp, instructor app, and website connector. No need for multiple tools.',
  },
  {
    icon: Shield,
    title: 'License key security',
    desc: 'Internet-verified licensing tied to your machine. Google Sign-In binding option. Trial management built into the system.',
  },
  {
    icon: Clock,
    title: 'Smart auto-scheduling',
    desc: 'Automatic lesson scheduling that respects working days, public holidays, and instructor availability. Manual override always available.',
  },
  {
    icon: Headphones,
    title: 'Pakistan-based support',
    desc: 'Get help via WhatsApp or email. Real humans who understand Pakistani driving school workflows — not a chatbot or overseas call center.',
  },
]

export default function WhySod() {
  return (
    <Section id="why-sod">
      <Container>
        <SectionHeading
          label="Why SoD Pro"
          title="Built for driving schools that need reliability."
          subtitle="Unlike subscription-based web tools, SoD Pro is a one-time purchase desktop application that works offline, keeps your data local, and includes everything you need."
        />

        {/* Reasons grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2.5,
            mb: 8,
          }}
        >
          {reasons.map((r, i) => (
            <Box
              key={r.title}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              sx={{
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)',
                  border: '1px solid rgba(234,88,12,0.2)',
                  color: '#EA580C',
                  mb: 2,
                }}
              >
                <r.icon size={20} />
              </Box>
              <Typography
                component="h3"
                sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem', mb: 1 }}
              >
                {r.title}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                {r.desc}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Comparison table */}
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              textAlign: 'center',
              mb: 4,
            }}
          >
            SoD Pro vs. other driving school software
          </Typography>

          <Box
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px 80px',
                gap: 0,
                p: 2,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                Feature
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SoD Pro
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textAlign: 'center' }}>
                Others
              </Typography>
            </Box>

            {/* Rows */}
            {comparison.map((row, i) => (
              <Box
                key={row.feature}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 80px',
                  gap: 0,
                  p: 2,
                  borderBottom: i < comparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  '&:hover': { background: 'rgba(255,255,255,0.02)' },
                }}
              >
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
                  {row.feature}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {row.sod ? (
                    <Check size={16} style={{ color: '#22C55E' }} />
                  ) : (
                    <X size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {row.others ? (
                    <Check size={16} style={{ color: '#22C55E' }} />
                  ) : (
                    <X size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Section>
  )
}
