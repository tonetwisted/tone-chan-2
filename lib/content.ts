import type { GameMetadata, LoreBlock, Character, MediaAsset, SocialLink } from "@/types";

// ─── Game Metadata ─────────────────────────────────────────────────────────
export const GAME_META: GameMetadata = {
  id: "tone-chan-adventures",
  title: "Tone Chan's Adventures",
  subtitle: "An Epic 8-Bit Journey",
  description:
    "Tone Chan's Adventures is a retro-styled Game Boy Color game blending anime storytelling, streetwear culture, and classic side-scrolling action. Follow Tone Chan through a neon-drenched world of rhythm, rebellion, and revelation.",
  genre: ["Action", "Adventure", "Platformer"],
  platform: "GBC",
  developer: "Tone Chan Studios",
  publisher: "Tone Chan Studios",
  releaseYear: 2025,
  rating: "E10+",
  tags: ["retro", "pixel-art", "anime", "indie", "gbc", "streetwear"],
};

// ─── Lore Blocks ──────────────────────────────────────────────────────────
export const LORE_BLOCKS: LoreBlock[] = [
  {
    id: "origin",
    title: "The World of Tone Chan",
    body: "In a parallel universe where music is a physical force, Tone Chan — a young underground DJ — discovers she can channel sound into power. Born in the neon-lit streets of Neo Akiba, she carries both a rare gift and a dangerous secret.",
    imageUrl: "/images/lore/world.png",
    order: 1,
    tag: "ORIGIN",
  },
  {
    id: "mission",
    title: "The Mission",
    body: "A shadow organization known as THE STATIC is draining the world's creative energy. Armed with her decks, her crew, and an ancient portable console, Tone Chan must travel across five districts — each guarded by a corrupted rhythm boss.",
    imageUrl: "/images/lore/mission.png",
    order: 2,
    tag: "MISSION",
  },
  {
    id: "power",
    title: "The Power of Sound",
    body: "Every combo unlocks a new beat. Every boss defeated drops a limited-edition mixtape. Collect them all to unlock the true finale. The music you hear in-game is real — every track is an original Tone Chan production.",
    imageUrl: "/images/lore/power.png",
    order: 3,
    tag: "GAMEPLAY",
  },
];

// ─── Characters ──────────────────────────────────────────────────────────────
export const CHARACTERS: Character[] = [
  {
    id: "tone-chan",
    name: "Tone Chan",
    role: "Hero",
    bio: "Underground DJ, rhythm warrior, and reluctant hero. Quick, creative, and always two beats ahead of the enemy.",
    imageUrl: "/images/characters/tone-chan.png",
    color: "#FF006E",
  },
  {
    id: "static",
    name: "The Static",
    role: "Antagonist",
    bio: "A faceless force that consumes creative energy. Manifests through corrupted sound and broken rhythms.",
    imageUrl: "/images/characters/static.png",
    color: "#3A0CA3",
  },
  {
    id: "crate",
    name: "Crate",
    role: "Companion",
    bio: "Tone Chan's sentient portable console companion — holds save states and unlockable memories.",
    imageUrl: "/images/characters/crate.png",
    color: "#4CC9F0",
  },
];

// ─── Media Assets ─────────────────────────────────────────────────────────────
export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: "ss-01",
    type: "screenshot",
    title: "Neo Akiba District",
    description: "The neon-drenched opening area",
    url: "/images/media/screenshot-01.png",
    thumbnailUrl: "/images/media/screenshot-01-thumb.png",
    width: 240,
    height: 160,
    featured: true,
  },
  {
    id: "ss-02",
    type: "screenshot",
    title: "Boss Fight — DJ Venom",
    description: "The first rhythm boss encounter",
    url: "/images/media/screenshot-02.png",
    thumbnailUrl: "/images/media/screenshot-02-thumb.png",
    width: 240,
    height: 160,
    featured: true,
  },
  {
    id: "ss-03",
    type: "screenshot",
    title: "Overworld Map",
    description: "Five districts await",
    url: "/images/media/screenshot-03.png",
    thumbnailUrl: "/images/media/screenshot-03-thumb.png",
    width: 240,
    height: 160,
    featured: false,
  },
  {
    id: "art-01",
    type: "artwork",
    title: "Tone Chan — Key Art",
    description: "Official key art illustration",
    url: "/images/media/key-art.png",
    thumbnailUrl: "/images/media/key-art-thumb.png",
    featured: true,
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", label: "Instagram",  url: "https://instagram.com/tonechan",    icon: "instagram" },
  { platform: "twitter",   label: "Twitter/X",  url: "https://twitter.com/tonechan",      icon: "twitter" },
  { platform: "tiktok",    label: "TikTok",     url: "https://tiktok.com/@tonechan",      icon: "tiktok" },
  { platform: "youtube",   label: "YouTube",    url: "https://youtube.com/@tonechan",     icon: "youtube" },
  { platform: "discord",   label: "Discord",    url: "https://discord.gg/tonechan",       icon: "discord" },
  { platform: "spotify",   label: "Spotify",    url: "https://open.spotify.com/tonechan", icon: "spotify" },
];

// ─── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Play", href: "/play" },
];
