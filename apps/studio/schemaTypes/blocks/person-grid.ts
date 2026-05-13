import { Users } from "lucide-react";
import { defineField, defineType } from "sanity";

export const personGrid = defineType({
  name: "personGrid",
  title: "Person grid",
  type: "object",
  icon: Users,
  description: "Grid of people — leadership team, flexologists, brand ambassadors.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({ name: "body", type: "text", rows: 2, title: "Intro body" }),
    defineField({
      name: "people", type: "array", title: "People",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "people.length" },
    prepare: ({ title, count }) => ({ title: title || "Person grid", subtitle: `${count || 0} ${count === 1 ? "person" : "people"}` }),
  },
});
