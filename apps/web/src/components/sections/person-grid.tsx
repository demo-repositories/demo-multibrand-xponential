import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { TextOrRichText } from "./text-or-rich-text";

type PersonGridProps = PagebuilderType<"personGrid">;

type PersonCard = NonNullable<PersonGridProps["people"]>[number];

function PersonCardItem({ person }: { person: PersonCard }) {
  const { name, role, title, portrait, brand } = person;
  const roleLine = [role, title].filter(Boolean).join(" · ");

  return (
    <article className="grid grid-rows-[auto_1fr] overflow-hidden rounded-3xl bg-muted">
      <div className="relative aspect-square w-full overflow-hidden bg-background">
        {portrait?.id && (
          <SanityImage
            className="h-full w-full object-cover"
            height={600}
            image={portrait}
            width={600}
          />
        )}
      </div>
      <div className="grid gap-2 p-6">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        {roleLine && (
          <p className="text-muted-foreground text-sm">{roleLine}</p>
        )}
        {brand?.name && (
          <Badge className="w-fit" variant="outline">
            {brand.name}
          </Badge>
        )}
      </div>
    </article>
  );
}

export function PersonGrid({ title, body, people }: PersonGridProps) {
  if (!people?.length) {
    return null;
  }

  return (
    <section className="my-6 md:my-16" id="person-grid">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {people.map((person) => (
            <PersonCardItem key={person._id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
