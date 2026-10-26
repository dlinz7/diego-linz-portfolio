# Handoff: "Starfleet Academy Admissions" — Diego Linz Portfolio Site

> **For the Cursor agent:** This is the complete build spec. Read it fully before writing code. Build in the phase order in §14. Where a choice is not specified, pick the conventional option and record it as an ADR in `docs/adr/`. Do not add a real email-sending backend — the contact form collects data only (see §6.1).

---

## 1. Purpose and audience

A personal portfolio for **Diego Linz, Senior Frontend Engineer** (React, TypeScript, Redux, MUI; 8 yrs; Texas Comptroller of Public Accounts, UT Austin). The site is a playful **Starfleet Academy application** (TOS/TNG flavor) whose real job is to prove senior-level frontend skill to hiring managers and engineers.

Two audiences, two speeds:

| Visitor                     | Needs                                   | Must reach it in                              |
| --------------------------- | --------------------------------------- | --------------------------------------------- |
| Recruiter / hiring manager  | Resume, contact, "what can he do"       | 1 click from landing                          |
| Engineer reviewing the work | Architecture, code quality, perf, tests | 1 click ("Ship's Systems" page + GitHub link) |
| Curious visitor             | The fun application flow and PDF permit | Primary CTA                                   |

The theme must never get in the way of the resume. **The home page leads with resume highlights (§4.1)**, and a visible **"Personnel File (Resume)"** link is always in the top nav.

---

## 2. Tech stack (fixed)

| Concern              | Choice                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build                | **Vite** + React 19 + **TypeScript (strict)**                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Routing              | React Router (data router), route-level code splitting with `lazy()`                                                                                                                                                                                                                                                                                                                                                                                                        |
| State                | **Redux Toolkit** + **RTK Query** (API layer), listener middleware                                                                                                                                                                                                                                                                                                                                                                                                          |
| UI                   | **MUI (latest stable, `@mui/material` + `@mui/icons-material`)** as the _only_ component library, with a custom token-driven theme (two themes: TOS and TNG). Customize through the theme (`components` overrides, `styleOverrides`, `variants`) and `sx`, not by wrapping MUI in hand-rolled divs. No Tailwind or second UI kit. Use `@mui/x-date-pickers` for date of birth if it passes the a11y checks in §10; otherwise a native date input styled via MUI `TextField` |
| Forms                | **React Hook Form** + **Yup** via `yupResolver` (`@hookform/resolvers/yup`). Yup is the only validation library; do not add Zod                                                                                                                                                                                                                                                                                                                                             |
| Mock backend         | **MSW** (Mock Service Worker), runs in dev _and_ production build                                                                                                                                                                                                                                                                                                                                                                                                           |
| PDF                  | `@react-pdf/renderer`, lazy-loaded only on the final step                                                                                                                                                                                                                                                                                                                                                                                                                   |
| QR code              | `qrcode` (generate data URL for the PDF)                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| i18n                 | `react-i18next` + `Intl` APIs                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Perf metrics         | `web-vitals`, `PerformanceObserver`                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Unit/component tests | **Vitest** + React Testing Library + `@testing-library/user-event`                                                                                                                                                                                                                                                                                                                                                                                                          |
| E2E                  | **Playwright** + `@axe-core/playwright`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Component docs       | **Storybook** (react-vite) with a11y + interactions addons                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Quality              | ESLint (typescript-eslint, jsx-a11y, react-hooks), Prettier, husky + lint-staged, `size-limit`                                                                                                                                                                                                                                                                                                                                                                              |
| CI                   | GitHub Actions + Lighthouse CI                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Hosting              | Static deploy (Vercel or Netlify) with PR preview deploys; Storybook published at `/storybook`                                                                                                                                                                                                                                                                                                                                                                              |

No backend server. Everything "server" is MSW.

---

## 3. IP and tone guardrails (important)

This is a public, professional site, so keep it clearly a fan homage:

- **Do not** use the official Starfleet delta insignia, Paramount/CBS logos, show screenshots, ship schematics, audio clips, or the trademarked "LCARS" name in UI copy. Design an **original emblem** (abstract chevron/star mark) as an SVG.
- Visual style may be _inspired by_ TNG-era console panels and TOS-era 1960s design (rounded color bars, bold blocks, condensed type) — built from original CSS, not copied assets.
- Fonts: free Google Fonts only. Suggested: **Antonio** (TNG theme headings), **Oswald** or **Bebas Neue** (TOS theme headings), **Inter** for body text in both themes for readability.
- Footer disclaimer on every page: _"A fan-made portfolio project. Not affiliated with or endorsed by Paramount or CBS Studios. Star Trek and related marks are property of their owners."_
- All in-universe copy (department descriptions, scenario prompts) should be **originally written**, light and witty, never quoted dialogue.

---

## 4. Information architecture (routes)

```
/                         Home — resume highlights first (§4.1), then the Academy application CTA
/personnel-file           Resume page (HTML, semantic) + "Download resume PDF"
/ships-systems            Engineering case study: architecture, decisions, perf budgets, test stats
/apply                    Application wizard (multi-path), nested routes below
  /apply/identity           Step 1: Cadet identity & mailing/contact info
  /apply/division           Step 2: Choose division + track (the path split)
  /apply/assessment         Step 3: Division-specific questions (dynamic)
  /apply/review             Step 4: Review, standardization results, edit links
  /apply/permit             Step 5: Generate Access Permit PDF
/verify/:permitId         Permit verification page (target of the PDF's QR code) — public
/sign-in                  Security clearance check (sign-in), supports ?redirect=
/admissions               Admissions Officer dashboard — role: officer (see §7A)
  /admissions/:applicationId  Application detail: approve / deny / request info
/forbidden                403: "Insufficient clearance"
*                         404: "Sector not charted" with route home
```

- Wizard steps are real routes: back/forward buttons work, refresh preserves progress (see §7 persistence), deep-linking to a later step redirects to the first incomplete step (route guard via loader).
- Stepper at the top shows completion state per step; completed steps are clickable.

### 4.1 Home page: recruiter-first resume highlights

A recruiter may give the page 10 seconds. They must learn **who Diego is, what he's done, and how to contact him without clicking, scrolling far, or waiting for an animation.** The Star Trek theme frames the page; it never hides content.

**Order of the page (top to bottom):**

1. **Hero (always visible, above the fold on a 1366×768 laptop and on a 390 px phone):**
   - Name as the page `h1`, title "Senior Frontend Engineer", location "Austin, TX".
   - One-line value statement from the resume summary.
   - Primary buttons: **Download Resume (PDF)**, **Email me** (runtime-assembled `mailto:`), **LinkedIn** / **GitHub** (owner supplies URLs).
   - Availability line, e.g. "Open to senior frontend roles · Remote or Austin" (owner to confirm wording; config value).
2. **Impact metrics strip (always visible):** 4 MUI `Card` tiles with the number large and a plain-English label:
   - **8 years** building production web apps
   - **17M users** served by public-facing apps
   - **95% → 100% uptime** improvement
   - **$160B+** annual revenue agency
     Numbers render as real text (not images or canvas) so they're readable by screen readers and ATS/AI resume parsers.
3. **Skills at a glance (always visible):** grouped MUI `Chip`s (Frontend / Languages / Backend & Data / Practices); React, TypeScript, Redux and MUI listed first.
4. **Experience (collapsible, details below):** one MUI `Accordion` per role.
5. **Education** (single line, not collapsed).
6. **"See how I build" section:** a short card pointing to the Academy application demo ("Try the Starfleet Academy application: a working demo of complex forms, Redux, auth and performance monitoring"), plus links to Ship's Systems, Storybook, and the GitHub repo.

**Collapsible experience rules:**

