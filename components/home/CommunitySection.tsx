"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/content";
import { isValidEmail } from "@/lib/utils";

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  twitter:   "#1DA1F2",
  tiktok:    "#FF0050",
  youtube:   "#FF0000",
  discord:   "#5865F2",
  spotify:   "#1DB954",
};

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "community-section" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're in! Welcome to the crew.");
        setEmail("");
      } else {
        throw new Error(data.message ?? "Something went wrong.");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error. Try again.");
    }
  };

  return (
    <section className="py-24 bg-tc-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tc-cyan/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-3">COMMUNITY</p>
          <h2 className="font-pixel text-xl sm:text-2xl text-tc-cream mb-4">JOIN THE CREW</h2>
          <p className="text-tc-cream/50 text-base max-w-md mx-auto mb-10 leading-relaxed">
            Early access drops, exclusive skins, unreleased tracks, and merch collabs — all start here.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === "success" || status === "loading"}
              className="flex-1 px-4 py-3 bg-white/5 border border-tc-purple/30 rounded text-tc-cream placeholder-tc-cream/30 focus:outline-none focus:border-tc-pink transition-colors duration-200 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "success" || status === "loading"}
              className="px-6 py-3 bg-tc-pink text-white font-pixel text-[9px] tracking-wider rounded hover:bg-tc-pink/80 transition-all duration-200 disabled:opacity-50 shadow-glow-pink"
            >
              {status === "loading" ? "..." : status === "success" ? "✓ JOINED" : "JOIN"}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`font-pixel text-[8px] tracking-wider mb-8 ${
                status === "success" ? "text-tc-cyan" : "text-tc-pink"
              }`}
            >
              {message.toUpperCase()}
            </motion.p>
          )}

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/6 transition-all duration-200 text-tc-cream/60 hover:text-tc-cream"
                style={{ "--hover-color": PLATFORM_COLORS[s.platform] } as React.CSSProperties}
              >
                <span className="text-sm">{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
