import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { TextOrRichText } from "./text-or-rich-text";

type ServiceGridProps = PagebuilderType<"serviceGrid">;

type ServiceCard = NonNullable<ServiceGridProps["services"]>[number];

function ServiceCardItem({ service }: { service: ServiceCard }) {
  const { name, durationOptions, shortDescription, image } = service;
  const durationLabel = durationOptions?.length
    ? durationOptions.map((d) => String(d)).join(" · ")
    : null;

  return (
    <article className="grid grid-rows-[auto_1fr] overflow-hidden rounded-3xl bg-muted">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
        {image?.id && (
          <SanityImage
            className="h-full w-full object-cover"
            height={600}
            image={image}
            width={800}
          />
        )}
      </div>
      <div className="grid gap-3 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold text-xl md:text-2xl">{name}</h3>
          {durationLabel && (
            <span className="text-muted-foreground text-sm">
              {durationLabel}
            </span>
          )}
        </div>
        {shortDescription && (
          <p className="text-muted-foreground text-sm md:text-base">
            {shortDescription}
          </p>
        )}
      </div>
    </article>
  );
}

export function ServiceGrid({ title, body, services }: ServiceGridProps) {
  if (!services?.length) {
    return null;
  }

  return (
    <section className="my-6 md:my-16" id="service-grid">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center space-y-4 text-center md:mb-16">
          {title && (
            <h2 className="text-balance font-semibold text-3xl md:text-5xl">
              {title}
            </h2>
          )}
          <TextOrRichText
            className="max-w-2xl text-balance text-muted-foreground md:text-lg"
            value={body}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCardItem key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
