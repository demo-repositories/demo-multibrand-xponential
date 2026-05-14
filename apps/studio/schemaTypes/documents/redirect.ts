import { TrendingUpDown } from "lucide-react";
import type { SanityClient, SlugValue } from "sanity";
import { defineField, defineType, getDraftId, getPublishedId } from "sanity";

import { API_VERSION } from "@/utils/constant";

type Redirect = {
  source: SlugValue;
  destination: SlugValue;
  permanent: boolean;
  status: string;
};

async function validateRedirectLoop(
  client: SanityClient,
  {
    slug,
    _id,
  }: {
    _id: string;
    slug: string;
  }
) {
  const id = getPublishedId(_id);
  const draftId = getDraftId(_id);
  const existingRedirect = await client.fetch(
    `*[_type == "redirect" && !(_id in $ids) && (source.current == $slug ||  destination.current == $slug)]`,
    { slug, ids: [id, draftId] }
  );
  return existingRedirect.length !== 0;
}

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  description: "Redirect for next.config.js",
  fields: [
    defineField({
      name: "status",
      type: "string",
      description: "Enable or disable this redirect",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
        ],
        layout: "radio",
      },
      initialValue: () => "active",
    }),
    defineField({
      name: "source",
      type: "slug",
      description: "The path to redirect from",
      options: {
        isUnique: () => true,
      },
      validation: (rule) => [
        rule.required(),
        rule.custom<SlugValue>(async (value, { document, getClient }) => {
          const source = value?.current;
          if (!(value && source)) {
            return "Can't be blank";
          }
          if (!source.startsWith("/")) {
            return "The path must start with a /";
          }

          const destination = (document?.destination as SlugValue)?.current;
          if (source === destination) {
            return "Source and destination cannot be the same URL";
          }
          // #region agent log
          fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A,C", location: "apps/studio/schemaTypes/documents/redirect.ts:77", message: "Redirect source validator before client", data: { apiVersion: API_VERSION, apiVersionLength: API_VERSION.length, source, destination, documentId: document?._id }, timestamp: Date.now() }) }).catch(() => {});
          // #endregion
          let existingRedirect: boolean;
          try {
            const client = getClient({ apiVersion: API_VERSION });
            existingRedirect = await validateRedirectLoop(client, {
              _id: document?._id ?? "",
              slug: source,
            });
          } catch (error) {
            // #region agent log
            fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A,C", location: "apps/studio/schemaTypes/documents/redirect.ts:88", message: "Redirect source validator threw", data: { apiVersion: API_VERSION, source, errorName: error instanceof Error ? error.name : "non-error", errorMessage: error instanceof Error ? error.message : String(error) }, timestamp: Date.now() }) }).catch(() => {});
            // #endregion
            throw error;
          }
          if (existingRedirect) {
            return "This would create a redirect loop - a redirect already exists from the source";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "destination",
      type: "slug",
      description: "The path to redirect to",
      options: {
        isUnique: () => true,
      },
      validation: (rule) => [
        rule.required(),
        rule.custom<SlugValue>(async (value, { getClient, document }) => {
          const destination = value?.current;
          if (!(value && destination)) {
            return "Can't be blank";
          }
          if (!destination.startsWith("/")) {
            return "The path must start with a /";
          }
          const source = (document as unknown as Redirect)?.source?.current;
          if (destination === source) {
            return "Source and destination cannot be the same URL";
          }
          // #region agent log
          fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A,C", location: "apps/studio/schemaTypes/documents/redirect.ts:121", message: "Redirect destination validator before client", data: { apiVersion: API_VERSION, apiVersionLength: API_VERSION.length, source, destination, documentId: document?._id }, timestamp: Date.now() }) }).catch(() => {});
          // #endregion
          let existingRedirect: boolean;
          try {
            const client = getClient({ apiVersion: API_VERSION });
            existingRedirect = await validateRedirectLoop(client, {
              _id: document?._id ?? "",
              slug: destination,
            });
          } catch (error) {
            // #region agent log
            fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A,C", location: "apps/studio/schemaTypes/documents/redirect.ts:132", message: "Redirect destination validator threw", data: { apiVersion: API_VERSION, destination, errorName: error instanceof Error ? error.name : "non-error", errorMessage: error instanceof Error ? error.message : String(error) }, timestamp: Date.now() }) }).catch(() => {});
            // #endregion
            throw error;
          }
          if (existingRedirect) {
            return "This would create a redirect loop - a redirect already exists from the destination";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "permanent",
      type: "string",
      description:
        "Whether this is a permanent (301) or temporary (302) redirect",
      options: {
        list: [
          { title: "Permanent (301)", value: "true" },
          { title: "Temporary (302)", value: "false" },
        ],
        layout: "radio",
      },
      initialValue: () => "true",
    }),
  ],
  preview: {
    select: {
      title: "source.current",
      subtitle: "destination.current",
      permanent: "permanent",
      status: "status",
    },
    prepare: ({ title, subtitle, permanent, status }) => ({
      title: `${title ?? "Untitled"} to ${subtitle ?? "Untitled"}`,
      subtitle: `${permanent ? "Permanent" : "Temporary"}, ${status}`,
      media: TrendingUpDown,
    }),
  },
});
