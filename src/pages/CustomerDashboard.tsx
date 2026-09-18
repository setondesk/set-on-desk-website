import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Chip,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  InputAdornment,
  Drawer,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Key,
  Building2,
  User,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  Copy,
  Monitor,
  Smartphone,
  Globe,
  Menu,
  X,
  ChevronRight,
  Shield,
} from 'lucide-react'
import { supabase, Profile, License } from '../lib/supabase'
import { PrimaryButton, GhostButton } from '../components/Buttons'

interface LicenseRequest {
  id: string
  user_id: string
  business_name: string
  owner_name: string
  software: string
  status: 'pending' | 'approved' | 'denied'
  created_at: string
  notes: string | null
}

const softwareOptions = [
  { id: 'desktop', label: 'Driving School Pro', icon: Monitor, desc: 'Windows desktop app' },
  { id: 'instructor', label: 'Instructor App', icon: Smartphone, desc: 'Mobile app for instructors' },
  { id: 'website', label: 'Website Connector', icon: Globe, desc: 'Connect to your website' },
]

export default function CustomerDashboard({ onLogout }: { onLogout: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [licenses, setLicenses] = useState<License[]>([])
  const [requests, setRequests] = useState<LicenseRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Request form
  const [businessName, setBusinessName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [selectedSoftware, setSelectedSoftware] = useState('desktop')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    // Load profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileData) {
      setProfile(profileData as Profile)
      setBusinessName(profileData.business_name || '')
      setOwnerName(profileData.full_name || '')
    }

    // Load licenses
    const { data: licData } = await supabase
      .from('licenses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (licData) setLicenses(licData as License[])

    // Load license requests
    const { data: reqData } = await supabase
      .from('license_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (reqData) setRequests(reqData as LicenseRequest[])

    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!businessName.trim() || !ownerName.trim()) {
      setError('Please fill in both business name and owner name.')
      return
    }

    setSending(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('Session expired. Please sign in again.')
      setSending(false)
      return
    }

    // Update profile with latest info
    await supabase
      .from('profiles')
      .update({ business_name: businessName.trim(), full_name: ownerName.trim() })
      .eq('id', user.id)

    // Create license request
    const { error: reqErr } = await supabase.from('license_requests').insert({
      user_id: user.id,
      business_name: businessName.trim(),
      owner_name: ownerName.trim(),
      software: selectedSoftware,
      status: 'pending',
    })

    if (reqErr) {
      setError(reqErr.message)
      setSending(false)
      return
    }

    setSuccess('License request submitted! We\'ll review and approve it shortly.')
    setSending(false)

    // Reload requests
    const { data: reqData } = await supabase
      .from('license_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (reqData) setRequests(reqData as LicenseRequest[])
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip icon={<Clock size={14} />} label="Pending" size="small" sx={{ background: 'rgba(234,88,12,0.12)', color: '#EA580C', border: '1px solid rgba(234,88,12,0.25)', fontSize: '0.72rem', fontWeight: 600 }} />
      case 'approved':
        return <Chip icon={<CheckCircle2 size={14} />} label="Approved" size="small" sx={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)', fontSize: '0.72rem', fontWeight: 600 }} />
      case 'denied':
        return <Chip icon={<XCircle size={14} />} label="Denied" size="small" sx={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)', fontSize: '0.72rem', fontWeight: 600 }} />
      default:
        return <Chip label={status} size="small" />
    }
  }

  const getSoftwareIcon = (software: string) => {
    const opt = softwareOptions.find((s) => s.id === software)
    const Icon = opt?.icon || Monitor
    return <Icon size={16} />
  }

  const getSoftwareLabel = (software: string) => {
    return softwareOptions.find((s) => s.id === software)?.label || software
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0A0A0F' }}>
        <CircularProgress sx={{ color: '#EA580C' }} />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#0A0A0F' }}>
      {/* ── Sidebar (Desktop) ──────────────────────────────────────── */}
      <Box
        sx={{
          width: 300,
          background: 'rgba(15,15,22,0.95)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Sidebar header */}
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
              <Shield size={20} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>Set On Desk</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Customer Portal</Typography>
            </Box>
          </Box>
        </Box>

        {/* User info */}
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 36, height: 36, background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', fontSize: '0.85rem', fontWeight: 600 }}>
              {profile?.full_name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {profile?.full_name || 'User'}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {profile?.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* License Keys section */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2 }}>
            License Keys ({licenses.length})
          </Typography>

          {licenses.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Key size={24} style={{ color: 'rgba(255,255,255,0.2)', marginBottom: 8 }} />
              <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>No licenses yet</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', mt: 0.5 }}>Submit a request below</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {licenses.map((lic) => (
                <Box
                  key={lic.id}
                  sx={{
                    p: 2,
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: 'rgba(234,88,12,0.2)', background: 'rgba(234,88,12,0.04)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Chip
                      icon={getSoftwareIcon(lic.plan === 'pro' ? 'desktop' : lic.plan)}
                      label={getSoftwareLabel(lic.plan === 'pro' ? 'desktop' : lic.plan)}
                      size="small"
                      sx={{ background: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)', fontSize: '0.68rem', fontWeight: 600, height: 22 }}
                    />
                    <Chip
                      label={lic.status}
                      size="small"
                      sx={{
                        background: lic.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                        color: lic.status === 'active' ? '#22C55E' : 'rgba(255,255,255,0.4)',
                        fontSize: '0.68rem',
                        height: 22,
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', fontWeight: 600, color: '#22C55E', flex: 1, letterSpacing: '0.03em' }}>
                      {lic.license_key}
                    </Typography>
                    <Tooltip title={copied === lic.license_key ? 'Copied!' : 'Copy'}>
                      <IconButton onClick={() => copyKey(lic.license_key)} size="small" sx={{ color: copied === lic.license_key ? '#22C55E' : 'rgba(255,255,255,0.4)', p: 0.5 }}>
                        <Copy size={14} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', mt: 1 }}>
                    Business: {profile?.business_name || '—'}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Sign out */}
        <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <GhostButton onClick={handleSignOut} fullWidth sx={{ py: 1.2, fontSize: '0.85rem' }}>
            <LogOut size={16} style={{ marginRight: 8 }} /> Sign Out
          </GhostButton>
        </Box>
      </Box>

      {/* ── Mobile Sidebar Drawer ───────────────────────────────────── */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            background: 'rgba(10,10,15,0.98)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={() => setSidebarOpen(false)} sx={{ color: '#fff' }}>
            <X size={22} />
          </IconButton>
        </Box>
        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1rem', mb: 3 }}>License Keys</Typography>
        {licenses.length === 0 ? (
          <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>No licenses yet. Submit a request.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {licenses.map((lic) => (
              <Box key={lic.id} sx={{ p: 2, borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', fontWeight: 600, color: '#22C55E' }}>{lic.license_key}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', mt: 0.5 }}>{lic.plan} · {lic.status}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Drawer>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, ml: { xs: 0, md: '300px' }, minHeight: '100vh' }}>
        {/* Top bar */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(10,10,15,0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            px: { xs: 3, sm: 4 },
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ display: { md: 'none' }, color: '#fff' }}>
              <Menu size={22} />
            </IconButton>
            <Box>
              <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>Dashboard</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Manage your licenses</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #E52929 0%, #EA580C 100%)', fontSize: '0.75rem', fontWeight: 600 }}>
                {profile?.full_name?.charAt(0) || 'U'}
              </Avatar>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{profile?.full_name}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 3, sm: 4 }, maxWidth: 680 }}>
          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Alert severity="error" sx={{ mb: 3, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', '& .MuiAlert-icon': { color: '#EF4444' } }}>
                  {error}
                </Alert>
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Alert severity="success" sx={{ mb: 3, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '12px', '& .MuiAlert-icon': { color: '#22C55E' } }}>
                  {success}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Request License Card ─────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '16px',
                background: 'linear-gradient(160deg, rgba(20,20,30,0.6) 0%, rgba(10,10,15,0.8) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                mb: 4,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(229,41,41,0.15) 0%, rgba(234,88,12,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
                  <Send size={18} />
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1rem' }}>Request a License</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Fill in details and submit for approval</Typography>
                </Box>
              </Box>

              <Box component="form" onSubmit={handleSendRequest} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label="Business Name"
                  required
                  fullWidth
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. City Driving School"
                  InputProps={{ startAdornment: <InputAdornmentWrapper icon={Building2} /> }}
                  sx={fieldSx}
                />

                <TextField
                  label="Owner Name"
                  required
                  fullWidth
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Muhammad Ahmed"
                  InputProps={{ startAdornment: <InputAdornmentWrapper icon={User} /> }}
                  sx={fieldSx}
                />

                <Box>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1.5 }}>
                    Software
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 1.5 }}>
                    {softwareOptions.map((s) => (
                      <Box
                        key={s.id}
                        onClick={() => setSelectedSoftware(s.id)}
                        sx={{
                          p: 2,
                          borderRadius: '10px',
                          cursor: 'pointer',
                          border: selectedSoftware === s.id ? '1px solid rgba(234,88,12,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          background: selectedSoftware === s.id ? 'rgba(234,88,12,0.06)' : 'rgba(255,255,255,0.02)',
                          transition: 'all 0.2s ease',
                          '&:hover': { borderColor: 'rgba(234,88,12,0.3)' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ color: selectedSoftware === s.id ? '#EA580C' : 'rgba(255,255,255,0.4)' }}>
                            <s.icon size={18} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>{s.desc}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <PrimaryButton type="submit" fullWidth disabled={sending} sx={{ py: 1.5, mt: 1 }}>
                  {sending ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <><Send size={16} style={{ marginRight: 8 }} /> Submit Request</>}
                </PrimaryButton>
              </Box>
            </Box>
          </motion.div>

          {/* ── Request History ──────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '16px',
                background: 'linear-gradient(160deg, rgba(20,20,30,0.6) 0%, rgba(10,10,15,0.8) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4' }}>
                    <Clock size={18} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '1rem' }}>Request History</Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{requests.length} request{requests.length !== 1 ? 's' : ''}</Typography>
                  </Box>
                </Box>
              </Box>

              {requests.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <LayoutDashboard size={28} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: 8 }} />
                  <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }}>No requests yet</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {requests.map((req) => (
                    <Box
                      key={req.id}
                      sx={{
                        p: 2.5,
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ width: 36, height: 36, borderRadius: '9px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
                        {getSoftwareIcon(req.software)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 120 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>{req.business_name}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                          {req.owner_name} · {getSoftwareLabel(req.software)}
                        </Typography>
                      </Box>
                      {getStatusChip(req.status)}
                      <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', minWidth: 80, textAlign: 'right' }}>
                        {new Date(req.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  )
}

// ── Helper: InputAdornment with icon ──────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputAdornmentWrapper({ icon: Icon }: { icon: any }) {
  return (
    <InputAdornment position="start">
      <Icon size={16} style={{ color: 'rgba(255,255,255,0.35)' }} />
    </InputAdornment>
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
