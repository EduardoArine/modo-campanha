// Derivados WebP do cenário da estação do Project Inventory (D-094): estante desfocada e mesa, arte
// fornecida pelo Eduardo, a partir do mestre design/source/inventory/station-background.png
// (1672 × 941, 16:9). Sem recorte nem filtro: só redimensiona.
// Codifica no Chrome headless (canvas → WebP, DevTools Protocol, sem dependências).
//
// Uso (na raiz do repositório): node design/source/inventory/build-station.mjs
// Chrome: caminho padrão do Windows/macOS/Linux, ou a variável CHROME.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MASTER = path.resolve('design/source/inventory/station-background.png');
const OUT = 'public/assets/inventory/';
// Cenário desfocado: comprime bem; 0,8 não deixa artefato visível.
const QUALITY = 0.8;
// Largura da estação: até ~1200 px CSS no desktop; no celular, a tela inteira (1×–3×).
const JOBS = [640, 960, 1280, 1672].map((w) => ({
  name: `station-background-${w}.webp`,
  width: w,
  crop: null,
}));
const SCALE = 1;

const chromePath = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
  .filter(Boolean)
  .find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error('Chrome não encontrado: defina a variável CHROME com o caminho do executável.');
  process.exit(1);
}

const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-hero-'));
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
    if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg);
  });
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const msg = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (msg.result?.exceptionDetails) throw new Error(msg.result.exceptionDetails.text);
    return msg.result.result.value;
  };

  // Página file:// para poder ler o mestre (file://) no canvas sem "tainted canvas".
  await send('Page.navigate', { url: pathToFileURL(path.dirname(MASTER)).href + '/' });
  await sleep(500);
  await evaluate(`new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { window.__master = img; resolve(img.naturalWidth + 'x' + img.naturalHeight); };
    img.onerror = () => reject(new Error('mestre não carregou'));
    img.src = ${JSON.stringify(pathToFileURL(MASTER).href)};
  })`);

  for (const job of JOBS) {
    const sx = job.crop ? job.crop.x0 * SCALE : 0;
    const sw = job.crop ? (job.crop.x1 - job.crop.x0) * SCALE : null;
    const b64 = await evaluate(`(() => {
      const img = window.__master;
      const sx = ${sx}, sy = 0;
      const sw = ${sw ?? 'img.naturalWidth'}, sh = img.naturalHeight;
      const w = ${job.width}, h = Math.round((w * sh) / sw);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      return canvas.toDataURL('image/webp', ${QUALITY}).split(',')[1];
    })()`);
    const file = path.join(OUT, job.name);
    fs.writeFileSync(file, Buffer.from(b64, 'base64'));
    console.log(`ok: ${file} (${Math.round(fs.statSync(file).size / 1024)} KB)`);
  }
  ws.close();
} finally {
  chrome.kill();
}
