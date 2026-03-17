import type { SkinConfig } from "@/types";

// ─── Classic GBA Skin ─────────────────────────────────────────────────────────
export const CLASSIC_GBA_SKIN: SkinConfig = {
  id: "classic-gba",
  name: "Classic GBA",
  description: "The OG Game Boy Advance — wide horizontal design",
  thumbnailUrl: "/images/skins/classic-gba-thumb.png",
  frameImageUrl: null, // CSS-drawn
  bodyColor: "#1a0533",
  accentColor: "#FF006E",
  deviceWidth: 480,
  deviceHeight: 320,
  aspectRatio: "3/2",
  screenRegion: {
    x: 120,
    y: 44,
    width: 240,
    height: 160,
  },
  buttons: [
    // A button
    { key: "A",      x: 400, y: 90,  width: 28, height: 28, shape: "circle" },
    // B button
    { key: "B",      x: 365, y: 115, width: 28, height: 28, shape: "circle" },
    // D-pad
    { key: "Up",     x: 60,  y: 75,  width: 28, height: 28, shape: "rect" },
    { key: "Down",   x: 60,  y: 131, width: 28, height: 28, shape: "rect" },
    { key: "Left",   x: 32,  y: 103, width: 28, height: 28, shape: "rect" },
    { key: "Right",  x: 88,  y: 103, width: 28, height: 28, shape: "rect" },
    // Start / Select
    { key: "Start",  x: 248, y: 185, width: 44, height: 16, shape: "rect" },
    { key: "Select", x: 188, y: 185, width: 44, height: 16, shape: "rect" },
    // L / R shoulder
    { key: "L",      x: 2,   y: 2,   width: 60, height: 20, shape: "rect" },
    { key: "R",      x: 418, y: 2,   width: 60, height: 20, shape: "rect" },
  ],
};

// ─── TC Custom Skin (branded) ─────────────────────────────────────────────────
export const TC_CUSTOM_SKIN: SkinConfig = {
  id: "tc-custom",
  name: "Tone Chan Edition",
  description: "Limited-edition TC branded console with pink & cyan accents",
  thumbnailUrl: "/images/skins/tc-custom-thumb.png",
  frameImageUrl: null,
  bodyColor: "#0d0a1a",
  accentColor: "#4CC9F0",
  deviceWidth: 360,
  deviceHeight: 640,
  aspectRatio: "9/16",
  screenRegion: {
    x: 28,
    y: 100,
    width: 304,
    height: 203,
  },
  buttons: [
    // A / B
    { key: "A",      x: 296, y: 356, width: 36, height: 36, shape: "circle" },
    { key: "B",      x: 248, y: 388, width: 36, height: 36, shape: "circle" },
    // D-pad
    { key: "Up",     x: 64,  y: 340, width: 36, height: 36, shape: "rect" },
    { key: "Down",   x: 64,  y: 412, width: 36, height: 36, shape: "rect" },
    { key: "Left",   x: 28,  y: 376, width: 36, height: 36, shape: "rect" },
    { key: "Right",  x: 100, y: 376, width: 36, height: 36, shape: "rect" },
    // Start / Select
    { key: "Start",  x: 204, y: 450, width: 56, height: 20, shape: "rect" },
    { key: "Select", x: 100, y: 450, width: 56, height: 20, shape: "rect" },
    // L / R
    { key: "L",      x: 0,   y: 88,  width: 80, height: 24, shape: "rect" },
    { key: "R",      x: 280, y: 88,  width: 80, height: 24, shape: "rect" },
  ],
};

export const ALL_SKINS: SkinConfig[] = [CLASSIC_GBA_SKIN, TC_CUSTOM_SKIN];

export function getSkinById(id: string): SkinConfig {
  return ALL_SKINS.find((s) => s.id === id) ?? CLASSIC_GBA_SKIN;
}
