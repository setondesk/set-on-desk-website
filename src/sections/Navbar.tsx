import { useState, useEffect } from 'react'
import { Box, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import Logo from '../components/Logo'
import { PrimaryButton, GhostButton } from '../components/Buttons'
import { supabase } from '../lib/supabase'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Instructor App', href: '#instructor-app' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onDashboardClick }: { onDashboardClick: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Check auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(10,10,15,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="#top" aria-label="Set On Desk home">
          <Logo />
        </a>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {l.label}
            </a>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <a
            href="https://wa.me/923066888855"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontWeight: 500 }}
          >
            WhatsApp
          </a>

          {/* Dashboard button — only shown when logged in */}
          {isLoggedIn && (
            <GhostButton
              onClick={onDashboardClick}
              size="small"
              sx={{ py: 1, px: 2, fontSize: '0.85rem', borderRadius: '8px' }}
            >
              <LayoutDashboard size={16} style={{ marginRight: 6 }} /> Dashboard
            </GhostButton>
          )}

          <PrimaryButton href="#pricing" size="small" sx={{ py: 1, px: 2.5, fontSize: '0.88rem' }}>
            Get License
          </PrimaryButton>
        </Box>

        <IconButton
          sx={{ display: { md: 'none' }, color: '#fff' }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(10,10,15,0.97)',
            backdropFilter: 'blur(20px)',
            width: 280,
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
            <X size={22} />
          </IconButton>
        </Box>
        <List>
          {links.map((l) => (
            <ListItemButton
              key={l.href}
              component="a"
              href={l.href}
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                color: '#fff',
                '&:hover': { background: 'rgba(255,255,255,0.05)' },
              }}
            >
              <ListItemText primary={l.label} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {isLoggedIn && (
            <GhostButton onClick={() => { setOpen(false); onDashboardClick(); }} fullWidth>
              <LayoutDashboard size={16} style={{ marginRight: 8 }} /> Dashboard
            </GhostButton>
          )}
          <PrimaryButton href="#pricing" onClick={() => setOpen(false)} fullWidth>
            Get License
          </PrimaryButton>
        </Box>
      </Drawer>
    </Box>
  )
}
