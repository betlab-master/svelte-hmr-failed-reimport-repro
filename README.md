# Svelte: HMR accept callback throws when Vite passes `undefined`

When the browser fails to re-import an updated component, Vite's client logs a warning and still calls
the accept callback, with `undefined` in place of the module (`ModuleNamespace | undefined` in
`vite/types/hot.d.ts`). The callback that Svelte generates reads `module.default` without a check,
so every such failure also throws an unhandled `TypeError`.

In a real project this happens when a component is saved and deleted a few milliseconds later
(the `?t=` re-import 404s). This repro makes the re-import fail deterministically with a small
middleware in `vite.config.js`.

## Steps

```sh
npm install
npm run dev          # open the page, keep the browser console open
npm run steps        # in a second terminal: edits src/App.svelte, then restores it
```

**Expected:** only Vite's warning, `[vite] Failed to reload /src/App.svelte. This could be due to syntax errors or importing non-existent modules. (see errors above)`.

**Actual:** the warning, followed by
`Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'default')`.
