"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameBoyShell from "@/components/emulator/GameBoyShell";

const KEY_TO_BUTTON: Record<string, string> = {
  ArrowUp: "Up",
  ArrowDown: "Down",
  ArrowLeft: "Left",
  ArrowRight: "Right",
  KeyA: "A",
  KeyB: "B",
  KeyS: "Start",
  ShiftRight: "Select",
  ShiftLeft: "Select",
  Enter: "Start",
  Backspace: "Select",
  KeyX: "A",
  KeyZ: "B",
};

// EmulatorJS's standard RetroPad input indices for the "gb" control scheme
// (see EmulatorJS src/emulator.js getControlScheme() === "gb" button list).
const BUTTON_TO_INPUT_INDEX: Record<string, number> = {
  B: 0,
  Select: 2,
  Start: 3,
  Up: 4,
  Down: 5,
  Left: 6,
  Right: 7,
  A: 8,
};

type EmulatorWindow = Window & {
  EJS_player?: string;
  EJS_gameName?: string;
  EJS_core?: string;
  EJS_gameUrl?: string;
  EJS_pathtodata?: string;
  EJS_startOnLoaded?: boolean;
  EJS_VirtualGamepad?: boolean;
  EJS_mobileControls?: boolean;
  EJS_defaultOptions?: Record<string, string>;
  EJS_Buttons?: Record<string, boolean | string>;
  EJS_onGameStart?: () => void;
  EJS_emulator?: {
    gameManager?: {
      simulateInput: (player: number, index: number, value: number) => void;
    };
  };
};

export default function EmulatorClientWrapper() {
  const gameParentRef = useRef<HTMLDivElement | null>(null);
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleButton = useCallback((btn: string, pressed: boolean) => {
    setPressedButtons((prev) => {
      const next = new Set(prev);
      if (pressed) next.add(btn);
      else next.delete(btn);
      return next;
    });

    const index = BUTTON_TO_INPUT_INDEX[btn];
    if (index === undefined) return;

    // Call EmulatorJS's own input API directly — the same one its built-in
    // touch/gamepad controls use — instead of faking keyboard events. This
    // works identically for pointer taps (mobile) and clicks/physical keys
    // (desktop) and doesn't depend on DOM focus or synthetic KeyboardEvent
    // quirks (e.g. `keyCode` being unreliable on constructed events).
    try {
      (window as EmulatorWindow).EJS_emulator?.gameManager?.simulateInput(0, index, pressed ? 1 : 0);
    } catch {
      // Emulator isn't loaded yet; ignore.
    }
  }, []);

  useEffect(() => {
    const parent = gameParentRef.current;
    if (!parent) return;

    const ensureEmulatorJS = () => {
      const gameNode = document.getElementById("game");
      if (gameNode) gameNode.remove();

      const player = document.createElement("div");
      player.id = "game";
      player.style.width = "100%";
      player.style.height = "100%";
      player.style.background = "#020a02";
      parent.appendChild(player);

      const win = window as EmulatorWindow;
      win.EJS_player = "#game";
      win.EJS_gameName = "Tone Chan's Adventures";
      win.EJS_core = "gambatte";
      win.EJS_gameUrl = `${window.location.origin}/roms/tone-chan-demo.gbc`;
      win.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
      win.EJS_startOnLoaded = true;
      win.EJS_VirtualGamepad = false;
      win.EJS_mobileControls = false;
      win.EJS_defaultOptions = {
        // "Direct Keyboard Input" forwards raw keys to the emulated machine
        // and, when enabled, EmulatorJS skips its own button-mapping entirely
        // — that's what was swallowing every control (including Start).
        keyboardInput: "disabled",
        altKeyboardInput: "disabled",
        lockMouse: "disabled",
      };
      win.EJS_Buttons = {
        playPause: false,
        restart: false,
        mute: false,
        settings: false,
        fullscreen: false,
        saveState: false,
        loadState: false,
        screenRecord: false,
        gamepad: false,
        cheat: false,
        volume: false,
        saveSavFiles: false,
        loadSavFiles: false,
        quickSave: false,
        quickLoad: false,
        screenshot: false,
        cacheManager: false,
        exitEmulation: false,
      };
      // "ready" only means EmulatorJS's own UI initialized; the core/ROM is
      // still downloading and simulateInput() is a no-op until "start" fires
      // (this.started = true inside emulator.js) — that's the accurate
      // signal that button presses will actually reach the game.
      win.EJS_onGameStart = () => setIsReady(true);

      const loaderScriptId = "emulatorjs-loader";
      let loaderScript = document.getElementById(loaderScriptId) as HTMLScriptElement | null;

      if (!loaderScript) {
        loaderScript = document.createElement("script");
        loaderScript.id = loaderScriptId;
        loaderScript.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
        loaderScript.async = true;
        loaderScript.onerror = () => setError("EmulatorJS failed to load.");
        document.body.appendChild(loaderScript);
      }
    };

    ensureEmulatorJS();

    return () => {
      const iframe = document.querySelector("#game iframe");
      if (iframe) iframe.remove();
      const gameNode = document.getElementById("game");
      if (gameNode) gameNode.remove();
      const loaderScript = document.getElementById("emulatorjs-loader");
      if (loaderScript) loaderScript.remove();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const button = KEY_TO_BUTTON[event.code];
      if (!button || event.repeat) return;
      event.preventDefault();
      handleButton(button, true);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const button = KEY_TO_BUTTON[event.code];
      if (!button) return;
      handleButton(button, false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [handleButton]);

  return (
    <div className="w-full flex items-center justify-center px-2 sm:px-4">
      <div className="w-full relative" style={{ maxWidth: "min(92vw, 440px)" }}>
        <GameBoyShell onButton={handleButton} pressedButtons={pressedButtons} isPlaying={isReady}>
          <div ref={gameParentRef} className="relative h-full w-full bg-[#020a02] overflow-hidden" />
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center z-10 bg-[#020a02]/80">
              <p className="font-pixel text-[7px] text-tc-pink tracking-widest">LOAD ERROR</p>
            </div>
          ) : null}
          {!isReady && !error ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center z-10 bg-[#020a02]/70">
              <p className="font-pixel text-[7px] text-tc-pink tracking-widest">LOADING…</p>
            </div>
          ) : null}
        </GameBoyShell>
      </div>
    </div>
  );
}
