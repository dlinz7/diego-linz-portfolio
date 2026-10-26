import { color, fontFamily } from './tokens';

export type Era = 'tos' | 'tng';
export const ERAS: readonly Era[] = ['tos', 'tng'];
export const DEFAULT_ERA: Era = 'tng';

export type DivisionId = 'command' | 'operations' | 'sciences';

export interface DivisionColor {
  /** Fill color for bands, chips and badges. */
  main: string;
  /** Text placed on top of `main`. */
  contrastText: string;
  /** Version of the hue that is safe as text on the page and panel backgrounds. */
  text: string;
}

export interface SemanticTokens {
  mode: 'light' | 'dark';
  surface: { page: string; panel: string; raised: string };
  text: { primary: string; secondary: string; link: string };
  accent: {
    primary: string;
    primaryContrast: string;
    secondary: string;
    secondaryContrast: string;
  };
  division: Record<DivisionId, DivisionColor>;
  status: { error: string; success: string; warning: string };
  focus: string;
  border: string;
  /** Decorative color bars. Never placed behind text. */
  decor: string[];
  font: { display: string; body: string };
}

export const semanticTokens: Record<Era, SemanticTokens> = {
  tng: {
    mode: 'dark',
    surface: { page: color.black, panel: color.night, raised: color.nightRaised },
    text: { primary: color.bone, secondary: color.boneSoft, link: color.sky[300] },
    accent: {
      primary: color.peach[400],
      primaryContrast: color.black,
      secondary: color.lavender[400],
      secondaryContrast: color.black,
    },
    division: {
      command: { main: color.red[400], contrastText: color.black, text: color.red[300] },
      operations: { main: color.gold[400], contrastText: color.black, text: color.gold[400] },
      sciences: { main: color.teal[400], contrastText: color.black, text: color.teal[400] },
    },
    status: { error: color.red[300], success: color.green[300], warning: color.amber[300] },
    focus: color.sun[300],
    border: '#3A3F4B',
    decor: [color.peach[400], color.lavender[400], color.tan[400], color.periwinkle[400]],
    font: { display: fontFamily.tngDisplay, body: fontFamily.body },
  },
  tos: {
    mode: 'light',
    surface: { page: color.cream, panel: color.creamLight, raised: color.creamDark },
    text: { primary: color.ink, secondary: color.inkSoft, link: color.blue[700] },
    accent: {
      primary: color.blue[800],
      primaryContrast: color.white,
      secondary: color.red[700],
      secondaryContrast: color.white,
    },
    division: {
      command: { main: color.gold[600], contrastText: color.ink, text: color.gold[800] },
      operations: { main: color.red[600], contrastText: color.white, text: color.red[600] },
      sciences: { main: color.blue[600], contrastText: color.white, text: color.blue[600] },
    },
    status: { error: color.red[600], success: color.green[800], warning: color.amber[800] },
    focus: color.blue[800],
    border: '#8C7E62',
    decor: [color.red[600], color.gold[600], color.blue[600], color.ink],
    font: { display: fontFamily.tosDisplay, body: fontFamily.body },
  },
};

/** Flattens tokens into CSS custom properties so plain CSS and Storybook share the same values. */
export function toCssVariables(tokens: SemanticTokens): Record<string, string> {
  const vars: Record<string, string> = {
    '--surface-page': tokens.surface.page,
    '--surface-panel': tokens.surface.panel,
    '--surface-raised': tokens.surface.raised,
    '--text-primary': tokens.text.primary,
    '--text-secondary': tokens.text.secondary,
    '--text-link': tokens.text.link,
    '--accent-primary': tokens.accent.primary,
    '--accent-secondary': tokens.accent.secondary,
    '--focus': tokens.focus,
    '--border': tokens.border,
    '--font-display': tokens.font.display,
    '--font-body': tokens.font.body,
  };
  for (const [id, division] of Object.entries(tokens.division)) {
    vars[`--division-${id}`] = division.main;
    vars[`--division-${id}-text`] = division.text;
  }
  tokens.decor.forEach((value, index) => {
    vars[`--decor-${index + 1}`] = value;
  });
  return vars;
}
