import { chromium } from '@playwright/test';
import { mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const mode = process.argv.includes('--discover') ? 'discover' : process.argv.includes('--rehearse') ? 'rehearse' : process.argv.includes('--smoke') ? 'smoke' : 'record';
const base = process.env.SIGHTLINE_URL || 'http://127.0.0.1:5173/';
const out = resolve('../demo-recording');
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  ...(['record', 'smoke'].includes(mode) ? { recordVideo: { dir: out, size: { width: 1600, height: 900 } } } : {}),
});
const page = await context.newPage();
const t0 = Date.now();
const elapsed = () => ((Date.now() - t0) / 1000).toFixed(1);
const holdUntil = async (sec) => { const remaining = sec * 1000 - (Date.now() - t0); if (remaining > 0) await page.waitForTimeout(remaining); };

async function caption(text) {
  await page.evaluate((value) => { const node = document.getElementById('demo-caption'); if (node) node.textContent = value; }, text);
}

async function injectOverlay() {
  await page.addStyleTag({ content: `.skip-link{display:none!important}#demo-cursor{position:fixed;z-index:2147483647;left:0;top:0;pointer-events:none;width:26px;height:26px;filter:drop-shadow(1px 2px 3px #0008);transition:left .09s linear,top .09s linear}#demo-caption{position:fixed;z-index:2147483646;bottom:24px;left:50%;transform:translateX(-50%);min-width:560px;max-width:1080px;padding:14px 28px;background:#171A19e8;border:1px solid #F4F1EA44;color:#F4F1EA;font:600 20px/1.25 Arial,sans-serif;text-align:center;pointer-events:none;box-shadow:0 12px 36px #0004}#demo-badge{position:fixed;z-index:2147483646;top:24px;right:28px;padding:8px 11px;background:#171A19df;color:#F4F1EA;font:700 12px Arial,sans-serif;letter-spacing:.2em;pointer-events:none}` });
  await page.evaluate(() => {
    const cursor = document.createElement('div'); cursor.id = 'demo-cursor'; cursor.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M3 2L20 14L12 15L9 23L3 2Z" fill="#F4F1EA" stroke="#171A19" stroke-width="2" stroke-linejoin="round"/></svg>'; document.body.append(cursor);
    document.addEventListener('mousemove', (event) => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; });
    const bar = document.createElement('div'); bar.id = 'demo-caption'; document.body.append(bar);
  });
}

async function moveAndClick(locator, label) {
  if (!await locator.isVisible()) throw new Error(`${label} is not visible`);
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error(`${label} has no bounding box`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 16 });
  await page.waitForTimeout(280);
  await locator.click();
  console.log(`${elapsed()}s clicked ${label}`);
}

async function setRange(locator, target, label) {
  const current = Number(await locator.inputValue());
  if (!await locator.isVisible()) throw new Error(`${label} is not visible`);
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
  await locator.focus();
  const key = target < current ? 'ArrowLeft' : 'ArrowRight';
  for (let value = current; value !== target; value += target < current ? -1 : 1) { await locator.press(key); await page.waitForTimeout(75); }
  const actual = Number(await locator.inputValue());
  if (actual !== target) throw new Error(`${label}: expected ${target}, got ${actual}`);
  console.log(`${elapsed()}s changed ${label} ${current} to ${actual}`);
}

