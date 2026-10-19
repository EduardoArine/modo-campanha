// Imagem de compartilhamento (og:image, D-085): renderiza og-image.html (1200 × 630) em pt-BR e en
// com o Chrome headless (DevTools Protocol, sem dependências) e grava em public/.
//
// Uso (na raiz do repositório): node design/source/brand/og/render-og.mjs
// Prévia fora do public/: variável OG_OUT com a pasta de saída.
// Chrome: caminho padrão do Windows/macOS/Linux, ou a variável CHROME.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const LOCALES = ['pt-BR', 'en'];
const TEMPLATE = pathToFileURL(path.resolve('design/source/brand/og/og-image.html')).href;

const CANDIDATES = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chromePath = CANDIDATES.find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error('Chrome não encontrado: defina a variável CHROME com o caminho do executável.');
  process.exit(1);
}

const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-og-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--allow-file-access-from-files',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(
        (t) => t.type === 'page',
      );
    } catch {
      // Chrome ainda subindo.
    }
  }
  if (!target) throw new Error('Chrome não respondeu ao DevTools Protocol');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg.result);
  });
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: false,
  });
  for (const locale of LOCALES) {
    await send('Page.navigate', { url: `${TEMPLATE}?lang=${locale}` });
    // Espera fontes e a imagem do cartucho antes da captura.
    for (let i = 0; i < 40; i++) {
      await sleep(150);
      const ready = await send('Runtime.evaluate', {
        expression: `document.readyState === 'complete' && document.fonts.status === 'loaded' && [...document.images].every((img) => img.complete && img.naturalWidth > 0)`,
        returnByValue: true,
      });
      if (ready?.result?.value) break;
    }
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
    });
    const out = path.join(process.env.OG_OUT ?? 'public', `og-image-${locale}.png`);
    fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
    console.log(`ok: ${out} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
  }
  ws.close();
} finally {
  chrome.kill();
}
