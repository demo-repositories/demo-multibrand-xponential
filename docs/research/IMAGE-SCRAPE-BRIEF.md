# Image scrape brief — @gumshoe

Owner: @janusdev
Created: 2026-05-13
Deadline: before Thursday demo (2026-05-14 afternoon US)

## Why

48 image fields on the Sanity dataset (project `7bgx7lr4`, `production`) are empty. The Studio at https://xponential-demo.sanity.studio renders the Presentation view as the demo surface, so empty hero panels look bad. @janusdev will write the upload+patch script. You acquire the files.

## Output

All files go under `/research/images/` on the channel board, organized by Sanity doc type. One file per Sanity doc.

```
/research/images/
  blog/<slug>.<ext>           # 10 files
  studio/<slug>.<ext>         # 10 files
  press/<slug>.<ext>          # 9 files
  brand/<slug>-logo.<ext>     # 5 files (modalLogo — bigger logos for headers/modals)
  classFormat/<slug>.<ext>    # 4 files
  service/<slug>.<ext>        # 2 files
  author/<slug>.<ext>         # 2 files
  site/<slug>-logo.<ext>      # 3 files
  site/<slug>-favicon.<ext>   # 3 files
```

Use the slugs exactly as listed below — these match the Sanity `_id` suffix patterns and the upload script keys off them. Keep original file extension (`.jpg`, `.png`, `.webp`, `.svg`).

Also produce one manifest at `/research/images/_manifest.json`:

```json
[
  {"docType":"blog","slug":"benefits-barre-longevity","file":"/research/images/blog/benefits-barre-longevity.jpg","source":"https://blog.purebarre.com/...","altText":"..."}
]
```

`altText` should be sensible alt text (1 short sentence). If you can pull it from the page's `<img alt>` or `og:image:alt`, use that; otherwise generate from the page H1.

## Priorities

Run in this order; if you run out of time, stop where you are.

### P0 — demo-critical (28 files)

The demo flow at `/demo-flow.md` puts these on screen:

1. **Brand cards on `/our-brands`** — already populated for 5 brands (heroImage + cardLogo present). **Skip — done.**
2. **5 brand modalLogo** — bigger logos for the brand modal/sub-brand header. Pull each brand's primary site logo:
   - `pure-barre` — purebarre.com header logo
   - `stretchlab` — stretchlab.com header logo
   - `club-pilates` — clubpilates.com header logo
   - `yogasix` — yogasix.com header logo
   - `bft` — bodyfittraining.com header logo
3. **10 studio heroImage** — from each studio page's hero/exterior image. Source URLs in `/research/studios/pb/<slug>.json` and `/research/studios/sl/<slug>.json` (field `source_url`). Pull the page's first non-logo image (typically a building or interior shot). Studios:
   - PB: `atlanta-buckhead-ga`, `austin-domain-tx`, `chicago-lincoln-park-il`, `denver-cherry-creek-co`, `san-diego-hillcrest-ca`
   - SL: `buckhead`, `cherrycreek`, `hillcrest`, `southloop`, `westlake`
4. **9 pressItem heroImage** — from each press release page. Pull the og:image (most reliable for press pages). Source URLs:
   - `bilt-partnership-renewal` → https://blog.xponential.com/newsroom/xponential-bilt-partnership-renewal
   - `mexico-japan-expansion` → https://blog.xponential.com/newsroom/xponential-fitness-brands-expand-to-mexico-and-japan
   - `japan-pure-barre-yogasix` → https://blog.xponential.com/newsroom/xponential-fitness-fuels-japan-expansion-with-master-franchise-agreement-for-pure-barre-and-yogasix
   - `pb-platinum-barre-challenge` → https://blog.xponential.com/newsroom/pure-barre-launches-platinum-barre-first-10-challenge
   - `pb-sarah-luna-president` → https://blog.xponential.com/newsroom/xponential-fitness-taps-pure-barres-sarah-luna-as-president
   - `pb-heart-health-month` → https://blog.xponential.com/newsroom/pulse-with-pure-barre-in-celebration-of-heart-health-month
   - `sl-canada-debut` → https://blog.xponential.com/newsroom/stretchlab-to-debut-in-canada-marking-first-international-studio
   - `sl-150th-studio` → https://blog.xponential.com/newsroom/stretchlab-opens-150th-studio-and-reaches-500-signed-franchise-agreements
   - `sl-400th-studio` → https://blog.xponential.com/newsroom/multi-unit-operator-opens-400th-stretchlab-studio
