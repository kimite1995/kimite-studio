"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "@/data/site";

export function Hero() {
  const scrollToWorks = () => {
    const el = document.getElementById("works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Cinematic Background Gradient + Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#222228_0.8px,transparent_1px)] bg-[length:5px_5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0A0A0F] to-[#0A0A0F]" />

      {/* Decorative cinematic elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[900px] h-[900px] border border-[#222228] rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-[#222228] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#33333A] text-xs tracking-[3px] text-[#A1A1AA] font-mono">
          AI CINEMATIC DIRECTOR
        </div>

        <h1 className="font-display text-[64px] md:text-[88px] leading-[1.05] tracking-[-1.5px] md:tracking-[-2px] font-semibold mb-8">
          {site.hero.headline.split("\n").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>

        <p className="max-w-xl mx-auto text-xl md:text-2xl text-[#A1A1AA] tracking-[-0.2px] leading-relaxed mb-10 whitespace-pre-line">
          {site.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={scrollToWorks} className="btn btn-primary text-base">
            {site.hero.ctaPrimary}
          </button>
          <button onClick={scrollToServices} className="btn btn-secondary text-base">
            {site.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#71717A] flex flex-col items-center gap-1 text-xs tracking-widest"
      >
        SCROLL
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
