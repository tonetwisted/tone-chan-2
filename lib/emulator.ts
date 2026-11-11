import type { EmulatorConfig, RomConfig, SkinConfig } from "@/types";

export const DEFAULT_EMULATOR_CONFIG: EmulatorConfig = {
  system: "gbc",
  core: "gambatte",
  width: 160,
  height: 144,
  volume: 0.7,
  fps: 60,
  saveStateEnabled: true,
  cheatsEnabled: false,
  skipBios: true,
};

export const DEMO_ROM: RomConfig = {
  id: "tone-chan-demo",
  filename: "tone-chan-demo.gbc",
  path: "/roms/tone-chan-demo.gbc",
  isDemo: true,
};

export interface EmulatorJSOptions {
  containerId: string;
  romPath: string;
  config?: Partial<EmulatorConfig>;
  skin?: SkinConfig;
  onReady?: () => void;
  onError?: (err: string) => void;
}

export function setJoypadState(_activeButtons: Iterable<string> | Record<string, boolean>) {
  // Legacy WasmBoy path is intentionally no-op. The active runtime is EmulatorJS,
  // which is initialized client-side in the browser and does not use this module.
}

export function makeJoypadState(activeButtons: Set<string>) {
  const state: Record<string, boolean> = {
    UP: false,
    RIGHT: false,
    DOWN: false,
    LEFT: false,
    A: false,
    B: false,
    SELECT: false,
    START: false,
    L: false,
    R: false,
  };

  for (const button of activeButtons) {
    if (button === "Up") state.UP = true;
    if (button === "Right") state.RIGHT = true;
    if (button === "Down") state.DOWN = true;
    if (button === "Left") state.LEFT = true;
    if (button === "A") state.A = true;
    if (button === "B") state.B = true;
    if (button === "Select") state.SELECT = true;
    if (button === "Start") state.START = true;
    if (button === "L") state.L = true;
    if (button === "R") state.R = true;
  }

  return state;
}

export function initEmulatorJS(opts: EmulatorJSOptions): () => void {
  if (typeof document === "undefined") {
    opts.onError?.("Emulator initialization requires a browser environment.");
    return () => {};
  }

  const container = document.getElementById(opts.containerId);
  if (!container) {
    const error = "Emulator container not found.";
    opts.onError?.(error);
    return () => {};
  }

  const canvas = container.querySelector("canvas") ?? document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 144;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.objectFit = "contain";
  canvas.style.imageRendering = "pixelated";
  canvas.style.background = "#020a02";
  if (!container.contains(canvas)) {
    container.appendChild(canvas);
  }

  opts.onReady?.();

  return () => {
    const canvasEl = container.querySelector("canvas");
    if (canvasEl) canvasEl.remove();
  };
}

export const KEY_MAP: Record<string, number> = {
  ArrowUp: 0,
  ArrowDown: 1,
  ArrowLeft: 2,
  ArrowRight: 3,
  z: 4,
  x: 5,
  a: 8,
  s: 9,
  Enter: 7,
  Shift: 6,
  Backspace: 6,
};

export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function supportsWasm(): boolean {
  try {
    if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
      const module = new WebAssembly.Module(
        Uint8Array.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00])
      );
      return module instanceof WebAssembly.Module;
    }
  } catch {
    // ignore
  }
  return false;
}