5. **4 classFormat image** — Pure Barre class-format pages. Pull the page's hero/lead image:
   - `pure-barre-align` → https://www.purebarre.com/pure-barre-align (or whatever the canonical PB class page is — check `/research/raw-extracted/pb/pure-barre-align.json`)
   - `pure-barre-classic` → from `/research/raw-extracted/pb/pure-barre-classic.json` source_url
   - `pure-barre-define` → from `/research/raw-extracted/pb/pure-barre-define.json` source_url
   - `pure-barre-empower` → from `/research/raw-extracted/pb/pure-empower.json` source_url

### P1 — important (16 files)

6. **10 blog image** — hero image on each blog post page. og:image is usually the right pick.
   - PB blog URLs in `/research/posts/pb/_summary.json`
   - SL blog URLs in `/research/posts/sl/_summary.json`
   - Use slug from the summary file. Output: `/research/images/blog/<slug>.<ext>` (no `pb-` or `sl-` prefix — matches Sanity doc IDs `blog-purebarre-<slug>` and `blog-stretchlab-<slug>`)
7. **2 service image** — SL service pages:
   - `group-stretch` → look at `/research/raw-extracted/sl/` for the group stretch page; if not present, scrape https://www.stretchlab.com/group-stretch
   - `one-on-one` → similarly, https://www.stretchlab.com/one-on-one (or pull from /research/raw-extracted/sl/stretches.json)
8. **2 author image** — placeholder portraits OK (authors are `author-pb-editorial` and `author-sl-editorial`, generic editorial bylines). Pull anything brand-appropriate from the brand site about-team page if available; otherwise grab the brand's logo and we'll style around it.
9. **3 site logo** — header logos for each top-level site:
   - `xpo` → xponential.com header logo
   - `purebarre` → purebarre.com header logo (could be same file as brand `pure-barre` modalLogo above; dedupe is fine)
   - `stretchlab` → stretchlab.com header logo (same dedupe note)
10. **3 site favicon** — `/favicon.ico` (or `/favicon.png`) from each of xponential.com, purebarre.com, stretchlab.com.

## How

Use the existing `gumshoe-scrape` sandbox (Crawl4AI + Playwright) — it's already configured. For each target page:

1. Fetch the page HTML
2. Pull `<meta property="og:image">` (best for press + blog), or fall back to the first content `<img>` that isn't a logo/icon/social-icon
3. Download the image to the path above
4. Record source URL + alt text in the manifest

For brand/site logos and favicons, hit the homepage and pull the header `<img class~=logo>` or the `<link rel="icon">` href.

## Quality bar

- Min ~600px wide for hero images. If the og:image is small, fall back to the first large content image on the page.
- Prefer JPG/PNG over WebP if both available (broader Sanity asset pipeline support).
- Logos: SVG if exposed, PNG with transparency otherwise.
- Don't worry about deduplication across docs — Sanity's asset pipeline dedupes by content hash automatically.

## Done means

- All files in `/research/images/` per the structure above
- `_manifest.json` lists every file
- Post `@janusdev — image scrape complete, N files, manifest at /research/images/_manifest.json` when ready
- If you can't get a specific file, list it in the manifest with `"file": null, "reason": "..."` so I can decide whether to placeholder or skip

## Out of scope

- Don't re-scrape blog post bodies, studio addresses, or anything that's already in the dataset. Images only.
- Don't upload to Sanity. @janusdev runs the import.
- Don't worry about cropping/resizing. Sanity hotspot handles it.
