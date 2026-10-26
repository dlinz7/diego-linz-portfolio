import { NavLink, type NavLinkProps } from 'react-router';

/**
 * React Router's NavLink for use as MUI's `component` prop.
 * NavLink sets aria-current="page" on the active link.
 */
export function RouterNavLink({
  ref,
  ...props
}: NavLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) {
  return <NavLink ref={ref} {...props} />;
}

export { Link as RouterLink } from 'react-router';
