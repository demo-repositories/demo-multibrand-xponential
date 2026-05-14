import { Suspense } from "react";

import { FooterServer, FooterSkeleton } from "@/components/footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { getNavigationData } from "@/lib/navigation";
import type { SiteSlug } from "@/lib/site";

/**
 * Renders the site-scoped chrome (navbar + footer + JSON-LD) for a
 * given site.
 *
 * Used by each per-site layout (`(parent)/layout.tsx`,
 * `purebarre/layout.tsx`, `stretchlab/layout.tsx`) so each workspace's
 * Presentation preview shows the correct branded navigation and
 * structured-data signals.
 */
export async function SiteChrome({
  siteSlug,
  children,
}: {
  siteSlug: SiteSlug;
  children: React.ReactNode;
}) {
  const nav = await getNavigationData(siteSlug);
  return (
    <>
      <Navbar
        navbarData={nav.navbarData}
        settingsData={nav.settingsData}
        siteSlug={siteSlug}
      />
      {children}
      <Suspense fallback={<FooterSkeleton />}>
        <FooterServer siteSlug={siteSlug} />
      </Suspense>
      <CombinedJsonLd includeOrganization includeWebsite siteSlug={siteSlug} />
    </>
  );
}
