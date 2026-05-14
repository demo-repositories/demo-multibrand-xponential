import { cn } from "@workspace/ui/lib/utils";

import type { SanityRichTextProps } from "@/types";
import { RichText } from "../elements/rich-text";

type TextOrRichTextProps = {
  value: unknown;
  className?: string;
};

/**
 * Renders a Sanity field that may be authored either as plain text (string)
 * or as Portable Text (an array of blocks). Several block schemas in this
 * project declare `body: text` but the seed data is Portable Text, so the
 * renderer has to handle both shapes safely at runtime.
 */
export function TextOrRichText({ value, className }: TextOrRichTextProps) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <RichText
        className={className}
        richText={value as unknown as SanityRichTextProps}
      />
    );
  }

  if (typeof value === "string") {
    return <p className={cn(className)}>{value}</p>;
  }

  return null;
}
