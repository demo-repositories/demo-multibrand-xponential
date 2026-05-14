/**
 * Site slug resolution for the multibrand frontend.
 *
 * URL pattern:
 *   /                  → parent (xpo)
 *   /:parentSlug       → parent (xpo) page
 *   /purebarre         → Pure Barre home
 *   /purebarre/:slug   → Pure Barre page
 *   /stretchlab        → StretchLab home
 *   /stretchlab/:slug  → StretchLab page
 *
 * Sanity per-site singleton IDs follow the convention
 * `${docType}-${siteSlug}` (e.g. `homePage-xpo`, `navbar-purebarre`).
 * The siteSlug values mirror the `siteSlug` field in each workspace's
 * config in `apps/studio/sanity.config.ts`.
 */

export const KNOWN_SITE_SLUGS = ["xpo", "purebarre", "stretchlab"] as const;
export type SiteSlug = (typeof KNOWN_SITE_SLUGS)[number];

export const SUB_BRAND_SITE_SLUGS = ["purebarre", "stretchlab"] as const;
export type SubBrandSiteSlug = (typeof SUB_BRAND_SITE_SLUGS)[number];

export const PARENT_SITE_SLUG: SiteSlug = "xpo";

export function isKnownSiteSlug(value: string): value is SiteSlug {
  return (KNOWN_SITE_SLUGS as readonly string[]).includes(value);
}

export function isSubBrandSiteSlug(value: string): value is SubBrandSiteSlug {
  return (SUB_BRAND_SITE_SLUGS as readonly string[]).includes(value);
}

export function resolveSiteSlug(maybeSlug?: string | null): SiteSlug {
  if (maybeSlug && isKnownSiteSlug(maybeSlug)) {
    return maybeSlug;
  }
  return PARENT_SITE_SLUG;
}

/**
 * URL prefix for a given site. Parent (`xpo`) lives at root (`""`),
 * sub-brand sites live under `/${siteSlug}`.
 */
export function siteUrlPrefix(siteSlug: SiteSlug): string {
  return siteSlug === PARENT_SITE_SLUG ? "" : `/${siteSlug}`;
}
