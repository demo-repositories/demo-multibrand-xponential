import {
  BlockElementIcon,
  ComposeIcon,
  InlineElementIcon,
  InsertAboveIcon,
  SearchIcon,
} from "@sanity/icons";
import type { FieldGroupDefinition } from "sanity";

export const GROUP = {
  SEO: "seo",
  MAIN_CONTENT: "main-content",
  CARD: "card",
  RELATED: "related",
  OG: "og",
};

export const GROUPS: FieldGroupDefinition[] = [
  // { name: CONST.MAIN_CONTENT, default: true },
  {
    name: GROUP.MAIN_CONTENT,
    icon: ComposeIcon,
    title: "Content",
    default: true,
  },
  { name: GROUP.SEO, icon: SearchIcon, title: "SEO" },
  {
    name: GROUP.OG,
    icon: InsertAboveIcon,
    title: "Open Graph",
  },
  {
    name: GROUP.CARD,
    icon: BlockElementIcon,
    title: "Card",
  },
  {
    name: GROUP.RELATED,
    icon: InlineElementIcon,
    title: "Related",
  },
];

export const API_VERSION =
  process.env.SANITY_STUDIO_API_VERSION ?? "2025-05-08";

// #region agent log
fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fe3b26" }, body: JSON.stringify({ sessionId: "fe3b26", runId: "initial", hypothesisId: "A", location: "apps/studio/utils/constant.ts:47", message: "Resolved Sanity API version", data: { apiVersion: API_VERSION, length: API_VERSION.length, isEmpty: API_VERSION === "" }, timestamp: Date.now() }) }).catch(() => {});
// #endregion
