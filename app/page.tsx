import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import PlayPreviewSection from "@/components/home/PlayPreviewSection";
import LorePreview from "@/components/home/LorePreview";
import CommunitySection from "@/components/home/CommunitySection";

export const metadata: Metadata = {
  title: "Tone Chan's Adventures — Play the Free Demo",
  description:
    "Discover Tone Chan's Adventures — a retro GBA-inspired action game with anime storytelling, streetwear aesthetics, and original music. Play the free demo now.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlayPreviewSection />
      <FeaturesSection />
      <LorePreview />
      <CommunitySection />
    </>
  );
}
