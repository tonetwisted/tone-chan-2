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
        background: "linear-gradient(170deg, hsl(220,84%,6%) 0%, hsl(220,100%,4%) 60%, hsl(220,100%,3%) 100%)",
        border: "1.5px solid hsl(215,27.9%,16.9%)",
        boxShadow: "0 0 60px hsla(271,81%,56%,0.2), 0 30px 80px rgba(0,0,0,0.8)",
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
            <span style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "9px", letterSpacing: "3px", fontWeight: 700, color: "hsl(326,100%,74%)", textTransform: "uppercase" }}>TONIBOI</span>
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isPlaying ? "animate-glow-pulse" : ""}`} style={{ background: isPlaying ? "hsl(120,100%,50%)" : "hsl(215,27.9%,30%)", boxShadow: isPlaying ? "0 0 8px hsl(120,100%,50%)" : "none" }} />
          </div>

          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "10/9", border: "3px solid hsl(120,100%,50%)", boxShadow: "0 0 16px hsl(120,100%,50%), inset 0 0 16px rgba(0,0,0,0.8)" }}>
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)" }} />
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
            <div className="absolute inset-0 bg-[#020a02]">{children}</div>
          </div>

          <div className="flex justify-center py-1.5">
            <span style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "8px", letterSpacing: "4px", fontWeight: 700, color: "hsla(326,100%,74%,0.4)" }}>◆ TONIBOI ◆</span>
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
        ${active ? "bg-[hsl(271,81%,30%)]" : "bg-white/5 hover:bg-[hsl(271,81%,20%)] active:bg-[hsl(271,81%,30%)]"}
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
            className={`text-sm sm:text-base flex items-center justify-center rounded-sm transition-colors duration-75 touch-none ${active ? "text-white" : "text-[hsl(217.9,10.6%,64.9%)]"}`}
            style={{ gridColumn: col, gridRow: row, WebkitTapHighlightColor: "transparent", background: active ? "hsl(271,81%,56%)" : "hsl(220,84%,10%)" }}
          >
            {label}
          </button>
        );
      })}
      <div style={{ gridColumn: 2, gridRow: 2, background: "hsl(220,84%,6%)" }} className="rounded-sm" />
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
        className={`absolute right-0 top-0 rounded-full touch-none flex items-center justify-center transition-all duration-75 ${aActive ? "scale-90" : "active:scale-90"}`}
        style={{ width: sz, height: sz, WebkitTapHighlightColor: "transparent", background: aActive ? "white" : "hsl(200,98%,60%)", boxShadow: aActive ? "none" : "0 0 14px hsl(200,98%,60%)" }}
      >
        <span style={{ fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 13, fontWeight: 900, color: aActive ? "hsl(200,98%,60%)" : "white" }}>A</span>
      </button>

      {/* B button */}
      <button
        onPointerDown={() => onButton?.("B", true)}
        onPointerUp={() => onButton?.("B", false)}
        onPointerLeave={() => onButton?.("B", false)}
        onPointerCancel={() => onButton?.("B", false)}
        className={`absolute left-0 bottom-0 rounded-full touch-none flex items-center justify-center transition-all duration-75 ${bActive ? "scale-90" : "active:scale-90"}`}
        style={{ width: sz, height: sz, WebkitTapHighlightColor: "transparent", background: bActive ? "white" : "hsl(0,72%,51%)", boxShadow: bActive ? "none" : "0 0 14px hsl(0,72%,51%)" }}
      >
        <span style={{ fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 13, fontWeight: 900, color: bActive ? "hsl(0,72%,51%)" : "white" }}>B</span>
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
        className="rounded-full transition-colors duration-75 touch-none"
        style={{
          width: "clamp(38px, 10vw, 54px)",
          height: "clamp(11px, 2.5vw, 15px)",
          WebkitTapHighlightColor: "transparent",
          background: active ? "hsl(271,81%,56%)" : "hsl(220,84%,10%)",
          boxShadow: active ? "0 0 8px hsl(271,81%,56%)" : "none",
        }}
      />
      <span style={{ fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 8, letterSpacing: "0.1em", fontWeight: 700, color: active ? "hsl(210,40%,80%)" : "hsl(217.9,10.6%,40%)" }}>
        {label}
      </span>
    </div>
  );
}
