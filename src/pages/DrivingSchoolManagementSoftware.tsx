import { Box, Typography } from '@mui/material'
import SEO from '../components/SEO'
import { Section, Container } from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'

export default function DrivingSchoolManagementSoftware() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Driving School Management Software — Complete Guide",
    "description": "A comprehensive guide to driving school management software: student management, instructor coordination, vehicle tracking, financial records, and operational efficiency.",
    "author": { "@type": "Organization", "name": "Set On Desk" },
    "publisher": { "@type": "Organization", "name": "Set On Desk" },
    "mainEntityOfPage": "https://setondesk.com/driving-school-management-software"
  }

  return (
    <>
      <SEO
        title="Driving School Management Software — Complete Guide | Set on Desk"
        description="What is driving school management software? Learn how it helps driving schools manage students, instructors, vehicles, finances, and daily operations efficiently."
        canonical="https://setondesk.com/driving-school-management-software"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section sx={{ pt: 16, pb: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography component="h1" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' }, fontWeight: 700, lineHeight: 1.1, mb: 3 }}>
              Driving School Management Software — Complete Guide
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Driving school management software helps school owners and administrators coordinate every aspect of their business — from student registration and instructor scheduling to financial tracking and record management — in a single system.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* What is Management Software */}
      <Section>
        <Container>
          <SectionHeading label="Overview" title="What Is Driving School Management Software?" />
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              Management software for driving schools is a specialized business tool that centralizes all operational tasks. Instead of using separate systems for student records, scheduling, billing, and vehicle tracking, everything is managed from one application.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              For driving school owners, this means less time on administrative work and more time focused on growing the business. For instructors, it means clear daily schedules and easy access to student information. For students, it means timely reminders and organized records.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Set on Desk is a Windows desktop application with a local database, meaning it works without a constant internet connection and your school's data stays on your own computer.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Core Management Areas */}
      <Section>
        <Container>
          <SectionHeading label="Core Areas" title="Key Management Capabilities" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
            {[
              {
                title: 'Student Management',
                items: ['Student registration with course assignment', 'Fee tracking and pending payment monitoring', 'Progress monitoring and detailed reports', 'Document and certificate generation']
              },
              {
                title: 'Instructor Management',
                items: ['Assign instructors to students and courses', 'Daily lesson schedules and notifications', 'Performance analytics and attendance tracking', 'Companion Android app for field work']
              },
              {
                title: 'Vehicle Management',
                items: ['Track vehicle assignments and usage', 'Record vehicle expenses and maintenance', 'Assign vehicles to specific lessons', 'Monitor vehicle availability']
              },
              {
                title: 'Financial Management',
                items: ['Revenue, expense, and profit tracking', 'Pending fee management with alerts', 'Financial dashboard with analytics', 'Support for multiple currencies']
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

      {/* Manual vs Software */}
      <Section>
        <Container>
          <SectionHeading label="Comparison" title="Manual Management vs. Software" />
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box sx={{ p: 3, borderRadius: '12px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1rem', mb: 2, color: '#EF4444' }}>Manual / Paper-Based</Typography>
                {['Time-consuming data entry', 'Easy to lose records', 'Hard to track payments', 'Scheduling conflicts common', 'No automated reminders', 'Difficult to generate reports'].map((item) => (
                  <Box key={item} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                    <Typography sx={{ color: '#EF4444', fontSize: '0.9rem' }}>✗</Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ p: 3, borderRadius: '12px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1rem', mb: 2, color: '#22C55E' }}>With Management Software</Typography>
                {['Automated scheduling saves time', 'All records stored digitally', 'Real-time payment tracking', 'Conflict-free lesson planning', 'WhatsApp reminders sent automatically', 'One-click report generation'].map((item) => (
                  <Box key={item} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                    <Typography sx={{ color: '#22C55E', fontSize: '0.9rem' }}>✓</Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Internal Links */}
      <Section>
        <Container>
          <SectionHeading label="Related" title="Explore More" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 800, mx: 'auto' }}>
            {[
              { to: '/driving-school-scheduling-software', title: 'Scheduling Software', desc: 'Automate lesson booking and instructor assignment.' },
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
              Start Managing Your School More Efficiently
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}>
              Download Set on Desk and see how much time you can save on daily operations.
            </Typography>
            <a href="/pricing" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 32px', borderRadius: '8px', background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
              View Pricing
            </a>
          </Box>
        </Container>
      </Section>
    </>
  )
}
