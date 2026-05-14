import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { TextOrRichText } from "./text-or-rich-text";

type AppDownloadProps = PagebuilderType<"appDownload">;

export function AppDownload({
  title,
  body,
  appStoreUrl,
  playStoreUrl,
  deviceMockup,
}: AppDownloadProps) {
  return (
    <section className="my-6 md:my-16" id="app-download">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 rounded-3xl bg-muted p-8 md:grid-cols-2 md:p-12 lg:gap-16 lg:p-16">
          <div className="grid gap-6 text-center md:text-left">
            {title && (
              <h2 className="text-balance font-semibold text-3xl md:text-5xl">
                {title}
              </h2>
            )}
            <TextOrRichText
              className="max-w-xl text-balance text-muted-foreground md:text-lg"
              value={body}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              {appStoreUrl && (
                <Button asChild className="rounded-[10px]" size="lg">
                  <Link
                    aria-label="Download on the App Store"
                    href={appStoreUrl}
                    rel="noopener"
                    target="_blank"
                  >
                    Download on the App Store
                  </Link>
                </Button>
              )}
              {playStoreUrl && (
                <Button
                  asChild
                  className="rounded-[10px]"
                  size="lg"
                  variant="outline"
                >
                  <Link
                    aria-label="Get it on Google Play"
                    href={playStoreUrl}
                    rel="noopener"
                    target="_blank"
                  >
                    Get it on Google Play
                  </Link>
                </Button>
              )}
            </div>
          </div>
          {deviceMockup?.id && (
            <div className="flex justify-center md:justify-end">
              <SanityImage
                className="max-h-[480px] w-auto rounded-3xl object-contain"
                height={960}
                image={deviceMockup}
                width={480}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
