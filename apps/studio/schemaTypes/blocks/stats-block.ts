import { BarChart3 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const statsBlock = defineType({
  name: "statsBlock",
  title: "Stats block",
  type: "object",
  icon: BarChart3,
  description: "Headline statistics. Used on franchise pages (e.g. '$165K minimum investment', '500+ studios').",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({
      name: "items", type: "array", title: "Stats",
      of: [{
        type: "object", name: "stat",
        fields: [
          defineField({ name: "value", type: "string", title: "Value", description: "e.g. '$165K', '500+', '36M'" }),
          defineField({ name: "label", type: "string", title: "Label" }),
          defineField({ name: "footnote", type: "string", title: "Footnote" }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
  ],
  preview: {
    select: { title: "title", count: "items.length" },
    prepare: ({ title, count }) => ({ title: title || "Stats block", subtitle: `${count || 0} stat${count === 1 ? "" : "s"}` }),
  },
});
