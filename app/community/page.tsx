import type { Metadata } from "next";
import EmailCapture from "@/components/ui/EmailCapture";
import { SOCIAL_LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Community — Tone Chan's Adventures",
  description:
    "Join the Tone Chan community. Get early access drops, exclusive skins, original music, and merch collabs.",
};

const PERKS = [
  { icon: "🎮", title: "Early Game Access",     desc: "Play new chapters before anyone else." },
  { icon: "🃏", title: "Exclusive Skins",        desc: "Limited-edition console skins for top fans." },
  { icon: "🎵", title: "Unreleased Tracks",      desc: "Original music before it drops anywhere." },
  { icon: "👕", title: "Merch Collabs",          desc: "Early access to streetwear drops and collabs." },
  { icon: "🗺️", title: "Dev Previews",           desc: "Behind-the-scenes looks at upcoming content." },
  { icon: "🌐", title: "Discord Access",         desc: "Direct channel with the Tone Chan team." },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-tc-black pt-24 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16">
        <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-3">JOIN US</p>
        <h1 className="font-pixel text-2xl sm:text-3xl text-tc-cream mb-4">TONE CHAN CREW</h1>
        <p className="text-tc-cream/50 text-base max-w-md mx-auto leading-relaxed">
          The Tone Chan Crew is the community powering the universe. Early adopters get the most exclusive access to everything we build.
        </p>
      </div>

      {/* Perks grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="p-5 rounded-xl border border-white/5 bg-white/2 hover:border-tc-purple/20 transition-all duration-300"
            >
              <div className="text-2xl mb-3">{perk.icon}</div>
              <h3 className="font-pixel text-[10px] text-tc-cream mb-2 tracking-wider">{perk.title}</h3>
              <p className="text-tc-cream/50 text-sm leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email capture */}
      <div className="max-w-md mx-auto px-4 sm:px-6 mb-16">
        <div className="p-8 rounded-2xl border border-tc-purple/20 bg-gradient-to-b from-tc-violet/10 to-transparent">
          <EmailCapture
            source="community-page"
            title="GET EARLY ACCESS"
            subtitle="Drop your email and become a founding member of the Tone Chan Crew."
            ctaLabel="JOIN CREW"
          />
        </div>
      </div>

      {/* Social links */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-pixel text-[8px] text-tc-cyan/50 tracking-widest mb-6">FIND US EVERYWHERE</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/8 hover:border-tc-purple/30 bg-white/3 hover:bg-white/5 text-tc-cream/60 hover:text-tc-cream transition-all duration-200 text-sm"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
