import { LayoutList } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const tabbedInfo = defineType({
  name: "tabbedInfo",
  title: "Tabbed info",
  type: "object",
  icon: LayoutList,
  description: "Tabbed information block — used for 'Why Stretch / Benefits / First Timers' patterns.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({
      name: "tabs", type: "array", title: "Tabs",
      of: [{
        type: "object", name: "tab",
        fields: [
          defineField({ name: "label", type: "string", title: "Tab label", validation: (Rule) => Rule.required() }),
          defineField({ name: "body", type: "richText", title: "Body" }),
          imageWithAltField({ name: "image", title: "Tab image" }),
        ],
        preview: { select: { title: "label", media: "image" } },
      }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "tabs.length" },
    prepare: ({ title, count }) => ({ title: title || "Tabbed info", subtitle: `${count || 0} tab${count === 1 ? "" : "s"}` }),
  },
});
