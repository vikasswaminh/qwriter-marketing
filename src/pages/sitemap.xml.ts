import type { APIRoute } from "astro";
import { experts } from "~/data/experts";

// Hand-rolled sitemap so we don't need @astrojs/sitemap. Re-runs at build time
// — add new pages here when shipping.
const STATIC_PATHS = [
  "/",
  "/experts",
  "/how-it-works",
  "/pricing",
  "/changelog",
];

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://ollasuper.com")).origin;
  const lastmod = "2026-06-09";

  const urls = [
    ...STATIC_PATHS.map(p => ({ loc: `${origin}${p}`, lastmod, priority: p === "/" ? "1.0" : "0.8" })),
    ...experts.map(e => ({ loc: `${origin}/experts/${e.slug}`, lastmod, priority: "0.7" })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
