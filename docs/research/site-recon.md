# Site Recon — Xponential + Pure Barre + StretchLab

_Compiled by @gumshoe, 2026-05-13_

This file captures the raw findings from the first-pass site recon. The actionable plan lives in `/plans/scrape-plan-v1.md`.

---

## Common platform: HubSpot CMS Hub

All three sites are confirmed HubSpot CMS. This is the single most important technical fact for the scrape strategy.

| Site | HubSpot Portal ID | CDN |
|---|---|---|
| xponential.com | (unknown — uses /hubfs/ proxy) | www.xponential.com/hubfs/cli-assets/... |
| purebarre.com | **4194181** | 4194181.fs1.hubspotusercontent-na1.net |
| stretchlab.com | **4478314** | 4478314.fs1.hubspotusercontent-na1.net |

**Implications:**
- Nav and footer are loaded via client-side HubSpot modules (`hs_cos_wrapper_module_*`). Static HTML fetches return empty wrappers. **Must use a JS-rendering crawler** (Crawl4AI with Playwright/headless Chromium) to capture nav + footer.
- Body content IS in the static HTML — defuddle/web_fetch works fine for page bodies.
- Assets are hosted on HubSpot's CDN with predictable patterns (`/hubfs/{portal-id}/...`) and pre-rendered responsive variants (Desktop/Tablet/Mobile, sized suffixes like _1100x800, _1000x600, _405x570).
- If @allanwhite can get a HubSpot CMS API key for any of these portals, we could pull structured content directly (pages, blog posts, HubDB tables) instead of HTML scraping. **This is the cleanest path** — worth asking.
- All three sites share identical robots.txt patterns (HubSpot defaults) — no sitemap declared in robots.txt, but `/sitemap.xml` exists on each.

## Sitemaps

| Site | URL | Total URLs | Notes |
|---|---|---|---|
| xponential.com | /sitemap.xml | 55+ (truncated in fetch) | Flat urlset. Heavy on franchising/sales-rep landing pages, leadership bios, "acquire-a-{brand}-{state}" resale pages, refer-a-friend pages. Marketing content is concentrated on / and /our-brands. |
| purebarre.com | /sitemap.xml | **~490** | 39 main pages + **450+ studio locations** (`/location/{city-region-state}`). |
| stretchlab.com | /sitemap.xml | **~480** | 36 main pages + 24 regional hubs (`/regional/{metro}`) + **420+ studio locations** (`/location/{slug}`). |

Both sub-brands also have separate blog subdomains: `blog.purebarre.com` and `blog.stretchlab.com`. Xponential's newsroom is `blog.xponential.com/newsroom`.

---

## xponential.com — Content Inventory

**Role:** Corporate/parent site. Curator brand for 5 boutique fitness brands. Franchise-led business model.

### Homepage sections
1. Hero — autoplay video (`2025_xpohomesizzle.mp4`), tagline "Recognized as the best, by the best."
2. Press/recognition strip — LA Times, MSNBC, Women's/Men's Health, Entrepreneur Franchise 500 badges (x6)
3. Brand carousel — 5 brand cards
4. The Experiences — 3 blocks: In-Studio / XPLUS / Corporate Wellness
5. Own a Studio — franchise CTA with studio interior/exterior imagery
6. Latest News — 3 article teasers from blog.xponential.com/newsroom
7. Footer tagline: "A Curator of Leading Health & Wellness Brands"

### /our-brands — 5 brand entries
Each entry has: hero JPG, card logo SVG, modal logo SVG (different file), name, description (~3-5 sentences), external "Learn More" URL.

| Brand | Hero | External site |
|---|---|---|
| Club Pilates | clubpilates.jpg | https://clubpilates.com/ |
| YogaSix | yogasix.jpg | https://www.yogasix.com/ |
| BFT (Body Fit Training) | bft.jpg | https://bodyfittraining.com/ |
| Pure Barre | purebarre.jpg | https://www.purebarre.com/ |
| StretchLab | stretchlab.jpg | https://www.stretchlab.com/ |

