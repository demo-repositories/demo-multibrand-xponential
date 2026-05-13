import { Activity } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const classFormat = defineType({
  name: "classFormat",
  title: "Class format",
  type: "document",
  icon: Activity,
  description: "A reusable class format. Pure Barre has four (Classic, Align, Empower, Define). Referenced from class grids and studio class lists.",
  groups: GROUPS,
  fields: [
    defineField({ name: "site", type: "reference", to: [{ type: "site" }], title: "Site", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "brand", type: "reference", to: [{ type: "brand" }], title: "Brand", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "name", type: "string", title: "Name", description: "e.g. 'Pure Barre Classic'", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    documentSlugField("classFormat", { group: GROUP.MAIN_CONTENT }),
    defineField({ name: "duration", type: "number", title: "Duration (minutes)", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "shortDescription", type: "text", title: "Short description", rows: 2, group: GROUP.MAIN_CONTENT }),
    defineField({ name: "description", type: "richText", title: "Full description", group: GROUP.MAIN_CONTENT }),
    imageWithAltField({ name: "image", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "badge", type: "string", title: "Badge", description: "Optional badge text, e.g. 'New' or 'Most popular'", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "intensity", type: "number", title: "Intensity (1-5)", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.min(1).max(5) }),
  ],
  preview: {
    select: { title: "name", duration: "duration", brand: "brand.name", media: "image" },
    prepare: ({ title, duration, brand, media }) => ({ title: title || "Untitled class", subtitle: `${brand || "—"} · ${duration ? `${duration} min` : "—"}`, media }),
  },
});
