import { createClient } from "@sanity/client";

const c = createClient({
  projectId: "7bgx7lr4",
  dataset: "production",
  apiVersion: "2025-03-15",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

async function main() {
  const counts = await c.fetch(`{
  "brands": count(*[_type == "brand"]),
  "sites": count(*[_type == "site"]),
  "navbars": count(*[_type == "navbar"]),
  "footers": count(*[_type == "footer"]),
  "homePages": count(*[_type == "homePage"]),
  "people": count(*[_type == "person"]),
  "studios": count(*[_type == "studio"]),
  "classFormats": count(*[_type == "classFormat"]),
  "services": count(*[_type == "service"]),
  "pressItems": count(*[_type == "pressItem"]),
  "crossSitePress": count(*[_type == "pressItem" && count(featuredOn) >= 2]),
  "purebarreStudios": count(*[_type == "studio" && site->slug.current == "purebarre"]),
  "stretchlabStudios": count(*[_type == "studio" && site->slug.current == "stretchlab"]),
  "hillcrestPair": *[_type == "studio" && address.city == "San Diego"] | order(brand->name asc) { name, "brand": brand->name, "address": address.street }
}`);
  console.log(JSON.stringify(counts, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
