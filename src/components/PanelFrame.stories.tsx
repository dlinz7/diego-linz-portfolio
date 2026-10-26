import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PanelFrame } from './PanelFrame';

const meta = {
  title: 'Components/PanelFrame',
  component: PanelFrame,
  args: {
    label: 'Academy Admissions',
    tone: 'calm',
    children: (
      <>
        <Typography variant="h2">Panel heading</Typography>
        <Typography sx={{ mt: 1 }}>
          Frames take their shape from the era: a rounded elbow in TNG, an angular block with a hard
          shadow in TOS. On phones both shrink to a thin top bar.
        </Typography>
      </>
    ),
  },
} satisfies Meta<typeof PanelFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calm: Story = {};
export const Bold: Story = { args: { tone: 'bold' } };
export const Mobile: Story = { globals: { viewport: { value: 'iphone13' } } };
