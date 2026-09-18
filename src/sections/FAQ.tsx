import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

const faqs = [
  {
    question: 'What is SoD Driving School Pro?',
    answer: 'SoD Driving School Pro is an offline-first desktop application for managing driving schools. It runs on Windows 10 and Windows 11 (x64) and handles student registration, automatic lesson scheduling, finance tracking, vehicle management, document and certificate generation, WhatsApp integration, and includes a companion Android app for instructors. The application is built with Electron + React and uses a local database so it works without internet for day-to-day operations.',
  },
  {
    question: 'Is SoD Driving School Pro free?',
    answer: 'Yes. SoD Driving School Pro offers a free 30-day trial with all features fully enabled. After the trial, a one-time license fee of PKR 22,400 (regular PKR 32,000 — 30% off) unlocks lifetime access with all future updates, priority support, the instructor Android app, and the website connector. There are no monthly subscriptions and no per-student fees.',
  },
  {
    question: 'Which operating systems does SoD Driving School Pro support?',
    answer: 'SoD Driving School Pro is a Windows desktop application that supports Windows 10 (x64) and Windows 11 (x64). The installer is a standard .exe setup file. A companion instructor app is available as an Android APK for phones and tablets. macOS and Linux are not currently supported.',
  },
  {
    question: 'Is SoD Driving School Pro suitable for driving schools in Pakistan?',
    answer: 'Yes, SoD Driving School Pro is specifically designed for Pakistani driving schools. It supports PKR currency, Urdu and English, local document formats (8mm thermal receipts, A4 certificates), WhatsApp messaging (widely used in Pakistan), and Google Maps-based pick and drop with per-KM rate configuration common in Pakistani driving schools. The software handles LTVP and local license management workflows.',
  },
  {
    question: 'Does SoD Driving School Pro require internet?',
    answer: 'No. SoD Driving School Pro is an offline-first application. All core features — student management, scheduling, finance, documents, vehicle tracking — work without an internet connection. Internet is only needed for initial license activation, sending WhatsApp messages, Google Maps distance calculations, and syncing with the instructor app via Supabase cloud.',
  },
  {
    question: 'How does the instructor app work?',
    answer: 'The instructor companion app is a free Android APK included with every Pro license. Instructors pair their phone to the desktop app by scanning a QR code. Once paired, instructors can view their daily assigned lessons, mark lessons as completed with one tap, capture a digital student signature on-device, and automatically record a GPS track for every lesson. All data syncs back to the desktop app securely.',
  },
  {
    question: 'What is the difference between SoD Driving School Pro and other driving school software?',
    answer: 'Unlike web-based or subscription driving school software, SoD Driving School Pro is a one-time purchase desktop application that works offline. It includes a built-in local database (no cloud fees), an instructor Android app, WhatsApp integration, Google Maps pick & drop, automatic certificate generation, and a website connector — all in a single package. There are no monthly fees, no per-student charges, and no dependency on third-party SaaS platforms.',
  },
  {
    question: 'Can I migrate from my current system to SoD Driving School Pro?',
    answer: 'Yes. SoD Driving School Pro supports data import so you can bring across existing student records. The initial setup wizard guides you through configuring your school name, country, currency, working days, public holidays, and branding. If you need help with migration, the support team can assist via WhatsApp or email (help@setondesk.com).',
  },
  {
    question: 'What happens after the 30-day trial ends?',
    answer: 'After the 30-day trial, the application will prompt you to enter a license key. You can purchase a lifetime license for PKR 22,400 (30% off the regular PKR 32,000 price). Once activated, you get all future updates, priority email and WhatsApp support, the instructor app, and the website connector at no additional cost. Your trial data is preserved when you upgrade.',
  },
  {
    question: 'Does SoD Driving School Pro integrate with WhatsApp?',
    answer: 'Yes. SoD Driving School Pro has built-in WhatsApp integration. You can send booking confirmations, lesson schedule updates, payment reminders, and other notifications directly to students and parents through WhatsApp. This is especially useful in Pakistan where WhatsApp is the primary communication channel for most driving schools.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq">
      <Container>
        <SectionHeading
          label="FAQ"
          title="Common questions, answered."
          subtitle="Everything you need to know about SoD Driving School Pro. Can't find your answer? Reach out via WhatsApp or email."
        />

        <Box sx={{ maxWidth: 760, mx: 'auto' }}>
          {faqs.map((faq, i) => (
            <Box
              key={i}
              sx={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                '&:first-of-type': { borderTop: '1px solid rgba(255,255,255,0.06)' },
              }}
            >
              <Box
                component="button"
                onClick={() => setOpen(open === i ? null : i)}
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  py: 2.5,
                  px: 0,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#fff',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  transition: 'color 0.2s',
                  '&:hover': { color: '#EA580C' },
                }}
              >
                <span>{faq.question}</span>
                <Box sx={{ flexShrink: 0, color: '#EA580C' }}>
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </Box>
              </Box>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <Typography
                      sx={{
                        pb: 2.5,
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.75,
                        maxWidth: 700,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          ))}
        </Box>
      </Container>
    </Section>
  )
}
