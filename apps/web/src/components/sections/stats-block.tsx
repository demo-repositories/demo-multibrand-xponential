import type { PagebuilderType } from "@/types";

type StatsBlockProps = PagebuilderType<"statsBlock">;

export function StatsBlock({ title, items }: StatsBlockProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="my-6 md:my-16" id="stats-block">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="mb-10 text-balance text-center font-semibold text-3xl md:mb-16 md:text-5xl">
            {title}
          </h2>
        )}
        <div className="grid gap-8 rounded-3xl bg-muted p-8 sm:grid-cols-2 md:p-12 lg:grid-cols-4">
          {items.map((item) => (
            <div className="grid gap-2 text-center" key={item._key}>
              {item.value && (
                <p className="font-semibold text-4xl tracking-tight md:text-6xl">
                  {item.value}
                </p>
              )}
              {item.label && (
                <p className="font-medium text-base md:text-lg">{item.label}</p>
              )}
              {item.footnote && (
                <p className="text-muted-foreground text-xs">{item.footnote}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
