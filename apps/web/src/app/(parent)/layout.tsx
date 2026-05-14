import { SiteChrome } from "@/components/site-chrome";
import { PARENT_SITE_SLUG } from "@/lib/site";

export default function ParentSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome siteSlug={PARENT_SITE_SLUG}>{children}</SiteChrome>;
}
