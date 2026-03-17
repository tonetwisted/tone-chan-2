import type { Metadata } from "next";
import { LORE_BLOCKS, CHARACTERS, GAME_META } from "@/lib/content";

export const metadata: Metadata = {
  title: "About / Lore — Tone Chan's Adventures",
  description:
    "Discover the world of Tone Chan's Adventures — characters, story, and the universe behind the game.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-tc-black pt-24 pb-16">
      {/* Hero banner */}
      <div className="relative overflow-hidden py-16 mb-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(123,47,190,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,190,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tc-violet/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-3">UNIVERSE</p>
          <h1 className="font-pixel text-2xl sm:text-4xl text-tc-cream mb-4">THE LORE</h1>
          <p className="text-tc-cream/50 text-base max-w-2xl mx-auto leading-relaxed">
            {GAME_META.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Lore blocks */}
        <div className="space-y-16 mb-24">
          {LORE_BLOCKS.map((block, i) => (
            <div
              key={block.id}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-center`}
            >
              {/* Text */}
              <div className="flex-1">
                <span className="font-pixel text-[7px] text-tc-pink/60 tracking-[4px] block mb-3">{block.tag}</span>
                <h2 className="font-pixel text-sm sm:text-base text-tc-cream mb-5 leading-tight">{block.title}</h2>
                <p className="text-tc-cream/60 leading-relaxed text-base">{block.body}</p>
              </div>

              {/* Image placeholder */}
              <div className="flex-1 w-full max-w-sm">
                <div
                  className="relative aspect-video rounded-xl overflow-hidden border border-tc-purple/20"
                  style={{ background: "linear-gradient(135deg, #1a0533, #0d0a1a)" }}
                >
                  {/* Pixel art placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-pixel text-[7px] text-tc-purple/40">{block.title.toUpperCase()}</span>
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 6px)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Characters */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="font-pixel text-[8px] text-tc-cyan/60 tracking-widest mb-2">ROSTER</p>
            <h2 className="font-pixel text-xl text-tc-cream">CHARACTERS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CHARACTERS.map((char) => (
              <div
                key={char.id}
                className="p-6 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-300 text-center"
              >
                {/* Avatar placeholder */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl border-2"
                  style={{
                    borderColor: char.color,
                    background: `${char.color}18`,
                    boxShadow: `0 0 20px ${char.color}30`,
                  }}
                >
                  {char.name.charAt(0)}
                </div>
                <span
                  className="font-pixel text-[7px] tracking-widest block mb-1"
                  style={{ color: char.color }}
                >
                  {char.role.toUpperCase()}
                </span>
                <h3 className="font-pixel text-[10px] text-tc-cream mb-3">{char.name}</h3>
                <p className="text-tc-cream/50 text-sm leading-relaxed">{char.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Game specs */}
        <div className="border-t border-white/5 pt-12">
          <h2 className="font-pixel text-sm text-tc-cream mb-6 text-center">GAME INFO</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Developer",    value: GAME_META.developer },
              { label: "Platform",     value: GAME_META.platform },
              { label: "Genre",        value: GAME_META.genre.join(" · ") },
              { label: "Rating",       value: GAME_META.rating },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-lg bg-white/3 border border-white/5">
                <p className="font-pixel text-[6px] text-tc-cyan/40 tracking-widest mb-1">{label.toUpperCase()}</p>
                <p className="text-tc-cream/80 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
