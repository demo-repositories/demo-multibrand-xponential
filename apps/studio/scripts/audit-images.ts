
import {createClient} from '@sanity/client'
const client = createClient({
  projectId: '7bgx7lr4',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_AUTH_TOKEN!,
  useCdn: false,
})

async function main() {
  const result: Record<string, any> = {}

  result.brands = await client.fetch(`*[_type == "brand"]{_id, name, "slug": slug.current, "hasLogo": defined(logo.asset), "hasModalLogo": defined(modalLogo.asset), "hasCardLogo": defined(cardLogo.asset), "hasHero": defined(heroImage.asset)}`)
  result.sites = await client.fetch(`*[_type == "site"]{_id, name, "slug": slug.current, "hasLogo": defined(logo.asset), "hasFavicon": defined(favicon.asset)}`)
  result.studios = await client.fetch(`*[_type == "studio"]{_id, name, "slug": slug.current, "hasHero": defined(heroImage.asset)}`)
  result.press = await client.fetch(`*[_type == "pressItem"]{_id, title, "slug": slug.current, "hasHero": defined(heroImage.asset)}`)
  result.classFormats = await client.fetch(`*[_type == "classFormat"]{_id, name, "slug": slug.current, "hasImage": defined(image.asset)}`)
  result.blogs = await client.fetch(`*[_type == "blog"]{_id, title, "slug": slug.current, "hasImage": defined(image.asset)}`)
  result.services = await client.fetch(`*[_type == "service"]{_id, name, "slug": slug.current, "hasImage": defined(image.asset)}`)
  result.authors = await client.fetch(`*[_type == "author"] | order(_id asc) {_id, name, "slug": slug.current, "hasImage": defined(image.asset)}`)

  console.log(JSON.stringify(result, null, 2))
}

main().catch((e) => { console.error(e); process.exit(1) })
