import { Newspaper } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const pressItem = defineType({
  name: "pressItem",
  title: "Press item",
  type: "document",
  icon: Newspaper,
  description:
    "Press releases (full body, our content) and external coverage (excerpt + outbound link). Shared across sites via the 'Featured on' field — the cross-site keystone.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "headline",
      type: "string",
      title: "Headline",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    documentSlugField("pressItem", { group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published date",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outlet",
      type: "string",
      title: "Outlet / source",
      description:
        "For external coverage: the publication name (WSJ, LA Times, Forbes). For our own press releases: 'Xponential Fitness'.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      title: "External URL",
      description:
        "If this is external coverage (someone else wrote it), link to the outlet's article. Leave empty for press releases we authored.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description:
        "Short summary. Used in news/press lists. Required for external coverage where 'Body' is empty.",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "body",
      type: "richText",
      title: "Body",
      description:
        "Full text. Used for press releases we authored. Leave empty for external coverage.",
      group: GROUP.MAIN_CONTENT,
    }),
    imageWithAltField({
      name: "heroImage",
      title: "Hero image",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "featuredOn",
      type: "array",
      title: "Featured on",
      description:
        "Which sites should surface this press item. A WSJ article about Xponential can legitimately appear on the parent site, Pure Barre, and StretchLab.",
      of: [{ type: "reference", to: [{ type: "site" }] }],
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.min(1).error("Pick at least one site"),
    }),
    defineField({
      name: "brands",
      type: "array",
      title: "About these brands",
      description:
        "Which brands the press item concerns. Used for filtering and brand-tagged news lists.",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      title: "headline",
      outlet: "outlet",
      publishedAt: "publishedAt",
      externalUrl: "externalUrl",
      featuredOnCount: "featuredOn.length",
      media: "heroImage",
    },
    prepare: ({ title, outlet, publishedAt, externalUrl, featuredOnCount, media }) => {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";
      const shape = externalUrl ? "🔗 Coverage" : "📰 Release";
      const reach = featuredOnCount > 1 ? ` · ⭐ ${featuredOnCount}-site` : "";
      return {
        title: title || "Untitled press item",
        subtitle: `${shape} · ${outlet || "—"} · ${date}${reach}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
