import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { site } from '@/content/site';
import { EmailButton } from './EmailButton';

/** Resume download, email and profile links. Full-width buttons on phones. */
export function ContactActions() {
  const fullWidthOnPhone = { width: { xs: '100%', sm: 'auto' } };
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      <Button
        variant="contained"
        href={site.resumePdfPath}
        download
        startIcon={<DownloadIcon />}
        sx={fullWidthOnPhone}
      >
        Download resume (PDF)
      </Button>
      <EmailButton variant="outlined" sx={fullWidthOnPhone} />
      {site.linkedInUrl && (
        <Button
          variant="outlined"
          href={site.linkedInUrl}
          startIcon={<LinkedInIcon />}
          sx={fullWidthOnPhone}
        >
          LinkedIn
        </Button>
      )}
      {site.githubUrl && (
        <Button
          variant="outlined"
          href={site.githubUrl}
          startIcon={<GitHubIcon />}
          sx={fullWidthOnPhone}
        >
          GitHub
        </Button>
      )}
    </Stack>
  );
}
