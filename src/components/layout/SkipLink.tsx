import Link from '@mui/material/Link';

export function SkipLink() {
  return (
    <Link
      href="#main"
      data-print="hide"
      sx={{
        position: 'absolute',
        left: 16,
        top: -100,
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        px: 2,
        py: 1.5,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 600,
        borderRadius: 1,
        '&:focus': { top: 'calc(env(safe-area-inset-top) + 8px)' },
      }}
    >
      Skip to main content
    </Link>
  );
}
