// Edits src/App.svelte once, then restores it. Keep the page open with the console visible.
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'src/App.svelte';
const original = readFileSync(file, 'utf8');
console.log('edit src/App.svelte (v2)');
writeFileSync(file, original.replace('App v1', 'App v2'));
await new Promise((r) => setTimeout(r, 1500));
writeFileSync(file, original);
