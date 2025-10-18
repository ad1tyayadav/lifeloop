"use client"

import { useEffect, useState } from 'react'
import { Check, Upload, Brain, Sparkles, Loader } from 'lucide-react'

interface ProgressModalProps {
    isOpen: boolean
    onClose: () => void
    currentStep: number
}

const steps = [
    { id: 1, name: 'Uploading', icon: Upload, description: 'Processing your CSV file' },
    { id: 2, name: 'Processing', icon: Brain, description: 'Analyzing transaction patterns' },
    { id: 3, name: 'Generating Insights', icon: Sparkles, description: 'Creating AI-powered insights' },
    { id: 4, name: 'Done', icon: Check, description: 'Simulation complete' }
]

export default function ProgressModal({ isOpen, onClose, currentStep }: ProgressModalProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isOpen) {
            setProgress(0)
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        return 100
                    }
                    return prev + 1
                })
            }, 50)

            return () => clearInterval(interval)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="glass rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl border border-mint-accent/50 animate-scale-in">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-mint-dark to-mint-darker bg-clip-text text-transparent mb-2">
                        Running Simulation
                    </h2>
                    <p className="text-deep-grey/60">Analyzing your financial data</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-deep-grey/60 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-mint-accent/20 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-mint-dark to-mint-darker h-3 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                    {steps.map((step, index) => {
                        const StepIcon = step.icon
                        const isCompleted = currentStep > step.id
                        const isCurrent = currentStep === step.id
                        const isUpcoming = currentStep < step.id

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center gap-4 p-3 rounded-xl transition-smooth ${isCurrent ? 'bg-mint-light/40 border border-mint-dark/20' : ''
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${isCompleted
                                        ? 'bg-gradient-to-br from-mint-dark to-mint-darker text-white'
                                        : isCurrent
                                            ? 'bg-mint-dark text-white animate-pulse-mint'
                                            : 'bg-mint-accent/30 text-deep-grey/40'
                                    }`}>
                                    {isCurrent && step.id !== 4 ? (
                                        <Loader className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <StepIcon className="w-5 h-5" />
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <p className={`font-semibold transition-smooth ${isCompleted || isCurrent ? 'text-soft-black' : 'text-deep-grey/40'
                                        }`}>
                                        {step.name}
                                    </p>
                                    <p className={`text-sm transition-smooth ${isCompleted || isCurrent ? 'text-deep-grey/60' : 'text-deep-grey/40'
                                        }`}>
                                        {step.description}
                                    </p>
                                </div>

                                {/* Checkmark for completed steps */}
                                {isCompleted && (
                                    <div className="flex-shrink-0 w-6 h-6 bg-mint-dark rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Cancel Button */}
                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 px-4 border border-mint-accent/40 text-mint-dark rounded-lg font-semibold hover:bg-mint-light/20 transition-smooth hover:shadow-md active:scale-95"
                >
                    Cancel Simulation
                </button>
            </div>
        </div>
    )
}