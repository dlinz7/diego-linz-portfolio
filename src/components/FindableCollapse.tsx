import { useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { BeforeMatchContext } from './beforeMatchContext';

interface Props {
  in?: boolean;
  children?: ReactNode;
}

/**
 * Transition slot for MUI Accordion. Collapsed content uses hidden="until-found",
 * so Ctrl/Cmd+F still finds it and the browser fires "beforematch", which we use to
 * expand the section. Browsers without support treat it as plain `hidden`.
 */
export function FindableCollapse({ in: open = false, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onBeforeMatch = useContext(BeforeMatchContext);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React only knows boolean `hidden`, so set the "until-found" value directly.
    if (open) el.removeAttribute('hidden');
    else el.setAttribute('hidden', 'until-found');
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onBeforeMatch) return;
    el.addEventListener('beforematch', onBeforeMatch);
    return () => el.removeEventListener('beforematch', onBeforeMatch);
  }, [onBeforeMatch]);

  return (
    <div ref={ref} hidden={!open} data-findable-collapse="">
      {children}
    </div>
  );
}
