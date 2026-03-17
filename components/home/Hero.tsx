"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GAME_META } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tc-black">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,47,190,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,190,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF006E 0%, #7B2FBE 40%, transparent 70%)" }}
        />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-24">
        {/* Genre badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-tc-pink/10 border border-tc-pink/30 font-pixel text-[8px] text-tc-pink tracking-widest">
            GBA • PIXEL ART • ANIME
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-pixel text-3xl sm:text-5xl md:text-6xl leading-tight mb-4"
          style={{
            background: "linear-gradient(135deg, #FF006E 0%, #7B2FBE 50%, #4CC9F0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 24px rgba(255,0,110,0.4))",
          }}
        >
          TONE CHAN
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-pixel text-lg sm:text-2xl text-tc-cream/80 mb-6 tracking-wider"
        >
          ADVENTURES
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-tc-cream/60 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {GAME_META.description}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/play"
            className="group flex items-center gap-3 px-8 py-4 rounded-lg font-pixel text-xs text-white tracking-wider transition-all duration-300 hover:scale-105 shadow-glow-pink"
            style={{ background: "linear-gradient(135deg, #FF006E, #7B2FBE)" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            PLAY FREE DEMO
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 px-8 py-4 rounded-lg font-pixel text-xs text-tc-cream/70 border border-white/10 hover:border-tc-purple/50 hover:text-tc-cream hover:bg-white/5 transition-all duration-300"
          >
            EXPLORE LORE →
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-white/5"
        >
          {[
            { label: "PLATFORM", value: "Game Boy Advance" },
            { label: "GENRE",    value: "Action · Adventure" },
            { label: "DEMO",     value: "Free to Play" },
            { label: "TYPE",     value: "Indie · Pixel Art" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-pixel text-[7px] text-tc-cyan/40 tracking-widest mb-1">{label}</p>
              <p className="text-tc-cream/70 text-sm">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tc-black to-transparent pointer-events-none" />
    </section>
  );
}
