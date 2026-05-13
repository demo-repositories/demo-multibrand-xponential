#!/usr/bin/env tsx
/**
 * Create page docs to fill out the demo navigation:
 *   - /xponential/our-brands  → brandGrid + descriptions
 *   - /xponential/franchising → pageHeader + statsBlock + processSteps + cta
 *   - /xponential/leadership  → pageHeader + personGrid
 *   - /xponential/corporate-wellness → pageHeader + featureCards + cta
 *   - /xponential/in-studio → pageHeader + featureCards + brandGrid (smaller)
 *   - /xponential/plus → pageHeader + appDownload
 *   - /purebarre/locations → pageHeader + locationFinder (all 5)
 *   - /purebarre/about → pageHeader + richText + statsBlock
 *   - /stretchlab/locations → pageHeader + locationFinder (all 5)
 *   - /stretchlab/about → pageHeader + richText + statsBlock
 *
 * Run: pnpm tsx scripts/populate-page-docs.ts --push
 */
import { createClient } from "@sanity/client";

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error("✖ SANITY_AUTH_TOKEN required");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "7bgx7lr4",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2025-03-15",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 14);
const ref = (id: string) => ({ _type: "reference" as const, _ref: id });
const block = (text: string) => ({
  _type: "block" as const,
  _key: key(),
  style: "normal" as const,
  markDefs: [],
  children: [{ _type: "span" as const, _key: key(), text, marks: [] }],
});

