import { sanityFetch } from "@workspace/sanity/live";
import { queryHomePageData, querySlugPageData } from "@workspace/sanity/query";

import type { SiteSlug } from "@/lib/site";

export async function fetchSiteHomePage(siteSlug: SiteSlug) {
  return await sanityFetch({
    query: queryHomePageData,
    params: { siteSlug },
  });
}

/**
 * Fetch a `page` document by its full slug.
 *
 * NOTE: The `page` schema does not yet carry a `site` reference, so this
 * lookup is currently NOT site-scoped — a slug collision across sites
 * would resolve to whichever document Sanity returns first. Add a `site`
 * field to the page schema (and update this query) once the demo needs
 * per-site authored pages.
 */
export async function fetchSitePage(_siteSlug: SiteSlug, slug: string) {
  return await sanityFetch({
    query: querySlugPageData,
    params: { slug },
  });
}
