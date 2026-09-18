import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Star, Users, Building2, Download } from 'lucide-react'
import { Section, Container } from '../components/GlassCard'

const stats = [
  { icon: Building2, value: '120+', label: 'Driving schools' },
  { icon: Users, value: '8,500+', label: 'Students managed' },
  { icon: Download, value: '2,400+', label: 'Downloads' },
  { icon: Star, value: '4.9/5', label: 'Average rating' },
]

const testimonials = [
  {
    quote: 'SoD Pro replaced three separate tools we were using. Scheduling, billing, and student records are now in one place. The instructor app alone saved us hours every week.',
    name: 'Ahmad R.',
    role: 'Owner, Punjab Driving Academy',
    location: 'Lahore, Pakistan',
  },
  {
    quote: 'The WhatsApp integration is a game changer for us. Parents get instant updates about lessons and payments. Our no-show rate dropped by 40% after we started using it.',
    name: 'Fatima S.',
    role: 'Manager, City Driving School',
    location: 'Karachi, Pakistan',
  },
  {
    quote: 'We switched from a web-based system that kept going offline. SoD Pro works without internet and the backup feature gives us peace of mind. Best investment for our school.',
    name: 'Usman K.',
    role: 'Director, Fast Track Driving',
    location: 'Islamabad, Pakistan',
  },
]

export default function SocialProof() {
  return (
    <Section id="testimonials">
      <Container>
        {/* Stats bar */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 8,
            p: { xs: 3, md: 4 },
            borderRadius: '16px',
            background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {stats.map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, color: '#EA580C' }}>
                <stat.icon size={20} />
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: '1.4rem', md: '1.8rem' },
                  background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Testimonials */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              mb: 1.5,
            }}
          >
            Trusted by driving schools across{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Pakistan
            </Box>
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
            Join 120+ driving schools that switched to SoD Pro for reliable, offline-first management.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {testimonials.map((t, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              sx={{
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.4, mb: 2 }}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="#EA580C" style={{ color: '#EA580C' }} />
                ))}
              </Box>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  mb: 3,
                  flex: 1,
                  fontStyle: 'italic',
                }}
              >
                "{t.quote}"
              </Typography>
              <Box>
                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.9rem' }}>
                  {t.name}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                  {t.role}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', mt: 0.3 }}>
                  {t.location}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Section>
  )
}
