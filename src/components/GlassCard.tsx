import { Box, BoxProps, Paper, PaperProps } from '@mui/material'
import { ReactNode } from 'react'

interface GlassCardProps extends PaperProps {
  children: ReactNode
  accent?: boolean
  hover?: boolean
}

export default function GlassCard({ children, accent, hover = true, sx, ...rest }: GlassCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        background: 'linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,15,0.96) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.1)',
          },
        }),
        ...(accent && {
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  )
}

export function Section({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 2, sm: 3 },
        position: 'relative',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export function Container({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        position: 'relative',
        zIndex: 1,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
