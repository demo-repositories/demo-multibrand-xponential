import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {basename, extname, join} from 'node:path'

const client = createClient({
  projectId: '7bgx7lr4',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_AUTH_TOKEN!,
  useCdn: false,
})

const PUSH = process.argv.includes('--push')
const IMAGES_DIR = join(__dirname, '_images')

interface ManifestEntry {
  docType: string
  slug: string
  file: string | null
  source: string
  altText: string
  note?: string
  reason?: string
}

/**
 * Map manifest entry → { docId, field } for the Sanity patch target.
 * Returns null if the entry should be skipped.
 */
function targetForEntry(e: ManifestEntry, blogBrand: 'purebarre' | 'stretchlab' | null): { docId: string; field: string } | null {
  switch (e.docType) {
    case 'brand':
      return { docId: `brand-${e.slug}`, field: 'logo' }
    case 'site-logo':
      return { docId: `site-${e.slug}`, field: 'logo' }
    case 'site-favicon':
      return { docId: `site-${e.slug}`, field: 'favicon' }
    case 'studio':
      return { docId: `studio-${e.slug}`, field: 'heroImage' }
    case 'press':
      return { docId: `pressItem-${e.slug}`, field: 'heroImage' }
    case 'classFormat':
      return { docId: `classFormat-purebarre-${e.slug}`, field: 'image' }
    case 'blog':
      if (!blogBrand) return null
      return { docId: `blog-${blogBrand}-${e.slug}`, field: 'image' }
    case 'service':
      // patch the published doc only; leave drafts alone
      return { docId: `service-stretchlab-${e.slug}`, field: 'image' }
    case 'author':
      // slug = 'pb-editorial' or 'sl-editorial' → doc id is 'author-<slug>'
      return { docId: `author-${e.slug}`, field: 'image' }
    default:
      return null
  }
}

/** Derive which blog brand a slug belongs to by looking up the doc in dataset. */
async function buildBlogBrandMap(): Promise<Map<string, 'purebarre' | 'stretchlab'>> {
  const blogs = await client.fetch<{ _id: string }[]>(`*[_type=="blog" && !(_id in path("drafts.**"))]{_id}`)
  const map = new Map<string, 'purebarre' | 'stretchlab'>()
  for (const b of blogs) {
    // _id like "blog-purebarre-<slug>" or "blog-stretchlab-<slug>"
    const m = b._id.match(/^blog-(purebarre|stretchlab)-(.+)$/)
    if (m) map.set(m[2], m[1] as any)
  }
  return map
}

function mimeFor(ext: string): string {
  const x = ext.toLowerCase()
  if (x === '.svg') return 'image/svg+xml'
  if (x === '.png') return 'image/png'
  if (x === '.jpg' || x === '.jpeg') return 'image/jpeg'
  if (x === '.webp') return 'image/webp'
  if (x === '.gif') return 'image/gif'
  if (x === '.ico') return 'image/x-icon'
  return 'application/octet-stream'
}

