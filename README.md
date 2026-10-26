# Diego Linz · Senior Frontend Engineer

Personal portfolio for recruiters and engineers, themed as a fan-made Starfleet Academy
application. The resume comes first; the theme frames it.

**Stack:** Vite, React 19, TypeScript (strict), MUI, Redux Toolkit, React Router, React Hook Form +
Yup, MSW, Vitest + Testing Library, Storybook.

The full build spec is in [docs/HANDOFF.md](docs/HANDOFF.md). Decisions the spec left open are
recorded in [docs/adr](docs/adr).

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
npm test               # unit and component tests
npm run lint && npm run typecheck
npm run build          # browser build + prerendered / and /personnel-file
npm run preview        # serve the production build
npm run storybook      # component library on http://localhost:6006
```

## Where things live

| Path                                            | What                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| `src/content/resume.ts`                         | The single source for all resume text                                     |
| `src/content/site.ts`                           | Owner settings: LinkedIn/GitHub URLs, availability line, phone visibility |
| `src/theme/`                                    | Tokens, per-era meanings, MUI theme builder, contrast test                |
| `src/features/home/`                            | Recruiter-first home page                                                 |
| `src/features/personnel/`                       | Full resume page                                                          |
| `src/entry-server.tsx`, `scripts/prerender.mjs` | Build-time prerendering                                                   |
| `src/mocks/`                                    | Simulated backend (MSW)                                                   |

## Progress

Built phase by phase, following §14 of the spec.

- [x] 1. Scaffold: Vite, strict TypeScript, ESLint (with jsx-a11y), Prettier, husky, MSW, Storybook, CI
- [x] 2. Theme system and responsive shell: two eras, toggle, original emblem, nav drawer, disclaimer
- [x] 3. Static pages: home, resume, case-study placeholder, 404, print styles, SEO, prerendering
- [ ] 4. Redux API layer, persistence, telemetry
- [ ] 4b. Sign-in and idle timeout
- [ ] 5–8. Form rules engine, application wizard, PDF permit, admissions dashboard
- [ ] 9–12. Ops Console, i18n, end-to-end tests, case-study content, deploy

## Owner to-dos

- When the resume changes, replace `public/Diego-Linz-Resume.pdf` and update
  `src/content/resume.ts` to match.
- Fill in `linkedInUrl`, `githubUrl` and `repoUrl` in `src/content/site.ts`; their buttons stay
  hidden until set.
- Set `VITE_SITE_URL` at build time once the domain is chosen (used for canonical and preview-card URLs).

## Disclaimer

A fan-made portfolio project. Not affiliated with or endorsed by Paramount or CBS Studios. Star
Trek and related marks are property of their owners.
