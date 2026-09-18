import { Box, Typography, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { Download, MessageCircle, Monitor, Shield, WifiOff } from 'lucide-react'
import { PrimaryButton, GhostButton } from '../components/Buttons'
import { DOWNLOAD_LINKS } from '../config/links'
import LaptopMockup from '../components/LaptopMockup'
import LogoMark from '../components/LogoMark'

export default function Hero() {
  return (
    <Box
      id="top"
      sx={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        pt: 12,
        pb: 6,
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '30%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(229,41,41,0.12) 0%, rgba(234,88,12,0.06) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />


      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          width: '100%',
        }}
      >
        {/* Left: Text content */}
        <Box sx={{ flex: '1 1 45%', minWidth: 0, textAlign: 'left', position: 'relative' }}>
          {/* Logo mark background — 50% of hero height */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '300%',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <LogoMark variant="solid" color="#EA580C" opacity={0.10} />
          </Box>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Chip
              icon={<Monitor size={13} />}
              label="Desktop App for Driving Schools"
              sx={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 500,
                fontSize: '0.75rem',
                mb: 2,
                py: 0.5,
                '& .MuiChip-icon': { color: '#EA580C' },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              component="h1"
              variant="h1"
              className="hero-heading"
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                lineHeight: 1.05,
                mb: 2,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.4s ease',
                position: 'relative',
                '&:hover': {
                  textShadow: '0 0 40px rgba(234,88,12,0.4), 0 0 80px rgba(234,88,12,0.2), 0 0 120px rgba(234,88,12,0.1)',
                  filter: 'brightness(1.15)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '100%',
                  height: 2,
                  background: 'linear-gradient(90deg, #E52929, #EA580C, #E52929)',
                  backgroundSize: '200% 100%',
                  borderRadius: 1,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                },
                '&:hover::after': {
                  opacity: 1,
                  animation: 'shimmer 2s linear infinite',
                },
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              }}
            >
              Driving School Software for{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Managing Your Entire School
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.6,
                maxWidth: 520,
                mb: 3,
              }}
            >
              Set on Desk is driving school management software designed to help driving schools manage students, instructors, driving lessons, schedules, payments, records and everyday operations from one powerful desktop application.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <a href={DOWNLOAD_LINKS.windows} download style={{ textDecoration: 'none' }}>
                <PrimaryButton
                  component="span"
                  startIcon={<Download size={16} />}
                  sx={{ py: 1.4, px: 3.5, fontSize: '0.95rem' }}
                >
                  Download for Windows
                </PrimaryButton>
              </a>
              <a href="https://wa.me/923066888855" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginTop: -0.5 }}>
                <GhostButton
                  startIcon={<MessageCircle size={16} />}
                  sx={{ py: 1, px: 2.5, fontSize: '0.85rem' }}
                >
                  WhatsApp
                </GhostButton>
              </a>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                gap: { xs: 1.5, md: 3 },
                flexWrap: 'wrap',
              }}
            >
              {[
                { icon: <WifiOff size={13} />, text: 'Offline-first' },
                { icon: <Shield size={13} />, text: 'License key secured' },
                { icon: <Monitor size={13} />, text: 'Windows desktop' },
              ].map((b) => (
                <Box
                  key={b.text}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    '& svg': { color: '#EA580C' },
                  }}
                >
                  {b.icon}
                  {b.text}
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Right: Laptop mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ flex: '1 1 55%', minWidth: 0 }}
        >
          <LaptopMockup />
        </motion.div>
      </Box>
    </Box>
  )
}
