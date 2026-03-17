import type { Metadata } from "next";
import EmulatorClientWrapper from "@/components/emulator/EmulatorClientWrapper";

export const metadata: Metadata = {
  title: "Play Demo — Tone Chan's Adventures",
  description:
    "Play the free browser demo of Tone Chan's Adventures in your browser. No download required.",
};

export default function PlayPage() {
  return (
    <div
      className="min-h-[100dvh] bg-tc-black flex flex-col"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 30%, rgba(123,47,190,0.12) 0%, transparent 60%)",
      }}
    >
      {/* Minimal header — tight on mobile, spacious on desktop */}
      <div className="pt-16 sm:pt-20 pb-2 sm:pb-3 text-center flex-shrink-0 px-4">
        <p className="font-pixel text-[7px] sm:text-[8px] text-tc-pink/50 tracking-widest">
          FREE DEMO
        </p>
      </div>

      {/* Game — fills remaining space */}
      <div className="flex-1 flex items-start sm:items-center justify-center sm:px-4 sm:pb-4">
        <EmulatorClientWrapper />
      </div>
    </div>
  );
}
