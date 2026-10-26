export interface NavItem {
  to: string;
  label: string;
  /** Era-flavored label shown alongside the plain one. */
  flavor?: string;
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/personnel-file', label: 'Resume', flavor: 'Personnel File' },
  { to: '/ships-systems', label: 'How it’s built', flavor: 'Ship’s Systems' },
  { to: '/apply', label: 'Academy demo', flavor: 'Apply' },
];
