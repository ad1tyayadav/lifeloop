// components/dashboard.tsx - UPDATED
"use client"

import { useState } from "react"
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

export default function Dashboard() {
    const [file, setFile] = useState<File | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<SimulationResult | null>(null)

    // ADD THESE STATES FOR PROGRESS MODAL
    const [showProgressModal, setShowProgressModal] = useState(false)
    const [currentProgressStep, setCurrentProgressStep] = useState(1)

    const getCurrentStep = () => {
        if (result) return 3
        if (question.trim()) return 2
        if (selectedEvent) return 1
        if (file) return 0
        return -1
    }

    // ADD PROGRESS SIMULATION FUNCTION
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
                // When progress completes, show results and close modal
                setResult(mockSimulationResponse)
                setShowProgressModal(false)
                setIsLoading(false)
            }
        }, 1500) // Each step takes 1.5 seconds

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
            // Start the progress simulation
            const progressInterval = simulateProgress()

            // In real app, this would be your API call
            // const formData = new FormData()
            // formData.append('file', file)
            // formData.append('event', selectedEvent)
            // formData.append('question', question)
            // const response = await axios.post('/api/simulate', formData)
            // setResult(response.data)

            // Clean up interval when component unmounts or simulation completes
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

    return (
        <div className="min-h-screen">

            {/* Progress Modal */}
            <ProgressModal
                isOpen={showProgressModal}
                onClose={handleCancelSimulation}
                currentStep={currentProgressStep}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 animate-slide-in-up">
                    <Stepper steps={STEPS} currentStep={getCurrentStep()} />
                </div>

                {!result ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Input Form */}
                        <div className="lg:col-span-2 space-y-6 animate-slide-in-up">
                            <div className="glass rounded-2xl p-8 shadow-lg border border-mint-accent/50 transition-smooth hover:shadow-xl hover:border-mint-dark/60 hover:bg-white/70">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-soft-black to-deep-grey bg-clip-text text-transparent mb-8">
                                    Upload & Analyze
                                </h2>

                                <div className="space-y-8">
                                    {/* File Upload */}
                                    <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                                        <FileUploadBox file={file} onFileChange={setFile} />
                                    </div>

                                    {/* Event Selector */}
                                    {file && (
                                        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                            <EventSelector selectedEvent={selectedEvent} onEventChange={setSelectedEvent} />
                                        </div>
                                    )}

                                    {/* Question Input */}
                                    {selectedEvent && (
                                        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                                            <QuestionInput question={question} onQuestionChange={setQuestion} />
                                        </div>
                                    )}

                                    {/* Run Simulation Button */}
                                    {question.trim() && (
                                        <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
                                            <SimulationButton
                                                isLoading={isLoading}
                                                onClick={handleRunSimulation}
                                                disabled={!file || !selectedEvent || !question.trim()}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Info Card */}
                        <div className="glass rounded-2xl p-8 shadow-lg h-fit border border-mint-accent/50 transition-smooth hover:shadow-xl hover:border-mint-dark/60 hover:bg-white/70 animate-slide-in-up">
                            <h3 className="text-lg font-bold bg-gradient-to-r from-soft-black to-deep-grey bg-clip-text text-transparent mb-6">
                                Process Overview
                            </h3>
                            <ul className="space-y-4">
                                {STEPS.map((step, index) => (
                                    <li key={step.id} className="flex gap-4 transition-smooth hover:translate-x-1">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-mint-light to-mint-medium text-mint-dark font-semibold text-sm shadow-sm shadow-mint-dark/10">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-soft-black text-sm">{step.label}</p>
                                            <p className="text-xs text-deep-grey/60 mt-1">
                                                {index === 0 && "Upload your transaction CSV file"}
                                                {index === 1 && "Select an event to analyze"}
                                                {index === 2 && "Ask a specific question"}
                                                {index === 3 && "Get AI-powered insights"}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    /* Results section with animation */
                    <div className="animate-scale-in">
                        <ResultsDisplay result={result} onStartNewAnalysis={handleStartNewAnalysis} />
                    </div>
                )}
            </main>
        </div>
    )
}
