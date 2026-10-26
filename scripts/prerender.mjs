// Renders the home page and resume to static HTML after `vite build`, so crawlers,
// link previews and slow phones get the full resume before any JavaScript runs.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, prerenderedRoutes, buildPersonJsonLd, serializeJsonLd, site } = await import(
  serverEntry
);
const template = await readFile(join(dist, 'index.html'), 'utf8');

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Unrendered shell for every other route; the host rewrites unknown paths to it.
await writeFile(
  join(dist, 'spa.html'),
  template.replace('<!--app-head-->', '').replace('<!--app-html-->', ''),
);

const siteUrl = site.url.replace(/\/$/, '');

for (const { path, meta } of prerenderedRoutes) {
  const { html, styleTags } = await render(path);
  const canonical = `${siteUrl}${path === '/' ? '/' : path}`;
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<script type="application/ld+json">${serializeJsonLd(buildPersonJsonLd())}</script>`,
    styleTags,
  ].join('\n    ');

  const page = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace('content="/og-image.png"', `content="${siteUrl}/og-image.png"`)
    .replace('<!--app-head-->', head)
    .replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root" data-prerendered-path="${path}">${html}</div>`,
    );

  const outFile = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html');
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page);
  console.log(`prerendered ${path} → ${outFile.replace(root, '.')}`);
}

await rm(join(root, 'dist-ssr'), { recursive: true, force: true });
