import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const brandGrid = defineType({
  name: "brandGrid",
  title: "Brand grid",
  type: "object",
  icon: LayoutGrid,
  description: "A grid or carousel of brand cards. References shared Brand documents — change a brand once, it updates everywhere.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow", description: "Small line above the title" }),
    defineField({
      name: "layout", type: "string", title: "Layout",
      options: { list: [{ title: "Grid", value: "grid" }, { title: "Carousel", value: "carousel" }], layout: "radio" },
      initialValue: "grid",
    }),
    defineField({
      name: "brands", type: "array", title: "Brands",
      description: "Pick which brand documents to show. Order in this list = order on the page.",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", layout: "layout", count: "brands.length" },
    prepare: ({ title, layout, count }) => ({
      title: title || "Brand grid",
      subtitle: `${layout || "grid"} · ${count || 0} brand${count === 1 ? "" : "s"}`,
    }),
  },
});
