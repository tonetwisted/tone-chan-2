"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LORE_BLOCKS } from "@/lib/content";

export default function LorePreview() {
  const blocks = LORE_BLOCKS.slice(0, 2);

  return (
    <section className="py-24 bg-tc-black relative overflow-hidden">
      {/* Purple side glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "#7B2FBE" }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "#FF006E" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="font-pixel text-[8px] text-tc-cyan/60 tracking-widest mb-3">UNIVERSE</p>
          <h2 className="font-pixel text-xl sm:text-2xl text-tc-cream">THE WORLD OF TONE CHAN</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blocks.map((block, i) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 rounded-xl border border-tc-purple/20 bg-gradient-to-br from-tc-violet/10 to-transparent hover:border-tc-purple/40 transition-all duration-300"
            >
              <span className="font-pixel text-[7px] text-tc-pink/60 tracking-[4px] block mb-3">
                {block.tag}
              </span>
              <h3 className="font-pixel text-sm text-tc-cream mb-4 leading-tight">{block.title}</h3>
              <p className="text-tc-cream/60 leading-relaxed text-sm">{block.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-pixel text-[9px] text-tc-cyan/70 hover:text-tc-cyan tracking-widest transition-colors duration-200"
          >
            READ FULL LORE →
          </Link>
        </div>
      </div>
    </section>
  );
}
