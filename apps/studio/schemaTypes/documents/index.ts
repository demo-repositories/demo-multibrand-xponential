import { author } from "@/schemaTypes/documents/author";
import { blog } from "@/schemaTypes/documents/blog";
import { blogIndex } from "@/schemaTypes/documents/blog-index";
import { brand } from "@/schemaTypes/documents/brand";
import { classFormat } from "@/schemaTypes/documents/class-format";
import { faq } from "@/schemaTypes/documents/faq";
import { footer } from "@/schemaTypes/documents/footer";
import { homePage } from "@/schemaTypes/documents/home-page";
import { legalPage } from "@/schemaTypes/documents/legal-page";
import { navbar } from "@/schemaTypes/documents/navbar";
import { page } from "@/schemaTypes/documents/page";
import { person } from "@/schemaTypes/documents/person";
import { pressItem } from "@/schemaTypes/documents/press-item";
import { redirect } from "@/schemaTypes/documents/redirect";
import { service } from "@/schemaTypes/documents/service";
import { settings } from "@/schemaTypes/documents/settings";
import { site } from "@/schemaTypes/documents/site";
import { studio } from "@/schemaTypes/documents/studio";
import { testimonial } from "@/schemaTypes/documents/testimonial";

// Singletons (one per site, surfaced as fixed items in Structure): homePage, blogIndex, navbar, footer, site, settings
export const singletons = [homePage, blogIndex, settings, footer, navbar, site];

// Site-scoped docs (each carries a `site` reference)
const siteScoped = [page, blog, studio, classFormat, service, testimonial];

// Shared docs (no site reference)
const shared = [brand, person, pressItem, legalPage, author, faq];

export const documents = [
  ...siteScoped,
  ...shared,
  ...singletons,
  redirect,
];
