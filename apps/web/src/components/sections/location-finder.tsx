import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { TextOrRichText } from "./text-or-rich-text";

type LocationFinderProps = PagebuilderType<"locationFinder">;

type StudioCard = NonNullable<LocationFinderProps["featuredStudios"]>[number];

function StudioCardItem({ studio }: { studio: StudioCard }) {
  const { name, address, heroImage, introOfferPrice, bookingUrl } = studio;
  const locationLabel = [address?.city, address?.region]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="grid grid-rows-[auto_1fr_auto] overflow-hidden rounded-3xl bg-muted">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {heroImage?.id && (
          <SanityImage
            className="h-full w-full object-cover"
            height={500}
            image={heroImage}
            width={800}
          />
        )}
      </div>
      <div className="grid gap-2 p-6">
        <h3 className="font-semibold text-xl md:text-2xl">{name}</h3>
        {locationLabel && (
          <p className="text-muted-foreground text-sm md:text-base">
            {locationLabel}
          </p>
        )}
        {introOfferPrice && (
          <p className="font-medium text-sm">Intro offer: {introOfferPrice}</p>
        )}
      </div>
      {bookingUrl && (
        <div className="p-6 pt-0">
          <Button
            asChild
            className="w-full rounded-[10px]"
            variant="default"
          >
            <Link
              aria-label={`Book at ${name}`}
              href={bookingUrl}
              rel="noopener"
              target="_blank"
            >
              Book a class
            </Link>
          </Button>
        </div>
      )}
    </article>
  );
}

export function LocationFinder({
  title,
  body,
  ctaLabel,
  featuredStudios,
}: LocationFinderProps) {
  return (
    <section className="my-6 md:my-16" id="location-finder">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center space-y-6 text-center md:mb-16">
          {title && (
            <h2 className="text-balance font-semibold text-3xl md:text-5xl">
              {title}
            </h2>
          )}
          <TextOrRichText
            className="max-w-2xl text-balance text-muted-foreground md:text-lg"
            value={body}
          />
          <form
            action="/location-search"
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <label className="sr-only" htmlFor="location-finder-zip">
              Search by city or ZIP
            </label>
            <Input
              className="flex-1"
              id="location-finder-zip"
              name="q"
              placeholder="City or ZIP"
              type="search"
            />
            <Button className="rounded-[10px]" type="submit">
              {ctaLabel ?? "Find a studio"}
            </Button>
          </form>
        </div>
        {featuredStudios?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStudios.map((studio) => (
              <StudioCardItem key={studio._id} studio={studio} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
