import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type PressListProps = PagebuilderType<"pressList">;

type PressCard = NonNullable<PressListProps["items"]>[number];

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PressCardItem({ item }: { item: PressCard }) {
  const {
    headline,
    outlet,
    publishedAt,
    externalUrl,
    heroImage,
    isCrossSite,
    featuredOnCount,
  } = item;
  const formattedDate = formatDate(publishedAt);
  const card = (
    <article className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-3xl bg-muted transition-colors hover:bg-muted/80">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {heroImage?.id && (
          <SanityImage
            className="h-full w-full object-cover"
            height={500}
            image={heroImage}
            width={800}
          />
        )}
        {isCrossSite && featuredOnCount && featuredOnCount > 1 && (
          <Badge className="absolute top-4 left-4" variant="secondary">
            Featured on {featuredOnCount} sites
          </Badge>
        )}
      </div>
      <div className="grid gap-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground text-sm">
          {outlet && <span className="font-medium">{outlet}</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
        {headline && (
          <h3 className="font-semibold text-lg md:text-xl">{headline}</h3>
        )}
      </div>
    </article>
  );

  if (externalUrl) {
    return (
      <Link
        aria-label={`Read article from ${outlet ?? "press"}`}
        className="block h-full"
        href={externalUrl}
        rel="noopener"
        target="_blank"
      >
        {card}
      </Link>
    );
  }

  return card;
}

export function PressList({
  title,
  items,
  showCount,
}: PressListProps) {
  if (!items?.length) {
    return null;
  }

  const visible = showCount ? items.slice(0, showCount) : items;

  return (
    <section className="my-6 md:my-16" id="press-list">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="mb-10 text-balance text-center font-semibold text-3xl md:mb-16 md:text-5xl">
            {title}
          </h2>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <PressCardItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
