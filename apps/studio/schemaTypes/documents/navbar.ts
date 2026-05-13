import { LayoutPanelLeft, Link, PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";

import { lucideIconPreview } from "@/components/icon-preview";
import { buttonsField, iconField } from "@/schemaTypes/common";

const navbarLink = defineField({
  name: "navbarLink",
  type: "object",
  icon: Link,
  title: "Navigation Link",
  description: "Individual navigation link with name and URL",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Link Text",
      description: "The text that will be displayed for this navigation link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: "Link URL",
      description: "The URL that this link will navigate to when clicked",
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

const navbarColumnLink = defineField({
  name: "navbarColumnLink",
  type: "object",
  icon: LayoutPanelLeft,
  title: "Navigation Column Link",
  description: "A link within a navigation column",
  fields: [
    iconField,
    defineField({
      name: "name",
      type: "string",
      title: "Link Text",
      description: "The text that will be displayed for this navigation link",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "The description for this navigation link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: "Link URL",
      description: "The URL that this link will navigate to when clicked",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
      icon: "icon",
    },
    prepare({ title, icon, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: lucideIconPreview(icon),
      };
    },
  },
});

const navbarColumn = defineField({
  name: "navbarColumn",
  type: "object",
  icon: LayoutPanelLeft,
  title: "Navigation Column",
  description: "A column of navigation links with an optional title",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Column Title",
      description:
        "The heading text displayed above this group of navigation links",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Column Links",
      validation: (rule) => [rule.required(), rule.unique()],
      description: "The list of navigation links to display in this column",
      of: [navbarColumnLink],
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

export const navbar = defineType({
  name: "navbar",
  title: "Site Navigation",
  type: "document",
  icon: PanelTop,
  description: "Configure the main navigation structure for one site. One navbar document per workspace.",
  fields: [
    defineField({
      name: "site",
      type: "reference",
      title: "Site",
      to: [{ type: "site" }],
      description: "Which site this navigation belongs to",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      initialValue: "Navbar",
      title: "Navigation Label",
      description:
        "Internal label to identify this navigation configuration in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Navigation Structure",
      description:
        "Build your navigation menu using columns and links. Add either a column of links or individual links.",
      of: [navbarColumn, navbarLink],
    }),
    defineField({
      name: "utility",
      type: "array",
      title: "Utility links",
      description: "Right-side utility nav (sign-in, find a location, etc.). Optional — xpo doesn't have one.",
      of: [navbarLink],
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: "label",
      siteName: "site.name",
    },
    prepare: ({ title, siteName }) => ({
      title: siteName ? `${siteName} navigation` : title || "Untitled Navigation",
    }),
  },
});
