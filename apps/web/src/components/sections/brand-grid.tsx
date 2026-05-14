import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type BrandGridProps = PagebuilderType<"brandGrid">;

type BrandCard = NonNullable<BrandGridProps["brands"]>[number];

function BrandCardItem({ brand }: { brand: BrandCard }) {
  const { name, tagline, externalUrl, cardLogo, slug } = brand;
  const content = (
    <div className="grid h-full grid-rows-[auto_auto_1fr_auto] gap-3 rounded-3xl bg-muted p-6 transition-colors hover:bg-muted/80 md:p-8">
      <div className="flex h-16 items-center">
        {cardLogo?.id ? (
          <SanityImage
            className="h-12 w-auto object-contain"
            height={48}
            image={cardLogo}
            width={160}
          />
        ) : (
          <span className="font-semibold text-xl">{name}</span>
        )}
      </div>
      <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
      {tagline && (
        <p className="text-muted-foreground text-sm md:text-base">{tagline}</p>
      )}
      {externalUrl && (
        <span className="font-medium text-sm underline decoration-dotted underline-offset-4">
          Learn more
        </span>
      )}
    </div>
  );

  if (externalUrl) {
    return (
      <Link
        aria-label={`Visit ${name}`}
        className="block h-full"
        href={externalUrl}
        rel="noopener"
        target="_blank"
      >
        {content}
      </Link>
    );
  }

  if (slug) {
    return (
      <Link aria-label={`Visit ${name}`} className="block h-full" href={slug}>
        {content}
      </Link>
    );
  }

  return content;
}

export function BrandGrid({ title, eyebrow, brands }: BrandGridProps) {
  if (!brands?.length) {
    return null;
  }

  return (
    <section className="my-6 md:my-16" id="brand-grid">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center space-y-4 text-center md:mb-16">
          {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
          {title && (
            <h2 className="text-balance font-semibold text-3xl md:text-5xl">
              {title}
            </h2>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <BrandCardItem brand={brand} key={brand._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
