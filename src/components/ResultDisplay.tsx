"use client"

import { CheckCircle2, AlertCircle, TrendingUp, ArrowRight } from "lucide-react"

interface ResultsDisplayProps {
    result: {
        result: string
        suggestion: string
        details?: {
            transactionsAnalyzed: number
            suspiciousCount: number
            riskLevel: string
        }
    }
    onStartNewAnalysis: () => void
}

export default function ResultsDisplay({ result, onStartNewAnalysis }: ResultsDisplayProps) {
    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "high":
                return "text-red-600 bg-red-50 border-red-200"
            case "medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200"
            case "low":
                return "text-green-600 bg-green-50 border-green-200"
            default:
                return "text-mint-dark bg-mint-light border-mint-accent"
        }
    }

    return (
        <div className="mt-12 space-y-8 animate-slide-in-up">
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-soft-black to-deep-grey bg-clip-text text-transparent mb-2">
                    Analysis Results
                </h2>
                <p className="text-deep-grey/60">Here&apos;s what we found in your data</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-8 shadow-lg border-l-4 border-mint-dark transition-smooth hover:shadow-xl hover:scale-105 hover:bg-white/80 animate-fade-in">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mint-light to-mint-medium flex items-center justify-center flex-shrink-0 shadow-md shadow-mint-dark/20">
                            <CheckCircle2 className="w-7 h-7 text-mint-dark" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-soft-black mb-2 text-lg">Key Finding</h3>
                            <p className="text-deep-grey/80 leading-relaxed">{result.result}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="glass rounded-2xl p-8 shadow-lg border-l-4 border-mint-darker transition-smooth hover:shadow-xl hover:scale-105 hover:bg-white/80 animate-fade-in"
                    style={{ animationDelay: "0.1s" }}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mint-accent to-mint-medium flex items-center justify-center flex-shrink-0 shadow-md shadow-mint-dark/20">
                            <AlertCircle className="w-7 h-7 text-mint-dark" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-soft-black mb-2 text-lg">Recommendation</h3>
                            <p className="text-deep-grey/80 leading-relaxed">{result.suggestion}</p>
                        </div>
                    </div>
                </div>
            </div>

            {result.details && (
                <div
                    className="glass rounded-2xl p-8 shadow-lg border border-mint-accent/50 transition-smooth hover:shadow-xl hover:bg-white/70 animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                >
                    <h3 className="font-semibold text-soft-black mb-6 flex items-center gap-2 text-lg">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint-light to-mint-medium flex items-center justify-center shadow-sm shadow-mint-dark/10">
                            <TrendingUp className="w-5 h-5 text-mint-dark" />
                        </div>
                        Analysis Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-mint-light/50 to-mint-accent/40 rounded-xl p-6 border border-mint-accent/60 transition-smooth hover:shadow-md hover:scale-105 hover:border-mint-dark/50">
                            <p className="text-sm text-deep-grey/60 mb-2 font-medium">Transactions Analyzed</p>
                            <p className="text-3xl font-bold text-mint-dark">
                                {result.details.transactionsAnalyzed.toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-mint-medium/40 to-mint-dark/30 rounded-xl p-6 border border-mint-dark/40 transition-smooth hover:shadow-md hover:scale-105 hover:border-mint-darker/60">
                            <p className="text-sm text-deep-grey/60 mb-2 font-medium">Suspicious Count</p>
                            <p className="text-3xl font-bold text-mint-dark">{result.details.suspiciousCount}</p>
                        </div>

                        <div
                            className={`rounded-xl p-6 border-2 transition-smooth hover:shadow-md hover:scale-105 ${getRiskColor(result.details.riskLevel)}`}
                        >
                            <p className="text-sm font-medium mb-2">Risk Level</p>
                            <p className="text-3xl font-bold">{result.details.riskLevel}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <button
                    onClick={onStartNewAnalysis}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-mint-light to-mint-medium text-mint-dark font-semibold transition-smooth hover:shadow-lg hover:shadow-mint-dark/30 hover:scale-105 active:scale-95 border border-mint-accent/50"
                >
                    <span>Start New Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
