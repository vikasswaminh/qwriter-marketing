import { defineConfig } from "astro/config";

// Pure static output — Cloudflare Pages serves /dist as flat HTML.
// No SSR adapter needed; the only server-side calls in the marketing site
// are the login/signup form POSTs which go directly to app.ollasuper.com.

export default defineConfig({
  output: "static",
  site: "https://ollasuper.com",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  // Old IA (qwriter copywriter-era) → new OllaSuper IA.
  // These produce meta-refresh stubs in static output so external links keep working.
  redirects: {
    "/features": "/experts",
    "/sources":  "/how-it-works",
    "/journal":  "/changelog",
  },
});
