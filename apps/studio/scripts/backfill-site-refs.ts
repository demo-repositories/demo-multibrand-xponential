#!/usr/bin/env tsx
/**
 * One-time backfill: set the `site` reference on existing per-site singletons.
 *
 * Why: `site` was added to homePage / blogIndex / settings schemas after the
 * original seed had already pushed those documents (the homePage docs in
 * particular had `site` stripped on first save because the field didn't yet
 * exist in the schema). This patches the published documents directly, plus
 * any existing drafts, using the same convention `seed.ts` uses.
 *
 * Run:
 *   pnpm tsx scripts/backfill-site-refs.ts          # dry-run, prints plan
 *   pnpm tsx scripts/backfill-site-refs.ts --push   # apply via @sanity/client
 *
 * Requires: SANITY_AUTH_TOKEN
 */
import { config } from "dotenv";
import { resolve } from "node:path";

import { createClient } from "@sanity/client";

// Load .env.local first (matches Sanity CLI behavior), then fall back to .env
config({ path: resolve(__dirname, "../.env.local") });
config({ path: resolve(__dirname, "../.env") });

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || "7bgx7lr4";
const DATASET = process.env.SANITY_STUDIO_DATASET || "production";

type Plan = {
  docId: string;
  siteId: string;
};

const PER_SITE_SINGLETON_TYPES = [
  "homePage",
  "blogIndex",
  "settings",
] as const;

const SITE_SLUGS = ["xpo", "purebarre", "stretchlab"] as const;

function buildPlans(): Plan[] {
  const plans: Plan[] = [];
  for (const type of PER_SITE_SINGLETON_TYPES) {
    for (const slug of SITE_SLUGS) {
      plans.push({
        docId: `${type}-${slug}`,
        siteId: `site-${slug}`,
      });
    }
  }
  return plans;
}

async function main() {
  const mode = process.argv.includes("--push") ? "push" : "dry-run";
  const plans = buildPlans();

  if (mode === "dry-run") {
    console.log(`Dry run: would patch ${plans.length} documents (and any drafts).`);
    for (const p of plans) {
      console.log(`  ${p.docId} → site = ref(${p.siteId})`);
    }
    console.log("\nRe-run with --push to apply (needs SANITY_AUTH_TOKEN).");
    return;
  }

  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error("✖ --push requires SANITY_AUTH_TOKEN env var");
    process.exit(1);
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2025-03-15",
    token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false,
  });

  let patched = 0;
  let skipped = 0;

  for (const p of plans) {
    const ref = { _type: "reference" as const, _ref: p.siteId };
    for (const id of [p.docId, `drafts.${p.docId}`]) {
      const existing = await client.getDocument(id);
      if (!existing) {
        skipped++;
        continue;
      }
      await client.patch(id).set({ site: ref }).commit();
      console.log(`  ✔ ${id} → site = ref(${p.siteId})`);
      patched++;
    }
  }

  console.log(`\nDone. Patched ${patched}, skipped ${skipped} (not found).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
