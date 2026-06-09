import { defineConfig } from "astro/config";

// Pure static output — Cloudflare Pages serves /dist as flat HTML.
// No SSR adapter needed; the only server-side calls in the marketing site
// are the login/signup form POSTs which go directly to app.ollawrite.com.

export default defineConfig({
  output: "static",
  site: "https://ollawrite.com",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
});