- Each accordion **summary shows the essentials even when collapsed**: role title, employer, dates, and a one-line headline achievement (e.g. Comptroller: "React modernization of public apps serving up to 17M users"). Collapsing hides only the full bullet list.
- **Most recent role (Texas Comptroller) is expanded by default**; others collapsed. An **"Expand all / Collapse all"** button sits above the list.
- Expanded state is in the URL hash or `localStorage` only as a convenience; the page must look complete and sensible with nothing stored.
- Accessibility: use MUI `Accordion` with `slotProps={{ heading: { component: 'h3' } }}` so each role is a real heading under an "Experience" `h2`; summary is the button with `aria-expanded`/`aria-controls` (MUI default); keyboard toggles with Enter/Space. Collapsed content stays in the DOM (MUI default `TransitionProps={{ unmountOnExit: false }}`) so **Ctrl/Cmd+F finds it** and search engines index it.
- **Print stylesheet** (`@media print`): all accordions expanded, theme chrome, Ops Console, nav and footer art hidden, black text on white. A recruiter printing the page gets a clean resume.

**Recruiter-friendliness rules for the home page:**

- **No blocking intro.** The "Academy Admissions" boot sequence is a small decorative panel that plays _beside or after_ the hero, ≤ 1.5 s, skippable, never delays content, and off under reduced motion. Do not gate the page behind a "click to enter".
- **Readability over theme in this section:** body copy in Inter at ≥ 16 px, normal case; the era fonts are only for section labels. The resume content uses a calm panel style in both eras (no blinking, no dense color bars behind text).
- The Ops Console starts **minimized** on the home page so it doesn't cover the resume.
- Performance: the home route must not import MUI X, PDF, Redux-heavy feature code, or the wizard; LCP target ≤ 1.5 s on mobile (enforced by Lighthouse CI on `/`).
- SEO and sharing: `<title>Diego Linz · Senior Frontend Engineer</title>`, meta description from the summary, Open Graph/Twitter card image (an original graphic with name + title), JSON-LD `Person` schema (name, jobTitle, address locality, sameAs links). Pre-render `/` and `/personnel-file` to static HTML at build (e.g. `vite-plugin-ssg` or a prerender step) so the resume is in the initial HTML for crawlers and link previews.
- Single source of truth: resume content lives in `src/content/resume.ts` (typed), consumed by the home page, `/personnel-file`, JSON-LD, and the print view. Never duplicate the text.
- Content tone: professional, first person optional. Star Trek wording is allowed in **section labels only** and always paired with the plain term, e.g. "Service Record · Experience", "Personnel File · Resume". Never rename facts ("17M users", job titles, employers).

**Relationship to `/personnel-file`:** the home page is the highlights view; `/personnel-file` is the complete resume page (all bullets expanded, plus the "How this site maps to my experience" callout). Both share `src/content/resume.ts`.

---

## 5. Theming system (TOS ⇄ TNG toggle)

Demonstrates a real design-token architecture, not just two color palettes.

- `src/theme/tokens.ts`: primitive tokens (color ramps, spacing scale, radii, type scale, motion durations).
- `src/theme/semantic.ts`: semantic tokens per era (`surface.panel`, `accent.primary`, `division.command`, `status.error`, etc.).
- `src/theme/createEraTheme.ts`: builds an MUI theme from semantic tokens; also writes them as **CSS custom properties** so non-MUI elements (and Storybook) share one source.
- Toggle in the nav; choice stored in Redux `ui.era`, persisted to `localStorage` (wrapped in try/catch), defaults to TNG; respects `prefers-color-scheme` only for surface brightness inside each era if feasible.
- **Era-correct division colors** (a fun detail that also shows token indirection):

| Division                            | TOS  | TNG       |
| ----------------------------------- | ---- | --------- |
| Command                             | Gold | Red       |
| Operations (Engineering / Security) | Red  | Gold      |
| Sciences (Science / Medical)        | Blue | Teal-blue |

The same component reads `division.command`; the era theme decides the hue.

- TNG look: black background, rounded elbow-shaped panel frames, pill buttons, condensed uppercase labels.
- TOS look: bold flat primaries, angular panels, chunky "button bank" accents, retro type.
- Both themes must pass WCAG 2.2 AA contrast (verify in Storybook a11y addon and Playwright axe runs).
- Animations (panel slide-ins, "boot" text) are disabled under `prefers-reduced-motion`.

---

## 5A. Responsive design (mobile-first)

Recruiters often open links on their phones, so every page must be fully usable from **320 px to 1920+ px** with no horizontal scrolling and no feature removed on small screens.

**Approach**

- Build **mobile-first**: base styles target phones; enhance upward with MUI breakpoints (`theme.breakpoints.up('md')`) in `sx` and theme overrides. Use MUI `Grid` (v2) / `Stack` and CSS grid; no fixed pixel widths on containers.
- Breakpoints (MUI defaults, documented in tokens): `xs` 0, `sm` 600, `md` 900, `lg` 1200, `xl` 1536. Content max width ~1200 px, centered.
- Fluid type with `clamp()` for headings (set in the theme typography); body stays ≥ 16 px (also prevents iOS zoom on input focus).
- Spacing and radii come from tokens; era decorations (TNG elbow frames, TOS button banks) **simplify on small screens**: frames collapse to a thin top/left color bar under `sm` so the decoration never squeezes content.
- Use `useMediaQuery` only where behavior changes (e.g. dialog vs. bottom sheet); prefer pure CSS for layout so there's no layout shift on hydration of the prerendered pages.
- Touch targets ≥ 44×44 px on touch devices (`@media (pointer: coarse)`), ≥ 24×24 everywhere.
- Respect safe areas (`env(safe-area-inset-*)`) for the sticky nav and the Ops Console on notched phones.
- Images/graphics: SVG for the emblem; OG image and any raster art served with `srcset` / modern formats.

**Per-area behavior**

| Area                                                 | Phone (xs–sm)                                                                                                                                         | Tablet (md)                                        | Desktop (lg+)                                               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| Top nav                                              | Logo + menu button opening an MUI `Drawer`; era toggle, locale, user menu inside the drawer; "Resume" link stays visible in the bar                   | Inline links, overflow into a menu                 | Full inline nav                                             |
| Home hero                                            | Stacked; buttons full width; boot panel below the hero (or hidden)                                                                                    | Two columns                                        | Two columns, boot panel beside hero                         |
| Impact metrics                                       | 2×2 grid                                                                                                                                              | 4 across                                           | 4 across                                                    |
| Experience accordions                                | Full width; dates under the title                                                                                                                     | Same as desktop                                    | Dates right-aligned in the summary                          |
| Wizard stepper                                       | Compact MUI `MobileStepper`-style header: "Step 2 of 5 · Division" with a progress bar; full step list in an expandable menu                          | Horizontal stepper, labels may wrap                | Horizontal stepper with labels                              |
| Wizard fields                                        | Single column; Next/Back in a sticky bottom action bar                                                                                                | Two columns where fields pair (City / State / ZIP) | Two to three columns; review shows a sticky summary sidebar |
| Division cards                                       | Stacked full-width radio cards                                                                                                                        | 3 across                                           | 3 across                                                    |
| Dialogs (address suggestion, idle warning, confirms) | `fullScreen` on xs; address diff shows suggested _above_ original instead of side by side                                                             | Standard dialog                                    | Standard dialog                                             |
| Electives checklist                                  | Grouped accordions per department; credit meter sticky at the top                                                                                     | List with sticky meter                             | Two columns with meter in sidebar                           |
| Admissions dashboard table                           | Each application as a card (name, track, status, actions)                                                                                             | Table with fewer columns                           | Full MUI table                                              |
| Ops Console                                          | Collapsed pill; opens as a **bottom sheet** (`SwipeableDrawer`, max 80% height) with tabs as a scrollable tab bar; API log rows become two-line cards | Floating panel, 400 px wide                        | Floating panel, resizable                                   |
| PDF permit                                           | Download primary; inline preview replaced by "Open preview" (opens in new tab), since mobile browsers render PDFs poorly in iframes                   | Inline preview                                     | Inline preview                                              |

