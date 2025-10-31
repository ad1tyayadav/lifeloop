"use client"

import { useApp } from "@/contexts/AppContext"
import { Download, Play, Eye, Calendar, FileText, Search } from "lucide-react"
import { useState } from "react"
import { mockHistory } from "@/lib/mock-data"

export default function HistoryPage() {
    const { state, dispatch } = useApp()
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredHistory, setFilteredHistory] = useState(mockHistory)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getRiskColor = (riskLevel: string) => {
        switch (riskLevel.toLowerCase()) {
            case 'high': return 'text-[#FF5252] bg-[#FF5252]/10 border-[#FF5252]/20'
            case 'medium': return 'text-[#FFB74D] bg-[#FFB74D]/10 border-[#FFB74D]/20'
            case 'low': return 'text-[#39D98A] bg-[#39D98A]/10 border-[#39D98A]/20'
            default: return 'text-[#5A5A5A] bg-[#5A5A5A]/10 border-[#5A5A5A]/20'
        }
    }

    // Action handlers
    const handleReRun = (simulationId: string) => {
        console.log('Re-run simulation:', simulationId)
        // TODO: Implement re-run logic
    }
    const handleDownload = (simulationId: string) => {
        console.log('Download simulation:', simulationId)
        // TODO: Implement download logic
    }

    const handleViewDetails = (simulationId: string) => {
        console.log('View details simulation:', simulationId)
        // TODO: Implement view details logic
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#ECFFF9] via-white to-[#E9F6FF]">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="p-8 ">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1E1E1E] mb-2">
                                Simulation History
                            </h1>
                            <p className="text-[#5A5A5A]">
                                Review and re-run your previous analyses
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-4 sm:mt-0 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A5A5A]/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 rounded-lg border border-[#39D98A]/20 bg-white/50 focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-smooth outline-none w-full sm:w-64"
                            />
                        </div>
                    </div>

                    {/* History List */}
                    {filteredHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-[#39D98A]/40 mx-auto mb-4" />
                            <p className="text-[#5A5A5A] text-lg mb-2">No simulation history yet</p>
                            <p className="text-[#5A5A5A]/60 text-sm">
                                Run your first analysis to see it appear here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredHistory.map((simulation, index) => (
                                <div
                                    key={simulation.id}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    className="glass rounded-xl p-6 border border-[#39D98A]/20 hover:border-[#39D98A]/60 transition-smooth hover:shadow-md animate-fade-in"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        {/* Simulation Info */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                                                <h3 className="font-semibold text-[#1E1E1E] text-lg">
                                                    {simulation.eventType}
                                                </h3>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(simulation.result.riskLevel)}`}>
                                                    {simulation.result.riskLevel} Risk
                                                </span>
                                            </div>

                                            <p className="text-[#5A5A5A] mb-3">
                                                {simulation.question}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#5A5A5A]">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(simulation.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FileText className="w-4 h-4" />
                                                    <span>{simulation.fileName}</span>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-[#1E1E1E]">
                                                        {simulation.result.transactionsAnalyzed}
                                                    </span> transactions analyzed
                                                </div>
                                                <div>
                                                    <span className="font-medium text-[#1E1E1E]">
                                                        {simulation.result.suspiciousCount}
                                                    </span> suspicious items
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {/* <button
                                                onClick={() => handleReRun(simulation.id)}
                                                className="p-3 rounded-lg bg-gradient-to-r from-[#39D98A] to-[#007AFF] text-white hover:shadow-lg transition-smooth hover:scale-105 active:scale-95 group electric-glow-sm"
                                                title="Re-run simulation"
                                            >
                                                <Play className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                                            </button> */}
                                            <button
                                                onClick={() => handleDownload(simulation.id)}
                                                className="p-3 rounded-lg bg-[#39D98A]/10 text-[#39D98A] hover:bg-[#39D98A]/20 transition-smooth hover:shadow-md active:scale-95 group"
                                                title="Download report"
                                            >
                                                <Download className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                                            </button>
                                            <button
                                                onClick={() => handleViewDetails(simulation.id)}
                                                className="p-3 rounded-lg bg-[#39D98A]/10 text-[#39D98A] hover:bg-[#39D98A]/20 transition-smooth hover:shadow-md active:scale-95 group"
                                                title="View details"
                                            >
                                                <Eye className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}