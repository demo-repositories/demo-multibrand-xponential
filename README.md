# Xponential Fitness — Multi-Brand Sanity Demo

Sanity Studio + dataset modeling Xponential's parent brand and two of its sub-brands (Pure Barre, StretchLab) as **one project, one dataset, three Studio workspaces** over a shared schema.

Built from [turbo-start-sanity](https://github.com/robotostudio/turbo-start-sanity) as a presales demo for Xponential Fitness.

## Live Studio

Deployed to https://xponential-demo.sanity.studio — three workspaces selectable from the top-left switcher:

- **Xponential — parent** (`/studio/xponential`) — parent corporate content: 5 brand docs, leadership team, parent home + pages, parent press
- **Pure Barre** (`/studio/purebarre`) — 5 PB studios, 5 PB blog posts, PB home, PB press, 4 class formats
- **StretchLab** (`/studio/stretchlab`) — 5 SL studios, 5 SL blog posts, SL home, SL press, 2 services

Most content is site-scoped, so each workspace shows only its own. Cross-site `pressItem` docs (e.g. Bilt partnership) appear in every workspace they're `featuredOn`.

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

### Clone and install

```bash
git clone https://github.com/demo-repositories/demo-multibrand-xponential.git
cd demo-multibrand-xponential
pnpm install
```

### Studio env

Create `apps/studio/.env`:

```
SANITY_STUDIO_PROJECT_ID=7bgx7lr4
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PRODUCTION_HOSTNAME=xponential-demo
```

For any script that writes to the dataset (the seed scripts below), also set:

```
SANITY_AUTH_TOKEN=sk... # token with Editor or Deploy Studio role on project 7bgx7lr4
```

### Run Studio locally

```bash
pnpm --filter studio dev
```

Studio runs on http://localhost:3333. Workspace deep links: `/xponential`, `/purebarre`, `/stretchlab`.

### Deploy Studio

```bash
pnpm --filter studio deploy
```

## Seed import

The dataset on `production` is already seeded (69 docs, 17 image assets). The scripts below are idempotent — they upsert by deterministic `_id`, so re-running is safe. Run them in this order on a fresh dataset.

All scripts live in `apps/studio/scripts/` and require `SANITY_AUTH_TOKEN`. Each runs in dry-mode by default (writes NDJSON to stdout) and pushes with `--push`.

```bash
cd apps/studio

# 1. Brands, sites, navbars, footers, leadership people (21 docs)
pnpm tsx scripts/seed.ts --push

# 2. Home page docs + parent-site pages (3 home + 7 pages with pageBuilder blocks)
pnpm tsx scripts/populate-pages.ts --push
pnpm tsx scripts/populate-page-docs.ts --push

# 3. 10 studios + 4 class formats + 2 services
pnpm tsx scripts/import-studios.ts --push

# 4. 9 press items with cross-site featuredOn[]
pnpm tsx scripts/import-press.ts --push

# 5. 10 blog posts (5 PB + 5 SL) with authors and portable-text bodies
pnpm tsx scripts/import-posts.ts --push

# 6. 17 canonical images (brand cards, hero shots, leadership portraits, site logos)
pnpm tsx scripts/import-assets.ts --push
```

### Verify

```bash
pnpm tsx scripts/verify.ts
```

Prints document counts per type plus targeted queries (Hillcrest pair, Bilt cross-site press) to confirm the dataset is in the expected state.
