import { Quote } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: Quote,
  description: "Member testimonial. Reusable across pages via reference.",
  groups: GROUPS,
  fields: [
    defineField({ name: "site", type: "reference", to: [{ type: "site" }], title: "Site", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "brand", type: "reference", to: [{ type: "brand" }], title: "Brand", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "personName", type: "string", title: "Member name", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "location", type: "string", title: "Location", description: "City, state — for display attribution", group: GROUP.MAIN_CONTENT }),
    imageWithAltField({ name: "portrait", title: "Portrait", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "quote", type: "text", title: "Quote", rows: 3, group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "longForm", type: "richText", title: "Long-form story", description: "Optional extended member story", group: GROUP.MAIN_CONTENT }),
  ],
  preview: {
    select: { title: "personName", subtitle: "quote", media: "portrait" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Untitled testimonial", subtitle: subtitle ? `"${subtitle.slice(0, 60)}${subtitle.length > 60 ? "…" : ""}"` : "—", media }),
  },
});
