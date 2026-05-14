#!/usr/bin/env tsx
/**
 * Seed the Xponential demo dataset.
 *
 * Inputs (all from seed-data/):
 *   - nav-footer-{xpo,pb,sl}.json
 *   - site-config-{xpo,pb,sl}.json
 *   - leadership-{slug}.json (xpo leadership scrape)
 *
 * Outputs:
 *   - seed-output.ndjson — review-friendly NDJSON for `sanity dataset import`
 *
 * Run:
 *   pnpm tsx scripts/seed.ts           → write NDJSON
 *   pnpm tsx scripts/seed.ts --push    → push via @sanity/client (needs SANITY_AUTH_TOKEN)
 */
import { createClient } from "@sanity/client";
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || "7bgx7lr4";
const DATASET = process.env.SANITY_STUDIO_DATASET || "production";
const SEED = resolve(__dirname, "../seed-data");

const readJson = (name: string) => JSON.parse(readFileSync(resolve(SEED, name), "utf8"));

// Source data
const cfg = {
  xpo: readJson("site-config-xpo.json"),
  pb: readJson("site-config-pb.json"),
  sl: readJson("site-config-sl.json"),
};
const navfoot = {
  xpo: readJson("nav-footer-xpo.json"),
  pb: readJson("nav-footer-pb.json"),
  sl: readJson("nav-footer-sl.json"),
};
const themes = {
  xpo: readJson("theme-tokens-xpo.json"),
  pb: readJson("theme-tokens-pb.json"),
  sl: readJson("theme-tokens-sl.json"),
};

// ----- 5 Brand docs (shared) -----
// colorPalettes use real brand colors from theme scrape where available.
// voiceGuide is DEMO-SEED (fabricated per @gumshoe agreement).
// orderRank governs display order in xpo /our-brands.
const brands = [
  {
    _id: "brand-pure-barre",
    _type: "brand",
    name: "Pure Barre",
    slug: slug("pure-barre"),
    tagline: cfg.pb.tagline || "The Best Full Body Workout",
    externalUrl: cfg.pb.url || "https://www.purebarre.com",
    // Real PB red + Xpo corporate secondary/accent
    colorPalette: { primary: "#cb333b", secondary: "#15295a", accent: "#425b76" },
    voiceGuide: pt(
      "Empowering, precise, body-positive. Lead with results and member transformation. Avoid jargon. Energy is confident but not aggressive. Always sign off with a clear next step.",
      "<!-- DEMO-SEED -->"
    ),
    orderRank: 100,
  },
  {
    _id: "brand-stretchlab",
    _type: "brand",
    name: "StretchLab",
    slug: slug("stretchlab"),
    tagline: "One-on-One Assisted Stretching — Guided by Experts. Designed for Life.",
    externalUrl: cfg.sl.url || "https://www.stretchlab.com",
    // Real SL teal accent as primary (the brand-identifying color)
    colorPalette: { primary: "#00acba", secondary: "#15295a", accent: "#425b76" },
    voiceGuide: pt(
      "Approachable expert. Translate science into clear, member-first language. Lead with comfort and confidence. Acknowledge that stretching is unfamiliar and demystify it. Tone is warm but exacting.",
      "<!-- DEMO-SEED -->"
    ),
    orderRank: 200,
  },
  {
    _id: "brand-club-pilates",
    _type: "brand",
    name: "Club Pilates",
    slug: slug("club-pilates"),
    tagline: "Train. Sweat. Live the Method.",
    externalUrl: "https://clubpilates.com",
    colorPalette: { primary: "#5E3A87", secondary: "#15295a", accent: "#425b76" },
    voiceGuide: pt(
      "Methodical, premium, accessible. Pilates as a craft you can learn at any level. Avoid intimidation. Lead with technique and progression.",
      "<!-- DEMO-SEED -->"
    ),
    orderRank: 300,
  },
  {
    _id: "brand-yogasix",
    _type: "brand",
    name: "YogaSix",
    slug: slug("yogasix"),
    tagline: "Find Your Six.",
    externalUrl: "https://www.yogasix.com",
    colorPalette: { primary: "#E8743B", secondary: "#15295a", accent: "#425b76" },
    voiceGuide: pt(
      "Modern yoga for real people. Skip the spiritual mystique; focus on the body, the breath, the experience. Friendly, current, urban.",
      "<!-- DEMO-SEED -->"
    ),
    orderRank: 400,
  },
  {
    _id: "brand-bft",
    _type: "brand",
    name: "BFT (Body Fit Training)",
    slug: slug("bft"),
    tagline: "Train Like an Athlete.",
    externalUrl: "https://bodyfittraining.com",
    colorPalette: { primary: "#000000", secondary: "#FFC72C", accent: "#15295a" },
    voiceGuide: pt(
      "Disciplined, performance-oriented, no-nonsense. Treat every member like an athlete. Use numbers, programs, blocks. Tone is direct.",
      "<!-- DEMO-SEED -->"
    ),
    orderRank: 500,
  },
];

