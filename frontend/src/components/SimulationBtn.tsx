"use client"

import { CircleCheck, Loader2 } from "lucide-react"

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
      className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
        disabled || isLoading
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-[#39D98A] text-white hover:bg-[#34d399] active:scale-95"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Running Simulation...</span>
        </>
      ) : (
        <>
          <CircleCheck className="w-5 h-5" />
          <span>Run Simulation</span>
        </>
      )}
    </button>
  )
}