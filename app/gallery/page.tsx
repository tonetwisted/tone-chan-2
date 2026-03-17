"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TrailerModal from "@/components/media/TrailerModal";
import ScreenshotCarousel from "@/components/media/ScreenshotCarousel";
import { MEDIA_ASSETS } from "@/lib/content";
import type { MediaType } from "@/types";

const FILTERS: { label: string; value: MediaType | "all" }[] = [
  { label: "ALL",        value: "all" },
  { label: "SCREENSHOTS", value: "screenshot" },
  { label: "ARTWORK",    value: "artwork" },
  { label: "GIFs",       value: "gif" },
  { label: "VIDEO",      value: "video" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<MediaType | "all">("all");
  const [trailerOpen, setTrailerOpen] = useState(false);

  const filtered = filter === "all"
    ? MEDIA_ASSETS
    : MEDIA_ASSETS.filter((a) => a.type === filter);

  return (
    <div className="min-h-screen bg-tc-black pt-24 pb-16">
      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        videoUrl=""   // 🔧 Set your YouTube embed URL here
        videoType="youtube"
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-12">
        <p className="font-pixel text-[8px] text-tc-pink/60 tracking-widest mb-2">MEDIA</p>
        <h1 className="font-pixel text-2xl sm:text-3xl text-tc-cream mb-4">GALLERY</h1>
        <p className="text-tc-cream/50 text-sm max-w-md mx-auto">
          Screenshots, artwork, and trailers from Tone Chan's Adventures.
        </p>
      </div>

      {/* Trailer CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 flex justify-center">
        <button
          onClick={() => setTrailerOpen(true)}
          className="group flex items-center gap-3 px-8 py-4 rounded-lg font-pixel text-xs text-white transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #FF006E, #7B2FBE)", boxShadow: "0 0 24px #FF006E40" }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          WATCH TRAILER
        </button>
      </div>

      {/* Featured carousel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <h2 className="font-pixel text-[10px] text-tc-cyan/50 tracking-widest mb-6 text-center">FEATURED</h2>
        <ScreenshotCarousel featured />
      </div>

      {/* Filter tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex-shrink-0 px-4 py-1.5 rounded font-pixel text-[8px] tracking-wider border transition-all duration-200 ${
                filter === f.value
                  ? "border-tc-pink text-tc-pink bg-tc-pink/10"
                  : "border-white/10 text-tc-cream/40 hover:border-tc-purple/40 hover:text-tc-cream/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-tc-cream/30">
            <p className="font-pixel text-[10px]">NO ASSETS YET</p>
            <p className="text-sm mt-2">Add images to /public/images/media/ and update lib/content.ts</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((asset, i) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative aspect-video rounded-lg overflow-hidden border border-white/5 hover:border-tc-purple/30 bg-tc-dark transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={asset.thumbnailUrl ?? asset.url}
                  alt={asset.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-tc-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div>
                    <span className="font-pixel text-[6px] text-tc-pink/80 tracking-wider block">{asset.type.toUpperCase()}</span>
                    <span className="text-tc-cream text-xs">{asset.title}</span>
                  </div>
                </div>

                {/* Featured badge */}
                {asset.featured && (
                  <span className="absolute top-2 right-2 font-pixel text-[5px] text-tc-pink bg-tc-pink/10 border border-tc-pink/20 px-1.5 py-0.5 rounded">★</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
