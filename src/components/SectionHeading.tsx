import { Box, Typography } from '@mui/material'

interface Props {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeading({ label, title, subtitle, center = true }: Props) {
  return (
    <Box sx={{ textAlign: center ? 'center' : 'left', mb: { xs: 5, md: 8 }, maxWidth: 720, mx: center ? 'auto' : 0 }}>
      {label && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#EA580C',
            background: 'rgba(234,88,12,0.1)',
            border: '1px solid rgba(234,88,12,0.25)',
            borderRadius: '9999px',
            px: 2,
            py: 0.5,
            mb: 2.5,
          }}
        >
          {label}
        </Box>
      )}
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          lineHeight: 1.15,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: 600,
            mx: center ? 'auto' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
