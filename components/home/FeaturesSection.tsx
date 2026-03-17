"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "🎮",
    title: "Play in Browser",
    desc: "Full GBA demo — no download, no install. Just click and play.",
    color: "#FF006E",
  },
  {
    icon: "🎵",
    title: "Original Soundtrack",
    desc: "Every track is a real Tone Chan production. The music IS the game.",
    color: "#4CC9F0",
  },
  {
    icon: "🌐",
    title: "5 Districts",
    desc: "Neo Akiba and beyond — five neon-drenched worlds to explore.",
    color: "#7B2FBE",
  },
  {
    icon: "👾",
    title: "Rhythm Bosses",
    desc: "Defeat corrupted DJs by mastering their beat patterns.",
    color: "#F7B731",
  },
  {
    icon: "🃏",
    title: "Collectible Drops",
    desc: "Mixtape NFTs and limited skins unlock as you progress.",
    color: "#FF006E",
  },
  {
    icon: "📱",
    title: "Mobile Controls",
    desc: "On-screen d-pad and buttons make it playable anywhere.",
    color: "#4CC9F0",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-tc-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tc-purple/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-3">FEATURES</p>
          <h2 className="font-pixel text-xl sm:text-2xl text-tc-cream">
            WHAT MAKES IT HIT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative p-6 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300"
            >
              <div
                className="text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-lg"
                style={{ background: `${f.color}18` }}
              >
                {f.icon}
              </div>
              <h3 className="font-pixel text-[11px] text-tc-cream mb-2 tracking-wider">{f.title}</h3>
              <p className="text-tc-cream/50 text-sm leading-relaxed">{f.desc}</p>

              {/* Hover glow dot */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: f.color, boxShadow: `0 0 8px ${f.color}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tc-purple/20 to-transparent" />
    </section>
  );
}
