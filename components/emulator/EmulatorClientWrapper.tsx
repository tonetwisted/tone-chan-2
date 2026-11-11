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
};

export default function EmulatorClientWrapper() {
  const gameParentRef = useRef<HTMLDivElement | null>(null);
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const sendKey = useCallback((code: string, key: string, down: boolean) => {
    const type = down ? "keydown" : "keyup";
    const opts = { code, key, bubbles: true, cancelable: true } as KeyboardEventInit;

    document.dispatchEvent(new KeyboardEvent(type, opts));

    document.querySelectorAll("iframe").forEach((frame) => {
      try {
        if (frame.contentDocument) {
          frame.contentDocument.dispatchEvent(new KeyboardEvent(type, opts));
        }
      } catch {
        // Cross-origin iframe is ignored safely.
      }
    });
  }, []);

  const handleButton = useCallback((btn: string, pressed: boolean) => {
    setPressedButtons((prev) => {
      const next = new Set(prev);
      if (pressed) next.add(btn);
      else next.delete(btn);
      return next;
    });

    if (btn === "Up") sendKey("ArrowUp", "ArrowUp", pressed);
    else if (btn === "Down") sendKey("ArrowDown", "ArrowDown", pressed);
    else if (btn === "Left") sendKey("ArrowLeft", "ArrowLeft", pressed);
    else if (btn === "Right") sendKey("ArrowRight", "ArrowRight", pressed);
    else if (btn === "A") sendKey("KeyX", "x", pressed);
    else if (btn === "B") sendKey("KeyZ", "z", pressed);
    else if (btn === "Start") sendKey("Enter", "Enter", pressed);
    else if (btn === "Select") sendKey("ShiftLeft", "Shift", pressed);
  }, [sendKey]);

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
        keyboardInput: "enabled",
        altKeyboardInput: "disabled",
        lockMouse: "disabled",
      };
      win.EJS_Buttons = {
        playPause: false,
        restart: false,
        mute: true,
        settings: false,
        fullscreen: true,
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
      };

      const loaderScriptId = "emulatorjs-loader";
      let loaderScript = document.getElementById(loaderScriptId) as HTMLScriptElement | null;

      if (!loaderScript) {
        loaderScript = document.createElement("script");
        loaderScript.id = loaderScriptId;
        loaderScript.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
        loaderScript.async = true;
        loaderScript.onload = () => {
          setIsReady(true);
          const canvas = document.querySelector("#game canvas");
          if (canvas) {
            (canvas as HTMLElement).click();
          }
        };
        loaderScript.onerror = () => setError("EmulatorJS failed to load.");
        document.body.appendChild(loaderScript);
      } else {
        setIsReady(true);
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
