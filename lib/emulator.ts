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
  controllerState.SELECT = Boolean(normalized.SELECT || normalized.Select);
  controllerState.START = Boolean(normalized.START || normalized.Start);

  try {
    WasmBoy.setJoypadState(controllerState);
  } catch {
    // ignore if the emulator is not initialized yet
  }
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
  if (!container.contains(canvas)) {
    container.appendChild(canvas);
  }

  const romUrl = opts.romPath.startsWith("http")
    ? opts.romPath
    : `${window.location.origin}${opts.romPath}`;

  (async () => {
    try {
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

      await WasmBoy.loadROM(romUrl);
      WasmBoy.play();
      opts.onReady?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load emulator";
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
  Backspace:  6,   // Select
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
