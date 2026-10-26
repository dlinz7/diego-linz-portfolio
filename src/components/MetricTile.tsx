import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface Props {
  value: string;
  label: string;
  /** Index into the era's decor colors for the accent bar. */
  accentIndex?: number;
}

/** A large number with a plain-English label. Rendered as real text so screen readers and resume parsers can read it. */
export function MetricTile({ value, label, accentIndex = 0 }: Props) {
  const theme = useTheme();
  const accent = theme.tokens.decor[accentIndex % theme.tokens.decor.length];
  return (
    <Card
      component="li"
      sx={{ height: '100%', borderTop: `4px solid ${accent}`, listStyle: 'none' }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 }, '&:last-child': { pb: { xs: 2, md: 2.5 } } }}>
        <Typography
          component="p"
          sx={{
            fontFamily: theme.tokens.font.display,
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)',
            lineHeight: 1.1,
            color: 'text.primary',
          }}
        >
          {value}
        </Typography>
        <Typography variant="body2" component="p" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
