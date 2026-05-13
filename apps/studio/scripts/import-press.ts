#!/usr/bin/env tsx
/**
 * Import press items.
 *
 * Inputs:
 *   - /workspace/xpo-demo/apps/studio/seed-data/press/_manifest.json
 *   - /workspace/xpo-demo/apps/studio/seed-data/press/{slug}.json
 *
 * Outputs:
 *   - press-output.ndjson
 *
 * featuredOn[] is reference[] to site docs (site-xpo/site-purebarre/site-stretchlab).
 * brands[] is reference[] to brand docs — inferred from manifest.featuredOn:
 *   - "xpo" in featuredOn → leave brands[] empty (parent-level)
 *   - "pb" → brand-pure-barre
 *   - "sl" → brand-stretchlab
 *
 * publishedAt: scraped data didn't carry dates, so we fabricate plausible ones
 * (clearly DEMO-SEED). Sorted chronologically newest-first.
 */
import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || "7bgx7lr4";
const DATASET = process.env.SANITY_STUDIO_DATASET || "production";
const PRESS_DIR = resolve(__dirname, "../seed-data/press");

const manifest = readJson(resolve(PRESS_DIR, "_manifest.json")) as Array<{
  slug: string;
  url: string;
  featuredOn: string[];
  category: string;
}>;

// Demo-seed dates, newest first. Bilt renewal was real and Apr 2025.
const fakeDates: Record<string, string> = {
  "bilt-partnership-renewal": "2025-04-15",
  "mexico-japan-expansion": "2025-02-10",
  "japan-pure-barre-yogasix": "2025-01-22",
  "pb-platinum-barre-challenge": "2025-03-05",
  "pb-sarah-luna-president": "2024-11-12",
  "pb-heart-health-month": "2025-02-03",
  "sl-canada-debut": "2024-09-18",
  "sl-150th-studio": "2024-07-08",
  "sl-400th-studio": "2024-05-21",
};

const siteRef: Record<string, string> = {
  xpo: "site-xpo",
  pb: "site-purebarre",
  sl: "site-stretchlab",
};

const brandRefForSite: Record<string, string | null> = {
  xpo: null, // parent-level — don't auto-assign a brand
  pb: "brand-pure-barre",
  sl: "brand-stretchlab",
};

const docs: any[] = [];

for (const entry of manifest) {
  const data = readJson(resolve(PRESS_DIR, `${entry.slug}.json`));

  const headline = data.title?.replace(/\s+/g, " ").trim() || titlecase(entry.slug);
  const excerpt = cleanText(data.meta_description || "").slice(0, 320);

  // Body markdown: strip cookie banner + leading logo. Then take from the first
  // semantically real paragraph forward as Portable Text blocks.
  const body = bodyToPortableText(data.body_markdown || "");

  const featuredOn = entry.featuredOn.map((s) => ({
    _type: "reference" as const,
    _key: key(),
    _ref: siteRef[s],
  }));

  // Brands: derive from featuredOn (xpo → parent, never assigns a brand;
  // pb → brand-pure-barre; sl → brand-stretchlab).
  // Special case: japan-pure-barre-yogasix mentions yogasix in title → also reference.
  const brands = new Set<string>();
  for (const s of entry.featuredOn) {
    const brand = brandRefForSite[s];
    if (brand) brands.add(brand);
  }
  if (/yogasix|yoga\s?six/i.test(headline)) brands.add("brand-yogasix");
  if (/club\s?pilates/i.test(headline)) brands.add("brand-club-pilates");
  if (/\bbft\b|body\s?fit\s?training/i.test(headline)) brands.add("brand-bft");

  docs.push({
    _id: `pressItem-${entry.slug}`,
    _type: "pressItem",
    headline,
    slug: slug(entry.slug),
    publishedAt: fakeDates[entry.slug] || "2025-01-01",
    outlet: undefined, // these are Xpo's own newsroom releases; no outlet
    externalUrl: entry.url,
    excerpt: excerpt || undefined,
    body, // empty array if scrape was thin; ok per schema (body is optional)
    featuredOn,
    brands: Array.from(brands).map((b) => ({ _type: "reference" as const, _key: key(), _ref: b })),
  });
}

const out = resolve(__dirname, "../press-output.ndjson");
const mode = process.argv.includes("--push") ? "push" : "ndjson";

if (mode === "ndjson") {
  writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
  console.log(`✔ Wrote ${docs.length} press items to ${out}`);
  console.log(`  Cross-site (3+ sites): ${docs.filter((d) => d.featuredOn.length >= 3).length}`);
  console.log(`  Multi-site (2 sites):  ${docs.filter((d) => d.featuredOn.length === 2).length}`);
  console.log(`  Single-site:           ${docs.filter((d) => d.featuredOn.length === 1).length}`);
} else {
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error("✖ --push requires SANITY_AUTH_TOKEN");
    process.exit(1);
  }
  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2025-03-15",
    token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false,
  });
  (async () => {
    const tx = client.transaction();
    for (const doc of docs) tx.createOrReplace(doc);
    const result = await tx.commit();
    console.log(`✔ Pushed ${docs.length} press items. Tx: ${result.transactionId}`);
  })();
}

// ===== helpers =====
function readJson(p: string) { return JSON.parse(readFileSync(p, "utf8")); }
function slug(s: string) { return { _type: "slug", current: s }; }
function key() { return Math.random().toString(36).slice(2, 14); }
function titlecase(s: string) { return s.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "); }

function cleanText(s: string) {
  return s
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strip cookie banners and leading logo, convert remaining markdown paragraphs
 * to Portable Text blocks. Best-effort: this is demo-seed body for context;
 * production import would use markdown→PT serializer.
 */
function bodyToPortableText(md: string): any[] {
  if (!md) return [];

  // Drop cookie banner
  let s = md.replace(/This website uses cookies[\s\S]*?Got It\s*/i, "");

  // Drop standalone image markdown lines (leading logo etc.) and link-only nav lines
  s = s.replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, "");
  s = s.replace(/^\[[^\]]+\]\([^)]*\)\s*$/gm, "");

  // Drop "Cookies Policy" links inline
  s = s.replace(/\[Cookies Policy\]\([^)]*\)\s*/g, "");

  // Drop "Customize Cookies" / "Accept All" leftovers
  s = s.replace(/^(Customize Cookies|Accept All Cookies?|Reject All Cookies?)$/gim, "");

  // Split into paragraphs (blank-line separated)
  const paras = s
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((p) => p.length > 20); // skip tiny fragments (nav bits)

  return paras.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}
