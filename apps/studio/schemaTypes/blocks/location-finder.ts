import { MapPin } from "lucide-react";
import { defineField, defineType } from "sanity";

export const locationFinder = defineType({
  name: "locationFinder",
  title: "Location finder",
  type: "object",
  icon: MapPin,
  description: "Studio finder block. Frontend handles the search UI; this block configures the surrounding content.",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "body", type: "text", rows: 2, title: "Body" }),
    defineField({ name: "ctaLabel", type: "string", title: "CTA label", initialValue: "Find a studio near you" }),
    defineField({
      name: "featuredStudios", type: "array", title: "Featured studios",
      description: "Optionally pin specific studios to show below the search input",
      of: [{ type: "reference", to: [{ type: "studio" }] }],
    }),
  ],
  preview: {
    select: { title: "title", count: "featuredStudios.length" },
    prepare: ({ title, count }) => ({ title: title || "Location finder", subtitle: count ? `${count} featured studio${count === 1 ? "" : "s"}` : "Search-only" }),
  },
});
