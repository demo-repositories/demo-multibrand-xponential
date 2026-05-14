/**
 * GROQ query fragments for Xponential demo block types.
 *
 * These fragments extend the base query.ts. They will be merged into the
 * main pageBuilder query once TypeGen has been run against the deployed schema.
 *
 * Each fragment is GROQ-only (no JS), so it can be reviewed by a Sanity dev
 * without running the codebase.
 *
 * Fragments cover the new domain blocks:
 *   - brandGrid, classGrid, serviceGrid, personGrid, postGrid, pressList
 *   - testimonialCarousel, partnerStrip
 *   - appDownload, locationFinder
 *   - tabbedInfo, statsBlock, pageHeader, processSteps
 *
 * Plus extended fragments for entity references:
 *   - brandRef — brand entity preview (logo, color palette, slug)
 *   - studioRef — studio entity preview (address, geo, brand)
 *   - personRef — person preview (name, role, portrait)
 *   - testimonialRef, classFormatRef, serviceRef, pressItemRef
 */

// ----- Reusable field fragments -----

const imageWithAlt = /* groq */ `
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  "url": asset->url,
  "alt": coalesce(alt, asset->altText, asset->originalFilename, ""),
  hotspot { x, y },
  crop { top, right, bottom, left }
`;

const customLink = /* groq */ `
  url {
    type,
    openInNewTab,
    "href": select(
      type == "internal" => internal->slug.current,
      type == "external" => external,
      "#"
    )
  }
`;

// ----- Entity reference projections -----
// Each "...Ref" projects the minimum data needed to render the entity in a card/grid

export const brandRefFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  tagline,
  externalUrl,
  orderRank,
  colorPalette,
  "cardLogo": cardLogo { ${imageWithAlt} },
  "modalLogo": modalLogo { ${imageWithAlt} },
  "heroImage": heroImage { ${imageWithAlt} }
`;

export const personRefFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  role,
  title,
  "portrait": portrait { ${imageWithAlt} },
  "brand": brand->{ _id, name, "slug": slug.current }
`;

export const studioRefFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  address,
  geo,
  phone,
  introOfferPrice,
  bookingUrl,
  "brand": brand->{ _id, name, "slug": slug.current },
  "heroImage": heroImage { ${imageWithAlt} }
`;

export const classFormatRefFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  duration,
  shortDescription,
  badge,
  intensity,
  "image": image { ${imageWithAlt} }
`;

export const serviceRefFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  durationOptions,
  shortDescription,
  "image": image { ${imageWithAlt} }
`;

export const testimonialRefFragment = /* groq */ `
  _id,
  personName,
  location,
  quote,
  "portrait": portrait { ${imageWithAlt} },
  "brand": brand->{ _id, name, "slug": slug.current }
`;

export const pressItemRefFragment = /* groq */ `
  _id,
  headline,
  "slug": slug.current,
  publishedAt,
  outlet,
  externalUrl,
  excerpt,
  "heroImage": heroImage { ${imageWithAlt} },
  "isCrossSite": count(featuredOn) > 1,
  "featuredOnCount": count(featuredOn)
`;

// ----- Block fragments -----

export const brandGridBlock = /* groq */ `
  _type == "brandGrid" => {
    _key, _type, title, eyebrow, layout,
    "brands": brands[]->{ ${brandRefFragment} }
  }
`;

export const classGridBlock = /* groq */ `
  _type == "classGrid" => {
    _key, _type, title, body,
    "classes": classes[]->{ ${classFormatRefFragment} }
  }
`;

export const serviceGridBlock = /* groq */ `
  _type == "serviceGrid" => {
    _key, _type, title, body,
    "services": services[]->{ ${serviceRefFragment} }
  }
`;

export const personGridBlock = /* groq */ `
  _type == "personGrid" => {
    _key, _type, title, body,
    "people": people[]->{ ${personRefFragment} }
  }
`;

export const testimonialCarouselBlock = /* groq */ `
  _type == "testimonialCarousel" => {
    _key, _type, title, body,
    "testimonials": testimonials[]->{ ${testimonialRefFragment} }
  }
`;

export const partnerStripBlock = /* groq */ `
  _type == "partnerStrip" => {
    _key, _type, title,
    logos[] {
      _key,
      "logo": logo { ${imageWithAlt} },
      label,
      url
    }
  }
`;

/**
 * pressList — auto mode pulls latest press items featuring this site;
 * curated mode uses an explicit reference array.
 *
 * The $siteSlug parameter must be passed at query time. Auto mode uses it
 * to filter pressItem.featuredOn[]->slug.current.
 */
export const pressListBlock = /* groq */ `
  _type == "pressList" => {
    _key, _type, title, source, showCount,
    "items": select(
      source == "curated" => items[]->{ ${pressItemRefFragment} },
      *[
        _type == "pressItem"
        && $siteSlug in featuredOn[]->slug.current
      ] | order(publishedAt desc) [0...12] { ${pressItemRefFragment} }
    )
  }
