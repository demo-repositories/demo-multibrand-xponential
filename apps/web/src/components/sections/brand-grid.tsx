import Link from "next/link";

import { isSubBrandSiteSlug } from "@/lib/site";
import type { PagebuilderType } from "@/types";

type BrandGridProps = PagebuilderType<"brandGrid">;
type BrandCard = NonNullable<BrandGridProps["brands"]>[number];

const HERO_IMG_QS = "?w=900&auto=format&q=80&fit=max" as const;
const ALLOWED_LOGO_MIME_TYPES = new Set([
  "image/svg+xml",
  "image/png",
]);

function BrandCardItem({ brand }: { brand: BrandCard }) {
  const { name, heroImage, cardLogo, siteSlug } = brand;
  const linkable =
    typeof siteSlug === "string" && isSubBrandSiteSlug(siteSlug);
  const href = linkable ? `/${siteSlug}` : null;

  const logoUrl = cardLogo?.url ?? null;
  const logoMimeType = cardLogo?.mimeType ?? null;
  const logoOk =
    !!logoUrl && !!logoMimeType && ALLOWED_LOGO_MIME_TYPES.has(logoMimeType);

  const card = (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
      {heroImage?.url ? (
        // biome-ignore lint/performance/noImgElement: native lazy loading by design — bypasses sanity-image LQIP and next/image optimizer per product spec
        <img
          alt={heroImage.alt || name || ""}
          className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
          decoding="async"
          loading="lazy"
          src={`${heroImage.url}${HERO_IMG_QS}`}
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 flex h-1/3 items-end justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
        {logoOk && logoUrl ? (
          // biome-ignore lint/performance/noImgElement: native lazy loading by design — file-asset URL served directly without image-pipeline transforms
          <img
            alt={cardLogo?.alt || `${name} logo`}
            className="h-8 w-auto max-w-[70%] object-contain md:h-10"
            decoding="async"
            loading="lazy"
            src={logoUrl}
          />
        ) : (
          <span className="text-balance text-center font-bold text-white text-xl tracking-tight md:text-2xl">
            {name}
          </span>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link aria-label={`Visit ${name} site`} className="block" href={href}>
        {card}
      </Link>
    );
  }

  return card;
}

export function BrandGrid({ title, eyebrow, brands }: BrandGridProps) {
  if (!brands?.length) {
    return null;
  }

  return (
    <section className="my-6 md:my-16" id="brand-grid">
      <div className="container mx-auto px-4 md:px-6">
        {(eyebrow || title) && (
          <div className="mb-8 flex flex-col items-start gap-3 md:mb-12">
            {eyebrow && (
              <p className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance font-bold text-3xl md:text-5xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <BrandCardItem brand={brand} key={brand._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
