"use client";

import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onButton?: (btn: string, pressed: boolean) => void;
  pressedButtons?: Set<string>;
  isPlaying?: boolean;
}

export default function GameBoyShell({
  children,
  onButton,
  pressedButtons = new Set(),
  isPlaying = false,
}: Props) {
  return (
    <div
      className="relative w-full h-full flex flex-col select-none overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{
        background: "linear-gradient(170deg, #1a0533 0%, #0d0820 60%, #050508 100%)",
        border: "1.5px solid rgba(255,255,255,0.07)",
        boxShadow: "0 0 60px rgba(123,47,190,0.25), 0 30px 80px rgba(0,0,0,0.8)",
      }}
    >
      {/* Shoulder buttons */}
      <div className="flex justify-between flex-shrink-0">
        <ShoulderBtn side="left"  label="L" gbaKey="L" active={pressedButtons.has("L")} onButton={onButton} />
        <ShoulderBtn side="right" label="R" gbaKey="R" active={pressedButtons.has("R")} onButton={onButton} />
      </div>

      {/* Screen zone */}
      <div className="flex-shrink-0 flex justify-center px-4 sm:px-6 pt-1 pb-3">
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{
            background: "#080810",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.9), 0 0 16px rgba(76,201,240,0.12)",
            border: "2px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center justify-between px-3 pt-2 pb-1">
            <span className="font-pixel text-[5px] sm:text-[6px] text-tc-cream/25 tracking-[3px]">GAME BOY COLOR</span>
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isPlaying ? "bg-tc-pink shadow-glow-pink animate-glow-pulse" : "bg-tc-cream/20"}`} />
          </div>

          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "10/9" }}>
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)" }} />
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
            <div className="absolute inset-0 bg-[#0a140a]">{children}</div>
          </div>

          <div className="flex justify-center py-1.5">
            <span className="font-pixel text-[4px] sm:text-[5px] text-tc-pink/40 tracking-[5px]">◆ COLOR ◆</span>
          </div>
        </div>
      </div>

      {/* Controls zone */}
      <div className="flex-1 flex items-center justify-between px-3 sm:px-6 pb-4 gap-2 min-h-0">
        <div className="flex-shrink-0">
          <DPad onButton={onButton} pressedButtons={pressedButtons} />
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <div className="flex gap-2 sm:gap-4 justify-center">
            <MiniBtn label="SELECT" gbaKey="Select" active={pressedButtons.has("Select")} onButton={onButton} />
            <MiniBtn label="START"  gbaKey="Start"  active={pressedButtons.has("Start")}  onButton={onButton} />
          </div>
          <div className="flex gap-[3px] opacity-20 mt-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[3px] h-5 sm:h-6 bg-tc-cream rounded-full" />
            ))}
          </div>
        </div>

        <div className="flex-shrink-0">
          <ABCluster
            aActive={pressedButtons.has("A")}
            bActive={pressedButtons.has("B")}
            onButton={onButton}
          />
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-10 blur-2xl opacity-20 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #FF006E, #7B2FBE)" }} />
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function ShoulderBtn({
  side, label, gbaKey, active, onButton,
}: {
  side: "left" | "right";
  label: string;
  gbaKey: string;
  active: boolean;
  onButton?: (btn: string, pressed: boolean) => void;
}) {
  return (
    <button
      onPointerDown={() => onButton?.(gbaKey, true)}
      onPointerUp={() => onButton?.(gbaKey, false)}
      onPointerLeave={() => onButton?.(gbaKey, false)}
      onPointerCancel={() => onButton?.(gbaKey, false)}
      className={`w-[22%] h-7 sm:h-9 border-b-2 border-tc-purple/20 flex items-center transition-colors duration-75 touch-none
        ${side === "left" ? "rounded-br-2xl rounded-tl-2xl justify-start pl-3" : "rounded-bl-2xl rounded-tr-2xl justify-end pr-3"}
        ${active ? "bg-tc-purple/60" : "bg-white/5 hover:bg-tc-purple/30 active:bg-tc-purple/60"}
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className={`font-pixel text-[7px] sm:text-[8px] transition-colors ${active ? "text-tc-cream/80" : "text-tc-cream/40"}`}>{label}</span>
    </button>
  );
}

