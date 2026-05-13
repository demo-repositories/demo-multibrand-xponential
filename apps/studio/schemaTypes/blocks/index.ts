// Template blocks (kept as-is)
import { cta } from "@/schemaTypes/blocks/cta";
import { faqAccordion } from "@/schemaTypes/blocks/faq-accordion";
import { featureCardsIcon } from "@/schemaTypes/blocks/feature-cards-icon";
import { hero } from "@/schemaTypes/blocks/hero";
import { imageLinkCards } from "@/schemaTypes/blocks/image-link-cards";
import { richTextBlock } from "@/schemaTypes/blocks/rich-text";
import { subscribeNewsletter } from "@/schemaTypes/blocks/subscribe-newsletter";

// New domain blocks (Xponential-specific)
import { appDownload } from "@/schemaTypes/blocks/app-download";
import { brandGrid } from "@/schemaTypes/blocks/brand-grid";
import { classGrid } from "@/schemaTypes/blocks/class-grid";
import { locationFinder } from "@/schemaTypes/blocks/location-finder";
import { pageHeader } from "@/schemaTypes/blocks/page-header";
import { partnerStrip } from "@/schemaTypes/blocks/partner-strip";
import { personGrid } from "@/schemaTypes/blocks/person-grid";
import { postGrid } from "@/schemaTypes/blocks/post-grid";
import { pressList } from "@/schemaTypes/blocks/press-list";
import { processSteps } from "@/schemaTypes/blocks/process-steps";
import { serviceGrid } from "@/schemaTypes/blocks/service-grid";
import { statsBlock } from "@/schemaTypes/blocks/stats-block";
import { tabbedInfo } from "@/schemaTypes/blocks/tabbed-info";
import { testimonialCarousel } from "@/schemaTypes/blocks/testimonial-carousel";

// Order = order in the Studio's insert menu. Group conceptually.
export const pageBuilderBlocks = [
  // Heroes
  hero,
  pageHeader,
  // Grids (entity-driven)
  brandGrid,
  classGrid,
  serviceGrid,
  personGrid,
  postGrid,
  pressList,
  // Showcases
  testimonialCarousel,
  partnerStrip,
  imageLinkCards,
  featureCardsIcon,
  // Body
  richTextBlock,
  tabbedInfo,
  faqAccordion,
  statsBlock,
  // CTAs
  cta,
  appDownload,
  locationFinder,
  subscribeNewsletter,
  // Franchise / process
  processSteps,
];
