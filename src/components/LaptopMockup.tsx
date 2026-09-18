import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LaptopMockup() {
  const [bootPhase, setBootPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase(1), 600),
      setTimeout(() => setBootPhase(2), 1200),
      setTimeout(() => setBootPhase(3), 2000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <Box sx={{ position: 'relative', width: '100%', perspective: '1200px' }}>
      {/* Entire laptop shares one 3D transform space */}
      <Box
        sx={{
          position: 'relative',
          transform: 'rotateX(12deg) rotateY(-25deg)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom',
        }}
      >
        {/* ═══════════════════════════════════════════════ */}
        {/* SCREEN PANEL */}
        {/* ═══════════════════════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '8px 8px 0 0',
            border: '1.5px solid #1a1a1f',
            borderBottom: 'none',
            background: '#0a0a0c',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Camera dot */}
          <Box
            sx={{
              position: 'absolute',
              top: 5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: bootPhase >= 1 ? '#EA580C' : '#2a2a2a',
              zIndex: 10,
              transition: 'background 0.5s ease',
            }}
          />

          {/* Screen content area */}
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '16/10',
              overflow: 'hidden',
              background: '#08080c',
            }}
          >
            {/* Boot glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: bootPhase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, rgba(12,12,18,1) 0%, rgba(6,6,10,1) 100%)',
                }}
              />
            </motion.div>

            {/* Loading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: bootPhase === 2 ? 1 : bootPhase >= 3 ? 0 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>SoD</span>
              </Box>
              <Box sx={{ width: 60, height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #E52929, #EA580C)', borderRadius: 1 }}
                />
              </Box>
            </motion.div>

            {/* App screenshot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: bootPhase >= 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
            >
              <img
                src="/screenshot-app.png"
                alt="SoD Driving School Pro"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  background: '#08080c',
                }}
              />
            </motion.div>

            {/* Glass reflection */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 20%, transparent 45%)',
                pointerEvents: 'none',
                zIndex: 9,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '-20%',
                left: '5%',
                width: '25%',
                height: '140%',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                transform: 'rotate(18deg)',
                pointerEvents: 'none',
                zIndex: 9,
              }}
            />
          </Box>
        </Box>

        {/* ═══════════════════════════════════════════════ */}
        {/* KEYBOARD BASE — smooth dark deck, no keys */}
        {/* ═══════════════════════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '0 0 8px 8px',
            background: 'linear-gradient(180deg, #121215 0%, #0e0e11 40%, #0a0a0c 100%)',
            border: '1.5px solid #1a1a1f',
            borderTop: '1px solid #222',
            height: 0,
            pb: '24%',
            mt: -0.3,
            zIndex: 1,
            transform: 'rotateX(-6deg)',
            transformOrigin: 'top center',
          }}
        >
          {/* Keyboard deck — subtle inset */}
          <Box
            sx={{
              position: 'absolute',
              top: '12%',
              left: '8%',
              right: '8%',
              bottom: '18%',
              borderRadius: '3px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
              border: '1px solid rgba(255,255,255,0.02)',
            }}
          />

          {/* Trackpad */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '7%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '18%',
              height: '8%',
              borderRadius: '3px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          />

          {/* Front edge lip */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '6%',
              background: 'linear-gradient(180deg, #101013 0%, #08080a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.02)',
            }}
          />
        </Box>

        {/* ═══════════════════════════════════════════════ */}
        {/* SHADOW */}
        {/* ═══════════════════════════════════════════════ */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -20,
            left: '3%',
            right: '8%',
            height: 40,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)',
            filter: 'blur(14px)',
            zIndex: -1,
          }}
        />
      </Box>
    </Box>
  )
}
