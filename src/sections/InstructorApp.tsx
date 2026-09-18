import { Box, Typography, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { Smartphone, QrCode, PenLine, MapPin, Download, CheckCircle2 } from 'lucide-react'
import GlassCard, { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import { PrimaryButton, GhostButton } from '../components/Buttons'
import { DOWNLOAD_LINKS } from '../config/links'

const perks = [
  'View daily assigned lessons at a glance',
  'Mark lessons as completed with one tap',
  'Capture a digital student signature on-device',
  'Record a GPS session for every lesson',
  'Syncs securely via QR code + Supabase',
]

export default function InstructorApp() {
  return (
    <Section
      id="instructor-app"
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '-15%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container>
        <SectionHeading
          label="Companion App"
          title="Your instructors, connected."
          subtitle="A companion Android APK that keeps your instructors in sync with the desktop app — no extra hardware, just a QR code."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Phone mockup */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              sx={{
                width: 260,
                height: 510,
                borderRadius: '32px',
                background: 'linear-gradient(160deg, rgba(20,20,30,0.95) 0%, rgba(10,10,15,0.98) 100%)',
                border: '2px solid rgba(255,255,255,0.08)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                p: 1.5,
                position: 'relative',
              }}
            >
              {/* Notch */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 18,
                  borderRadius: '9999px',
                  background: '#0A0A0F',
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '26px',
                  background: 'linear-gradient(180deg, rgba(229,41,41,0.06) 0%, rgba(10,10,15,1) 40%)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  pt: 6,
                  px: 2.5,
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 2.5 }}>
                  <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>
                    Instructor App
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Today · 4 lessons</Typography>
                </Box>

                {[
                  { time: '09:00', name: 'Ahmad Hassan', status: 'done' },
                  { time: '10:30', name: 'Sara Ali', status: 'done' },
                  { time: '12:00', name: 'Omar Khan', status: 'active' },
                  { time: '14:00', name: 'Lina Saleh', status: 'upcoming' },
                ].map((l) => (
                  <Box
                    key={l.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      mb: 1,
                      borderRadius: '12px',
                      background:
                        l.status === 'active'
                          ? 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.08) 100%)'
                          : 'rgba(255,255,255,0.03)',
                      border:
                        l.status === 'active'
                          ? '1px solid rgba(234,88,12,0.3)'
                          : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: l.status === 'done' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                        color: l.status === 'done' ? '#22C55E' : 'rgba(255,255,255,0.4)',
                        flexShrink: 0,
                      }}
                    >
                      {l.status === 'done' ? <CheckCircle2 size={16} /> : <span style={{ fontSize: 11 }}>{l.time}</span>}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {l.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{l.time}</Typography>
                    </Box>
                    {l.status === 'active' && (
                      <Chip label="Now" size="small" sx={{ background: 'rgba(234,88,12,0.2)', color: '#EA580C', fontSize: '0.65rem', height: 20 }} />
                    )}
                  </Box>
                ))}

                <Box sx={{ mt: 'auto', mb: 2, textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 0.8,
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.72rem',
                    }}
                  >
                    <QrCode size={14} /> Scan to sync
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
              {[
                { icon: QrCode, title: 'QR Code Pairing', desc: 'Pair the instructor phone to the desktop app instantly by scanning a QR code — no manual setup.' },
                { icon: PenLine, title: 'Digital Signature', desc: 'Capture the student\'s signature directly on the instructor\'s device at the end of each lesson.' },
                { icon: MapPin, title: 'GPS Session Recording', desc: 'Automatically record a GPS track for every lesson, giving you verifiable session data.' },
              ].map((p) => (
                <GlassCard key={p.title} sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(6,182,212,0.12)',
                      border: '1px solid rgba(6,182,212,0.25)',
                      color: '#06B6D4',
                      flexShrink: 0,
                      mt: 0.3,
                    }}
                  >
                    <p.icon size={18} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1rem', mb: 0.4 }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </GlassCard>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <PrimaryButton href={DOWNLOAD_LINKS.android} download startIcon={<Download size={18} />}>
                Download APK
              </PrimaryButton>
              <GhostButton href="#contact" startIcon={<Smartphone size={18} />}>
                Request Access
              </GhostButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  )
}
