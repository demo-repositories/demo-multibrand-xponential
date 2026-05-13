import { Scale } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  icon: Scale,
  description: "Privacy policies, terms of use, cookie policies. Shared across sites by default — one privacy policy can be referenced from all three site footers.",
  groups: GROUPS,
  fields: [
    defineField({ name: "title", type: "string", title: "Title", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    documentSlugField("legalPage", { group: GROUP.MAIN_CONTENT }),
    defineField({ name: "body", type: "richText", title: "Body", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "featuredOn", type: "array", title: "Featured on", description: "Which sites this legal page applies to", of: [{ type: "reference", to: [{ type: "site" }] }], group: GROUP.MAIN_CONTENT }),
    defineField({ name: "lastReviewed", type: "date", title: "Last reviewed", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "version", type: "string", title: "Version", description: "e.g. 'v2.1'", group: GROUP.MAIN_CONTENT }),
  ],
  preview: {
    select: { title: "title", lastReviewed: "lastReviewed", featuredOnCount: "featuredOn.length" },
    prepare: ({ title, lastReviewed, featuredOnCount }) => ({ title: title || "Untitled legal page", subtitle: `${featuredOnCount || 0}-site · last reviewed ${lastReviewed || "—"}` }),
  },
});
