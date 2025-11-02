"use client"

interface StepperProps {
  steps: Array<{ id: string; label: string; description: string }>
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8 w-full overflow-x-auto">
      <div className="flex items-center justify-start sm:justify-center min-w-max px-2 space-x-4 sm:space-x-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`relative w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 ${
                  index < currentStep
                    ? "bg-[#39D98A] text-white shadow-md"
                    : index === currentStep
                    ? "bg-white text-[#39D98A] border-2 border-[#39D98A] shadow-md"
                    : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <div className="mt-2 text-center w-20 sm:w-auto">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    index <= currentStep ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                <p className="hidden sm:block text-xs text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="w-8 sm:w-12 h-1 mx-2 sm:mx-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    index < currentStep ? "bg-[#39D98A] w-full" : "bg-transparent w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
