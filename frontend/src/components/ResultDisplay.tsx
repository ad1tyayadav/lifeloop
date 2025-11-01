"use client"

import { TrendingDown, TrendingUp, Users, AlertTriangle, Download, BarChart3 } from "lucide-react"

interface ResultsDisplayProps {
    result: {
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
    onStartNewAnalysis: () => void
    onExportReport?: () => void
}

export default function ResultsDisplay({ result, onStartNewAnalysis, onExportReport }: ResultsDisplayProps) {
    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "high":
                return "text-red-600 bg-red-50 border-red-200"
            case "medium":
                return "text-amber-600 bg-amber-50 border-amber-200"
            case "low":
                return "text-[#39D98A] bg-[#39D98A]/10 border-[#39D98A]/20"
            default:
                return "text-gray-600 bg-gray-50 border-gray-200"
        }
    }

    const handleExport = () => {
        if (onExportReport) {
            onExportReport();
        } else {
            console.log('Export functionality not implemented yet');
            alert('Export feature coming soon!');
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulation Results: Your Future, Modeled.</h2>
                <p className="text-gray-600">LIFELOOP&apos;s Chain-Reaction Engine forecasts your ecosystem impact — before it unfolds.</p>
            </div>

            {/* Impact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Revenue Impact Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="text-sm font-medium text-red-600">Revenue Delta</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{result.impact.revenueDrop}%</p>
                    <p className="text-sm text-gray-500">Projected drop</p>
                </div>

                {/* Workload Impact Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-amber-600">System Load</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">+{result.impact.workloadIncrease}%</p>
                    <p className="text-sm text-gray-500">Increase expected</p>
                </div>

                {/* Trust Impact Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#39D98A]/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#39D98A]" />
                        </div>
                        <span className="text-sm font-medium text-[#39D98A]">Trust Index</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">-{result.impact.trustDecline}%</p>
                    <p className="text-sm text-gray-500">Decline forecast</p>
                </div>
            </div>

            {/* Chart Area & AI Report */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-[#39D98A]" />
                        <h3 className="text-lg font-semibold text-gray-900">Impact Analysis</h3>
                    </div>
                    <div className="h-48 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">Interactive chart visualization</p>
                        </div>
                    </div>
                </div>

                {/* AI Report */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-[#39D98A]" />
                        <h3 className="text-lg font-semibold text-gray-900">AI Report</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-[#39D98A]/5 rounded border border-[#39D98A]/20">
                            <p className="text-sm font-medium text-gray-900 mb-1">Recommendation</p>
                            <p className="text-gray-600 text-sm">{result.suggestion}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">
                            <p className="text-sm font-medium text-gray-900 mb-1">Analysis</p>
                            <p className="text-gray-600 text-sm">{result.report}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Metrics */}
            {result.details && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Intelligence Log</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Transactions Processed</p>
                            <p className="text-xl font-bold text-gray-900">{result.details.transactionsAnalyzed.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Suspicious Activities</p>
                            <p className="text-xl font-bold text-gray-900">{result.details.suspiciousCount}</p>
                        </div>
                        <div className={`rounded p-3 border-2 ${getRiskColor(result.details.riskLevel)}`}>
                            <p className="text-sm font-medium mb-1">Risk Index</p>
                            <p className="text-xl font-bold">{result.details.riskLevel}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={onStartNewAnalysis}
                    className="bg-[#39D98A] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#34d399] transition-colors"
                >
                    Run New Simulation
                </button>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export Loop Report
                </button>
            </div>
        </div>
    )
}