import type { Metadata } from "next";
import Link from "next/link";
import { GAME_META, SOCIAL_LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Press kit for Tone Chan's Adventures — assets, screenshots, and contact information for media and collaborators.",
};

const PRESS_ASSETS = [
  { label: "Logo (PNG, transparent)", href: "#" },
  { label: "Key Art (1920×1080)", href: "#" },
  { label: "Screenshots Pack (ZIP)", href: "#" },
  { label: "Fact Sheet (PDF)", href: "#" },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-tc-black text-tc-cream pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16">
          <span className="font-pixel text-[8px] text-tc-pink tracking-widest block mb-4">PRESS KIT</span>
          <h1 className="font-pixel text-3xl sm:text-4xl text-tc-cream mb-4">TONE CHAN&apos;S ADVENTURES</h1>
          <p className="text-tc-cream/60 text-lg max-w-2xl">
            Resources for media, content creators, and collaborators. All assets are free to use for coverage of Tone Chan&apos;s Adventures.
          </p>
        </div>

        {/* Fact Sheet */}
        <section className="mb-16 p-6 border border-tc-purple/20 rounded-xl bg-white/2">
          <h2 className="font-pixel text-[11px] text-tc-cyan tracking-widest mb-6">FACT SHEET</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { term: "Developer", def: "Tone Chan Studios" },
              { term: "Genre", def: GAME_META.genre.join(" · ") },
              { term: "Platform", def: GAME_META.platform },
              { term: "Release", def: GAME_META.releaseYear ? String(GAME_META.releaseYear) : "TBA" },
              { term: "Price", def: "Free Demo — Full Version TBA" },
              { term: "Website", def: "tonechanadventures.com" },
            ].map(({ term, def }) => (
              <div key={term} className="flex flex-col gap-0.5">
                <dt className="font-pixel text-[8px] text-tc-cream/40 tracking-widest">{term.toUpperCase()}</dt>
                <dd className="text-tc-cream/80 text-sm">{def}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Description */}
        <section className="mb-16">
          <h2 className="font-pixel text-[11px] text-tc-cyan tracking-widest mb-4">ABOUT THE GAME</h2>
          <p className="text-tc-cream/70 leading-relaxed mb-4">{GAME_META.description}</p>
          <p className="text-tc-cream/60 leading-relaxed text-sm">
            Inspired by the golden era of Game Boy Advance titles, Tone Chan&apos;s Adventures blends retro pixel art aesthetics with modern anime-inspired storytelling, original music production, and streetwear culture. The game stars Tone Chan — a music-powered hero navigating a neon world of beats, battles, and identity.
          </p>
        </section>

        {/* Assets */}
        <section className="mb-16">
          <h2 className="font-pixel text-[11px] text-tc-cyan tracking-widest mb-6">PRESS ASSETS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRESS_ASSETS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-between p-4 border border-tc-purple/20 rounded-lg bg-white/2 hover:border-tc-pink/40 hover:bg-tc-pink/5 transition-all duration-200 group"
              >
                <span className="text-tc-cream/70 text-sm group-hover:text-tc-cream transition-colors">{label}</span>
                <span className="font-pixel text-[8px] text-tc-pink tracking-widest">↓ DL</span>
              </a>
            ))}
          </div>
          <p className="text-tc-cream/30 text-xs mt-4">Assets available upon launch. Contact us to request advance materials.</p>
        </section>

        {/* Contact */}
        <section className="mb-16 p-6 border border-tc-purple/20 rounded-xl bg-white/2">
          <h2 className="font-pixel text-[11px] text-tc-cyan tracking-widest mb-4">PRESS CONTACT</h2>
          <p className="text-tc-cream/60 text-sm mb-4">
            For review codes, interviews, and media inquiries:
          </p>
          <a
            href="mailto:press@tonechanadventures.com"
            className="font-pixel text-[9px] text-tc-pink tracking-wider hover:text-tc-pink/70 transition-colors"
          >
            press@tonechanadventures.com
          </a>
          <div className="flex gap-4 mt-6">
            {SOCIAL_LINKS.slice(0, 3).map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tc-cream/40 text-sm hover:text-tc-cream/80 transition-colors capitalize"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </section>

        <Link href="/" className="font-pixel text-[8px] text-tc-cream/30 hover:text-tc-cream/60 tracking-widest transition-colors">
          ← BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
