// ============================================================
// scripts/capturas.cjs — Paso 1 del método de diseño 10.Easy
// Captura páginas del repo en escritorio (1440×900) y móvil (390×844),
// opcionalmente en tema oscuro, y registra errores de JS, de consola y HTTP ≥ 400.
//
// Uso (desde la raíz del repo, con `npm i puppeteer` hecho):
//   node scripts/capturas.cjs simuladores/Coulomb.html [otra.html ...]
//        [--out capturas/] [--dark] [--full] [--solo-errores]
//   --solo-errores: no guarda imágenes; sirve como verificador de páginas.
// Las imágenes se guardan como <out>/<nombre>__escritorio.png y __movil.png.
// No usar page.removeAllListeners(): rompe Puppeteer.
// ============================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const outIdx = args.indexOf('--out');
const OUT = path.resolve(ROOT, outIdx >= 0 ? args[outIdx + 1] : 'capturas');
const pages = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
const VIEWPORTS = [
    { name: 'escritorio', width: 1440, height: 900 },
    { name: 'movil', width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];
// Ruido externo conocido: Firebase sin localhost autorizado en la clave de API, favicon.
const IGNORE = /favicon\.ico|requests-from-referer|PERMISSION_DENIED|firebase\.googleapis|firebaseinstallations|Failed to load resource/i;

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.cjs': 'text/javascript',
    '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2', '.bin': 'application/octet-stream', '.pdf': 'application/pdf' };

function serve() {
    const server = http.createServer((req, res) => {
        const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
        const file = path.join(ROOT, rel || 'index.html');
        if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
    });
    return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

(async () => {
    if (!pages.length) { console.error('Indica al menos una página, p. ej. simuladores/Coulomb.html'); process.exit(1); }
    const server = await serve();
    const base = `http://127.0.0.1:${server.address().port}/`;
    const browser = await puppeteer.launch({ headless: true });
    if (!flag('--solo-errores')) fs.mkdirSync(OUT, { recursive: true });
    let bad = 0;
    for (const p of pages) {
        const errs = new Set();
        for (const vp of (flag('--solo-errores') ? VIEWPORTS.slice(0, 1) : VIEWPORTS)) {
            const page = await browser.newPage();
            page.on('pageerror', (e) => errs.add('pageerror: ' + String(e.message || e).split('\n')[0]));
            page.on('console', (m) => { if (m.type() === 'error') errs.add('console: ' + m.text().slice(0, 200)); });
            page.on('response', (r) => { if (r.status() >= 400) errs.add(`HTTP ${r.status()}: ${r.url()}`); });
            await page.setViewport(vp);
            try { await page.goto(base + p, { waitUntil: 'networkidle2', timeout: 45000 }); }
            catch (e) { errs.add('carga: ' + e.message); }
            if (flag('--dark')) await page.evaluate(() => { document.body.classList.add('dark-mode'); document.body.classList.remove('light-mode'); });
            await new Promise((r) => setTimeout(r, 2000));
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
            if (overflow) errs.add(`desborde horizontal en ${vp.name} (${vp.width}px)`);
            if (!flag('--solo-errores')) {
                const name = p.replace(/[\\/]/g, '_').replace(/\.html$/, '') + (flag('--dark') ? '__oscuro' : '');
                await page.screenshot({ path: path.join(OUT, `${name}__${vp.name}.png`), fullPage: flag('--full') });
            }
            await page.close();
        }
        const real = [...errs].filter((e) => !IGNORE.test(e));
        if (real.length) bad++;
        console.log((real.length ? '✗ ' : '✓ ') + p + (real.length ? '\n    ' + real.join('\n    ') : ''));
    }
    console.log(`\n${pages.length - bad}/${pages.length} páginas sin errores` + (flag('--solo-errores') ? '' : ` · capturas en ${path.relative(ROOT, OUT)}/`));
    await browser.close();
    server.close();
})();
