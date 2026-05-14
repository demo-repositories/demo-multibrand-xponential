import {
  defineField,
  getDraftId,
  getPublishedId,
  type ImageRule,
  type ImageValue,
  type SlugValidationContext,
  type ValidationBuilder,
} from "sanity";

import { PathnameFieldComponent } from "@/components/slug-field-component";
import { API_VERSION, GROUP } from "@/utils/constant";
import {
  createSlugErrorValidator,
  createSlugWarningValidator,
  getDocumentTypeConfig,
} from "@/utils/slug-validation";

/**
 * Document types that exist as one-per-site singletons identified by the
 * `${type}-${siteSlug}` ID convention. Each site is allowed to share the
 * same slug (e.g. every home page is "/"), so the slug uniqueness check
 * is a no-op for these — `_id` uniqueness already prevents real collisions.
 */
const PER_SITE_SINGLETON_TYPES = new Set([
  "homePage",
  "blogIndex",
  "navbar",
  "footer",
  "settings",
]);

async function isSlugUniqueForType(
  slug: string,
  context: SlugValidationContext,
  documentType: string
): Promise<boolean> {
  // #region agent log
  fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A,B", location: "apps/studio/schemaTypes/common.ts:41", message: "Slug uniqueness validation entry", data: { documentType, slug, apiVersion: API_VERSION, apiVersionLength: API_VERSION.length, isPerSiteSingleton: PER_SITE_SINGLETON_TYPES.has(documentType), hasGetClient: typeof context.getClient === "function", documentId: context.document?._id }, timestamp: Date.now() }) }).catch(() => {});
  // #endregion
  if (PER_SITE_SINGLETON_TYPES.has(documentType)) {
    return true;
  }
  const { document, getClient } = context;
  try {
    const client = getClient({ apiVersion: API_VERSION });
    const id = getPublishedId(document?._id ?? "");
    const draftId = getDraftId(id);
    const conflict = await client.fetch<string | null>(
      "*[!(_id in [$draft, $published]) && _type == $type && slug.current == $slug][0]._id",
      { draft: draftId, published: id, type: documentType, slug }
    );
    return !conflict;
  } catch (error) {
    // #region agent log
    fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A,B", location: "apps/studio/schemaTypes/common.ts:57", message: "Slug uniqueness validation threw", data: { documentType, slug, apiVersion: API_VERSION, errorName: error instanceof Error ? error.name : "non-error", errorMessage: error instanceof Error ? error.message : String(error) }, timestamp: Date.now() }) }).catch(() => {});
    // #endregion
    throw error;
  }
}

export const richTextField = defineField({
  name: "richText",
  type: "richText",
  description:
    "A text editor that lets you add formatting like bold text, links, and bullet points",
});

export const buttonsField = defineField({
  name: "buttons",
  type: "array",
  of: [{ type: "button" }],
  description:
    "Add one or more clickable buttons that visitors can use to navigate your website",
});

export const pageBuilderField = defineField({
  name: "pageBuilder",
  group: GROUP.MAIN_CONTENT,
  type: "pageBuilder",
  description:
    "Build your page by adding different sections like text, images, and other content blocks",
});

export const iconField = defineField({
  name: "icon",
  title: "Icon",
  type: "lucide-icon",
  description:
    "Choose a small picture symbol to represent this item, like a home icon or shopping cart",
});

export const documentSlugField = (
  documentType: string,
  options: {
    group?: string;
    description?: string;
    title?: string;
  } = {}
) => {
  const {
    group,
    description = `The web address where people can find your ${documentType} (automatically created from title)`,
    title = "URL",
  } = options;

  return defineField({
    name: "slug",
    type: "slug",
    title,
    description,
    group,
    components: {
      field: PathnameFieldComponent,
    },
    options: {
      isUnique: (slug, context) =>
        isSlugUniqueForType(slug, context, documentType),
    },
    validation: (Rule) => {
      const config = getDocumentTypeConfig(documentType);
      return [
        Rule.custom(createSlugErrorValidator(config)),
        Rule.custom(createSlugWarningValidator(config)).warning(),
      ];
    },
  });
};

export const imageWithAltField = ({
  name = "image",
  title = "Image",
  description = "An image, make sure to add an alt text and use the hotspot tool to ensure if image is cropped it highlights the focus point",
  validation,
  group,
}: {
  name?: string;
  title?: string;
  description?: string;
  group?: string;
  validation?: ValidationBuilder<ImageRule, ImageValue>;
} = {}) =>
  defineField({
    name,
    type: "image",
    title,
    description,
    group,
    validation,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "alt",
        type: "string",
        title: "Alt Text",
        description:
          "The text that describes the image for screen readers and search engines",
      }),
    ],
  });
