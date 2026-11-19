import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Makes the HMR re-import of App.svelte fail, as it does when the file is deleted
// right after it was saved (the browser's `App.svelte?t=...` request then 404s).
const failHmrReimport = {
  name: 'fail-hmr-reimport',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (/^\/src\/App\.svelte\?(.*&)?t=\d+/.test(req.url ?? '')) {
        res.statusCode = 404;
        res.end();
        return;
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [svelte(), failHmrReimport],
});
