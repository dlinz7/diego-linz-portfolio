import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { eraChanged } from '@/features/ui/uiSlice';

/** On = TNG (default), off = TOS. Accessible name: "Interface era: TNG". */
export function EraToggle() {
  const era = useAppSelector((state) => state.ui.era);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box
        component="span"
        aria-hidden
        sx={{ typography: 'overline', color: era === 'tos' ? 'text.primary' : 'text.secondary' }}
      >
        TOS
      </Box>
      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Switch
            checked={era === 'tng'}
            onChange={(event) => dispatch(eraChanged(event.target.checked ? 'tng' : 'tos'))}
            slotProps={{ input: { 'aria-label': 'Interface era: TNG' } }}
          />
        }
        label={
          <Box
            component="span"
            sx={{
              typography: 'overline',
              color: era === 'tng' ? 'text.primary' : 'text.secondary',
            }}
          >
            TNG
          </Box>
        }
      />
    </Box>
  );
}
