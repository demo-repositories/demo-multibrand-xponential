import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";
import { fetchSiteHomePage } from "@/lib/site-pages";

const SITE_SLUG = "purebarre" as const;
const SITE_PATH = `/${SITE_SLUG}`;

export async function generateMetadata() {
  const { data } = await fetchSiteHomePage(SITE_SLUG);
  return getSEOMetadata({
    title: data?.title ?? data?.seoTitle,
    description: data?.description ?? data?.seoDescription,
    slug: SITE_PATH,
    contentId: data?._id,
    contentType: data?._type,
  });
}

export default async function PureBarreHomePage() {
  const { data } = await fetchSiteHomePage(SITE_SLUG);

  if (!data) {
    return <div>No home page data</div>;
  }

  const { _id, _type, pageBuilder } = data;

  return <PageBuilder id={_id} pageBuilder={pageBuilder ?? []} type={_type} />;
}
