import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        "tc-black":   "#050508",
        "tc-dark":    "#0d0a1a",
        "tc-purple":  "#7B2FBE",
        "tc-violet":  "#3A0CA3",
        "tc-pink":    "#FF006E",
        "tc-cyan":    "#4CC9F0",
        "tc-gold":    "#F7B731",
        "tc-cream":   "#F5F0E8",
        // GBA shell tones
        "gba-body":   "#1a0533",
        "gba-screen": "#0d0d1a",
        "gba-btn-a":  "#FF006E",
        "gba-btn-b":  "#4CC9F0",
        "gba-dpad":   "#2a0845",
      },
      fontFamily: {
        pixel:  ["'Press Start 2P'", "monospace"],
        body:   ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono:   ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "scanline":     "scanline 8s linear infinite",
        "glow-pulse":   "glowPulse 2s ease-in-out infinite",
        "float":        "float 3s ease-in-out infinite",
        "pixel-in":     "pixelIn 0.4s steps(4) forwards",
        "flicker":      "flicker 0.15s infinite",
        "screen-on":    "screenOn 0.6s ease-out forwards",
      },
      keyframes: {
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 8px #FF006E, 0 0 20px #FF006E40" },
          "50%":       { boxShadow: "0 0 16px #FF006E, 0 0 40px #FF006E80" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        pixelIn: {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.95" },
        },
        screenOn: {
          "0%":   { opacity: "0", filter: "brightness(3) blur(4px)" },
          "50%":  { opacity: "0.8", filter: "brightness(1.5) blur(1px)" },
          "100%": { opacity: "1", filter: "brightness(1) blur(0px)" },
        },
      },
      backgroundImage: {
        "noise":         "url('/images/noise.png')",
        "grid-pattern":  "linear-gradient(rgba(123,47,190,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,190,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "32px 32px",
      },
      boxShadow: {
        "glow-pink":   "0 0 12px #FF006E, 0 0 32px #FF006E40",
        "glow-cyan":   "0 0 12px #4CC9F0, 0 0 32px #4CC9F040",
        "glow-purple": "0 0 12px #7B2FBE, 0 0 32px #7B2FBE40",
        "screen":      "inset 0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(76,201,240,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
