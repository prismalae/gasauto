# GAS AUTO — Range Rover & German Car Specialist, Sharjah

Marketing site for **G.A.S AUTO GARAGE**, Sharjah. Next.js 15 (App Router) ·
Tailwind v4 · Motion · TypeScript. Every route is statically prerendered.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static build, 39 prerendered routes
npm start            # serve the production build
```

---

## The one thing to understand before editing

The site is built around **two clearly separated brand families**, and that
separation is structural, not a copywriting preference:

| Family | Marques | Hub page |
|---|---|---|
| **British 4x4** — the core specialty | Range Rover, Land Rover | `/range-rover-specialist-sharjah` |
| **German** — the wider coverage | Mercedes-Benz, BMW, Audi, Porsche, Volkswagen, MINI | `/german-car-repair-sharjah` |

Range Rover and Land Rover are **British** marques. MINI is a British marque
running **BMW Group** engineering, which is why it is grouped with the German
cars and says so on its page. Nothing on the site may describe a British marque
as German — customers spot it instantly.

This is enforced in three places, so it cannot drift:

1. **`Brand.family`** in [`content/brands.ts`](content/brands.ts) drives the
   origin badge, the grouping, the breadcrumb and the hub link.
2. **`brandsByFamily()`** in [`lib/utils.ts`](lib/utils.ts) is the *only* way
   components read the brand list — the header dropdown, home grid, footer,
   service pages, booking form and both hubs all group identically by
   construction.
3. **`npm run check:families`** walks the built HTML and fails if any marque
   renders with the wrong origin badge, if a German group appears above the
   British one, or if MINI loses its origin note.

Adding a marque is a data edit in `content/brands.ts` — no new components.

---

## Content lives in data files

| File | What it holds |
|---|---|
| [`config/site.ts`](config/site.ts) | **Every business detail.** Phone, address, hours, coordinates, map links. Change it here and the whole site, schema.org markup and sitemap follow. |
| [`content/brands.ts`](content/brands.ts) | The 8 marque pages — copy, common faults, models, FAQs, family. |
| [`content/services.ts`](content/services.ts) | The 9 service pages — symptoms, inclusions, body copy, which marques they apply to. |
| [`content/posts.ts`](content/posts.ts) | Blog articles. |
| [`content/areas.ts`](content/areas.ts) | Emirates and Sharjah districts for coverage + `areaServed` schema. |
| [`content/faqs.ts`](content/faqs.ts) | Home and pickup FAQs (wired to FAQPage schema). |
| [`content/media.ts`](content/media.ts) | Photos and video clips — paths, alt text, intrinsic dimensions, and which photo appears on which brand/service page. |
| [`content/testimonials.ts`](content/testimonials.ts) | **Empty on purpose** — see below. |
| [`content/seo-map.ts`](content/seo-map.ts) | One primary keyword per route, guarded against cannibalisation. |

---

## Before you deploy

```bash
npm run check:placeholders
```

Anything marked `TODO_CLIENT` is unconfirmed. Currently outstanding:

- `legalName` — the exact trade-licence name
- `email` — not listed on the Google profile
- `domain` — the production origin (used for canonicals, sitemap, schema `@id`s)
- Social links (Instagram / Facebook / TikTok)
- The three hero stats: years in business, vehicles serviced, warranty period

Contact details, address, coordinates, map links and opening hours are already
filled in from the live Google Business Profile.

### Two things deliberately left empty

**Testimonials.** `content/testimonials.ts` is an empty array and the section
hides itself in production. Invented reviews attributed to named people are
fabricated endorsements. Paste real Google reviews in and the section appears
automatically.

**`aggregateRating` schema.** The real 4.0 / 9 reviews rating is shown as plain
text on `/contact` linking to the listing, but is *not* emitted as structured
data. Self-serving review markup on your own LocalBusiness page breaches
Google's guidelines and risks a manual action — let Google pull the rating from
the profile itself.

### Enabling the booking form

The `/book` form posts to a Server Action. Until mail is configured it returns
an explicit "not connected" state and shows the caller the phone and WhatsApp
fallbacks — it never reports success for a lead that was dropped. To enable:

```bash
# .env.local
RESEND_API_KEY=re_...
BOOKING_TO_EMAIL=bookings@yourdomain.ae
BOOKING_FROM_EMAIL=bookings@yourdomain.ae   # must be a verified sender
```

### After launch

Add the live domain to the Google Business Profile — it currently has no
website, and that link is one of the strongest local ranking signals available.

---

## Media

All photography and video is real footage of the Sharjah workshop — no stock.

- **Originals** live in [`media-source/`](media-source), deliberately *outside*
  `public/`. Anything under `public/` is served publicly and ships on every
  deploy, and the originals total ~47MB against ~5MB of derived files.
- **Web versions** are in `public/media`: long edge capped, quality 82,
  progressive JPEG. `next/image` serves AVIF/WebP from them per request.
- **Clips** are muted, looping and `playsInline`. Nothing downloads until the
  element is near the viewport (`preload="none"` + IntersectionObserver), so
  four clips on the home page cost nothing on first load. Poster frames were
  extracted from the videos themselves. Under reduced motion no video is created
  at all — the poster renders as a plain image.

To swap any image, change the entry in `content/media.ts` — every page reads
from there, and `npm run check:media` verifies the files exist and that the
recorded dimensions match (stale dimensions cause layout shift).

> **Do not add a `sharp` override to package.json.** Next 15.5's image optimizer
> requires `sharp@^0.34.3`; forcing a newer major makes every `/_next/image`
> request return 400 and silently breaks all photography.

---

## Verification

```bash
npm run check            # SEO map + family split + structured data
npm run check:layout     # 32 routes at 375px and 1280px
npm run check:motion     # reduced-motion and no-JS fallbacks
```

`check:layout` and `check:motion` drive a real browser and need Puppeteer, which
is **not** a dependency — its Chrome downloader pulls in an unpatched advisory.
Install it only when running them, and run them against a production server:

```bash
npm run build && npm start          # terminal 1
npm i --no-save puppeteer           # terminal 2
node scripts/check-layout.mjs http://localhost:3000
node scripts/check-motion.mjs http://localhost:3000
```

> Dev and build use separate output directories (`npm run dev` writes to
> `.next-dev`; `next build` keeps the default `.next`, which is what deploy
> platforms like Vercel expect), so running one never corrupts the other.

| Script | Asserts |
|---|---|
| `check:placeholders` | No `TODO_CLIENT` value ships inside LocalBusiness schema |
| `check:seo` | Every route mapped; no two share a primary keyword |
| `check:families` | Correct origin badge on all 93 marque renders; group order; MINI's note |
| `check:schema` | All JSON-LD parses; `@id` references resolve; no marque misattributed |
| `check:layout` | No horizontal scroll, exactly one `<h1>`, no console errors, sticky bar clears the footer |
| `check:motion` | Reduced-motion users see everything instantly; content visible without JS |
| `check:media` | Every referenced photo and clip exists; `public/media` stays under 12MB; no raw originals under `public/` |

---

## Design system

Colours are sampled from the client logo — deep green field, chrome bevel,
bright green gloss. Tokens live in [`app/globals.css`](app/globals.css):

| Token | Hex | Role |
|---|---|---|
| `--color-gas-black` | `#04100a` | Page base |
| `--color-gas-forest` | `#00300c` | Logo field |
| `--color-gas-brand` | `#00a537` | Primary CTA |
| `--color-gas-neon` | `#33fa3d` | Accent, hover, focus ring |
| `--color-chrome-hi/mid/lo` | `#e4e4f0` → `#7a7f8b` | Chrome text and hairlines |

`.text-chrome` declares a solid colour *before* the gradient, so headings never
render invisible if `background-clip: text` is unsupported.

**Motion.** Shared variants in [`lib/motion.ts`](lib/motion.ts). Every reveal is
wrapped in `useReducedMotion()`, and a CSS rule forces `[data-reveal]` visible
under `prefers-reduced-motion: reduce` — the server cannot know the preference,
so the stylesheet guarantees it regardless of what the JS does. A `<noscript>`
rule does the same when JS is unavailable. No reveal wraps the hero, so the LCP
text is never hidden.
