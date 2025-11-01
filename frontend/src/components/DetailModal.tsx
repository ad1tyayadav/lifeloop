/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { X, Download, Calendar, FileText, BarChart3, AlertTriangle, Users, TrendingDown, TrendingUp } from "lucide-react"
import { transformBackendToFrontend } from "@/lib/api-client"
import { getEventTitle } from "@/lib/event-types";

interface Simulation {
    id: string
    date: string
    eventType: string
    question: string
    fileName: string
    result: any
}

interface SimulationDetailsModalProps {
    simulation: Simulation | null
    isOpen: boolean
    onClose: () => void
    onDownload: (id: string) => void
}

export default function SimulationDetailsModal({
    simulation,
    isOpen,
    onClose,
    onDownload
}: SimulationDetailsModalProps) {
    if (!isOpen || !simulation) return null

    const frontendResult = transformBackendToFrontend(simulation.result)
    const backendResult = simulation.result

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'critical zone': return 'text-red-600 bg-red-50 border-red-200'
            case 'caution layer': return 'text-amber-600 bg-amber-50 border-amber-200'
            case 'stable zone': return 'text-[#39D98A] bg-[#39D98A]/10 border-[#39D98A]/20'
            default: return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#39D98A]/10 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-[#39D98A]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Simulation Details</h2>
                            <p className="text-sm text-gray-500">Complete analysis report</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Event Type</h3>
                                    <p className="text-lg font-semibold text-gray-900">{getEventTitle(simulation.eventType)}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Question</h3>
                                    <p className="text-gray-900">{simulation.question || "No specific question provided"}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{formatDate(simulation.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{simulation.fileName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Impact Metrics */}
                        <div className="bg-gradient-to-r from-[#ECFFF9] to-[#E9F6FF] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-[#39D98A]" />
                                Impact Analysis
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-2">
                                        <TrendingDown className="w-6 h-6 text-red-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{simulation.result.impact.revenueDrop}%</p>
                                    <p className="text-sm text-gray-500">Revenue Impact</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                                        <TrendingUp className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">+{simulation.result.impact.workloadIncrease}</p>
                                    <p className="text-sm text-gray-500">Workload Impact</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                                    <div className="w-12 h-12 rounded-full bg-[#39D98A]/10 flex items-center justify-center mx-auto mb-2">
                                        <Users className="w-6 h-6 text-[#39D98A]" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">-{simulation.result.impact.trustDecline}%</p>
                                    <p className="text-sm text-gray-500">Trust Impact</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-[#39D98A]" />
                                    AI Recommendation
                                </h3>
                                <div className="bg-[#39D98A]/5 rounded-lg p-4 border border-[#39D98A]/20">
                                    <p className="text-gray-700">{frontendResult.suggestion}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700">{frontendResult.report}</p>
                                </div>
                            </div>
                        </div>

                        {/* Technical Details */}
                        {frontendResult.details && (
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Summary</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-900">{frontendResult.details.transactionsAnalyzed}</p>
                                        <p className="text-sm text-gray-500">Transactions Analyzed</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-900">{frontendResult.details.suspiciousCount}</p>
                                        <p className="text-sm text-gray-500">Suspicious Activities</p>
                                    </div>
                                    <div className={`text-center p-4 rounded-lg border-2 ${getRiskColor(frontendResult.details.riskLevel)}`}>
                                        <p className="text-2xl font-bold">{frontendResult.details.riskLevel}</p>
                                        <p className="text-sm">Risk Level</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Raw Data (Collapsible) */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <span className="font-semibold text-gray-900">Raw Simulation Data</span>
                                    <div className="w-5 h-5 transform group-open:rotate-180 transition-transform">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </summary>
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    <pre className="text-xs text-gray-600 overflow-x-auto">
                                        {JSON.stringify(backendResult, null, 2)}
                                    </pre>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => onDownload(simulation.id)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#39D98A] text-white hover:bg-[#34d399] transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download Full Report
                    </button>
                </div>
            </div>
        </div>
    )
}