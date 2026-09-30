import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.env.SIGHTLINE_URL || 'http://127.0.0.1:5173/';
const raw = new URL('../../gallery-raw/', import.meta.url).pathname;
await mkdir(raw, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1500, height: 900 }, deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: '.skip-link{display:none!important}' });
await page.waitForTimeout(650);
await page.screenshot({ path: `${raw}/hero.png` });

await page.locator('#experiment').scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.locator('.simulator').screenshot({ path: `${raw}/simulator-default.png` });
await page.getByRole('button', { name: 'More room' }).click();
await page.waitForTimeout(500);
await page.locator('.simulator').screenshot({ path: `${raw}/simulator-safer.png` });

await page.locator('#method').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator('#method').screenshot({ path: `${raw}/method.png` });
await page.locator('#evidence').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator('#evidence').screenshot({ path: `${raw}/evidence.png` });

await browser.close();
console.log(`Raw captures saved to ${raw}`);
