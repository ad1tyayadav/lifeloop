"use client"

import React, { useEffect, useState } from "react"
import {Zap } from "lucide-react"
import Stepper from "./Stepper"
import FileUploadBox from "./FileUpload"
import EventSelector from "./EventSelector"
import QuestionInput from "./QuestionInput"
import SimulationButton from "./SimulationBtn"
import ResultsDisplay from "./ResultDisplay"
import ProgressModal from "./ProgressModal"
import { mockSimulationResponse } from "@/lib/mock-data"

interface SimulationResult {
  impact: {
    revenueDrop: number
    workloadIncrease: number
    trustDecline: number
  }
  report: string
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

// // Animation variants
// const fadeInUp = { 
//   hidden: { opacity: 0, y: 20 }, 
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } 
// }

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

  // const scrollToSection = (id: string) => {
  //   const section = document.getElementById(id)
  //   if (!section) return
  //   const yOffset = -80
  //   const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
  //   window.scrollTo({ top: y, behavior: "smooth" })
  // }

  useEffect(() => {
    document.body.style.overflow = showProgressModal ? "hidden" : "auto"
  }, [showProgressModal])

  // const features = [
  //   { title: "Scenario Simulation", description: "Run predictive simulations and visualize outcomes.", icon: <CloudCog /> },
  //   { title: "Data Analytics", description: "Upload CSV files and get instant insights.", icon: <UploadCloud /> },
  //   { title: "AI Insights", description: "Get intelligent recommendations powered by AI.", icon: <Cpu /> },
  //   { title: "Interactive Charts", description: "Visualize impact on revenue and workload.", icon: <ChartBar /> },
  // ]

  return (
    <div className="bg-gradient-to-b from-[#ECFFF9] via-white to-[#E9F6FF]">

      {/* Hero Section
      <section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl font-bold text-gray-900"
            >
              <span className="text-[#39D98A]">LIFE LOOP</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Where uncertainty meets intelligence. Predict the ripple before it hits.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => scrollToSection("simulation-section")}
                className="bg-[#39D98A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#34d399] transition-colors flex items-center gap-2"
              >
                <Play size={20} />
                Run Simulation
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </motion.div>

            Stats
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#39D98A]">98%</div>
                <div className="text-sm text-gray-500">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#39D98A]">0.7s</div>
                <div className="text-sm text-gray-500">Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#39D98A]">24/7</div>
                <div className="text-sm text-gray-500">Monitoring</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Simulation Section */}
      <section id="simulation-section" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Run Your Simulation</h2>
            <p className="text-gray-600">Upload data, configure scenarios, and get AI-powered insights</p>
          </div>

          <Stepper steps={STEPS} currentStep={getCurrentStep()} />

          {!result ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-[#39D98A]" />
                    <h3 className="text-xl font-semibold text-gray-900">Simulation Lab</h3>
                  </div>
                  <div className="space-y-6">
                    <FileUploadBox file={file} onFileChange={setFile} />
                    {file && <EventSelector selectedEvent={selectedEvent} onEventChange={setSelectedEvent} />}
                    {selectedEvent && <QuestionInput question={question} onQuestionChange={setQuestion} />}
                    {question.trim() && (
                      <SimulationButton 
                        isLoading={isLoading} 
                        onClick={handleRunSimulation} 
                        disabled={!file || !selectedEvent || !question.trim()} 
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-fit">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                <div className="space-y-4">
                  {STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#39D98A] text-white flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{step.label}</p>
                        <p className="text-xs text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ResultsDisplay result={result} onStartNewAnalysis={handleStartNewAnalysis} />
          )}
        </div>
      </section>

      {/* Features Section
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What LIFELOOP Can Do</h2>
            <p className="text-gray-600">Powerful simulation tools for modern business intelligence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#39D98A] text-white flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       CTA Section
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Join forward-thinking teams using LIFELOOP to make better decisions</p>
          <button
            onClick={() => scrollToSection("simulation-section")}
            className="bg-[#39D98A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#34d399] transition-colors"
          >
            Start Simulating Now
          </button>
        </div>
      </section> */}

      <ProgressModal isOpen={showProgressModal} onClose={handleCancelSimulation} currentStep={currentProgressStep} />
    </div>
  )
}