import { Logger } from "@workspace/logger";
import "dotenv/config";
import path from "node:path";
import { defineCliConfig } from "sanity/cli";

const logger = new Logger("SanityCLI");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

// #region agent log
fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "4cb1bf",
  },
  body: JSON.stringify({
    sessionId: "4cb1bf",
    runId: "pre-fix",
    hypothesisId: "H1,H2",
    location: "apps/studio/sanity.cli.ts:11",
    message: "Sanity CLI env snapshot",
    data: {
      cwd: process.cwd(),
      initCwd: process.env.INIT_CWD,
      npmLifecycleEvent: process.env.npm_lifecycle_event,
      argv: process.argv,
      projectId,
      projectIdLength: projectId.length,
      dataset,
      datasetLength: dataset.length,
      hasAuthToken: Boolean(process.env.SANITY_AUTH_TOKEN),
    },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

if (!projectId) {
  logger.warn(
    "Missing or invalid SANITY_STUDIO_PROJECT_ID - some features may not work"
  );
}
if (!dataset) {
  logger.warn(
    "Missing or invalid SANITY_STUDIO_DATASET - some features may not work"
  );
}

/**
 * Returns the correct studio host based on environment variables.
 * - If HOST_NAME is set and not "main", returns `${HOST_NAME}-${PRODUCTION_HOSTNAME}`
 * - If HOST_NAME is "main" or not set, returns PRODUCTION_HOSTNAME
 * - If PRODUCTION_HOSTNAME is not set, returns a default using projectId
 */
function getStudioHost(): string | undefined {
  const host = process.env.HOST_NAME;
  const productionHostName = process.env.SANITY_STUDIO_PRODUCTION_HOSTNAME;

  // #region agent log
  fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "4cb1bf",
    },
    body: JSON.stringify({
      sessionId: "4cb1bf",
      runId: "pre-fix",
      hypothesisId: "H3",
      location: "apps/studio/sanity.cli.ts:58",
      message: "Studio host inputs",
      data: {
        host,
        productionHostName,
        projectId,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  if (productionHostName) {
    if (host && host !== "main") {
      return `${host}-${productionHostName}`;
    }

    return productionHostName;
  }

  if (projectId) {
    return `${projectId}`;
  }

  return;
}

const studioHost = getStudioHost();

if (studioHost) {
  logger.info(`Sanity Studio Host: https://${studioHost}.sanity.studio`);
}

// #region agent log
fetch("http://127.0.0.1:7816/ingest/acba08cd-eacf-4f6f-a1c7-140b8b6fa731", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "4cb1bf",
  },
  body: JSON.stringify({
    sessionId: "4cb1bf",
    runId: "pre-fix",
    hypothesisId: "H3,H4",
    location: "apps/studio/sanity.cli.ts:91",
    message: "Sanity CLI resolved deploy config",
    data: {
      api: {
        projectId,
        dataset,
      },
      studioHost,
      hasDeploymentAppId: true,
    },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
  deployment: {
    appId: "y8bphcjn9fxcbjgestt5q5d0",
    autoUpdates: false,
  },
  schemaExtraction: {
    enabled: true,
    enforceRequiredFields: true,
    workspace: "xponential",
  },
  typegen: {
    enabled: true,
    formatGeneratedCode: true,
    path: "../../packages/sanity/src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../../packages/sanity/src/sanity.types.ts",
    overloadClientMethods: true,
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  },
});
