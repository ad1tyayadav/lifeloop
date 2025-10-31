"use client"

interface EventSelectorProps {
    selectedEvent: string
    onEventChange: (event: string) => void
}

const EVENTS = [
    { id: "event1", label: "Market Crash", description: "Analyze during volatility" },
    { id: "event2", label: "Fraud Detection", description: "Identify suspicious patterns" },
    { id: "event3", label: "Anomaly Detection", description: "Find unusual transactions" },
]

export default function EventSelector({ selectedEvent, onEventChange }: EventSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#1E1E1E] mb-4">Select Event</label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EVENTS.map((event, index) => (
                    <button
                        key={event.id}
                        onClick={() => onEventChange(event.id)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className={`p-4 rounded-xl border-2 transition-smooth active:scale-95 animate-fade-in ${selectedEvent === event.id
                                ? "border-[#39D98A] bg-gradient-to-br from-[#39D98A]/10 to-[#39D98A]/5 shadow-lg shadow-[#39D98A]/20 electric-glow"
                                : "border-[#39D98A]/20 hover:border-[#39D98A]/60 hover:bg-[#39D98A]/5 hover:shadow-md"
                            }`}
                    >
                        <p className="font-semibold text-[#1E1E1E] text-sm">{event.label}</p>
                        <p className="text-xs text-[#5A5A5A] mt-2">{event.description}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}