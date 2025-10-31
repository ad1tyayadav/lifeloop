import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LIFELOOP - Financial Chaos Analysis",
  description: "Analyze your financial transactions with AI-powered insights",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}