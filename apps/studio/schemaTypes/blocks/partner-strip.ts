import { Award } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const partnerStrip = defineType({
  name: "partnerStrip",
  title: "Partner / press strip",
  type: "object",
  icon: Award,
  description: "Row of press logos or partner badges (LA Times, MSNBC, Entrepreneur Franchise 500, etc.).",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "logos", type: "array", title: "Logos",
      of: [{
        type: "object", name: "partnerLogo",
        fields: [
          imageWithAltField({ name: "logo", title: "Logo" }),
          defineField({ name: "label", type: "string", title: "Label", description: "Visible label or year (e.g. '2024 Franchise 500')" }),
          defineField({ name: "url", type: "url", title: "Link URL" }),
        ],
        preview: { select: { title: "label", media: "logo" } },
      }],
    }),
  ],
  preview: {
    select: { title: "title", count: "logos.length" },
    prepare: ({ title, count }) => ({ title: title || "Partner strip", subtitle: `${count || 0} logo${count === 1 ? "" : "s"}` }),
  },
});
