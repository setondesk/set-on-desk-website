import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  Tab,
  Tabs,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Building2, X, CheckCircle2, ShieldCheck } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { PrimaryButton } from './Buttons'

interface Props {
  open: boolean
  onClose: () => void
}

type TabKey = 'signup' | 'signin'

export default function AuthDialog({ open, onClose }: Props) {
  const [tab, setTab] = useState<TabKey>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const reset = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setBusinessName('')
    setError(null)
    setSuccess(null)
    setShowPassword(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!fullName.trim()) {
      setError('Please enter your full name.')
      setLoading(false)
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          business_name: businessName.trim() || null,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    setSuccess('Account created! Check your email to confirm, then sign in.')
    setLoading(false)
    setTimeout(() => {
      setTab('signin')
      setSuccess(null)
    }, 2000)
  }

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    setSuccess('Signed in successfully!')
    setLoading(false)
    setTimeout(() => {
      handleClose()
    }, 1200)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(160deg, rgba(18,18,28,0.98) 0%, rgba(10,10,15,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ height: '2px', background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)' }} />

      <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'rgba(255,255,255,0.35)',
            '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' },
          }}
        >
          <X size={18} />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 2, mt: 0.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              mx: 'auto',
              mb: 1.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)',
              border: '1px solid rgba(234,88,12,0.2)',
              color: '#EA580C',
            }}
          >
            <ShieldCheck size={20} />
          </Box>
          <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>
            {tab === 'signup' ? 'Create Account' : 'Welcome Back'}
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
            {tab === 'signup'
              ? 'Sign up to manage your license.'
              : 'Sign in to your account.'}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v)
            setError(null)
            setSuccess(null)
          }}
          sx={{
            mb: 2,
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.85rem',
              minWidth: '50%',
              py: 0.5,
              minHeight: 36,
            },
            '& .Mui-selected': { color: '#fff' },
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)',
              height: 2,
              borderRadius: '2px 2px 0 0',
            },
          }}
        >
          <Tab label="Sign Up" value="signup" />
          <Tab label="Sign In" value="signin" />
        </Tabs>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <Alert severity="error" sx={{ mb: 1.5, py: 0.5, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fff', borderRadius: '8px', fontSize: '0.78rem', '& .MuiAlert-icon': { color: '#EF4444', fontSize: '18px' } }}>
                {error}
              </Alert>
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <Alert icon={<CheckCircle2 size={16} />} severity="success" sx={{ mb: 1.5, py: 0.5, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#fff', borderRadius: '8px', fontSize: '0.78rem', '& .MuiAlert-icon': { color: '#22C55E', fontSize: '18px' } }}>
                {success}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms */}
        <Box component="form" onSubmit={tab === 'signup' ? handleSignup : handleSignin} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <AnimatePresence mode="wait">
            {tab === 'signup' && (
              <motion.div key="signup-name" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>
                <TextField
                  label="Full Name"
                  required
                  fullWidth
                  size="small"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldSx}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={tab === 'signup' ? 'At least 8 characters' : undefined}
            FormHelperTextProps={{ sx: { color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', mt: 0.3 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" sx={{ color: 'rgba(255,255,255,0.35)' }}>
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />

          <AnimatePresence mode="wait">
            {tab === 'signup' && (
              <motion.div key="signup-biz" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>
                <TextField
                  label="Business Name (optional)"
                  fullWidth
                  size="small"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Building2 size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldSx}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <PrimaryButton type="submit" fullWidth disabled={loading} sx={{ py: 1, mt: 0.5, fontSize: '0.85rem' }}>
            {loading ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : tab === 'signup' ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </PrimaryButton>
        </Box>

        <Typography sx={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', mt: 2 }}>
          By continuing you agree to the Terms of Service.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.85rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.07)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.14)' },
    '&.Mui-focused fieldset': { borderColor: '#EA580C' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#EA580C' },
}
