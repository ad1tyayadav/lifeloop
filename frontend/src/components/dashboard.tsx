"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CloudCog, UploadCloud, Cpu, ChartBar, Sparkles } from "lucide-react"
import Stepper from "./Stepper"
import FileUploadBox from "./FileUpload"
import EventSelector from "./EventSelector"
import QuestionInput from "./QuestionInput"
import SimulationButton from "./SimulationBtn"
import ResultsDisplay from "./ResultDisplay"
import ProgressModal from "./ProgressModal"
import { mockSimulationResponse } from "@/lib/mock-data"

interface SimulationResult {
  result: string
  suggestion: string
  details?: {
    transactionsAnalyzed: number
    suspiciousCount: number
    riskLevel: string
  }
}

const STEPS = [
  { id: "upload", label: "Upload", description: "Add your data" },
  { id: "select", label: "Select", description: "Choose event" },
  { id: "question", label: "Question", description: "Ask query" },
  { id: "analyze", label: "Analyze", description: "Get insights" },
]

// Animation variants
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }
const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } }
const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } }
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<string>("")
  const [question, setQuestion] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [currentProgressStep, setCurrentProgressStep] = useState(1)

  const getCurrentStep = () => {
    if (result) return 3
    if (question.trim()) return 2
    if (selectedEvent) return 1
    if (file) return 0
    return -1
  }

  const simulateProgress = () => {
    setCurrentProgressStep(1)
    const steps = [1, 2, 3, 4]
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setCurrentProgressStep(steps[currentIndex])
        currentIndex++
      } else {
        clearInterval(interval)
        setResult(mockSimulationResponse)
        setShowProgressModal(false)
        setIsLoading(false)
      }
    }, 1200)
    return interval
  }

  const handleRunSimulation = async () => {
    if (!file || !selectedEvent || !question.trim()) {
      alert("Please fill in all fields")
      return
    }
    setIsLoading(true)
    setShowProgressModal(true)
    try {
      const progressInterval = simulateProgress()
      return () => clearInterval(progressInterval)
    } catch (error) {
      console.error("Simulation error:", error)
      alert("Error running simulation")
      setShowProgressModal(false)
      setIsLoading(false)
    }
  }

  const handleCancelSimulation = () => {
    setShowProgressModal(false)
    setIsLoading(false)
    setCurrentProgressStep(1)
  }

  const handleStartNewAnalysis = () => {
    setFile(null)
    setSelectedEvent("")
    setQuestion("")
    setResult(null)
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return
    const yOffset = -100
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  useEffect(() => {
    document.body.style.overflow = showProgressModal ? "hidden" : "auto"
  }, [showProgressModal])

  const features = [
    { title: "Simulate events", description: "Run scenario-based simulations and visualize outcomes quickly.", icon: <CloudCog /> },
    { title: "Upload CSVs", description: "Drag & drop CSV uploads and map events with ease.", icon: <UploadCloud /> },
    { title: "Instant insights", description: "AI-powered summaries and recommended actions in seconds.", icon: <Cpu /> },
    { title: "Interactive charts", description: "Dynamic charts show impact on revenue, workload and trust.", icon: <ChartBar /> },
    { title: "Scenario suggestions", description: "Receive mitigation steps and playbooks tailored to the event.", icon: <Sparkles /> },
    { title: "Enterprise-ready", description: "Built for teams — shareable reports, exports and reproducible runs.", icon: <CloudCog /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-25 relative">

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div animate={{ x: [-50, 0, -50] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-400/20 blur-3xl" />
        <motion.div animate={{ y: [-30, 10, -30] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-8%] right-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-lime-200/30 to-emerald-300/10 blur-3xl" />
      </div>

      {/* Hero */}
      <header className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-32">
        <motion.div className="flex flex-col lg:flex-row items-start gap-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={staggerContainer}>
          <motion.div className="flex-1" variants={fadeInLeft}>
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-tight text-emerald-900">
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">LIFE LOOP</span>
              <span className="ml-3 text-3xl font-medium text-emerald-700">— Simulation & Insights</span>
            </h1>
            <p className="mt-6 text-xl text-emerald-800/85 max-w-3xl leading-relaxed">
              Turn raw events into confident decisions. Upload CSVs, pick an event, ask a focused question, and watch our AI-driven simulation show you the impact and recommended actions.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 shadow-xl" onClick={() => scrollToSection("features")}>
                <Sparkles size={18} /> Get started
              </motion.button>

              <motion.a whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 text-emerald-700 px-5 py-3" href="#">
                <CloudCog size={16} /> Docs
              </motion.a>
            </div>

            <motion.div className="mt-10 flex flex-wrap gap-4 text-sm text-emerald-900/80" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-full"><UploadCloud size={16} /> CSV uploads</motion.div>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-full"><ChartBar size={16} /> Visual analytics</motion.div>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-full"><Cpu size={16} /> AI-driven suggestions</motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="w-full lg:w-96 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-100" variants={fadeInRight}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase text-emerald-600">Live Simulation</p>
                <h3 className="mt-1 text-xl font-semibold text-emerald-900">Realtime insights · 0.7s</h3>
              </div>
              <div className="text-emerald-500"><ChartBar size={28} /></div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-emerald-800">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100"><p className="font-semibold">Trust Score</p><p className="text-xs mt-1">78 / 100</p></div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100"><p className="font-semibold">Risk Level</p><p className="text-xs mt-1">Moderate</p></div>
            </div>

            <div className="mt-5">
              <div className="h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700" style={{ width: "72%" }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <motion.h2 className="text-4xl font-bold text-emerald-900 text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}>What LIFE LOOP can do for you</motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          {features.map((f, idx) => (
            <FeatureCard key={idx} title={f.title} description={f.description} icon={f.icon} />
          ))}
        </motion.div>
      </section>

      {/* Progress Modal */}
      <ProgressModal isOpen={showProgressModal} onClose={handleCancelSimulation} currentStep={currentProgressStep} />

      {/* Main Simulation */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="mb-12"><Stepper steps={STEPS} currentStep={getCurrentStep()} /></div>

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div className="lg:col-span-2" variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-emerald-100">
                <h2 className="text-3xl font-bold text-emerald-900 mb-8">Upload & Analyze</h2>
                <div className="space-y-8">
                  <FileUploadBox file={file} onFileChange={setFile} />
                  {file && <EventSelector selectedEvent={selectedEvent} onEventChange={setSelectedEvent} />}
                  {selectedEvent && <QuestionInput question={question} onQuestionChange={setQuestion} />}
                  {question.trim() && <SimulationButton isLoading={isLoading} onClick={handleRunSimulation} disabled={!file || !selectedEvent || !question.trim()} />}
                </div>
              </div>
            </motion.div>

            <motion.aside className="bg-white rounded-3xl p-8 shadow-lg border border-emerald-100 h-fit" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
              <h3 className="text-xl font-semibold text-emerald-900 mb-6">Process Overview</h3>
              <ul className="space-y-5">
                {STEPS.map((step, index) => (
                  <li key={step.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 font-semibold">{index + 1}</div>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-800">{step.label}</p>
                      <p className="text-sm text-emerald-600 mt-1">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button onClick={() => alert("Exporting report...")} className="inline-flex items-center gap-2 cursor-pointer rounded-md px-5 py-3 bg-emerald-600 text-white">Export report</button>
              </div>
            </motion.aside>
          </div>
        ) : (
          <ResultsDisplay result={result} onStartNewAnalysis={handleStartNewAnalysis} />
        )}
      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}

/* FeatureCard component */
function FeatureCard({ title, description, icon }: { title?: string; description?: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
      transition={{ duration: 0.6, ease: "easeOut" }} whileHover={{ scale: 1.03, y: -4, rotateZ: 1 }}
      className="group relative bg-white rounded-3xl p-8 shadow-md border border-emerald-100 transition-all duration-300 hover:shadow-emerald-200/50 hover:border-emerald-300 overflow-hidden"
    >
      {title && <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-tr from-emerald-300 to-emerald-500 transform rotate-45 origin-top-right rounded-bl-md opacity-80" />}
      <div className="flex items-start gap-5 relative z-10">
        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
          {icon}
        </div>
        {title && description && <div><p className="font-semibold text-emerald-900 text-lg">{title}</p><p className="text-sm text-emerald-700/80 mt-2 leading-relaxed">{description}</p></div>}
      </div>
      <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-200/30 to-emerald-400/10 opacity-0"
        whileHover={{ opacity: 1 }} transition={{ duration: 0.4 }} />
    </motion.div>
  )
}

/* Footer component */
function Footer({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  return (
    <footer className="relative w-full py-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-50 via-white to-white clip-path-ellipse transform -translate-y-32 z-0"></div>
      <motion.div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-200/30 to-emerald-400/10 blur-3xl" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 className="text-5xl font-extrabold text-emerald-900 mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>About <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">LIFE LOOP</span></motion.h2>
        <motion.p className="text-lg sm:text-xl text-emerald-800/85 max-w-3xl mx-auto leading-relaxed mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }}>
          LIFE LOOP empowers teams to transform raw event data into actionable simulations and insights. Upload CSVs, run AI-powered analyses, and explore the impact of decisions in real-time — all in one unified platform.
        </motion.p>
        <motion.div className="flex flex-wrap justify-center gap-12 mb-12 relative z-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          {[{ title: "Simulations", icon: <CloudCog className="w-6 h-6" /> }, { title: "CSV Analysis", icon: <UploadCloud className="w-6 h-6" /> }, { title: "AI Insights", icon: <Cpu className="w-6 h-6" /> }, { title: "Visual Analytics", icon: <ChartBar className="w-6 h-6" /> }].map((item, idx) => (
            <motion.div key={idx} className="relative flex flex-col items-center gap-3" variants={fadeInUp}>
              <motion.div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-300/50 to-emerald-500/50 blur-2xl opacity-70" whileHover={{ scale: 1.15, opacity: 0.85 }} transition={{ duration: 0.5, ease: "easeOut" }} />
              <motion.div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-xl" animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}>
                {item.icon}
              </motion.div>
              <motion.p className="text-sm font-semibold text-emerald-900 text-center">{item.title}</motion.p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block text-white bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full font-semibold shadow-lg transition-all" onClick={() => scrollToSection("features")}>Explore Features</motion.button>
      </div>
    </footer>
  )
}
