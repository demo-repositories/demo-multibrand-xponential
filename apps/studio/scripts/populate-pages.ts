#!/usr/bin/env tsx
/**
 * Populate the three homePage docs with realistic pageBuilder content
 * using the blocks we shipped. This is the visible demo state.
 *
 * Each homePage gets a curated pageBuilder array showing off the schema:
 * - xpo home: brandGrid + statsBlock + pressList (cross-site) + personGrid (leadership)
 * - purebarre home: hero + classGrid + testimonialCarousel + locationFinder + pressList
 * - stretchlab home: hero + serviceGrid + testimonialCarousel + locationFinder + pressList
 *
 * Run:
 *   pnpm tsx scripts/populate-pages.ts --push
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
const blockKey = (text: string) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

// ----- Xponential parent home -----
const xpoHome = {
  _id: "homePage-xpo",
  _type: "homePage",
  title: "Xponential Fitness",
  description: "The largest fitness franchise group of boutique fitness brands across verticals including Pilates, Barre, Stretching, Boxing, and more.",
  pageBuilder: [
    {
      _key: key(),
      _type: "hero",
      title: "Move boldly. Live fully.",
      richText: [
        blockKey(
          "Xponential is the world's largest boutique fitness franchise group. Across ten brands and thousands of studios, we help people move better, train smarter, and live longer."
        ),
      ],
      buttons: [
        {
          _key: key(),
          _type: "button",
          variant: "default",
          text: "Find your studio",
          url: { _type: "customUrl", type: "external", external: "https://www.xponential.com/our-brands", openInNewTab: false },
        },
        {
          _key: key(),
          _type: "button",
          variant: "secondary",
          text: "Inquire to franchise",
          url: { _type: "customUrl", type: "external", external: "https://www.xponential.com/franchising", openInNewTab: false },
        },
      ],
    },
    {
      _key: key(),
      _type: "brandGrid",
      title: "Our Brands",
      eyebrow: "Ten brands. One platform.",
      layout: "grid",
      brands: [
        { _key: key(), ...ref("brand-pure-barre") },
        { _key: key(), ...ref("brand-stretchlab") },
        { _key: key(), ...ref("brand-club-pilates") },
        { _key: key(), ...ref("brand-yogasix") },
        { _key: key(), ...ref("brand-bft") },
      ],
    },
    {
      _key: key(),
      _type: "statsBlock",
      title: "Built for scale",
      items: [
        { _key: key(), value: "3,000+", label: "Studios open", footnote: "Across 28 countries" },
        { _key: key(), value: "$1.6B", label: "Brand revenue", footnote: "Annualized run-rate" },
        { _key: key(), value: "10", label: "Brands", footnote: "Pilates, barre, stretch, yoga, HIIT, boxing & more" },
        { _key: key(), value: "25M+", label: "Workouts delivered", footnote: "Last 12 months" },
      ],
    },
    {
      _key: key(),
      _type: "pressList",
      title: "In the News",
      source: "auto",
      showCount: 3,
    },
    {
      _key: key(),
      _type: "personGrid",
      title: "Leadership",
      people: [
        { _key: key(), ...ref("person-mike-nuzzo") },
        { _key: key(), ...ref("person-andrew-hagopian") },
        { _key: key(), ...ref("person-gavin-oconnor") },
        { _key: key(), ...ref("person-bob-kaufman") },
      ],
    },
  ],
};

// ----- Pure Barre home -----
const purebarreHome = {
  _id: "homePage-purebarre",
  _type: "homePage",
  title: "Pure Barre",
  description: "Pure Barre offers effective low impact, full-body workouts in a barre class that strengthens your mind and body.",
  pageBuilder: [
    {
      _key: key(),
      _type: "hero",
      title: "The Best Full Body Workout",
      richText: [
        blockKey(
          "Lift. Tone. Burn. Pure Barre's signature low-impact, high-intensity barre classes target every major muscle group while protecting your joints."
        ),
      ],
      buttons: [
        {
          _key: key(),
          _type: "button",
          variant: "default",
          text: "Find a studio",
          url: { _type: "customUrl", type: "external", external: "https://www.purebarre.com/location-search", openInNewTab: false },
        },
        {
          _key: key(),
          _type: "button",
          variant: "secondary",
          text: "Try a class",
          url: { _type: "customUrl", type: "external", external: "https://www.purebarre.com", openInNewTab: false },
        },
      ],
    },
    {
      _key: key(),
      _type: "classGrid",
      title: "Find Your Class",
      body: [blockKey("Four signature class formats. Choose your intensity.")],
      classes: [
        { _key: key(), ...ref("classFormat-purebarre-pure-barre-classic") },
        { _key: key(), ...ref("classFormat-purebarre-pure-barre-align") },
        { _key: key(), ...ref("classFormat-purebarre-pure-barre-empower") },
        { _key: key(), ...ref("classFormat-purebarre-pure-barre-define") },
      ],
    },
    {
      _key: key(),
      _type: "locationFinder",
      title: "Find a studio near you",
      body: [blockKey("Over 500 Pure Barre studios nationwide. Drop in for your first class.")],
      ctaLabel: "All locations",
      featuredStudios: [
        { _key: key(), ...ref("studio-atlanta-buckhead-ga") },
        { _key: key(), ...ref("studio-austin-domain-tx") },
        { _key: key(), ...ref("studio-san-diego-hillcrest-ca") },
      ],
    },
    {
      _key: key(),
      _type: "pressList",
      title: "Press",
      source: "auto",
      showCount: 3,
    },
    {
      _key: key(),
      _type: "appDownload",
      title: "Take Pure Barre with you",
      body: [blockKey("Book classes, track your progress, and join Pure Barre GO sessions from anywhere.")],
      appStoreUrl: "https://apps.apple.com/us/app/pure-barre/id1472033168",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.xponential.purebarre",
    },
  ],
};

// ----- StretchLab home -----
const stretchlabHome = {
  _id: "homePage-stretchlab",
  _type: "homePage",
  title: "StretchLab",
  description: "StretchLab offers customized assisted stretch sessions with certified stretch practitioners trained in kinesiology and other types of therapy.",
  pageBuilder: [
    {
      _key: key(),
      _type: "hero",
      title: "Don't just stretch. Get stretched.",
      richText: [
        blockKey(
          "StretchLab pairs you with a certified Flexologist™ who delivers customized assisted stretching sessions. Improve flexibility, reduce pain, recover faster."
        ),
      ],
      buttons: [
        {
          _key: key(),
          _type: "button",
          variant: "default",
          text: "Find a studio",
          url: { _type: "customUrl", type: "external", external: "https://www.stretchlab.com/location-search", openInNewTab: false },
        },
        {
          _key: key(),
          _type: "button",
          variant: "secondary",
          text: "Book a session",
          url: { _type: "customUrl", type: "external", external: "https://www.stretchlab.com", openInNewTab: false },
        },
      ],
    },
    {
      _key: key(),
      _type: "serviceGrid",
      title: "How we stretch",
      body: [blockKey("One-on-one or in a small group. Same expert technique either way.")],
      services: [
        { _key: key(), ...ref("service-stretchlab-one-on-one") },
        { _key: key(), ...ref("service-stretchlab-group-stretch") },
      ],
    },
    {
      _key: key(),
      _type: "locationFinder",
      title: "Find your StretchLab",
      body: [blockKey("Over 400 studios across the US, Canada, and beyond.")],
      ctaLabel: "All locations",
      featuredStudios: [
        { _key: key(), ...ref("studio-hillcrest") },
        { _key: key(), ...ref("studio-buckhead") },
        { _key: key(), ...ref("studio-cherrycreek") },
      ],
    },
    {
      _key: key(),
      _type: "pressList",
      title: "In the News",
      source: "auto",
      showCount: 3,
    },
    {
      _key: key(),
      _type: "appDownload",
      title: "Live long. Move well.",
      body: [blockKey("Track your stretch sessions, set goals, and stay flexible wherever you are.")],
      appStoreUrl: "https://apps.apple.com/us/app/stretchlab-live-long/id1484392665",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.xponential.stretchlab",
    },
  ],
};

async function main() {
  const tx = client.transaction();
  tx.createOrReplace(xpoHome);
  tx.createOrReplace(purebarreHome);
  tx.createOrReplace(stretchlabHome);
  const result = await tx.commit();
  console.log(`✔ Populated 3 home pages. Tx: ${result.transactionId}`);
  console.log(`  xpo: ${xpoHome.pageBuilder.length} blocks`);
  console.log(`  pb:  ${purebarreHome.pageBuilder.length} blocks`);
  console.log(`  sl:  ${stretchlabHome.pageBuilder.length} blocks`);
}

main().catch((e) => { console.error(e); process.exit(1); });
