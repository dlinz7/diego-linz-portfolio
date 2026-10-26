# 6. Collapsed experience stays searchable with hidden="until-found"

**Status:** accepted

## Context

The spec wants older roles collapsed on the home page, but Ctrl/Cmd+F must still find their text.
MUI's default `Collapse` hides closed content with `visibility: hidden`, which find-in-page skips.

## Decision

Pass a custom transition component (`FindableCollapse`) through the Accordion's `slots.transition`.
Closed content gets `hidden="until-found"`. When the browser finds a match inside it, it fires
`beforematch` and we expand that role. React only renders boolean `hidden`, so the prerendered
HTML says `hidden` and the component switches it to `until-found` after mount.

## Consequences

- Find-in-page works in Chromium browsers; others fall back to plain `hidden` (text is still in
  the DOM for crawlers and the print view).
- No open/close animation. That suits a resume and removes a reduced-motion special case.
