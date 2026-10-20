// Derivados WebP do Diário de Campanha (D-091), a partir dos mestres PNG em design/source/diary/:
// cenários dos capítulos (maps/, 16:9) e imagens editoriais dos marcos (stories/, 3:2). Arte
// fornecida pelo Eduardo, sem rota, nós ou texto (a UI é desenhada no Angular). Sem recorte nem
// filtro: só redimensiona. Codifica no Chrome headless (canvas → WebP, DevTools Protocol, sem
// dependências).
//
// Uso (na raiz do repositório): node design/source/diary/build-diary.mjs
// Chrome: caminho padrão do Windows/macOS/Linux, ou a variável CHROME.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SOURCE = path.resolve('design/source/diary');
const OUT = 'public/assets/diary';
const QUALITY = 0.82;
const GROUPS = [
  // Mapa: até 840 px CSS no desktop (2× = 1672, o próprio mestre).
  { dir: 'maps', widths: [640, 960, 1280, 1672] },
  // Imagem editorial: 305 px (≥ 1200), 448 px (tablet) ou a largura do mobile, em 1×–3×.
  { dir: 'stories', widths: [480, 720, 1080, 1536] },
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
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-diary-'));
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

  // Página file:// para poder ler os mestres (file://) no canvas sem "tainted canvas".
  await send('Page.navigate', { url: pathToFileURL(SOURCE).href + '/' });
  await sleep(500);

  for (const group of GROUPS) {
    const dir = path.join(SOURCE, group.dir);
    fs.mkdirSync(path.join(OUT, group.dir), { recursive: true });
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
      const size = await evaluate(`new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => { window.__master = img; resolve([img.naturalWidth, img.naturalHeight]); };
        img.onerror = () => reject(new Error('mestre não carregou'));
        img.src = ${JSON.stringify(pathToFileURL(path.join(dir, file)).href)};
      })`);
      for (const width of group.widths.filter((w) => w <= size[0])) {
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
        const out = path.join(OUT, group.dir, file.replace(/\.png$/, `-${width}.webp`));
        fs.writeFileSync(out, Buffer.from(b64, 'base64'));
        console.log(`ok: ${out} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
      }
    }
  }
  ws.close();
} finally {
  chrome.kill();
}
