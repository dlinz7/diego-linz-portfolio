// Renders public/og-image.png (the link-preview card) from an original SVG.
// Run with `npm run og-image` after changing the name, title or colors.
import { writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000"/>
  <path d="M0 0 H1200 V40 H140 A100 100 0 0 0 40 140 V630 H0 Z" fill="#FF9C5B"/>
  <rect x="0" y="600" width="300" height="30" fill="#B7A6F0"/>
  <rect x="300" y="600" width="300" height="30" fill="#E6B88A"/>
  <rect x="600" y="600" width="300" height="30" fill="#8FA7E8"/>
  <rect x="900" y="600" width="300" height="30" fill="#F05A5F"/>
  <g transform="translate(980 110) scale(2.6)">
    <rect x="3" y="3" width="58" height="58" rx="18" fill="#181C25" stroke="#FF9C5B" stroke-width="3"/>
    <path d="M14 42 L32 18 L50 42 L41 42 L32 30 L23 42 Z" fill="#FF9C5B"/>
    <path d="M32 38 L34 44 L40 46 L34 48 L32 54 L30 48 L24 46 L30 44 Z" fill="#B7A6F0"/>
  </g>
  <text x="120" y="250" font-family="Bahnschrift, 'Arial Narrow', Arial, sans-serif" font-size="110" font-weight="700" fill="#F4EFE6" letter-spacing="4">DIEGO LINZ</text>
  <text x="124" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="600" fill="#F4EFE6">Senior Frontend Engineer</text>
  <text x="124" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#C9C2B6">React · TypeScript · Redux · MUI · Austin, TX</text>
  <text x="124" y="500" font-family="Bahnschrift, 'Arial Narrow', Arial, sans-serif" font-size="30" fill="#FF9C5B" letter-spacing="3">8 YEARS · 17M USERS · 95% → 100% UPTIME</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
})
  .render()
  .asPng();

await writeFile(new URL('../public/og-image.png', import.meta.url), png);
console.log(`wrote public/og-image.png (${png.length} bytes)`);
