# Nex, marketing site

One-page site for Nex, a software studio in Erbil, Kurdistan. The site
uses a fixed two-system brand rhythm: **Volt Ink** for dark product moments and
**Porcelain + Blueprint** for service, contact, and detail surfaces.

Geist type · volt `#7C5CFF` signal · blueprint `#2457FF` rules · Lenis smooth scroll.

## Run

```bash
npm install      # install deps
npm run dev      # dev server → http://localhost:5173
npm run build    # typecheck + production build to dist/
```

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com) (no backend needed).
Copy `.env.example` to `.env` and paste your free access key:

```bash
VITE_WEB3FORMS_KEY=your-key-here
```

Without a key the form still works in the UI and simulates a successful send.

## Stack

| | |
|---|---|
| Build | Vite + React + TypeScript |
| Animation | GSAP ScrollTrigger (device morph) · CSS + IntersectionObserver (reveals) · Lenis (smooth scroll) |
| Fonts | Geist · Geist Mono — self-hosted in `public/fonts/` |
| Assets | Brand icons self-hosted in `public/icons/`, product shots in `public/media/` |

## Structure

- `src/components/ProjectModal.tsx` — full-screen project detail (opened from a Work card): shots, pillars, tech stack.
- `src/components/Process.tsx` — the five steps a project runs through, between Work and Contact. Numbered because it is a real sequence; edit `process` in `src/data/content.ts`.
- `src/components/Contact.tsx` — contact form (Web3Forms).
- `src/components/{Hero,Services,Projects,Footer,Nav,Reveal}.tsx` — page sections + scroll-reveal helper.
- `src/components/Devices.tsx` — CSS device frames (iPhone, Android, laptop, desktop + peripherals). The iPhone draws no overlays: every capture already carries its own status bar and home indicator. The Android frame adds a punch-hole camera and a gesture navbar on its own opaque strip, so it never lands on the app's tab bar.
- `src/components/TechIcon.tsx` — brand mark masked and painted with `currentColor`, so logos stay readable in both themes.
- `src/components/Reveal.tsx` — one shared IntersectionObserver; `reveal.css` holds the transitions.
- `src/data/content.ts` — all copy + project data (single source of truth).
- `src/index.css` — Volt Ink and Porcelain + Blueprint tokens + film-grain texture.

## Work section

Six shipped projects: Pace, CountCal, ClusterQuest, LiftLog, Bêrg, Marketly Vendors.
A three-column grid of design-system work cards (2-up under 1080px, 1-up under
640px); the whole card opens the detail sheet. Screenshots live in
`public/media/work/` as webp and sit in CSS hardware that peeks up from the
card's media zone. Nothing is cropped. Bêrg is the exception: its captures are
already full phone renders, so it stages bare with its corners rounded to match
the hardware beside it. To add a project, append to `projects` in
`src/data/content.ts` and drop its shots in that folder.

## Performance

No third-party requests at runtime — fonts and brand icons are served from the
origin. Hero clips are H.264, no audio, with a JPEG poster so the frame paints
before the video decodes. Both loop continuously and are never paused on
scroll: they are the hero, and a frozen device reads as a broken page.

Encode at the resolution the frame actually shows, not at CSS display size —
the devices render on retina, so display-size encodes get upscaled and look
soft. The phone frame crops a portrait slice out of a landscape source, so crop
first rather than shipping pixels that are never visible:

```bash
# laptop: native width, quality-targeted
ffmpeg -i in.mp4 -an -c:v libx264 -crf 21 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/media/hero-web.mp4

# phone: crop the visible 0.467 portrait slice, 30fps is plenty for a loop
ffmpeg -i in.mp4 -an -vf "crop=504:1080:468:0,fps=30" -c:v libx264 -crf 20 \
  -preset slow -pix_fmt yuv420p -movflags +faststart public/media/hero-app.mp4

# poster
ffmpeg -ss 0.5 -i public/media/hero-web.mp4 -frames:v 1 -q:v 4 \
  public/media/hero-web-poster.jpg
```

Masters live in `Design system with dashboard/site-media/`, not in this repo.

## Notes

- Hero closes with two CTAs: `Start a project` (Volt) and `See the work` (ghost), both underline-style per the design system.
- Hero staging: the device slots are zero-size and scale from their own corner (`top right` for the laptop, `bottom left` for the phone), so the frame centres on that anchor and bleeds off the edge. The entrance animation lives on an inner box because its keyframes end at `transform: none` and would otherwise wipe the slot's scale.
- Social cards: `index.html` carries Open Graph + Twitter meta; the image is `public/og.png` (regenerate with `node _design/og-shot.mjs` while the dev server runs).
- Respects `prefers-reduced-motion`: reveals resolve instantly and the device morph falls back to three static rows.
- Every device frame shows a real product shot. The hero pair plays video on top, with the shot underneath as the poster/fallback.
- Brand reference and original launch assets live in `_design/`.
- Instagram rhythm: 6 Volt Ink posts, then 6 Porcelain + Blueprint posts, then repeat.
- No em or en dashes in site copy. Use `·` as the mono separator.
