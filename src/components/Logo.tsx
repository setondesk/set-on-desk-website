import { Box } from '@mui/material'
import LogoMark from './LogoMark'

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
      <Box sx={{ width: size, height: size }}>
        <LogoMark variant="gradient" opacity={1} />
      </Box>
      <Box component="span" sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#fff' }}>
        Set<span style={{ color: '#EA580C' }}>On</span>Desk
      </Box>
    </Box>
  )
}
