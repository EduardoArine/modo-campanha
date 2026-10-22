// Derivados WebP do MC-01 em camadas, ângulo frontal (D-095): traseira (tampa com a abertura do slot) e
// frente, recortes exatos do render inteiro do Eduardo (2508 × 1170, fora do repositório; traseira
// y 0–296, frente y 296–1170). Arte do Eduardo, com alfa. Sem recorte nem filtro: só redimensiona.
// Codifica no Chrome headless (canvas → WebP com alfa, DevTools Protocol, sem dependências).
//
// Uso (na raiz do repositório): node design/source/mc-01/build-console.mjs
// Chrome: caminho padrão do Windows/macOS/Linux, ou a variável CHROME.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SOURCE = path.resolve('design/source/mc-01/console-v2');
const OUT = 'public/assets/mc-01/';
const QUALITY = 0.82;
// Console até ~470 px CSS no desktop e ~480 no tablet (1×–2×).
const WIDTHS = [640, 960, 1280];
const MASTERS = [
  { file: 'back.png', name: 'mc01-back' },
  { file: 'front.png', name: 'mc01-front' },
];

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
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-console-'));
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
  await send('Page.navigate', { url: pathToFileURL(SOURCE).href + '/' });
  await sleep(500);

  for (const master of MASTERS) {
    await evaluate(`new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => { window.__master = img; resolve(img.naturalWidth + 'x' + img.naturalHeight); };
      img.onerror = () => reject(new Error('mestre não carregou: ${master.file}'));
      img.src = ${JSON.stringify(pathToFileURL(path.join(SOURCE, master.file)).href)};
    })`);
    for (const width of WIDTHS) {
      const b64 = await evaluate(`(() => {
        const img = window.__master;
        const w = ${width}, h = Math.round((w * img.naturalHeight) / img.naturalWidth);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        return canvas.toDataURL('image/webp', ${QUALITY}).split(',')[1];
      })()`);
      const file = path.join(OUT, `${master.name}-${width}.webp`);
      fs.writeFileSync(file, Buffer.from(b64, 'base64'));
      console.log(`ok: ${file} (${Math.round(fs.statSync(file).size / 1024)} KB)`);
    }
  }
  ws.close();
} finally {
  chrome.kill();
}
