import { Box, Typography } from '@mui/material'
import SEO from '../components/SEO'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

export default function DrivingSchoolSchedulingSoftware() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Driving School Scheduling Software — Automate Lesson Booking",
    "description": "How driving school scheduling software automates lesson booking, instructor assignment, conflict handling, and student notifications. Save hours every week.",
    "author": { "@type": "Organization", "name": "Set On Desk" },
    "publisher": { "@type": "Organization", "name": "Set On Desk" },
    "mainEntityOfPage": "https://setondesk.com/driving-school-scheduling-software"
  }

  return (
    <>
      <SEO
        title="Driving School Scheduling Software — Automate Lesson Booking | Set on Desk"
        description="How driving school scheduling software works: automatic lesson booking, smart instructor assignment, conflict-free timetables, and WhatsApp reminders for students."
        canonical="https://setondesk.com/driving-school-scheduling-software"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section sx={{ pt: 16, pb: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography component="h1" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' }, fontWeight: 700, lineHeight: 1.1, mb: 3 }}>
              Driving School Scheduling Software — Automate Lesson Booking
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Scheduling driving lessons is one of the most time-consuming tasks for a driving school. Scheduling software automates the process — assigning instructors, avoiding conflicts, and sending reminders — so you can focus on teaching instead of managing timetables.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Why Scheduling Matters */}
      <Section>
        <Container>
          <SectionHeading label="Problem" title="Why Manual Scheduling Doesn't Scale" />
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              As a driving school grows, the number of students, instructors, and vehicles increases — and scheduling complexity grows even faster. A single instructor might have 8–12 lessons per day, each with a different student, vehicle, and time slot.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              Manual scheduling on paper or spreadsheets leads to double-bookings, forgotten lessons, and frustrated students. It also wastes hours of administrative time every week that could be spent on revenue-generating activities.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Scheduling software solves these problems by automating the entire process — from booking to reminders — while giving you full control over working hours, holidays, and instructor availability.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* How It Works */}
      <Section>
        <Container>
          <SectionHeading label="How It Works" title="Smart Scheduling Features" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
            {[
              { step: '1', title: 'Define Working Hours', desc: 'Set your school\'s working days, daily start and end times, and holiday calendar. The scheduler respects these boundaries automatically.' },
              { step: '2', title: 'Auto-Assign Lessons', desc: 'When you book a student, the smart algorithm finds the next available slot with a free instructor and vehicle. No manual searching required.' },
              { step: '3', title: 'Conflict Detection', desc: 'The system prevents double-booking of instructors, vehicles, and time slots. If a conflict arises, it suggests the nearest available alternative.' },
              { step: '4', title: 'Automated Reminders', desc: 'Send WhatsApp notifications to students before each lesson. Reduce no-shows without making manual phone calls.' },
            ].map((item) => (
              <Box key={item.step} sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #E52929, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', mb: 2 }}>{item.step}</Box>
                <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem', mb: 1 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Benefits */}
      <Section>
        <Container>
          <SectionHeading label="Benefits" title="What Scheduling Software Saves You" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 800, mx: 'auto' }}>
            {[
              { title: 'Hours Per Week', desc: 'Automating scheduling can save hours every week compared to manual booking on paper or spreadsheets.' },
              { title: 'Fewer No-Shows', desc: 'Automated WhatsApp reminders reduce missed lessons by keeping students informed of their upcoming schedule.' },
              { title: 'No Double-Bookings', desc: 'The system ensures instructors and vehicles are never booked twice for the same time slot.' },
              { title: 'Clear Daily View', desc: 'See the full day\'s schedule at a glance — who is teaching, which vehicle, and which student.' },
            ].map((b) => (
              <Box key={b.title} sx={{ display: 'flex', gap: 2, p: 2.5, borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#EA580C', flexShrink: 0, mt: 1 }} />
                <Box>
                  <Typography component="h3" sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.3 }}>{b.title}</Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{b.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Internal Links */}
      <Section>
        <Container>
          <SectionHeading label="Related" title="Explore More" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 800, mx: 'auto' }}>
            {[
              { to: '/driving-school-management-software', title: 'Management Software', desc: 'Complete guide to managing your entire school.' },
              { to: '/driving-school-student-management', title: 'Student Management', desc: 'Track registrations, progress, and fees.' },
              { to: '/driving-school-software', title: 'Driving School Software', desc: 'General overview of software options.' },
              { to: '/faq', title: 'FAQ', desc: 'Common questions about Set on Desk.' },
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
              Automate Your Lesson Scheduling Today
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}>
              Try Set on Desk free for 30 days and see how much time smart scheduling saves your school.
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
