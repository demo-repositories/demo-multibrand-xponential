import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { TextOrRichText } from "./text-or-rich-text";

type ClassGridProps = PagebuilderType<"classGrid">;

type ClassCard = NonNullable<ClassGridProps["classes"]>[number];

function ClassCardItem({ classItem }: { classItem: ClassCard }) {
  const { name, duration, intensity, shortDescription, image, badge } =
    classItem;

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
        {badge && (
          <Badge className="absolute top-4 left-4" variant="secondary">
            {badge}
          </Badge>
        )}
      </div>
      <div className="grid gap-3 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold text-xl md:text-2xl">{name}</h3>
          {duration && (
            <span className="text-muted-foreground text-sm">
              {duration} min
            </span>
          )}
        </div>
        {typeof intensity === "number" && (
          <Badge className="w-fit" variant="outline">
            Intensity {intensity}/5
          </Badge>
        )}
        {shortDescription && (
          <p className="text-muted-foreground text-sm md:text-base">
            {shortDescription}
          </p>
        )}
      </div>
    </article>
  );
}

export function ClassGrid({ title, body, classes }: ClassGridProps) {
  if (!classes?.length) {
    return null;
  }

  return (
    <section className="my-6 md:my-16" id="class-grid">
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
          {classes.map((classItem) => (
            <ClassCardItem classItem={classItem} key={classItem._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
