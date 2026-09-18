import { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import HomePage from './pages/HomePage'
import DrivingSchoolSoftware from './pages/DrivingSchoolSoftware'
import DrivingSchoolManagementSoftware from './pages/DrivingSchoolManagementSoftware'
import DrivingSchoolSchedulingSoftware from './pages/DrivingSchoolSchedulingSoftware'
import DrivingSchoolStudentManagement from './pages/DrivingSchoolStudentManagement'
import PricingPage from './pages/PricingPage'
import FAQPage from './pages/FAQPage'
import CustomerDashboard from './pages/CustomerDashboard'
import PurchaseDialog from './components/PurchaseDialog'
import { supabase } from './lib/supabase'

type View = 'home' | 'dashboard'

function AppContent() {
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

  // Dashboard view (not a route — controlled by auth state)
  if (view === 'dashboard') {
    return <CustomerDashboard onLogout={handleLogout} />
  }

  // Routed views
  return (
    <>
      <Navbar onDashboardClick={handleDashboardClick} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/driving-school-software" element={<DrivingSchoolSoftware />} />
        <Route path="/driving-school-management-software" element={<DrivingSchoolManagementSoftware />} />
        <Route path="/driving-school-scheduling-software" element={<DrivingSchoolSchedulingSoftware />} />
        <Route path="/driving-school-student-management" element={<DrivingSchoolStudentManagement />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <Footer />

      <PurchaseDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}
