"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"

export default function Home() {
  const { state } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (state.user) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [state.user, router])

  return (
    <div className="min-h-screen mint-gradient-bg flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="w-16 h-16 border-4 border-mint-dark border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-mint-dark font-semibold">Loading LIFELOOP...</p>
      </div>
    </div>
  )
}