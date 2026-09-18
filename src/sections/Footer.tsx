import { Box, Typography, Divider } from '@mui/material'
import LogoMark from '../components/LogoMark'

// ── Opacity token for the footer watermark logo ──
// Tweak this single value to adjust the watermark intensity.
const FOOTER_LOGO_OPACITY = 0.06

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      {/* ── Big tinted logo watermark (background layer, left side) ── */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: { xs: '50%', sm: '40%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Box sx={{ width: '90%', maxWidth: 520, aspectRatio: '1 / 1' }}>
          <LogoMark variant="solid" color="#FFFFFF" opacity={FOOTER_LOGO_OPACITY} />
        </Box>
      </Box>

      {/* ── Real footer content (determines height, sits above watermark) ── */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: 7 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1.2fr 1fr 1fr' },
              gap: 5,
              mb: 6,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box sx={{ width: 36, height: 36 }}>
                  <LogoMark variant="gradient" opacity={1} />
                </Box>
                <Box component="span" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#fff' }}>
                  Set<span style={{ color: '#EA580C' }}>On</span>Desk
                </Box>
              </Box>
              <Typography sx={{ mt: 2, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 320 }}>
                The complete desktop management suite for driving schools. Offline-first, built for the modern driving-school owner.
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', mb: 2.5 }}>
                Product
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'Instructor App', href: '#instructor-app' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'Contact', href: '#contact' },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', mb: 2.5 }}>
                Connect
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <a
                  href="mailto:help@setondesk.com"
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  help@setondesk.com
                </a>
                <a
                  href="https://wa.me/923066888855"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  +92 306 688 8855
                </a>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 4 }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
                Developed by{' '}
                <Box component="span" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  Set On Desk
                </Box>
              </Typography>
            </Box>

            <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
              Founder, Co-Developer & Product Owner:{' '}
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                Muhammad Rizwan Khokhar
              </Box>
            </Typography>

            <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
              © 2026 Set On Desk. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