function DPad({
  onButton,
  pressedButtons,
}: {
  onButton?: (btn: string, pressed: boolean) => void;
  pressedButtons: Set<string>;
}) {
  const dirs = [
    { key: "Up",    label: "▲", col: 2, row: 1 },
    { key: "Left",  label: "◄", col: 1, row: 2 },
    { key: "Right", label: "►", col: 3, row: 2 },
    { key: "Down",  label: "▼", col: 2, row: 3 },
  ];
  return (
    <div
      className="grid gap-0.5"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        width: "clamp(84px, 22vw, 116px)",
        height: "clamp(84px, 22vw, 116px)",
      }}
    >
      {dirs.map(({ key, label, col, row }) => {
        const active = pressedButtons.has(key);
        return (
          <button
            key={key}
            onPointerDown={() => onButton?.(key, true)}
            onPointerUp={() => onButton?.(key, false)}
            onPointerLeave={() => onButton?.(key, false)}
            onPointerCancel={() => onButton?.(key, false)}
            className={`text-sm sm:text-base flex items-center justify-center rounded-sm transition-colors duration-75 touch-none
              ${active ? "bg-tc-purple text-tc-cream" : "bg-[#2a0845] hover:bg-tc-purple/70 active:bg-tc-purple text-tc-cream/70"}
            `}
            style={{ gridColumn: col, gridRow: row, WebkitTapHighlightColor: "transparent" }}
          >
            {label}
          </button>
        );
      })}
      <div style={{ gridColumn: 2, gridRow: 2 }} className="bg-[#1a0533] rounded-sm" />
    </div>
  );
}

function ABCluster({
  aActive,
  bActive,
  onButton,
}: {
  aActive: boolean;
  bActive: boolean;
  onButton?: (btn: string, pressed: boolean) => void;
}) {
  const sz = "clamp(48px, 13vw, 64px)";
  return (
    <div className="relative" style={{ width: "clamp(92px, 25vw, 128px)", height: "clamp(84px, 22vw, 116px)" }}>
      {/* A button */}
      <button
        onPointerDown={() => onButton?.("A", true)}
        onPointerUp={() => onButton?.("A", false)}
        onPointerLeave={() => onButton?.("A", false)}
        onPointerCancel={() => onButton?.("A", false)}
        className={`absolute right-0 top-0 rounded-full touch-none flex items-center justify-center transition-all duration-75
          ${aActive
            ? "bg-white scale-90 shadow-none"
            : "bg-tc-pink hover:bg-tc-pink/80 active:scale-90 shadow-glow-pink"}
        `}
        style={{ width: sz, height: sz, WebkitTapHighlightColor: "transparent" }}
      >
        <span className={`font-pixel text-[10px] sm:text-xs ${aActive ? "text-tc-pink" : "text-white"}`}>A</span>
      </button>

      {/* B button */}
      <button
        onPointerDown={() => onButton?.("B", true)}
        onPointerUp={() => onButton?.("B", false)}
        onPointerLeave={() => onButton?.("B", false)}
        onPointerCancel={() => onButton?.("B", false)}
        className={`absolute left-0 bottom-0 rounded-full touch-none flex items-center justify-center transition-all duration-75
          ${bActive
            ? "bg-white scale-90 shadow-none"
            : "bg-tc-cyan hover:bg-tc-cyan/80 active:scale-90 shadow-glow-cyan"}
        `}
        style={{ width: sz, height: sz, WebkitTapHighlightColor: "transparent" }}
      >
        <span className={`font-pixel text-[10px] sm:text-xs ${bActive ? "text-tc-cyan" : ""}`} style={bActive ? {} : { color: "#050508" }}>B</span>
      </button>
    </div>
  );
}

function MiniBtn({
  label, gbaKey, active, onButton,
}: {
  label: string;
  gbaKey: string;
  active: boolean;
  onButton?: (btn: string, pressed: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onPointerDown={() => onButton?.(gbaKey, true)}
        onPointerUp={() => onButton?.(gbaKey, false)}
        onPointerLeave={() => onButton?.(gbaKey, false)}
        onPointerCancel={() => onButton?.(gbaKey, false)}
        className={`rounded-full transition-colors duration-75 touch-none
          ${active ? "bg-tc-purple" : "bg-[#2a0845] hover:bg-tc-purple/60 active:bg-tc-purple"}
        `}
        style={{
          width: "clamp(38px, 10vw, 54px)",
          height: "clamp(11px, 2.5vw, 15px)",
          WebkitTapHighlightColor: "transparent",
        }}
      />
      <span className={`font-pixel text-[5px] sm:text-[6px] tracking-wider transition-colors ${active ? "text-tc-cream/70" : "text-tc-cream/30"}`}>
        {label}
      </span>
    </div>
  );
}
