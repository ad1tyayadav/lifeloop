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
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                        {/* Step Circle */}
                        <div className="flex flex-col items-center flex-1">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-smooth ${index < currentStep
                                        ? "bg-mint-dark text-white shadow-lg shadow-mint-dark/30"
                                        : index === currentStep
                                            ? "bg-mint-light text-mint-dark border-2 border-mint-dark animate-pulse-mint"
                                            : "bg-muted text-muted-foreground border-2 border-border"
                                    }`}
                            >
                                {index < currentStep ? "✓" : index + 1}
                            </div>
                            <div className="mt-3 text-center">
                                <p
                                    className={`text-sm font-semibold transition-smooth ${index <= currentStep ? "text-mint-dark" : "text-muted-foreground"
                                        }`}
                                >
                                    {step.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                            </div>
                        </div>

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-1 mx-2 mb-8 bg-border rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-smooth ${index < currentStep ? "bg-mint-dark w-full" : "bg-transparent w-0"
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
