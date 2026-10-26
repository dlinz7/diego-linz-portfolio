import Box from '@mui/material/Box';
import { MetricTile } from '@/components/MetricTile';
import { SectionHeading } from '@/components/SectionHeading';
import { resume } from '@/content/resume';

export function ImpactMetrics() {
  return (
    <Box component="section" aria-labelledby="impact-heading">
      <SectionHeading id="impact-heading" flavor="Mission Log">
        Impact
      </SectionHeading>
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
          gap: { xs: 1.5, md: 2 },
          p: 0,
          m: 0,
        }}
      >
        {resume.metrics.map((metric, index) => (
          <MetricTile
            key={metric.id}
            value={metric.value}
            label={metric.label}
            accentIndex={index}
          />
        ))}
      </Box>
    </Box>
  );
}
