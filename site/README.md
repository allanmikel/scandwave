# ScandWave Energy — Flagship web experience

Deep-tech, research-based wave energy. Public landing experience for
**Scand Wave Energy AB** (org.nr 559532-7338). Built as a continuous
scroll-driven narrative — not a stack of sections.

---

## Stack

| Layer            | Tech                                             |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 16 (App Router, Turbopack)               |
| Language         | TypeScript (strict)                              |
| Styling          | Tailwind CSS v4 + custom design tokens           |
| Typography       | Fraunces (display) + Geist (sans & mono)         |
| 3D / WebGL       | React Three Fiber + Three.js + custom GLSL       |
| Scroll / motion  | Lenis (smooth scroll) + Framer Motion + GSAP     |
| i18n             | Native App-Router dictionary pattern (SV · EN)   |
| Routing proxy    | `proxy.ts` (Next 16 replacement for middleware)  |
| Deployment       | Vercel (zero-config)                             |

---

## Experience structure

Eight scenes, one continuous narrative. The WebGL ocean backdrop is global
and reacts to scroll progress, chaos and organised-flow signals.

1. **Entry** — immersion, first statement
2. **Resistance** — the unsolved problem
3. **Shift** — the insight
4. **Innovation** — the concept, with embedded CFD simulations
5. **Foundation** — published research (Polish Maritime Research, 2024)
6. **Roadmap** — five-stage development phase
7. **Partnership** — consortium invitation
8. **Closing** — quiet, stills → contact

---

## Local development

```bash
npm install
npm run dev     # http://localhost:3000 — redirects to /sv or /en
npm run build   # production build
npm run start   # serve the build
```

Node ≥ 20 recommended.

---

## Content

Copy lives in `dictionaries/sv.json` and `dictionaries/en.json`.

Routes:

- `/sv` — Swedish (default)
- `/en` — English
- `/` — redirects via `proxy.ts` using the `Accept-Language` header

---

## Media

Source assets from the research project live in `public/media/`:

| File                      | Purpose                                 |
| ------------------------- | --------------------------------------- |
| `symmetrywave.mp4`        | Primary CFD hydrodynamic field clip     |
| `p-field.mp4`             | Pressure distribution                   |
| `v-field.mp4`             | Velocity profile                        |
| `p-tunnel.mp4`            | Tunnel section                          |
| `p-outlet.mp4`            | Outlet detail                           |
| `wave.mp4`                | Wave field (reserved)                   |
| `fig-1.jpg` … `fig-3.jpg` | Research figures                        |
| `scandwave-research.pdf`  | Open-access PDF of the research article |

Swap any file in place — filenames are referenced explicitly in the scenes.

---

## WebGL ocean

`components/canvas/Ocean.tsx` renders a custom Gerstner-wave shader with
value-noise chop. It reads three signals from the scroll engine:

- `uScrollProgress` — overall scroll 0 → 1
- `uChaos` — bell curve peaking during the "resistance" scene
- `uFlow` — rises during innovation/roadmap, decays toward closing

`prefers-reduced-motion` substantially dampens wave amplitude.

---

## SEO · structured data

- `app/sitemap.ts` — locale-aware sitemap with hreflang alternates
- `app/robots.ts` — standard allow-all
- `app/opengraph-image.tsx` — generated 1200×630 OG card
- `app/icon.tsx` — generated 32×32 favicon (wave mark)
- `components/system/JsonLd.tsx` — emits `Organization` and
  `ScholarlyArticle` JSON-LD for funders / search

---

## Deploy (Vercel)

Push to a Git remote linked to Vercel. Next 16 auto-detected.

Custom domain via **one.com**:

1. In Vercel: add domain `scandwave.com` and `www.scandwave.com`
2. On one.com DNS, add:
   - `A` @ → `76.76.21.21`
   - `CNAME` www → `cname.vercel-dns.com`
3. Vercel provisions TLS automatically

---

## Contact

- Project lead · partnerships: **Sargon Orahim** — sargon@orahim.io
- CEO: **Jakob Kabrial** — +46 70 497 15 76
