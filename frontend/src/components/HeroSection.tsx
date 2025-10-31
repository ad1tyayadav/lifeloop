import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 🌈 Top Gradient Section */}
      <div className="relative h-[78vh] bg-gradient-to-b from-[#f1f2f4] via-[#edf2ef] to-[#bff5cf]">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center relative">
          {/* PNG Overlapping Title */}
          <Image
            src="/Images/PPL.png"
            alt="loop icon"
            className="absolute left-1/2 -translate-x-1/2 -top-32 sm:-top-40 md:-top-48 lg:-top-90 z-12 w-3/4 sm:w-2/3 md:w-1/2 lg:w-[100vw]"
            width={5000}
            height={950}
          />

          {/* Building Image */}
          <Image
            src="/images/Building.png"
            alt="building"
            className="absolute left-1/2 -translate-x-1/2 -top-80 sm:-top-28 md:-top-58 z-10 lg:w-[100vw] lg:h-[106vh] max-w-none"
            width={5000}
            height={950}
          />

          {/* Chart Image */}
          <Image
            src="/images/Chart.png"
            alt="chart"
            className="absolute left-1/2 opacity-60 -translate-x-1/2 -top-10 sm:-top-16 md:-top-24 lg:-top-18 z-10 w-3/4 sm:w-2/3 md:w-1/2 lg:w-[50vw]"
            width={5000}
            height={950}
          />
        </div>

        {/* Title */}
        <h1
          className="relative text-5xl md:text-[20vh] -top-48 font-bold text-white leading-tight text-center mx-auto"
        // style={{
        //     textShadow:
        //         "0 4px 10px rgba(0,0,0,0.3), 0 0 15px rgba(0,0,0,0.15)",
        // }}
        >
          SIMULATION AS STRATEGY
        </h1>

      </div>

      {/* ⚪ White Section with Arch Curve on TOP */}
      <div className="relative z-12 bg-white w-full px-8 pt-28 pb-20 text-center">
        {/* ARCH Curve on Top */}
        <div className="absolute -top-[18vh] left-0 right-0 overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1440 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              fill="white"
              d="M0,140 C360,40 1080,40 1440,140 L1440,200 L0,200 Z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="w-full relative -top-16 z-10">
          <p className="text-lg md:text-2xl font-bold text-gray-600 max-w-3xl mx-auto mb-8">
            LIFELOOP empowers MSPs & IT teams to foresee the impact of tomorrow’s
            disruptions — before they strike.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                const section = document.getElementById("simulation-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition">
              Get Started
            </button>
            <button className="border border-gray-400 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Watch Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