async function main() {
  const manifestPath = join(IMAGES_DIR, '_manifest.json')
  const manifest: ManifestEntry[] = JSON.parse(readFileSync(manifestPath, 'utf-8'))

  const blogBrands = await buildBlogBrandMap()

  // Build full plan
  const plan: { entry: ManifestEntry; docId: string; field: string; localFile: string; mime: string }[] = []
  const skipped: { entry: ManifestEntry; reason: string }[] = []

  for (const e of manifest) {
    if (!e.file) { skipped.push({entry: e, reason: 'no file in manifest'}); continue }
    const blogBrand = e.docType === 'blog' ? (blogBrands.get(e.slug) ?? null) : null
    const target = targetForEntry(e, blogBrand)
    if (!target) { skipped.push({entry: e, reason: 'no target mapping'}); continue }
    const localFile = join(IMAGES_DIR, e.file.replace(/^\/research\/images\//, ''))
    plan.push({ entry: e, docId: target.docId, field: target.field, localFile, mime: mimeFor(extname(e.file)) })
  }

  // Verify which docs exist + skip ones already populated
  const docIds = Array.from(new Set(plan.map(p => p.docId)))
  const existing = await client.fetch<{ _id: string }[]>(`*[_id in $ids]{_id}`, { ids: docIds })
  const existingSet = new Set(existing.map(d => d._id))

  // Check which fields are already set (idempotency)
  const populated = await client.fetch<{ _id: string; field: string; hasAsset: boolean }[]>(
    `*[_id in $ids]{_id, "checks": [
      {"field":"logo", "hasAsset": defined(logo.asset)},
      {"field":"favicon", "hasAsset": defined(favicon.asset)},
      {"field":"heroImage", "hasAsset": defined(heroImage.asset)},
      {"field":"image", "hasAsset": defined(image.asset)}
    ]}`,
    { ids: docIds }
  ) as any
  const populatedMap = new Map<string, Set<string>>()
  for (const d of populated) {
    const s = new Set<string>()
    for (const c of d.checks) if (c.hasAsset) s.add(c.field)
    populatedMap.set(d._id, s)
  }

  const finalPlan: typeof plan = []
  for (const p of plan) {
    if (!existingSet.has(p.docId)) {
      skipped.push({entry: p.entry, reason: `doc ${p.docId} not in dataset`})
      continue
    }
    if (populatedMap.get(p.docId)?.has(p.field)) {
      skipped.push({entry: p.entry, reason: `${p.docId}.${p.field} already populated`})
      continue
    }
    finalPlan.push(p)
  }

  // Report
  const byType: Record<string, number> = {}
  for (const p of finalPlan) byType[p.entry.docType] = (byType[p.entry.docType] || 0) + 1
  console.log(JSON.stringify({
    manifestTotal: manifest.length,
    skipped: skipped.length,
    skippedReasons: skipped.slice(0, 20),
    toUpload: finalPlan.length,
    byType,
    plan: finalPlan.map(p => ({docId: p.docId, field: p.field, file: p.entry.file, mime: p.mime, alt: p.entry.altText})),
    pushing: PUSH,
  }, null, 2))

  if (!PUSH) {
    console.log('\nDRY RUN. Re-run with --push to upload + patch.')
    return
  }

  // Upload assets one at a time, then patch in batches of 50
  const assetMap = new Map<string, string>() // localFile → asset._id (for dedup)
  const patches: { docId: string; field: string; assetId: string; alt: string }[] = []

  for (let i = 0; i < finalPlan.length; i++) {
    const p = finalPlan[i]
    let assetId = assetMap.get(p.localFile)
    if (!assetId) {
      const buffer = readFileSync(p.localFile)
      const asset = await client.assets.upload('image', buffer, {
        filename: basename(p.localFile),
        contentType: p.mime,
      })
      assetId = asset._id
      assetMap.set(p.localFile, assetId)
      console.log(`[${i+1}/${finalPlan.length}] uploaded ${basename(p.localFile)} → ${assetId}`)
    } else {
      console.log(`[${i+1}/${finalPlan.length}] reusing asset for ${basename(p.localFile)} → ${assetId}`)
    }
    patches.push({ docId: p.docId, field: p.field, assetId, alt: p.entry.altText })
  }

  // Apply patches in batches
  const batchSize = 50
  for (let i = 0; i < patches.length; i += batchSize) {
    const slice = patches.slice(i, i + batchSize)
    let tx = client.transaction()
    for (const pa of slice) {
      tx = tx.patch(pa.docId, (patch) => patch.set({
        [pa.field]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: pa.assetId },
          alt: pa.alt,
        },
      }))
    }
    const res = await tx.commit({ autoGenerateArrayKeys: true })
    console.log(`Committed patch batch ${i / batchSize + 1}: ${res.results.length} docs`)
  }

  console.log(`\nDone. ${patches.length} image fields set across ${new Set(patches.map(p => p.docId)).size} docs. ${assetMap.size} unique assets uploaded.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
