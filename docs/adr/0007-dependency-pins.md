# 7. Two deliberate version pins

**Status:** accepted; revisit when the upstream packages update

- **ESLint 9, not 10.** `eslint-plugin-jsx-a11y` (required for accessibility linting) declares
  support only up to ESLint 9.
- **`@hookform/resolvers` 5, not 6.** Version 6 pulls an optional peer chain that conflicts on
  `effect`. We only use the Yup resolver, which v5 supports fully.

We pinned rather than forcing installs with `--legacy-peer-deps`, so npm still checks the rest of
the dependency tree.
