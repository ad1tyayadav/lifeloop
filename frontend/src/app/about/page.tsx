"use client";

import Image from "next/image";
import React from "react";

export default function AboutUsSection() {
  return (
    <section id="about" className="relative w-full overflow-hidden">
      {/* 🌈 Gradient Background Section */}
      <div className="relative bg-gradient-to-b from-white to-[#bff5cf] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <p className="mb-20 text-gray-800 text-lg italic font-medium">
             Why LIFELOOP ?
            </p>
          {/* Content Container */}
          <div className="relative z-10">
            {/* Paragraph Section */}
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                LIFELOOP exists to make complexity simple and the uncertain — predictable.  
                We design predictive ecosystems where data, intuition, and foresight merge into strategy.  
                Our technology empowers decision-makers to visualize tomorrow, today —  
                translating AI intelligence into confidence and clarity.
              </p>
            </div>

            {/* Slight gap before ABOUT US */}
            <div className=" relative">
              {/* PNG Overlay Image */}
              <Image
                src="/Images/Talk.png"
                alt="team discussion"
                className="absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-24 md:-top-40 z-20 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw]"
                width={1000}
                height={400}
                priority
              />

              {/* Giant Title */}
              <h1 className="relative text-5xl sm:text-7xl md:text-9xl lg:text-[15rem] font-bold text-white leading-tight text-center mx-auto z-10">
                ABOUT&nbsp;US
              </h1>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
