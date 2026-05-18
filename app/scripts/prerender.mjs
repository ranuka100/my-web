/**
 * Post-build static prerender for SEO (meta tags + JSON-LD in initial HTML).
 *
 * Run automatically after `vite build` (see package.json postbuild).
 * Skip locally: SKIP_PRERENDER=1 npm run build
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSiteRoutes } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, '..');
const distDir = join(appRoot, 'dist');
const PORT = Number(process.env.PRERENDER_PORT) || 4173;
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function routeToOutFile(route) {
  if (route === '/') return join(distDir, 'index.html');
  return join(distDir, route.slice(1), 'index.html');
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* server not ready */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview server did not start at ${url}`);
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      'npx',
      ['vite', 'preview', '--port', String(PORT), '--host', HOST, '--strictPort'],
      { cwd: appRoot, shell: true, stdio: 'pipe', env: { ...process.env, BROWSER: 'none' } }
    );

    let stderr = '';
    proc.stderr?.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (code !== null && code !== 0) {
        reject(new Error(`vite preview exited with code ${code}\n${stderr}`));
      }
    });

    resolve(proc);
  });
}

async function prerenderRoute(page, route) {
  const url = route === '/' ? `${BASE}/` : `${BASE}${route}`;
  await page.goto(url, { waitUntil: 'load', timeout: 120_000 });

  await page.waitForFunction(
    () => {
      const desc = document.querySelector('meta[name="description"]');
      const jsonLd = document.querySelector('script[type="application/ld+json"]');
      return (
        desc?.getAttribute('content')?.length > 10 &&
        document.title?.length > 5 &&
        jsonLd?.textContent?.length > 10
      );
    },
    { timeout: 45_000 }
  );

  await new Promise((r) => setTimeout(r, 400));

  const html = await page.content();
  const outFile = routeToOutFile(route);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html, 'utf8');
  return outFile;
}

async function main() {
  if (process.env.SKIP_PRERENDER === '1') {
    console.log('SKIP_PRERENDER=1 — skipping prerender.');
    return;
  }

  const routes = getSiteRoutes();
  console.log(`Prerendering ${routes.length} routes…`);

  const preview = await startPreview();
  await waitForServer(BASE);

  let browser;
  try {
    const puppeteer = await import('puppeteer');
    browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    for (const route of routes) {
      const out = await prerenderRoute(page, route);
      console.log(`  ${route} → ${out.replace(distDir, '')}`);
    }

    console.log('Prerender complete.');
  } finally {
    await browser?.close().catch(() => {});
    preview.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err.message);
  process.exit(1);
});
