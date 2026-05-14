import {
  processImageData,
  SANITY_BASE_URL,
  type SanityImageProps,
} from "@workspace/sanity/image";
import { memo } from "react";

const ASSET_ID_RE = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/;

function buildCdnUrl(
  id: string,
  width?: number,
  height?: number
): string | null {
  const match = id.match(ASSET_ID_RE);
  if (!match) {
    return null;
  }
  const [, hash, dim, ext] = match;
  const params = new URLSearchParams({
    auto: "format",
    fit: "max",
    q: "80",
  });
  if (typeof width === "number" && Number.isFinite(width)) {
    params.set("w", String(Math.round(width)));
  }
  if (typeof height === "number" && Number.isFinite(height)) {
    params.set("h", String(Math.round(height)));
  }
  return `${SANITY_BASE_URL}${hash}-${dim}.${ext}?${params.toString()}`;
}

function toFiniteNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) {
      return n;
    }
  }
  return undefined;
}

function SanityImageImpl({
  image,
  alt,
  width,
  height,
  mode: _mode,
  hotspot: _hotspot,
  crop: _crop,
  queryParams: _queryParams,
  preview: _preview,
  htmlWidth,
  htmlHeight,
  htmlId,
  ...rest
}: SanityImageProps) {
  const data = processImageData(image);
  if (!data) {
    return null;
  }
  const w = toFiniteNumber(width);
  const h = toFiniteNumber(height);
  const src = buildCdnUrl(data.id, w, h);
  if (!src) {
    return null;
  }
  return (
    // biome-ignore lint/performance/noImgElement: native lazy loading by design — explicit product spec to avoid LQIP/srcset behavior of sanity-image
    <img
      alt={alt ?? data.alt ?? ""}
      decoding="async"
      height={htmlHeight ?? h}
      id={htmlId}
      loading="lazy"
      src={src}
      width={htmlWidth ?? w}
      {...rest}
    />
  );
}

export const SanityImage = memo(SanityImageImpl);
