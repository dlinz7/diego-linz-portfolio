import { createContext } from 'react';

/** Called when the browser's find-in-page matches text inside a collapsed section. */
export const BeforeMatchContext = createContext<(() => void) | null>(null);
