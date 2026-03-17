"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { isValidEmail } from "@/lib/utils";

interface Props {
  source?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  ctaLabel?: string;
}

export default function EmailCapture({
  source = "generic",
  title = "JOIN THE CREW",
  subtitle = "Get early drops, exclusive content, and chapter updates.",
  placeholder = "your@email.com",
  ctaLabel = "JOIN",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're in!");
        setEmail("");
      } else {
        throw new Error(data.message ?? "Something went wrong.");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="font-pixel text-sm text-tc-cream mb-2 text-center">{title}</h3>
      <p className="text-tc-cream/50 text-sm text-center mb-6">{subtitle}</p>

      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "success" || status === "loading"}
          className="flex-1 px-4 py-3 bg-white/5 border border-tc-purple/30 rounded text-tc-cream placeholder-tc-cream/30 focus:outline-none focus:border-tc-pink transition-colors duration-200 disabled:opacity-50 text-sm"
        />
        <button
          type="submit"
          disabled={status === "success" || status === "loading"}
          className="px-6 py-3 bg-tc-pink text-white font-pixel text-[9px] tracking-wider rounded hover:bg-tc-pink/80 transition-all duration-200 disabled:opacity-60 shadow-glow-pink whitespace-nowrap"
        >
          {status === "loading" ? "..." : status === "success" ? "✓ JOINED" : ctaLabel}
        </button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-pixel text-[8px] tracking-widest text-center mt-3 ${
            status === "success" ? "text-tc-cyan" : "text-tc-pink"
          }`}
        >
          {message.toUpperCase()}
        </motion.p>
      )}
    </div>
  );
}
