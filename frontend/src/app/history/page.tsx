/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useApp } from "@/contexts/AppContext"
import { Download, Eye, Calendar, FileText, Search, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { simulationAPI } from "@/lib/api-client"
import SimulationDetailsModal from "@/components/DetailModal"
import { getEventTitle } from "@/lib/event-types";

export default function HistoryPage() {
  const { state, getHistory } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedSimulation, setSelectedSimulation] = useState<any>(null) // Add this state
  const [isModalOpen, setIsModalOpen] = useState(false) // Add this state

  // Fetch real history when component loads
  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)
    try {
      await getHistory()
    } catch (error) {
      console.error("Failed to load history:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRiskLevel = (impact: any) => {
    if (!impact) return "Unknown";

    const maxImpact = Math.max(
      impact.revenueDrop || 0,
      impact.workloadIncrease || 0,
      impact.trustDecline || 0
    );

    if (maxImpact > 10) return "Critical Zone";
    if (maxImpact > 3) return "Caution Layer";
    if (maxImpact > 0) return "Stable Zone";
    return "Stable Zone";
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical Zone': return 'text-[#FF5252] bg-[#FF5252]/10 border-[#FF5252]/20';
      case 'Caution Layer': return 'text-[#FFB74D] bg-[#FFB74D]/10 border-[#FFB74D]/20';
      case 'Stable Zone': return 'text-[#39D98A] bg-[#39D98A]/10 border-[#39D98A]/20';
      default: return 'text-[#5A5A5A] bg-[#5A5A5A]/10 border-[#5A5A5A]/20';
    }
  };

  // Filter history based on search term
  const filteredHistory = state.history.filter(simulation => {
    if (!simulation) return false;
    const eventType = simulation.eventType?.toLowerCase() || '';
    const fileName = simulation.fileName?.toLowerCase() || '';
    const question = simulation.question?.toLowerCase() || '';

    return (
      eventType.includes(searchTerm.toLowerCase()) ||
      fileName.includes(searchTerm.toLowerCase()) ||
      question.includes(searchTerm.toLowerCase())
    );
  });

  // Action handlers
  const handleDownload = async (simulationId: string) => {
    try {
      const blob = await simulationAPI.downloadReport(simulationId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `simulation-report-${simulationId}.zip`;

      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log('Download initiated for simulation:', simulationId);
    } catch (error) {
      console.error('Failed to download simulation:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  // Updated: Open modal instead of alert
  const handleViewDetails = (simulation: any) => {
    setSelectedSimulation(simulation);
    setIsModalOpen(true);
  };

  // Updated: Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSimulation(null);
  };

  return (
    <div id="history" className="bg-gradient-to-b from-[#ECFFF9] via-white to-[#E9F6FF]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1E1E1E] mb-2">
                ARCHIVE LOOP
              </h1>
              <p className="text-[#5A5A5A]">
                Replay your data’s story. Each simulation, a step in your system’s evolution.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* Refresh Button */}
              <button
                onClick={loadHistory}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#39D98A]/20 bg-white/50 hover:bg-[#39D98A]/10 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Loading..." : "Refresh"}
              </button>

              {/* Search Bar */}
              <div className="relative">
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
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <RefreshCw className="w-8 h-8 text-[#39D98A] animate-spin mb-4" />
              <p className="text-[#5A5A5A]">Loading simulation history...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && state.history.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FileText className="w-16 h-16 text-[#39D98A]/40 mb-4" />
              <p className="text-[#5A5A5A] text-lg mb-2">No simulation history yet</p>
              <p className="text-[#5A5A5A]/60 text-sm max-w-sm">
                Run your first analysis to see it appear here.
              </p>
            </div>
          )}

          {/* No Results State */}
          {!loading && state.history.length > 0 && filteredHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="w-16 h-16 text-[#39D98A]/40 mb-4" />
              <p className="text-[#5A5A5A] text-lg mb-2">No matching simulations found</p>
              <p className="text-[#5A5A5A]/60 text-sm max-w-sm">
                Try adjusting your search terms.
              </p>
            </div>
          )}

          {/* History List */}
          {!loading && filteredHistory.length > 0 && (
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
                          {getEventTitle(simulation.eventType)}
                        </h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(getRiskLevel(simulation.result?.impact))}`}
                        >
                          {getRiskLevel(simulation.result?.impact)}
                        </span>
                      </div>

                      <p className="text-[#5A5A5A] mb-3">{simulation.question}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#5A5A5A]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(simulation.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{simulation.fileName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleDownload(simulation.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#39D98A] text-white hover:bg-[#34d399] transition-colors hover:shadow-md active:scale-95 group"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Export</span>
                      </button>
                      <button
                        onClick={() => handleViewDetails(simulation)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007AFF] text-white hover:bg-[#0066CC] transition-colors hover:shadow-md active:scale-95 group"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Details</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    LIFELOOP retains a 30-day memory cycle for adaptive re-learning.
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          <SimulationDetailsModal
            simulation={selectedSimulation}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onDownload={handleDownload}
          />
        </div>
      </main>
    </div>
  );

}