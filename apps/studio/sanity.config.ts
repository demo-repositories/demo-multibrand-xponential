import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { lucideIconPicker } from "sanity-plugin-lucide-icon-picker";
import { media } from "sanity-plugin-media";

import { Logo } from "@/components/logo";
import { locations } from "@/location";
import { presentationUrl } from "@/plugins/presentation-url";
import { schemaTypes } from "@/schemaTypes/index";
import { buildStructure } from "@/structure";
import { getPresentationUrl } from "@/utils/helper";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const baseTitle = process.env.SANITY_STUDIO_TITLE ?? "Xponential";

/**
 * Three workspaces sharing one schema package against one dataset.
 *
 *   xponential  → parent corporate site (xpo)
 *   purebarre   → Pure Barre sub-brand site
 *   stretchlab  → StretchLab sub-brand site
 *
 * Each workspace's Structure Builder filters site-scoped content by the
 * Site document's slug. Shared content (Brand, Person, Press Item, Legal Page)
 * appears in every workspace.
 *
 * To deep-link a Pure Barre editor: `/studio/purebarre`.
 */
type WorkspaceSpec = {
  name: string;
  title: string;
  basePath: string;
  siteSlug: string;
  previewQuery: string;
};

const workspaces: WorkspaceSpec[] = [
  {
    name: "xponential",
    title: "Xponential — parent",
    basePath: "/xponential",
    siteSlug: "xpo",
    previewQuery: "?site=xpo",
  },
  {
    name: "purebarre",
    title: "Pure Barre",
    basePath: "/purebarre",
    siteSlug: "purebarre",
    previewQuery: "?site=purebarre",
  },
  {
    name: "stretchlab",
    title: "StretchLab",
    basePath: "/stretchlab",
    siteSlug: "stretchlab",
    previewQuery: "?site=stretchlab",
  },
];

const sharedPlugins = (siteSlug: string) => [
  presentationTool({
    resolve: { locations },
    previewUrl: {
      origin: getPresentationUrl(),
      previewMode: { enable: "/api/presentation-draft" },
      // Pass site context through to the frontend so it renders the right brand.
      preview: `/${siteSlug === "xpo" ? "" : siteSlug}`,
    },
  }),
  presentationUrl(),
  visionTool(),
  lucideIconPicker(),
  unsplashImageAsset(),
  media(),
  assist(),
];

export default workspaces.map((w) =>
  defineConfig({
    name: w.name,
    title: `${baseTitle} — ${w.title}`,
    basePath: w.basePath,
    icon: Logo,
    projectId,
    dataset,
    releases: { enabled: true },
    plugins: [
      ...sharedPlugins(w.siteSlug),
      structureTool({ structure: buildStructure(w.siteSlug) }),
    ],
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        const { type } = creationContext;
        if (type === "global") {
          return prev.filter(
            (template) =>
              ![
                "homePage",
                "navbar",
                "footer",
                "settings",
                "blogIndex",
                "site",
                "assist.instruction.context",
                "media.tag",
              ].includes(template?.templateId)
          );
        }
        return prev;
      },
    },
    schema: {
      types: schemaTypes,
      templates: [
        {
          id: "nested-page-template",
          title: "Nested Page",
          schemaType: "page",
          value: (props: { slug?: string; title?: string }) => ({
            ...(props.slug
              ? { slug: { current: props.slug, _type: "slug" } }
              : {}),
            ...(props.title ? { title: props.title } : {}),
          }),
          parameters: [{ name: "slug", type: "string" }],
        },
      ],
    },
  })
);
