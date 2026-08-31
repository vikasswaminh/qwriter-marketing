import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Pure static output — Cloudflare Pages serves /dist as flat HTML.
// No SSR adapter needed; the marketing site makes no server-side calls at all.
// Auth lives entirely on app.ollasuper.com — every sign-in CTA links straight
// there, and public/_redirects 302s the retired /login + /signup paths.

export default defineConfig({
  output: "static",
  site: "https://ollasuper.com",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [sitemap()],
  // Old IA (qwriter copywriter-era) → new OllaSuper IA.
  // These produce meta-refresh stubs in static output so external links keep working.
  redirects: {
    "/features": "/experts",
    "/sources":  "/how-it-works",
    "/journal":  "/changelog",
  },
});
