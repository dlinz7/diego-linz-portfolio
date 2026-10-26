import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { keyframes, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { motion } from '@/theme/tokens';

const lines = [
  ['Academy admissions console', 'online'],
  ['Personnel file', 'Diego Linz'],
  ['Specialty', 'Frontend engineering'],
  ['Certified systems', 'React · TypeScript · Redux'],
  ['Status', 'Accepting transfer requests'],
] as const;

const reveal = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
`;

const lineDelay = (motion.bootTotal - motion.base) / lines.length;
const valueColors = ['command', 'operations', 'sciences'] as const;

/**
 * Decorative "boot" readout beside the hero. Pure CSS animation, so it never delays
 * content, and the full text is in the HTML. Hidden from screen readers because it
 * repeats facts from the hero. Off under reduced motion via the global rule.
 */
export function BootPanel() {
  const theme = useTheme();
  const [skipped, setSkipped] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFinished(true), motion.bootTotal);
    return () => window.clearTimeout(timer);
  }, []);

  const isTng = theme.era === 'tng';

  return (
    <Box data-print="hide" sx={{ position: 'relative' }}>
      <Box
        aria-hidden
        sx={{
          fontFamily: theme.tokens.font.display,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          borderLeft: `14px solid ${theme.tokens.decor[1]}`,
          borderRadius: isTng ? '28px 8px 8px 28px' : 0,
          p: { xs: 2, md: 3 },
          display: 'grid',
          gap: 1,
        }}
      >
        {lines.map(([label, value], index) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              borderBottom: `1px dashed ${theme.palette.divider}`,
              pb: 0.75,
              animation: skipped ? 'none' : `${reveal} ${motion.base}ms ease-out both`,
              animationDelay: `${Math.round(index * lineDelay)}ms`,
            }}
          >
            <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              {label}
            </Box>
            <Box
              component="span"
              sx={{
                color:
                  theme.tokens.division[valueColors[index % valueColors.length] ?? 'command'].text,
                fontSize: '0.9rem',
                textAlign: 'right',
              }}
            >
              {value}
            </Box>
          </Box>
        ))}
      </Box>
      {!finished && !skipped && (
        <Button
          size="small"
          onClick={() => setSkipped(true)}
          aria-label="Skip intro animation"
          sx={{
            position: 'absolute',
            right: 8,
            bottom: -44,
            '@media (prefers-reduced-motion: reduce)': { display: 'none' },
          }}
        >
          Skip
        </Button>
      )}
    </Box>
  );
}
