import { Sparkles } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: Sparkles,
  description: "A service offered by a brand. StretchLab has 1:1 Stretch, Group Stretch, Normatec Compression, MAPS, etc.",
  groups: GROUPS,
  fields: [
    defineField({ name: "site", type: "reference", to: [{ type: "site" }], title: "Site", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "brand", type: "reference", to: [{ type: "brand" }], title: "Brand", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "name", type: "string", title: "Name", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    documentSlugField("service", { group: GROUP.MAIN_CONTENT }),
    defineField({ name: "durationOptions", type: "array", of: [{ type: "number" }], title: "Duration options (minutes)", description: "e.g. [25, 50] for 25- and 50-minute sessions", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "shortDescription", type: "text", rows: 2, title: "Short description", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "description", type: "richText", title: "Full description", group: GROUP.MAIN_CONTENT }),
    imageWithAltField({ name: "image", group: GROUP.MAIN_CONTENT }),
  ],
  preview: {
    select: { title: "name", brand: "brand.name", media: "image" },
    prepare: ({ title, brand, media }) => ({ title: title || "Untitled service", subtitle: brand || "—", media }),
  },
});
