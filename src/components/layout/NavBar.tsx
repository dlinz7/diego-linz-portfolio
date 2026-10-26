import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { resume } from '@/content/resume';
import { Emblem } from '../Emblem';
import { EraToggle } from '../EraToggle';
import { RouterLink, RouterNavLink } from '../RouterLink';
import { navItems } from './navItems';

function navLabel(label: string, flavor?: string) {
  return flavor ? `${flavor} (${label})` : label;
}

const activeLinkSx = {
  '&[aria-current="page"]': {
    boxShadow: (theme: Theme) => `inset 0 -3px 0 ${theme.tokens.decor[0]}`,
  },
} as const;

export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const [lastPath, setLastPath] = useState(pathname);
  // Close the drawer when navigation happens (e.g. via browser back).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (drawerOpen) setDrawerOpen(false);
  }

  return (
    <AppBar position="sticky" component="header" data-print="hide">
      <Container>
        <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 60, md: 68 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              color: 'text.primary',
              textDecoration: 'none',
              mr: 'auto',
              minHeight: 44,
              borderRadius: 1,
              '&:focus-visible': {
                outline: (t) => `3px solid ${t.tokens.focus}`,
                outlineOffset: 2,
              },
            }}
          >
            <Emblem size={36} />
            <Box sx={{ lineHeight: 1.1 }}>
              <Typography
                component="span"
                sx={{ display: 'block', fontWeight: 700, fontSize: '1.05rem' }}
              >
                {resume.name}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontSize: '0.8rem',
                  color: 'text.secondary',
                }}
              >
                {resume.title}
              </Typography>
            </Box>
          </Box>

          {/* Phones: the resume link stays in the bar; everything else lives in the drawer. */}
          <Button
            component={RouterNavLink}
            to="/personnel-file"
            variant="outlined"
            size="small"
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            Resume
          </Button>
          <IconButton
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="nav"
            aria-label="Main"
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterNavLink}
                to={item.to}
                end={item.to === '/'}
                color="inherit"
                sx={{ borderRadius: 0, px: 1.5, ...activeLinkSx }}
              >
                {navLabel(item.label, item.flavor)}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}>
            <EraToggle />
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        id="nav-drawer"
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(320px, 85vw)', pt: 'env(safe-area-inset-top)' } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Main">
          <List>
            {navItems.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={RouterNavLink}
                  to={item.to}
                  end={item.to === '/'}
                  sx={{ minHeight: 48, ...activeLinkSx }}
                >
                  <ListItemText primary={navLabel(item.label, item.flavor)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <EraToggle />
        </Box>
      </Drawer>
    </AppBar>
  );
}
