import Image from "next/image";
import React from "react";

export default function AboutUsSection() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* 🌈 Gradient Background Section */}
            <div className="relative bg-gradient-to-b from-white to-[#bff5cf] py-20">
                <div className="max-w-7xl mx-auto px-6 text-center relative">

                    {/* Content Container */}
                    <div className="relative z-10">
                        {/* Paragraph Section */}
                        <div className="mb-16 max-w-4xl mx-auto">
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                We are a forward-thinking company dedicated to innovation and excellence.
                                Our team of passionate professionals works tirelessly to deliver cutting-edge
                                solutions that transform industries and create lasting impact. With years of
                                experience and a commitment to quality, we strive to exceed expectations
                                and build meaningful relationships with our clients worldwide.
                            </p>
                        </div>

                        {/* Title with Overlay Image */}
                        <div className="relative">
                            {/* PNG Overlay Image */}
                            <Image
                                src="/Images/Talk.png"
                                alt="decoration"
                                className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-12 md:-top-24 z-20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-[40vw]"
                                width={800}
                                height={200}
                            />

                            {/* Giant Title */}
                            <h1 className="relative text-4xl sm:text-6xl md:text-8xl lg:text-[15rem] font-bold text-white leading-tight text-center mx-auto z-10">
                                ABOUT US
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}