Card/modal asset paths:
- Card hero: `/hubfs/cli-assets/images/franchising/xponential-brands/{slug}.jpg`
- Card logo: `/hubfs/cli-assets/images/franchising/xponential-brands/logos/{slug}.svg`
- Modal logo: `/hubfs/cli-assets/images/main-page/brands-logo/{slug}.svg`

### Other notable page clusters (from sitemap)
- **Experiences:** /in-studio, /plus, /plus/liveshows, /xplusandxpass, /plans-xpass, /corporate-wellness
- **Franchising:** /franchising, /own-a-xpo-franchise, /realestate, /acquire-a-{brand}-{state} (multiple)
- **Leadership:** /leadership/{name} — Gavin O'Connor, Tim Weiderhoft, Andrew Hagopian, Fabienne Lopez
- **XPros (ambassador program):** /go/xpros/{name} — 13+ profiles
- **Newsroom:** /newsroom-company-info, /newsroom-media-kit, /newsroom-brand-guidelines + blog.xponential.com/newsroom (articles live here)
- **Influencer:** /xfluencer-overview, /xfluencer-sign-up, /xfluencer-spotlight
- **Legal:** /privacy-policy, /terms-of-use, /privacy_choices, /ccpa_request_form, /fran-terms, /promo-terms

### Related domains
- blog.xponential.com — newsroom (active articles)
- xponential.plus — XPLUS streaming product (separate property)
- investor.xponential.com — IR
- partners.xponential.com — digital partner marketplace

---

## purebarre.com — Content Inventory

**Role:** Sub-brand site. Largest barre franchise. 4 class formats.

### Homepage sections
1. Hero — "The Best Full Body Workout" + free-class CTA. Responsive images Desktop/Tablet/Mobile variants.
2. Free class promo banner
3. "Pure Barre Beginner" — embedded video (`2023_ExperiencePureBarre_Horizontal.mp4`)
4. Mobile app download (Google Play + App Store badges, device mockup)
5. "Small Movements. Full Body Benefits." — workout philosophy
6. Find a Location — studio search teaser
7. HSA/FSA promo via Truemed
8. Beginner onboarding teaser → /new-to-barre
9. Our Barre Classes — 4 cards (Classic, Align, Empower, Define), each with name, duration, description, image
10. Member Testimonials — 4 portraits (Dominique C., Sallie D., Karla C., Denise P.)

### Class formats (4)
- **Pure Barre Classic™** — 50 min, low-impact, original barre
- **Pure Barre Align™** — 50 min, strength + flexibility, restorative flows
- **Pure Barre Empower™** — 45 min, barre + HIIT, ankle weights/plyo platform
- **Pure Barre Define™** — 50 min, barre + dumbbell strength training

Each has a dedicated detail page: /pure-barre, /pure-barre-align, /pure-empower, /pure-barre-define (plus /class-formats overview).

### Main page clusters
- Getting started: /new-to-barre, /expectations, /free-class
- Classes: /class-formats, /pure-barre, /pure-barre-align, /pure-barre-define, /pure-empower
- Locations: /location, /location-search, /regional, /international, **/location/{city-region-state} × 450+**
- Corporate: /about, /careers, /press, /corporate-wellness, /safety
- Membership features: /classpoints, /apple-watch-app, /earn-your-watch-faq, /earn-your-watch-locations
- Franchise: /franchise, /franchise-faq, /franchise-form, /franchise-process, /franchisee-experience, /franchise-international-opportunities, /international-franchise-form
- Legal: /privacy-policy, /terms, /cookies-policy, /privacy-notice-for-california-residents, /go-license-agreement, /terms-earn-your-watch

### Blog
`blog.purebarre.com` — separate subdomain. Themes: women's health (menopause/pregnancy/pelvic floor), workouts, nutrition, partnerships, member stories. Active. Posts dating from 2015 (legacy on main domain at /blog/, currently archived).

### Integrations
- ClubReady — booking/studio management (links to lp.purebarre.com/try with `clubready_referraltypeid`)
- Truemed — HSA/FSA partner
- Mobile apps: iOS (id1472033168) + Android (com.xponential.purebarre)

