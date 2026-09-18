import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SEO from '../components/SEO'
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
  {
    question: 'How does automatic lesson scheduling work?',
    answer: 'The smart scheduling algorithm respects your school\'s working days, holidays, and daily hours. When you book a student, it automatically finds the next available slot with a free instructor and vehicle. You can also arrange lessons manually if preferred. The system prevents double-bookings and sends WhatsApp reminders to students before each lesson.',
  },
  {
    question: 'What documents and certificates can I generate?',
    answer: 'SoD Driving School Pro can generate 80mm thermal receipts for payments, A4 PDF reports (student lists, financial summaries, attendance), course completion certificates, and custom documents. All templates are configurable with your school name, logo, and branding.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <SEO
        title="Frequently Asked Questions — Set on Desk"
        description="Common questions about SoD Driving School Pro: pricing, features, trial, instructor app, WhatsApp integration, scheduling, and more. Everything you need to know."
        canonical="https://setondesk.com/faq"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section sx={{ pt: 16, pb: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography component="h1" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' }, fontWeight: 700, lineHeight: 1.1, mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Common questions about SoD Driving School Pro. Can't find your answer? Reach out via WhatsApp or email.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* FAQ List */}
      <Section sx={{ pt: 0 }}>
        <Container>
          <Box sx={{ maxWidth: 760, mx: 'auto' }}>
            {faqs.map((faq, i) => (
              <Box key={i} sx={{ borderBottom: '1px solid rgba(255,255,255,0.06)', '&:first-of-type': { borderTop: '1px solid rgba(255,255,255,0.06)' } }}>
                <Box
                  component="button"
                  onClick={() => setOpen(open === i ? null : i)}
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
                      <Typography sx={{ pb: 2.5, fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 700 }}>
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

      {/* Related Links */}
      <Section>
        <Container>
          <SectionHeading label="Learn More" title="Explore Further" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 700, mx: 'auto' }}>
            {[
              { to: '/driving-school-software', title: 'Driving School Software', desc: 'What it is and why your school needs it.' },
              { to: '/pricing', title: 'Pricing', desc: 'Free trial and lifetime license options.' },
              { to: '/driving-school-management-software', title: 'Management Software', desc: 'Complete guide to school management.' },
              { to: '/driving-school-scheduling-software', title: 'Scheduling Software', desc: 'Automate lesson booking.' },
            ].map((link) => (
              <a key={link.to} href={link.to} style={{ textDecoration: 'none' }}>
                <Box sx={{ p: 3, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', height: '100%', transition: 'border-color 0.2s', '&:hover': { borderColor: 'rgba(234,88,12,0.3)' } }}>
                  <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '0.95rem', mb: 0.5, color: '#EA580C' }}>{link.title}</Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{link.desc}</Typography>
                </Box>
              </a>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Typography component="h2" sx={{ fontFamily: "'Manrope', sans-serif", fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
              Still Have Questions?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}>
              Reach out via email or WhatsApp and we'll get back to you promptly.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:help@setondesk.com" style={{ textDecoration: 'none', padding: '12px 28px', borderRadius: '8px', background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                Email Us
              </a>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '12px 28px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                WhatsApp
              </a>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  )
}
