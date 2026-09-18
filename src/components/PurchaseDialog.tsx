import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  InputAdornment,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Building2Icon,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { PrimaryButton } from './Buttons'

interface Props {
  open: boolean
  onClose: () => void
  onAuthSuccess?: () => void
}

type Step = 'auth' | 'verify-email'
type AuthTab = 'signup' | 'signin'

export default function PurchaseDialog({ open, onClose, onAuthSuccess }: Props) {
  const [step, setStep] = useState<Step>('auth')
  const [authTab, setAuthTab] = useState<AuthTab>('signup')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')

  // Check if already signed in when dialog opens
  useEffect(() => {
    if (open) {
      checkAuth()
    }
  }, [open])

  const checkAuth = async () => {
    setCheckingAuth(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      // Already logged in — close dialog and go to dashboard
      handleClose()
      onAuthSuccess?.()
    } else {
      setStep('auth')
    }
    setCheckingAuth(false)
  }

  const reset = () => {
    setStep('auth')
    setAuthTab('signup')
    setError(null)
    setSuccess(null)
    setEmail('')
    setPassword('')
    setFullName('')
    setBusinessName('')
    setShowPassword(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  // ── Auth handlers ──────────────────────────────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setError(null)
    setLoading(true)

    console.log('[Signup] Starting signup for:', email.trim())

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

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            business_name: businessName.trim() || null,
          },
        },
      })

      console.log('[Signup] Response:', { signUpData, signUpError })

      if (signUpError) {
        console.error('[Signup] Error:', signUpError)
        setError(signUpError.message)
        setLoading(false)
        return
      }

      // If session is null, email confirmation is required
      if (!signUpData.session) {
        console.log('[Signup] Email confirmation required')
        setStep('verify-email')
        setLoading(false)
        return
      }

      // If session exists (confirm email disabled), go straight to dashboard
      console.log('[Signup] Success! Session created.')
      setSuccess('Account created! Redirecting...')
      setLoading(false)
      setTimeout(() => {
        handleClose()
        onAuthSuccess?.()
      }, 1000)
    } catch (err) {
      console.error('[Signup] Unexpected error:', err)
      setError('Unexpected error: ' + (err instanceof Error ? err.message : String(err)))
      setLoading(false)
    }
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

    handleClose()
    onAuthSuccess?.()
    setLoading(false)
  }

  // Helper: render auth button content
  const renderAuthBtn = () => {
    if (loading) return <CircularProgress size={20} sx={{ color: 'white' }} />
    return authTab === 'signup' ? 'Create Account' : 'Sign In'
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(160deg, rgba(20,20,30,0.98) 0%, rgba(10,10,15,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ height: '3px', background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)' }} />

      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'rgba(255,255,255,0.4)',
            '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' },
          }}
        >
          <X size={20} />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3, mt: 1 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              mx: 'auto',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)',
              border: '1px solid rgba(234,88,12,0.2)',
              color: '#EA580C',
            }}
          >
            <ShieldCheck size={24} />
          </Box>
          <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.4rem' }}>
            {step === 'auth' ? 'Create Your Account' : 'Verify Your Email'}
          </Typography>
          <Typography sx={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', mt: 0.8 }}>
            {step === 'auth' ? 'Sign up or sign in to request a license.' : 'Confirm your email to proceed.'}
          </Typography>
        </Box>

        {/* Loading state while checking auth */}
        {checkingAuth && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
            <CircularProgress size={32} sx={{ color: '#EA580C' }} />
            <Typography sx={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' }}>Checking account...</Typography>
          </Box>
        )}

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Alert severity="error" sx={alertSx('#EF4444', 'rgba(239,68,68,0.12)', 'rgba(239,68,68,0.25)')}>
                {error}
              </Alert>
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Alert icon={<CheckCircle2 size={18} />} severity="success" sx={alertSx('#22C55E', 'rgba(34,197,94,0.12)', 'rgba(34,197,94,0.25)')}>
                {success}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Box sx={{ display: checkingAuth ? 'none' : 'block' }}>
        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP: VERIFY EMAIL                                         */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === 'verify-email' && (
          <motion.div key="verify-email" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  mx: 'auto',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(6,182,212,0.12)',
                  color: '#06B6D4',
                }}
              >
                <Mail size={28} />
              </Box>
              <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1.15rem', mb: 1 }}>
                Check your email
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, mb: 3 }}>
                We sent a confirmation link to <strong style={{ color: '#fff' }}>{email}</strong>. Click the link in the email to verify your account, then sign in to continue.
              </Typography>

              <Alert severity="info" sx={{ mb: 3, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', color: '#fff', borderRadius: '10px', '& .MuiAlert-icon': { color: '#06B6D4' }, fontSize: '0.82rem', textAlign: 'left' }}>
                Didn't receive the email? Check your spam folder, or go back and try again.
              </Alert>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <PrimaryButton onClick={() => { setStep('auth'); setAuthTab('signin'); setError(null); }} fullWidth sx={{ py: 1.5 }}>
                  I've Verified — Sign In
                </PrimaryButton>
                <Box
                  onClick={() => { setStep('auth'); setAuthTab('signup'); setError(null); }}
                  sx={{ textAlign: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', '&:hover': { color: '#EA580C' } }}
                >
                  Use a different email
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP: AUTH                                                 */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <Tabs
              value={authTab}
              onChange={(_, v) => {
                setAuthTab(v)
                setError(null)
              }}
              sx={{
                mb: 3,
                '& .MuiTab-root': { color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', minWidth: '50%' },
                '& .Mui-selected': { color: '#fff' },
                '& .MuiTabs-indicator': { background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', height: 3, borderRadius: '3px 3px 0 0' },
              }}
            >
              <Tab label="Sign Up" value="signup" />
              <Tab label="Sign In" value="signin" />
            </Tabs>

            <Box component="form" onSubmit={authTab === 'signup' ? handleSignup : handleSignin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <AnimatePresence mode="wait">
                {authTab === 'signup' && (
                  <motion.div key="name" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                    <TextField
                      label="Full Name"
                      required
                      fullWidth
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><User size={16} style={{ color: 'rgba(255,255,255,0.35)' }} /></InputAdornment> }}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={16} style={{ color: 'rgba(255,255,255,0.35)' }} /></InputAdornment> }}
                sx={fieldSx}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={authTab === 'signup' ? 'At least 8 characters' : undefined}
                FormHelperTextProps={{ sx: { color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock size={16} style={{ color: 'rgba(255,255,255,0.35)' }} /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" sx={{ color: 'rgba(255,255,255,0.35)' }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={fieldSx}
              />

              <AnimatePresence mode="wait">
                {authTab === 'signup' && (
                  <motion.div key="biz" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                    <TextField
                      label="Business Name (optional)"
                      fullWidth
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><Building2Icon size={16} style={{ color: 'rgba(255,255,255,0.35)' }} /></InputAdornment> }}
                      sx={fieldSx}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <PrimaryButton type="submit" fullWidth disabled={loading} sx={{ py: 1.5, mt: 1 }}>
                {renderAuthBtn()}
              </PrimaryButton>
            </Box>
          </motion.div>
        )}

        <Typography sx={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', mt: 3 }}>
          Secured by Set On Desk · You'll request a license after signing in
        </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.16)' },
    '&.Mui-focused fieldset': { borderColor: '#EA580C' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#EA580C' },
}

const alertSx = (iconColor: string, bg: string, border: string) => ({
  mb: 2,
  background: bg,
  border: `1px solid ${border}`,
  color: '#fff',
  borderRadius: '10px',
  '& .MuiAlert-icon': { color: iconColor },
})
