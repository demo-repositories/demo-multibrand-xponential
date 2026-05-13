import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const postGrid = defineType({
  name: "postGrid",
  title: "Post grid",
  type: "object",
  icon: LayoutGrid,
  description: "Display recent blog posts. Auto mode shows latest posts for this site; curated mode lets you pick.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({
      name: "source", type: "string", title: "Source",
      options: { list: [{ title: "Auto — latest posts on this site", value: "auto" }, { title: "Curated — pick specific posts", value: "curated" }], layout: "radio" },
      initialValue: "auto",
    }),
    defineField({ name: "showCount", type: "number", title: "Show how many?", initialValue: 3, validation: (Rule) => Rule.min(1).max(20) }),
    defineField({
      name: "items", type: "array", title: "Items",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
      hidden: ({ parent }) => parent?.source !== "curated",
    }),
  ],
  preview: {
    select: { title: "title", source: "source", count: "items.length", showCount: "showCount" },
    prepare: ({ title, source, count, showCount }) => ({
      title: title || "Post grid",
      subtitle: source === "curated" ? `Curated · ${count || 0} post${count === 1 ? "" : "s"}` : `Auto · latest ${showCount || 3}`,
    }),
  },
});
