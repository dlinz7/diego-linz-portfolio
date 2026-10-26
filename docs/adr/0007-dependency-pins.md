# 7. Deliberate dependency pins

**Status:** accepted; revisit when the upstream packages update

- **ESLint 9, not 10.** `eslint-plugin-jsx-a11y` (required for accessibility linting) declares
  support only up to ESLint 9.
- **`@hookform/resolvers` 5, not 6.** Version 6 pulls an optional peer chain that conflicts on
  `effect`. We only use the Yup resolver, which v5 supports fully.

- **`@emnapi/core` and `@emnapi/runtime` listed as dev dependencies.** They are peer dependencies
  of an optional WebAssembly fallback in the Vite/Oxc toolchain. A lockfile written on Windows
  leaves them out, and `npm ci` on Linux CI then fails. Listing them makes every platform agree.
  Safe to remove once npm records them on its own.

We pinned rather than forcing installs with `--legacy-peer-deps`, so npm still checks the rest of
the dependency tree.
