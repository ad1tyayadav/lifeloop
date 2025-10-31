"use client"

import Dashboard from "@/components/dashboard"
import HeroSection from "@/components/HeroSection"
import HistoryPage from "./history/page"
import AboutUsSection from "./about/page"
import { FocusCardsDemo } from "@/components/Features"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useApp } from "@/contexts/AppContext"

export default function Home() {
  // const { state } = useApp()
  // const router = useRouter()

  // useEffect(() => {
  //   if (state.user) {
  //     router.push('/dashboard')
  //   } else {
  //     router.push('/auth/login')
  //   }
  // }, [state.user, router])

  return (
    <div className="min-h-screen mint-gradient-bg items-center justify-center">
      <HeroSection />
      <Dashboard />
      <HistoryPage />
      <AboutUsSection />
      <FocusCardsDemo />
    </div>
  )
}