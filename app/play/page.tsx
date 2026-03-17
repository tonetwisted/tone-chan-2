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
      {/* Minimal header — doesn't steal space */}
      <div className="pt-20 pb-3 text-center flex-shrink-0 px-4">
        <p className="font-pixel text-[7px] sm:text-[8px] text-tc-pink/50 tracking-widest">
          FREE DEMO
        </p>
      </div>

      {/* Game Boy — the entire focus of this page */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 pb-4">
        <EmulatorClientWrapper />
      </div>
    </div>
  );
}
