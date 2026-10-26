/** WCAG 2.x contrast ratio between two hex colors (#RGB or #RRGGBB). */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [light, dark] = a > b ? [a, b] : [b, a];
  return (light + 0.05) / (dark + 0.05);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function parseHex(hex: string): [number, number, number] {
  let value = hex.replace('#', '');
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }
  if (!/^[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`Not a hex color: ${hex}`);
  }
  return [0, 2, 4].map((start) => parseInt(value.slice(start, start + 2), 16)) as [
    number,
    number,
    number,
  ];
}
