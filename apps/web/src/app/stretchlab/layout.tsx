import { SiteChrome } from "@/components/site-chrome";

export default function StretchLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome siteSlug="stretchlab">{children}</SiteChrome>;
}
