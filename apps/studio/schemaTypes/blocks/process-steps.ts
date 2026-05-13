import { ListOrdered } from "lucide-react";
import { defineField, defineType } from "sanity";

import { iconField } from "@/schemaTypes/common";

export const processSteps = defineType({
  name: "processSteps",
  title: "Process steps",
  type: "object",
  icon: ListOrdered,
  description: "Numbered process — used on franchise onboarding pages ('Step 1: Apply', 'Step 2: Discovery Day', etc.).",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({
      name: "items", type: "array", title: "Steps",
      of: [{
        type: "object", name: "step",
        fields: [
          iconField,
          defineField({ name: "title", type: "string", title: "Step title", validation: (Rule) => Rule.required() }),
          defineField({ name: "body", type: "text", rows: 2, title: "Body" }),
        ],
        preview: { select: { title: "title", subtitle: "body" } },
      }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "items.length" },
    prepare: ({ title, count }) => ({ title: title || "Process steps", subtitle: `${count || 0} step${count === 1 ? "" : "s"}` }),
  },
});
