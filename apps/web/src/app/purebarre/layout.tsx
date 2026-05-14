import { SiteChrome } from "@/components/site-chrome";

export default function PureBarreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome siteSlug="purebarre">{children}</SiteChrome>;
}
