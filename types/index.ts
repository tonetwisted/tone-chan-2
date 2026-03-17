// ─── Game Metadata ──────────────────────────────────────────────────────────
export interface GameMetadata {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genre: string[];
  platform: "GBA" | "GBC" | "GB";
  developer: string;
  publisher: string;
  releaseYear: number;
  rating: string;
  tags: string[];
}

// ─── ROM Configuration ───────────────────────────────────────────────────────
export interface RomConfig {
  id: string;
  filename: string;          // e.g. "tone-chan-demo.gba"
  path: string;              // e.g. "/roms/tone-chan-demo.gba"
  isDemo: boolean;
  checksumMd5?: string;
  sizeBytes?: number;
}

// ─── Emulator Configuration ──────────────────────────────────────────────────
export interface EmulatorConfig {
  system: "gba" | "gbc" | "gb";
  core: "mgba" | "vba_next" | "gambatte";
  width: number;
  height: number;
  volume: number;             // 0–1
  fps: number;                // target: 60
  saveStateEnabled: boolean;
  cheatsEnabled: boolean;
  skipBios: boolean;
}

// ─── Skin Configuration ──────────────────────────────────────────────────────
export type SkinId = "classic-gba" | "gba-sp" | "tc-custom" | string;

export interface ScreenRegion {
  x: number;       // pixels from left of skin image
  y: number;       // pixels from top
  width: number;
  height: number;
}

export interface ButtonDef {
  key: GamepadButton;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: "circle" | "rect" | "cross";
}

export type GamepadButton =
  | "A" | "B" | "L" | "R"
  | "Start" | "Select"
  | "Up" | "Down" | "Left" | "Right";

export interface SkinConfig {
  id: SkinId;
  name: string;
  description: string;
  thumbnailUrl: string;
  frameImageUrl: string | null;    // null = use CSS-drawn skin
  bodyColor: string;
  accentColor: string;
  screenRegion: ScreenRegion;
  buttons: ButtonDef[];
  deviceWidth: number;             // total skin render width (px)
  deviceHeight: number;            // total skin render height (px)
  aspectRatio: string;             // e.g. "3/5"
}

// ─── Media Assets ─────────────────────────────────────────────────────────────
export type MediaType = "screenshot" | "gif" | "video" | "artwork";

export interface MediaAsset {
  id: string;
  type: MediaType;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  featured: boolean;
}

// ─── Lore Content ─────────────────────────────────────────────────────────────
export interface LoreBlock {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  order: number;
  tag?: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  color: string;
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export type SocialPlatform =
  | "instagram" | "twitter" | "tiktok" | "youtube"
  | "discord" | "spotify" | "twitch" | "github";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  icon: string;
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
export interface NewsletterSignup {
  email: string;
  source?: string;
  timestamp?: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

// ─── Keyboard Controls ────────────────────────────────────────────────────────
export interface ControlMapping {
  key: string;
  gamepadButton: GamepadButton;
  label: string;
}

export const DEFAULT_CONTROLS: ControlMapping[] = [
  { key: "ArrowUp",    gamepadButton: "Up",     label: "↑" },
  { key: "ArrowDown",  gamepadButton: "Down",   label: "↓" },
  { key: "ArrowLeft",  gamepadButton: "Left",   label: "←" },
  { key: "ArrowRight", gamepadButton: "Right",  label: "→" },
  { key: "z",          gamepadButton: "A",      label: "Z" },
  { key: "x",          gamepadButton: "B",      label: "X" },
  { key: "a",          gamepadButton: "L",      label: "A" },
  { key: "s",          gamepadButton: "R",      label: "S" },
  { key: "Enter",      gamepadButton: "Start",  label: "Enter" },
  { key: "Backspace",  gamepadButton: "Select", label: "BkSp" },
];
