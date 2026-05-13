#!/usr/bin/env tsx
/**
 * Download canonical images from gumshoe's scrape and upload them as Sanity
 * assets, then patch the relevant docs (brand, person, site) to reference them.
 *
 * Sources:
 *   - Brand hero images (5) from xpo /franchising page
 *   - Brand card images (5) from xpo home page brand-cards/ dir
 *   - Leadership portraits (4) from /research/raw-extracted/xpo/leadership-*.json
 *   - Site logos (3) from /research/theme-tokens-*.json
 *
 * Total: 17 image uploads + ~17 document patches.
 *
 * Run:
 *   pnpm tsx scripts/import-assets.ts          → dry run (just downloads)
 *   pnpm tsx scripts/import-assets.ts --push   → upload + patch docs
 */
import { createClient, type SanityClient } from "@sanity/client";

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || "7bgx7lr4";
const DATASET = process.env.SANITY_STUDIO_DATASET || "production";

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error("✖ SANITY_AUTH_TOKEN required");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2025-03-15",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

type Manifest = {
  brandHeroes: { brandId: string; url: string; alt: string }[];
  brandCards: { brandId: string; url: string; alt?: string }[];
  portraits: { personId: string; url: string; alt: string }[];
  siteLogos: { siteId: string; url: string; alt: string }[];
};

const manifest: Manifest = {
  brandHeroes: [
    { brandId: "brand-bft", url: "https://www.xponential.com/hubfs/cli-assets/images/franchising/xponential-brands/bft.jpg", alt: "BFT — Woman doing a deadlift" },
    { brandId: "brand-club-pilates", url: "https://www.xponential.com/hubfs/cli-assets/images/franchising/xponential-brands/clubpilates.jpg", alt: "Club Pilates — Woman doing Pilates" },
    { brandId: "brand-pure-barre", url: "https://www.xponential.com/hubfs/cli-assets/images/franchising/xponential-brands/purebarre.jpg", alt: "Pure Barre — Woman doing Barre" },
    { brandId: "brand-stretchlab", url: "https://www.xponential.com/hubfs/cli-assets/images/franchising/xponential-brands/stretchlab.jpg", alt: "StretchLab — Woman stretching" },
    { brandId: "brand-yogasix", url: "https://www.xponential.com/hubfs/cli-assets/images/franchising/xponential-brands/yogasix.jpg", alt: "YogaSix — Man doing Yoga" },
  ],
  brandCards: [
    { brandId: "brand-bft", url: "https://www.xponential.com/hubfs/cli-assets/images/main-page/brand-cards/BFT.jpg" },
    { brandId: "brand-club-pilates", url: "https://www.xponential.com/hubfs/cli-assets/images/main-page/brand-cards/Club%20Pilates.jpg" },
    { brandId: "brand-pure-barre", url: "https://www.xponential.com/hubfs/cli-assets/images/main-page/brand-cards/Pure%20Barre.jpg" },
    { brandId: "brand-stretchlab", url: "https://www.xponential.com/hubfs/cli-assets/images/main-page/brand-cards/StretchLab.jpg" },
    { brandId: "brand-yogasix", url: "https://www.xponential.com/hubfs/cli-assets/images/main-page/brand-cards/yogasix.jpg" },
  ],
  portraits: [
    { personId: "person-andrew-hagopian", url: "https://www.xponential.com/hubfs/Andrew-FINAL-2.jpg", alt: "Andrew Hagopian" },
    { personId: "person-bob-kaufman", url: "https://www.xponential.com/hubfs/Bob%20Kaufman%20Headshot%201%20(1)%20Revised.jpg", alt: "Bob Kaufman" },
    { personId: "person-gavin-oconnor", url: "https://www.xponential.com/hubfs/Gavin%20OConnor%20Headshot.jpg", alt: "Gavin O'Connor" },
    { personId: "person-mike-nuzzo", url: "https://www.xponential.com/hubfs/1664915557188.jpg", alt: "Mike Nuzzo" },
  ],
  siteLogos: [
    { siteId: "site-xpo", url: "https://www.xponential.com/hubfs/XPO%202023%20logo-02%20(1)-1.png", alt: "Xponential logo" },
    { siteId: "site-purebarre", url: "https://4194181.fs1.hubspotusercontent-na1.net/hubfs/4194181/Pure%20Barre%20Logo-1.png", alt: "Pure Barre logo" },
    { siteId: "site-stretchlab", url: "https://www.stretchlab.com/hubfs/stretchlab.com/png/logo-full-color.png", alt: "StretchLab logo" },
  ],
};

async function uploadFromUrl(client: SanityClient, url: string, label: string): Promise<{ _ref: string }> {
  console.log(`  ↓ ${label}`);
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = url.split("/").pop()?.split("?")[0] || "image";
  const asset = await client.assets.upload("image", buf, { filename });
  console.log(`    ↑ asset ${asset._id}`);
  return { _ref: asset._id };
}

async function tryUpload(client: SanityClient, url: string, label: string): Promise<{ _ref: string } | null> {
  try {
    return await uploadFromUrl(client, url, label);
  } catch (e) {
    console.log(`    ✖ skip ${label}: ${(e as Error).message}`);
    return null;
  }
}

async function main() {
  const mode = process.argv.includes("--push") ? "push" : "dry";
  let count = 0;
  let skipped = 0;
  const tx = client.transaction();

  // Brand hero + brand card
  for (const h of manifest.brandHeroes) {
    if (mode === "push") {
      const assetRef = await tryUpload(client, h.url, `${h.brandId} hero`);
      if (!assetRef) { skipped++; continue; }
      tx.patch(h.brandId, (p) => p.set({
        heroImage: { _type: "image", asset: { _type: "reference", ...assetRef }, alt: h.alt },
      }));
      count++;
    }
  }
  for (const c of manifest.brandCards) {
    if (mode === "push") {
      const assetRef = await tryUpload(client, c.url, `${c.brandId} card`);
      if (!assetRef) { skipped++; continue; }
      tx.patch(c.brandId, (p) => p.set({
        cardLogo: { _type: "image", asset: { _type: "reference", ...assetRef }, alt: c.alt },
      }));
      count++;
    }
  }
  // Portraits
  for (const p of manifest.portraits) {
    if (mode === "push") {
      const assetRef = await tryUpload(client, p.url, `${p.personId} portrait`);
      if (!assetRef) { skipped++; continue; }
      tx.patch(p.personId, (patch) => patch.set({
        portrait: { _type: "image", asset: { _type: "reference", ...assetRef }, alt: p.alt },
      }));
      count++;
    }
  }
  // Site logos go under site.themeOverrides.siteLogo
  for (const s of manifest.siteLogos) {
    if (mode === "push") {
      const assetRef = await tryUpload(client, s.url, `${s.siteId} logo`);
      if (!assetRef) { skipped++; continue; }
      tx.patch(s.siteId, (patch) => patch.set({
        "themeOverrides.siteLogo": { _type: "image", asset: { _type: "reference", ...assetRef }, alt: s.alt },
      }));
      count++;
    }
  }

  if (mode === "push") {
    if (count > 0) {
      const result = await tx.commit();
      console.log(`\n✔ Uploaded ${count} assets, patched ${count} docs. Skipped: ${skipped}. Tx: ${result.transactionId}`);
    } else {
      console.log(`\n(no uploads succeeded, skipped: ${skipped})`);
    }
  } else {
    console.log(`(dry run) would upload ${manifest.brandHeroes.length + manifest.brandCards.length + manifest.portraits.length + manifest.siteLogos.length} images`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