**Testing responsive behavior**

- Playwright projects for **iPhone 13 (390×844)**, **Pixel 7**, **iPad (810×1080)** and **Desktop 1440×900**; run the home, one full wizard path, auth/idle and admissions specs on each.
- Visual regression snapshots (`toHaveScreenshot`) for home, each wizard step and the permit page at 390 px and 1440 px in both eras (masked dynamic areas like timers).
- An automated check that `document.documentElement.scrollWidth <= innerWidth` on every route at 320 px.
- Lighthouse CI runs with mobile emulation (the default) on `/`, `/personnel-file`, `/apply/identity`.
- Storybook viewport addon with the same device presets; every shared component has a mobile story.

---

## 6. The application wizard

### 6.0 Architecture: schema-driven forms

This is the centerpiece engineers will read. Do not hand-write each step as bespoke JSX.

- **Field config** (`src/features/application/config/*.ts`): each field declares `id`, `type`, i18n label key, options source (static or API), and **rules**:
  - `enabledWhen`, `visibleWhen`, `requiredWhen` — predicate functions over the current form values (+ app context such as `era`).
  - `clearOnDisable: true` — when a field becomes disabled/hidden its value is reset and its error cleared.
- **Rules engine** (`src/features/application/rules/`): pure functions, 100% unit tested, no React.
- **Schemas (Yup)**: one Yup schema per step in `src/features/application/schemas/`, wired with `useForm({ resolver: yupResolver(schema, { context }), mode: 'onTouched' })`.
  - **Conditional rules** use `.when()`: e.g. `county: string().when('state', { is: 'TX', then: s => s.required('validation.countyRequired'), otherwise: s => s.strip() })`.
  - **App context** (era, species from Step 1, API limits) is passed through the resolver's `context` and read with `.when('$era', …)` / `.when('$limits', …)`. This is how the TOS/Klingon waiver rule and API-supplied minimums work.
  - **Path-specific Step 3**: `yup.lazy((values) => trackSchemas[values.track])` so each track has its own schema.
  - **Cross-field rules**: `yup.ref()` for comparisons (e.g. "time you'll tell the captain" ≥ "estimated repair time" via `number().min(ref('repairHours'))`), and `.test()` with `this.parent` for anything more complex (credit budget, prerequisites, no-duplicate rows).
  - **Arrays**: `array().of(object(...)).min().max()` for field arrays (languages, electives).
  - **Async checks** (medical license): don't call the API inside every validation pass. Use an RTK Query lazy query, debounced 400 ms, cache results by ID, and have the Yup `.test()` read from that cache via context (returns "checking" until resolved).
  - **Types**: derive form value types with `yup.InferType<typeof schema>` and pass them to `useForm<…>`; no hand-written duplicate interfaces.
  - **Messages**: `yup.setLocale()` returns i18n keys, translated at render time (see §11).
  - The rules engine's `requiredWhen` predicates and the Yup `.when()` conditions must not drift: generate both from the same field config where practical, or add a unit test per field asserting they agree.
- **Division config is served from the mock API** (`GET /api/divisions/:id/requirements`) and cached with RTK Query — i.e. a _server-driven form_. The client still owns the Yup schemas; the API supplies option lists and limits (min hours, etc.) so the dashboard shows real traffic.
- A generic `<FormFieldRenderer>` maps config → MUI + RHF `Controller` components.
- Per-step validation on "Next"; an **error summary** at the top of the step (`role="alert"`) links to each invalid field and moves focus to it.

### 6.1 Step 1 — Cadet identity & mailing/contact info

No email is sent. This form collects data that flows into Redux, the review step, and the PDF.

| Field                    | Rules                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First name, Last name    | Required, 1–50 chars, letters/spaces/hyphen/apostrophe                                                                                                                                                                                                                                                                                                                                                                          |
| Preferred name           | Optional                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Email                    | Required, valid format, lowercased and trimmed on blur                                                                                                                                                                                                                                                                                                                                                                          |
| Phone                    | Required, input mask `(###) ###-####`, stored normalized as E.164                                                                                                                                                                                                                                                                                                                                                               |
| Date of birth            | Required, applicant must be ≥ 17 (Academy minimum)                                                                                                                                                                                                                                                                                                                                                                              |
| Species                  | Select: Human, Vulcan, Andorian, Tellarite, Betazoid, Bolian, Klingon, Other. "Other" enables a required free-text field                                                                                                                                                                                                                                                                                                        |
| Address line 1           | Required                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Address line 2           | Optional                                                                                                                                                                                                                                                                                                                                                                                                                        |
| City                     | Required                                                                                                                                                                                                                                                                                                                                                                                                                        |
| State                    | Required select of US states + DC (from `GET /api/states`)                                                                                                                                                                                                                                                                                                                                                                      |
| **County (if in Texas)** | **Label exactly "County (if in Texas)".** **Disabled until State = Texas.** When TX is selected: enables, fetches `GET /api/states/TX/counties` (all 254 Texas counties, alphabetical, searchable Autocomplete), and becomes **required**. When state changes away from TX: value cleared, error cleared, field disabled again. While loading: show inline spinner and `aria-busy`. On fetch error: inline error + Retry button |
| ZIP                      | Required, `#####` or `#####-####`. Cross-check ZIP prefix against selected state (TX = 750–799, 885); mismatch shows a warning, not a hard error                                                                                                                                                                                                                                                                                |

**Address standardization** (the "standardization" feature):

- On "Next", call `POST /api/address/standardize`. The mock normalizes like USPS: uppercase, street suffix abbreviations (Street → ST, Avenue → AVE, Suite → STE), directional abbreviations (North → N), trims whitespace, appends a ZIP+4 when missing (deterministic fake from a hash).
- If the result differs, open a dialog: **"Starfleet Records suggests:"** with a side-by-side diff (changed tokens highlighted). Buttons: _Use suggested_ / _Keep mine_. Choice is recorded in state and shown on the review step.
- Also standardize on display: phone formatting via one utility, names trimmed/collapsed spaces.

### 6.2 Step 2 — Division and track (the path split)

Three large division cards (keyboard-selectable radio group, era-colored), then a track select that depends on the division:

| Division   | Tracks                           |
| ---------- | -------------------------------- |
| Command    | Command Track, Helm & Navigation |
| Operations | Engineering, Security & Tactical |
| Sciences   | Science Officer, Medical         |

Changing division resets Step 3 data (with a confirm dialog if Step 3 already has input — "Reassignment will discard your assessment answers").

### 6.3 Step 3 — Division assessment (dynamic enable/disable + path-specific validation)

Each track has its own fields and rules. Requirements below are examples; keep the pattern variety (enable/disable, conditional required, cross-field, async, numeric ranges, era-aware rules).

**Command Track**

- Years of leadership experience (0–40, integer, required).
- "Have you attempted the no-win simulation exam?" Yes/No.
  - Yes → enables required **Outcome** select: Passed honorably / Failed / Reprogrammed the simulation.
  - "Reprogrammed the simulation" → enables required **Commendation for original thinking? Explain** textarea (min 40 chars). Easter-egg toast on submit.
- Leadership philosophy (textarea, 100–600 chars, live character counter).

**Helm & Navigation**

- Logged flight hours (required, min comes from API: 500).
- Vessel classes certified (multi-select, min 1). Selecting more than 3 enables optional "Preferred vessel" select limited to the chosen classes (dependent options).
- Simulator reaction score (0–1000); score < 600 shows a warning, not an error.

**Engineering**

- Specialization: Warp propulsion / Transporter systems / Computer systems.
  - Transporter → enables required **Pattern buffer safety certification #** (format `TR-####-XX`, regex).
  - Computer systems → enables optional "Languages you'd write a subroutine in" chips input.
- "Estimated repair time (hours)" and "Time you'll tell the captain (hours)": cross-field rule — the second must be ≥ the first; if it's ≥ 4× the first show a playful "Miracle-worker multiplier detected" badge.

