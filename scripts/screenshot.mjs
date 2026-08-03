import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = 'temporary-screenshots';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
];

function getRoute() {
  return process.argv[2] || '/';
}

function buildUrl(route) {
  return new URL(route, BASE_URL).toString();
}

function slugFromRoute(route) {
  if (route === '/' || route === '') return 'home';
  return route.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
}

async function isServerAvailable(url) {
  try {
    await fetch(url, { signal: AbortSignal.timeout(5000) });
    return true;
  } catch {
    return false;
  }
}

function ensureOutputDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

async function screenshotViewport(browser, url, viewport, outputPath) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: viewport.width, height: viewport.height });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outputPath, fullPage: true });
  } finally {
    await page.close();
  }
}

async function main() {
  const route = getRoute();
  const url = buildUrl(route);

  if (!(await isServerAvailable(url))) {
    console.error(`Dev server is not reachable at ${url}.`);
    console.error('Start it first (npm run dev) and try again.');
    process.exit(1);
  }

  ensureOutputDir(OUTPUT_DIR);
  const slug = slugFromRoute(route);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const createdFiles = [];
  try {
    for (const viewport of VIEWPORTS) {
      const outputPath = path.join(OUTPUT_DIR, `${slug}-${viewport.name}.png`);
      await screenshotViewport(browser, url, viewport, outputPath);
      createdFiles.push(outputPath);
    }
  } finally {
    await browser.close();
  }

  for (const file of createdFiles) {
    console.log(`✓ ${file}`);
  }
}

main().catch((error) => {
  console.error('Screenshot failed:', error.message);
  process.exit(1);
});