async function scrollTo(selector) {
  await page.locator(selector).first().evaluate((element) => element.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(1100);
}

try {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.locator('.simulator').evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(400);
  const selectors = {
    moreRoom: page.getByRole('button', { name: 'More room' }),
    reset: page.getByRole('button', { name: 'Reset' }),
    run: page.getByRole('link', { name: 'Run the crossing' }),
    speed: page.locator('#speed'),
    setback: page.locator('#setback'),
    result: page.getByTestId('result'),
    hero: page.locator('#top'),
    method: page.locator('#method'),
    evidence: page.locator('#evidence'),
  };

  if (mode === 'discover') {
    const map = await page.evaluate(() => [...document.querySelectorAll('button,input,a[href^="#"]')].filter((el) => el.getBoundingClientRect().width > 0).map((el) => ({ tag: el.tagName, id: el.id, type: el.type || '', text: el.textContent?.trim().slice(0, 45) || '', min: el.min || '', max: el.max || '', value: el.value || '' })));
    console.log(JSON.stringify(map, null, 2));
  } else if (mode === 'rehearse') {
    for (const [name, locator] of Object.entries(selectors)) {
      if (await locator.count() !== 1) throw new Error(`REHEARSAL FAIL ${name}: count ${await locator.count()}`);
      await locator.scrollIntoViewIfNeeded();
      if (!await locator.isVisible()) throw new Error(`REHEARSAL FAIL ${name}: hidden`);
      console.log(`REHEARSAL OK ${name}`);
    }
    await scrollTo('#experiment');
    await moveAndClick(selectors.moreRoom, 'More room');
    if (!await selectors.result.textContent().then((text) => text.includes('19.7'))) throw new Error('REHEARSAL FAIL safe result');
    await moveAndClick(selectors.reset, 'Reset');
    if (!await selectors.result.textContent().then((text) => text.includes('31.5'))) throw new Error('REHEARSAL FAIL default result');
    await setRange(selectors.speed, 15, 'speed');
    if (!await selectors.result.textContent().then((text) => text.includes('8.6'))) throw new Error('REHEARSAL FAIL speed result');
    await setRange(selectors.setback, 35, 'setback');
    if (!await selectors.result.textContent().then((text) => text.includes('19.7'))) throw new Error('REHEARSAL FAIL setback result');
    console.log('REHEARSAL PASSED');
  } else if (mode === 'smoke') {
    await injectOverlay();
    await caption('CAPTION TEST — BOTTOM OF VIEWPORT');
    console.log(await page.evaluate(() => ({ innerHeight, outerHeight, innerWidth, outerWidth, dpr: devicePixelRatio })));
    await page.waitForTimeout(3000);
  } else {
    await injectOverlay();
    await caption('31.5 m short  ·  The person appears too late in this model');
    await holdUntil(4);
    await moveAndClick(selectors.moreRoom, 'More room');
    await caption('19.7 m remaining  ·  A slower, clearer approach');
    await holdUntil(10);

    await caption('The crossing is marked. The person may be hidden.');
    await scrollTo('#top');
    await holdUntil(22);

    await moveAndClick(selectors.run, 'Run the crossing');
    await caption('One driver  ·  One pedestrian  ·  One obstruction');
    await moveAndClick(selectors.reset, 'Reset');
    await scrollTo('.simulator');
    await holdUntil(34);

    await caption('Reduce approach speed: 25 → 15 mph');
    await setRange(selectors.speed, 15, 'speed');
    await caption('The view stays 14.8 m. The shortfall falls to 8.6 m.');
    await holdUntil(49);

    await caption('Move the van back: 12 → 35 m');
    await setRange(selectors.setback, 35, 'setback');
    await caption('43.1 m of view  ·  23.4 m to stop  ·  19.7 m remaining');
    await holdUntil(64);

    await caption('The sightline and stopping trace come from one calculation.');
    const street = page.locator('.street-scene');
    const streetBox = await street.boundingBox();
    if (streetBox) await page.mouse.move(streetBox.x + streetBox.width * .6, streetBox.y + streetBox.height * .45, { steps: 20 });
    await holdUntil(77);

    await caption('Three distances, shown separately.');
    await scrollTo('#method');
    await holdUntil(82);
    await scrollTo('.method-steps article:nth-child(2)');
    await holdUntil(86);
    await scrollTo('.method-steps article:nth-child(3)');
    await holdUntil(90);

    await caption('FHWA design assumptions: 2.5 s reaction; 3.4 m/s² deceleration.');
    await scrollTo('#evidence');
    await holdUntil(102);

    await caption('Educational model  ·  No field validation or user study');
    await holdUntil(110);
    console.log(`RECORD complete in ${elapsed()}s`);
  }
} finally {
  await context.close();
  if (['record', 'smoke'].includes(mode)) {
    const video = page.video();
    if (video) { const source = await video.path(); const name = mode === 'smoke' ? 'smoke' : 'demo-raw'; await copyFile(source, `${out}/${name}.webm`); console.log(`Raw recording: ${out}/${name}.webm`); }
  }
  await browser.close();
}
