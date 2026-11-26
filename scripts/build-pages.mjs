import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';
const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, PAGES_BUILD: '1', NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? '/mndw' },
});
if (result.status !== 0) process.exit(result.status ?? 1);
// The development preview and its illustration are never published.
rmSync('out/preview', { recursive: true, force: true });
rmSync('out/preview-screen.svg', { force: true });

rmSync('out/services/_unpublished', { recursive: true, force: true });
