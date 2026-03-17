"use client";

import dynamic from "next/dynamic";

const EmulatorContainer = dynamic(
  () => import("@/components/emulator/EmulatorContainer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <span className="font-pixel text-[8px] text-tc-cyan animate-pulse tracking-widest">
          LOADING...
        </span>
      </div>
    ),
  }
);

export default function EmulatorClientWrapper() {
  return <EmulatorContainer />;
}