**Security & Tactical**

- Weapons qualification level 1–5 (slider).
- Level ≥ 4 → enables and requires **Background clearance consent** checkbox.
- Hand-to-hand training: multi-select; "Other" enables text field.

**Science Officer**

- Research field (select from API).
- Peer-reviewed publications (integer ≥ 0). If > 0 → enables required **Most-cited publication URL** (valid https URL).
- "Can you compute odds to four decimal places?" — if Yes, enables a numeric field accepting exactly four decimals (regex).

**Medical**

- Medical license number (required, format `MD-######`), validated asynchronously against `GET /api/licenses/:id` (debounced 400 ms; mock returns valid for IDs whose digit sum is even). Shows checking/valid/invalid states.
- Specialty: General / Surgery / Xenobiology / Counseling.
  - Xenobiology → required multi-select of species studied, **min 2**.
  - Counseling + species Betazoid (from Step 1) → shows an info note and enables optional "Empathic abilities disclosure".

**Cross-cutting, era-aware rule (shows rules can read app context):**

- If era = **TOS** and species = **Klingon**, a required **Diplomatic waiver reference** field appears on Step 3 for any track (in TOS-era context they weren't Federation members). In TNG era the field is hidden and cleared. Toggling the theme mid-form re-evaluates rules live.

### 6.3A Dynamic options catalog (beyond County)

County (if in Texas) is the simplest example. The form should show a **range of distinct dynamic-option patterns**, each one demonstrating a different technique. Add these fields to the steps shown. Every disabled option must say _why_ it's disabled (MUI `ListItemText` secondary text or option `helperText`), never just grey out silently.

| #   | Field (step)                          | Pattern demonstrated                                                                      |
| --- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | Home world → address format (1)       | Schema switches shape based on a selection                                                |
| 2   | Same-as-mailing emergency contact (1) | Copy values and lock fields; unlock without data loss                                     |
| 3   | Languages spoken (1)                  | Field array with options removed from other rows (no duplicates)                          |
| 4   | Contact channel → format (1)          | Option changes input mask and validation                                                  |
| 5   | Academy start term (2)                | Options computed from today's date and applicant age, disabled with reasons               |
| 6   | Campus + travel arrangement (2)       | Options derived from the mailing address                                                  |
| 7   | Starship class preference (2)         | Options filtered by division _and_ era; ranked choice                                     |
| 8   | Faculty advisor (2)                   | Async server-side search, debounced, filtered by track                                    |
| 9   | Elective courses (3)                  | Prerequisites, mutually exclusive courses, and a credit budget that disables options live |
| 10  | Era-only training fields (3)          | Fields that exist only in one era                                                         |

**1. Home world → address format (Step 1).** Select: _Earth (United States)_ / _Off-world colony_.

- _Earth (US)_: the standard US address (Street, City, State, County (if in Texas), ZIP) exactly as in §6.1.
- _Off-world colony_: State, County and ZIP are **hidden and stripped from the payload** (`.strip()` in Yup); new required fields appear: Planet (select), Settlement, and **Sector code** (format `SEC-###.##`). Address standardization (§6.1) runs only for US addresses.
- Switching back restores the previous US values if the user hadn't cleared them (keep a per-variant draft in RHF via `shouldUnregister: false`), but only the active variant is validated and submitted.
- The PDF permit and Review step render whichever address format is active.

**2. Emergency contact (Step 1).** Name, relationship, phone, and address with a **"Same as my mailing address"** checkbox. Checked: address fields are filled from the mailing address, become **read-only** (not disabled, so they're still announced and submitted), and stay in sync if the mailing address changes. Unchecked: fields unlock with the copied values kept for editing. Relationship = _Other_ enables a required free-text field.

**3. Languages spoken (Step 1).** RHF `useFieldArray`, 1–5 rows: language + proficiency (Basic / Conversational / Fluent / Native).

- A language already chosen in one row is **disabled in the other rows' dropdowns** ("Already added").
- The species picked earlier **pre-fills row 1** with that species' native language (editable).
- "Federation Standard" must appear in at least one row at Conversational or above (Yup `.test()` on the array), with a friendly error.
- "Add language" disables at 5 rows with a reason.

**4. Preferred contact channel (Step 1).** Email / Mobile / Subspace relay. Choosing _Subspace relay_ enables a **Relay code** field with its own mask (`SR-####-####`); choosing Mobile makes the phone field required and adds an "OK to text?" checkbox. Switching channels re-validates only the affected fields.

**5. Academy start term (Step 2).** Options are generated from **today's date**: the next six terms (Fall/Spring), each showing its application deadline.

- Terms whose deadline has passed are **disabled** ("Applications closed Aug 1").
- Terms that start before the applicant turns 17 (from DOB) are **disabled** ("You'll be 16 at term start").
- An "Accelerated summer intake" option appears only for the Command and Medical tracks.
- Pure function `getAvailableTerms(today, dob, track)` with unit tests using fixed dates.

**6. Campus and travel (Step 2).** Campus: _San Francisco (main)_ / _Remote annex_; the annex is available only to Sciences.

- **Travel arrangement** options depend on the address: US West Coast states → _Maglev transit_; other US states → _Shuttle from nearest spaceport_ (shows a nearest-port name from a small lookup by state); Texas adds _Shuttle from Austin spaceport_; off-world → _Transport vessel_ and requires an **arrival sector** pre-filled from the sector code.
- Remote annex hides travel entirely.

**7. Starship class preference (Step 2).** Ranked choice of up to 3 classes (MUI `Autocomplete multiple` with drag-free up/down buttons for reordering, keyboard accessible).

- The list is **filtered by era** (TOS-era classes vs. TNG-era classes) and **by division** (science-vessel classes appear first for Sciences; heavy-escort classes require Security & Tactical, disabled for others with a reason).
- Toggling the era with selections made: incompatible picks are removed with an undo toast ("2 preferences removed: not in service in this era. Undo").
- Use ship _class_ names only, not named ships or characters.

**8. Faculty advisor (Step 2).** MUI `Autocomplete` with **server-side search** (`GET /api/advisors?track=…&q=…`), debounced 300 ms, minimum 2 characters, cancels stale requests (RTK Query `abort`), shows loading, "no results", and error-with-retry states. Advisors at capacity are returned but **disabled** ("No openings this term"). All advisor names are **original inventions**. Each call shows up in the Ops Console's Comms tab, which makes the debounce and cancellation visible.

**9. Elective courses (Step 3).** Options come from `GET /api/divisions/:id/requirements` per track. Multi-select checklist grouped by department, each course with credits.

- **Prerequisites:** "Advanced Warp Field Theory" is disabled until "Warp Field Theory I" is selected ("Requires Warp Field Theory I"). Deselecting a prerequisite also removes its dependents, with an undo toast.
- **Mutually exclusive pairs:** "Diplomacy Practicum" and "Tactical Negotiation" can't both be chosen; selecting one disables the other.
- **Credit budget:** 12–18 credits. A live meter (MUI `LinearProgress` + text "14 / 18 credits") updates as you pick; any course that would exceed 18 is **disabled** ("Would exceed 18-credit limit"). Under 12 is a validation error on Next.
- **Track-required course** is pre-checked and locked (e.g. "Xenobiology Lab" for Medical/Xenobiology).
- All rules are pure functions in `rules/electives.ts`, unit tested, and mirrored in the Yup `.test()`.

**10. Era-only training fields (Step 3).** Some fields only exist in one era: in **TNG** a "Holodeck simulation hours" field appears (number, 0–500) for every track; in **TOS** a "Computer tape library certification" checkbox appears instead. Toggling the era swaps them and strips the other's value, same mechanism as the Klingon waiver rule.

**Mock data needed** (`src/mocks/data/`): `terms.ts` (generated relative to today), `spaceports.json` (by state), `ship-classes.json` (era, division tags), `advisors.json` (~40 invented names, track, capacity), `electives.json` (per track: credits, prerequisites, exclusions, required flag), `languages.json` (incl. species → native language map). New endpoint: `GET /api/advisors`.

### 6.4 Step 4 — Review

- Read-only summary grouped by step, each group with an **Edit** link that returns to that step and then back to Review.
- Shows standardized vs. entered address (if the user accepted a suggestion).
- Validation status per step (re-run all schemas; if anything is invalid — e.g. data restored from an older persisted draft — block submit and link to the problem).
- Submitting requires a signed-in **Cadet** (Steps 1–3 can be filled anonymously). If the visitor isn't signed in, Submit opens the sign-in dialog (§7A); after success the submit continues automatically without losing any input.
- Submit → `POST /api/applications` returns `{ cadetId, permitId, stardate, clearanceLevel }`. Button shows pending state; failures show a retryable error. Use idempotency key to prevent double submit.

### 6.5 Step 5 — Access Permit PDF

- `@react-pdf/renderer` and the PDF template are **lazy-loaded** on this route only (verify in the bundle report).
- Permit contents: original emblem, "Starfleet Academy — Provisional Access Permit", cadet name, species, division + track (era-colored band), cadet ID, **stardate** of issue, clearance level (derived from track + answers, e.g. Security level 5 → "Clearance Gamma"), mailing address (standardized), and a **QR code** linking to `/verify/:permitId`.
- Permit ID encodes the essential data (base64url JSON + checksum). `/verify/:permitId` decodes it and shows "Permit valid / tampered". Label clearly that this is a client-side demo, not real security.
- Buttons: **Download PDF**, **Preview** (in-page iframe), **Start a new application** (clears application state with confirm).
- The PDF should follow the current era theme.

**Stardate:** use a documented fan formula in `src/lib/stardate.ts` (e.g. TNG-style decimal derived from the date), with unit tests. Note in code comments that there's no canonical formula.

---

## 7. Redux design

```
store
├─ application   (slice)   step data per step, completed steps, path, addressSuggestionChoice, draftVersion
├─ ui            (slice)   era, locale, opsConsoleOpen, opsConsoleTab, toasts
├─ auth          (slice)   status, user {id, name, roles}, accessExpiresAt, sessionExpiresAt, lastActivityAt, idleWarningOpen, signOutReason
├─ telemetry     (slice)   API call log (entity adapter, ring buffer max 200), web vitals, route timings, simulated network settings, auth events
└─ api           (RTK Query) states, counties, divisions/requirements, address standardize, licenses, applications, permits, auth, admissions
```

- Typed hooks (`useAppDispatch`, `useAppSelector`), memoized selectors with `createSelector`.
- **Persistence:** listener middleware writes `application` + `ui` to `sessionStorage` (application) and `localStorage` (ui), debounced, wrapped in try/catch, with a `version` field and a migration function so stale drafts don't crash the app.
- **Telemetry middleware:** a custom RTK Query middleware/listener captures each request's endpoint, method, status, duration, cache hit vs. network, payload size → `telemetry` slice.
- RHF owns in-progress input; on step completion (valid "Next") data is committed to Redux. Explain this boundary in an ADR (why not every keystroke in Redux).
- Redux DevTools enabled in dev; action/state sanitizer to keep the API log from bloating DevTools.

---

## 7A. Authentication and idle timeout

Demonstrates the session handling expected of a government/finance-grade front end, entirely against the MSW mock. Label it clearly in the UI: **"Demo authentication. Use the demo accounts; never enter a real password."**

### 7A.1 Accounts and roles

| Demo account                                | Role      | Can do                                                                                                                                                                        |
| ------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cadet (`cadet@academy.demo`)                | `cadet`   | Submit applications, generate own permit, view own application status                                                                                                         |
| Admissions Officer (`officer@academy.demo`) | `officer` | Everything a cadet can, plus `/admissions`: list all submitted applications, approve / deny / request info. Approval changes the permit's status shown on `/verify/:permitId` |

- Sign-in page offers **one-click "Sign in as Cadet" / "Sign in as Officer"** buttons (no typing for recruiters) _and_ a normal email/password form (RHF + Yup) to show validation, show/hide password toggle, caps-lock warning, and lockout after 5 failed attempts (mock returns `429` with `Retry-After`; UI shows a countdown).
- Passwords are never stored in Redux, persisted, or logged; the field is cleared on failure.
- Public routes: `/`, `/personnel-file`, `/ships-systems`, `/verify/*`, `/sign-in`, Steps 1–3 of `/apply`. Protected: Step 4 submit, `/apply/permit` (cadet), `/admissions/*` (officer).
- Route protection runs in React Router **loaders** (no flash of protected content): not signed in → `/sign-in?redirect=<path>`; signed in without the role → `/forbidden`. `redirect` is validated to be a same-origin relative path (prevents open redirects).
- Nav shows a user menu (name, role badge, "Sign out"). Role-based UI hides officer links from cadets, but the loader/API checks are the real enforcement; note that in the ADR.

### 7A.2 Tokens and refresh (the senior part)

- `POST /api/auth/login` returns a short-lived **access token** (mock JWT-shaped string, 5 min) plus a session id that stands in for an httpOnly refresh cookie.
- The access token lives **only in memory** in a small `tokenStore` module, **not in Redux** (keeps it out of DevTools, persistence and logs). Redux holds only metadata (`accessExpiresAt`, user, roles).
- The refresh session id is kept in `sessionStorage` to simulate the cookie. ADR must explain honestly: in production this would be an httpOnly, `Secure`, `SameSite=Strict` cookie set by the server; a service-worker mock cannot set real cookies, so this is a simulation.
- RTK Query `baseQueryWithReauth`: attaches `Authorization: Bearer`; on `401` it performs **one single-flight refresh** (shared promise / mutex so 5 concurrent 401s cause exactly 1 refresh), then replays the original requests. If refresh fails → sign out with reason `expired`.
- **Proactive refresh** 60 s before access expiry, but only if the user is active (idle users are not silently kept alive).
- **Absolute session lifetime**: 30 min from sign-in regardless of activity, then forced re-auth (configurable).
- On sign-out: clear token store, `api.util.resetApiState()`, clear auth slice, call `POST /api/auth/logout`, broadcast to other tabs. The application draft is **kept** (sessionStorage, this tab only) so the user can resume after signing back in.

### 7A.3 Idle timeout

- Defaults: **idle limit 5 min, warning shown at 60 s remaining.** A "Demo timing" control in the Ops Console switches to **30 s idle / 10 s warning** so an interviewer can see it in seconds.
- Activity sources: `pointerdown`, `keydown`, `wheel`, `touchstart`, `scroll`, and in-app route changes; listeners are passive and throttled (record at most once per 5 s). Mouse movement alone does not count (avoids accidental keep-alive).
- Timing uses **timestamps** (`lastActivityAt`, compared to `Date.now()`), not counting interval ticks, because background tabs throttle timers. Re-check immediately on `visibilitychange` and `focus` so a laptop waking from sleep signs out correctly.
- **Cross-tab sync** with `BroadcastChannel` (fallback: `storage` event): activity in any tab resets idle in all tabs; sign-out, sign-in, and "stay signed in" are mirrored; only one tab (leader election via `navigator.locks` if available) performs the proactive refresh.
- Implemented as a framework-agnostic `IdleMonitor` class (pure logic + injectable clock, fully unit tested) and a `useIdleTimeout` hook / `<SessionGuard>` component that wires it to Redux.

### 7A.4 Warning dialog (accessible by design)

- MUI `Dialog` with `role="alertdialog"`, title "Bridge console idle", text "For your security you'll be signed out in 0:45. Your application draft will be saved."
- Countdown displayed every second visually, but announced to screen readers only at 60, 30, 10 s via a polite live region (no per-second chatter).
- Buttons: **"Stay signed in"** (initial focus; refreshes the token and resets idle) and **"Sign out now"**. `Esc` = stay signed in. Typing elsewhere does not dismiss it silently; the user must act.
- Meets WCAG 2.2 **SC 2.2.1 Timing Adjustable** (warning ≥ 20 s with a simple action to extend) and the spirit of **SC 2.2.6 Timeouts** (tells users about the timeout and that data is preserved). Document this in the a11y audit.
- After an idle sign-out, the user lands on `/sign-in?redirect=…&reason=idle` with a non-alarming message ("Signed out after 5 minutes of inactivity. Your draft is saved."), focus on the heading. Reasons `idle`, `expired`, `absolute`, `signed-out-elsewhere` each get their own message.

### 7A.5 Visible in the Ops Console

New **Security** tab: access-token time remaining, session absolute time remaining, idle time remaining, refresh count, last 20 auth events (login, refresh, 401-replay, idle warning, sign-out with reason), and demo buttons: **Expire access token now** (next request shows the silent 401 → refresh → replay in the Comms tab), **Revoke session server-side** (next refresh fails → sign-out), **Trigger idle warning now**, and the demo timing switch.

---

## 8. Ops Console (performance dashboard, bottom-right corner)

A collapsible floating panel styled as a ship's ops console. Lazy-loaded; toggled by a button and the keyboard shortcut `Ctrl/Cmd + .`. It must not hurt the metrics it reports (render it in a portal, throttle updates to ~4/s, virtualize the log).

Tabs:

1. **Comms (API)** — live table: time, method, endpoint, status, duration (ms), cache hit, size. Summary: total calls, cache hit rate, p50/p95 latency, error count. Small sparkline of latency.
2. **Vitals** — LCP, INP, CLS, TTFB, FCP from `web-vitals`, color-coded against Google thresholds; per-route transition times (measured from navigation start to route content ready).
3. **Systems** — JS chunks loaded (from `PerformanceObserver` resource entries) with sizes, Redux action count, persisted state size, React render count of the wizard (via `React.Profiler`), memory if `performance.memory` exists.
4. **Red Alert (network simulation)** — controls that change MSW behavior live:
   - Latency slider (0–3000 ms)
   - Error injection rate (0–50%)
   - "Subspace interference" (offline mode: all requests fail)
     This is the demo that proves error handling: spinners, retries with backoff, retry buttons, and graceful messages appear everywhere.
5. **Security** — session/token/idle timers, auth event log, and the demo controls described in §7A.5.

Minimized state shows a tiny status pill (e.g. "12 calls · p95 140ms · LCP 1.1s").

---

## 9. Mock API (MSW)

All handlers in `src/mocks/handlers/`, with realistic default latency (100–400 ms random, overridable by the Red Alert controls). Data in `src/mocks/data/`.

| Endpoint                                 | Purpose                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/states`                        | 50 states + DC (`{ code, name }`)                                                                                           |
| `GET /api/states/:code/counties`         | Returns 254 Texas counties for `TX`; 404 for others. Source the list from public U.S. Census Bureau data and store as JSON  |
| `POST /api/address/standardize`          | USPS-style normalization (see §6.1)                                                                                         |
| `GET /api/divisions`                     | Division + track metadata                                                                                                   |
| `GET /api/divisions/:id/requirements`    | Option lists and numeric limits for Step 3                                                                                  |
| `GET /api/licenses/:id`                  | Async license validation                                                                                                    |
| `GET /api/advisors?track=&q=`            | Server-side advisor search for §6.3A #8 (returns capacity flag)                                                             |
| `POST /api/applications`                 | Returns `cadetId`, `permitId`, `stardate`, `clearanceLevel`; honors `Idempotency-Key`                                       |
| `GET /api/permits/:id`                   | Verification lookup (public; includes approval status)                                                                      |
| `POST /api/auth/login`                   | Demo accounts only; returns access token (5 min) + session id; 401 on bad credentials, 429 + `Retry-After` after 5 failures |
| `POST /api/auth/refresh`                 | Exchanges session id for a new access token; 401 if revoked or past absolute lifetime                                       |
| `POST /api/auth/logout`                  | Revokes the session                                                                                                         |
| `GET /api/auth/me`                       | Current user + roles (used to restore auth on page reload)                                                                  |
| `GET /api/admissions/applications`       | Officer only (403 for cadets); paginated, filterable by division/status                                                     |
| `PATCH /api/admissions/applications/:id` | Officer only; approve / deny / request info                                                                                 |

All protected handlers validate the bearer token and role, returning real `401`/`403` codes so the client logic is exercised honestly. Mock sessions and submitted applications persist in IndexedDB so the officer can review a cadet's application submitted earlier in the same browser.

MSW must run in the production build (service worker in `public/`), with a small "Simulated backend" badge in the Ops Console. Share handlers with Vitest (`msw/node`), Storybook (msw-storybook-addon), and Playwright.

---

## 10. Accessibility (target WCAG 2.2 AA)

- Semantic landmarks, one `h1` per page, skip-to-content link.
- Wizard: on step change, move focus to the step heading; announce step changes via a polite live region.
- Every input has a visible label; disabled fields explain _why_ via helper text (e.g. "Select Texas to enable") linked with `aria-describedby`.
- Error summary pattern on submit; inline errors use `aria-invalid` + `aria-describedby`.
- Full keyboard operation, including division cards, Autocomplete, dialogs (focus trap and return), and the Ops Console.
- `prefers-reduced-motion` respected; no information conveyed by color alone (division cards also carry icons/text).
- Automated: `eslint-plugin-jsx-a11y`, Storybook a11y addon, axe in Playwright on every route in both themes. Target Lighthouse a11y = 100.
- Manual check before each release: keyboard-only pass plus a screen-reader pass (VoiceOver + Safari, NVDA + Firefox) on one full wizard path. Record findings in `docs/a11y-audit.md`; an employer-visible audit log is itself a senior signal.
- Target sizes ≥ 24×24 CSS px (WCAG 2.2 SC 2.5.8); visible focus never hidden by the sticky nav or the Ops Console (SC 2.4.11); no drag-only interactions (SC 2.5.7).
- Text resizes to 200% and reflows at 320 px width without horizontal scroll or lost content (SC 1.4.4 / 1.4.10).

### 10.1 MUI-specific accessibility rules

MUI is accessible by default only when used correctly. Enforce these in the shared components so individual steps can't get them wrong:

| Component                                        | Rule                                                                                                                                                                                                                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TextField`                                      | Always pass `label` (never placeholder-only). Pass `id` so MUI wires `<label for>`, `aria-describedby` to `helperText` and `aria-invalid` from `error`. Required fields use `required` (sets `aria-required`) plus a visible "required" legend at the top of the form             |
| `Select`                                         | Prefer `TextField select` (gets label wiring for free). If using bare `Select`, pair it with `InputLabel` via `labelId` + `id`                                                                                                                                                    |
| `Autocomplete` (County, vessel classes, species) | Render a labeled `TextField` in `renderInput`; set `loading` + `loadingText` and `noOptionsText` from i18n; for async options announce result count via a polite live region; keep `disabled` (not `readOnly`) for the County-before-Texas state so it's announced as unavailable |
| Disabled fields                                  | Don't put a `Tooltip` on a disabled control (it can't receive focus, so keyboard users never see it). Explain the reason in `helperText` instead                                                                                                                                  |
| `RadioGroup` (division cards)                    | Build cards as `FormControlLabel` + `Radio` inside a `RadioGroup` within `FormControl component="fieldset"` with a `FormLabel component="legend"`, so arrow keys and group semantics work. Do not use clickable `Card`s with `onClick`                                            |
| `Checkbox` / `Switch`                            | Always wrapped in `FormControlLabel`; the TOS/TNG toggle is a `Switch` with an accessible name ("Interface era: TNG") and `aria-checked` state                                                                                                                                    |
| `Slider` (weapons level)                         | Provide `aria-label` or `aria-labelledby`, `getAriaValueText` (e.g. "Level 4 of 5"), and `marks` with labels; also accept a numeric input alternative                                                                                                                             |
| `Dialog` (address suggestion, confirms)          | `aria-labelledby` → `DialogTitle` id, `aria-describedby` → `DialogContent` id; leave MUI's focus trap on; initial focus on the least destructive action; focus returns to the trigger on close                                                                                    |
| `Stepper`                                        | Use `nonLinear` with `StepButton` only for completed steps; mark the current step `aria-current="step"`; step labels include status for screen readers ("Identity, completed")                                                                                                    |
| `Snackbar` / `Alert` (toasts)                    | Status messages use `role="status"`; errors use `role="alert"`; no auto-hide for errors; auto-hide ≥ 6 s and paused on hover/focus for others                                                                                                                                     |
| `Tabs` (Ops Console)                             | Use MUI `Tabs`/`Tab` with matching `id` / `aria-controls` and `role="tabpanel"` panels; arrow-key navigation                                                                                                                                                                      |
| `IconButton`                                     | Every icon-only button gets `aria-label` (from i18n); decorative icons get `aria-hidden`                                                                                                                                                                                          |
| `Table` (API log)                                | Real `<table>` semantics with `<caption>` (can be visually hidden via `visuallyHidden` from `@mui/utils`) and `scope="col"` headers; virtualization must keep header semantics                                                                                                    |
| `Link` vs `Button`                               | Navigation uses MUI `Link` with `component={RouterLink}`; actions use `Button`. Never a `Button` that navigates without `component={RouterLink}`                                                                                                                                  |

**Theme-level a11y (in `createEraTheme.ts`):**

- Set a strong global `:focus-visible` outline in `MuiCssBaseline` and every interactive component override; never remove MUI's focus ring without replacing it. Focus color is a semantic token with ≥ 3:1 contrast against both era backgrounds.
- `palette.contrastThreshold: 4.5` and a token test (`src/theme/contrast.test.ts`) that computes contrast for every foreground/background token pair in both eras and fails CI below 4.5:1 (text) or 3:1 (UI components, focus indicators).
- `transitions` durations set to 0 and `disableRipple` respected when `prefers-reduced-motion: reduce` matches (`useMediaQuery` in the theme provider).
- Typography uses `rem` units (`htmlFontSize` default) so browser zoom and font-size settings work; condensed uppercase era fonts are for headings/labels only, body stays in Inter at ≥ 16 px.
- Uppercase styling done with CSS `text-transform`, never by writing copy in caps (screen readers may spell out all-caps words).

---

## 11. Internationalization

- `react-i18next`, namespaces per feature, lazy-loaded locale bundles.
- Locales: **English** (default) and **Spanish** (real translations; relevant for an Austin/Texas audience).
- **Pseudo-locale** (`en-XA`: accented, ~35% longer strings, bracketed) available in dev and from the Ops Console to prove layouts survive text expansion.
- Optional easter egg: a third "Klingon" locale covering only the landing page and nav, written with original phrasing. Low priority — skip if time is short.
- Dates, numbers and the stardate formatted with `Intl`. Validation messages come from i18n keys (`yup.setLocale` returns keys + params; components translate them).
- Locale switcher in nav; persisted in `ui.locale`; sets `<html lang>`.

---

## 12. Design system and Storybook

- Components in `src/components/` built on MUI with theme overrides: `PanelFrame` (era-specific frame shape), `ConsoleButton`, `DivisionCard`, `StatusPill`, `FieldRenderer` variants, `ErrorSummary`, `AddressDiffDialog`, `Stepper`, `MetricTile`, `Sparkline`.
- Storybook: stories for every shared component in **both eras** (global toolbar toggle for era + locale), docs page for tokens (color swatches, type scale, spacing), interaction tests (`play` functions) for the County/Texas behavior and the error summary, a11y addon on.
- Publish Storybook with the site at `/storybook` and link it from `/ships-systems`.

---

## 13. Testing and CI

**Unit (Vitest):** rules engine (every `enabledWhen`/`requiredWhen`), Yup schemas per track (incl. `.when()` branches, `$context` rules, `lazy` track switching, cross-field `.test()`s), address standardizer, stardate, permit encode/decode, persistence migrations, selectors. Coverage threshold 85% on `src/features/**` and `src/lib/**`.

**Component (RTL + MSW):**

- County field is disabled until Texas is selected, then enabled, loads 254 counties, becomes required; switching away clears and disables it.
- Division change resets Step 3 after confirm.
- Each track's conditional field appears/disappears and validates.
- Dynamic options (§6.3A): home-world switch strips the inactive address variant; emergency contact stays in sync while "same as mailing" is checked; language rows disable duplicates; start terms disabled for past deadlines and underage start (fixed clock); travel options follow the address; era toggle removes incompatible ship classes with undo; advisor search debounces and cancels stale requests; electives enforce prerequisites, exclusions and the 18-credit budget; every disabled option exposes its reason to screen readers.
- Home: hero, metrics, skills and every accordion summary render without interaction; Comptroller role expanded by default; Expand/Collapse all; collapsed bullet text is still in the DOM; each role is an `h3`.
- Auth: `IdleMonitor` with fake timers (warning at the right moment, reset on activity, ignores mousemove, re-check on `visibilitychange` after a clock jump); single-flight refresh (5 concurrent 401s → exactly 1 refresh call, all 5 replayed); refresh failure signs out with reason `expired`; `redirect` param rejects absolute/external URLs; warning dialog focus and live-region announcements; loaders redirect unauthenticated and wrong-role users.
- Era toggle re-evaluates the TOS/Klingon waiver rule live.
- Error states when the API fails.
- Accessibility assertions with RTL role/name queries (`getByRole('combobox', { name: 'County (if in Texas)' })`), `toBeDisabled()` / `toHaveAccessibleDescription()` for the "Select Texas to enable" helper, focus moves to the error summary on failed submit, and dialog focus returns to its trigger. Run `vitest-axe` on each step in both eras.

**E2E (Playwright):** one full path per track (6 specs) through PDF download (assert file downloaded and non-empty), refresh-mid-wizard persistence, Red Alert error injection shows retry UI, keyboard-only run of one path, auth flows (anonymous Steps 1–3 → sign-in at submit → submission continues; cadet blocked from `/admissions`; officer approves and `/verify` shows "Approved"), idle timeout using Playwright's `page.clock` (warning appears, "Stay signed in" works, timeout signs out and restores the draft after re-login), cross-tab sign-out with two pages in one context, axe scan on every route in both eras.

**CI (GitHub Actions)**, on every PR:

1. Install with cache → lint → typecheck → unit/component tests with coverage
2. Build → `size-limit` (budget: initial JS ≤ 180 KB gzip; PDF chunk excluded from initial load)
3. Playwright (Chromium + WebKit) across the device projects in §5A, including visual regression snapshots
4. Lighthouse CI against the preview build — budgets: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95
5. Build Storybook
   Post bundle size and Lighthouse scores as a PR comment if feasible.

---

## 14. Build phases (do in order; each ends green in CI)

1. **Scaffold:** Vite + TS strict, ESLint/Prettier/husky, path aliases (`@/`), folder structure, CI skeleton, MSW wired, Storybook installed.
2. **Theme system + responsive shell:** tokens, breakpoints, both eras, toggle, fonts, original emblem SVG, mobile-first layout shell (nav with mobile drawer, footer disclaimer, skip link). Every later phase is built and checked at 390 px and 1440 px as it goes (§5A).
3. **Static pages:** `src/content/resume.ts`, Home with resume highlights (§4.1, incl. print stylesheet, SEO, JSON-LD, prerender), Personnel File (§16), Ships' Systems (placeholder sections), 404.
4. **Redux + RTK Query + persistence + telemetry middleware.**
   4b. **Auth + idle timeout** (§7A): mock auth endpoints, token store, `baseQueryWithReauth`, loaders/guards, sign-in page, `IdleMonitor` + warning dialog, cross-tab sync. The officer dashboard itself comes in Phase 8.
5. **Rules engine + schemas + FieldRenderer** with full unit tests.
6. **Wizard Steps 1–2** incl. County/Texas behavior, address standardization dialog, and §6.3A items 1–8.
7. **Step 3** all six tracks + era-aware rules + §6.3A items 9–10 (electives, era-only fields).
8. **Review + submit + Permit PDF + /verify + Admissions Officer dashboard** (list, filter, detail, approve/deny).
9. **Ops Console** (all four tabs, network simulation).
10. **i18n** (en, es, pseudo), full a11y audit against §10 and §10.1, reduced motion. (The §10.1 rules apply from Phase 2 onward; this phase is the verification pass, not the first time a11y is considered.)
11. **Testing completion:** E2E specs, coverage thresholds, Lighthouse/size budgets passing.
12. **Ships' Systems page content** (see §15) + README + ADRs + deploy.

---

## 15. "Ship's Systems" page (the engineer-facing case study)

Write this content from the real implementation, not placeholders:

- Architecture diagram (an inline SVG or Mermaid rendered at build) of store, RTK Query, MSW, rules engine, form renderer.
- Key decisions with short rationale (link to ADRs): schema-driven forms, RHF ↔ Redux boundary, MSW in production, token theming, lazy PDF, auth/session design.
- A sequence diagram of the 401 → single-flight refresh → replay flow, and a short "try it" box: sign in as Officer, open the Ops Console Security tab, press "Expire access token now", then watch the replay in the Comms tab.
- "How this maps to my experience": session and idle-timeout handling on public-facing state self-service apps (Comptroller).
- Live numbers: bundle sizes, Lighthouse scores, test counts and coverage (generated at build into a JSON the page reads).
- Links: GitHub repo, Storybook, CI badge.

ADRs to write (`docs/adr/0001-*.md`…): Vite over Next.js; RTK Query over React Query; schema-driven forms; RHF/Redux boundary; MSW as the backend; design tokens + CSS variables; @react-pdf/renderer choice; i18n approach; in-memory access token + simulated httpOnly refresh (and what production would do differently); idle timeout design (timestamps, cross-tab, accessibility of the warning).

---

## 16. Personnel File content (from resume)

Render as semantic HTML (not an image) and offer the original resume PDF for download (`public/Diego-Linz-Resume.pdf` — owner will supply the file).

- **Diego Linz** — Senior Frontend Engineer | React.js, TypeScript, Redux, MUI — Austin, TX
- Contact: email `Linzdiegoa@gmail.com` (render with a click-to-reveal or `mailto:` assembled at runtime to reduce scraping). Phone: **do not display unless the owner confirms** (config flag `SHOW_PHONE=false`).
- Summary: 8 years modernizing legacy applications, building secure self-service web products, delivering production systems serving up to 17M users in an agency responsible for $160B+ in annual state revenue.
- **Texas Comptroller of Public Accounts** — Senior Software Developer (Front-End / React.js), Jun 2022–Present: modernized legacy Java apps with React, Redux, MUI, Vite, React Hook Form; self-service interfaces replacing paper/phone processes; public apps serving up to 17M users; reliability improved from 95% to 100% uptime; cross-functional API contract and requirements work; front-end styling standards; led team adoption of AI tools.
- **The University of Texas at Austin** — Software Developer Analyst (Full-Stack / Django), Jul 2018–Jun 2022: Django apps for medical student administration, athletics and financial aid; CARES Act aid application system under tight deadlines; mentored training-to-hire developers.
- **Facebook (via Core Techs)** — Ads Risk Analyst, Sep 2015–Sep 2017: raised team accuracy 87% → 95%; SME on malicious ads policy; built QA answer keys and review standards.
- **Education:** B.A. Economics, UT Austin, Dec 2013.
- **Skills:** JavaScript, TypeScript, Python, SQL, HTML5, CSS3; React, Redux, MUI, Vite, React Hook Form; REST, Django, Oracle, MuleSoft, Natural; Git, npm, Jira, Agile, code review, unit testing.
- A small "How this site maps to my experience" callout: schema-driven policy rules (↔ translating policy-driven rules at the Comptroller), address standardization and Texas counties (↔ state-government self-service forms), Ops Console (↔ reliability work).

---

## 17. Suggested folder structure

```
src/
  app/            store.ts, hooks.ts, router.tsx, providers.tsx
  theme/          tokens.ts, semantic.ts, createEraTheme.ts, fonts.css
  components/     shared UI (+ *.stories.tsx, *.test.tsx colocated)
  features/
    application/  config/, rules/, schemas/, steps/, applicationSlice.ts
    auth/         authSlice.ts, tokenStore.ts, baseQueryWithReauth.ts, IdleMonitor.ts, useIdleTimeout.ts,
                  SessionGuard.tsx, IdleWarningDialog.tsx, SignInPage.tsx, loaders.ts (requireAuth/requireRole), crossTab.ts
    admissions/   AdmissionsListPage.tsx, ApplicationDetailPage.tsx
    ops-console/  tabs/, telemetrySlice.ts, telemetryMiddleware.ts
    permit/       PermitDocument.tsx (lazy), encode.ts, VerifyPage.tsx
    home/         HomePage.tsx, Hero.tsx, ImpactMetrics.tsx, SkillsAtAGlance.tsx, ExperienceAccordion.tsx
    personnel/    PersonnelFilePage.tsx
    systems/      ShipsSystemsPage.tsx
  services/       api.ts (RTK Query createApi)
  mocks/          browser.ts, server.ts, handlers/, data/ (states.json, tx-counties.json)
  i18n/           index.ts, locales/en/, locales/es/, pseudo.ts
  content/        resume.ts (single source of truth for all resume text)
  lib/            stardate.ts, address.ts, phone.ts, persistence.ts
e2e/              Playwright specs
docs/adr/
.github/workflows/ci.yml
```

---

## 18. Definition of done

- Home page meets §4.1: name, title, contact, resume download, metrics and skills visible without clicking or waiting on desktop and phone; print view is a clean resume; Lighthouse on `/` ≥ 95 performance and 100 accessibility/SEO.
- All six tracks completable end-to-end in both eras and both locales, producing a correct PDF.
- All ten dynamic-option patterns in §6.3A work and are unit/component tested; all form validation uses RHF + Yup (`yupResolver`), no Zod in the dependency tree.
- Every route is fully usable at 320 px, 390 px, 810 px and 1440 px with no horizontal scroll; Playwright device projects and visual snapshots pass.
- Auth works as in §7A: role-guarded routes with no flash of protected content, silent single-flight token refresh visible in the Ops Console, idle warning and timeout (including cross-tab and after sleep), draft preserved across idle sign-out, officer approval reflected on `/verify`.
- County (if in Texas) behavior exactly as specified in §6.1.
- Ops Console shows live API, vitals and chunk data; network simulation visibly exercises error/retry UI.
- CI green: lint, types, tests (coverage met), size budget, Playwright + axe, Lighthouse budgets.
- Storybook published; README explains how to run, test, and the architecture, with screenshots/GIF of both eras.
- No official Star Trek logos/assets; disclaimer present on every page.
- Every rule in §10.1 holds; zero axe violations in both eras and both locales; manual keyboard + screen-reader audit recorded in `docs/a11y-audit.md`.
- All UI built from MUI components and theme overrides (no second component library).

## 19. Open items for the owner (don't block on these; use defaults)

- Domain name and host (default: Vercel, `*.vercel.app` until a domain is chosen).
- Whether to show phone number publicly (default: hidden).
- Resume PDF file to place in `public/`.
- GitHub repo URL for links and badges.
- LinkedIn URL and availability wording for the home hero (default: "Open to senior frontend roles").
