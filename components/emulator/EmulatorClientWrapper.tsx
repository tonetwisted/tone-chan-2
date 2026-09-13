"use client";

import { useCallback, useEffect, useState } from "react";
import GameBoyShell from "@/components/emulator/GameBoyShell";

export default function EmulatorClientWrapper() {
  const [iframeSrc, setIframeSrc] = useState("about:blank");
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const baseUrl = window.location.origin;
    const romUrl = `${baseUrl}/roms/tone-chan-demo.gbc`;
    const encodedRom = encodeURIComponent(romUrl);
    setIframeSrc(`https://wasmboy.app/iframe/?rom-name=Tone%20Chan&rom-url=${encodedRom}`);
  }, []);

  const handleButton = useCallback((btn: string, pressed: boolean) => {
    setPressedButtons((prev) => {
      const next = new Set(prev);
      if (pressed) next.add(btn);
      else next.delete(btn);
      return next;
    });
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-2 sm:px-4">
      <div className="w-full relative" style={{ maxWidth: "min(92vw, 440px)" }}>
        <GameBoyShell onButton={handleButton} pressedButtons={pressedButtons} isPlaying>
          <div className="relative w-full h-full">
            <iframe
              title="Tone Chan emulator"
              src={iframeSrc}
              className="block h-full w-full border-0 bg-[#020a02]"
              allow="fullscreen; autoplay; clipboard-write"
              allowFullScreen
              loading="eager"
            />
          </div>
        </GameBoyShell>
      </div>
    </div>
  );
}
