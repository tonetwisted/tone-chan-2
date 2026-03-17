"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MediaAsset } from "@/types";
import { MEDIA_ASSETS } from "@/lib/content";

interface Props {
  assets?: MediaAsset[];
  featured?: boolean;
}

export default function ScreenshotCarousel({
  assets = MEDIA_ASSETS,
  featured = false,
}: Props) {
  const items = featured ? assets.filter((a) => a.featured) : assets;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go((current - 1 + items.length) % items.length);
  const next = () => go((current + 1) % items.length);

  if (items.length === 0) return null;
  const item = items[current];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main display */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-tc-dark border border-tc-purple/20 shadow-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: -d * 60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {item.url.endsWith(".mp4") || item.url.endsWith(".webm") ? (
              <video src={item.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            )}

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-tc-black/90 to-transparent">
              <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-0.5">{item.type.toUpperCase()}</p>
              <p className="text-tc-cream/90 text-sm font-medium">{item.title}</p>
              {item.description && (
                <p className="text-tc-cream/50 text-xs mt-0.5">{item.description}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 6px)",
          }}
        />

        {/* Nav arrows */}
        {items.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-tc-black/60 hover:bg-tc-black/80 text-tc-cream/70 hover:text-tc-cream transition-all duration-200">
              ‹
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-tc-black/60 hover:bg-tc-black/80 text-tc-cream/70 hover:text-tc-cream transition-all duration-200">
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === current ? "bg-tc-pink w-4" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(i)}
              className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all duration-200 ${
                i === current ? "border-tc-pink" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={item.thumbnailUrl ?? item.url}
                alt={item.title}
                width={80}
                height={56}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
