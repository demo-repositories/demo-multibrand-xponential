import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const serviceGrid = defineType({
  name: "serviceGrid",
  title: "Service grid",
  type: "object",
  icon: LayoutGrid,
  description: "A grid of services (StretchLab's 1:1 Stretch, Normatec Compression, etc.).",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({ name: "body", type: "text", rows: 2, title: "Intro body" }),
    defineField({
      name: "services", type: "array", title: "Services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "services.length" },
    prepare: ({ title, count }) => ({ title: title || "Service grid", subtitle: `${count || 0} service${count === 1 ? "" : "s"}` }),
  },
});
