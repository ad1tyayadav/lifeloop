/* eslint-disable @typescript-eslint/no-unused-vars */
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
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Running Simulation
                    </h2>
                    <p className="text-gray-600">Analyzing your financial data</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-[#39D98A] h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                    {steps.map((step, index) => {
                        const StepIcon = step.icon
                        const isCompleted = currentStep > step.id
                        const isCurrent = currentStep === step.id
                        const isUpcoming = currentStep < step.id

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                    isCurrent ? 'bg-[#39D98A]/10 border border-[#39D98A]/20' : ''
                                }`}
                            >
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                    isCompleted
                                        ? 'bg-[#39D98A] text-white'
                                        : isCurrent
                                            ? 'bg-[#39D98A] text-white'
                                            : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {isCurrent && step.id !== 4 ? (
                                        <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <StepIcon className="w-4 h-4" />
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <p className={`font-medium transition-colors ${
                                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                                    }`}>
                                        {step.name}
                                    </p>
                                    <p className={`text-sm transition-colors ${
                                        isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                        {step.description}
                                    </p>
                                </div>

                                {/* Checkmark for completed steps */}
                                {isCompleted && (
                                    <div className="flex-shrink-0 w-5 h-5 bg-[#39D98A] rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Cancel Button */}
                <button
                    onClick={onClose}
                    className="w-full mt-6 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    Cancel Simulation
                </button>
            </div>
        </div>
    )
}