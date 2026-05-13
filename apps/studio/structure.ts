import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Activity,
  Award,
  BookMarked,
  CogIcon,
  File,
  FileText,
  Globe2,
  HomeIcon,
  type LucideIcon,
  MapPin,
  MessageCircle,
  Newspaper,
  PanelBottom,
  PanelBottomIcon,
  PanelTop,
  Quote,
  Scale,
  Settings2,
  Sparkles,
  Tag,
  TrendingUpDown,
  User,
  Users,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import type { SchemaType, SingletonType } from "@/schemaTypes/index";
import { getTitleCase } from "@/utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

/**
 * Per-site singleton ID convention: `${docType}-${siteSlug}`.
 * E.g. homePage-xpo, homePage-purebarre, homePage-stretchlab.
 * Each workspace edits its own copy.
 */
const perSiteSingleton = ({
  S,
  type,
  siteSlug,
  title,
  icon,
}: {
  S: StructureBuilder;
  type: SingletonType;
  siteSlug: string;
  title?: string;
  icon?: LucideIcon;
}) => {
  const newTitle = title ?? getTitleCase(type);
  const docId = `${type}-${siteSlug}`;
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .id(docId)
    .child(S.document().schemaType(type).documentId(docId));
};

/**
 * Site-scoped document list — filters by site->slug.current == siteSlug.
 * Used for: page, blog, studio, classFormat, service, testimonial.
 */
const siteScopedList = ({
  S,
  type,
  siteSlug,
  title,
  icon,
}: {
  S: StructureBuilder;
  type: SchemaType;
  siteSlug: string;
  title?: string;
  icon?: LucideIcon;
}) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .id(`${type}-list`)
    .icon(icon ?? File)
    .child(
      S.documentTypeList(type)
        .title(newTitle)
        .filter(`_type == $type && site->slug.current == $siteSlug`)
        .params({ type, siteSlug })
        .apiVersion("2025-03-15")
    );
};

/**
 * Plain list — appears in all workspaces (shared docs).
 */
const sharedList = ({
  S,
  type,
  title,
  icon,
}: {
  S: StructureBuilder;
  type: SchemaType;
  title?: string;
  icon?: LucideIcon;
}) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(type)
    .title(newTitle)
    .icon(icon ?? File);
};

/**
 * Build the Structure for a workspace scoped to one site.
 *
 * `siteSlug` is the slug of the Site document (xpo / purebarre / stretchlab).
 * Pages, posts, studios, etc. are filtered to that site. Shared docs (brand,
 * person, pressItem, legalPage) appear everywhere.
 */
export const buildStructure =
  (siteSlug: string) =>
  (S: StructureBuilder, _context: StructureResolverContext) =>
    S.list()
      .title("Content")
      .items([
        // === Per-site ===
        perSiteSingleton({
          S,
          type: "homePage",
          siteSlug,
          title: "Home page",
          icon: HomeIcon,
        }),
        S.divider(),
        siteScopedList({ S, type: "page", siteSlug, icon: File }),
        siteScopedList({
          S,
          type: "blog",
          siteSlug,
          title: "Blog posts",
          icon: FileText,
        }),
        perSiteSingleton({
          S,
          type: "blogIndex",
          siteSlug,
          title: "Blog index page",
          icon: BookMarked,
        }),
        siteScopedList({
          S,
          type: "studio",
          siteSlug,
          title: "Studios",
          icon: MapPin,
        }),
        siteScopedList({
          S,
          type: "classFormat",
          siteSlug,
          title: "Class formats",
          icon: Activity,
        }),
        siteScopedList({
          S,
          type: "service",
          siteSlug,
          title: "Services",
          icon: Sparkles,
        }),
        siteScopedList({
          S,
          type: "testimonial",
          siteSlug,
          title: "Testimonials",
          icon: Quote,
        }),
        S.divider(),

        // === Shared across all workspaces ===
        S.listItem()
          .title("Shared content")
          .icon(Award)
          .child(
            S.list()
              .title("Shared content")
              .items([
                sharedList({ S, type: "brand", title: "Brands", icon: Tag }),
                sharedList({
                  S,
                  type: "person",
                  title: "People",
                  icon: Users,
                }),
                sharedList({
                  S,
                  type: "pressItem",
                  title: "Press items",
                  icon: Newspaper,
                }),
                sharedList({
                  S,
                  type: "legalPage",
                  title: "Legal pages",
                  icon: Scale,
                }),
                sharedList({
                  S,
                  type: "faq",
                  title: "FAQs",
                  icon: MessageCircle,
                }),
                sharedList({
                  S,
                  type: "author",
                  title: "Authors (template)",
                  icon: User,
                }),
              ])
          ),
        S.divider(),

        // === Site configuration (per-site) ===
        S.listItem()
          .title("Site configuration")
          .icon(Settings2)
          .child(
            S.list()
              .title("Site configuration")
              .items([
                perSiteSingleton({
                  S,
                  type: "site",
                  siteSlug,
                  title: "Site",
                  icon: Globe2,
                }),
                perSiteSingleton({
                  S,
                  type: "navbar",
                  siteSlug,
                  title: "Navigation",
                  icon: PanelTop,
                }),
                perSiteSingleton({
                  S,
                  type: "footer",
                  siteSlug,
                  title: "Footer",
                  icon: PanelBottomIcon,
                }),
                sharedList({
                  S,
                  type: "redirect",
                  title: "Redirects",
                  icon: TrendingUpDown,
                }),
                perSiteSingleton({
                  S,
                  type: "settings",
                  siteSlug,
                  title: "Global settings",
                  icon: CogIcon,
                }),
              ])
          ),
      ]);

/**
 * Legacy export — keeps backward compatibility with the original single-workspace
 * sanity.config.ts. Targets the parent site (xpo) by default.
 */
export const structure = buildStructure("xpo");
