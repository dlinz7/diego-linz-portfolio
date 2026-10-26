import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import Button, { type ButtonProps } from '@mui/material/Button';
import { useSyncExternalStore } from 'react';
import { buildMailto } from '@/lib/email';

const subscribe = () => () => {};
const fallbackHref = '/personnel-file#contact';

/**
 * The mailto link only exists in the browser: the prerendered HTML gets the fallback
 * link, so scrapers reading static HTML never see the address.
 */
export function EmailButton({ children = 'Email me', ...props }: Omit<ButtonProps<'a'>, 'href'>) {
  const href = useSyncExternalStore(subscribe, buildMailto, () => fallbackHref);

  return (
    <Button component="a" href={href} startIcon={<MailOutlineIcon />} {...props}>
      {children}
    </Button>
  );
}
