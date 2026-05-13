import { Globe2 } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const site = defineType({
  name: "site",
  title: "Site",
  type: "document",
  icon: Globe2,
  description:
    "Per-site configuration: which brand it represents, theme tokens, domain, and SEO defaults. One Site document per workspace (xponential, purebarre, stretchlab).",
  groups: GROUPS,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Site name",
      description: "Display name, e.g. 'Pure Barre'",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    documentSlugField("site", { group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "brand",
      type: "reference",
      title: "Brand",
      description:
        "The brand this site represents. Sub-brand sites point to their brand (Pure Barre, StretchLab). The parent site can leave this empty.",
      to: [{ type: "brand" }],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "domain",
      type: "url",
      title: "Production domain",
      description: "e.g. https://www.purebarre.com",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "themeOverrides",
      type: "object",
      title: "Theme overrides",
      description:
        "Site-level theme overrides. Leave fields empty to inherit from the linked Brand.",
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({
          name: "primary",
          type: "string",
          title: "Primary color override",
        }),
        defineField({
          name: "fontFamily",
          type: "string",
          title: "Font family",
        }),
        imageWithAltField({ name: "siteLogo", title: "Site logo override" }),
      ],
    }),
    defineField({
      name: "defaultSeoTitle",
      type: "string",
      title: "Default SEO title",
      description: "Appended to page titles in <title> tags",
      group: GROUP.SEO,
    }),
    defineField({
      name: "defaultSeoDescription",
      type: "text",
      title: "Default SEO description",
      description: "Used when a page does not specify its own meta description",
      group: GROUP.SEO,
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      domain: "domain",
      brandName: "brand.name",
      media: "themeOverrides.siteLogo",
    },
    prepare: ({ title, domain, brandName, media }) => ({
      title: title || "Untitled site",
      subtitle: [brandName, domain].filter(Boolean).join(" — ") || "—",
      media,
    }),
  },
});
