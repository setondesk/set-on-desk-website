import { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import InstructorApp from './sections/InstructorApp'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import WhySod from './sections/WhySod'
import SocialProof from './sections/SocialProof'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomerDashboard from './pages/CustomerDashboard'
import PurchaseDialog from './components/PurchaseDialog'
import { supabase } from './lib/supabase'

type View = 'home' | 'dashboard'

export default function App() {
  const [view, setView] = useState<View>('home')
  const [authOpen, setAuthOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check auth state on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
      // If signed out and on dashboard, go home
      if (!session?.user && view === 'dashboard') {
        setView('home')
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [view])

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      setView('dashboard')
    } else {
      setAuthOpen(true)
    }
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setView('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setView('home')
  }

  // Dashboard view
  if (view === 'dashboard') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomerDashboard onLogout={handleLogout} />
      </ThemeProvider>
    )
  }

  // Home view
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onDashboardClick={handleDashboardClick} />
      <main>
        <Hero />
        <Features />
        <InstructorApp />
        <HowItWorks />
        <Pricing onBuyClick={() => setAuthOpen(true)} />
        <WhySod />
        <SocialProof />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <PurchaseDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </ThemeProvider>
  )
}
