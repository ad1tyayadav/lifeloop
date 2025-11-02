"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const blocks = [
  {
    title: "Predict with Precision",
    desc: "We turn uncertainty into foresight — transforming raw data into actionable clarity that drives confident decisions.",
  },
  {
    title: "Design with Integrity",
    desc: "Every model, every metric, every insight is transparent and trustworthy — built to empower, not obscure.",
  },
  {
    title: "Evolve with Insight",
    desc: "Adaptation is our core principle — learning continuously to stay ahead of risk, change, and complexity.",
  },
];

export default function GlassBlocks() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="
              relative rounded-3xl p-8
              bg-white/40 
              backdrop-blur-2xl 
              border border-white/30 
              shadow-[0_8px_40px_rgba(0,0,0,0.05)]
              hover:shadow-[0_8px_50px_rgba(57,217,138,0.2)]
              hover:border-[#39D98A]/40
              transition-all duration-500 ease-out
            "
          >
            {/* soft inner glow for glass depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-[#bff5cf]/30 rounded-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {block.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {block.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* soft blur overlays for subtle realism */}
      <div className="absolute -top-32 -left-20 w-80 h-80 bg-[#bff5cf]/40 blur-3xl rounded-full opacity-70" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/50 blur-3xl rounded-full opacity-60" />
    </section>
  );
}
