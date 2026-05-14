# Block / Section Variant Inventory

_For @architecton, supporting `/specs/schema-v1.md`. — @gumshoe, 2026-05-13_

Every distinct page-section pattern I've seen across xponential.com, purebarre.com, and stretchlab.com. Use this to compose Sanity block types without re-deriving from the recon.

**Legend:** ⭐ = on multiple sites (good reuse candidate), 🅢 = single-site.

---

## Hero variants

| Variant | Used by | Fields |
|---|---|---|
| **`heroVideo`** ⭐ | xpo (homepage 2025_xpohomesizzle.mp4), SL (/benefits Benefits Hero.mp4), PB (Experience Pure Barre video embed) | bgVideo (mp4), poster, eyebrow, headline, subhead, primaryCta, secondaryCta? |
| **`heroImage`** ⭐ | PB homepage (3 responsive variants), SL homepage (FINAL_StretchLab_Hero.jpg), most class/service detail pages | bgImage (canonical), eyebrow, headline, subhead, primaryCta, secondaryCta? |
| **`heroSplit`** 🅢 | xpo /our-brands (image + heading + CTA stacked) | image, eyebrow, headline, body, cta |
| **`pageHeader`** ⭐ | SL /stretches, /benefits headers (smaller banner above content), PB class detail pages | image OR videoBg, title, subtitle |

## Brand & portfolio blocks

| Variant | Used by | Fields |
|---|---|---|
| **`brandGrid`** ⭐ | xpo homepage (carousel), xpo /our-brands (grid + modal) | title?, layout (`carousel` \| `grid`), brandRefs[] (refs to `brand` docs), showCount? |
| **`brandCard`** | embedded inside brandGrid | brandRef, heroImage override?, layout (`portrait` \| `landscape`) |
| **`brandModal`** 🅢 | xpo /our-brands (click brand → modal) | UI behavior; data comes from brand ref |

## Class / service blocks

| Variant | Used by | Fields |
|---|---|---|
| **`classGrid`** 🅢 | PB homepage "Our Barre Classes" (4 cards) | title, body, items[] → ref to `classFormat` |
| **`classCard`** | inside classGrid | classFormatRef, image override?, badge? |
| **`serviceGrid`** 🅢 | SL /stretches (1:1 vs Group), homepage "Expert-Led Services" | title, body, items[] → ref to `service` |
| **`serviceDetail`** ⭐ | PB class detail pages, SL /stretches detail sections | title, duration, image, body, cta |

## Testimonial blocks

| Variant | Used by | Fields |
|---|---|---|
| **`testimonialCarousel`** ⭐ | SL homepage (10 portraits), PB homepage (4 portraits) | title, body?, items[] → ref to `testimonial` (or embedded?) |
| **`testimonialCard`** | inside carousel | name, location?, portrait, quote, attribution?, brandRef? |
| **`testimonialDetail`** 🅢 | SL "Mason Mauer" style blog post features | full-length variant with hero image + extended body |

## CTA / promo blocks

| Variant | Used by | Fields |
|---|---|---|
| **`ctaBanner`** ⭐ | All sites (Truemed HSA/FSA promo, Free Class promo, Intro Offer) | bg (color or image), eyebrow, headline, body?, primaryCta, secondaryCta?, partnerLogoRef? |
| **`promoStrip`** ⭐ | top-of-page slim banners | text, cta, dismissible? |
| **`appDownload`** ⭐ | PB homepage, SL homepage, /first-timers | title, body, deviceMockupImage, appStoreLink, playStoreLink |
| **`partnerStrip`** 🅢 | xpo press recognition strip (LA Times, MSNBC, Women's Health, Men's Health, Entrepreneur Franchise 500 badges) | title, logos[] → assets w/ alt + outbound URL? |

## Content blocks (body)

