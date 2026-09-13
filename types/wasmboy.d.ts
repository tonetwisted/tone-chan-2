declare module "wasmboy" {
  export const WasmBoy: {
    config: (options: Record<string, unknown>, canvas: HTMLCanvasElement) => Promise<void>;
    loadROM: (rom: string | ArrayBuffer | Uint8Array, fetchHeaders?: Record<string, string>) => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    setJoypadState: (state: Record<string, boolean>) => void;
  };
}
