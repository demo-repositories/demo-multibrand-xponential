import { Smartphone } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const appDownload = defineType({
  name: "appDownload",
  title: "App download",
  type: "object",
  icon: Smartphone,
  description: "App download section with App Store + Play Store badges and a device mockup.",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "body", type: "text", rows: 2, title: "Body" }),
    imageWithAltField({ name: "deviceMockup", title: "Device mockup image" }),
    defineField({ name: "appStoreUrl", type: "url", title: "App Store URL" }),
    defineField({ name: "playStoreUrl", type: "url", title: "Google Play URL" }),
  ],
  preview: {
    select: { title: "title", media: "deviceMockup" },
    prepare: ({ title, media }) => ({ title: title || "App download", media }),
  },
});
