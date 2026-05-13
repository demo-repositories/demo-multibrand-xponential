import { Quote } from "lucide-react";
import { defineField, defineType } from "sanity";

export const testimonialCarousel = defineType({
  name: "testimonialCarousel",
  title: "Testimonial carousel",
  type: "object",
  icon: Quote,
  description: "Carousel of member testimonials. References shared Testimonial documents.",
  fields: [
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({ name: "body", type: "text", rows: 2, title: "Intro body" }),
    defineField({
      name: "testimonials", type: "array", title: "Testimonials",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "testimonials.length" },
    prepare: ({ title, count }) => ({ title: title || "Testimonial carousel", subtitle: `${count || 0} testimonial${count === 1 ? "" : "s"}` }),
  },
});
