"use client"

import { Loader2 } from "lucide-react"

interface SimulationButtonProps {
  isLoading: boolean
  onClick: () => void
  disabled: boolean
}

export default function SimulationButton({ isLoading, onClick, disabled }: SimulationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-4 rounded-xl font-semibold transition-smooth flex items-center justify-center gap-2 text-lg ${disabled || isLoading
          ? "bg-mint-light/40 text-mint-darker/50 cursor-not-allowed"
          : "bg-gradient-to-r from-mint-medium to-mint-dark text-white hover:shadow-lg hover:shadow-mint-dark/40 hover:scale-105 active:scale-95 mint-glow"
        }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Running Simulation...</span>
        </>
      ) : (
        <>
          <span>▶</span>
          <span>Run Simulation</span>
        </>
      )}
    </button>
  )
}
