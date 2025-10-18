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
            case 'high': return 'text-red-600 bg-red-50 border-red-200'
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'low': return 'text-green-600 bg-green-50 border-green-200'
            default: return 'text-gray-600 bg-gray-50 border-gray-200'
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
        <div className="min-h-screen mint-gradient-bg">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="glass rounded-2xl p-8 shadow-lg border border-mint-accent/50 transition-smooth hover:shadow-xl hover:border-mint-dark/60 hover:bg-white/70">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-soft-black to-deep-grey bg-clip-text text-transparent mb-2">
                                Simulation History
                            </h1>
                            <p className="text-deep-grey/60">
                                Review and re-run your previous analyses
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-4 sm:mt-0 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-grey/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 rounded-lg border border-mint-accent/40 bg-white/50 focus:border-mint-dark focus:ring-2 focus:ring-mint-dark/20 transition-smooth outline-none w-full sm:w-64"
                            />
                        </div>
                    </div>

                    {/* History List */}
                    {filteredHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-mint-accent/40 mx-auto mb-4" />
                            <p className="text-deep-grey/60 text-lg mb-2">No simulation history yet</p>
                            <p className="text-deep-grey/40 text-sm">
                                Run your first analysis to see it appear here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredHistory.map((simulation, index) => (
                                <div
                                    key={simulation.id}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    className="glass rounded-xl p-6 border border-mint-accent/40 hover:border-mint-dark/60 transition-smooth hover:shadow-md animate-fade-in"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        {/* Simulation Info */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                                                <h3 className="font-semibold text-soft-black text-lg">
                                                    {simulation.eventType}
                                                </h3>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(simulation.result.riskLevel)}`}>
                                                    {simulation.result.riskLevel} Risk
                                                </span>
                                            </div>

                                            <p className="text-deep-grey/70 mb-3">
                                                {simulation.question}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-deep-grey/50">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(simulation.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FileText className="w-4 h-4" />
                                                    <span>{simulation.fileName}</span>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-soft-black">
                                                        {simulation.result.transactionsAnalyzed}
                                                    </span> transactions analyzed
                                                </div>
                                                <div>
                                                    <span className="font-medium text-soft-black">
                                                        {simulation.result.suspiciousCount}
                                                    </span> suspicious items
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => handleReRun(simulation.id)}
                                                className="p-3 rounded-lg bg-gradient-to-r from-mint-dark to-mint-darker text-white hover:shadow-lg transition-smooth hover:scale-105 active:scale-95 group"
                                                title="Re-run simulation"
                                            >
                                                <Play className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(simulation.id)}
                                                className="p-3 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group"
                                                title="Download report"
                                            >
                                                <Download className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                                            </button>
                                            <button
                                                onClick={() => handleViewDetails(simulation.id)}
                                                className="p-3 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group"
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
