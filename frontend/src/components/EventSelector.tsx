/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check } from "lucide-react";
import { EVENT_TYPES, getEventTitle } from "@/lib/event-types";

interface EventSelectorProps {
  selectedEvent: string;
  onEventChange: (event: string) => void;
}

// Update the events array to use the mapping
const EVENTS = [
  {
    id: "event1",
    label: EVENT_TYPES.event1,
    description: "Forecast the financial ripple before it hits.",
    src: "/Images/Event-1.jpg",
  },
  {
    id: "event2",
    label: EVENT_TYPES.event2,
    description: "Expose trust fractures before they spread.",
    src: "/Images/Event-2.jpg",
  },
  {
    id: "event3",
    label: EVENT_TYPES.event3,
    description: "Detect silent shifts in your ecosystem early.",
    src: "/Images/Event-3.jpg",
  },
];

export default function EventSelector({
  selectedEvent,
  onEventChange,
}: EventSelectorProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <label className="block text-sm font-semibold text-[#1E1E1E] mb-4">
        Select Event
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {EVENTS.map((event, index) => {
          const isSelected = selectedEvent === event.id;

          return (
            <div
              key={event.id}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onEventChange(event.id)}
              className={cn(
                "relative h-60 rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer backdrop-blur-sm group",
                isSelected
                  ? "border-[#39D98A] shadow-[0_0_25px_rgba(57,217,138,0.6)] scale-[1.03]"
                  : "border-[#39D98A]/20 hover:border-[#39D98A]/40 hover:scale-[1.02]"
              )}
            >
              {/* ✅ Green glow ring for selected */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl border-2 border-[#39D98A] pointer-events-none animate-pulse"></div>
              )}

              {/* ✅ Tick Icon on top-right corner */}
              {isSelected && (
                <div className="absolute z-20 top-3 right-3 bg-[#39D98A] text-white p-1.5 rounded-full shadow-md">
                  <Check size={16} strokeWidth={3} />
                </div>
              )}

              {/* Background Image */}
              <Image
                src={event.src}
                alt={event.label}
                width={560}
                height={5}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out",
                  hovered === index
                    ? "opacity-0 scale-105"
                    : "opacity-100 scale-100"
                )}
              />

              {/* Initial Info Box */}
              <div
                className={cn(
                  "absolute bottom-3 left-3 right-3 rounded-xl backdrop-blur-sm border border-white/30 p-4 shadow-sm transition-all duration-500",
                  hovered === index ? "opacity-0 translate-y-2" : "opacity-100"
                )}
              >
                <p className="text-sm font-semibold text-gray-900 h-8">
                  {event.label}
                </p>
              </div>

              {/* Hover Overlay */}
              <div
                className={cn(
                  "absolute inset-0 p-5 flex flex-col justify-center text-left transition-all duration-500 ease-out",
                  "bg-gradient-to-br from-[#39D98A]/40 via-[#E6F4F1]/80 to-white/80",
                  hovered === index ? "opacity-100" : "opacity-0"
                )}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.label}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}