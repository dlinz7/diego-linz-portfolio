import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ContactActions } from '@/components/ContactActions';
import { resume } from '@/content/resume';
import { site } from '@/content/site';
import { BootPanel } from './BootPanel';

export function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-name"
      sx={{
        display: 'grid',
        gap: { xs: 3, md: 5 },
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(0, 1fr)' },
        alignItems: 'center',
        pt: { xs: 3, md: 6 },
      }}
    >
      <Box>
        <Typography variant="h1" id="hero-name">
          {resume.name}
        </Typography>
        <Typography
          component="p"
          sx={{ fontSize: 'clamp(1.25rem, 1.1rem + 0.6vw, 1.6rem)', fontWeight: 600, mt: 1 }}
        >
          {resume.title}
        </Typography>
        <Typography
          component="p"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mt: 0.5 }}
        >
          <PlaceOutlinedIcon fontSize="small" aria-hidden />
          {resume.location.display}
        </Typography>
        <Typography sx={{ mt: 2, maxWidth: '60ch', fontSize: '1.1rem' }}>
          {resume.valueStatement}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <ContactActions />
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&::before': {
              content: '""',
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'success.main',
              flexShrink: 0,
            },
          }}
        >
          {site.availability}
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <BootPanel />
      </Box>
    </Box>
  );
}
