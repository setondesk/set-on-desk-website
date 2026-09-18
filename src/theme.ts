import { createTheme } from '@mui/material/styles'

export const palette = {
  bg: '#0A0A0F',
  surface: 'rgba(20, 20, 30, 0.92)',
  surfaceSolid: '#14141E',
  border: 'rgba(255, 255, 255, 0.06)',
  borderStrong: 'rgba(255, 255, 255, 0.1)',
  text: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.55)',
  textFaint: 'rgba(255, 255, 255, 0.4)',
  accentStart: '#E52929',
  accentEnd: '#EA580C',
  accent: '#EA580C',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
}

export const gradient = `linear-gradient(135deg, ${palette.accentStart} 0%, ${palette.accentEnd} 100%)`

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: palette.accentEnd,
    },
    background: {
      default: palette.bg,
      paper: palette.surfaceSolid,
    },
    text: {
      primary: palette.text,
      secondary: palette.textMuted,
    },
    divider: palette.border,
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: palette.bg,
          color: palette.text,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
      },
    },
  },
})
