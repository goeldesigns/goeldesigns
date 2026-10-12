# Goel Designs — website

The Goel Designs studio site, rebuilt on the **Tabla design system v1.0** (the same tokens, type, components and motion as the Tabla POS marketing site).

- **Stack:** Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · lucide-react
- **Fonts:** Inter (cv11, ss01, ss03) and Instrument Serif italic for headline accents, via `next/font`
- **Output:** a fully static site in `out/` — host it on Vercel, Netlify, Cloudflare Pages or any static host

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → out/
npm run format     # Prettier + Tailwind class sorting
```

## Edit the content

All copy lives in **`src/lib/content.ts`**: contact details, hero text, the three featured projects, services, stats, process, team, the brief-builder options and the FAQ. Components read from it, so most text changes never touch layout code.

Project screenshots are in `public/work/` (desktop 1440×900, mobile 390×844 @2x, WebP). Replace a file with the same name to refresh it.

## How it's put together

| Path | What it is |
| --- | --- |
| `src/app/globals.css` | Design tokens (`@theme`: brand, surfaces, text, status, night, accents, radius, shadows) and the `lp-*` motion vocabulary, including a reduced-motion override |
| `src/components/ui/button.tsx` | Button variants and sizes from the design system |
| `src/components/landing/*` | One file per section: header, hero, marquee, work, services, stats, process, about, contact, faq, final-cta, footer |
| `src/components/landing/visuals/` | The animated service illustrations (design canvas, terminal, API flow, hosting status, palette, timeline…) |
| `src/components/landing/reveal.tsx` | `Reveal` (scroll-in animations) and `Loop` (runs looping animations only while on screen) |

### Design-system rules this site follows

- One purple action colour (`brand-500`); status colours always come with a word.
- Marketing headlines: Inter 600 with tight tracking, finishing on an italic Instrument Serif phrase.
- Cards: white `surface`, 1px `line`, `radius-card` (14px), `shadow-card`; `shadow-raised` only on hover.
- Dark `night` grounds only for marketing sections (Work, About).
- Real product screenshots in browser/phone frames — no stock illustrations.
- Focus: 2px `brand-400` outline, 2px offset. Reduced motion is respected everywhere.

## The contact form

The brief builder has three steps: services, then budget and timing, then the client's details. Name, email and phone are required.

- **Send** posts the brief to a Google Apps Script web app. It adds a row to your Google Sheet, emails info@goeldesigns.com and emails the client a copy. Set it up once by following [google-apps-script/README.md](google-apps-script/README.md), then put the web app URL in `NEXT_PUBLIC_BRIEF_ENDPOINT` (see `.env.example`).
- **Send on WhatsApp** opens a chat with +91 9368207505 with the full brief filled in.
- If `NEXT_PUBLIC_BRIEF_ENDPOINT` is empty, **Send** opens the visitor's email app instead, so the form never dead-ends.
