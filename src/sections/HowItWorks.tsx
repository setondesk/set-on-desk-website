import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Download, Building2, Users, CalendarClock, DollarSign, TrendingUp } from 'lucide-react'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

const steps = [
  {
    icon: Download,
    step: '01',
    title: 'Install',
    desc: 'Download and install SoD Driving School Pro on your Windows PC. Activate your license key or start a trial instantly.',
  },
  {
    icon: Building2,
    step: '02',
    title: 'Set Up Your Business',
    desc: 'Configure your school name, country, currency, working days, public holidays and branding — all in one place.',
  },
  {
    icon: Users,
    step: '03',
    title: 'Add Students & Instructors',
    desc: 'Register students, assign courses and instructors, and set up fee structures. Import existing records with ease.',
  },
  {
    icon: CalendarClock,
    step: '04',
    title: 'Schedule Lessons',
    desc: 'Let the smart scheduler auto-assign lesson slots, or manually arrange them. Instructors get notified via the app.',
  },
  {
    icon: DollarSign,
    step: '05',
    title: 'Track Finance',
    desc: 'Monitor revenue, expenses and pending fees in real time. Generate financial reports and business analytics at a glance.',
  },
  {
    icon: TrendingUp,
    step: '06',
    title: 'Grow',
    desc: 'Use performance analytics, instructor insights and student progress data to make decisions that grow your school.',
  },
]

const lineVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
}

export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '40%',
          right: '-10%',
          width: 450,
          height: 450,
          background: 'radial-gradient(circle, rgba(229,41,41,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container>
        <SectionHeading
          label="How It Works"
          title="Up and running in minutes."
          subtitle="From install to daily operations in six simple steps. No complex setup, no internet dependency."
        />

        <Box sx={{ position: 'relative' }}>
          {/* Vertical line (desktop) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: 2,
              background: 'linear-gradient(180deg, transparent 0%, rgba(234,88,12,0.3) 20%, rgba(234,88,12,0.3) 80%, transparent 100%)',
              transform: 'translateX(-50%)',
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 6 } }}>
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0
              return (
                <Box
                  key={s.step}
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  sx={{
                    display: { xs: 'block', md: 'grid' },
                    gridTemplateColumns: '1fr 60px 1fr',
                    gap: 0,
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Left card */}
                  <Box sx={{ gridColumn: isLeft ? '1' : '3', textAlign: { md: isLeft ? 'right' : 'left' } }}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        p: 3,
                        borderRadius: '16px',
                        background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(12px)',
                        textAlign: 'left',
                        maxWidth: 440,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)',
                          border: '1px solid rgba(234,88,12,0.2)',
                          color: '#EA580C',
                          mb: 2,
                        }}
                      >
                        <s.icon size={20} />
                      </Box>
                      <Typography
                        component="h3"
                        sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1.1rem', mb: 0.8 }}
                      >
                        {s.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                        {s.desc}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Center dot */}
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      gridColumn: '2',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: '#fff',
                        boxShadow: '0 0 0 4px rgba(10,10,15,1), 0 0 20px rgba(234,88,12,0.4)',
                        zIndex: 1,
                      }}
                    >
                      {s.step}
                    </Box>
                  </Box>

                  {/* Right placeholder */}
                  <Box sx={{ gridColumn: isLeft ? '3' : '1', display: { xs: 'none', md: 'block' } }} />
                </Box>
              )
            })}
          </Box>
        </Box>
      </Container>
    </Section>
  )
}
