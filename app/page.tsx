import type { Metadata } from "next";
import EmulatorClientWrapper from "@/components/emulator/EmulatorClientWrapper";
import { GAME_META, SOCIAL_LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tone Chan Adventures — Play Free in Browser",
  description: GAME_META.description,
};

const ICON_SVG: Record<string, string> = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  spotify: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
};

const CONTROLS = [
  { label: "D-PAD", desc: "Move", color: "hsl(271,81%,56%)" },
  { label: "B", desc: "Attack", color: "hsl(0,72%,51%)" },
  { label: "A", desc: "Jump", color: "hsl(200,98%,60%)" },
  { label: "START", desc: "Pause", color: "hsl(47,96%,53%)" },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        color: "hsl(210,40%,98%)",
        position: "relative",
        overflowX: "hidden",
        /* Grid background */
        backgroundColor: "hsl(271,76%,15%)",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Deep dark overlay so grid reads on very dark bg */}
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(135deg, hsl(220,100%,4%) 0%, hsl(271,60%,8%) 50%, hsl(220,84%,6%) 100%)", zIndex: 0 }} />
      {/* Grid on top of overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px", zIndex: 1, pointerEvents: "none" }} />

      {/* Floating decorative diamonds */}
      <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { top: "8%",  left: "5%",  size: 14, color: "hsl(330,81%,60%)",  opacity: 0.18, rotate: 45 },
          { top: "15%", right: "7%", size: 10, color: "hsl(200,98%,60%)",  opacity: 0.15, rotate: 45 },
          { top: "42%", left: "3%",  size: 8,  color: "hsl(47,96%,53%)",   opacity: 0.12, rotate: 45 },
          { top: "60%", right: "4%", size: 12, color: "hsl(271,81%,56%)",  opacity: 0.15, rotate: 45 },
          { top: "78%", left: "8%",  size: 9,  color: "hsl(326,100%,74%)", opacity: 0.13, rotate: 45 },
          { top: "88%", right: "9%", size: 11, color: "hsl(191,100%,50%)", opacity: 0.14, rotate: 45 },
          { top: "30%", left: "92%", size: 7,  color: "hsl(330,81%,60%)",  opacity: 0.10, rotate: 45 },
          { top: "55%", left: "1%",  size: 6,  color: "hsl(200,98%,60%)",  opacity: 0.10, rotate: 45 },
        ].map((d, i) => (
          <div key={i} style={{
            position: "absolute",
            top: d.top,
            left: "left" in d ? d.left : undefined,
            right: "right" in d ? (d as { right: string }).right : undefined,
            width: d.size,
            height: d.size,
            border: `1.5px solid ${d.color}`,
            opacity: d.opacity,
            transform: `rotate(${d.rotate}deg)`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 860, margin: "0 auto", padding: "60px 20px 80px", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            background: "linear-gradient(135deg, hsl(330,81%,60%), hsl(271,81%,56%), hsl(200,98%,60%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
          }}>
            TONE CHAN
          </h1>
          <p style={{
            fontSize: "clamp(0.65rem, 2.5vw, 0.9rem)",
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "hsl(217.9,10.6%,64.9%)",
            textTransform: "uppercase",
          }}>
            Adventures
          </p>
        </div>

        {/* Console */}
        <div style={{
          width: "100%",
          maxWidth: 480,
          background: "hsl(220,84%,6%)",
          border: "1px solid hsl(215,27.9%,16.9%)",
          borderRadius: 20,
          padding: "8px 8px 16px",
          boxShadow: "0 0 40px hsla(271,81%,56%,0.15), 0 0 80px hsla(330,81%,60%,0.08)",
        }}>
          <EmulatorClientWrapper />
        </div>

        {/* Controls legend */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          marginTop: 24,
        }}>
          {CONTROLS.map(({ label, desc, color }) => (
            <div key={label} style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "hsl(220,84%,6%)",
              border: "1px solid hsl(215,27.9%,16.9%)",
              borderRadius: 8,
              padding: "6px 12px",
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.08em",
                color,
                background: `${color}18`,
                border: `1px solid ${color}44`,
                borderRadius: 4,
                padding: "2px 7px",
              }}>{label}</span>
              <span style={{ fontSize: 12, color: "hsl(217.9,10.6%,64.9%)" }}>{desc}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: "100%", maxWidth: 480, height: 1, background: "linear-gradient(90deg, transparent, hsl(215,27.9%,20%), transparent)", margin: "36px 0" }} />

        {/* Blurb */}
        <p style={{
          maxWidth: 520,
          textAlign: "center",
          fontSize: "clamp(0.88rem, 2.5vw, 1rem)",
          lineHeight: 1.75,
          color: "hsl(217.9,10.6%,64.9%)",
        }}>
          {GAME_META.description}
        </p>

        {/* Social links */}
        <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="social-icon"
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                background: "hsl(220,84%,6%)",
                border: "1px solid hsl(215,27.9%,16.9%)",
                transition: "box-shadow 0.2s, border-color 0.2s",
                textDecoration: "none",
              }}
            >
              <svg viewBox="0 0 24 24" width={20} height={20} style={{ fill: "hsl(217.9,10.6%,64.9%)" }}>
                <path d={ICON_SVG[s.platform] ?? ""} />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ marginTop: 48, fontSize: 11, letterSpacing: "0.2em", fontWeight: 600, color: "hsl(215,27.9%,30%)", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Tone Chan Studios
        </p>

      </div>
    </main>
  );
}
