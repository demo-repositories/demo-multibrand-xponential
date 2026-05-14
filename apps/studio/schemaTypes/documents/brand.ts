import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: Tag,
  description:
    "A shared brand identity used across the Xponential portfolio. Each sub-brand (Pure Barre, StretchLab, Club Pilates, YogaSix, BFT) lives once and is referenced by every site that mentions it.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Brand name",
      description: "Display name of the brand, e.g. 'Pure Barre'",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    documentSlugField("brand", { group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "tagline",
      type: "string",
      title: "Tagline",
      description: "Short marketing line shown on brand cards",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "richText",
      title: "Description",
      description:
        "3-5 sentence brand summary. Shown in the brand modal on xpo /our-brands and on sub-brand About pages.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      title: "Brand website URL",
      description:
        "Public-facing site for this brand (the 'Learn More' link on the parent site)",
      group: GROUP.MAIN_CONTENT,
    }),
    imageWithAltField({
      name: "heroImage",
      title: "Hero image",
      description:
        "Wide hero image used on the brand card. Pull canonical (largest) version.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "cardLogo",
      type: "file",
      title: "Card logo",
      description:
        "Brand logo for the brand card. SVG preferred (transparent vector); transparent PNG accepted.",
      options: { accept: "image/svg+xml,image/png" },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Plain text used by screen readers, e.g. 'Pure Barre'",
        }),
      ],
      group: GROUP.MAIN_CONTENT,
    }),
    imageWithAltField({
      name: "modalLogo",
      title: "Modal logo (SVG preferred)",
      description:
        "Larger logo for the brand modal / sub-brand site header. Often a different file than the card logo.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "colorPalette",
      type: "object",
      title: "Color palette",
      description:
        "Brand colors used to theme the sub-brand site and brand-coded UI elements",
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({
          name: "primary",
          type: "string",
          title: "Primary",
          description: "Hex value, e.g. #B8155E (Pure Barre pink)",
        }),
        defineField({
          name: "secondary",
          type: "string",
          title: "Secondary",
          description: "Hex value",
        }),
        defineField({
          name: "accent",
          type: "string",
          title: "Accent",
          description: "Hex value",
        }),
      ],
    }),
    defineField({
      name: "voiceGuide",
      type: "richText",
      title: "Brand voice guide",
      description:
        "Short style + tone guide used by Content Agent when generating brand-voiced variants. One paragraph is enough.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "orderRank",
      type: "number",
      title: "Display order",
      description: "Lower numbers appear first in brand grids",
      group: GROUP.MAIN_CONTENT,
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "name",
      tagline: "tagline",
      media: "cardLogo",
    },
    prepare: ({ title, tagline, media }) => ({
      title: title || "Untitled brand",
      subtitle: tagline || "—",
      media,
    }),
  },
});
