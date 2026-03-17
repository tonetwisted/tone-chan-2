# Tone Chan's Adventures — Platform

Browser-based GBA game landing page and interactive demo player.
Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## ROM Setup (Required to play)

1. Place your GBA ROM file at:
   ```
   /public/roms/tone-chan-demo.gba
   ```

2. Download EmulatorJS from https://github.com/EmulatorJS/EmulatorJS/releases
   Extract it so the structure is:
   ```
   /public/emulatorjs/data/loader.js
   /public/emulatorjs/data/cores/mgba_wasm.js
   /public/emulatorjs/data/cores/mgba_wasm.wasm
   ... (all other EmulatorJS files)
   ```

3. That's it — click **Play Demo** and the emulator loads automatically.

---

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

| Variable                    | Purpose                         |
|-----------------------------|---------------------------------|
| `CONVERTKIT_API_KEY`        | Newsletter (ConvertKit)         |
| `CONVERTKIT_FORM_ID`        | ConvertKit form ID              |
| `MAILCHIMP_API_KEY`         | Newsletter (Mailchimp fallback) |
| `MAILCHIMP_LIST_ID`         | Mailchimp audience ID           |
| `NEXT_PUBLIC_SITE_URL`      | Your production URL             |
| `NEXT_PUBLIC_GA_ID`         | Google Analytics ID             |

---

## Content Customization

All site content lives in `lib/content.ts`:
- Game metadata
- Lore blocks
- Characters
- Media assets
- Social links

Update these to match your actual game details.

---

## Adding Your Trailer

In `app/gallery/page.tsx`, set:
```tsx
<TrailerModal
  videoUrl="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  videoType="youtube"
/>
```

---

## Skins

Skins are defined in `lib/skins.ts`. Two are included:
- **Classic GBA** — horizontal landscape design
- **Tone Chan Edition** — vertical portrait design

To add a custom skin image instead of CSS-drawn, set `frameImageUrl` to an image path and position the screen/buttons using the `screenRegion` and `buttons` config.

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

The `next.config.ts` already includes the correct CORS headers for ROM files and WebAssembly support.

---

## Project Structure

```
tone-chan-adventures/
├── app/
│   ├── page.tsx              ← Homepage
│   ├── play/page.tsx         ← Play Demo page
│   ├── about/page.tsx        ← Lore / About
│   ├── gallery/page.tsx      ← Media Gallery
│   ├── community/page.tsx    ← Community / Signup
│   └── api/newsletter/       ← Email signup API
├── components/
│   ├── layout/               ← Nav, Footer
│   ├── emulator/             ← GameBoyShell, EmulatorCanvas, PlayButton
│   ├── home/                 ← Hero, Features, LorePreview, etc.
│   ├── media/                ← TrailerModal, ScreenshotCarousel
│   └── ui/                   ← Modal, EmailCapture
├── lib/
│   ├── content.ts            ← All site content / copy
│   ├── emulator.ts           ← EmulatorJS integration
│   ├── skins.ts              ← GameBoy skin configs
│   └── utils.ts              ← Shared utilities
├── types/index.ts            ← TypeScript types
└── public/
    ├── roms/                 ← Place .gba file here
    └── emulatorjs/           ← Place EmulatorJS here
```

---

## Performance Targets

| Metric         | Target          |
|----------------|-----------------|
| LCP            | < 2.5s          |
| JS Bundle      | < 200KB initial |
| Emulator load  | < 3s after click|
| Mobile FPS     | ~30fps (mgba)   |

---

## Keyboard Controls

| Key        | GBA Button |
|------------|------------|
| Arrow Keys | D-Pad      |
| Z          | A          |
| X          | B          |
| A          | L Shoulder |
| S          | R Shoulder |
| Enter      | Start      |
| Backspace  | Select     |
| F          | Fullscreen |
