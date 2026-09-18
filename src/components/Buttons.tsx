import { Button, ButtonProps } from '@mui/material'

export function PrimaryButton({ children, sx, ...rest }: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
        color: '#FFFFFF',
        fontWeight: 600,
        borderRadius: '8px',
        px: 3.5,
        py: 1.4,
        fontSize: '0.95rem',
        boxShadow: '0 4px 14px rgba(234,88,12,0.35)',
        textTransform: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
          transform: 'translateY(-1px)',
          boxShadow: '0 8px 24px rgba(234,88,12,0.5)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

export function GhostButton({ children, sx, ...rest }: ButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        color: '#FFFFFF',
        fontWeight: 600,
        borderRadius: '8px',
        px: 3.5,
        py: 1.4,
        fontSize: '0.95rem',
        textTransform: 'none',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'transparent',
        transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
        '&:hover': {
          border: '1px solid #EA580C',
          color: '#EA580C',
          background: 'rgba(234,88,12,0.06)',
          transform: 'translateY(-1px)',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