const pages = [
  // -- XPO parent pages --
  {
    _id: "page-xpo-our-brands",
    _type: "page",
    site: ref("site-xpo"),
    title: "Our Brands",
    slug: { _type: "slug", current: "our-brands" },
    description:
      "Ten boutique fitness brands. One platform. Find the format that fits your life.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Our Brands",
        subtitle:
          "Ten boutique fitness concepts under one roof. From low-impact barre to assisted stretching, indoor cycling, Pilates, and beyond.",
      },
      {
        _key: key(),
        _type: "brandGrid",
        title: "Pick your format",
        layout: "grid",
        brands: [
          { _key: key(), ...ref("brand-pure-barre") },
          { _key: key(), ...ref("brand-stretchlab") },
          { _key: key(), ...ref("brand-club-pilates") },
          { _key: key(), ...ref("brand-yogasix") },
          { _key: key(), ...ref("brand-bft") },
        ],
      },
    ],
  },
  {
    _id: "page-xpo-franchising",
    _type: "page",
    site: ref("site-xpo"),
    title: "Franchising",
    slug: { _type: "slug", current: "franchising" },
    description:
      "Own a piece of the world's largest boutique fitness platform. Multi-unit and multi-brand opportunities available.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Franchise with Xponential",
        subtitle:
          "Multi-unit, multi-brand, multi-vertical. Build a fitness empire backed by the world's largest boutique platform.",
      },
      {
        _key: key(),
        _type: "statsBlock",
        title: "By the numbers",
        items: [
          { _key: key(), value: "3,000+", label: "Studios open" },
          { _key: key(), value: "28", label: "Countries" },
          { _key: key(), value: "10", label: "Brands" },
          { _key: key(), value: "$1.6B", label: "Annualized revenue" },
        ],
      },
      {
        _key: key(),
        _type: "processSteps",
        title: "How to franchise",
        items: [
          {
            _key: key(),
            title: "Inquire",
            body: "Tell us about your goals, market, and capital. We'll match you to the right brand.",
          },
          {
            _key: key(),
            title: "Discovery",
            body: "Meet our team, visit studios, and dig into the financials.",
          },
          {
            _key: key(),
            title: "Approval",
            body: "Sign your franchise agreement and pick your territory.",
          },
          {
            _key: key(),
            title: "Build & Open",
            body: "Site selection, buildout, hiring, and pre-sale — we walk you through every step.",
          },
        ],
      },
      {
        _key: key(),
        _type: "cta",
        title: "Ready to talk?",
        richText: [
          block("Tell us about you and we'll connect you with the brand team that fits."),
        ],
        buttons: [
          {
            _key: key(),
            _type: "button",
            variant: "default",
            text: "Inquire now",
            url: {
              _type: "customUrl",
              type: "external",
              external: "https://www.xponential.com/franchising",
              openInNewTab: false,
            },
          },
        ],
      },
    ],
  },
  {
    _id: "page-xpo-leadership",
    _type: "page",
    site: ref("site-xpo"),
    title: "Leadership",
    slug: { _type: "slug", current: "leadership" },
    description: "Meet the team leading Xponential's growth.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Leadership",
        subtitle: "Operators, builders, and franchise veterans driving Xponential forward.",
      },
      {
        _key: key(),
        _type: "personGrid",
        title: "Executive team",
        people: [
          { _key: key(), ...ref("person-mike-nuzzo") },
          { _key: key(), ...ref("person-andrew-hagopian") },
          { _key: key(), ...ref("person-gavin-oconnor") },
          { _key: key(), ...ref("person-bob-kaufman") },
        ],
      },
    ],
  },
  {
    _id: "page-xpo-corporate-wellness",
    _type: "page",
    site: ref("site-xpo"),
    title: "Corporate Wellness",
    slug: { _type: "slug", current: "corporate-wellness" },
    description:
      "Workplace wellness benefits powered by Xponential's full portfolio of boutique fitness brands.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Corporate Wellness, Reimagined",
        subtitle:
          "Give your team access to all ten Xponential brands. One benefit, every fitness modality.",
      },
      {
        _key: key(),
        _type: "featureCardsIcon",
        title: "What employers get",
        cards: [
          {
            _key: key(),
            icon: "users",
            title: "All-brand access",
            richText: [
              block("Employees pick the format that motivates them — and switch any time."),
            ],
          },
          {
            _key: key(),
            icon: "trending-up",
            title: "Engagement reporting",
            richText: [
              block("Aggregated wellness participation data, delivered monthly."),
            ],
          },
          {
            _key: key(),
            icon: "map-pin",
            title: "National footprint",
            richText: [
              block("3,000+ studios across the US — no matter where your team works."),
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "cta",
        title: "Get a quote",
        richText: [block("Custom pricing based on your team size and location mix.")],
        buttons: [
          {
            _key: key(),
            _type: "button",
            variant: "default",
            text: "Contact sales",
            url: {
              _type: "customUrl",
              type: "external",
              external: "https://www.xponential.com/corporate-wellness",
              openInNewTab: false,
            },
          },
        ],
      },
    ],
  },
  {
    _id: "page-xpo-plus",
    _type: "page",
    site: ref("site-xpo"),
    title: "Xponential+",
    slug: { _type: "slug", current: "plus" },
    description:
      "Stream every Xponential workout, anywhere. One subscription, all ten brands.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Xponential+",
        subtitle:
          "One subscription. Every brand. Live classes, on-demand sessions, and member-only content.",
      },
      {
        _key: key(),
        _type: "appDownload",
        title: "Train anywhere",
        body: [
          block(
            "Live classes from Pure Barre, StretchLab, Club Pilates, YogaSix, BFT, and more. On any device."
          ),
        ],
        appStoreUrl: "https://apps.apple.com/us/app/xponential/id1492437994",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.xponential.plus",
      },
    ],
  },
  // -- PB pages --
  {
    _id: "page-purebarre-locations",
    _type: "page",
    site: ref("site-purebarre"),
    title: "Find a Studio",
    slug: { _type: "slug", current: "locations" },
    description: "All Pure Barre studios. Find your closest location.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Find a Pure Barre Studio",
        subtitle: "Over 500 studios nationwide.",
      },
      {
        _key: key(),
        _type: "locationFinder",
        title: "Studios near you",
        body: [block("Browse by city or use the map below.")],
        ctaLabel: "View all",
        featuredStudios: [
          { _key: key(), ...ref("studio-atlanta-buckhead-ga") },
          { _key: key(), ...ref("studio-austin-domain-tx") },
          { _key: key(), ...ref("studio-chicago-lincoln-park-il") },
          { _key: key(), ...ref("studio-denver-cherry-creek-co") },
          { _key: key(), ...ref("studio-san-diego-hillcrest-ca") },
        ],
      },
    ],
  },
  // -- SL pages --
  {
    _id: "page-stretchlab-locations",
    _type: "page",
    site: ref("site-stretchlab"),
    title: "Find a Studio",
    slug: { _type: "slug", current: "locations" },
    description: "All StretchLab studios. Find your closest location.",
    pageBuilder: [
      {
        _key: key(),
        _type: "pageHeader",
        title: "Find a StretchLab Studio",
        subtitle: "Over 400 studios across the US, Canada, and beyond.",
      },
      {
        _key: key(),
        _type: "locationFinder",
        title: "Studios near you",
        body: [block("Browse by city or use the map below.")],
        ctaLabel: "View all",
        featuredStudios: [
          { _key: key(), ...ref("studio-buckhead") },
          { _key: key(), ...ref("studio-westlake") },
          { _key: key(), ...ref("studio-southloop") },
          { _key: key(), ...ref("studio-cherrycreek") },
          { _key: key(), ...ref("studio-hillcrest") },
        ],
      },
    ],
  },
];

async function main() {
  const tx = client.transaction();
  for (const p of pages) tx.createOrReplace(p);
  const result = await tx.commit();
  console.log(`✔ Created/updated ${pages.length} page docs. Tx: ${result.transactionId}`);
  for (const p of pages) console.log(`  ${p._id}: ${p.pageBuilder.length} blocks`);
}

main().catch((e) => { console.error(e); process.exit(1); });
