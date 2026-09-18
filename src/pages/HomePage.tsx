import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import Hero from '../sections/Hero'
import Features from '../sections/Features'
import InstructorApp from '../sections/InstructorApp'
import HowItWorks from '../sections/HowItWorks'
import Pricing from '../sections/Pricing'
import WhySod from '../sections/WhySod'
import SocialProof from '../sections/SocialProof'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'

export default function HomePage() {
  const navigate = useNavigate()

  const handleBuyClick = () => {
    navigate('/pricing')
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SoD Driving School Pro",
      "alternateName": ["SoD Pro", "Set On Desk", "SoD Driving School"],
      "description": "Complete offline-first desktop management suite for Pakistani driving schools. Student management, automatic scheduling, finance tracking, vehicle management, document generation, WhatsApp integration and instructor companion app.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Windows 10, Windows 11",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "PKR",
        "description": "Free 30-day trial"
      },
      "author": {
        "@type": "Organization",
        "name": "SoD Driving School Pro",
        "url": "https://setondesk.com"
      },
      "featureList": [
        "Student Registration & Management",
        "Automatic Lesson Scheduling",
        "Finance, Revenue & Expense Tracking",
        "Vehicle & Staff Management",
        "Pick & Drop with Google Maps",
        "Document & Certificate Generation",
        "WhatsApp Integration",
        "Instructor Companion Android App",
        "Backup, Restore & JSON Export",
        "License Key Activation & Trial Management",
        "Website Connector for Online Bookings",
        "Global Business Support with Currency Detection"
      ],
      "screenshot": "https://setondesk.com/og-image.png",
      "softwareVersion": "1.0.0",
      "url": "https://setondesk.com"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SoD Driving School Pro",
      "alternateName": "Set On Desk",
      "url": "https://setondesk.com",
      "logo": "https://setondesk.com/Sod-logo.png",
      "description": "Complete desktop management suite for driving schools across Pakistan and worldwide."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SoD Driving School Pro",
      "url": "https://setondesk.com",
      "description": "Complete desktop management suite for Pakistani driving schools."
    }
  ]

  return (
    <>
      <SEO
        title="Driving School Software & Management System | Set on Desk"
        description="Set on Desk is driving school management software designed to help driving schools manage students, instructors, driving lessons, schedules, payments, records and everyday operations from one powerful desktop application."
        canonical="https://setondesk.com/"
        jsonLd={jsonLd}
      />
      <main>
        <Hero />
        <Features />
        <InstructorApp />
        <HowItWorks />
        <Pricing onBuyClick={handleBuyClick} />
        <WhySod />
        <SocialProof />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
