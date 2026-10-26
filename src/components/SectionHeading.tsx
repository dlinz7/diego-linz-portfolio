import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  id: string;
  /** Plain-English heading; this is what screen readers and parsers see as the heading. */
  children: string;
  /** Era-flavored label shown above the heading, e.g. "Service Record". */
  flavor?: string;
}

export function SectionHeading({ id, children, flavor }: Props) {
  return (
    <Box sx={{ mb: 2 }}>
      {flavor && (
        <Typography variant="overline" component="p" sx={{ color: 'text.secondary' }}>
          {flavor}
        </Typography>
      )}
      <Typography variant="h2" id={id}>
        {children}
      </Typography>
    </Box>
  );
}
