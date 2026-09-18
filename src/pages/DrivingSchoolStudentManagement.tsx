import { Box, Typography } from '@mui/material'
import SEO from '../components/SEO'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

export default function DrivingSchoolStudentManagement() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Driving School Student Management — Track Every Student",
    "description": "How driving school student management software helps track registrations, course progress, fee payments, documents, and communication — all in one system.",
    "author": { "@type": "Organization", "name": "Set On Desk" },
    "publisher": { "@type": "Organization", "name": "Set On Desk" },
    "mainEntityOfPage": "https://setondesk.com/driving-school-student-management"
  }

  return (
    <>
      <SEO
        title="Driving School Student Management — Track Every Student | Set on Desk"
        description="Student management for driving schools: registration, course progress tracking, fee management, document generation, and WhatsApp communication — all in one place."
        canonical="https://setondesk.com/driving-school-student-management"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section sx={{ pt: 16, pb: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography component="h1" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' }, fontWeight: 700, lineHeight: 1.1, mb: 3 }}>
              Driving School Student Management — Track Every Student
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Every driving school needs a reliable way to manage student data — from the moment they register to the day they complete their course. Student management software gives you a complete, organized view of every student's journey.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* The Challenge */}
      <Section>
        <Container>
          <SectionHeading label="Challenge" title="Why Student Records Get Complicated" />
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              A driving school with even 50 active students generates a surprising amount of data: registration details, course assignments, fee payments, lesson attendance, progress notes, and certificates. Multiply that across hundreds of students and multiple instructors, and paper registers quickly become unmanageable.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              Without a proper system, it's easy to lose track of who has paid, who is behind on lessons, or which students are ready for their driving test. This leads to revenue leakage, unhappy students, and administrative chaos.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Student management software centralizes all of this information so you can find any student's complete history in seconds — not hours.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Core Capabilities */}
      <Section>
        <Container>
          <SectionHeading label="Capabilities" title="What Student Management Software Does" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
            {[
              {
                title: 'Registration & Enrollment',
                items: ['Capture student details on enrollment', 'Assign courses and instructors', 'Set fee structures and payment schedules', 'Link students to specific vehicles if needed']
              },
              {
                title: 'Progress Tracking',
                items: ['Record attendance for every lesson', 'Track which course modules are completed', 'View progress reports per student', 'Identify students ready for driving test']
              },
              {
                title: 'Fee & Payment Management',
                items: ['Record every payment received', 'Track pending and overdue fees', 'View payment history per student', 'Generate fee receipts automatically']
              },
              {
                title: 'Documents & Communication',
                items: ['Generate certificates and completion letters', 'Export student data as PDF reports', 'Send WhatsApp updates to students', 'Maintain digital records — no paper files']
              },
            ].map((area) => (
              <Box key={area.title} sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography component="h3" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1rem', mb: 2 }}>{area.title}</Typography>
                {area.items.map((item) => (
                  <Box key={item} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#EA580C', flexShrink: 0, mt: 1.2 }} />
                    <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Benefits */}
      <Section>
        <Container>
          <SectionHeading label="Benefits" title="Why It Matters for Your School" />
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            {[
              { title: 'Find Any Student in Seconds', desc: 'Search by name, phone number, or course — no more flipping through registers.' },
              { title: 'Never Miss a Payment', desc: 'Pending fee alerts ensure you follow up on overdue payments before they\'re forgotten.' },
              { title: 'Better Student Experience', desc: 'Students get timely updates and reminders, which improves satisfaction and referrals.' },
              { title: 'Data-Driven Decisions', desc: 'Reports show enrollment trends, revenue per course, and instructor workload at a glance.' },
              { title: 'No Lost Records', desc: 'Digital storage means student records are never lost, damaged, or misplaced.' },
            ].map((b, i) => (
              <Box key={b.title} sx={{ display: 'flex', gap: 3, mb: 3, alignItems: 'flex-start' }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: 'linear-gradient(135deg, #E52929, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>{i + 1}</Box>
                <Box>
                  <Typography component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 0.3 }}>{b.title}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{b.desc}</Typography>
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
              { to: '/driving-school-scheduling-software', title: 'Scheduling Software', desc: 'Automate lesson booking and instructor assignment.' },
              { to: '/driving-school-software', title: 'Driving School Software', desc: 'General overview of software options.' },
              { to: '/pricing', title: 'Pricing', desc: 'Free trial and one-time license options.' },
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
              Organize Your Student Records Today
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}>
              Try Set on Desk free and see how much easier student management becomes.
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
