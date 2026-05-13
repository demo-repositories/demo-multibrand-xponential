#!/usr/bin/env tsx
/**
 * Import Pure Barre + StretchLab studios and their referenced class formats / services.
 *
 * Inputs: /workspace/xpo-demo/apps/studio/seed-data/studios/{pb,sl}/*.json
 *
 * Outputs:
 *   - studios-output.ndjson — review-friendly NDJSON
 *
 * Note: this script DEPENDS on the base seed having been pushed first
 * (it references brand-pure-barre, brand-stretchlab, site-purebarre, site-stretchlab).
 *
 * Run:
 *   pnpm tsx scripts/import-studios.ts          → write NDJSON
 *   pnpm tsx scripts/import-studios.ts --push   → push via @sanity/client
 */
import { createClient } from "@sanity/client";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || "7bgx7lr4";
const DATASET = process.env.SANITY_STUDIO_DATASET || "production";
const STUDIOS_DIR = resolve(__dirname, "../seed-data/studios");

type SiteSlug = "purebarre" | "stretchlab";
const sitePrefix: Record<SiteSlug, string> = {
  purebarre: "pb",
  stretchlab: "sl",
};

const docs: any[] = [];

// Track unique class formats / services we encounter so we can create them
const classFormatsByBrand = new Map<string, Set<string>>(); // brand -> set of class format names
const servicesByBrand = new Map<string, Set<string>>();

for (const siteSlug of ["purebarre", "stretchlab"] as SiteSlug[]) {
  const brandId = siteSlug === "purebarre" ? "brand-pure-barre" : "brand-stretchlab";
  const siteId = `site-${siteSlug}`;
  const dir = resolve(STUDIOS_DIR, sitePrefix[siteSlug]);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "_summary.json");
  } catch {
    console.log(`(skip) no studios dir for ${siteSlug}`);
    continue;
  }
  for (const filename of files) {
    const data = readJson(resolve(dir, filename));
    const slugStr = filename.replace(/\.json$/, "");

    // Address: scraped as one string. Parse heuristically.
    const address = parseAddress(data.address || "");

    // Hours: scraped groups multiple days ("Mon & Tue & Wed & Thu"). Expand.
    const hours = expandHours(data.hours || []);

    // Class formats / services: scraped as array of names.
    // PB: classFormats (e.g. "Classic", "Align"); SL: services (e.g. "One on One", "Group Stretch")
    let services: { _type: "reference"; _ref: string; _key: string }[] = [];
    if (Array.isArray(data.classFormats) && data.classFormats.length > 0) {
      if (siteSlug === "purebarre") {
        const set = classFormatsByBrand.get(brandId) || new Set<string>();
        data.classFormats.forEach((c: string) => set.add(c));
        classFormatsByBrand.set(brandId, set);
        services = (data.classFormats as string[]).map((name) => ({
          _type: "reference" as const,
          _key: key(),
          _ref: `classFormat-${siteSlug}-${kebab(name)}`,
        }));
      } else if (siteSlug === "stretchlab") {
        const set = servicesByBrand.get(brandId) || new Set<string>();
        data.classFormats.forEach((c: string) => set.add(c));
        servicesByBrand.set(brandId, set);
        services = (data.classFormats as string[]).map((name) => ({
          _type: "reference" as const,
          _key: key(),
          _ref: `service-${siteSlug}-${kebab(name)}`,
        }));
      }
    }

    docs.push({
      _id: `studio-${slugStr}`,
      _type: "studio",
      site: ref(siteId),
      brand: ref(brandId),
      name: cleanName(data.name || titlecase(slugStr)),
      slug: slug(slugStr),
      address,
      ...(data.geo?.lat && data.geo?.lng ? { geo: { _type: "geopoint", lat: data.geo.lat, lng: data.geo.lng } } : {}),
      phone: data.phone || undefined,
      email: data.email || undefined,
      hours,
      services,
      introOfferPrice: data.introOfferPrice || undefined,
      bookingUrl: decodeUrl(data.bookingUrl),
      mapsEmbedUrl: data.mapsEmbedUrl || undefined,
      membershipTiers: data.membershipTiers || undefined,
      // staff: data.staff would need separate person-doc creation; deferring
    });
  }
}

// Generate classFormat docs from unique class names per brand (PB)
for (const [brandId, classNames] of classFormatsByBrand) {
  const siteSlug = brandId === "brand-pure-barre" ? "purebarre" : "stretchlab";
  const siteId = `site-${siteSlug}`;
  for (const name of classNames) {
    docs.push({
      _id: `classFormat-${siteSlug}-${kebab(name)}`,
      _type: "classFormat",
      site: ref(siteId),
      brand: ref(brandId),
      name,
      slug: slug(kebab(name)),
      duration: defaultDurationFor(name),
      shortDescription: defaultShortDescFor(name),
    });
  }
}

// Generate service docs from unique service names per brand (SL)
for (const [brandId, serviceNames] of servicesByBrand) {
  const siteSlug = brandId === "brand-pure-barre" ? "purebarre" : "stretchlab";
  const siteId = `site-${siteSlug}`;
  for (const name of serviceNames) {
    docs.push({
      _id: `service-${siteSlug}-${kebab(name)}`,
      _type: "service",
      site: ref(siteId),
      brand: ref(brandId),
      name,
      slug: slug(kebab(name)),
      durationOptions: defaultDurationOptionsForService(name),
      shortDescription: defaultShortDescForService(name),
    });
  }
}

