import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const brandGrid = defineType({
  name: "brandGrid",
  title: "Brand grid",
  type: "object",
  icon: LayoutGrid,
  description:
    "Grid of brand cards. Each card links to that brand's sub-brand site if one exists in this project; otherwise the card is shown but not clickable.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description: "Small line above the title",
    }),
    defineField({
      name: "brands",
      type: "array",
      title: "Brands",
      description: "Pick which brand documents to show. Order = display order.",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "brands.length" },
    prepare: ({ title, count }) => ({
      title: title || "Brand grid",
      subtitle: `${count || 0} brand${count === 1 ? "" : "s"}`,
    }),
  },
});
