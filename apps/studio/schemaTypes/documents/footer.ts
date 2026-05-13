import { LayoutPanelLeft, Link, PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";

const footerColumnLink = defineField({
  name: "footerColumnLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  icon: LayoutPanelLeft,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the column",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Links for the column",
      of: [footerColumnLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Column",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for one site. One footer document per workspace.",
  fields: [
    defineField({
      name: "site",
      type: "reference",
      title: "Site",
      to: [{ type: "site" }],
      description: "Which site this footer belongs to",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 2,
      title: "Subtitle",
      description: "Subtitle that sits beneath the logo in the footer",
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Columns",
      description: "Columns for the footer. Column titles are optional — Pure Barre uses untitled columns, StretchLab uses titled ones.",
      of: [footerColumn],
    }),
    defineField({
      name: "legalLinks",
      type: "array",
      title: "Legal strip",
      description: "Footer-bottom legal links (Terms, Privacy, etc.). Optional — some sites fold legal into a regular column.",
      of: [footerColumnLink],
    }),
    defineField({
      name: "social",
      type: "array",
      title: "Social links",
      of: [{
        type: "object",
        name: "socialLink",
        fields: [
          defineField({
            name: "platform",
            type: "string",
            title: "Platform",
            options: { list: ["instagram", "facebook", "twitter", "linkedin", "youtube", "tiktok"] },
          }),
          defineField({ name: "url", type: "url", title: "URL" }),
        ],
        preview: { select: { title: "platform", subtitle: "url" } },
      }],
    }),
  ],
  preview: {
    select: {
      title: "label",
      siteName: "site.name",
    },
    prepare: ({ title, siteName }) => ({
      title: siteName ? `${siteName} footer` : title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});
