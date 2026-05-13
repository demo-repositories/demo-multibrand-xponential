import { User } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: User,
  description: "Anyone who appears on the sites with their own identity: leadership, flexologists, post authors, ambassadors. Shared (not site-scoped) so the same person can be referenced from multiple sites.",
  groups: GROUPS,
  fields: [
    defineField({ name: "name", type: "string", title: "Name", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    documentSlugField("person", { group: GROUP.MAIN_CONTENT }),
    defineField({ name: "role", type: "string", title: "Role", description: "What this person is — Leadership, Flexologist, Instructor, Author, Ambassador", group: GROUP.MAIN_CONTENT, options: { list: ["Leadership","Flexologist","Instructor","Author","Ambassador"] } }),
    defineField({ name: "title", type: "string", title: "Job title", description: "e.g. 'CEO', 'Lead Flexologist'", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "brand", type: "reference", to: [{ type: "brand" }], title: "Affiliated brand", description: "Optional — leave empty for parent-org leadership", group: GROUP.MAIN_CONTENT }),
    imageWithAltField({ name: "portrait", title: "Portrait", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "bio", type: "richText", title: "Bio", group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "socialLinks", type: "array", title: "Social links", group: GROUP.MAIN_CONTENT,
      of: [{
        type: "object", name: "socialLink",
        fields: [
          defineField({ name: "platform", type: "string", title: "Platform", options: { list: ["instagram","linkedin","twitter","facebook","tiktok","youtube"] } }),
          defineField({ name: "url", type: "url", title: "URL" }),
        ],
        preview: { select: { title: "platform", subtitle: "url" } },
      }],
    }),
  ],
  preview: {
    select: { title: "name", role: "role", titleField: "title", media: "portrait" },
    prepare: ({ title, role, titleField, media }) => ({ title: title || "Unnamed", subtitle: [role, titleField].filter(Boolean).join(" · ") || "—", media }),
  },
});
