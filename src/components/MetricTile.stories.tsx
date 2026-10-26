import Box from '@mui/material/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { resume } from '@/content/resume';
import { MetricTile } from './MetricTile';

const meta = {
  title: 'Components/MetricTile',
  component: MetricTile,
  args: { value: '17M users', label: 'served by public-facing apps', accentIndex: 0 },
  decorators: [
    (Story) => (
      <Box component="ul" sx={{ p: 0, m: 0, maxWidth: 280 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof MetricTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Strip: Story = {
  render: () => (
    <Box
      component="ul"
      sx={{
        p: 0,
        m: 0,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
      }}
    >
      {resume.metrics.map((m, i) => (
        <MetricTile key={m.id} value={m.value} label={m.label} accentIndex={i} />
      ))}
    </Box>
  ),
  decorators: [(Story) => <Story />],
};

export const Mobile: Story = {
  ...Strip,
  globals: { viewport: { value: 'iphone13' } },
};
