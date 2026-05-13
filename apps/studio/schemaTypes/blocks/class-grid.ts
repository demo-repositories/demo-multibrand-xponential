import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const classGrid = defineType({
  name: "classGrid",
  title: "Class grid",
  type: "object",
  icon: LayoutGrid,
  description: "A grid of class formats (Pure Barre Classic, Align, Empower, Define).",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({ name: "body", type: "text", rows: 2, title: "Intro body" }),
    defineField({
      name: "classes", type: "array", title: "Classes",
      of: [{ type: "reference", to: [{ type: "classFormat" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "classes.length" },
    prepare: ({ title, count }) => ({ title: title || "Class grid", subtitle: `${count || 0} class${count === 1 ? "" : "es"}` }),
  },
});
