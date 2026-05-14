import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '7bgx7lr4',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_AUTH_TOKEN!,
  useCdn: false,
})

const PUSH = process.argv.includes('--push')

/**
 * Slug rules per doc type — mirrors apps/studio/utils/slug-validation.ts CONFIGS.
 * The starter's documentSlugField treats slug.current as a full pathname, so every
 * doc that uses documentSlugField needs a leading "/".
 */
function targetSlug(docType: string, current: string | undefined): string | null {
  if (!current) return null
  const c = current.trim()

  if (docType === 'homePage') {
    return c === '/' ? null : '/'
  }
  if (docType === 'blogIndex') {
    return c === '/blog' ? null : '/blog'
  }
  if (docType === 'blog') {
    // require /blog/<seg>
    if (c.startsWith('/blog/')) return null
    if (c.startsWith('/')) {
      // already starts with / but not /blog/ — strip and re-prefix
      return `/blog${c}`
    }
    return `/blog/${c}`
  }
  // default: any other doc type — must start with /
  if (c.startsWith('/')) return null
  return `/${c.replace(/^\/+/, '')}`
}

interface Doc { _id: string; _type: string; slug?: { current?: string }; name?: string; title?: string }

async function main() {
  const docs: Doc[] = await client.fetch(
    `*[defined(slug.current) && !(_type match "system.*") && !(_type match "sanity.*")]{_id,_type,slug,name,title}`
  )

  const plan: { id: string; type: string; from: string; to: string; label: string }[] = []
  for (const d of docs) {
    const next = targetSlug(d._type, d.slug?.current)
    if (next === null) continue
    plan.push({
      id: d._id,
      type: d._type,
      from: d.slug?.current ?? '',
      to: next,
      label: d.name || d.title || '(no title)',
    })
  }

  const byType: Record<string, number> = {}
  for (const p of plan) byType[p.type] = (byType[p.type] || 0) + 1

  console.log(JSON.stringify({
    totalScanned: docs.length,
    totalToFix: plan.length,
    byType,
    pushing: PUSH,
    sample: plan.slice(0, 60).map(p => ({type: p.type, label: p.label, from: p.from, to: p.to})),
  }, null, 2))

  if (!PUSH) {
    console.log('\nDRY RUN. Re-run with --push to apply.')
    return
  }

  const batchSize = 50
  for (let i = 0; i < plan.length; i += batchSize) {
    const slice = plan.slice(i, i + batchSize)
    let tx = client.transaction()
    for (const p of slice) {
      tx = tx.patch(p.id, (patch) => patch.set({ 'slug.current': p.to }))
    }
    const res = await tx.commit({ autoGenerateArrayKeys: true })
    console.log(`Committed batch ${i / batchSize + 1}: ${res.results.length} docs`)
  }

  console.log(`\nDone. ${plan.length} slugs updated.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
