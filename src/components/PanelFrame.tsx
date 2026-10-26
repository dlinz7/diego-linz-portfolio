import Box, { type BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { radius } from '@/theme/tokens';

interface Props extends Omit<BoxProps, 'title'> {
  /** Short era-style label shown on the frame (e.g. "Service Record"). Decorative. */
  label?: ReactNode;
  /** "calm" keeps the frame thin and quiet, for panels that hold resume text. */
  tone?: 'calm' | 'bold';
  /** Color for the frame bar. Defaults to the first decor color. */
  barColor?: string;
}

/**
 * Era-specific frame around a panel. TNG: a rounded "elbow" bar on the top-left.
 * TOS: an angular block bar with a chunky edge. On phones both collapse to a thin top bar.
 */
export function PanelFrame({ label, tone = 'calm', barColor, children, sx, ...rest }: Props) {
  const theme = useTheme();
  const isTng = theme.era === 'tng';
  const bar = barColor ?? theme.tokens.decor[0];
  const barWidth = tone === 'bold' ? 20 : 10;

  return (
    <Box
      sx={[
        {
          position: 'relative',
          bgcolor: 'background.paper',
          borderTop: `6px solid ${bar}`,
          borderRadius: isTng ? `${radius.md}px` : 0,
          p: { xs: 2, sm: 3 },
          [theme.breakpoints.up('sm')]: {
            borderTop: `${barWidth}px solid ${bar}`,
            borderLeft: `${barWidth}px solid ${bar}`,
            borderTopLeftRadius: isTng ? `${radius.elbow}px` : 0,
            ...(isTng ? {} : { boxShadow: `6px 6px 0 ${theme.tokens.decor[3]}` }),
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {label && (
        <Typography
          variant="overline"
          component="p"
          sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
        >
          {label}
        </Typography>
      )}
      {children}
    </Box>
  );
}
