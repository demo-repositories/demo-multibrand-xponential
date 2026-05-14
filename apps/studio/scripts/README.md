# scripts/

One-off migration and audit scripts for the demo dataset (project \`7bgx7lr4\`, dataset \`production\`).

All scripts:

- run with \`pnpm tsx scripts/<name>.ts\` from \`apps/studio\`
- require \`SANITY_AUTH_TOKEN\` in env with editor or higher permissions
- are dry-run by default; pass \`--push\` to commit changes
- are idempotent — re-running after a successful push is a no-op

## Scripts

### \`audit-images.ts\`

Reports the current state of every image field across brand / site / studio / pressItem / classFormat / blog / service / author docs. No writes. Use to verify what's empty before running an import, or to confirm nothing regressed after.

### \`fix-slugs.ts\`

Walks every doc with \`slug.current\` and normalizes it to match the starter's full-pathname convention (per-type rules in \`apps/studio/utils/slug-validation.ts\`):

- \`homePage\` → \`/\`
- \`blogIndex\` → \`/blog\`
- \`blog\` → \`/blog/<seg>\`
- everything else → must start with \`/\`

Used once to retrofit 50 docs after seed scripts wrote bare segments.

### \`import-images.ts\`

Reads a manifest at \`scripts/_images/_manifest.json\` and (a) uploads each file as a Sanity image asset and (b) patches the corresponding doc's target field (\`logo\`, \`favicon\`, \`heroImage\`, or \`image\` depending on doc type). Skips fields that are already populated. Content-hash dedup happens automatically on the Sanity asset side.

The \`_images/\` directory is git-ignored — files are sourced externally per run.

Manifest entry shape:

\`\`\`json
{
  "docType": "blog",
  "slug": "what-is-barre",
  "file": "/research/images/blog/what-is-barre.png",
  "source": "https://...",
  "altText": "What is Barre?"
}
\`\`\`

Doc-type → field mapping:

| docType | field | docId pattern |
|---|---|---|
| brand | logo | brand-<slug> |
| site-logo | logo | site-<slug> |
| site-favicon | favicon | site-<slug> |
| studio | heroImage | studio-<slug> |
| press | heroImage | pressItem-<slug> |
| classFormat | image | classFormat-purebarre-<slug> |
| blog | image | blog-<purebarre|stretchlab>-<slug> (resolved by doc lookup) |
| service | image | service-stretchlab-<slug> (published only; leaves drafts alone) |
| author | image | author-<slug> |