// ----- 3 Site docs -----
const sites = [
  buildSite("site-xpo", "xpo", "Xponential", null),
  buildSite("site-purebarre", "purebarre", "Pure Barre", "brand-pure-barre"),
  buildSite("site-stretchlab", "stretchlab", "StretchLab", "brand-stretchlab"),
];

function buildSite(_id: string, slugStr: string, name: string, brandId: string | null) {
  // Map scrape slug -> Sanity slug (the scrape uses xpo/pb/sl; we want full slugs)
  const cfgKey = slugStr === "xpo" ? "xpo" : slugStr === "purebarre" ? "pb" : "sl";
  const c = cfg[cfgKey];
  const t = themes[cfgKey];
  return {
    _id,
    _type: "site",
    name,
    slug: slug(slugStr),
    ...(brandId ? { brand: ref(brandId) } : {}),
    domain: c.url?.replace(/\/$/, "") || undefined,
    defaultSeoTitle: c.defaultSeoTitle || undefined,
    defaultSeoDescription: c.defaultSeoDescription || undefined,
    themeOverrides: {
      // Real font families from theme scrape
      fontFamily: t?.fonts?.heading || undefined,
      // Don't override the brand color here — let the brand's colorPalette drive
    },
  };
}

// ----- 3 Navbars -----
const navbars = [
  toNavbarDoc("navbar-xpo", "site-xpo", navfoot.xpo),
  toNavbarDoc("navbar-purebarre", "site-purebarre", navfoot.pb),
  toNavbarDoc("navbar-stretchlab", "site-stretchlab", navfoot.sl),
];

// ----- 3 Footers -----
const footers = [
  toFooterDoc("footer-xpo", "site-xpo", navfoot.xpo),
  toFooterDoc("footer-purebarre", "site-purebarre", navfoot.pb),
  toFooterDoc("footer-stretchlab", "site-stretchlab", navfoot.sl),
];

// ----- 3 HomePage singletons -----
const homePages = [
  { _id: "homePage-xpo", _type: "homePage", title: "Xponential Home", site: ref("site-xpo") },
  { _id: "homePage-purebarre", _type: "homePage", title: "Pure Barre Home", site: ref("site-purebarre") },
  { _id: "homePage-stretchlab", _type: "homePage", title: "StretchLab Home", site: ref("site-stretchlab") },
];

// ----- Xpo leadership → 4 Person docs -----
const leadershipFiles = [
  "leadership-andrew-hagopian.json",
  "leadership-bob-kaufman.json",
  "leadership-gavin-oconnor.json",
  "leadership-mike-nuzzo.json",
];

const people = leadershipFiles.map((file) => {
  const slugStr = file.replace(/^leadership-|\.json$/g, "");
  const data = readJson(file);

  // Strip cookie banner: everything before the first ![Image] line is junk
  let body = (data.body_markdown || "") as string;
  const firstImageIdx = body.search(/!\[[^\]]*\]\(/);
  if (firstImageIdx > 0) body = body.slice(firstImageIdx);

  const lines = body
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean)
    .filter((l: string) => !l.includes("Privacy Policy") && !/^Customize Cookies$/i.test(l) && !/^Accept All Cookies/.test(l));

  // Strip image lines from the start (1+ leading images)
  let startIdx = 0;
  while (startIdx < lines.length && lines[startIdx].startsWith("![")) startIdx++;

  const name = lines[startIdx] || titlecase(slugStr);
  const jobTitle = lines[startIdx + 1] || "";
  const bioParas = lines.slice(startIdx + 2);

  return {
    _id: `person-${slugStr}`,
    _type: "person",
    name,
    slug: slug(slugStr),
    role: "Leadership",
    title: jobTitle,
    bio: pt(...bioParas),
  };
});

