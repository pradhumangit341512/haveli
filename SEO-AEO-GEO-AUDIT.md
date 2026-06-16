# SEO / AEO / GEO Audit — The Ummed Haveli

**Date:** 2026-06-15
**Scope:** Static audit of the Next.js codebase (metadata, structured data, sitemap/robots, content, assets). This is a **code/config audit** — items marked _[verify live]_ also need confirmation against the deployed site using Google Rich Results Test, PageSpeed Insights, and a social-card debugger.

---

## Scorecard

| Area | Grade | One-line |
|------|:-----:|----------|
| **SEO** (classic search) | **C+** | Strong metadata & homepage schema, but a canonical bug, missing OG/logo images, and 19 MB hero images undercut it. |
| **AEO** (answer engines / rich results) | **B-** | Excellent FAQ schema; weakened by unbacked aggregateRating and no Article/Room/Breadcrumb markup on subpages. |
| **GEO** (generative / AI search) | **C** | Clean entity facts (NAP, sameAs, FAQ) are citeable, but no `llms.txt`, missing entity images, and thin per-page structured data. |

---

## What's already good ✅

- **Homepage structured data**: Hotel, Restaurant, FAQPage, BreadcrumbList, Organization JSON-LD all injected (`src/app/page.tsx`).
- **NAP consistency**: name / address / phone identical across `schema.ts`, `manifest.json`, metadata — strong local + GEO signal.
- **Geo meta tags**: `geo.region`, `geo.position`, `ICBM` set (`layout.tsx:50-54`).
- **FAQ content** (`src/data/faq.ts`): 10 natural-language, entity-rich Q&As — ideal AEO/voice fodder, and wired into `faqSchema`.
- **Dynamic sitemap & robots** (`sitemap.ts`, `robots.ts`): includes room + blog routes, disallows `/admin` and `/api`.
- **Semantic headings**: one `<h1>` per page, section `<h2>`s with `id`/`aria-labelledby`.
- **Entity authority**: `Organization.sameAs` links Instagram/Facebook/YouTube (`schema.ts:127-131`).
- **Mobile/PWA basics**: viewport, theme-color, manifest present.

---

## SEO findings

| # | Sev | Issue | Evidence | Fix |
|---|-----|-------|----------|-----|
| S1 | 🔴 High | **Canonical points every page at the homepage.** Root sets `alternates.canonical = ".../"`; subpages (`/rooms`, `/offers`, `/blog`, `/blog/[slug]`, `/rooms/[slug]`) don't override, so Next merges the root canonical onto them. Search engines may de-index the real URLs. | `layout.tsx:22-24`; no `alternates` in `offers/page.tsx`, `rooms/page.tsx`, `blog/[slug]` & `rooms/[slug]` `generateMetadata` | Set a per-page `alternates.canonical` to each page's own URL. |
| S2 | 🔴 High | **All social/share & schema images are missing (404).** Only `favicon.ico` exists in `public/`. `og-image.jpg`, `logo.png`, `exterior-day.jpg`, `royal-deluxe-room.jpg`, `rooftop-restaurant.jpg` are referenced but absent. Broken OG/Twitter cards; no images in rich results; no Knowledge-Panel logo. _[verify live]_ | `layout.tsx:33,48`; `schema.ts:14-18,126` | Add the real assets to `public/` (or `public/images/`) and/or repoint to existing photos (e.g. `/room2.JPG`). Generate a 1200×630 `og-image`. |
| S3 | 🔴 High | **Hero room images are ~19 MB each** (`/room2.JPG`, `/room3.JPG`), and the homepage rooms grid uses raw `<img>` (not `next/image`). This will wreck LCP / Core Web Vitals → ranking drag. _[verify live]_ | `data/rooms.ts`, `data/rooms-detailed.ts`; `components/rooms/Rooms.tsx:21` | Compress to web sizes (~150-400 KB, WebP/AVIF) and serve via `next/image`. |
| S4 | 🟠 Med | **No `metadataBase`.** Triggers a Next build warning and makes any relative OG/metadata URL resolve incorrectly. | `layout.tsx` (absent) | Add `metadataBase: new URL("https://www.theummedhaveli.com")`. |
| S5 | 🟠 Med | **Hindi content is client-side toggle only** — no localized URLs or `hreflang`. Only English is indexable despite full `translations.ts`. | `LanguageProvider`, `data/translations.ts` | If Hindi SEO matters, expose `/hi` routes + `alternates.languages`; otherwise accept English-only indexing. |
| S6 | 🟡 Low | **Manifest ships only `favicon.ico`** — no 192/512 PNG or apple-touch icons. Weak install/_home-screen_ presentation. | `manifest.json:10-12`; `layout.tsx:57-64` | Add `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`. |
| S7 | 🟡 Low | `keywords` meta is ignored by Google (harmless); Twitter card has no `site`/`creator` handle. | `layout.tsx:12-13,43-49` | Optional cleanup; add `twitter.site` if a handle exists. |

---

## AEO findings (answer engines, featured snippets, voice)

