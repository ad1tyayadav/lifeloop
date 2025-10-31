"use client"

interface StepperProps {
    steps: Array<{
        id: string
        label: string
        description: string
    }>
    currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        {/* Step Circle */}
                        <div className="flex flex-col items-center">
                            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base transition-all duration-300 ${
                                index < currentStep 
                                    ? "bg-[#39D98A] text-white shadow-md"
                                    : index === currentStep 
                                        ? "bg-white text-[#39D98A] border-2 border-[#39D98A] shadow-md"
                                        : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                            }`}>
                                {index < currentStep ? "✓" : index + 1}
                            </div>
                            {/* Step Labels */}
                            <div className="mt-2 text-center">
                                <p className={`text-sm font-medium transition-colors ${
                                    index <= currentStep ? "text-gray-900" : "text-gray-400"
                                }`}>
                                    {step.label}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                            </div>
                        </div>
                        
                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div className="w-12 h-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${
                                    index < currentStep ? "bg-[#39D98A] w-full" : "bg-transparent w-0"
                                }`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}