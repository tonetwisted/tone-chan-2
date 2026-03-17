"use client";

import { motion } from "framer-motion";

interface Props {
  onClick: () => void;
  label?: string;
  sublabel?: string;
}

export default function PlayButton({
  onClick,
  label = "PLAY DEMO",
  sublabel = "Free • No Download • Browser",
}: Props) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3 px-10 py-5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #FF006E, #7B2FBE)",
          boxShadow: "0 0 24px #FF006E80, 0 0 48px #7B2FBE40",
        }}
      >
        {/* Background shimmer */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{ background: "linear-gradient(45deg, transparent 30%, white 50%, transparent 70%)", backgroundSize: "200% 200%", animation: "shimmer 1.5s infinite" }}
        />

        {/* Play icon */}
        <svg
          className="w-8 h-8 text-white drop-shadow"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>

        {/* Label */}
        <div className="flex flex-col items-start">
          <span className="font-pixel text-sm text-white leading-tight tracking-wider">
            {label}
          </span>
        </div>
      </button>

      {sublabel && (
        <p className="font-pixel text-[8px] text-tc-cream/30 tracking-widest">{sublabel}</p>
      )}
    </motion.div>
  );
}