`;

/**
 * postGrid — same auto/curated pattern as pressList.
 */
export const postGridBlock = /* groq */ `
  _type == "postGrid" => {
    _key, _type, title, source, showCount,
    "items": select(
      source == "curated" => items[]->{
        _id, title, "slug": slug.current, description, orderRank,
        "image": image { ${imageWithAlt} },
        publishedAt
      },
      *[
        _type == "blog"
        && site->slug.current == $siteSlug
      ] | order(orderRank asc) [0...coalesce(^.showCount, 3)] {
        _id, title, "slug": slug.current, description, orderRank,
        "image": image { ${imageWithAlt} },
        publishedAt
      }
    )
  }
`;

export const appDownloadBlock = /* groq */ `
  _type == "appDownload" => {
    _key, _type, title, body, appStoreUrl, playStoreUrl,
    "deviceMockup": deviceMockup { ${imageWithAlt} }
  }
`;

export const locationFinderBlock = /* groq */ `
  _type == "locationFinder" => {
    _key, _type, title, body, ctaLabel,
    "featuredStudios": featuredStudios[]->{ ${studioRefFragment} }
  }
`;

export const tabbedInfoBlock = /* groq */ `
  _type == "tabbedInfo" => {
    _key, _type, title,
    tabs[] {
      _key, label, body,
      "image": image { ${imageWithAlt} }
    }
  }
`;

export const statsBlockBlock = /* groq */ `
  _type == "statsBlock" => {
    _key, _type, title,
    items[] { _key, value, label, footnote }
  }
`;

export const pageHeaderBlock = /* groq */ `
  _type == "pageHeader" => {
    _key, _type, title, subtitle,
    "image": image { ${imageWithAlt} }
  }
`;

export const processStepsBlock = /* groq */ `
  _type == "processSteps" => {
    _key, _type, title,
    items[] {
      _key, icon, title, body
    }
  }
`;

// ----- Aggregate fragment -----

/**
 * The combined pageBuilder selector for our 14 new blocks. Compose with the
 * 7 template blocks (hero, cta, faqAccordion, featureCardsIcon, imageLinkCards,
 * richTextBlock, subscribeNewsletter) in the main query.
 *
 * Usage:
 *   pageBuilder[] {
 *     _key,
 *     _type,
 *     ... existing template selectors,
 *     ${newBlocksPageBuilderSelectors}
 *   }
 */
export const newBlocksPageBuilderSelectors = [
  brandGridBlock,
  classGridBlock,
  serviceGridBlock,
  personGridBlock,
  testimonialCarouselBlock,
  partnerStripBlock,
  pressListBlock,
  postGridBlock,
  appDownloadBlock,
  locationFinderBlock,
  tabbedInfoBlock,
  statsBlockBlock,
  pageHeaderBlock,
  processStepsBlock,
].join(",\n  ");

// ----- Standalone entity queries -----

/**
 * For the parent Xponential site's /our-brands page when not driven by a
 * brandGrid block — pulls all brand documents in display order.
 */
export const queryAllBrands = /* groq */ `
*[_type == "brand"] | order(orderRank asc) {
  ${brandRefFragment},
  description,
  voiceGuide
}
`;

/**
 * For a press item detail page — full content + cross-site footprint.
 */
export const queryPressItemBySlug = /* groq */ `
*[_type == "pressItem" && slug.current == $slug][0] {
  ${pressItemRefFragment},
  body,
  "featuredOn": featuredOn[]->{ _id, name, "slug": slug.current, "brandName": brand->name },
  "brands": brands[]->{ _id, name, "slug": slug.current }
}
`;

/**
 * For a studio detail page.
 */
export const queryStudioBySlug = /* groq */ `
*[_type == "studio" && slug.current == $slug && site->slug.current == $siteSlug][0] {
  ${studioRefFragment},
  email,
  hours,
  mapsEmbedUrl,
  membershipTiers,
  "services": services[]->{
    _type == "classFormat" => { _type, ${classFormatRefFragment} },
    _type == "service" => { _type, ${serviceRefFragment} }
  },
  "staff": staff[]->{ ${personRefFragment} }
}
`;

/**
 * For listing studios on /location-search and regional hubs.
 */
export const queryStudiosForSite = /* groq */ `
*[_type == "studio" && site->slug.current == $siteSlug]
| order(address.city asc) {
  ${studioRefFragment}
}
`;

/**
 * For the legal-page footer references — pulls all legalPages featured on a site.
 */
export const queryLegalPagesForSite = /* groq */ `
*[_type == "legalPage" && $siteSlug in featuredOn[]->slug.current] | order(title asc) {
  _id, title, "slug": slug.current, lastReviewed, version
}
`;
