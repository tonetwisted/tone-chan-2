import { WasmBoy } from "wasmboy";
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

export function setJoypadState(activeButtons: Iterable<string> | Record<string, boolean>) {
  const controllerState = {
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

  const normalized =
    typeof (activeButtons as Record<string, boolean>)?.UP === "boolean"
      ? (activeButtons as Record<string, boolean>)
      : Object.fromEntries(Array.from(activeButtons as Iterable<string>).map((button) => [button, true]));

  controllerState.UP = Boolean(normalized.UP || normalized.Up);
  controllerState.RIGHT = Boolean(normalized.RIGHT || normalized.Right);
  controllerState.DOWN = Boolean(normalized.DOWN || normalized.Down);
  controllerState.LEFT = Boolean(normalized.LEFT || normalized.Left);
  controllerState.A = Boolean(normalized.A || normalized.a);
  controllerState.B = Boolean(normalized.B || normalized.b);
  controllerState.SELECT = Boolean(normalized.SELECT || normalized.Select || normalized.Shift);
  controllerState.START = Boolean(normalized.START || normalized.Start || normalized.Enter);
  controllerState.L = Boolean(normalized.L || normalized.l);
  controllerState.R = Boolean(normalized.R || normalized.r);

  try {
    WasmBoy.setJoypadState(controllerState);
  } catch {
    // ignore if the emulator is not initialized yet
  }
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
  const cfg = { ...DEFAULT_EMULATOR_CONFIG, ...opts.config };

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

  const romUrl = opts.romPath.startsWith("http")
    ? opts.romPath
    : `${window.location.origin}${opts.romPath}`;

  (async () => {
    try {
      console.log("[wasmboy] init start", { romUrl, canvas: !!canvas, cfg });
      await WasmBoy.config(
        {
          isGbcEnabled: cfg.system === "gbc" || cfg.system === "gb",
          gameboyFrameRate: cfg.fps,
          isAudioEnabled: true,
          enableBootROMIfAvailable: false,
          headless: false,
        },
        canvas
      );
      console.log("[wasmboy] config ok");

      await WasmBoy.loadROM(romUrl);
      console.log("[wasmboy] loaded rom");
      WasmBoy.play();
      console.log("[wasmboy] play called");
      opts.onReady?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load emulator";
      console.error("[wasmboy] init failed", err);
      opts.onError?.(message);
    }
  })();

  return () => {
    try {
      WasmBoy.pause();
    } catch {
      // ignore cleanup races
    }
    try {
      const canvasEl = container.querySelector("canvas");
      if (canvasEl) canvasEl.remove();
    } catch {
      // ignore cleanup races
    }
  };
}

// ─── Keyboard → GBA Button Mapping ───────────────────────────────────────────

export const KEY_MAP: Record<string, number> = {
  ArrowUp:    0,
  ArrowDown:  1,
  ArrowLeft:  2,
  ArrowRight: 3,
  z:          4,   // A
  x:          5,   // B
  a:          8,   // L
  s:          9,   // R
  Enter:      7,   // Start
  Shift:      6,   // Select
  Backspace:  6,   // Select fallback
};

// ─── Mobile Detection ─────────────────────────────────────────────────────────

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
