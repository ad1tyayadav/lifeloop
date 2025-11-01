/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import Stepper from "./Stepper"
import FileUploadBox from "./FileUpload"
import EventSelector from "./EventSelector"
import QuestionInput from "./QuestionInput"
import SimulationButton from "./SimulationBtn"
import ResultsDisplay from "./ResultDisplay"
import ProgressModal from "./ProgressModal"
import { useApp } from "@/contexts/AppContext"
import { simulationAPI } from "@/lib/api-client"

const STEPS = [
  { id: "upload", label: "Upload", description: "Add your data" },
  { id: "select", label: "Select", description: "Choose event" },
  { id: "question", label: "Question", description: "Ask query" },
  { id: "analyze", label: "Analyze", description: "Get insights" },
]

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<string>("")
  const [question, setQuestion] = useState<string>("")
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [currentProgressStep, setCurrentProgressStep] = useState(1)

  const { state, runSimulation, dispatch } = useApp()

  const getCurrentStep = () => {
    if (state.currentSimulation) return 3
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
        setShowProgressModal(false)
      }
    }, 1200)
    return interval
  }

  const handleRunSimulation = async () => {
    if (!file || !selectedEvent || !question.trim()) {
      alert("Please fill in all fields")
      return
    }

    setShowProgressModal(true)
    const progressInterval = simulateProgress()

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", `Simulation - ${new Date().toLocaleString()}`)
      formData.append("event_type", selectedEvent)
      formData.append("question", question.trim())

      await runSimulation(formData)
    } catch (error) {
      console.error("Simulation error:", error)
      alert("Error running simulation. Please try again.")
      clearInterval(progressInterval)
      setShowProgressModal(false)
    }
  }

  const handleCancelSimulation = () => {
    setShowProgressModal(false)
    setCurrentProgressStep(1)
  }

  const handleStartNewAnalysis = () => {
    // Clear local state
    setFile(null)
    setSelectedEvent("")
    setQuestion("")
    
    // Clear current simulation from context
    dispatch({ type: "ADD_SIMULATION", payload: null as any })
  }

  const handleExportReport = async () => {
    if (!state.currentSimulation) return;
    
    try {
      console.log('Starting download for simulation:', state.currentSimulation.id);
      
      const blob = await simulationAPI.downloadReport(state.currentSimulation.id);
      
      // Check if we got a valid blob
      if (!blob || blob.size === 0) {
        throw new Error('Empty response from server');
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `lifeloop-report-${state.currentSimulation.id}.zip`;
      
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('✅ Download completed successfully');
    } catch (error: any) {
      console.error('❌ Failed to download simulation:', error);
      
      // Fallback: Create a client-side text report
      console.log('Backend download failed, generating client-side report...');
      
      const reportContent = `
LIFELOOP SIMULATION REPORT
==========================

Simulation ID: ${state.currentSimulation.id}
Date: ${new Date().toLocaleDateString()}
Event Type: ${state.currentSimulation.eventType}
Question: ${state.currentSimulation.question}

IMPACT ANALYSIS:
• Revenue Impact: ${state.currentSimulation.result.impact.revenueDrop}%
• Workload Impact: +${state.currentSimulation.result.impact.workloadIncrease}%
• Trust Impact: -${state.currentSimulation.result.impact.trustDecline}%

AI RECOMMENDATION:
${state.currentSimulation.result.suggestion}

DETAILED ANALYSIS:
${state.currentSimulation.result.report}

TECHNICAL DETAILS:
• Transactions Analyzed: ${state.currentSimulation.result.details?.transactionsAnalyzed || 'N/A'}
• Suspicious Activities: ${state.currentSimulation.result.details?.suspiciousCount || 'N/A'}
• Risk Level: ${state.currentSimulation.result.details?.riskLevel || 'N/A'}
      `;
      
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lifeloop-report-${state.currentSimulation.id}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      alert('Report downloaded as text file (backend export coming soon)');
    }
  };

  useEffect(() => {
    document.body.style.overflow = showProgressModal ? "hidden" : "auto"
  }, [showProgressModal])

  return (
    <div className="bg-gradient-to-b from-[#ECFFF9] via-white to-[#E9F6FF]">
      {/* Simulation Section */}
      <section id="simulation-section" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Launch Impact Simulation</h2>
            <p className="text-gray-600">Upload your data. Simulate the shock. See the impact — before it happens</p>
          </div>

          <Stepper steps={STEPS} currentStep={getCurrentStep()} />

          {!state.currentSimulation ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[70vw] relative right-20">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-[#39D98A]" />
                    <h3 className="text-xl font-semibold text-gray-900">Impact Studio</h3>
                  </div>
                  <div className="space-y-6">
                    <FileUploadBox file={file} onFileChange={setFile} />
                    {file && <EventSelector selectedEvent={selectedEvent} onEventChange={setSelectedEvent} />}
                    {selectedEvent && <QuestionInput question={question} onQuestionChange={setQuestion} />}
                    {question.trim() && (
                      <SimulationButton
                        isLoading={state.isLoading}
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
            <ResultsDisplay
              result={state.currentSimulation.result}
              onStartNewAnalysis={handleStartNewAnalysis}
              onExportReport={handleExportReport}
            />
          )}
        </div>
      </section>

      <ProgressModal
        isOpen={showProgressModal}
        onClose={handleCancelSimulation}
        currentStep={currentProgressStep}
      />
    </div>
  )
}