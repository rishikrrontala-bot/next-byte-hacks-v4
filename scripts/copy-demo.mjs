import { copyFile } from 'node:fs/promises';
for (const name of ['demo.mp4', 'demo.vtt']) {
  await copyFile(new URL(`../submission/video/${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}
