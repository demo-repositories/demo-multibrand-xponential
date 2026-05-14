import { NextResponse } from "next/server";

import { getNavigationData } from "@/lib/navigation";
import { resolveSiteSlug } from "@/lib/site";

export const revalidate = 360; // every 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteSlug = resolveSiteSlug(searchParams.get("siteSlug"));
  const data = await getNavigationData(siteSlug);
  return NextResponse.json(data);
}
