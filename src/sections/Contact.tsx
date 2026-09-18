import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send } from 'lucide-react'
import GlassCard, { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import { PrimaryButton } from '../components/Buttons'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Section id="contact">
      <Container>
        <SectionHeading
          label="Get in Touch"
          title="Let's get you set up."
          subtitle="Reach out for license keys, support, sales questions or anything else. We reply fast — usually within hours."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            maxWidth: 960,
            mx: 'auto',
          }}
        >
          {/* Info */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <GlassCard accent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)',
                    color: '#EA580C',
                  }}
                >
                  <Mail size={18} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Email</Typography>
                  <a
                    href="mailto:help@setondesk.com"
                    style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '1rem' }}
                  >
                    help@setondesk.com
                  </a>
                </Box>
              </Box>
            </GlassCard>

            <GlassCard sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(37,211,102,0.12)',
                    color: '#22C55E',
                  }}
                >
                  <MessageCircle size={18} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>WhatsApp</Typography>
                  <a
                    href="https://wa.me/923066888855"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '1rem' }}
                  >
                    +92 306 688 8855
                  </a>
                </Box>
              </Box>
            </GlassCard>

            <Box sx={{ p: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Whether you need a license key, help with setup, or want to discuss a custom solution — we're here to help you get the most out of SoD Driving School Pro.
              </Typography>
            </Box>
          </Box>

          {/* Form */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard sx={{ p: 3.5 }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      mx: 'auto',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(34,197,94,0.12)',
                      color: '#22C55E',
                    }}
                  >
                    <Send size={24} />
                  </Box>
                  <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1.15rem', mb: 1 }}>
                    Message sent!
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                    We'll get back to you shortly via email or WhatsApp.
                  </Typography>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <TextField
                    label="Name"
                    required
                    fullWidth
                    variant="outlined"
                    sx={fieldStyle}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    variant="outlined"
                    sx={fieldStyle}
                  />
                  <TextField
                    label="Message"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={fieldStyle}
                  />
                  <PrimaryButton type="submit" fullWidth sx={{ py: 1.5 }}>
                    Send Message
                  </PrimaryButton>
                </Box>
              )}
            </GlassCard>
          </Box>
        </Box>
      </Container>
    </Section>
  )
}

const fieldStyle = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.16)' },
    '&.Mui-focused fieldset': { borderColor: '#EA580C' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#EA580C' },
}
