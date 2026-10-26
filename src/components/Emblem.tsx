import Box, { type BoxProps } from '@mui/material/Box';

interface Props extends Omit<BoxProps<'svg'>, 'component'> {
  size?: number;
  /** Provide a title when the emblem is the only content of a link or button. */
  title?: string;
}

/**
 * Original mark for the site: a rising chevron over a four-point star inside a
 * rounded shield. Deliberately unlike any official insignia.
 */
export function Emblem({ size = 40, title, sx, ...rest }: Props) {
  const labelled = Boolean(title);
  return (
    <Box
      component="svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      sx={{ flexShrink: 0, display: 'block', ...sx }}
      {...rest}
    >
      {labelled && <title>{title}</title>}
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="18"
        fill="var(--surface-raised)"
        stroke="var(--accent-primary)"
        strokeWidth="3"
      />
      <path d="M14 42 L32 18 L50 42 L41 42 L32 30 L23 42 Z" fill="var(--accent-primary)" />
      <path
        d="M32 38 L34 44 L40 46 L34 48 L32 54 L30 48 L24 46 L30 44 Z"
        fill="var(--accent-secondary)"
      />
    </Box>
  );
}
