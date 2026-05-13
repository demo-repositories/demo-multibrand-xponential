# Xponential Fitness — Multi-Brand Sanity Demo

Sanity Studio + dataset modeling Xponential's parent brand and two of its sub-brands (Pure Barre, StretchLab) as **one project, one dataset, three Studio workspaces** over a shared schema.

Built from [turbo-start-sanity](https://github.com/robotostudio/turbo-start-sanity) as a presales demo for Xponential Fitness.

## Architecture

- **One Sanity project**, one `production` dataset
- **Three Studio workspaces** sharing schema:
  - `/xponential` — parent (5 brand docs, leadership, parent-level press)
  - `/purebarre` — sub-brand (5 studios in Austin/Denver/SD/Chicago/Atlanta)
  - `/stretchlab` — sub-brand (5 studios in same cities)
- **Site-scoped Structure Builder** — each workspace shows only its own content
- **Cross-site content** — a `pressItem` can be featured on multiple sites via `featuredOn[]` references

### The cross-brand demo moment

Two studios share a neighborhood in San Diego:
- Pure Barre San Diego | Hillcrest
- StretchLab Hillcrest | Stretch Studios

Same dataset query — `*[_type == "studio" && address.city == "San Diego"]` — returns both. One content lake, multiple brand experiences.

## Schema

### Document types

Template ships: `author`, `blog`, `blogIndex`, `faq`, `footer`, `homePage`, `navbar`, `page`, `settings`.

Added for Xponential demo: `brand`, `site`, `studio`, `classFormat`, `service`, `testimonial`, `person`, `pressItem`, `legalPage`.

Extended `footer` and `navbar` with `site` reference + `social[]`/`legal[]` arrays.

### Blocks (page builder)

Template ships 7: `hero`, `cta`, `faqAccordion`, `featureCardsIcon`, `imageLinkCards`, `richText`, `subscribeNewsletter`.

Added 14: `brandGrid`, `classGrid`, `serviceGrid`, `testimonialCarousel`, `personGrid`, `pressList`, `postGrid`, `appDownload`, `partnerStrip`, `tabbedInfo`, `statsBlock`, `pageHeader`, `locationFinder`, `processSteps`.

## Setup

```bash
pnpm install
```

Set `apps/studio/.env`:

```
SANITY_STUDIO_PROJECT_ID=7bgx7lr4
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PRODUCTION_HOSTNAME=xponential-demo
```

Run Studio:

```bash
pnpm --filter studio dev
```

## Seed import

Three scripts in `apps/studio/scripts/`, each producing review-friendly NDJSON in dry-run mode and pushing via `@sanity/client` with `--push`:

```bash
# Brands, sites, navbars, footers, homePages, leadership (21 docs)
pnpm --filter studio tsx scripts/seed.ts --push

# 10 studios + class formats + services (16 docs)
pnpm --filter studio tsx scripts/import-studios.ts --push

# 9 press items with cross-site featuredOn[] (9 docs)
pnpm --filter studio tsx scripts/import-press.ts --push

# 16 canonical images (brand cards, hero shots, leadership portraits, site logos)
pnpm --filter studio tsx scripts/import-assets.ts --push
```

All scripts require `SANITY_AUTH_TOKEN` env var.

## Live Studio

Deployed to https://xponential-demo.sanity.studio
