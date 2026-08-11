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
- `src/components/Contact.tsx` — contact form (Web3Forms).
- `src/components/{Hero,Services,Projects,Footer,Nav,Reveal}.tsx` — page sections + scroll-reveal helper.
- `src/components/Devices.tsx` — CSS device frames (iPhone, laptop, desktop + peripherals). The frames draw no notch or home bar: every shot is a real capture that already has its own.
- `src/components/TechIcon.tsx` — brand mark masked and painted with `currentColor`, so logos stay readable in both themes.
- `src/components/Reveal.tsx` — one shared IntersectionObserver; `reveal.css` holds the transitions.
- `src/data/content.ts` — all copy + project data (single source of truth).
- `src/index.css` — Volt Ink and Porcelain + Blueprint tokens + film-grain texture.

## Work section

Six shipped projects: Pace, CountCal, ClusterQuest, LiftLog, Bêrg, Marketly Vendors.
One project per full-width row, sides alternating; the whole row opens the
detail sheet. Screenshots live in `public/media/work/` as webp and always render
inside a CSS device frame, never cropped flat. To add a project, append to
`projects` in `src/data/content.ts` and drop its shots in that folder.

## Performance

No third-party requests at runtime — fonts and brand icons are served from the
origin. Hero clips are encoded at display size (H.264, CRF 30, no audio) with a
JPEG poster, so the frame paints before the video decodes. They pause once the
hero scrolls off screen. Re-encode after replacing one:

```bash
ffmpeg -i in.mp4 -an -vf scale=960:-2 -c:v libx264 -crf 30 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/media/hero-web.mp4
```

## Notes

- Respects `prefers-reduced-motion`: reveals resolve instantly and the device morph falls back to three static rows.
- Every device frame shows a real product shot. The hero pair plays video on top, with the shot underneath as the poster/fallback.
- Brand reference and original launch assets live in `_design/`.
- Instagram rhythm: 6 Volt Ink posts, then 6 Porcelain + Blueprint posts, then repeat.
- No em or en dashes in site copy. Use `·` as the mono separator.
