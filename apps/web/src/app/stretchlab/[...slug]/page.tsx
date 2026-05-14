import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";
import { fetchSitePage } from "@/lib/site-pages";

const SITE_SLUG = "stretchlab" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = `/${slug.join("/")}`;
  const { data } = await fetchSitePage(SITE_SLUG, slugString);

  return getSEOMetadata({
    title: data?.title ?? data?.seoTitle,
    description: data?.description ?? data?.seoDescription,
    slug: `/${SITE_SLUG}${slugString}`,
    contentId: data?._id,
    contentType: data?._type,
  });
}

export const dynamicParams = true;

export default async function StretchLabSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = `/${slug.join("/")}`;
  const { data } = await fetchSitePage(SITE_SLUG, slugString);

  if (!data) {
    return notFound();
  }

  const { title, pageBuilder, _id, _type } = data;

  return !Array.isArray(pageBuilder) || pageBuilder.length === 0 ? (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 font-semibold text-2xl capitalize">{title}</h1>
      <p className="mb-6 text-muted-foreground">
        This page has no content blocks yet.
      </p>
    </div>
  ) : (
    <PageBuilder id={_id} pageBuilder={pageBuilder} type={_type} />
  );
}
