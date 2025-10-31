/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gradient-to-br from-white to-[#39D98A]/10 overflow-hidden h-96 w-full transition-all duration-300 ease-out border border-[#39D98A]/10",
      )}
    >
      {/* Image - always visible but hidden on hover */}
      <img
        src={card.src}
        alt={card.title}
        className={cn(
          "object-cover absolute inset-0 w-full h-full transition-all duration-300",
          hovered === index ? "opacity-0 scale-110" : "opacity-100 scale-100"
        )}
      />

      {/* Always visible title box with glass effect and arrow */}
      <div className={cn(
        "absolute bottom-2 h-24 left-2 right-2 bg-white/50 backdrop-blur-md rounded-xl border-t border-white/30 p-4 transition-all duration-300 group",
        hovered === index ? "opacity-0" : "opacity-100"
      )}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="text-l font-semibold text-gray-800 mb-1">
              {card.title}
            </div>
            <div className="text-gray-600 text-sm">
              {card.tagline}
            </div>
          </div>
          {/* Tilt Arrow Icon */}
          <div className="transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500 group-hover:text-[#39D98A] transition-colors duration-300"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover content - only visible on hover */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-center items-center p-6 text-center transition-all duration-300 overflow-y-auto",
          "bg-gradient-to-tr from-[#85e0a5] via-[#95e0b0] to-white/70",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Feature Number Badge - Updated for better contrast */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/70 shadow-sm">
            <span className="text-black/80 font-bold text-lg">{card.featNo}</span>
          </div>
        </div>

        <div className="text-xl text-left font-bold text-gray-800 mb-4 mt-4">
          {card.title}
        </div>
        <p className="text-gray-700 text-left text-sm leading-relaxed mb-4">
          {card.description}
        </p>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  featNo: number;
  title: string;
  tagline: string;
  description: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 w-full mt-8 mb-8">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}