const out = resolve(__dirname, "../studios-output.ndjson");
const mode = process.argv.includes("--push") ? "push" : "ndjson";

if (mode === "ndjson") {
  writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
  console.log(`✔ Wrote ${docs.length} docs to ${out}`);
  const studios = docs.filter((d) => d._type === "studio").length;
  const formats = docs.filter((d) => d._type === "classFormat").length;
  console.log(`  Breakdown: ${studios} studios, ${formats} class formats`);
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
    console.log(`✔ Pushed ${docs.length} docs. Transaction: ${result.transactionId}`);
  })();
}

// ===== helpers =====

function readJson(p: string) {
  return JSON.parse(readFileSync(p, "utf8"));
}
function slug(s: string) {
  return { _type: "slug", current: s };
}
function ref(id: string) {
  return { _type: "reference", _ref: id };
}
function key() {
  return Math.random().toString(36).slice(2, 14);
}
function titlecase(s: string) {
  return s.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}
function kebab(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function decodeUrl(u: string | undefined) {
  if (!u) return undefined;
  return u.replace(/&amp;amp;/g, "&").replace(/&amp;/g, "&");
}
function cleanName(n: string) {
  // "Pure Barre Atlanta | Buckhead" → keep as-is
  return n.replace(/\s+/g, " ").trim();
}

/**
 * Parse a one-line US address string into Sanity address fields.
 * Handles two common shapes:
 *   "3145 Peachtree Road, Suite 169, Atlanta, GA 30305"
 *   "2058 N Halsted, Street  \nLincoln Park, IL 60614"
 */
function parseAddress(s: string) {
  const cleaned = s.replace(/\s+/g, " ").trim();
  // Match "{street}, {city}, {region} {postal}"
  const m = cleaned.match(/^(.+?),\s*([^,]+?),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/);
  if (m) {
    return {
      street: m[1].trim(),
      city: m[2].trim(),
      region: m[3].trim(),
      postal: m[4].trim(),
      country: "US",
    };
  }
  // Fallback: stash whole thing in street
  return { street: cleaned, country: "US" };
}

/**
 * Expand grouped-day hours like "Mon & Tue & Wed & Thu" into individual day rows.
 * Returns an array shaped for the studio.hours schema.
 */
function expandHours(rows: Array<{ day: string; hours?: string; closed?: boolean }>): any[] {
  const out: any[] = [];
  const dayMap: Record<string, string> = {
    mon: "Mon", monday: "Mon",
    tue: "Tue", tues: "Tue", tuesday: "Tue",
    wed: "Wed", weds: "Wed", wednesday: "Wed",
    thu: "Thu", thurs: "Thu", thursday: "Thu",
    fri: "Fri", friday: "Fri",
    sat: "Sat", saturday: "Sat",
    sun: "Sun", sunday: "Sun",
  };
  for (const r of rows) {
    const days = String(r.day || "")
      .split(/\s*(?:&|,|and)\s*/i)
      .map((d) => dayMap[d.toLowerCase().replace(/[^a-z]/g, "")])
      .filter(Boolean) as string[];
    const closed = (r as any).closed === true || /closed/i.test(r.hours || "");
    let open: string | undefined;
    let close: string | undefined;
    if (!closed && r.hours) {
      const m = String(r.hours).match(/^(.+?)\s*[–-]\s*(.+)$/);
      if (m) {
        open = m[1].trim();
        close = m[2].trim();
      }
    }
    for (const day of days) {
      out.push({
        _type: "dayHours",
        _key: key(),
        day,
        ...(closed ? { closed: true } : {}),
        ...(open ? { open } : {}),
        ...(close ? { close } : {}),
      });
    }
  }
  return out;
}

function defaultDurationFor(name: string): number | undefined {
  const n = name.toLowerCase();
  if (n.includes("empower")) return 45;
  if (n.includes("classic") || n.includes("align") || n.includes("define")) return 50;
  return undefined;
}
function defaultShortDescFor(name: string): string | undefined {
  // <!-- DEMO-SEED --> short descriptions to make grids non-empty
  const map: Record<string, string> = {
    "Pure Barre Classic": "Pure Barre's signature 50-minute low-impact full-body workout.",
    "Pure Barre Align": "Stability and core-focused class building from the foundations of Classic.",
    "Pure Barre Empower": "45 minutes of barre + HIIT with ankle weights and plyometric platform.",
    "Pure Barre Define": "Barre meets dumbbell strength training in a 50-minute session.",
    // Legacy short forms for safety
    "Classic": "Pure Barre's signature 50-minute low-impact full-body workout.",
    "Align": "Stability and core-focused class building from the foundations of Classic.",
    "Empower": "45 minutes of barre + HIIT with ankle weights and plyometric platform.",
    "Define": "Barre meets dumbbell strength training in a 50-minute session.",
  };
  return map[name];
}
function defaultDurationOptionsForService(name: string): string[] | undefined {
  const n = name.toLowerCase();
  if (n.includes("one on one") || n.includes("1 on 1")) return ["25 min", "50 min"];
  if (n.includes("group stretch")) return ["50 min"];
  return undefined;
}
function defaultShortDescForService(name: string): string | undefined {
  const map: Record<string, string> = {
    "One on One": "Personalized assisted stretching with a certified Flexologist™.",
    "Group Stretch": "Small-group assisted stretching session for up to six people.",
  };
  return map[name];
}