---

## stretchlab.com — Content Inventory

**Role:** Sub-brand site. Assisted stretching, 1:1 with "Flexologists®". 500+ studios.

### Homepage sections
1. Promo banner — ~30% HSA/FSA savings via Truemed
2. Hero — "One-on-One Assisted Stretching — Guided by Experts. Designed for Life." with Try CTA. Hero image `FINAL_StretchLab_Hero.jpg`.
3. All Access promo (new membership tier)
4. Intro offer — up to 50% off 50-min intro stretch
5. Tabbed info block — 3 tabs: Why Stretch / Benefits / First Timers (link to /stretches, /benefits, /first-timers)
6. Expert-led individualized services
7. App download section
8. The StretchLab Standard — mission/values
9. Member Testimonials — **10 portrait images** with diverse subject types (yoga, CrossFit, dancers, golfers, runners, etc.)
10. Studio finder
11. Social follow prompt

### Services
- **One-on-One Stretch** — 25-min and 50-min sessions with certified Flexologists®
- **Group Stretch Sessions** — select studios
- **Normatec™ Compression Therapy** — pneumatic compression for recovery (1 free for members)
- **All Access Membership** — new nationwide tier
- **Intro Offer** — discounted first session
- **Mobile app** — booking + rewards (ClassPoints)

### Main page clusters
- Core: /, /about, /benefits, /stretches, /first-timers, /contact, /careers
- Services: /maps (MAPS body assessment), /normatec, /apple-watch-app, /classpoints, /flexologist-training-program, /stretchlab-ffs
- Locations: /location, /location-search, **/regional/{metro} × 24**, **/location/{slug} × 420+**
- Franchise: /franchise, /franchise/international-opportunity, /franchise-form, /franchise-form-intl, /international
- Content: /press-releases, /downloads, `blog.stretchlab.com` (separate subdomain, paginated, author pages exist)
- Legal: /privacy, /terms, /liability-waiver, /cookie-policy, /covid, /privacy-notice-for-california-residents

### Studio pages — content structure (rich, ~13 sections)
1. Welcome banner with studio name
2. First-time vs returning CTAs
3. Intro offer (price varies by studio, e.g. "$69 for first 50-min stretch")
4. Studio contact (address, phone, email)
5. Google Maps embed
6. Reviews carousel
7. Schedule (1:1 stretches, add-ons)
8. Membership & packages (prices vary by studio)
9. Tabbed info (Why Stretch / Benefits / What to Expect)
10. Flexologist staff bios with photos
11. Service descriptions
12. Referral program info
13. Social follow

Booking: `members.stretchlab.com/simple-book/classes?location_id={slug}`

### Integrations
- ClubReady (booking)
- Truemed (HSA/FSA)
- Mobile apps: iOS (id1484392665) + Android (com.xponential.stretchlab)
- members.stretchlab.com — member portal

---

## Asset patterns (consolidated)

### Image variants
HubSpot pre-renders responsive variants. Common patterns spotted:
- Suffixes: `_Desktop`, `_Tablet`, `_Mobile`
- Sized: `_1100x800`, `_1000x600`, `_405x570`, `_1040x585`, `_1600x600`, `_800x400`, `_480x360`
- Formats: .jpg, .webp (newer), .png (icons, badges), .svg (logos), .mp4 (hero videos)

### Sample asset URL templates
- Direct CDN: `https://{portal-id}.fs1.hubspotusercontent-na1.net/hubfs/{portal-id}/{path}`
- Proxied through site: `https://www.{brand}.com/hubfs/{path}`
- HubSpot dynamic resize: `https://www.{brand}.com/hs-fs/hubfs/{path}?width=W&height=H&name={filename}`

### Estimated asset volume (excluding studio location pages)
- xponential.com: ~30–50 images/videos for main marketing pages
- purebarre.com (main pages only): ~40–80 assets
- stretchlab.com (main pages only): ~50–100 assets (10 testimonials alone)
- **With studio pages:** explode by ~5-10 images per studio × 420-450 studios → potentially 2k–5k assets per sub-brand

