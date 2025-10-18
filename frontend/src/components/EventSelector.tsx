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
            <label className="block text-sm font-semibold text-soft-black mb-4">Select Event</label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EVENTS.map((event, index) => (
                    <button
                        key={event.id}
                        onClick={() => onEventChange(event.id)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className={`p-4 rounded-xl border-2 transition-smooth active:scale-95 animate-fade-in ${selectedEvent === event.id
                                ? "border-mint-dark bg-gradient-to-br from-mint-light to-mint-accent shadow-lg shadow-mint-dark/20 mint-glow"
                                : "border-mint-accent/40 hover:border-mint-dark/60 hover:bg-mint-light/20 hover:shadow-md"
                            }`}
                    >
                        <p className="font-semibold text-soft-black text-sm">{event.label}</p>
                        <p className="text-xs text-deep-grey/60 mt-2">{event.description}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}