| Variant | Used by | Fields |
|---|---|---|
| **`richText`** ⭐ | everywhere | Portable Text (Sanity's standard block content with style overrides + custom annotations) |
| **`tabbedInfo`** ⭐ | SL homepage (Why Stretch / Benefits / First Timers), PB various | title, tabs[] (each tab: label, body, image?, cta?) |
| **`accordion / faqList`** ⭐ | PB /new-to-barre (9 FAQs), SL /first-timers (11 FAQs) | title, body?, items[] (question, answer-as-PortableText) |
| **`iconList`** 🅢 | SL /benefits (Improve Posture / Reduce Stress / etc., 5 PNG icons) | title?, body?, items[] (icon ref, label, body?) |
| **`statsBlock`** | seen on franchise pages | items[] (value, label, body?) |
| **`pullQuote`** | embedded in rich text | quote, attribution? |

## News & editorial

| Variant | Used by | Fields |
|---|---|---|
| **`postGrid`** ⭐ | xpo homepage "Latest News", blog index pages | title?, source (`auto` from `post` + filter, or curated refs[]), layout, showCount |
| **`postCard`** | inside grid | postRef, image override?, eyebrow? |
| **`featuredPost`** 🅢 | blog homepages | postRef, body override?, layout |
| **`pressList`** 🅢 | SL /press-releases, PB /press, xpo newsroom | items[] → `pressItem` (date, outlet, headline, excerpt, externalUrl) |

## Location / studio blocks

| Variant | Used by | Fields |
|---|---|---|
| **`locationFinder`** ⭐ | PB homepage, SL homepage | title, body, ctaToSearchPage, defaultLocation? (likely just a JS UI; no data) |
| **`studioCard`** | regional hubs, location search results | studioRef |
| **`mapEmbed`** | individual studio pages | studioRef (renders address + Google Maps embed) |

## People blocks

| Variant | Used by | Fields |
|---|---|---|
| **`personGrid`** ⭐ | xpo /leadership listing, studio flexologist staff | title?, body?, items[] → ref to `person` |
| **`personCard`** | inside grid + standalone bios | personRef, image override?, role override? |
| **`personBio`** | leadership detail pages | personRef (renders full bio) |

## Franchise-specific

| Variant | Used by | Fields |
|---|---|---|
| **`investmentSummary`** 🅢 | franchise pages (cash required / net worth / total investment) | items[] (label, value, footnote?) |
| **`franchiseAwards`** ⭐ | xpo homepage (6 Entrepreneur 500 badges), franchise pages | badges[] → assets w/ year + caption |
| **`processSteps`** 🅢 | PB /franchise-process | items[] (stepNumber, title, body, icon?) |

## Footer-adjacent / site-config

These probably belong on the `site` doc rather than the page:
- **`footer`** — multi-column links + legal strip + social icons (TBD per Phase 1 nav/footer extraction)
- **`navigation`** — primary nav + utility nav (TBD per Phase 1)
- **`socialLinks`** — likely on `site` or `brand`
- **`legalLinks`** — footer-level

---

## Recommended block grouping (suggested, you'll do better)

For composable `pageBuilder` arrays on the `page` document:
- **Heroes** (one of: heroVideo, heroImage, heroSplit, pageHeader)
- **Grids** (brandGrid, classGrid, serviceGrid, postGrid, personGrid)
- **Cards/Carousels** (testimonialCarousel, partnerStrip, franchiseAwards)
- **Body** (richText, tabbedInfo, accordion, iconList, statsBlock)
- **CTAs** (ctaBanner, appDownload, locationFinder, promoStrip)
- **Franchise-specific** (investmentSummary, processSteps) — may be its own optional group

---

## Things I'm NOT sure about (your call)

1. **Testimonial: ref or embedded?** PB has 4 reusable-feeling testimonials, SL has 10. They could be standalone `testimonial` docs (reusable across pages) OR embedded objects (simpler, but lose reuse). Lean toward refs — they're entities with their own metadata (person, location, brand).
2. **Class format / Service: site-scoped or brand-scoped?** PB class formats are intrinsic to the Pure Barre brand. If we ever ingest YogaSix later, their classes shouldn't bleed in. Probably **brand-scoped via brandRef**, not site-scoped.
3. **Press item: shared or per-site?** Xpo gets covered in press alongside its brands. A WSJ piece about "Xponential's growth" could legitimately appear on parent + Pure Barre + StretchLab sites. Lean toward **shared with `featuredOn: site[]` array**.
4. **Studio: how detailed?** Per @allanwhite scope is small + mockable. I'd model the full entity (address, phone, hours, staff refs, services-offered refs, pricing) so the schema is correct, but only populate 5–10 records.

Ping me on anything that needs clarification — I'm the one who looked at every page so I should be able to answer "what does the actual section look like" questions quickly.
