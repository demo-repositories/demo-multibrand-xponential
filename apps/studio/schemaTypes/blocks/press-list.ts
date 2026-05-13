import { Newspaper } from "lucide-react";
import { defineField, defineType } from "sanity";

export const pressList = defineType({
  name: "pressList",
  title: "Press / news list",
  type: "object",
  icon: Newspaper,
  description: "Display recent press items. Source 'auto' shows all press items for this site automatically; 'curated' lets you hand-pick which ones.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({
      name: "source", type: "string", title: "Source",
      options: { list: [{ title: "Auto — show recent items featuring this site", value: "auto" }, { title: "Curated — pick specific items", value: "curated" }], layout: "radio" },
      initialValue: "auto",
    }),
    defineField({
      name: "showCount", type: "number", title: "Show how many?",
      description: "Used when Source is 'auto'", initialValue: 3, validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: "items", type: "array", title: "Items",
      description: "Used when Source is 'curated'",
      of: [{ type: "reference", to: [{ type: "pressItem" }] }],
      hidden: ({ parent }) => parent?.source !== "curated",
    }),
  ],
  preview: {
    select: { title: "title", source: "source", count: "items.length", showCount: "showCount" },
    prepare: ({ title, source, count, showCount }) => ({
      title: title || "Press list",
      subtitle: source === "curated" ? `Curated · ${count || 0} item${count === 1 ? "" : "s"}` : `Auto · latest ${showCount || 3}`,
    }),
  },
});
