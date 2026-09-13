"use client";

import { useEffect, useState } from "react";

export default function EmulatorClientWrapper() {
  const [iframeSrc, setIframeSrc] = useState("about:blank");

  useEffect(() => {
    const baseUrl = window.location.origin;
    const romUrl = `${baseUrl}/roms/tone-chan-demo.gbc`;
    const encodedRom = encodeURIComponent(romUrl);
    setIframeSrc(`https://wasmboy.app/iframe/?rom-name=Tone%20Chan&rom-url=${encodedRom}`);
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-2 sm:px-4">
      <div className="w-full relative" style={{ maxWidth: "min(92vw, 440px)" }}>
        <div
          className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#020a02] shadow-[0_0_40px_rgba(123,47,190,0.2)]"
          style={{
            boxShadow: "0 0 40px rgba(123,47,190,0.25), inset 0 0 24px rgba(0,0,0,0.75)",
          }}
        >
          <div className="relative w-full" style={{ aspectRatio: "160 / 144" }}>
            <iframe
              title="Tone Chan emulator"
              src={iframeSrc}
              className="block h-full w-full border-0 bg-[#020a02]"
              allow="fullscreen; autoplay; clipboard-write"
              allowFullScreen
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
