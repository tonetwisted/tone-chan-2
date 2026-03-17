"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PlayPreviewSection() {
  return (
    <section className="py-24 bg-tc-black relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #7B2FBE, transparent)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-3">PLAY NOW</p>
              <h2 className="font-pixel text-xl sm:text-2xl text-tc-cream mb-6 leading-tight">
                THE DEMO IS LIVE.<br />
                <span className="text-tc-pink">NO DOWNLOAD</span> REQUIRED.
              </h2>
              <p className="text-tc-cream/50 text-base leading-relaxed mb-8 max-w-lg">
                Load the demo in seconds. Play right in your browser inside a custom Game Boy shell.
                Experience the first chapter of Tone Chan's Adventures — completely free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/play"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-pixel text-xs text-white shadow-glow-pink transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #FF006E, #7B2FBE)" }}
                >
                  ▶ OPEN GAME
                </Link>
                <div className="flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2 text-tc-cream/40 text-xs">
                    <span className="w-2 h-2 rounded-full bg-tc-cyan shadow-glow-cyan" />
                    Works on Chrome, Firefox, Safari, Edge
                  </div>
                  <div className="flex items-center gap-2 text-tc-cream/40 text-xs">
                    <span className="w-2 h-2 rounded-full bg-tc-pink shadow-glow-pink" />
                    Mobile on-screen controls included
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual side — Game Boy preview mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex justify-center"
          >
            <div className="animate-float">
              {/* Simplified GBA mockup */}
              <div
                className="relative w-64 h-44 rounded-[20px] border border-tc-purple/30 shadow-2xl"
                style={{ background: "linear-gradient(160deg, #1a0533, #050508)" }}
              >
                {/* Screen */}
                <div className="absolute inset-x-8 inset-y-6 rounded bg-[#0d1a0a] shadow-screen overflow-hidden">
                  {/* Pixel art placeholder scene */}
                  <div className="w-full h-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(180deg, #0a1a2e 0%, #0d2a1a 50%, #1a0d2e 100%)",
                    }}
                  >
                    <div className="text-center">
                      <div className="font-pixel text-[5px] text-tc-pink mb-1">TONE CHAN</div>
                      <div className="font-pixel text-[4px] text-tc-cyan/60">ADVENTURES</div>
                    </div>
                  </div>
                  {/* Scanline */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                    }}
                  />
                </div>
                {/* Glow */}
                <div
                  className="absolute -inset-1 rounded-[22px] opacity-20 blur-lg pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #FF006E, #7B2FBE)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
