import { sanityFetch } from "@workspace/sanity/live";
import {
  queryGlobalSeoSettings,
  queryNavbarData,
} from "@workspace/sanity/query";

import type { SiteSlug } from "@/lib/site";

export const getNavigationData = async (siteSlug: SiteSlug) => {
  const [navbarData, settingsData] = await Promise.all([
    sanityFetch({ query: queryNavbarData, params: { siteSlug } }),
    sanityFetch({ query: queryGlobalSeoSettings, params: { siteSlug } }),
  ]);

  return { navbarData: navbarData.data, settingsData: settingsData.data };
};