| # | Sev | Issue | Evidence | Fix |
|---|-----|-------|----------|-----|
| A1 | 🟠 Med | **`aggregateRating` (4.8 / 52) is not backed by on-page `Review` markup**, and the 3 visible testimonials carry no schema. Google requires the rating to correspond to visible, marked-up reviews — risk of being ignored or a structured-data manual action. | `schema.ts:51-57`; `data/testimonials.ts`; `components/testimonials/Testimonials.tsx` | Add `Review` objects (matching the visible testimonials) to the Hotel schema, and make `reviewCount` reflect reality. |
| A2 | 🟠 Med | **No `Article`/`BlogPosting` schema on blog posts.** Blogs are prime AEO/featured-snippet content but expose no structured data, author, or `datePublished`. | `app/blog/[slug]/page.tsx:15-23` | Emit `BlogPosting` JSON-LD per post (headline, author=Organization, datePublished, image). |
| A3 | 🟠 Med | **No `BreadcrumbList` on subpages.** Only the homepage has breadcrumbs, so room/blog/offers pages miss breadcrumb rich results. | only `app/page.tsx:44-45` | Add per-page breadcrumb JSON-LD. |
| A4 | 🟡 Low | **FAQ content contradicts the "no room rates" decision.** Several answers still reference rates/discounts ("block rates", "discounted prices", "corporate rate packages"), and FAQ still lists **City Palace** as nearby though it was removed from Explore. | `data/faq.ts:18,26,34,38` | Reword rate-bearing answers to "contact for rates"; decide whether City Palace should remain a "nearby attraction" fact (it's still factually true). |
| A5 | 🟢 Win | FAQPage schema is present and high quality — keep it. Consider adding `speakable` for voice. | `schema.ts:95-106` | Optional: add `speakable` to key answers. |

---

## GEO findings (ChatGPT, Perplexity, Google AI Overviews)

| # | Sev | Issue | Evidence | Fix |
|---|-----|-------|----------|-----|
| G1 | 🟠 Med | **No `llms.txt`.** Generative engines increasingly read `/llms.txt` for a clean, authoritative summary of the entity (what/where/contact/offerings). | `public/` (absent) | Add `public/llms.txt`: hotel description, location, contact, room types, facilities, nearby landmarks, booking links. |
| G2 | 🟠 Med | **Entity images missing** (same as S2). LLM answer cards and Knowledge Graph entries need a working logo + hero image. | `schema.ts:14-18,126` | Ship real, resolvable image URLs. |
| G3 | 🟠 Med | **Per-page facts aren't machine-extractable.** Room pages have rich prose but no `HotelRoom`/`Product` schema (bed type, occupancy, size, amenities). LLMs must infer rather than read facts. | `app/rooms/[slug]/page.tsx`; `data/rooms-detailed.ts` | Add `HotelRoom`/`Product` JSON-LD per room (occupancy, bed, size, amenityFeature). |
| G4 | 🟡 Low | **Content/inventory consistency.** Hero + Hotel schema + manifest say **"21 royal rooms"** while the site now presents **2 room types**. LLMs may surface conflicting counts. | `hero/Hero.tsx`, `schema.ts:10,38`, `manifest.json:4`, `layout.tsx` | Decide the canonical story (21 physical rooms across 2 types?) and state it consistently. |
| G5 | 🟢 Win | Clear NAP, `sameAs`, factual FAQ, and consistent entity naming are strong citeable signals — maintain them. | `schema.ts` | — |

---

## Prioritized action plan

**Do first (high impact, ranking/visibility blockers):**
1. **S2/G2** — Add the missing OG, logo, and schema images (or repoint to existing photos). _Nothing renders a share card or schema image today._
2. **S1** — Add per-page canonical URLs.
3. **S3** — Compress the 19 MB room photos and serve through `next/image`.
4. **S4** — Add `metadataBase`.

**Do next (rich results + AI extractability):**
5. **A1** — Back `aggregateRating` with real `Review` markup or remove the unverifiable rating.
6. **A2 / A3 / G3** — Add `BlogPosting`, per-page `BreadcrumbList`, and `HotelRoom` schema.
7. **G1** — Publish `llms.txt`.

**Polish:**
8. **A4 / G4** — Reconcile FAQ rate wording, City Palace mention, and the "21 rooms vs 2 types" count.
9. **S5 / S6 / S7** — hreflang strategy (if Hindi matters), real PWA icons, minor meta cleanup.

---

## How to verify against live tools (after deploy)
- **Rich Results / schema**: Google Rich Results Test + Schema Markup Validator on `/`, a room page, a blog post.
- **Core Web Vitals (S3)**: PageSpeed Insights / Lighthouse — watch LCP on `/` and `/rooms`.
- **Canonicals (S1)**: View source / URL Inspection in Search Console — confirm each URL is self-canonical.
- **Social cards (S2)**: Facebook Sharing Debugger + X Card Validator — confirm the OG image loads.
- **Indexing**: Search Console Coverage + submit `sitemap.xml`.
