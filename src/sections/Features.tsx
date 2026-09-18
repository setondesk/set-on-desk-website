import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import {
  Users, CalendarClock, DollarSign, MapPin, Car, Smartphone,
  FileText, Database, MessageSquare, Globe, KeyRound, Award,
} from 'lucide-react'
import GlassCard, { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

const features = [
  {
    icon: Users,
    title: 'Student Management',
    desc: 'Registration, course & instructor assignment, fee tracking, progress monitoring and detailed reports.',
  },
  {
    icon: CalendarClock,
    title: 'Automatic Lesson Scheduling',
    desc: 'Smart algorithm respects working days & holidays. Daily lesson monitoring, instructor forms and digital signatures.',
  },
  {
    icon: DollarSign,
    title: 'Finance & Analytics',
    desc: 'Revenue, expense and profit tracking with pending-fee management. Financial dashboard with analytics.',
  },
  {
    icon: MapPin,
    title: 'Pick & Drop',
    desc: 'Distance-based charges via Google Maps with per-KM rates, free-distance config and home-service calculation.',
  },
  {
    icon: Car,
    title: 'Vehicles & Staff',
    desc: 'Vehicle management with expense tracking, instructor & staff management, plus performance analytics.',
  },
  {
    icon: Smartphone,
    title: 'Instructor App',
    desc: 'Companion Android APK. Instructors see daily lessons, mark completion, capture signatures and record GPS.',
  },
  {
    icon: FileText,
    title: 'Documents & Certificates',
    desc: '80mm thermal receipts, A4 PDF reports and automatic certificate generation — all printed or exported.',
  },
  {
    icon: Database,
    title: 'Backup & Data',
    desc: 'Local database backup, scheduled backups, restore, JSON export and external backup-folder support.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integration',
    desc: 'Send booking confirmations, lesson updates and payment reminders directly through WhatsApp.',
  },
  {
    icon: Globe,
    title: 'Global Business Support',
    desc: 'Worldwide country selection with automatic currency detection and locale-aware formatting.',
  },
  {
    icon: KeyRound,
    title: 'Licensing & Activation',
    desc: 'License-key activation with trial management, internet-verified licensing and Google-sign-in binding.',
  },
  {
    icon: Award,
    title: 'Website Connector',
    desc: 'Connect your driving-school website to Supabase so online booking requests land in the desktop app.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Features() {
  return (
    <Section id="features">
      <Container>
        <SectionHeading
          label="Everything You Need"
          title="One app. Every feature."
          subtitle="A complete driving-school management suite — students, scheduling, finance, vehicles, documents and more, all in a single offline-first desktop application."
        />

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {features.map((f) => (
            <Box key={f.title} component={motion.div} variants={itemVariants}>
              <GlassCard accent sx={{ p: 2.5, height: '100%' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)',
                    border: '1px solid rgba(234,88,12,0.2)',
                    mb: 1.5,
                    color: '#EA580C',
                  }}
                >
                  <f.icon size={18} />
                </Box>
                <Typography
                  component="h3"
                  sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.92rem', mb: 0.8 }}
                >
                  {f.title}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                  {f.desc}
                </Typography>
              </GlassCard>
            </Box>
          ))}
        </Box>
      </Container>
    </Section>
  )
}
