import Stack from '@mui/material/Stack';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Emblem } from './Emblem';

const meta = {
  title: 'Components/Emblem',
  component: Emblem,
  args: { size: 64 },
} satisfies Meta<typeof Emblem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};
export const Labelled: Story = { args: { title: 'Diego Linz portfolio emblem' } };
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'end' }}>
      {[24, 36, 64, 128].map((size) => (
        <Emblem key={size} size={size} />
      ))}
    </Stack>
  ),
};
