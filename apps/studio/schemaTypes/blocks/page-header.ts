import { Heading1 } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const pageHeader = defineType({
  name: "pageHeader",
  title: "Page header",
  type: "object",
  icon: Heading1,
  description: "Smaller banner header (vs the full Hero). Used on /benefits, /stretches, class detail pages.",
  fields: [
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
    imageWithAltField({ name: "image", title: "Background image" }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "image" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Page header", subtitle, media }),
  },
});