// ----- Combine -----
const allDocs = [...brands, ...sites, ...navbars, ...footers, ...homePages, ...people];

// ----- Output -----
const mode = process.argv.includes("--push") ? "push" : "ndjson";
if (mode === "ndjson") {
  const ndjson = allDocs.map((d) => JSON.stringify(d)).join("\n");
  const out = resolve(__dirname, "../seed-output.ndjson");
  writeFileSync(out, ndjson + "\n");
  console.log(`✔ Wrote ${allDocs.length} docs to ${out}`);
  console.log(`  Breakdown: ${brands.length} brands, ${sites.length} sites, ${navbars.length} navbars, ${footers.length} footers, ${homePages.length} home pages, ${people.length} people`);
  console.log(`  → Push: pnpm tsx scripts/seed.ts --push   (needs SANITY_AUTH_TOKEN)`);
  console.log(`  → Or:   pnpm sanity dataset import seed-output.ndjson ${DATASET} --replace`);
} else {
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
  (async () => {
    const tx = client.transaction();
    for (const doc of allDocs)
      tx.createOrReplace(
        // @sanity/client mutation stubs one document shape per call site; scripts push many _types.
        doc as never,
      );
    const result = await tx.commit();
    console.log(`✔ Pushed ${allDocs.length} docs. Transaction: ${result.transactionId}`);
  })();
}

// ===== helpers =====
function slug(s: string) {
  return { _type: "slug", current: s };
}
function ref(id: string) {
  return { _type: "reference", _ref: id };
}
function key() {
  return Math.random().toString(36).slice(2, 14);
}
function pt(...paragraphs: string[]) {
  return paragraphs.filter(Boolean).map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}
function titlecase(s: string) {
  return s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}
function toCustomUrl(href: string) {
  return { _type: "customUrl", type: "external" as const, external: href, openInNewTab: false };
}
function toNavbarDoc(id: string, siteRef: string, src: any) {
  const columns = (src.primary_nav as any[]).map((item) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      return {
        _type: "navbarColumn",
        _key: key(),
        title: item.label,
        links: item.children.map((child: any) => ({
          _type: "navbarColumnLink",
          _key: key(),
          name: child.label,
          url: toCustomUrl(child.href),
        })),
      };
    }
    return {
      _type: "navbarLink",
      _key: key(),
      name: item.label,
      url: toCustomUrl(item.href),
    };
  });
  const utility = (src.utility_nav as any[]).map((item) => ({
    _type: "navbarLink",
    _key: key(),
    name: item.label,
    url: toCustomUrl(item.href),
  }));
  return {
    _id: id,
    _type: "navbar",
    site: ref(siteRef),
    label: `${src.slug.toUpperCase()} navigation`,
    columns,
    utility,
  };
}
function toFooterDoc(id: string, siteRef: string, src: any) {
  const f = src.footer;
  const columns = (f.columns as any[]).map((col) => ({
    _type: "footerColumn",
    _key: key(),
    title: col.heading || undefined,
    links: (col.links as any[]).map((l) => ({
      _type: "footerColumnLink",
      _key: key(),
      name: l.label,
      url: toCustomUrl(l.href),
    })),
  }));
  const legalLinks = (f.legal as any[]).map((l) => ({
    _type: "footerColumnLink",
    _key: key(),
    name: l.label,
    url: toCustomUrl(l.href),
  }));
  const social = (f.social as any[]).map((s) => ({
    _type: "socialLink",
    _key: key(),
    platform: s.platform,
    url: s.href,
  }));
  return {
    _id: id,
    _type: "footer",
    site: ref(siteRef),
    label: `${src.slug.toUpperCase()} footer`,
    columns,
    legalLinks,
    social,
  };
}
