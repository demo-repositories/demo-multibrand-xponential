import { MapPin } from "lucide-react";
import { defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";

export const studio = defineType({
  name: "studio",
  title: "Studio",
  type: "document",
  icon: MapPin,
  description:
    "A physical studio location. Pure Barre and StretchLab each have hundreds. Modeled as an entity (not a page) so the same data can render on a detail page, regional hub, and location search.",
  groups: GROUPS,
  fields: [
    defineField({ name: "site", type: "reference", title: "Site", to: [{ type: "site" }], group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "brand", type: "reference", title: "Brand", to: [{ type: "brand" }], group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    defineField({ name: "name", type: "string", title: "Studio name", description: "e.g. 'Pure Barre Austin Downtown'", group: GROUP.MAIN_CONTENT, validation: (Rule) => Rule.required() }),
    documentSlugField("studio", { group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "address", type: "object", title: "Address", group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "region", type: "string", title: "State / region" }),
        defineField({ name: "postal", type: "string", title: "Postal code" }),
        defineField({ name: "country", type: "string", title: "Country", options: { list: ["US", "CA", "PR", "MX"] }, initialValue: "US" }),
      ],
    }),
    defineField({ name: "geo", type: "geopoint", title: "Geo coordinates", description: "For map rendering and proximity search", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "phone", type: "string", title: "Phone", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "email", type: "string", title: "Email", group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "hours", type: "array", title: "Hours", description: "Hours of operation by day of the week", group: GROUP.MAIN_CONTENT,
      of: [{
        type: "object", name: "dayHours",
        fields: [
          defineField({ name: "day", type: "string", title: "Day", options: { list: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] } }),
          defineField({ name: "open", type: "string", title: "Opens" }),
          defineField({ name: "close", type: "string", title: "Closes" }),
          defineField({ name: "closed", type: "boolean", title: "Closed all day", initialValue: false }),
        ],
        preview: { select: { day: "day", open: "open", close: "close", closed: "closed" }, prepare: ({ day, open, close, closed }) => ({ title: day || "—", subtitle: closed ? "Closed" : `${open || "?"} – ${close || "?"}` }) },
      }],
    }),
    defineField({ name: "services", type: "array", title: "Services / classes offered", description: "Pure Barre studios reference classFormat. StretchLab studios reference service.", of: [{ type: "reference", to: [{ type: "classFormat" }, { type: "service" }] }], group: GROUP.MAIN_CONTENT }),
    defineField({ name: "staff", type: "array", title: "Staff", description: "Flexologists, instructors, studio owner", of: [{ type: "reference", to: [{ type: "person" }] }], group: GROUP.MAIN_CONTENT }),
    defineField({ name: "introOfferPrice", type: "string", title: "Intro offer (display string)", description: "e.g. '$69 for first 50-min stretch'", group: GROUP.MAIN_CONTENT }),
    defineField({
      name: "membershipTiers", type: "array", title: "Membership tiers", description: "Pricing tiers offered at this studio (varies by location)", group: GROUP.MAIN_CONTENT,
      of: [{
        type: "object", name: "membershipTier",
        fields: [
          defineField({ name: "name", type: "string", title: "Tier name" }),
          defineField({ name: "price", type: "string", title: "Price (display)" }),
          defineField({ name: "description", type: "string", title: "Description" }),
        ],
        preview: { select: { title: "name", subtitle: "price" } },
      }],
    }),
    defineField({ name: "bookingUrl", type: "url", title: "Booking URL", description: "ClubReady or members.* link for booking", group: GROUP.MAIN_CONTENT }),
    defineField({ name: "mapsEmbedUrl", type: "url", title: "Google Maps embed URL", group: GROUP.MAIN_CONTENT }),
    imageWithAltField({ name: "heroImage", title: "Studio hero image", group: GROUP.MAIN_CONTENT }),
  ],
  preview: {
    select: { title: "name", city: "address.city", region: "address.region", brandName: "brand.name", media: "heroImage" },
    prepare: ({ title, city, region, brandName, media }) => ({ title: title || "Untitled studio", subtitle: `${brandName || "—"} · ${[city, region].filter(Boolean).join(", ") || "—"}`, media }),
  },
  orderings: [{ title: "City A-Z", name: "cityAsc", by: [{ field: "address.city", direction: "asc" }] }],
});
