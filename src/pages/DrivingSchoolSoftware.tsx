import { Box, Typography } from '@mui/material'
import SEO from '../components/SEO'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

const features = [
  { title: 'Student Registration & Management', desc: 'Register students, assign courses and instructors, track fees and progress, and generate detailed reports — all from one place.' },
  { title: 'Automatic Lesson Scheduling', desc: 'Smart algorithm that respects working days and holidays. Auto-assign lesson slots or arrange manually.' },
  { title: 'Finance & Analytics', desc: 'Track revenue, expenses, and profit. Monitor pending fees and view financial dashboards.' },
  { title: 'Vehicle & Staff Management', desc: 'Manage vehicles with expense tracking, assign instructors, and monitor performance.' },
  { title: 'Pick & Drop Management', desc: 'Distance-based charges via Google Maps with per-KM rates and home-service calculation.' },
  { title: 'Documents & Certificates', desc: 'Generate 80mm thermal receipts, A4 PDF reports, and certificates automatically.' },
  { title: 'WhatsApp Integration', desc: 'Send booking confirmations, lesson updates, and payment reminders via WhatsApp.' },
  { title: 'Instructor App', desc: 'Companion Android APK for daily lessons, digital signatures, and GPS recording.' },
  { title: 'Backup & Data', desc: 'Local database backup, scheduled backups, restore, and JSON export.' },
  { title: 'Licensing & Activation', desc: 'License-key activation with trial management and Google Sign-In binding.' },
  { title: 'Website Connector', desc: 'Connect your driving-school website so online booking requests land in the desktop app.' },
  { title: 'Global Business Support', desc: 'Worldwide country selection with automatic currency detection.' },
]

export default function DrivingSchoolSoftware() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Driving School Software — What It Is and Why Your School Needs It",
    "description": "A comprehensive guide to driving school software: what it is, how it works, key features, and how it helps driving schools manage students, scheduling, finance, and daily operations.",
    "author": { "@type": "Organization", "name": "Set On Desk" },
    "publisher": { "@type": "Organization", "name": "Set On Desk" },
    "mainEntityOfPage": "https://setondesk.com/driving-school-software"
  }

  return (
    <>
      <SEO
        title="Driving School Software — What It Is & Why Your School Needs It | Set on Desk"
        description="What is driving school software? A complete guide covering features, benefits, types, and how it helps driving schools manage students, instructors, scheduling, payments, and daily operations."
        canonical="https://setondesk.com/driving-school-software"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section sx={{ pt: 16, pb: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography component="h1" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' }, fontWeight: 700, lineHeight: 1.1, mb: 3 }}>
              Driving School Software — What It Is and Why Your School Needs It
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Driving school software helps driving schools manage students, instructors, driving lessons, schedules, payments, records, and everyday operations. Instead of using spreadsheets, paper registers, and multiple disconnected tools, a single software system brings everything together in one place.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* What is Driving School Software */}
      <Section>
        <Container>
          <SectionHeading label="Overview" title="What Is Driving School Software?" />
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              Driving school software is a specialized tool designed to help driving school owners and administrators manage the day-to-day operations of their business. It typically includes features for student registration, lesson scheduling, instructor assignment, fee tracking, vehicle management, and record keeping.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              Unlike generic business software, driving school management software is built around the specific workflows of a driving school: managing student courses, scheduling driving lessons with instructors, tracking vehicle usage, generating certificates, and handling payments.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Modern driving school software can be cloud-based (accessed through a web browser) or desktop-based (installed on a Windows PC). Desktop applications offer the advantage of working offline — critical for schools in areas with unreliable internet.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Key Features */}
      <Section>
        <Container>
          <SectionHeading label="Features" title="Key Features of Driving School Software" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 2.5 }}>
            {features.map((f) => (
              <Box key={f.title} sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem', mb: 1 }}>{f.title}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Benefits */}
      <Section>
        <Container>
          <SectionHeading label="Benefits" title="Why Your Driving School Needs Software" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, maxWidth: 900, mx: 'auto' }}>
            {[
              { title: 'Save Time', desc: 'Automate scheduling, reminders, and record-keeping instead of doing everything manually on paper or spreadsheets.' },
              { title: 'Reduce No-Shows', desc: 'Send automated WhatsApp reminders to students before each lesson so they don\'t forget.' },
              { title: 'Track Every Payment', desc: 'Know exactly which students have paid, which fees are pending, and your total revenue at a glance.' },
              { title: 'Manage Instructors Efficiently', desc: 'Assign lessons, track performance, and let instructors manage daily tasks through a companion app.' },
              { title: 'Keep Records Organized', desc: 'All student documents, certificates, and reports stored digitally — no more lost paper files.' },
              { title: 'Work Without Internet', desc: 'Desktop software with a local database keeps working even when the internet is down.' },
            ].map((b) => (
              <Box key={b.title}>
                <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1.05rem', mb: 1 }}>{b.title}</Typography>
                <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{b.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Internal Links */}
      <Section>
        <Container>
          <SectionHeading label="Learn More" title="Explore Specific Solutions" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 800, mx: 'auto' }}>
            {[
              { to: '/driving-school-management-software', title: 'Management Software', desc: 'Complete guide to managing students, instructors, vehicles, and records.' },
              { to: '/driving-school-scheduling-software', title: 'Scheduling Software', desc: 'How to automate lesson booking and instructor assignment.' },
              { to: '/driving-school-student-management', title: 'Student Management', desc: 'Track registrations, progress, fees, and documents.' },
              { to: '/pricing', title: 'Pricing & Plans', desc: 'Free trial and one-time license options.' },
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

      {/* CTA */}
      <Section>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Typography component="h2" sx={{ fontFamily: "'Manrope', sans-serif", fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
              Ready to Simplify Your Driving School?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}>
              Try Set on Desk free for 30 days. No credit card required. Download and start managing your school today.
            </Typography>
            <a href="/pricing" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 32px', borderRadius: '8px', background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
              View Pricing & Download
            </a>
          </Box>
        </Container>
      </Section>
    </>
  )
}
