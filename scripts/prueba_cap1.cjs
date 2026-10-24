// Prueba del capítulo 1: clase (14 diapositivas), taller web y su espejo con el PDF.
// Uso: servidor en http://localhost:8080 (raíz del repo) y `node scripts/prueba_cap1.cjs [carpeta_capturas]`.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const BASE = 'http://localhost:8080/';
const OUT = process.argv[2] || null;
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FALLA:', m); } };

(async () => {
  const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], userDataDir: require('os').tmpdir() + '/e10_prueba_' + process.pid });
  const pg = await br.newPage();
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  pg.on('console', (m) => { if (m.type() === 'error' && !/favicon|403|404|firebase|net::/i.test(m.text())) errs.push(m.text()); });
  pg.on('response', (r) => { if (r.status() === 404 && !/favicon/.test(r.url())) errs.push('404 ' + r.url()); });
  await pg.setViewport({ width: 1280, height: 784 });
  await pg.goto(BASE + 'presentaciones/M1_Coulomb/index.html', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));

  // KaTeX sin errores
  const kerr = await pg.$$eval('.katex-error', (e) => e.map((x) => x.textContent));
  ok(kerr.length === 0, 'errores de KaTeX: ' + kerr.join(' | '));
  const nk = await pg.$$eval('.katex', (e) => e.length);
  ok(nk > 80, 'pocas fórmulas renderizadas: ' + nk);

  const N = await pg.$$eval('.slide', (s) => s.length);
  ok(N === 14, 'número de diapositivas ' + N);
  for (let i = 0; i < N; i++) {
    await pg.evaluate((i) => window.__c1.go(i), i);
    await new Promise((r) => setTimeout(r, 450));
    // Nada pasa por debajo del pie, ni se sale de la diapositiva
    const bad = await pg.evaluate((i) => {
      const s = document.querySelectorAll('.slide')[i], foot = s.querySelector('.foot'), sr = s.getBoundingClientRect();
      const ft = foot ? foot.getBoundingClientRect().top : sr.bottom; const out = [];
      s.querySelectorAll('.row *, h2').forEach((el) => {
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return; if (el.closest('.stp-body') && !el.matches('.stp-body')) return; if (el.closest('.katex-mathml') || (el.closest('.katex') && el.tagName.toLowerCase() !== 'span')) return;
        if (getComputedStyle(el).position === 'absolute' && el.closest('.cmap,.tline')) return;
        if (r.bottom > ft + 1.5 || r.right > sr.right + 1.5) out.push((el.id || (typeof el.className === 'string' ? el.className : '') || el.tagName) + ' ' + Math.round(r.bottom - ft));
      });
      return out.slice(0, 5);
    }, i);
    ok(bad.length === 0, `diapositiva ${i + 1}: contenido bajo el pie: ${bad.join(', ')}`);
    // Pasos: cada uno cabe en su caja y la letra es >= 18 px
    const stp = await pg.evaluate(async (i) => {
      const s = document.querySelectorAll('.slide')[i], res = [];
      for (const box of s.querySelectorAll('[data-stp]')) {
        const nav = box.querySelectorAll('.stp-nav button'), body = box.querySelector('.stp-body');
        for (let k = 0; k < nav.length; k++) { nav[k].click(); await new Promise((r) => setTimeout(r, 300));
          const p = box.querySelector('.stp-p.on'); const fs = parseFloat(getComputedStyle(p).fontSize);
          if (body.scrollHeight > body.clientHeight + 2) res.push(`paso ${k + 1} desborda ${body.scrollHeight - body.clientHeight}px`);
          if (fs < 18) res.push(`paso ${k + 1} letra ${fs}px`); }
        nav[0].click();
      }
      return res;
    }, i);
    ok(stp.length === 0, `diapositiva ${i + 1}: ${stp.join('; ')}`);
    if (OUT) { fs.mkdirSync(OUT, { recursive: true }); await pg.screenshot({ path: path.join(OUT, `c1_${String(i + 1).padStart(2, '0')}.png`) }); }
  }

  // Retos: aceptan la respuesta correcta y rechazan una errónea
  for (const p of ['su', 'ej', 'pe']) {
    const r = await pg.evaluate(async (p) => {
      const R = window.__retos[p](); const inp = document.getElementById(p + '-in'), ck = document.getElementById(p + '-ck'), fb = document.getElementById(p + '-fb');
      inp.value = String(R.ans).replace('.', ','); ck.click(); const good = fb.textContent.includes('Correcto');
      inp.value = String(R.ans * 1.5); ck.click(); const bad = fb.textContent.includes('Aún no');
      return { good, bad };
    }, p);
    ok(r.good && r.bad, `reto ${p}: correcto=${r.good} rechaza=${r.bad}`);
  }
  // Física de referencia (taller): R5 y R6
  const fis = await pg.evaluate(() => { const { net } = window.__c1; const n = net([{ q: 2e-6, x: 0, y: 0.3 }, { q: -3e-6, x: 0.4, y: 0.3 }, { q: 4e-6, x: 0, y: 0 }], 2); return { F: n.F, a: Math.atan2(n.Fy, n.Fx) * 180 / Math.PI }; });
  ok(Math.abs(fis.F - 0.64094) < 1e-4 && Math.abs(fis.a + 57.419) < 0.01, 'R5 en la clase: ' + JSON.stringify(fis));
  // Árbol: todas las hojas con respuesta finita
  const arbol = await pg.evaluate(() => Object.entries(window.__arbol).filter(([, l]) => !isFinite(l.ans)).map(([k]) => k));
  ok(arbol.length === 0, 'hojas sin respuesta: ' + arbol.join(','));
  // PDF de la clase
  const pdf = await pg.pdf({ width: '1280px', height: '720px', printBackground: true, preferCSSPageSize: true });
  const tmp = path.join(require('os').tmpdir(), 'e10_clase1.pdf'); fs.writeFileSync(tmp, pdf);
  const pages = +require('child_process').execFileSync('python', ['-c', 'import fitz,sys;print(len(fitz.open(sys.argv[1])))', tmp]).toString().trim();
  ok(pages === 14, 'páginas del PDF de la clase: ' + pages);

  // Taller web
  await pg.goto(BASE + 'talleres/Taller_1_Ley_de_Coulomb.html', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  const tk = await pg.$$eval('.katex-error', (e) => e.length); ok(tk === 0, 'KaTeX con errores en el taller: ' + tk);
  const nres = await pg.$$eval('[data-res]', (e) => e.length), nret = await pg.$$eval('[data-reto]', (e) => e.length);
  ok(nres === 8 && nret === 12, `taller web: ${nres} resueltos, ${nret} retos`);
  const rt = await pg.evaluate(() => { const { RETOS } = window.__taller1; const out = [];
    document.querySelectorAll('[data-reto]').forEach((b) => { const n = b.dataset.reto, inp = b.querySelector('input'), bt = b.querySelector('button'), fb = b.querySelector('.fb');
      inp.value = String(RETOS[n].ans).replace('.', ','); bt.click(); if (!fb.textContent.includes('Correcto')) out.push(n + ' no acepta'); inp.value = String(RETOS[n].ans * 1.3); bt.click(); if (!fb.textContent.includes('Aún no')) out.push(n + ' no rechaza'); });
    return out; });
  ok(rt.length === 0, 'retos del taller: ' + rt.join(', '));
  const dl = await pg.$$eval('a[download]', (a) => a.map((x) => x.getAttribute('href')));
  for (const h of dl) { const st = await pg.evaluate(async (u) => (await fetch(u, { method: 'HEAD' })).status, h); ok(st === 200, 'descarga rota ' + h); }
  await pg.setViewport({ width: 390, height: 844 }); await new Promise((r) => setTimeout(r, 300));
  const hs = await pg.evaluate(() => document.documentElement.scrollWidth); ok(hs <= 392, 'taller en móvil con desborde horizontal: ' + hs);
  if (OUT) await pg.screenshot({ path: path.join(OUT, 'taller_movil.png') });

  // Espejo web ⇄ PDF: los números de cada enunciado aparecen en el LaTeX
  const html = fs.readFileSync(path.join(__dirname, '..', 'talleres', 'Taller_1_Ley_de_Coulomb.html'), 'utf8');
  const tex = fs.readFileSync(path.join(__dirname, '..', '..', '.design', 'fase5', 'M01', 'taller_M01_Coulomb.tex'), 'utf8');
  const nums = (s) => (s.match(/\d+\{?,\}?\d+/g) || []).map((x) => x.replace(/[{}]/g, ''));
  const texNums = new Set(nums(tex));
  const blocks = [...html.matchAll(/data-(?:reto|res)="(\d+)"[\s\S]*?<p>([\s\S]*?)<\/p>/g)];
  ok(blocks.length === 20, 'bloques de enunciado: ' + blocks.length);
  blocks.forEach((b) => { const miss = nums(b[2]).filter((n) => !texNums.has(n)); ok(miss.length === 0, `enunciado ${b[1]}: números que no están en el PDF: ${miss.join(' ')}`); });
  const texRetos = (tex.match(/\\begin\{eReto\}/g) || []).length, texRes = (tex.match(/\\begin\{eResuelto\}/g) || []).length;
  ok(texRetos === 12 && texRes === 8, `PDF: ${texRes} resueltos, ${texRetos} retos`);

  // CoulombLab: modo incrustado y códigos de telemetría de «Comprobar»
  await pg.setViewport({ width: 1280, height: 784 });
  await pg.goto(BASE + 'simuladores/Coulomb.html?embed', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const emb = await pg.evaluate(() => getComputedStyle(document.querySelector('header.e10-header')).display);
  ok(emb === 'none', 'CoulombLab ?embed muestra la cabecera');
  const tel = await pg.evaluate(() => {
    const out = {}; const mk = (id, t, x, y) => ({ id, type: t, label: `q_${id}`, x, y, physX: getPhysX(x), physY: getPhysY(y), q: t === 'charge_pos' ? 5 : -5, hasVectors: false, radius: 25 });
    const run = (end) => { state.objects = [mk(1, 'charge_pos', 300, 300), mk(2, 'charge_neg', 500, 300), { type: 'vector', id: 9, start: { x: 300, y: 300 }, end, validation: null, label: '?' }, { type: 'vector', id: 10, start: { x: 500, y: 300 }, end: { x: 420, y: 300 }, validation: null, label: '?' }]; window.comprobar(); return window.__ultimaComprobacion; };
    out.bien = run({ x: 380, y: 300 }); out.sentido = run({ x: 220, y: 300 }); out.recta = run({ x: 300, y: 220 });
    state.objects = [mk(1, 'charge_pos', 300, 300), mk(2, 'charge_neg', 500, 300)]; window.comprobar(); out.vacio = window.__ultimaComprobacion;
    return out; });
  ok(tel.bien.ok && tel.sentido.error === 'coulomb_atraccion_repulsion' && tel.recta.error === 'coulomb_fuera_de_recta' && tel.vacio.error === 'coulomb_sin_vectores', 'telemetría de CoulombLab: ' + JSON.stringify(tel));
  const seg = fs.readFileSync(path.join(__dirname, '..', 'js', 'seguimiento.js'), 'utf8');
  ['coulomb_atraccion_repulsion', 'coulomb_fuera_de_recta', 'coulomb_sin_vectores', 'coulomb_sin_origen', 'coulomb_falta_fuerza', 'coulomb_pocas_cargas'].forEach((c) => ok((seg.match(new RegExp(c, 'g')) || []).length >= 2, 'código sin registrar en seguimiento.js: ' + c));

  ok(errs.length === 0, 'errores de JavaScript: ' + errs.join(' | '));
  await br.close();
  console.log(`Capítulo 1: ${pass}/${pass + fail} comprobaciones correctas`);
  process.exit(fail ? 1 : 0);
})();
